import {
  getAllModelNames,
  joinPaths,
} from './components/helpers/File/FileHelper';
import {
  getModelNameFromCommand,
  triggerCodeGeneration,
} from './components/utils/utils';

const fs = require('fs');
const ts = require('typescript');
const { Project } = require('ts-morph');

const modelName = getModelNameFromCommand();

// Check if the folder name exists inside of models directory
getAllModelNames().then((modelNames: string[]) => {
  if (!modelNames.includes(modelName)) {
    throw new Error(`There do not exists a model with name ${modelName}`);
  }
});

const modelDirectory = joinPaths([__dirname, 'models']);
const modelPath = joinPaths([modelDirectory, modelName, 'model.json']);
const tsPath = joinPaths([
  modelDirectory,
  modelName,
  'code',
  'quantities_implementation.ts',
]);

function readModel() {
  const rawData = fs.readFileSync(modelPath);
  return JSON.parse(rawData);
}

function validateFunctionAndParameterNames(
  sourceFile,
  namespace,
  validPrefixes
) {
  let isValid = true;
  let invalidName = '';

  ts.forEachChild(sourceFile, (node) => {
    if (ts.isFunctionDeclaration(node) && node.name) {
      const functionName = node.name.text;
      if (!functionName.startsWith(namespace)) {
        // Check if the function names starts with validPrefixes
        const containsValidPrefixes = validPrefixes.filter((el) =>
          functionName.startsWith(el)
        );
        if (containsValidPrefixes.length == 0) {
          isValid = false;
          invalidName = `Function name "${functionName}" does not start with the namespace "${namespace}" or any of the child models.`;
          return;
        }
      }

      node.parameters.forEach((param) => {
        const paramName = param.name.text;
        const isParamValid = validPrefixes.some((prefix) =>
          paramName.startsWith(prefix)
        );
        if (!isParamValid) {
          isValid = false;
          invalidName = `Parameter name "${paramName}" does not start with any valid prefix: ${validPrefixes.join(
            ', '
          )}.`;
          return;
        }
      });

      if (!isValid) return; // Exit if an invalid name was found
    }
  });

  return { isValid, invalidName };
}

function syncModelAndTsFile(tsFilePath, modelData) {
  const tsFileContent = fs.readFileSync(tsFilePath, 'utf8');
  const sourceFile = ts.createSourceFile(
    tsFilePath,
    tsFileContent,
    ts.ScriptTarget.ES2015,
    /* setParentNodes */ true
  );

  // Construct valid prefixes from namespace and "extends"
  let validPrefixes = [modelData.namespace];
  validPrefixes.push('global'); // For including the global values

  if (modelData?.extends) {
    const dependentModels: string[] = modelData.extends.map((ext) =>
      ext.replace('../', '')
    );
    validPrefixes = validPrefixes.concat(dependentModels);
  }

  // Validate function and parameter names before proceeding
  const { isValid, invalidName } = validateFunctionAndParameterNames(
    sourceFile,
    modelData.namespace,
    validPrefixes
  );
  if (!isValid) {
    throw new Error(invalidName);
  }

  syncData(modelData, tsFilePath);
}

function syncData(modelFileData, tsFilePath: string) {
  try {
    // Extract function declarations
    const project = new Project();
    const sourceFile = project.addSourceFileAtPathIfExists(tsFilePath);

    const functionDeclarations = sourceFile.getFunctions();

    // Fetch the types from the model file
    const modelTypes = Object.assign({}, modelFileData?.types);

    // Extract function name and arguments
    const jsonDocuments = [];
    functionDeclarations.forEach((tsFunction) => {
      const jsonStructure = {
        id: '',
        projectInputs: [],
        staticValues: [],
        lookUps: [],
        quantities: [],
        output: '',
      };

      const functionName = tsFunction.getName();
      let functionArguments = tsFunction.getParameters().map((param) => ({
        name: param.getName(),
        type: param.getType().getText(param),
      }));

      // Extract function body
      const functionBody = tsFunction.getBodyText();

      // Set id based on function name
      jsonStructure.id = functionName;

      // Sync the type annotation changes from the model to TS file
      const tsFileTypeAnnotations = functionArguments.filter(
        (arg) => arg.type != 'any'
      );

      // Split TsFileTypeAnnotations and convert into object format
      const tsAnnotationsObject = tsFileTypeAnnotations.reduce(
        (acc, annotation) => {
          const { name, type } = annotation;
          acc[name] = type;
          return acc;
        },
        {}
      );

      // Validate the model file and the Ts file for arguments type annotation mismatch.
      const mismatchedAnnotations = [];

      if (modelTypes) {
        for (const element in tsAnnotationsObject) {
          const modelElementType = modelTypes[element];
          const tsElementType = tsAnnotationsObject[element];

          if (modelElementType && modelElementType !== tsElementType) {
            mismatchedAnnotations.push({
              element,
              modelElementType,
              tsElementType,
            });
          }
        }
      }

      // Throw an error for type annotation mismatches
      if (mismatchedAnnotations.length > 0) {
        const errorMessages = mismatchedAnnotations.map(
          ({ element, modelElementType, tsElementType }) => {
            const modelTypeString = `The type used in Model is "${modelElementType}"`;
            return `Type mismatch for argument "${element}". ${modelTypeString}, but TS file element type is "${tsElementType}".`;
          }
        );

        throw new Error(
          `Type annotation mismatches:\n${errorMessages.join('\n')}`
        );
      }

      // Find elements not present in model.types
      const missingAnnotations = [];

      if (modelTypes) {
        for (const element in tsAnnotationsObject) {
          if (!modelTypes[element]) {
            missingAnnotations.push(element);
          } else if (modelTypes[element] !== tsAnnotationsObject[element]) {
            missingAnnotations.push(element);
          }
        }
      } else {
        if (Object.keys(tsAnnotationsObject).length)
          missingAnnotations.push(tsAnnotationsObject);
      }

      // Push the missing annotations inside the types property of the model file.
      if (!modelFileData.types) {
        modelFileData.types = {};
      }
      missingAnnotations.forEach((key) => {
        modelFileData.types[key] = tsAnnotationsObject[key];
      });

      // Remove the types from the functionArguments
      const fnArgumentsNames = functionArguments.map((arg) => arg.name);

      // Populate projectInputs, staticValues, and lookUps based on function arguments
      fnArgumentsNames.forEach((arg) => {
        if (arg.includes('__pi_')) {
          jsonStructure.projectInputs.push(arg);
        } else if (arg.includes('__st_')) {
          jsonStructure.staticValues.push(arg);
        } else if (arg.includes('__lk_')) {
          jsonStructure.lookUps.push(arg);
        } else if (arg.includes('__q_')) {
          jsonStructure.quantities.push(arg);
        } else {
          throw new Error(
            `The argument "${arg}" for the function "${functionName}" is not valid, since it is not a pi or st or lk.`
          );
        }
      });

      // Set output based on function body
      jsonStructure.output = functionBody;

      jsonDocuments.push(jsonStructure);
    });

    modelFileData.quantities = jsonDocuments;
  } catch (error) {
    throw error;
  }
}

(function () {
  try {
    let model = readModel();
    syncModelAndTsFile(tsPath, model);

    // syncModelAndTS modifies the model object directly
    fs.writeFileSync(modelPath, JSON.stringify(model, null, 2));

    console.log('Synchronization successful. Trigerring build...');
    triggerCodeGeneration(modelName);
  } catch (error) {
    // console.error('Synchronization failed:', error.message);
    console.error(error);
  }
})();

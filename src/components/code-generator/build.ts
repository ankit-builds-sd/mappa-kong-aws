import { QuantityContainer } from '../interfaces';
import { JsonModelParser } from '../helpers/Model/JsonModelParser';
import { ModelOperator } from '../helpers/Model/modelOperator';
import {
  getModelNameFromCommand,
  deleteLookUpFileData,
  checkDuplicateQuantity,
  getUngeneratedQuantities,
} from '../utils/utils';
import { getAllModelNames } from '../helpers/File/FileHelper';

export default async function buildModel() {
  try {
    const modelName = getModelNameFromCommand();

    // Check if the folder name exists inside of models directory
    const models = await getAllModelNames();
    if (!models.includes(modelName)) {
      // TODO: Throw error later
      console.log(
        `There do not exists a model with name ${modelName}. Please make sure you use correct casing for the model name.`
      );
    }

    // Validate the model - It should have the namespace prefixes before every pi, st, lk & quantity.
    validateNamespacePrefixes(modelName);

    const jsonModelParser = new JsonModelParser(modelName);
    const modelOperator = new ModelOperator(jsonModelParser);

    if (
      jsonModelParser?.modelData?.namespace &&
      modelName !== jsonModelParser?.modelData?.namespace
    ) {
      // TODO: Throw error later
      console.log(
        `The models folder name is ${modelName} & the namespace used inside the model.json file is ${jsonModelParser?.modelData?.namespace}. Please remove the inconsistency.`
      );
    }

    // Delete the quantities.json file, every single time during the build process.
    const deletionStatus = await modelOperator.refreshQuantitiesFiles();
    deletionStatus.map((status) => console.log(status));
    const lookUpDeletionStatus = await deleteLookUpFileData();
    console.log(lookUpDeletionStatus);

    // Import quantities - Already present in the system.
    const quantitiesFromModel = modelOperator.fetchQuantities(); // From model

    // Read the data from quantities_structure.json file.
    const qJsonData = modelOperator.getQuantitiesJsonFileData(); // From JSON file
    const storedQuantitiesStructure = qJsonData?.quantities
      ? qJsonData.quantities
      : null;

    // Check for already present quantities
    const alreadyPresentQuantities = checkDuplicateQuantity(
      quantitiesFromModel,
      storedQuantitiesStructure
    );

    // 5) Get the quantities that have not been generated.
    const quantitiesToGenerate = getUngeneratedQuantities(
      quantitiesFromModel,
      storedQuantitiesStructure
    );

    /* INFO:
        Currently, we are deleting the quantities_structure.json & quantities_implementation.ts file every time the build script is triggered. The below commented code will handle the sync between the model & the quantities file, without the files deletion.
    */
    // const extraInStructureFile = getExtraQuantities(
    //   quantitiesFromModel,
    //   storedQuantitiesStructure
    // );

    // if (extraInStructureFile) {
    //   const newStructureFileData = qJsonData;
    //   for (const elementId of extraInStructureFile) {
    //     if (
    //       newStructureFileData &&
    //       newStructureFileData.quantities &&
    //       Array.isArray(newStructureFileData.quantities)
    //     ) {
    //       newStructureFileData.quantities =
    //         newStructureFileData.quantities.filter(
    //           (quantity) => quantity.id !== elementId
    //         );
    //     }
    //   }

    //   // Write the updated content back to the file
    //   const modelDirectory = joinPaths([__dirname, '../', '../', 'models']);
    //   const filePath = joinPaths([
    //     modelDirectory,
    //     jsonModelParser.modelName,
    //     'code',
    //     'quantities_structure.json',
    //   ]);
    //   if (filePath) {
    //     writeFileSync(filePath, JSON.stringify(newStructureFileData, null, 2));
    //   }

    //   if (extraInStructureFile.length > 0) {
    //     console.log(
    //       `Extra quantity with id "${extraInStructureFile.join(
    //         ','
    //       )}" in the quantities_structure.json removed successfully.`
    //     );
    //   }
    // }

    if (
      alreadyPresentQuantities.length > 0 &&
      quantitiesToGenerate.length == 0
    ) {
      throw new Error(
        `The following quantities - ${alreadyPresentQuantities.join(
          ', '
        )} already exists`
      );
    }

    // 6) Generating the new quantities
    const qContainer: QuantityContainer[] = []; // Quantities container variable
    for (const quantity of quantitiesToGenerate) {
      // Generate the function to be stored in the quantity file.
      const dataToWrite = modelOperator.generateFunctionForQuantity(quantity);

      // Add the types to the "arguments" property of dataToWrite
      const typeData = jsonModelParser.modelData.types;
      if (typeData && dataToWrite.arguments) {
        let args = dataToWrite.arguments.split(',');
        // Loop through the args and check if the data for the argument is provided in the typeData
        args = args.map((arg) => {
          const typeKeys = Object.keys(typeData);
          if (typeKeys.includes(arg)) {
            return `${arg}:${typeData[arg]}`;
          }
          return arg;
        });

        dataToWrite.arguments = args.join(',');
      }
      qContainer.push({ dataToWrite: dataToWrite, quantity: quantity });
    }

    modelOperator.storeCode(qContainer);

    // This will be generate the quantity_structure.json for all the dependent models.
    modelOperator.resolveDependentModelsInBuild();
  } catch (error) {
    console.log(`ERROR - ${error.message}`);
    // console.log(`ERROR! - ${error.message}`);
  }
}

// Validate the model for the namespace prefixes
function validateNamespacePrefixes(modelName: string) {
  const jsonModelParser = new JsonModelParser(modelName);
  const modelOperator = new ModelOperator(jsonModelParser);

  // Get all the values of valid prefixes
  let validPrefixes = [modelName];

  if (jsonModelParser?.modelData?.extends) {
    validPrefixes.push(...jsonModelParser.modelData.extends);
  }

  validPrefixes = validPrefixes.map((el) => el.replace('../', ''));

  // Get all the elements that need to be verified
  const elementsToVerify = [
    ...jsonModelParser.modelData.quantities.flatMap((q) => [
      q.id,
      ...(q.projectInputs || []),
      ...(q.staticValues || []),
      ...(q.lookUps || []),
      q.output,
    ]),
  ];

  // Perform the verification & send the result
  const invalidElements = elementsToVerify.filter((element) => {
    // Check for the invalid variables inside output property
    if (element.includes('return')) {
      // Extract variable names from the output string
      const variableNames = element.match(/(\w+)__\w+/g) || [];

      // Check prefixes for each variable name
      const invalidVariableNames = variableNames.filter((variable) => {
        const prefix = variable.split('__')[0];
        return !validPrefixes.includes(prefix);
      });

      return invalidVariableNames.length > 0;
    }

    const prefix = element.split('__')[0];
    return !validPrefixes.includes(prefix);
  });

  if (invalidElements && invalidElements.filter((el) => el !== '').length > 0) {
    throw new Error(
      `Invalid namespace prefixes found: ${invalidElements.join(', ')}`
    );
  } else {
    console.log('Namespace prefixes validation successful');
  }
}

buildModel();

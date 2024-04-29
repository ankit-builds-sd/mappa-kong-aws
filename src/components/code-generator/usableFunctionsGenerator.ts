import * as Helper from '../utils/utils';
import { FunctionSchema } from '../interfaces';
import { JsonModelParser } from '../helpers/Model/JsonModelParser';
import { ModelOperator } from '../helpers/Model/modelOperator';
import { appendFile } from '../helpers/File/FileHelper';

// Step 1 ==> Read the model name from the arguments
const modelNameFromCommand = Helper.getModelNameFromCommand();

const generatedModelNames = new Set(); // Maintain a set of already generated model names

export default function generateUsableFunctions(modelName: string) {
  generatedModelNames.add(modelName);
  const modelParser = new JsonModelParser(modelName);
  modelParser.readModel();
  const modelOperator = new ModelOperator(modelParser);

  // Step 2 ==> Read the quantities defination json file, from the model directory.
  const quantitiesDefData = modelOperator.getQuantitiesJsonFileData();

  // Step 3 ==> Fetch the already generated functions names, from the quantities_implementation.ts file.
  const alreadyGeneratedFunctions =
    modelOperator.getAlreadyGeneratedFunctionData();

  // Step 4 ==> Check for already generated functions, and remove them from the pool.
  // Find the quantities that are present in quantitiesDefData & not in alreadyGeneratedFunctions
  const quantitiesToGenerate = quantitiesDefData.quantities.filter(
    (quantity) => !alreadyGeneratedFunctions.has(quantity.id)
  );

  if (quantitiesToGenerate.length <= 0) {
    console.log(
      `No new quantites functions to generate for the model ${modelName}.`
    );
    // resolveDependentModels();
  }

  if (modelParser?.modelData?.extends?.length) {
    const models = modelParser?.modelData?.extends?.map(
      (quantity) => quantity.replace('../', '') // Remove the "../"
    );

    models.forEach((model) => {
      if (!generatedModelNames.has(model)) {
        generateUsableFunctions(model);
      }
    });
  }

  // Step 5 ==> Convert all the quantities definations into proper functions
  const quantitiesFunctions: string[] = [];

  quantitiesToGenerate.map((el: FunctionSchema) => {
    let functionPrefix = '';
    // Check if the quantity 'body' has the 'await' keyword.
    if (el.body.includes('await')) {
      // If yes, the add the async keyword to the function defination
      functionPrefix = 'async';
    }

    const generatedFunction = `export ${functionPrefix} function ${el.id}(${el.arguments}){${el.body}}`;

    quantitiesFunctions.push(generatedFunction);
  });

  let quantitiesStr = quantitiesFunctions.join('\n');
  // Step 6 => Loop through the quantitiesStr, and check for the utility_ prefix.
  quantitiesStr = quantitiesStr.replace(
    /(?<!utilities\.)utility_/g,
    'utilities.utility_'
  );

  // Step 7 ==> Store the generated functions into the functions file
  const qfFilePath = modelOperator.getFuncFilePath();

  appendFile(qfFilePath, quantitiesStr);

  quantitiesToGenerate.map((el) =>
    console.log(
      `quantities_implementation.ts for ${el.id} generated successfully at ${qfFilePath}.`
    )
  );

  // resolveDependentModels();
}

// function resolveDependentModels() {
//   modelOperator.resolveDependentModelsInPostBuild();
// }

async function generateLookUpFunctions(modelName) {
  try {
    const modelParser = new JsonModelParser(modelName);
    modelParser.readModel();
    const modelOperator = new ModelOperator(modelParser);

    modelOperator.storeLookUps();
  } catch (error) {
    console.log(`ERROR! - ${error.message}`);
  }
}

generateUsableFunctions(modelNameFromCommand);
generateLookUpFunctions(modelNameFromCommand);

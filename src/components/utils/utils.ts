import fs from 'fs';

import * as FileHelper from '../helpers/File/FileHelper';

import {
  ProjectInput,
  Quantity,
  StaticValue,
  TestDataNode,
} from '../interfaces';
import { getLookupDirectory, joinPaths } from '../helpers/File/FileHelper';
import { executeNpmCommands } from '../../cli/cli';

export function checkDuplicateQuantity(
  quantitiesFromModel: Quantity[],
  storedQuantitiesStructure: any
) {
  const duplicateQuantities: string[] = [];
  if (quantitiesFromModel) {
    for (let existingQuantity in quantitiesFromModel) {
      // Check for data against the quantities_structure.json file
      for (let func in storedQuantitiesStructure) {
        if (
          storedQuantitiesStructure[func].id ==
          quantitiesFromModel[existingQuantity].id
        ) {
          // console.log(
          //   `The quantity with id ${storedQuantities[existingQuantity].id} already exists`
          // );
          duplicateQuantities.push(quantitiesFromModel[existingQuantity].id);
        }
      }
    }
  }

  return duplicateQuantities;
}

export function getUngeneratedQuantities(
  quantitiesFromModel: Quantity[],
  storedQuantitiesStructure: any
) {
  let quantitiesToGenerate: Quantity[] = [];

  if (quantitiesFromModel) {
    for (const sq of quantitiesFromModel) {
      let isPresent = false;
      for (const sfd of storedQuantitiesStructure) {
        if (sq.id === sfd.id) {
          isPresent = true;
          break;
        }
      }

      if (isPresent == false) {
        quantitiesToGenerate.push(sq);
      }
    }
  }

  return quantitiesToGenerate;
}

// Function to compare quantities and retrun the extra ones
export function getExtraQuantities(
  quantitiesFromModel: Quantity[],
  storedQuantitiesStructure: any
) {
  const modelIds = quantitiesFromModel.map((item) => item.id);
  const storedIds = storedQuantitiesStructure.map((item) => item.id);

  // const extraInModelFile = modelIds.filter((id) => !storedIds.includes(id));
  const extraInStructureFile = storedIds.filter((id) => !modelIds.includes(id));

  // return [extraInModelFile, extraInStructureFile];
  return extraInStructureFile;
}

export function getTestsJsonData() {
  try {
    const testDataPath = FileHelper.getTestsDataFilePath();
    const testData: TestDataNode[] = FileHelper.readFileSync(testDataPath);

    return testData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function deleteLookUpFileData(): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const modelDirectory = getLookupDirectory();
      const path = joinPaths([modelDirectory, 'lookup.ts']);
      let returnMsg = '';
      fs.exists(path, (exists) => {
        if (exists) {
          fs.unlink(path, (err) => {
            if (err) throw err;
            returnMsg = `${path} was deleted`;
          });
        } else {
          returnMsg = `No need to delete ${path}. It's already deleted 😃.`;
        }
        resolve(returnMsg);
      });
    } catch (error) {
      console.log(error);
      reject('An error occured in the deleteLookUpFileData() in helper file');
    }
  });
}

// --------------- Helper functions for Invoker

export function getModelNameFromCommand() {
  // Get the model path from the command line

  const command_args = process.argv.slice(2);
  let modelName: string = '',
    argumentValue: string = '';

  const parameterIndex = command_args.findIndex((arg) => arg.includes(`model`));
  if (parameterIndex !== -1) {
    argumentValue = command_args[parameterIndex];
  }

  if (!argumentValue) {
    throw new Error('Please specify a "model" argument in the command');
  }

  if (argumentValue.includes('=')) {
    if (argumentValue.split('=')[0] == 'model') {
      modelName = argumentValue.split('=')[1];
    }
  }

  // Set the ENV variable to be used in package.json scripts
  process.env.MODELNAME = modelName;

  return modelName;
}

export function getArgsFromCommand() {
  // Get the model path from the command line
  const command_args = process.argv.slice(2);

  const hasPort = command_args.some((arg) => arg.startsWith('PORT='));

  if (!hasPort) {
    throw new Error('Argument PORT, not specified in the command arguments.');
  }

  const c_args = command_args.map((el) => {
    const keyValuePair = el.split('=');
    return { [keyValuePair[0]]: keyValuePair[1] };
  });

  return {
    PORT: c_args[0]['PORT'] ? c_args[0]['PORT'] : 5002,
  };
}

export function renameId(
  quantities: Quantity[],
  currentId: string,
  newId: string
) {
  Object.values(quantities).forEach((quantity) => {
    if (quantity.id == currentId) {
      quantity.id = newId;
    }
  });
}

export function renameQuantities(
  quantities: Quantity[],
  currentId: string,
  newId: string
) {
  // Loop thorough quantities
  Object.values(quantities).forEach((parent) => {
    if (parent.quantities && parent.quantities.length) {
      for (let i = 0; i < parent.quantities.length; i++) {
        if (parent.quantities[i] === currentId) {
          parent.quantities[i] = newId;
        }
      }
    }
  });
}

export function renameProjectInputs(
  quantities: Quantity[],
  currentId: string,
  newId: string
) {
  // Loop thorough quantities
  Object.values(quantities).forEach((parent) => {
    if (parent.projectInputs && parent.projectInputs.length) {
      for (let i = 0; i < parent.projectInputs.length; i++) {
        if (parent.projectInputs[i] === currentId) {
          parent.projectInputs[i] = newId;
        }
      }
    }
  });
}

export function renameStaticValues(
  quantities: Quantity[],
  currentId: string,
  newId: string
) {
  // Loop thorough quantities
  Object.values(quantities).forEach((parent) => {
    if (parent.staticValues && parent.staticValues.length) {
      for (let i = 0; i < parent.staticValues.length; i++) {
        if (parent.staticValues[i] === currentId) {
          parent.staticValues[i] = newId;
        }
      }
    }
  });
}

export function renameOutput(
  quantities: Quantity[],
  currentId: string,
  newId: string
) {
  // Loop thorough quantities
  Object.values(quantities).forEach((parent) => {
    if (parent.output) {
      parent.output = parent.output.replace(new RegExp(currentId, 'g'), newId);
    }
  });
}

export function renameLookUps(
  lookUpRelations: { [key: string]: string[] },
  currentId: string,
  newId: string
) {
  // Loop thorough lookUpRelations
  Object.values(lookUpRelations).forEach((parent) => {
    for (let i = 0; i < parent.length; i++) {
      if (parent[i] === currentId) {
        parent[i] = newId;
      }
    }
  });
}

export function triggerCodeGeneration(modelName) {
  // Trigger the build
  executeNpmCommands([
    `npm run build -- model=${modelName}`,
    `npm run generator -- model=${modelName}`,
  ]);
}

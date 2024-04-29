import { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import net from 'net';

import {
  getArgsFromCommand,
  renameId,
  renameLookUps,
  renameOutput,
  renameProjectInputs,
  renameQuantities,
  renameStaticValues,
  triggerCodeGeneration,
} from '../components/utils/utils';
import { getContextObject } from '../components/helpers/Invoker/invokerHelper';
import {
  getAllModelNames,
  getModelDirectory,
  joinPaths,
  readFileSync,
  writeFileSync,
} from '../components/helpers/File/FileHelper';
import { JsonModelParser } from '../components/helpers/Model/JsonModelParser';
import {
  ApiInputs,
  CalculationTree,
  InvokerResult,
  ApiResponse,
  Model,
} from '../components/interfaces';
import { Invoker } from '../components/invoker/invoker';

import express from 'express';
import http from 'http';
import * as fs from 'fs';

const parentApp = express();

const childApp = express();
const childServer = http.createServer(childApp);

parentApp.use(cors());
parentApp.use(express.json());

childApp.use(cors());
childApp.use(express.json());

const { PORT } = getArgsFromCommand();
let childServerPort = null,
  childServerModel = null;

const validationProps = ['PORT'];
validationProps.map((el) => {
  if (!eval(el)) {
    throw new Error(`${el} is not provided via the arguments`);
  }
});

async function saveModelFile(modelName: string, modelData: Model) {
  try {
    // Saving the model state
    const ModelDirectory = getModelDirectory();

    // Loop through the modelData, and changes the parent as well as dependent models.
    for (const index in modelData) {
      const model = modelData[index];
      if (model) {
        const namespace = model?.namespace;
        const filePath = joinPaths([ModelDirectory, namespace, 'model.json']);
        writeFileSync(filePath, JSON.stringify(model));
      }
    }
    triggerCodeGeneration(modelName);

    // Create an instance of the Invoker
    const invoker = new Invoker(modelName);
    // Re-configure the invoker, to include the latest model changes
    await invoker.configInvoker();
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

async function renameModelFile(modelName: string, modelData: Model) {
  try {
    // Saving the model state
    const ModelDirectory = getModelDirectory();

    // Loop through the modelData, and changes the parent as well as dependent models.
    if (modelName && modelData) {
      const filePath = joinPaths([ModelDirectory, modelName, 'model.json']);
      writeFileSync(filePath, JSON.stringify(modelData));
    }
    triggerCodeGeneration(modelName);

    // Create an instance of the Invoker
    const invoker = new Invoker(modelName);
    // Re-configure the invoker, to include the latest model changes
    await invoker.configInvoker();
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

function getExtendedModels(model: string, modelContainer: string[]) {
  model = model.replace('../', '/');
  ('');
  const modelParser = new JsonModelParser(model);
  modelParser.readModel();
  if (modelParser?.modelData?.extends?.length) {
    modelParser?.modelData?.extends.forEach((extendedModel) => {
      getExtendedModels(extendedModel, modelContainer);
      modelContainer.push(extendedModel.replace('../', ''));
    });
  }

  return modelContainer;
}

// ----------------- Parent Server API starts -----------------

parentApp.get(
  '/utility',
  async (req: Request, res: Response, next: NextFunction) => {
    const types = readTypesFile()
      .toString()
      .replace(/\n/g, '')
      .replace('export {};', '')
      .replace('export {};', '')
      .replace(/export\s+/g, '');
    res.status(200).json({
      status: 'success',
      data: { types },
    });
  }
);

parentApp.get(
  '/models',
  async (req: Request, res: Response, next: NextFunction) => {
    const modelsName = await getAllModelNames();

    if (modelsName.length > 0) {
      res.status(200).json({
        status: 'success',
        data: modelsName,
      });
    } else {
      res.status(204).json({
        status: 'success',
        data: modelsName,
      });
    }
  }
);

parentApp.get(
  '/fetchModel',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { model } = req.query;

      if (!model) {
        throw new Error(`No model specified in the API request.`);
      }

      // Get all the model names
      const modelsName = await getAllModelNames();

      // Check if the model exists in the models directory
      if (!modelsName.includes(model.toString())) {
        throw new Error(
          `Model ${model} does not exists. Please enter a valid model name.`
        );
      }

      const modelContainer = [];

      // Step 1 ==> Get the parent model data
      const modelParser = new JsonModelParser(model.toString());
      modelParser.readModel();

      // Step 2 ==>  Push the model data to modelContainer
      modelContainer.push(modelParser.modelData);

      // Step 3 ==>  Check if the parent model contains dependent data
      const dependentModels = modelParser.modelData?.extends;
      if (dependentModels) {
        // Step 4 ==> Fetch all the dependent models data
        dependentModels.map((model) => {
          model = model.replace('../', '');
          const dependentModelParser = new JsonModelParser(model);
          dependentModelParser.readModel();
          modelContainer.push(dependentModelParser.modelData);
        });
      }

      res.status(200).json({
        status: 'success',
        data: modelContainer,
      });
    } catch (error) {
      next(error);
    }
  }
);

parentApp.post(
  '/rename',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const model: string = req.body?.model;
      const currentId: string = req.body?.currentId;
      const newId: string = req.body?.newId;

      // #### Validation - Check for the valid properties
      const validationProps = ['model', 'currentId', 'newId'];
      validationProps.map((prop) => {
        if (!eval(prop)) {
          throw new Error(`${prop} is not provided via the arguments`);
        }
      });

      // #### Validation - Check if the model exists.
      // Get all the model names
      const modelsName = await getAllModelNames();

      // Check if the model exists in the models directory
      if (!modelsName.includes(model.toString())) {
        throw new Error(
          `Model ${model} does not exists. Please enter a valid model name.`
        );
      }

      // Fetch the model, and store it inside the object.
      const modelParser = new JsonModelParser(model);
      modelParser.readModel();
      const modelContainer = modelParser.modelData;

      // Replace all occurrences of currentId with newId
      const lookUpRelations = modelContainer?.lookUpRelations;
      const quantities = modelContainer?.quantities;

      // TODO: Check for the validation. If the value to be modified exits in the model.

      // ---- Rename the properties in the quantities
      renameId(quantities, currentId, newId);

      if (currentId.includes('__q_')) {
        renameQuantities(quantities, currentId, newId);
      }

      if (currentId.includes('pi_')) {
        renameProjectInputs(quantities, currentId, newId);
      }

      if (currentId.includes('st_')) {
        renameStaticValues(quantities, currentId, newId);
      }

      renameOutput(quantities, currentId, newId);

      // Rename the lookups in the quantities
      if (currentId.includes('lk_')) {
        renameLookUps(lookUpRelations, currentId, newId);
      }

      // Store the model object back to the file
      renameModelFile(modelParser.modelName, modelContainer);

      restartServer(model);
      res.status(200).send({
        status: 'success',
        data: {
          message: `Successfully renamed ${currentId} to ${newId} in the ${model} model.`,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

parentApp.post(
  '/save',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const modelName: string = req.body.modelName;
      const modelData = req.body.modelData;

      const namespace = modelData[0]?.namespace;

      if (modelName != namespace) {
        throw new Error(`The modelName and namespace do not match.`);
      }

      if (!modelData) {
        throw new Error('Model data cannot be empty');
      }

      // #### Validation - Check if the model exists.
      // Get all the model names
      const modelsName = await getAllModelNames();

      // Check if the model exists in the models directory
      if (!modelsName.includes(modelName.toString())) {
        throw new Error(
          `Model ${modelName} does not exists. Please enter a valid model name.`
        );
      }

      // Store the model object back to the file
      saveModelFile(modelName, modelData);

      res.status(200).send({
        status: 'success',
        data: {
          message: `Successfully saved the new data to model - ${modelName}.`,
        },
      });

      restartServer(modelName);
    } catch (error) {
      next(error);
    }
  }
);

parentApp.get(
  '/buildAndRun',
  async (req: Request, res: Response, next: NextFunction) => {
    // Start the server
    const { modelName, activateBuild = 0, startServer = 1 } = req.query;

    let PORT: number;

    if (req.query.PORT) {
      PORT = +req.query.PORT;
    }
    if (!PORT) {
      throw new Error(`Please specify a PORT to run the child server.`);
    }

    if (!modelName) {
      throw new Error(`Please specify a model name.`);
    }

    // If the PORT is present, set the global variable to the PORT value
    if (PORT) {
      childServerPort = PORT;
    }

    // If the modelName is present, set the global variable to the modelName value
    if (modelName) {
      childServerModel = modelName;
    }

    try {
      if (activateBuild) {
        // Trigger the build
        triggerCodeGeneration(modelName);
      }

      if (startServer) {
        const isPortOpen = await checkPortStatus(PORT);

        if (!isPortOpen) {
          childServer.listen(childServerPort, () => {
            console.log(`Child Server started on port ${childServerPort}...`);
            res.status(200).json({
              status: 200,
              data: {
                message: `The child server is listening on PORT ${childServerPort} for model ${modelName}.`,
              },
            });
          });
        } else {
          restartServer(modelName.toString());
          res.status(200).json({
            status: 200,
            data: {
              message: `Restarted child server on PORT ${childServerPort} for model ${modelName}`,
            },
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }
);

function readTypesFile() {
  try {
    const filePath: string = 'src/utilities/utility.d.ts';
    const data: string = fs.readFileSync(filePath, { encoding: 'utf-8' });
    return data;
  } catch (error) {
    console.error('Error reading file:', error);
    throw error; // Rethrow or handle as needed
  }
}

// ----------------- Parent Server API ends -----------------

// ----------------- Child Server API starts -----------------

async function restartServer(modelName: string) {
  const isPortOpen = await checkPortStatus(PORT);

  if (!isPortOpen) {
    childServer.close((err) => {
      if (err) {
        console.error('Error closing server:', err);
      } else {
        console.log(
          `Restarting the server on port ${childServerPort} again for model ${modelName}...`
        );
        childServer.listen(childServerPort, () => {
          console.log(
            `Child Server listening on port ${childServerPort} again for model ${modelName}.`
          );
        });
      }
    });
  }
}

async function checkPortStatus(port) {
  return new Promise((resolve) => {
    const client = net.createConnection({ port }, () => {
      client.end();
      resolve(true); // Port is open
    });

    client.on('error', () => {
      resolve(false); // Port is not open
    });
  });
}

// Trigger the invoker & return its result
childApp.post(
  '/result',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inputs: ApiInputs = req.body.inputs;
      const quantityNames: string[] = req.body.quantityNames;
      const returnCalcTree: boolean = !!req.query.calcTree;

      if (!inputs) {
        res.status(401).json({
          status: 'failed',
          message:
            'Please provide an inputs object, containing projectInputs and staticValues.',
        });
      }

      if (!inputs.projectInputs || !inputs.staticValues) {
        res.status(401).json({
          status: 'failed',
          message:
            'Please provide projectInputs or staticValues property inside an inputs object.',
        });
      }

      // Extract projectInputs and static values
      const { projectInputs, staticValues } = inputs;

      // Validate the projectInputs to have the __pi_ prefix
      const invalidProjectInputs = Object.keys(projectInputs).filter(
        (projectInput) => !projectInput.includes('__pi_')
      );

      // Throw an error if the projectInputs are invalid
      if (invalidProjectInputs.length) {
        throw new Error(
          `The following projectInputs are invalid: ${invalidProjectInputs.join(
            ', '
          )}. This can be caused if __pi_ prefix is missing for projectInputs.`
        );
      }

      // Validate the staticValues to have the __st_ prefix
      const invalidStaticValues = Object.keys(staticValues).filter(
        (staticValue) => !staticValue.includes('__st_')
      );

      // Throw an error if the staticValues are invalid
      if (invalidStaticValues.length) {
        throw new Error(
          `The following staticValues are invalid: ${invalidStaticValues.join(
            ', '
          )}.  This can be caused if __st_ prefix is missing for staticValues.`
        );
      }

      // ---- Generate the response, by invoking the Invoker and return it to the user
      const context = getContextObject(projectInputs, staticValues);
      const result: { [key: string]: number }[] = [];
      const memo: Map<string, number> = new Map<string, number>();
      const calcTree: CalculationTree = {};

      // Create an array to store promises for all invocations
      const invocationPromises: Promise<void>[] = [];

      /*
        VALIDATION
        -----------
        Check if the quantities passed in the API body, are within the context(model & its dependencies) of the model loaded on the childServer.
      */

      // Get the data of the model mounted in the child server.
      // const mountedModelData: Model = readFileSync(
      //   joinPaths([__dirname, '../', 'models', childServerModel, 'model.json'])
      // );

      // Flatten the dependencies
      const flattenedModelNames = getExtendedModels(childServerModel, [
        childServerModel,
      ]);

      // Perform validation
      for (const qName of quantityNames) {
        const qModelName = qName.split('__')[0];
        if (
          !flattenedModelNames.includes(qModelName || qModelName.toLowerCase())
        ) {
          throw new Error(
            `Quantity ${qName} is not known to the system. As, the currently loaded model on the child server is ${childServerModel}`
          );
        }
      }

      // Create an instance of the Invoker
      const invoker = new Invoker(childServerModel);

      for (const qName of quantityNames) {
        invocationPromises.push(
          new Promise(async (resolve, reject) => {
            setTimeout(async function () {
              try {
                const invokerResult: InvokerResult = await invoker.invoke(
                  qName,
                  context,
                  memo,
                  calcTree
                );

                if (invokerResult) {
                  result.push({ [invokerResult.id]: invokerResult.value });
                }
              } catch (error) {
                reject(error);
              }

              resolve();
            }, 0);
          })
        );
      }

      // Wait for all invocations to complete before sending the response
      await Promise.all(invocationPromises);

      const response: ApiResponse = {
        status: 'success',
        data: result,
      };

      // Return the calcTree, if returnCalcTree is passed in the API.
      if (returnCalcTree) {
        // Modified the structure of the calcTree
        response['calcTree'] = calcTree;
      }

      // If infoContainer is not empty, send it back as a response.
      if (Invoker.getInfoContainer().length) {
        response.infoContainer = Invoker.getInfoContainer();
      }

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
);

// ----------------- Child Server API starts -----------------

// Error Handler for Parent Server
parentApp.use((err: any, req: Request, res: Response, next: any) => {
  // Log the error for debugging

  // console.error(err.stack);
  console.error(err.message);

  // Check if it's a known error with a status code
  if ('status' in err && typeof err.status === 'number') {
    return res.status(err.status).json({
      status: 'error',
      message: err.message,
    });
  }

  let errorMessage = 'Internal Server Error';
  if (err.message) {
    errorMessage = err.message;
  }

  // Handle other types of errors or return a generic error response
  res
    .status(err.statusCode ? err.statusCode : 500)
    .json({ status: 'error', message: errorMessage });
});

// Error Handler for Child Server
childApp.use((err: any, req: Request, res: Response, next: any) => {
  // Log the error for debugging

  console.error(err.stack);

  // Check if it's a known error with a status code
  if ('status' in err && typeof err.status === 'number') {
    return res.status(err.status).json({
      status: 'error',
      message: err.message,
    });
  }

  let errorMessage = 'Internal Server Error';
  if (err.message) {
    errorMessage = err.message;
  }

  // Handle other types of errors or return a generic error response
  res
    .status(err.statusCode ? err.statusCode : 500)
    .json({ status: 'error', message: errorMessage });
});

parentApp.listen(PORT, () => {
  console.log(`Parent Server started on port ${PORT}...`);
});

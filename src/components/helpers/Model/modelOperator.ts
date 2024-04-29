import path from 'path';
import fs from 'fs';

import {
  FunctionSchema,
  Quantity,
  QuantityContainer,
  ModelParser,
} from '../../interfaces';
import {
  readFileSync,
  writeFileSync,
  getModelDirectory,
  getLookupDirectory,
  appendFile,
  joinPaths,
} from '../File/FileHelper';
import { JsonModelParser } from './JsonModelParser';

// -------- Type Declarations

enum CacheKeys {
  ModelDirectory = 'ModelDirectory',
  JsonFilePath = 'JsonFilePath',
  funcFilePath = 'FuncFilePath',
  lookUpFilePath = 'LookUpFilePath',
}

// -------- Type Declarations

export class ModelOperator {
  // private modelData: Model;
  private cache: Map<CacheKeys, any>;
  constructor(private modelParser: ModelParser) {
    try {
      // Setting the cache
      this.cache = new Map<CacheKeys, any>();
      // Perform operations - Reading & validation
      this.modelParser.readModel();
    } catch (error) {
      console.error('Error during initialization in ModelHelper:', error);
    }
  }

  /* Public methods */

  public getQuantitiesJsonFileData(): { quantities: FunctionSchema[] } {
    try {
      const path = this.getJsonFilePath();
      const functionsJsonData = readFileSync(path);

      return functionsJsonData ? functionsJsonData : [];
    } catch (error) {
      console.log(error);
    }
  }

  public async getQuantitiesFuncFileData(): Promise<{
    quantities: Function[];
  }> {
    try {
      // Delete the cached module
      delete require.cache[require.resolve(this.getFuncFilePath())];

      // Importing the latest copy of the file
      let functionsData = await import(this.getFuncFilePath());

      // -----------------------------------------------------------------
      // Loading the dependent models

      // Import the dependent functions for the model
      let dependentModels = this.modelParser.modelData.extends;
      if (dependentModels && dependentModels.length) {
        dependentModels = dependentModels.map((model) =>
          model.replace('../', '')
        );

        // Use Promise.all to wait for all imports to finish
        const importedFunctionsPromises = dependentModels.map(async (model) => {
          const path = joinPaths([
            getModelDirectory(),
            model,
            'code',
            'quantities_implementation.ts',
          ]);

          return await import(path);
        });

        const importedFunctionsArray = await Promise.all(
          importedFunctionsPromises
        );

        // -----------------------------------------------------------------

        for (let el of importedFunctionsArray) {
          functionsData = { ...functionsData, ...el };
        }
      }
      return functionsData ? functionsData : { quantities: [] };
    } catch (error) {
      console.log(error);
      // Handle the error appropriately, e.g., throw or return a default value
      throw error;
    }
  }

  public async refreshQuantitiesFiles(): Promise<string[]> {
    // Recursively resolve the dependent models & generate the files.
    let dependentModels = this.modelParser.modelData?.extends;

    if (dependentModels) {
      dependentModels = dependentModels.map((model) =>
        model.replace('../', '')
      );

      dependentModels.map((modelName) => {
        const modelParser = new JsonModelParser(modelName);
        const modelOperator = new ModelOperator(modelParser);
        modelOperator.refreshQuantitiesFiles();
      });
    }

    try {
      const deletionStatus = await this.deleteQuantitiesFileData();
      const lookUpDeletionStatus = await this.createNewQuantitiesFiles();
      return [deletionStatus, lookUpDeletionStatus];
    } catch (error) {
      console.error('Error refreshing quantities files:', error);
      throw error; // Re-throw the error for further handling
    }
  }

  // Fetch the quantities from the model
  public fetchQuantities() {
    return this.modelParser.modelData?.quantities;
  }

  // Resolve the dependencies of the model & generates the quantities_structure.json file.
  // Also, Refresh the quantities files.
  public resolveDependentModelsInBuild(
    generatedModels: Set<string> = new Set()
  ) {
    if (!generatedModels) {
      generatedModels = new Set(); //
    }

    // Fetch the extends object in the model
    const dependentModels = this.fetchDependencies()?.map(
      (quantity) => quantity.replace('../', '') // Remove the "../"
    );

    if (dependentModels) {
      // Fetch the models, based on the dependentModels
      dependentModels.map((model) => {
        const modelParser = new JsonModelParser(model);
        modelParser.readModel();
        const modelOperator = new ModelOperator(modelParser);

        // Resolve the dependencies recursively.
        // Check if the model has already been generated before adding it to the set
        if (
          modelParser.modelData.extends &&
          !generatedModels.has(modelParser.modelName)
        ) {
          // Add the model to the generatedModels Set
          generatedModels.add(model);
          modelOperator.resolveDependentModelsInBuild(generatedModels);
        }

        // Store the data into thier respective files
        const filePath = path.join(
          getModelDirectory(),
          modelParser.modelName,
          'code',
          'quantities_structure.json'
        );

        const funcContainer: FunctionSchema[] = [];
        // Store all the function structures into funcContainer

        modelParser.modelData.quantities.map((quantity) => {
          // Generate the function to be stored in the quantity file.
          const dataToWrite = this.generateFunctionForQuantity(quantity);

          // Add the types to the "arguments" property of dataToWrite
          const typesData = modelParser.modelData.types;

          if (typesData && dataToWrite.arguments) {
            let args = dataToWrite.arguments.split(',');
            // Loop through the args and check if the data for the argument is provided in the typeData
            args = args.map((arg) => {
              const typeKeys = Object.keys(typesData);
              if (typeKeys.includes(arg)) {
                return `${arg}:${typesData[arg]}`;
              }
              return arg;
            });

            dataToWrite.arguments = args.join(',');
          }
          funcContainer.push(dataToWrite);
        });

        const dataToStore = `{"quantities" : ${JSON.stringify(funcContainer)}}`;

        writeFileSync(filePath, dataToStore, true);
      });
    }
  }

  public generateFunctionForQuantity(quantity: Quantity) {
    const generatedFunction = {
      id: quantity.id,
      arguments: '',
      body: quantity.output,
    };

    this.addArrayToArguments(quantity.projectInputs, generatedFunction);
    this.addArrayToArguments(quantity.staticValues, generatedFunction);
    this.addArrayToArguments(quantity.lookUps, generatedFunction);
    this.addArrayToArguments(quantity.quantities, generatedFunction);

    return generatedFunction;
  }

  public storeCode(qContainer: QuantityContainer[]): void {
    for (const containerEl in qContainer) {
      const element = qContainer[containerEl];
      // ====================================================

      // UPDATING quantities_structure.json
      // -----------------------------------

      // Read the existing quantities_structure.json data
      const qfPath = this.getJsonFilePath();

      let qfData = readFileSync(qfPath);
      qfData = qfData ? qfData : null;

      if (qfData) {
        qfData.quantities.push(element.dataToWrite);

        // Add the data to the existing quantities
        writeFileSync(this.getJsonFilePath(), JSON.stringify(qfData));
      }
    }
  }

  public storeLookUps(): void {
    const lookUpsRelations = this.fetchLookUps();
    const lookUpFilePath = path.join(getLookupDirectory(), 'lookup.ts');

    if (lookUpsRelations) {
      const fnContainer: string[] = [];
      for (const lk in lookUpsRelations) {
        const fn = `export function ${lk} (${lookUpsRelations[lk]}) {}`;
        fnContainer.push(fn);
      }

      writeFileSync(lookUpFilePath, fnContainer.join(' '));
    } else {
      writeFileSync(lookUpFilePath, '');
      console.log(
        'We have not found any lookups in the model.ts file. Generated an empty lookup file.'
      );
    }
  }

  public getAlreadyGeneratedFunctionData(): Map<
    string,
    { arguments: string[]; isAsync: boolean }
  > {
    const filePath = this.getFuncFilePath();

    // Read the contents of the TypeScript file
    let fileContents = fs.readFileSync(filePath, { encoding: 'utf-8' });

    // -----------------------------------------------------------------
    // Loading the dependent models

    let dependentModels = this.modelParser.modelData.extends;
    if (dependentModels?.length) {
      dependentModels = dependentModels.map((model) =>
        model.replace('../', '')
      );

      // Read each of the dependentModel 'quantities_implementation.ts' file, and append it to the fileContents.
      const importedFunctionsPromises = dependentModels.map(async (model) => {
        const dependentModelPath = joinPaths([
          getModelDirectory(),
          model,
          'code',
          'quantities_implementation.ts',
        ]);

        const data = fs.readFileSync(dependentModelPath, { encoding: 'utf-8' });
        fileContents = fileContents.concat(data);
      });

      // -----------------------------------------------------------------
    }

    // Regular expression to match TypeScript function declarations with arguments
    const functionRegex = /export\s+(async\s+)?function\s+(\w+)\s*\(([^)]*)\)/g;

    // Map to store extracted function names and arguments
    const functionsInfo = new Map();

    // Match function declarations and add function names and arguments to the map
    let match;
    while ((match = functionRegex.exec(fileContents)) !== null) {
      // Check if the function is async
      const isAsync = match[1] !== undefined;

      // The function name is captured in the first capturing group
      const functionName = match[2];

      // The function arguments are captured in the second capturing group
      const functionArguments = match[3].split(',').map((arg) => arg.trim());

      // If the array has a single empty string element, replace it with null
      const sanitizedArguments =
        functionArguments.length === 1 && functionArguments[0] === ''
          ? []
          : functionArguments;

      functionsInfo.set(functionName, {
        arguments: sanitizedArguments,
        isAsync,
      });
    }

    return functionsInfo;
  }

  public getLookUpData(): Map<
    string,
    { arguments: string[]; isAsync: boolean }
  > {
    try {
      const filePath = this.getLookUpFilePath();

      // Read the contents of the TypeScript file
      const fileContents = fs.readFileSync(filePath, { encoding: 'utf-8' });

      // Regular expression to match TypeScript function declarations with arguments
      const functionRegex = /function\s+(\w+)\s*\(([^)]*)\)\s*{/g;

      // Map to store extracted function names and arguments
      const functionsInfo = new Map();

      // Match function declarations and add function names and arguments to the map
      let match;
      while ((match = functionRegex.exec(fileContents)) !== null) {
        // The function name is captured in the first capturing group
        const functionName = match[1];

        // The function arguments are captured in the second capturing group
        const functionArguments = match[2].split(',').map((arg) => arg.trim());

        // If the array has a single empty string element, replace it with null
        const sanitizedArguments =
          functionArguments.length === 1 && functionArguments[0] === ''
            ? []
            : functionArguments;

        functionsInfo.set(functionName, { arguments: sanitizedArguments });
      }

      return functionsInfo;
    } catch (error) {
      console.log(error);
    }
  }

  public async getLookupFileData(): Promise<{
    lookUps: { [key: string]: string[] };
  }> {
    try {
      const lookUpData = await import(this.getLookUpFilePath());

      return lookUpData ? lookUpData : [];
    } catch (error) {
      console.log(error);
    }
  }

  // Resolve the dependencies of the model & generates the quantities_implementation.ts file.
  // public resolveDependentModelsInPostBuild() {
  //   // Fetch the extends object in the model
  //   const dependentModels = this.fetchDependencies()?.map(
  //     (quantity) => quantity.replace('../', '') // Remove the "../"
  //   );

  //   if (dependentModels && dependentModels.length) {
  //     // Fetch the models, based on the dependentModels
  //     dependentModels.map((model) => {
  //       const modelParser = new JsonModelParser(model);
  //       modelParser.readModel();
  //       const modelOperator = new ModelOperator(modelParser);

  //       if (modelParser?.modelData?.extends?.length) {
  //         const models = modelParser?.modelData?.extends?.map(
  //           (quantity) => quantity.replace('../', '') // Remove the "../"
  //         );

  //         models.forEach((model) => {
  //           console.log(modelParser.modelName, model);
  //           const dependentModelParser = new JsonModelParser(model);
  //           dependentModelParser.readModel();
  //           const dependentModelOperator = new ModelOperator(
  //             dependentModelParser
  //           );
  //           dependentModelOperator.resolveDependentModelsInPostBuild();
  //         });
  //       }

  //       const quantitiesDefData = modelOperator.getQuantitiesJsonFileData();
  //       const alreadyGeneratedFunctions =
  //         modelOperator.getAlreadyGeneratedFunctionData();

  //       const quantitiesToGenerate = quantitiesDefData.quantities.filter(
  //         (quantity) => !alreadyGeneratedFunctions.has(quantity.id)
  //       );

  //       if (quantitiesToGenerate.length <= 0) {
  //         console.log('No new quantites functions to generate.');
  //         return;
  //       }

  //       const quantitiesFunctions: string[] = [
  //         // "import * as utilities from '../../../utilities/utility';  \n\n",
  //       ];
  //       quantitiesToGenerate.map((el: FunctionSchema) => {
  //         let functionPrefix = '';
  //         // Check if the quantity 'body' has the 'await' keyword.
  //         if (el.body.includes('await')) {
  //           // If yes, the add the async keyword to the function defination
  //           functionPrefix = 'async';
  //         }

  //         const generatedFunction = `export ${functionPrefix} function ${el.id}(${el.arguments}){${el.body}}`;

  //         quantitiesFunctions.push(generatedFunction);
  //       });

  //       const qfFilePath = path.join(
  //         modelOperator.resolveModelDirectory(),
  //         '/',
  //         'quantities_implementation.ts'
  //       );

  //       // TODO: Optimize to do the append in one go.
  //       quantitiesFunctions.map((qf) => {
  //         appendFile(qfFilePath, qf);
  //       });

  //       // quantitiesToGenerate.map((el) =>
  //       //   console.log(
  //       //     `quantities_implementation.ts for ${el.id} generated successfully at ${qfFilePath}.`
  //       //   )
  //       // );
  //     });
  //   }
  // }

  /* Private methods */

  private deleteQuantitiesFileData(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const filePath = this.resolveModelDirectory()
          ? this.getFuncFilePath()
          : null;
        if (!filePath) {
          throw new Error(
            'The resolveModelDirectory method was not able to resolve the directory for the current model.'
          );
        }

        let returnMsg: string = '';
        if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath);
          returnMsg = `${filePath} was deleted`;
        } else {
          returnMsg = `No need to delete ${filePath}. It's already deleted 😃.`;
        }
        resolve(returnMsg);
      } catch (error) {
        console.log(error);
        reject(
          'An error occured in the deleteQuantitiesFileData() in helper file.'
        );
      }
    });
  }

  private createNewQuantitiesFiles(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const parentDirectory = this.resolveModelDirectory()
          ? this.resolveModelDirectory()
          : null;
        const jsonFilePath = this.getJsonFilePath();
        const funcFilePath = this.getFuncFilePath();

        if (!jsonFilePath || !funcFilePath) {
          throw new Error(
            'The resolveModelDirectory method was not able to provide the directory for the current model.'
          );
        }

        // Create the directory "code" if it doesn't exist
        if (!fs.existsSync(parentDirectory)) {
          await fs.promises.mkdir(parentDirectory, { recursive: true });
        }

        // Generate the new functions JS file
        // a. Get the types data from the utilities/type.ts file
        const typesFilePath = joinPaths([
          __dirname,
          '../',
          '../',
          '../',
          'utilities',
          'types.ts',
        ]);
        const content = fs.readFileSync(typesFilePath, 'utf8');

        // Match lines starting with "export type" and capture the type names
        const regex = /export type (\w+)/g;
        const matches = Array.from(
          content.matchAll(regex),
          (match) => match[1]
        );

        let importStatement = '';
        if (matches) {
          // Generate import statement
          importStatement = `import { ${matches.join(
            ', '
          )} } from '../../../utilities/types';`;
        } else {
          console.log('No type names found in the file.');
        }

        // b. Write the file
        await fs.promises.writeFile(
          funcFilePath,
          `import { irr } from 'node-irr'; ${importStatement} import * as utilities from '../../../utilities/utility'; import { CityDbData, SDPlusDefaultsStore } from '../../../utilities/stores';`
        );

        // Generate the new functions JSON file
        await fs.promises.writeFile(
          jsonFilePath,
          `{
            "quantities": [
            ]
          }`
        );
        resolve('Quantities file is in fresh state now');
      } catch (error) {
        console.log(error);
        reject(
          'An error occured in the createNewQuantitiesFiles() in helper file'
        );
      }
    });
  }

  private fetchLookUps() {
    const lookUpRelations = this.modelParser.modelData?.lookUpRelations;
    if (lookUpRelations) {
      return lookUpRelations;
    }
  }

  // Returns the path, for the generated code to be saved.
  private resolveModelDirectory() {
    // If the "ModelDirectory" is found in cache, fetch and return it
    if (this.cache.get(CacheKeys.ModelDirectory)) {
      return this.cache.get(CacheKeys.ModelDirectory);
    }

    // Else, resolve the "ModelDirectory"
    const filePath = path.join(
      getModelDirectory(),
      this.modelParser.modelName,
      'code'
    );

    // Save the resolved "ModelDirectory" to the cache
    if (filePath) this.cache.set(CacheKeys.ModelDirectory, filePath);

    return filePath ? filePath : null;
  }

  private getJsonFilePath() {
    // If the "JsonFilePath" is found in cache, fetch and return it
    if (this.cache.get(CacheKeys.JsonFilePath)) {
      return this.cache.get(CacheKeys.JsonFilePath);
    }

    // Else, resolve the "JsonFilePath"
    const parentDirectory = this.resolveModelDirectory();
    const jsonFilePath = parentDirectory
      ? path.join(parentDirectory, '/', 'quantities_structure.json')
      : null;

    // Save the resolved "JsonFilePath" to the cache
    this.cache.set(CacheKeys.JsonFilePath, jsonFilePath);

    return jsonFilePath;
  }

  public getFuncFilePath() {
    // If the "funcFilePath" is found in cache, fetch and return it
    if (this.cache.get(CacheKeys.funcFilePath)) {
      return this.cache.get(CacheKeys.funcFilePath);
    }

    // Else, resolve the "funcFilePath"
    const parentDirectory = this.resolveModelDirectory();
    const funcFilePath = parentDirectory
      ? path.join(parentDirectory, '/', 'quantities_implementation.ts')
      : null;

    // Save the resolved "funcFilePath" to the cache
    this.cache.set(CacheKeys.funcFilePath, funcFilePath);
    return funcFilePath;
  }

  private getLookUpFilePath() {
    // If the "lookUpFilePath" is found in cache, fetch and return it
    if (this.cache.get(CacheKeys.lookUpFilePath)) {
      return this.cache.get(CacheKeys.lookUpFilePath);
    }

    // Else, resolve the "lookUpFilePath"
    const parentDirectory = getLookupDirectory();
    const lookUpFilePath = parentDirectory
      ? path.join(parentDirectory, '/', 'lookup.ts')
      : null;

    // Save the resolved "funcFilePath" to the cache
    this.cache.set(CacheKeys.lookUpFilePath, lookUpFilePath);
    return lookUpFilePath;
  }

  private addArrayToArguments(array, generatedFunction): void {
    if (array && array.length > 0) {
      generatedFunction.arguments +=
        (generatedFunction.arguments.length > 0 ? ',' : '') + array.join(',');
    }
  }

  // Fetch the dependent quantities from the model
  private fetchDependencies() {
    return this.modelParser.modelData?.extends;
  }
}

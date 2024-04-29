// import path from 'path';
// import fs from 'fs';

// import * as Helper from '../../utils/utils';
// import {
//   FunctionSchema,
//   Model,
//   Quantity,
//   QuantityContainer,
// } from '../../interfaces';

// // -------- Type Declarations

// enum CacheKeys {
//   ModelDirectory = 'ModelDirectory',
//   JsonFilePath = 'JsonFilePath',
//   funcFilePath = 'FuncFilePath',
//   lookUpFilePath = 'LookUpFilePath',
// }

// interface ModelReader {
//   data: Model[];
//   readModel(): void;
// }

// // -------- Type Declarations

// export class ModelHelper {
//   private modelData: Model;
//   private cache: Map<CacheKeys, any>;
//   constructor(private reader: ModelReader) {
//     this.cache = new Map<CacheKeys, any>();
//   }

//   /* Public methods */

//   public async initializeModel() {
//     try {
//       // Perform operations - Reading & validation
//       await this.readModel();
//       this.validateModel();
//     } catch (error) {
//       console.error('Error during initialization in ModelHelper:', error);
//     }
//   }

//   public getQuantitiesJsonFileData(): { quantities: FunctionSchema[] } {
//     try {
//       const functionsJsonData = Helper.readFileSync(this.getJsonFilePath());

//       return functionsJsonData ? functionsJsonData : [];
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   public async getQuantitiesFuncFileData(): Promise<{
//     quantities: Function[];
//   }> {
//     try {
//       const functionsData = await import(this.getFuncFilePath());

//       return functionsData ? functionsData : [];
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   public refreshQuantitiesFiles(): Promise<string[]> {
//     return Promise.all([
//       this.deleteQuantitiesFileData(),
//       this.createNewQuantitiesFiles(),
//     ]);
//   }

//   public fetchQuantities() {
//     const quantities = this.modelData?.quantities;
//     if (quantities) {
//       return quantities;
//     }
//   }

//   public generateFunctionForQuantity(quantity: Quantity) {
//     const generatedFunction = {
//       id: quantity.id,
//       arguments: '',
//       body: quantity.output,
//     };

//     this.addArrayToArguments(quantity.projectInputs, generatedFunction);
//     this.addArrayToArguments(quantity.staticValues, generatedFunction);
//     this.addArrayToArguments(quantity.lookUps, generatedFunction);
//     this.addArrayToArguments(quantity.quantities, generatedFunction);

//     return generatedFunction;
//   }

//   public storeCode(qContainer: QuantityContainer[]): void {
//     for (const containerEl in qContainer) {
//       const element = qContainer[containerEl];
//       // ====================================================

//       // UPDATING quantities_func.json
//       // -----------------------------------

//       // Read the existing quantities_func.json data
//       const qfPath = this.getJsonFilePath();

//       let qfData = Helper.readFileSync(qfPath);
//       qfData = qfData ? qfData : null;

//       if (qfData) {
//         qfData.quantities.push(element.dataToWrite);

//         // Add the data to the existing quantities
//         Helper.writeFileSync(this.getJsonFilePath(), JSON.stringify(qfData));
//       }
//     }
//   }

//   public storeLookUps(): void {
//     const lookUpsRelations = this.fetchLookUps();
//     const lookUpFilePath = path.join(this.modelDirectory, 'code', 'lookup.ts');

//     if (lookUpsRelations) {
//       const fnContainer: string[] = [];
//       for (const lk in lookUpsRelations) {
//         const fn = `export function ${lk} (${lookUpsRelations[lk]}) {}`;
//         fnContainer.push(fn);
//       }

//       Helper.writeFileSync(lookUpFilePath, fnContainer.join(' '));
//     } else {
//       Helper.writeFileSync(lookUpFilePath, '');
//       console.log(
//         'We have not found any lookups in the model.ts file. Generated an empty lookup file'
//       );
//     }
//   }

//   public getAlreadyGeneratedFunctionData(): Map<
//     string,
//     { arguments: string[]; isAsync: boolean }
//   > {
//     const filePath = this.getFuncFilePath();

//     // Read the contents of the TypeScript file
//     const fileContents = fs.readFileSync(filePath, 'utf-8');

//     // Regular expression to match TypeScript function declarations with arguments
//     const functionRegex = /export\s+(async\s+)?function\s+(\w+)\s*\(([^)]*)\)/g;

//     // Map to store extracted function names and arguments
//     const functionsInfo = new Map();

//     // Match function declarations and add function names and arguments to the map
//     let match;
//     while ((match = functionRegex.exec(fileContents)) !== null) {
//       // Check if the function is async
//       const isAsync = match[1] !== undefined;

//       // The function name is captured in the first capturing group
//       const functionName = match[2];

//       // The function arguments are captured in the second capturing group
//       const functionArguments = match[3].split(',').map((arg) => arg.trim());

//       // If the array has a single empty string element, replace it with null
//       const sanitizedArguments =
//         functionArguments.length === 1 && functionArguments[0] === ''
//           ? []
//           : functionArguments;

//       functionsInfo.set(functionName, {
//         arguments: sanitizedArguments,
//         isAsync,
//       });
//     }

//     return functionsInfo;
//   }

//   public getLookUpData(): Map<
//     string,
//     { arguments: string[]; isAsync: boolean }
//   > {
//     try {
//       const filePath = this.getLookUpFilePath();

//       // Read the contents of the TypeScript file
//       const fileContents = fs.readFileSync(filePath, 'utf-8');

//       // Regular expression to match TypeScript function declarations with arguments
//       const functionRegex = /function\s+(\w+)\s*\(([^)]*)\)\s*{/g;

//       // Map to store extracted function names and arguments
//       const functionsInfo = new Map();

//       // Match function declarations and add function names and arguments to the map
//       let match;
//       while ((match = functionRegex.exec(fileContents)) !== null) {
//         // The function name is captured in the first capturing group
//         const functionName = match[1];

//         // The function arguments are captured in the second capturing group
//         const functionArguments = match[2].split(',').map((arg) => arg.trim());

//         // If the array has a single empty string element, replace it with null
//         const sanitizedArguments =
//           functionArguments.length === 1 && functionArguments[0] === ''
//             ? []
//             : functionArguments;

//         functionsInfo.set(functionName, { arguments: sanitizedArguments });
//       }

//       return functionsInfo;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   public async getLookupFileData(): Promise<{
//     lookUps: { [key: string]: string[] };
//   }> {
//     try {
//       const lookUpData = await import(this.getLookUpFilePath());

//       return lookUpData ? lookUpData : [];
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   /* Private methods */

//   private deleteQuantitiesFileData(): Promise<string> {
//     return new Promise((resolve, reject) => {
//       try {
//         const filePath = this.resolveModelDirectory()
//           ? this.getFuncFilePath()
//           : null;
//         if (!filePath) {
//           throw new Error(
//             'The resolveModelDirectory method was not able to provide the directory for the current model.'
//           );
//         }

//         let returnMsg: string = '';
//         fs.exists(filePath, (exists) => {
//           if (exists) {
//             fs.unlink(filePath, (err) => {
//               if (err) throw err;
//             });
//             returnMsg = `${filePath} was deleted`;
//           } else {
//             returnMsg = `No need to delete ${filePath}. It's already deleted 😃.`;
//           }
//           resolve(returnMsg);
//         });
//       } catch (error) {
//         console.log(error);
//         reject(
//           'An error occured in the deleteQuantitiesFileData() in helper file'
//         );
//       }
//     });
//   }

//   private createNewQuantitiesFiles(): Promise<string> {
//     return new Promise((resolve, reject) => {
//       try {
//         const parentDirectory = this.resolveModelDirectory();
//         const jsonFilePath = this.getJsonFilePath();
//         const funcFilePath = this.getFuncFilePath();

//         if (!jsonFilePath || !funcFilePath) {
//           throw new Error(
//             'The resolveModelDirectory method was not able to provide the directory for the current model.'
//           );
//         }

//         // Create the directory "code" if it doesn't exist
//         if (!fs.existsSync(parentDirectory)) {
//           fs.mkdirSync(parentDirectory, { recursive: true });
//         }

//         // Generate the new functions JS file
//         fs.writeFileSync(
//           funcFilePath,
//           `import { irr } from 'node-irr';`,
//           'utf-8'
//         );

//         // Generate the new functions JSON file
//         fs.writeFileSync(
//           jsonFilePath,
//           `{
//             "quantities": [
//             ]
//           }`,
//           'utf-8'
//         );

//         resolve('Quantities file is in fresh state now');
//       } catch (error) {
//         console.log(error);
//         reject(
//           'An error occured in the createNewQuantitiesFiles() in helper file'
//         );
//       }
//     });
//   }

//   private fetchLookUps() {
//     const lookUpRelations = this.modelData?.lookUpRelations;
//     if (lookUpRelations) {
//       return lookUpRelations;
//     }
//   }

//   // Returns the path, for the generated code to be saved.
//   private resolveModelDirectory() {
//     // If the "ModelDirectory" is found in cache, fetch and return it
//     if (this.cache.get(CacheKeys.ModelDirectory)) {
//       return this.cache.get(CacheKeys.ModelDirectory);
//     }

//     // Else, resolve the "ModelDirectory"
//     const pattern = /models\\(.*?)\\model.ts/;
//     const modelName = pattern.exec(this.getModelPath());
//     const filePath = path.join(
//       __dirname,
//       '../',
//       '../',
//       'models',
//       `${modelName[1]}`,
//       'code'
//     );

//     // Save the resolved "ModelDirectory" to the cache
//     if (filePath) this.cache.set(CacheKeys.ModelDirectory, filePath);

//     return filePath ? filePath : null;
//   }

//   private getJsonFilePath() {
//     // If the "JsonFilePath" is found in cache, fetch and return it
//     if (this.cache.get(CacheKeys.JsonFilePath)) {
//       return this.cache.get(CacheKeys.JsonFilePath);
//     }

//     // Else, resolve the "JsonFilePath"
//     const parentDirectory = this.resolveModelDirectory();
//     const jsonFilePath = parentDirectory
//       ? path.join(parentDirectory, '/', 'quantities_def.json')
//       : null;

//     // Save the resolved "JsonFilePath" to the cache
//     this.cache.set(CacheKeys.JsonFilePath, jsonFilePath);

//     return jsonFilePath;
//   }

//   public getFuncFilePath() {
//     // If the "funcFilePath" is found in cache, fetch and return it
//     if (this.cache.get(CacheKeys.funcFilePath)) {
//       return this.cache.get(CacheKeys.funcFilePath);
//     }

//     // Else, resolve the "funcFilePath"
//     const parentDirectory = this.resolveModelDirectory();
//     const funcFilePath = parentDirectory
//       ? path.join(parentDirectory, '/', 'quantities_func.ts')
//       : null;

//     // Save the resolved "funcFilePath" to the cache
//     this.cache.set(CacheKeys.funcFilePath, funcFilePath);
//     return funcFilePath;
//   }

//   private getLookUpFilePath() {
//     // If the "lookUpFilePath" is found in cache, fetch and return it
//     if (this.cache.get(CacheKeys.lookUpFilePath)) {
//       return this.cache.get(CacheKeys.lookUpFilePath);
//     }

//     // Else, resolve the "lookUpFilePath"
//     const parentDirectory = this.resolveModelDirectory();
//     const lookUpFilePath = parentDirectory
//       ? path.join(parentDirectory, '/', 'lookup.ts')
//       : null;

//     // Save the resolved "funcFilePath" to the cache
//     this.cache.set(CacheKeys.lookUpFilePath, lookUpFilePath);
//     return lookUpFilePath;
//   }

//   private addArrayToArguments(array, generatedFunction): void {
//     if (array && array.length > 0) {
//       generatedFunction.arguments +=
//         (generatedFunction.arguments.length > 0 ? ',' : '') + array.join(',');
//     }
//   }
// }

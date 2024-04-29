import path from 'path';
import { Model, ModelParser } from '../../interfaces';
import { readFileSync } from '../File/FileHelper';

export class JsonModelParser implements ModelParser {
  modelData: Model;

  constructor(public modelName: string) {}

  readModel(): void {
    try {
      const importedObject: Model = readFileSync(
        path.join(
          __dirname,
          '../',
          '../',
          '../',
          'models',
          this.modelName,
          'model.json'
        )
      );
      if (importedObject) {
        this.modelData = importedObject;

        this.displayModelData();
      }
    } catch (error) {
      console.error('Error during readModel in ModelHelper:', error);
    }
  }

  private displayModelData(): void {
    // console.log('ModelHelper.modelData:', this.modelData);
  }

  // TODO: Fix the validation of the model
  validateModel(): void {
    //     if (!this.modelData || !this.modelData.quantities) {
    //       console.error('Model data is undefined or does not contain quantities.');
    //       return;
    //     }
    //     const validateArray = (arr: string[], prefix: string, quantityId) => {
    //       arr.forEach((value) => {
    //         if (value && !value.startsWith(prefix)) {
    //           throw new Error(
    //             `Invalid value in the model for the quantity "${quantityId}". Expected prefix '${prefix}' for '${value}'.`
    //           );
    //         }
    //       });
    //     };
    //     this.modelData.quantities.forEach((quantity) => {
    //       if (quantity.projectInputs) {
    //         validateArray(quantity.projectInputs, 'pi_', quantity['id']);
    //       }
    //       if (quantity.staticValues) {
    //         validateArray(quantity.staticValues, 'st_', quantity['id']);
    //       }
    //       if (quantity.quantities) {
    //         validateArray(quantity.quantities, 'q_', quantity['id']);
    //       }
    //     });
  }
}

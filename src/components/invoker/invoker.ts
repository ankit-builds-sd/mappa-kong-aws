import { ModelOperator } from '../helpers/Model/modelOperator';
import { JsonModelParser } from '../helpers/Model/JsonModelParser';
import { Context } from '../interfaces';

type q_lk_data = Map<
  string,
  {
    arguments: string[];
    isAsync: boolean;
  }
>;

export class Invoker {
  private static infoContainer: string[] = [];
  private qFuncData: q_lk_data;
  private lookUpData: q_lk_data;
  private q_lk_data: q_lk_data;
  private quantitiesFunc: { quantities: Function[] };
  private lookUpFunc: { lookUps: { [key: string]: string[] } };

  constructor(public modelName: string) {
    this.configInvoker();
  }

  public async configInvoker() {
    // Create a new instance of the ModelParser.
    const parser = new JsonModelParser(this.modelName);
    parser.readModel();

    // Create a new instance of the ModelOperator, and pass the instance of ModelParser to it.
    const modelOperator = new ModelOperator(parser);

    // If not present, then calcuate the value.
    // this.qFuncData = modelOperator.getAlreadyGeneratedFunctionData();
    this.qFuncData = this.getAllGeneratedFunctionData(modelOperator, parser);

    // this.lookUpData = modelOperator.getLookUpData();
    this.lookUpData = this.getLookUpData(modelOperator, parser);
    this.q_lk_data = new Map([...this.qFuncData, ...this.lookUpData]);

    this.quantitiesFunc = await this.getAllQuantities(modelOperator, parser);
    // const qfOld = await modelOperator.getQuantitiesFuncFileData();
    this.lookUpFunc = await modelOperator.getLookupFileData();
  }

  public async getAllQuantities(
    modelOperator: ModelOperator,
    modelParser: JsonModelParser
  ): Promise<{
    quantities: Function[];
  }> {
    let quantities = [];

    const currentModelQuantities =
      await modelOperator.getQuantitiesFuncFileData();

    if ('quantities' in currentModelQuantities) {
      quantities = quantities.concat(currentModelQuantities.quantities);
    } else {
      quantities = quantities.concat(currentModelQuantities);
    }

    // Check if the model has children/dependent models
    if (modelParser.modelData.extends) {
      const cleanChildModels = modelParser.modelData.extends.map((model) =>
        model.replace('../', '')
      );

      for (const childModel of cleanChildModels) {
        const childModelParser = new JsonModelParser(childModel);
        const childModelOperator = new ModelOperator(childModelParser);

        const childQuantities =
          await childModelOperator.getQuantitiesFuncFileData();

        if ('quantities' in childQuantities) {
          quantities = quantities.concat(childQuantities.quantities);
        } else {
          quantities = quantities.concat(childQuantities);
        }
      }
    }

    const result = quantities.reduce((acc, obj) => {
      return { ...acc, ...obj };
    }, {});

    return result;
  }

  public getAllGeneratedFunctionData(
    modelOperator: ModelOperator,
    modelParser: JsonModelParser
  ) {
    let functionsData = new Map();

    const currentModelQuantities =
      modelOperator.getAlreadyGeneratedFunctionData();

    currentModelQuantities.forEach((value, key) => {
      functionsData.set(key, value);
    });

    // Check if the model has children/dependent models
    if (modelParser.modelData.extends) {
      const cleanChildModels = modelParser.modelData.extends.map((model) =>
        model.replace('../', '')
      );

      for (const childModel of cleanChildModels) {
        const childModelParser = new JsonModelParser(childModel);
        const childModelOperator = new ModelOperator(childModelParser);

        const childFunctionsData =
          childModelOperator.getAlreadyGeneratedFunctionData();

        functionsData = new Map([...functionsData, ...childFunctionsData]);
      }
    }

    return functionsData;
  }

  public getLookUpData(
    modelOperator: ModelOperator,
    modelParser: JsonModelParser
  ) {
    let lookUpsData = new Map();

    const currentModelLookUps = modelOperator.getLookUpData();

    currentModelLookUps.forEach((value, key) => {
      lookUpsData.set(key, value);
    });

    // Check if the model has children/dependent models
    if (modelParser.modelData.extends) {
      const cleanChildModels = modelParser.modelData.extends.map((model) =>
        model.replace('../', '')
      );

      for (const childModel of cleanChildModels) {
        const childModelParser = new JsonModelParser(childModel);
        const childModelOperator = new ModelOperator(childModelParser);

        const childLookUpsData = childModelOperator.getLookUpData();

        lookUpsData = new Map([...lookUpsData, ...childLookUpsData]);
      }
    }

    return lookUpsData;
  }

  public async invoke(
    fnName: string,
    context: Context,
    memo: Map<string, number>,
    calcTree: { [key: string]: any } = {}
  ) {
    try {
      this.configInvoker();
      // Reset the InfoContainer
      Invoker.setInfoContainer();

      // Validations
      if (!fnName) {
        throw new Error('The invoke() method should have the fnName property.');
      }

      if (!context) {
        throw new Error(
          'The invoke() method should have the context property.'
        );
      }

      // Initializing the memo.
      if (!memo) {
        throw new Error('The invoke() method should have the memo property.');
      }

      // Initializing the calcTree.
      if (!calcTree) {
        throw new Error(
          'The invoke() method should have the calcTree property.'
        );
      }
      if (!calcTree[fnName]) {
        calcTree[fnName] = { value: 0, child: [] };
      }

      if (memo.has(fnName)) {
        // Check if the result is already memoized
        // If present, then return it.
        return { id: fnName, value: memo.get(fnName)! };
      }

      // Find the function in the quantitiesFunc object
      const targetFunction =
        this.quantitiesFunc[fnName] || this.lookUpFunc[fnName];

      if (!targetFunction) {
        throw new Error(
          `Function with id '${fnName}' not found in system, for the currently loaded model ${this.modelName}.`
        );
      }

      const functionParts = this.q_lk_data.get(fnName);
      // Get the arguments from the q_lk_data map.
      const argumentNames = functionParts.arguments;

      // Remove the types from the argumentNames
      const cleanArgumentNames = argumentNames.map((arg) => {
        return arg.split(':')[0];
      });

      const argumentParts = new Map<string, [string, string, string]>();

      // Seperate out the <argId, modelName, elementType, elementName> into a map
      // Format <argId, [modelName, elementType, elementName]>
      cleanArgumentNames.map((arg) => {
        // Check if the arguments format is correct
        if (!arg.includes('__') || !arg.includes('_')) {
          throw new Error(
            `The argument ${arg} does not follow the standard of <namespace>__<elementType>_<elementName>.`
          );
        }

        const argPart = arg.split('__'); // ["hwm", "pi_pi1"]
        const modelName = argPart[0];
        const elementType = argPart[1].split('_')[0];
        const elementName = argPart[1].split('_')[1];

        argumentParts.set(arg, [modelName, elementType, elementName]);
      });

      // Resolve each argument recursively
      const resolvedArguments: any =
        cleanArgumentNames.length > 0
          ? await Promise.all(
              cleanArgumentNames.map(async (argId) => {
                // Get the argName from argumentParts
                // const cleanArgId = argId.trim().replace(/^(pi_|st_)/, '');
                const cleanArgId = argumentParts.get(argId)[2];

                // If the argument is a function starting with 'q_', recursively "invoke" it
                if (
                  argumentParts.get(argId)[1].includes('q') ||
                  argumentParts.get(argId)[1].includes('lk')
                ) {
                  return await this.invoke(argId, context, memo, calcTree);
                }

                let argValue =
                  context.projectInputs[argId] !== undefined
                    ? context.projectInputs[argId]
                    : context.staticValues[argId];

                if (argValue != 0 && argValue !== null && !argValue) {
                  throw new Error(
                    `Argument with id '${argId}' not found in context for ${fnName} for the model ${
                      argumentParts.get(argId)[0]
                    }. Please pass it along with the API request.`
                  );
                }

                return argValue;
              })
            )
          : [];

      for (const argIndex in resolvedArguments) {
        calcTree[fnName]['child'].push({
          id: cleanArgumentNames[argIndex],
          value:
            resolvedArguments[argIndex] !== null &&
            typeof resolvedArguments[argIndex] === 'object'
              ? resolvedArguments[argIndex].value
              : resolvedArguments[argIndex],
        });
      }

      // Get the function from the quantities_func module
      const funcToInvoke =
        this.quantitiesFunc[fnName] || this.lookUpFunc[fnName];

      if (typeof funcToInvoke !== 'function') {
        throw new Error(
          `Function '${fnName}' not found in quantities_func module`
        );
      }

      // ---- Call the imported function with resolved arguments
      // If the function is async, then use then/catch to resolve the function value.
      let calculatedValue = null;
      if (functionParts.isAsync) {
        calculatedValue = await funcToInvoke(
          ...resolvedArguments.map((arg) =>
            arg !== null && typeof arg === 'object' ? arg.value : arg
          )
        );
      } else {
        // If the function is not async, then normally call the function
        calculatedValue = funcToInvoke(
          ...resolvedArguments.map((arg) =>
            arg !== null && typeof arg === 'object' ? arg.value : arg
          )
        );
      }

      if (
        calculatedValue != 0 &&
        !Number.isNaN(calculatedValue) &&
        !calculatedValue
      ) {
        Invoker.infoContainer.push(
          `The function '${fnName}' is returning the value as ${calculatedValue}. Please check, if the implementation is correct.`
        );
      }

      // Memoize the result
      memo.set(fnName, calculatedValue);

      // Set the calcTree values
      calcTree[fnName]['value'] = calculatedValue;

      return { id: fnName, value: calculatedValue };
    } catch (error) {
      throw error; // Re-throw the error to maintain the existing behavior
    }
  }

  public static getInfoContainer() {
    return Invoker.infoContainer;
  }

  public static setInfoContainer() {
    Invoker.infoContainer = [];
  }
}

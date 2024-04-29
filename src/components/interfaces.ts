export interface ProjectInput {
  id: string;
  name?: string;
  desc?: string;
  unit?: string;
  value: number;
}

export interface Quantity {
  id: string;
  projectInputs?: string[];
  staticValues?: string[];
  lookUps?: string[];
  quantities?: string[];
  output: string;
}

export interface StaticValue {
  id: string;
  name?: string;
  value: number;
}

export interface Model {
  namespace?: string;
  extends: string[];
  types?: { [key: string]: string[] };
  lookUpRelations?: { [key: string]: string[] };
  quantities: Quantity[];
}

export interface FunctionSchema {
  id: string;
  arguments: string;
  body: string;
}

export interface Metadata {
  quantityId: string;
  is_generated: boolean;
  generated_at: Date;
  last_updated_at: Date;
  // current_value: string;
  // previous_value: string;
}

export interface QuantityContainer {
  dataToWrite: FunctionSchema;
  quantity: Quantity;
}

export interface Context {
  projectInputs: ApiInputs['projectInputs'];
  staticValues: ApiInputs['staticValues'];
}

export interface InvokerResult {
  id: string;
  value: number;
}

export interface ApiInputs {
  projectInputs: {
    [key: string]: number;
  };
  staticValues: {
    [key: string]: number;
  };
}

export interface ApiResponse {
  status: string;
  data: any;
  infoContainer?: string[];
  calcTree?: any;
}

export interface TestDataNode {
  [key: string]: {
    inputs: {
      projectInputs: { [key: string]: number }[];
      staticValues: { [key: string]: number }[];
    };
    quantityNames: string[];
    outputs: { [key: string]: number }[];
  };
}

// export interface TestData {
// }

export interface DefaultValue {
  id: string;
  value: number;
}

// Interface for calcTree
export interface TreeNode {
  id: string;
  value: number | string;
}

export interface CalculationTree {
  [key: string]: {
    value: number | string;
    child?: TreeNode[];
  };
}

export interface ModelParser {
  modelName: string;
  modelData: Model;
  readModel(): void;
  validateModel(): void;
}

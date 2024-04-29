export interface NestedProperty {
    dependsOn: string;
    values: Record<string, number>;
}
export type DataStoreProperty = Record<string, NestedProperty>;
interface DataStore {
    [key: string]: Record<string, number>;
}
export declare const DataStore: DataStore;
export {};

export interface NestedProperty {
  dependsOn: string;
  values: Record<string, number>;
}

export type DataStoreProperty = Record<string, NestedProperty>;

interface DataStore {
  [key: string]: Record<string, number>;
}

export const DataStore: DataStore = {
  lk_dryWasteContent: {
    Mumbai: 0.5,
    Bangalore: 0.1,
    Kolkata: 0.5,
    Delhi: 0.1,
  },
  lk_typeOfBuildingFactor: {
    Apartment: 0.45,
    Villa: 0.9,
  },
};

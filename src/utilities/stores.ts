import * as SDPlusDefaultsDB from '../../sdplus/defaultsStore.json';
import * as CityDb from '../../sdplus/cityDBStore.json';

const _SDPlusDefaultsStore = JSON.parse(SDPlusDefaultsDB.defaultdbCache);
export const SDPlusDefaultsStore = _SDPlusDefaultsStore;
export const CityDbData = CityDb;

import { SDPlusDefaultsStore, CityDbData } from './stores';
import { DataStore } from '../components/datastore/store';
import {
  SwhType,
  HpType,
  HwmHpHeatingSpeed,
  SdPlusInterventions,
  SwhVariant,
  EFCalculator,
} from './types';
import { Single } from './helper';

export function utility_calculateYearlyConsumption(dailyConsumption) {
  return dailyConsumption * 365;
}

export function utility_convertYearlyUnitToDaily(hwm__st_yearlyConsumption) {
  return hwm__st_yearlyConsumption / 365;
}

export function utility_minimumPaintCost() {
  const apt = DataStore['lk_typeOfBuildingFactor']['Apartment'];
  const villa = DataStore['lk_typeOfBuildingFactor']['Villa'];

  return Math.min(apt, villa);
}

export function utility_fromUtil() {
  return 1;
}

const DefaultTable = {
  foo: {
    type: 'Individual',
    capacity: 100,
    variant: 'etc',
  },
  bar: {
    type: 'Individual',
    capacity: 150,
    variant: 'etc',
  },
  cab: {
    type: 'Central',
    capacity: 40,
    variant: 'etc',
  },
};

export function utility_numberFromString(str: string) {
  const match = str.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

export function utility_defaultOrSelectedProduct(
  defaultProductIdentifier: string,
  selectedProductIdentifier: string
) {
  if (defaultProductIdentifier === null) {
    throw new Error('defaultProductIdentifier can never be null');
  }
  let theProduct: Single<any>;
  if (selectedProductIdentifier !== null) {
    theProduct = new Single<any>(
      SDPlusDefaultsStore.filter(
        (s) => s.identifier === selectedProductIdentifier
      )
    );
  } else {
    theProduct = new Single<any>(
      SDPlusDefaultsStore.filter(
        (s) => s.identifier === defaultProductIdentifier
      )
    );
  }
  return theProduct.get();
}

function candidatesForIntervention(sdplusIntervention: SdPlusInterventions) {
  return SDPlusDefaultsStore.filter((d) =>
    d.sdplusInterventions.includes(sdplusIntervention)
  );
}

export function utility_efHealthFaucetProductResolver() {
  return SDPlusDefaultsStore.filter((d) =>
    d.sdplusInterventions.includes('Default_Health Faucet')
  );
}

export function utility_efFaucetProductResolver() {
  return SDPlusDefaultsStore.filter((d) =>
    d.sdplusInterventions.includes('Default_Faucet')
  );
}

export function utility_efKitchenSinkProductResolver() {
  return SDPlusDefaultsStore.filter((d) =>
    d.sdplusInterventions.includes('Default_Kitchen Sink')
  );
}

export function utility_efDualFlushProductResolver() {
  return SDPlusDefaultsStore.filter((d) =>
    d.sdplusInterventions.includes('Default_Flushing')
  );
}

export function utility_swhProductResolver(
  type: SwhType,
  variant: SwhVariant,
  capacity: number,
  sdplusIntervention: SdPlusInterventions
) {
  const candidates = candidatesForIntervention(sdplusIntervention);
  const typeBasedCandidates = [];
  if (type === 'individual') {
    typeBasedCandidates.push(
      ...candidates.filter((d) =>
        d.defaultProductTag.includes('Default_SWH_Individual')
      )
    );
  } else if (type === 'central') {
    typeBasedCandidates.push(
      ...candidates.filter((d) =>
        d.defaultProductTag.includes('Default_SWH_Central')
      )
    );
  }
  const variantBasedCandidate = typeBasedCandidates.filter((t) =>
    t.filters[' Variant '].map((v) => v.trim()).includes(variant.toUpperCase())
  );
  if (!variantBasedCandidate)
    throw new Error(`shouldn't reach here: utility_swhProductResolver`);
  else return variantBasedCandidate[0].identifier;
}

export function utility_hybridProductResolver(
  swhCapacity: number,
  hpCapacity: number,
  time: number,
  numberOfFloors: number,
  EfficiencyFactor: number,
  floorHeight: number,
  sdplusIntervention: SdPlusInterventions
) {
  const outletTemp = 55;
  const inletTemp = 20;
  const conversionFactor = 860;
  const hoursInAday = 24;
  const heatLossCoff = 8.2;
  const superRet = 2;
  const noOfShafts = 8;
  const hzPipe = 24;
  let productIdentifier: any = null;
  let nearestCandidates;

  const temp: number = outletTemp - inletTemp;
  const hybridSWHenergyConsumed: number = swhCapacity * temp * EfficiencyFactor;
  const heatRequired: number = hpCapacity * temp;
  const useableEnergy: number = heatRequired / conversionFactor;
  const heatLoss: number = (hoursInAday - time) * heatLossCoff;
  const verticalPipe: number =
    superRet * floorHeight * noOfShafts * numberOfFloors;
  const pipelength: number = verticalPipe + hzPipe;
  const deadStorageHeat: number = heatLoss * pipelength;
  const deadStorageEnergy: number = deadStorageHeat / conversionFactor;
  const commercialEnergyRequired: number = deadStorageEnergy + useableEnergy;
  const hybridHPRequired: number =
    (commercialEnergyRequired - hybridSWHenergyConsumed) / conversionFactor;
  const hybridHPRequiredHeatingCapacity = hybridHPRequired / time;
  const hpRequiredheatingCapacity: number = hybridHPRequired / time;
  const candidates = candidatesForIntervention(sdplusIntervention);
  const hybridCandidates = candidates.filter((d) =>
    d.defaultProductTag.includes('Default_Hybrid')
  );
  nearestCandidates = hybridCandidates
    .filter(
      (p) =>
        utility_numberFromObject(p.properties, 'Rated Heating Capacity (kW)') >=
        hpRequiredheatingCapacity
    )
    .sort((p) =>
      utility_numberFromObject(p.properties, 'Rated Heating Capacity (kW)')
    );
  productIdentifier = nearestCandidates[0].identifier;

  return {
    hybridHPRequiredHeatingCapacity,
    hpRequiredheatingCapacity,
    productIdentifier,
  };
}

export function utility_hpProductresolver(
  hpType: HpType,
  capacity: number,
  time: number,
  floorHeight: number,
  numberOfFloors: number,
  outletTemp: number,
  initialTemp: number,
  conversionFactor: number,
  hoursInAday: number,
  heatLossCoff: number,
  supRet: number,
  noOfShafts: number,
  hzPipe: number,
  sdplusIntervention: SdPlusInterventions
) {
  let requiredHeatingCapacity: number = null;
  let pipelength: number = null;
  let domesticEnergyRequired: number = null;
  let poolEnergyRequired: number = null;
  let commercialEnergyRequired: number = null;
  let defaultProductIdentifier: any = null;

  const temp: number = outletTemp - initialTemp;
  const heatRequired = capacity * temp;
  let nearestCandidates;

  if (hpType === 'domestic') {
    domesticEnergyRequired = heatRequired / conversionFactor;
    requiredHeatingCapacity = domesticEnergyRequired / time;
    const candidates = candidatesForIntervention(sdplusIntervention);
    const hpCommercialCandidates = candidates.filter((d) =>
      d.defaultProductTag.includes('Default_HP_Domestic')
    );
    nearestCandidates = hpCommercialCandidates
      .filter(
        (p) =>
          utility_numberFromObject(
            p.properties,
            'Rated Heating Capacity (kW)'
          ) >= requiredHeatingCapacity
      )
      .sort((p) =>
        utility_numberFromObject(p.properties, 'Rated Heating Capacity (kW)')
      );
  } else if (hpType === 'swimming pool') {
    poolEnergyRequired = heatRequired / conversionFactor;
    requiredHeatingCapacity = poolEnergyRequired / time;
    const candidates = candidatesForIntervention(sdplusIntervention);
    const swimmingPoolCandidates = candidates.filter((d) =>
      d.defaultProductTag.includes('Default_Swimming Pool')
    );
    nearestCandidates = swimmingPoolCandidates
      .filter(
        (p) =>
          utility_numberFromObject(
            p.properties,
            'Rated Heating Capacity (kW)'
          ) >= requiredHeatingCapacity
      )
      .sort((p) =>
        utility_numberFromObject(p.properties, 'Rated Heating Capacity (kW)')
      );
  } else if (hpType === 'commercial') {
    const usuableEnergy = heatRequired / conversionFactor;
    const heatLoss = (hoursInAday - time) * heatLossCoff;
    const verticalPipe: number =
      supRet * floorHeight * noOfShafts * numberOfFloors;
    const horizontalPipe: number = hzPipe * numberOfFloors;
    const pipelength: number = verticalPipe + horizontalPipe;
    const deadStorageHeat: number = heatLoss * pipelength;
    const deadStorageEnergy: number = deadStorageHeat / conversionFactor;
    commercialEnergyRequired = deadStorageEnergy + usuableEnergy;
    requiredHeatingCapacity = commercialEnergyRequired / time;
    const candidates = candidatesForIntervention(sdplusIntervention);
    const commercialCandidates = candidates.filter((d) =>
      d.defaultProductTag.includes('Default_HP_Commercial')
    );
    nearestCandidates = commercialCandidates
      .filter(
        (p) =>
          utility_numberFromObject(
            p.properties,
            'Rated Heating Capacity (kW)'
          ) >= requiredHeatingCapacity
      )
      .sort((p) =>
        utility_numberFromObject(p.properties, 'Rated Heating Capacity (kW)')
      );
    if (nearestCandidates.length === 0) {
      nearestCandidates = commercialCandidates.sort((p) =>
        utility_numberFromObject(p.properties, 'Rated Heating Capacity (kW)')
      );
    }
  }
  defaultProductIdentifier =
    nearestCandidates.length > 0 ? nearestCandidates[0].identifier : null;

  return {
    requiredHeatingCapacity,
    pipelength,
    defaultProductIdentifier,
  };
}

export function utility_numberFromObject(o: any, prop: string) {
  return parseFloat(o[prop].trim());
}
export function utility_energyOpex(energy: number, city: string) {
  let residentialUtilityTariff: number;
  residentialUtilityTariff = CityDbData[city].residentialUtilityTariff;
  return energy * residentialUtilityTariff;
}

export function utility_swhEnergySavings(
  SWHType: SwhType,
  capacity: number,
  noOfswh: number
) {
  const daysInAYear = 365;
  const baseCasePerLPDKwh = 0.1;
  let swhEnergyAnnual: number = 0;
  if (SWHType === 'central') {
    swhEnergyAnnual = capacity * baseCasePerLPDKwh * daysInAYear;
  } else if (SWHType === 'individual') {
    swhEnergyAnnual = capacity * baseCasePerLPDKwh * noOfswh * daysInAYear;
  }
  return swhEnergyAnnual;
}

export function utility_swhCapex(
  SWHType: SwhType,
  capacity: number,
  unitCapex: number,
  productCapacity: number,
  noOfswh: number
) {
  let totalNoofSWH: number = null;
  let swhCapex: number = null;

  if (SWHType === 'central') {
    totalNoofSWH = Math.ceil(capacity / productCapacity);
    swhCapex = totalNoofSWH * unitCapex;
  } else if (SWHType === 'individual') {
    swhCapex = capacity * unitCapex * noOfswh;
  }
  return swhCapex;
}

export function utility_hpEnergySavings(
  HPType: HpType,
  capacity: number,
  ratedPowder: number,
  noOfHp: number,
  time: number
) {
  const baseCaseLPDPerkwh = 0.1;
  const daysInaYear = 365;
  const cirPumpWatt = 1.2;

  let hpEnergyConsumed: number = null;
  let baseCaseEnergyConsumed: number = null;
  let hpEnergyAnnual: number = null;

  if (HPType === 'domestic' || HPType === 'swimming pool') {
    hpEnergyConsumed = (ratedPowder + cirPumpWatt) * time * noOfHp;
    baseCaseEnergyConsumed = capacity * noOfHp * baseCaseLPDPerkwh;
    hpEnergyAnnual = (baseCaseEnergyConsumed - hpEnergyConsumed) * daysInaYear;
  } else if (HPType === 'commercial') {
    hpEnergyConsumed = (ratedPowder + cirPumpWatt) * time * noOfHp;
    baseCaseEnergyConsumed = capacity * baseCaseLPDPerkwh;
    hpEnergyAnnual = (baseCaseEnergyConsumed - hpEnergyConsumed) * daysInaYear;
  }
  return hpEnergyAnnual;
}

export function utility_hpCapex(
  HPType: HpType,
  capacity: number,
  noOfHP: number,
  capex: number,
  ratedPower: number,
  pipelength: number,
  hotWaterHours: number = 2
) {
  const DomCirPumpCapex: number = 30000;
  const cirPumpWatt: number = 1.2;
  const kvaConFac: number = 0.9;
  const comCirPump: number = 50000;
  const capCoeff: number = 1000;
  const tankCostCoeff: number = 90000;
  const elCost: number = 1200;
  const panelCost: number = 500000;
  const intPipeCoeff: number = 0.15;
  const pipeCostCoeff: number = 1200; //not used check

  let equipmentCost: number = null;
  let backupRequired: number = null;
  let electricalCost: number = null;
  let hpCapex: number = null;
  let mixingTankCount: number = null;
  let mixingTankCost: number = null;
  let interconnectingPipeCost: number = null;
  let plumbingCost: number = null;

  if (HPType === 'domestic' || HPType === 'swimming pool') {
    equipmentCost = (capex + DomCirPumpCapex) * noOfHP;
    backupRequired = (ratedPower + cirPumpWatt) / kvaConFac;
    electricalCost = backupRequired * elCost * noOfHP;
    hpCapex = equipmentCost + electricalCost;
  } else if (HPType === 'commercial') {
    equipmentCost = (capex + comCirPump) * noOfHP;
    mixingTankCount = capacity / capCoeff; // peak hours not added add later
    mixingTankCost = mixingTankCount * tankCostCoeff;
    interconnectingPipeCost = equipmentCost + mixingTankCost + intPipeCoeff;
    plumbingCost = mixingTankCost + interconnectingPipeCost;
    backupRequired = (ratedPower + cirPumpWatt) / kvaConFac;
    const cal1 = backupRequired * elCost;
    const cal2 = cal1 * noOfHP;
    electricalCost = panelCost + cal2;
    hpCapex = equipmentCost + plumbingCost + electricalCost;
  }
  return hpCapex;
}

export function utility_hybridEnergySavings(
  hpCapacity: number,
  swhCapacity: number,
  noOfHP: number,
  hybridNoOfHp: number,
  ratedPowder: number,
  time: number
) {
  const cirPumpWatt: number = 1.2;
  const hybridHPDays: number = 300;
  const HPDays: number = 65;
  const basecasePerLPDKwh: number = 0.1;
  const daysInAYear: number = 365;

  let hybridEnergyAnnual: number = null;

  const a = (ratedPowder + cirPumpWatt) * hybridNoOfHp;
  const b = a * time;
  const hybridHpEnergyConsumed = b * hybridHPDays;
  const hpEnergyConsumed = (ratedPowder + cirPumpWatt) * noOfHP * time * HPDays;
  const baseCaseEnergyConsumed = hpCapacity * basecasePerLPDKwh * daysInAYear;
  const hpEnergyAnnual =
    baseCaseEnergyConsumed - hybridHpEnergyConsumed - hpEnergyConsumed;
  const swhEnergyAnnual = swhCapacity * basecasePerLPDKwh * daysInAYear;
  hybridEnergyAnnual = hpEnergyAnnual + swhEnergyAnnual;
  return hybridEnergyAnnual;
}

export function utility_hybridCapex(
  capacity: number,
  noOfHP: number,
  noOfswh: number,
  hybridHpCapex: number,
  hybridSWHCapex: number,
  ratedPower: number
) {
  const comCirPumpCapex: number = 50000;
  const capCoeff: number = 1000;
  const tankCostCoeff: number = 90000;
  const intPipeCoeff: number = 0.15;
  const cirPumpWatt: number = 1.2;
  const kvaConFac: number = 0.9;
  const elCost: number = 1200;

  let hybridCapex: number = null;

  const equipmentCost =
    noOfHP * (hybridHpCapex + comCirPumpCapex) + noOfswh * hybridSWHCapex;
  const mixingTankCount = capacity / capCoeff;
  const mixingTankCost = mixingTankCount * tankCostCoeff;
  const interconnectingPipeCost =
    (equipmentCost + mixingTankCost) * intPipeCoeff;
  const plumbingCost = mixingTankCost + interconnectingPipeCost;
  const backupRequired = (ratedPower + cirPumpWatt) / kvaConFac;
  const a = backupRequired * elCost * noOfHP;
  const electricalCost = plumbingCost + a;
  hybridCapex = equipmentCost + plumbingCost + electricalCost;
  return hybridCapex;
}

export function roundTo100(value: number) {
  return Math.ceil(value / 100) * 100;
}

export function utility_hwmHpTimeCalculator(
  hwm__pi_hpHeatingSpeed: HwmHpHeatingSpeed,
  hwm__st_slowHeatingTime: number,
  hwm__st_fastHeatingTime: number,
  hwm__st_defaultHeatingTime: number
) {
  let time: number;
  if (hwm__pi_hpHeatingSpeed === 'slow') {
    time = hwm__st_slowHeatingTime;
  } else if (hwm__pi_hpHeatingSpeed === 'fast') {
    time = hwm__st_fastHeatingTime;
  } else {
    time = hwm__st_defaultHeatingTime;
  }
  return time;
}

export function utility_userOrDefaultValue(
  defaultCapacity: number,
  userCapacity: number
) {
  if (userCapacity !== null) {
    return userCapacity;
  } else {
    return defaultCapacity;
  }
}

export function utility_hwmOutletTemp(
  hwm__pi_hpType: HpType,
  hwm__st_outletTempSwimmingPool: number,
  hwm__st_outletTempOther: number
) {
  return hwm__pi_hpType === 'swimming pool'
    ? hwm__st_outletTempSwimmingPool
    : hwm__st_outletTempOther;
}

export function utility_defaultProduct() {}

export function utility_EFOccupancy(
  twr__st_projectCategory: string,
  twr__st_igbcOccupancyVilla: number,
  twr__st_igbcTotalOccupancyVilla: number,
  twr__st_clubhouseOccupancyVilla: number,
  twr__st_igbcOccupancyApartment: number,
  twr__st_igbcOccupancyPenthouse: number,
  twr__st_OccupancyTotalApartment: number,
  twr__st_OccupancyClubhouseApartment: number
) {
  let ret: EFCalculator;
  if (twr__st_projectCategory === 'Villa') {
    ret = {
      efIGBCOccupancy: twr__st_igbcOccupancyVilla,
      efTotalOccupancy: twr__st_igbcTotalOccupancyVilla,
      efclubhouseOccupancy: twr__st_clubhouseOccupancyVilla,
    };
  } else {
    ret = {
      efIGBCOccupancy:
        twr__st_igbcOccupancyApartment + twr__st_igbcOccupancyPenthouse,
      efTotalOccupancy: twr__st_OccupancyTotalApartment,
      efclubhouseOccupancy: twr__st_OccupancyClubhouseApartment,
    };
  }
  return ret;
}

export function utility_stpCapexOpex(
  nstp__st_globalYoyInflation: number,
  nstp__st_globalCurrentYear: number,
  nstp__st_stpcoStudyYear: number,
  nstp__st_stpcoCivil: number,
  nstp__st_stpcoMAndE: number,
  nstp__st_stpcoCapacity: number,
  nstp__st_stpcoInflation: number,
  nstp__st_stpcoElectricity: number,
  nstp__st_city: string,
  nstp__st_stpcoChemical: number,
  nstp__st_stpcoWorkforce: number
) {
  const x = 1 + nstp__st_globalYoyInflation;
  const y = nstp__st_globalCurrentYear - 1 - nstp__st_stpcoStudyYear;
  const stpcoInflation = Math.pow(x, y);
  let ret = {
    stpcoInflation: stpcoInflation,
    stpcoCapex:
      (nstp__st_stpcoCivil + nstp__st_stpcoMAndE) *
      nstp__st_stpcoCapacity *
      nstp__st_stpcoInflation,
    stpcoAnnualEnergy:
      (nstp__st_stpcoElectricity * nstp__st_stpcoCapacity * stpcoInflation) /
      CityDbData[nstp__st_city].residentialUtilityTariff,
    stpcoOpex:
      (nstp__st_stpcoWorkforce +
        nstp__st_stpcoChemical +
        nstp__st_stpcoElectricity) *
      nstp__st_stpcoCapacity *
      stpcoInflation,
  };
  return ret;
}
export function utility_getCityResidentialUtiliyTariff(city: string) {
  let residentialUtilityTariff = CityDbData[city].residentialUtilityTariff;
  return residentialUtilityTariff;
}

export function utility_getCityEmissionFactors(city: string) {
  let cityEmissionFactor = CityDbData[city].emissionFactors;
  return cityEmissionFactor;
}

export function utility_waterOpex(city, water) {
  let tankerWaterPricePerKl = 0;

  if (city === 'Bombay') {
    tankerWaterPricePerKl = 0;
  } else if (city === 'Bangalore') {
    tankerWaterPricePerKl = 0;
  }

  const waterOpex = water * tankerWaterPricePerKl;
}

export function utility_efHfOccupancy(
  efhfProjectLevelInsights__pi_studio: number,
  efhfProjectLevelInsights__st_studioRefOccupancy: number,
  efhfProjectLevelInsights__pi_oneBHK: number,
  efhfProjectLevelInsights__st_oneBHKRefOccupancy: number,
  efhfProjectLevelInsights__pi_twoBHK: number,
  efhfProjectLevelInsights__st_twoBHKRefOccupancy: number,
  efhfProjectLevelInsights__pi_threeBHK: number,
  efhfProjectLevelInsights__st_threeBHKRefOccupancy: number
) {
  const occupancy =
    efhfProjectLevelInsights__pi_studio *
      efhfProjectLevelInsights__st_studioRefOccupancy +
    efhfProjectLevelInsights__pi_oneBHK *
      efhfProjectLevelInsights__st_oneBHKRefOccupancy +
    efhfProjectLevelInsights__pi_twoBHK *
      efhfProjectLevelInsights__st_twoBHKRefOccupancy +
    efhfProjectLevelInsights__pi_threeBHK *
      efhfProjectLevelInsights__st_threeBHKRefOccupancy;

  return occupancy;
}

export function utility_efHfTotalOccupancy(
  efhfProjectLevelInsights__pi_studio: number,
  efhfProjectLevelInsights__st_studioRefOccupancy: number,
  efhfProjectLevelInsights__pi_oneBHK: number,
  efhfProjectLevelInsights__st_oneBHKRefOccupancy: number,
  efhfProjectLevelInsights__pi_twoBHK: number,
  efhfProjectLevelInsights__st_twoBHKRefOccupancy: number,
  efhfProjectLevelInsights__pi_threeBHK: number,
  efhfProjectLevelInsights__st_threeBHKRefOccupancy: number,
  efhfProjectLevelInsights__st_projectHousekeepingRefOccupancy: number
) {
  const totalOccupancy =
    utility_efHfOccupancy(
      efhfProjectLevelInsights__pi_studio,
      efhfProjectLevelInsights__st_studioRefOccupancy,
      efhfProjectLevelInsights__pi_oneBHK,
      efhfProjectLevelInsights__st_oneBHKRefOccupancy,
      efhfProjectLevelInsights__pi_twoBHK,
      efhfProjectLevelInsights__st_twoBHKRefOccupancy,
      efhfProjectLevelInsights__pi_threeBHK,
      efhfProjectLevelInsights__st_threeBHKRefOccupancy
    ) *
    (1 + efhfProjectLevelInsights__st_projectHousekeepingRefOccupancy);

  return totalOccupancy;
}

export function utility_goalsStatusCheck(progress: number) {
  if (progress >= 100) {
    return 'Achieved';
  } else {
    return 'In Progress';
  }
}

export function utility_goalsTierCheck(contribution: number) {
  if (contribution >= 75) {
    return 'Tier IV';
  } else if (contribution >= 50) {
    return 'Tier III';
  } else if (contribution >= 25) {
    return 'Tier II';
  } else {
    return 'Tier I';
  }
}

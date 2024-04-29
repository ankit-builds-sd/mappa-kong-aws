import { irr } from 'node-irr'; import { HwmDemandAssumptionBase, HwmDemandAssumptionVilla, HwmDemandAssumptionPenthouse, DemandAssumptionApartment, HwmDemandByBath, HwmOption, HeatPumpType, SwhType, SwhVariant, HpType, HwmHpHeatingSpeed, SdPlusInterventions, CurrentWaterTableRow, CurrentWaterTable, CurrentWaterTableInputsRow, CurrentWaterTableInputs, WaterPreSdPlusRow, WaterPreSdPlus, PlumbingDetailsPreSdPlus, EFCalculator, StpCalculator, PreSDPlusDemand, OutcomesPreSdPlus } from '../../../utilities/types'; import * as utilities from '../../../utilities/utility'; import { CityDbData, SDPlusDefaultsStore } from '../../../utilities/stores';export  function hwmVilla__q_outcomes(hwmVilla__pi_userHotWaterHours:number,hwmVilla__pi_userCityResidentialUtilityTariff:number,hwmVilla__pi_swhType:SwhType,hwmVilla__pi_swhVariant:SwhVariant,hwmVilla__pi_hpType:HpType,hwmVilla__pi_option:HwmOption,hwmVilla__pi_hpHeatingSpeed:HwmHpHeatingSpeed,project__pi_city:string,project__pi_floorHeight:number,project__pi_numberOfFloors:number,hwmVilla__pi_selectedProductIdentifier:string,hwmVilla__pi_userSwhCapacity:number,hwmVilla__pi_userHpCapacity:number,hwmVilla__pi_userNumberOfShafts:number,hwmVilla__st_defaultHotWaterHours:number,hwm__st_slowHeatingTime:number,hwm__st_fastHeatingTime:number,hwm__st_defaultHeatingTime:number,hwm__st_initialTemp:number,hwm__st_conversionFactor:number,global__st_hoursInDay:number,hwm__st_heatLossCoeff:number,hwm__st_supRet:number,hwmVilla__st_defaultNumberOfShafts:number,hwm__st_hzPipe:number,hwm__st_outletTempSwimmingPool:number,hwm__st_outletTempOther:number,hwmVilla__q_technologySelection,hwmVilla__q_hwmDemand,hwmVilla__q_outcomesPreSdPlus){let defaultProductIdentifier: string;
let theProduct: any;
let hwmVillaSwhDefaultCapacity: number;
let hwmVillaSwhCapacity: number;
let hwmVillaHpDefaultCapacity: number;
let hwmVillaHpCapacity: number;
let hwmVillaEnergyAnnual: any;
let hwmVillaCapexPostSdPlus: any;
let hwmVillaCapex: number;
let hwmVillaOpex: number;
let hwmVillaAreaRequired: number;
let selectedProductPrice: number;
let selectedProductCapacity: number;
let selectedProductRatedInputPower: number;
let numberOfProducts: number;
let pipeLengthDomestic: number = 10; //not there in algo
let time = utilities.utility_hwmHpTimeCalculator(
hwmVilla__pi_hpHeatingSpeed,
hwm__st_slowHeatingTime,
hwm__st_fastHeatingTime,
hwm__st_defaultHeatingTime
);
if (
hwmVilla__pi_option === 'solar water heater' &&
hwmVilla__pi_swhType === 'individual'
) {
defaultProductIdentifier = utilities.utility_swhProductResolver(
  hwmVilla__pi_swhType,
  hwmVilla__pi_swhVariant,
  hwmVilla__q_technologySelection.defaultSwhIndividualCapacity,
  'HWM_Villa'
);
theProduct = utilities.utility_defaultOrSelectedProduct(
  defaultProductIdentifier,
  hwmVilla__pi_selectedProductIdentifier
);
selectedProductPrice = utilities.utility_numberFromString(theProduct.price);
selectedProductCapacity = utilities.utility_numberFromString(
  theProduct.filters['Capacity '][0]
);
hwmVillaSwhDefaultCapacity =
  hwmVilla__q_technologySelection.defaultSwhIndividualCapacity;
hwmVillaSwhCapacity = utilities.utility_userOrDefaultValue(
  hwmVillaSwhDefaultCapacity,
  hwmVilla__pi_userSwhCapacity
);
numberOfProducts = hwmVilla__q_hwmDemand.hotWaterDu;
hwmVillaEnergyAnnual = utilities.utility_swhEnergySavings(
  hwmVilla__pi_swhType,
  hwmVillaSwhCapacity,
  numberOfProducts
);
hwmVillaCapexPostSdPlus = utilities.utility_swhCapex(
  hwmVilla__pi_swhType,
  hwmVillaSwhCapacity,
  selectedProductPrice,
  selectedProductCapacity,
  numberOfProducts
);
hwmVillaCapex =
  hwmVillaCapexPostSdPlus - hwmVilla__q_outcomesPreSdPlus.hwmCapexPreSdPlus;
hwmVillaOpex = utilities.utility_energyOpex(
  hwmVillaEnergyAnnual,
  project__pi_city
); //the correct value not present in the algo
hwmVillaAreaRequired = hwmVilla__q_technologySelection.swhAreaRequired;
} else if (
hwmVilla__pi_option === 'heat pump' &&
hwmVilla__pi_hpType === 'domestic'
) {
hwmVilla__st_defaultNumberOfShafts = utilities.utility_userOrDefaultValue(
  hwmVilla__st_defaultNumberOfShafts,
  hwmVilla__pi_userNumberOfShafts
);
const outletTemp = utilities.utility_hwmOutletTemp(
  hwmVilla__pi_hpType,
  hwm__st_outletTempSwimmingPool,
  hwm__st_outletTempOther
);
defaultProductIdentifier = utilities.utility_hpProductresolver(
  hwmVilla__pi_hpType,
  hwmVilla__q_technologySelection.defaultHpDomesticCapacity,
  time,
  project__pi_floorHeight,
  project__pi_numberOfFloors,
  outletTemp,
  hwm__st_initialTemp,
  hwm__st_conversionFactor,
  global__st_hoursInDay,
  hwm__st_heatLossCoeff,
  hwm__st_supRet,
  hwmVilla__st_defaultNumberOfShafts,
  hwm__st_hzPipe,
  'HWM_Villa'
).defaultProductIdentifier;
theProduct = utilities.utility_defaultOrSelectedProduct(
  defaultProductIdentifier,
  hwmVilla__pi_selectedProductIdentifier
);
selectedProductPrice = utilities.utility_numberFromString(theProduct.price);
selectedProductRatedInputPower = utilities.utility_numberFromObject(
  theProduct.properties,
  'Rated Input Power (kW)'
);
numberOfProducts = hwmVilla__q_hwmDemand.hotWaterDu;
hwmVillaHpDefaultCapacity =
  hwmVilla__q_technologySelection.defaultHpDomesticCapacity;
hwmVillaHpCapacity = utilities.utility_userOrDefaultValue(
  hwmVillaHpDefaultCapacity,
  hwmVilla__pi_userHpCapacity
);
hwmVillaEnergyAnnual = utilities.utility_hpEnergySavings(
  hwmVilla__pi_hpType,
  hwmVillaHpCapacity,
  selectedProductRatedInputPower,
  numberOfProducts,
  time
);
hwmVillaCapexPostSdPlus = utilities.utility_hpCapex(
  hwmVilla__pi_hpType,
  hwmVillaHpCapacity,
  numberOfProducts,
  selectedProductPrice,
  selectedProductRatedInputPower,
  pipeLengthDomestic
);
hwmVillaCapex = null;
hwmVillaOpex = utilities.utility_energyOpex(
  hwmVillaEnergyAnnual,
  project__pi_city
); //the correct value not present in the algo
hwmVillaAreaRequired = hwmVilla__q_technologySelection.hpAreaRequired;
}
return {
defaultOrSelectedProduct: theProduct,
hwmVillaSwhCapacity,
hwmVillaSwhDefaultCapacity,
hwmVillaHpCapacity,
hwmVillaHpDefaultCapacity,
hwmVillaEnergyAnnual,
hwmVillaCapexPostSdPlus,
hwmVillaCapex,
hwmVillaOpex,
hwmVillaAreaRequired,
numberOfProducts,
};}
export  function hwmVilla__q_technologySelection(hwm__pi_availableVillaRooftop:number,hwm__pi_userRooftopPerSwh:number,hwm__pi_userRooftopPerHp:number,hwm__st_defaultRooftopPerSwh:number,hwm__st_defaultRooftopPerHp:number,hwmVilla__q_hwmDemand){hwm__st_defaultRooftopPerSwh = utilities.utility_userOrDefaultValue(
    hwm__st_defaultRooftopPerSwh,
    hwm__pi_userRooftopPerSwh
  );
  hwm__st_defaultRooftopPerHp = utilities.utility_userOrDefaultValue(
    hwm__st_defaultRooftopPerHp,
    hwm__pi_userRooftopPerHp
  );
  let swhAreaRequired = hwmVilla__q_hwmDemand * hwm__st_defaultRooftopPerSwh;
  let hpAreaRequired = hwmVilla__q_hwmDemand * hwm__st_defaultRooftopPerHp;
  let defaultHpDomesticCapacity;
  let defaultSwhIndividualCapacity;
  if (hwm__pi_availableVillaRooftop > swhAreaRequired) {
    defaultSwhIndividualCapacity = utilities.roundTo100(hwmVilla__q_hwmDemand);
  } else {
    swhAreaRequired = hwm__pi_availableVillaRooftop;
    defaultSwhIndividualCapacity =
      utilities.roundTo100(hwm__pi_availableVillaRooftop) /
      hwm__st_defaultRooftopPerSwh;
  }
  if (hwm__pi_availableVillaRooftop > hpAreaRequired) {
    defaultHpDomesticCapacity = utilities.roundTo100(hwmVilla__q_hwmDemand);
  } else {
    hpAreaRequired = hwm__pi_availableVillaRooftop;
    defaultHpDomesticCapacity =
      utilities.roundTo100(hwm__pi_availableVillaRooftop) /
      hwm__st_defaultRooftopPerHp;
  }

  return {
    defaultSwhIndividualCapacity,
    swhAreaRequired,
    defaultHpDomesticCapacity,
    hpAreaRequired,
  };}
export  function hwmVilla__q_hwmDemand(hwmVilla__pi_demandAssumptionType:HwmDemandAssumptionVilla,hwmVilla__pi_demandAssumption:string,hwmVilla__pi_lpdPerVilla:number,hwmVilla__pi_demandByBathType:HwmDemandByBath,occupancy__st_singleBedroomOccupants:number,occupancy__q_occupancyVilla:number,occupancy__q_numberOfDwellingUnitsVilla:number){let hotWaterPerOccupant = null,
    hotWaterOccupants = null,
    hotWaterDu = null,
    hwmDemand = null;
  if (hwmVilla__pi_demandAssumptionType === 'lpcd per occupant') {
    hotWaterPerOccupant = hwmVilla__pi_demandAssumption;
  } else if (
    hwmVilla__pi_demandAssumptionType === 'link to installed efficient fixtures'
  ) {
    hotWaterPerOccupant = -1;
  } else if (hwmVilla__pi_demandAssumptionType === 'lpd per villa') {
    hotWaterPerOccupant = hwmVilla__pi_lpdPerVilla;
  }

  hotWaterDu = occupancy__q_numberOfDwellingUnitsVilla;
  if (hwmVilla__pi_demandByBathType === 'all baths') {
    hotWaterOccupants = occupancy__q_occupancyVilla;
  } else if (hwmVilla__pi_demandByBathType === 'single bath') {
    hotWaterOccupants =
      occupancy__q_numberOfDwellingUnitsVilla *
      occupancy__st_singleBedroomOccupants;
  } else if (hwmVilla__pi_demandByBathType === 'remaining baths') {
    hotWaterOccupants =
      occupancy__q_occupancyVilla -
      occupancy__q_numberOfDwellingUnitsVilla *
        occupancy__st_singleBedroomOccupants;
  } else if (hwmVilla__pi_demandAssumptionType === 'lpd per villa') {
    hotWaterOccupants = occupancy__q_numberOfDwellingUnitsVilla;
  }
  hwmDemand =
    utilities.roundTo100(hotWaterPerOccupant * hotWaterOccupants) /
    occupancy__q_numberOfDwellingUnitsVilla;
  return { hwmDemand, hotWaterOccupants, hotWaterDu };}
export  function hwmVilla__q_outcomesPreSdPlus(hwm__st_baseCasePerLPDkWh,hwm__st_swhCapexMultiplier,hwm__st_baseCaseVillaSwhCapacity){let hwmVillaEnergyAnnualPreSdPlus =
hwm__st_baseCaseVillaSwhCapacity * hwm__st_baseCasePerLPDkWh;
let hwmCapexPreSdPlus =
hwm__st_baseCaseVillaSwhCapacity * hwm__st_swhCapexMultiplier;
return {
hwmVillaEnergyAnnualPreSdPlus,
hwmCapexPreSdPlus,
};}
export  function hwmVilla__q_projectLevelInsights(project__pi_city:string,hwmVilla__pi_userCityEmissionFactor:number,global__st_convertKgToTon:number,global__st_treesPerTonCF:number,hwm__st_sdgNumberForHwm:number,hwmVilla__q_outcomes){let cfMitigated = null;
let sdgNumber = null;
let treesSaved = null;
let totalEnergyConsumptionPercentage = null;
let residentialHotWaterEnergyConsumption = null;
let defaultCityEmissionFactor =
utilities.utility_getCityEmissionFactors(project__pi_city);
defaultCityEmissionFactor = utilities.utility_userOrDefaultValue(
defaultCityEmissionFactor,
hwmVilla__pi_userCityEmissionFactor
);
cfMitigated =
defaultCityEmissionFactor *
hwmVilla__q_outcomes.hwmVillaEnergyAnnual *
global__st_convertKgToTon;
sdgNumber = hwm__st_sdgNumberForHwm;
treesSaved = cfMitigated * global__st_treesPerTonCF;
totalEnergyConsumptionPercentage =
(hwmVilla__q_outcomes.hwmVillaEnergyAnnual * 100) / 200;
residentialHotWaterEnergyConsumption =
(hwmVilla__q_outcomes.hwmVillaEnergyAnnual * 100) / 300;
return {
cfMitigated,
sdgNumber,
treesSaved,
totalEnergyConsumptionPercentage,
residentialHotWaterEnergyConsumption,
};}
export  function hwmVilla__q_flowDiagram(global__st_daysInYear:number,hwmVilla__q_outcomes){let residentialHotWater = null;
let residentialLighting = 0;
let residentialFan = 0;
let homeAppliances = 0;
let residentialHvac = 0;
let commonArea = 0;
residentialHotWater =
hwmVilla__q_outcomes.hwmVillaEnergyAnnual / global__st_daysInYear;
return {
residentialHotWater,
residentialLighting,
residentialFan,
homeAppliances,
residentialHvac,
commonArea,
};}
export  function hwmVilla__q_secondaryImpact(){let passiveWaterKL = 0;
let passiveWaterOpex = 0;
let passiveWasteKg = 0;
let passiveWasteOpex = 0;
return { passiveWaterKL, passiveWaterOpex, passiveWasteKg, passiveWasteOpex };}
export  function hwmVilla__q_goalMonitoring(hwmVilla__q_outcomes){let energyGoal = null;
let contribution = null;
energyGoal = 100;
contribution = (hwmVilla__q_outcomes.hwmVillaEnergyAnnual * 100) / 200;
return { energyGoal, contribution };}
export  function hwmVilla__q_overviewBarGraph(hwmVilla__st_minValue:number,hwmVilla__q_flowDiagram,hwmVilla__q_outcomes){let barOneTitle = 'Annual Energy Savings';
let barOneValue = hwmVilla__q_outcomes.hwmVillaEnergyAnnual;
let barOneMax = hwmVilla__q_outcomes.hwmVillaEnergyAnnual;
let barOneMin = hwmVilla__st_minValue;
let barTwoSubOneTitle = 'Residential Hot Water';
let barTwoValue = hwmVilla__q_flowDiagram.residentialHotWater;
let barTwoSubOneTitlePercentage = (barTwoValue * 100) / barOneValue;
return {
barOneTitle,
barOneValue,
barOneMax,
barOneMin,
barTwoSubOneTitle,
barTwoValue,
barTwoSubOneTitlePercentage,
};}
export  function hwmVilla__q_overviewDonutGraph(hwmVilla__q_outcomes){let donutOneTitle = '% of Total Energy';
let donutOneValue = (hwmVilla__q_outcomes.hwmVillaEnergyAnnual * 100) / 200;
let donutTwoTitle = '% of Residential Hot Water';
let donutTwoValue = (hwmVilla__q_outcomes.hwmVillaEnergyAnnual * 100) / 300;
return {
donutOneTitle,
donutOneValue,
donutTwoTitle,
donutTwoValue,
};}
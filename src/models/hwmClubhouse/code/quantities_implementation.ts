import { irr } from 'node-irr'; import { HwmDemandAssumptionBase, HwmDemandAssumptionVilla, HwmDemandAssumptionPenthouse, DemandAssumptionApartment, HwmDemandByBath, HwmOption, HeatPumpType, SwhType, SwhVariant, HpType, HwmHpHeatingSpeed, SdPlusInterventions, CurrentWaterTableRow, CurrentWaterTable, CurrentWaterTableInputsRow, CurrentWaterTableInputs, WaterPreSdPlusRow, WaterPreSdPlus, PlumbingDetailsPreSdPlus, EFCalculator, StpCalculator, PreSDPlusDemand, OutcomesPreSdPlus } from '../../../utilities/types'; import * as utilities from '../../../utilities/utility'; import { CityDbData, SDPlusDefaultsStore } from '../../../utilities/stores';export  function hwmClubhouse__q_outcomes(hwmClubhouse__pi_swhType:SwhType,hwmClubhouse__pi_swhVariant:SwhVariant,hwmClubhouse__pi_hpType:HpType,hwmClubhouse__pi_userHpCapacity:number,hwmClubhouse__pi_userSwhCapacity:number,hwmClubhouse__pi_option:HwmOption,hwmClubhouse__pi_hpHeatingSpeed:HwmHpHeatingSpeed,project__pi_city:string,project__pi_floorHeight:number,project__pi_numberOfFloors:number,hwmClubhouse__pi_selectedProductIdentifier:string,hwm__st_slowHeatingTime:number,hwm__st_fastHeatingTime:number,hwm__st_defaultHeatingTime:number,hwm__st_initialTemp:number,hwm__st_conversionFactor:number,global__st_hoursInDay:number,hwm__st_heatLossCoeff:number,hwm__st_supRet:number,hwm__st_numberOfShafts:number,hwm__st_hzPipe:number,hwm__st_outletTempSwimmingPool:number,hwm__st_outletTempOther:number,hwmClubhouse__q_outcomesPreSdPlus,hwmClubhouse__q_technologySelection){let defaultProductIdentifier: string;
let theProduct: any;
let defaultHwmClubhouseCapacity: number;
let hwmClubhouseEnergyAnnual: any;
let hwmClubhouseCapexPostSdPlus: any;
let hwmClubhouseCapex: number;
let hwmClubhouseOpex: number;
let hwmClubhouseAreaRequired: number;
let numberOfDomesticHp: number;
let numberOfCommercialHp: number;
let selectedProductRatedHeatingCapacity: number;
let selectedProductPrice: number; //change it once marketplace integrated
let selectedProductCapacity: number; //chnage it once marketplace integrated
let selectedProductRatedInputPower: number;
let numberOfProducts: number;
let hpProductResolver;
let time = utilities.utility_hwmHpTimeCalculator(
hwmClubhouse__pi_hpHeatingSpeed,
hwm__st_slowHeatingTime,
hwm__st_fastHeatingTime,
hwm__st_defaultHeatingTime
);
if (
hwmClubhouse__pi_option === 'solar water heater' &&
hwmClubhouse__pi_swhType === 'central'
) {
defaultProductIdentifier = utilities.utility_swhProductResolver(
  hwmClubhouse__pi_swhType,
  hwmClubhouse__pi_swhVariant,
  hwmClubhouse__q_technologySelection.defaultSwhCentralCapacity,
  'HWM_Clubhouse'
);
theProduct = utilities.utility_defaultOrSelectedProduct(
  defaultProductIdentifier,
  hwmClubhouse__pi_selectedProductIdentifier
);
selectedProductPrice = utilities.utility_numberFromString(theProduct.price);
selectedProductCapacity = utilities.utility_numberFromString(
  theProduct.filters['Capacity '][0]
);
defaultHwmClubhouseCapacity =
  hwmClubhouse__q_technologySelection.defaultSwhCentralCapacity;
defaultHwmClubhouseCapacity = utilities.utility_userOrDefaultValue(
  defaultHwmClubhouseCapacity,
  hwmClubhouse__pi_userSwhCapacity
);
hwmClubhouseEnergyAnnual = utilities.utility_swhEnergySavings(
  hwmClubhouse__pi_swhType,
  hwmClubhouse__q_technologySelection.defaultSwhCentralCapacity,
  0
);
hwmClubhouseCapexPostSdPlus = utilities.utility_swhCapex(
  hwmClubhouse__pi_swhType,
  hwmClubhouse__q_technologySelection.defaultSwhCentralCapacity,
  selectedProductPrice,
  selectedProductCapacity,
  0
);
hwmClubhouseCapex =
  hwmClubhouseCapexPostSdPlus -
  hwmClubhouse__q_outcomesPreSdPlus.hwmCapexPreSdPlus;
hwmClubhouseOpex = utilities.utility_energyOpex(
  hwmClubhouseEnergyAnnual,
  project__pi_city
);
hwmClubhouseAreaRequired =
  hwmClubhouse__q_technologySelection.swhAreaRequired;
} else if (
hwmClubhouse__pi_option === 'solar water heater' &&
hwmClubhouse__pi_swhType === 'individual'
) {
defaultProductIdentifier = utilities.utility_swhProductResolver(
  hwmClubhouse__pi_swhType,
  hwmClubhouse__pi_swhVariant,
  hwmClubhouse__q_technologySelection.defaultSwhIndividualCapacity,
  'HWM_Clubhouse'
);
theProduct = utilities.utility_defaultOrSelectedProduct(
  defaultProductIdentifier,
  hwmClubhouse__pi_selectedProductIdentifier
);
selectedProductPrice = utilities.utility_numberFromString(theProduct.price);
selectedProductCapacity = utilities.utility_numberFromString(
  theProduct.filters['Capacity '][0]
);
numberOfProducts =
  hwmClubhouse__q_technologySelection.defaultSwhIndividualCapacity /
  selectedProductCapacity;
defaultHwmClubhouseCapacity =
  hwmClubhouse__q_technologySelection.defaultSwhIndividualCapacity;
defaultHwmClubhouseCapacity = utilities.utility_userOrDefaultValue(
  defaultHwmClubhouseCapacity,
  hwmClubhouse__pi_userSwhCapacity
);
hwmClubhouseEnergyAnnual = utilities.utility_swhEnergySavings(
  hwmClubhouse__pi_swhType,
  hwmClubhouse__q_technologySelection.defaultSwhIndividualCapacity,
  numberOfProducts
);
hwmClubhouseCapexPostSdPlus = utilities.utility_swhCapex(
  hwmClubhouse__pi_swhType,
  hwmClubhouse__q_technologySelection.defaultSwhIndividualCapacity,
  selectedProductPrice,
  selectedProductCapacity,
  numberOfProducts
);
hwmClubhouseCapex =
  hwmClubhouseCapexPostSdPlus -
  hwmClubhouse__q_outcomesPreSdPlus.hwmCapexPreSdPlus;
hwmClubhouseAreaRequired =
  hwmClubhouse__q_technologySelection.swhAreaRequired;
} else if (
hwmClubhouse__pi_option === 'heat pump' &&
hwmClubhouse__pi_hpType === 'domestic'
) {
const outletTemp = utilities.utility_hwmOutletTemp(
  hwmClubhouse__pi_hpType,
  hwm__st_outletTempSwimmingPool,
  hwm__st_outletTempOther
);
hpProductResolver = utilities.utility_hpProductresolver(
  hwmClubhouse__pi_hpType,
  hwmClubhouse__q_technologySelection.defaultHpDomesticCapacity,
  time,
  project__pi_floorHeight,
  project__pi_numberOfFloors,
  outletTemp,
  hwm__st_initialTemp,
  hwm__st_conversionFactor,
  global__st_hoursInDay,
  hwm__st_heatLossCoeff,
  hwm__st_supRet,
  hwm__st_numberOfShafts,
  hwm__st_hzPipe,
  'HWM_Clubhouse'
);
theProduct = utilities.utility_defaultOrSelectedProduct(
  hpProductResolver.defaultProductIdentifier,
  hwmClubhouse__pi_selectedProductIdentifier
);
selectedProductPrice = utilities.utility_numberFromString(theProduct.price);
selectedProductRatedHeatingCapacity = utilities.utility_numberFromObject(
  theProduct.properties,
  'Rated Heating Capacity (kW)'
);
selectedProductCapacity = utilities.utility_numberFromString(
  theProduct.filters['Capacity '][0]
);
numberOfProducts =
  hpProductResolver.requiredHeatingCapacity /
  selectedProductRatedHeatingCapacity;
defaultHwmClubhouseCapacity =
  hwmClubhouse__q_technologySelection.defaultHpDomesticCapacity;
defaultHwmClubhouseCapacity = utilities.utility_userOrDefaultValue(
  defaultHwmClubhouseCapacity,
  hwmClubhouse__pi_userHpCapacity
);
hwmClubhouseEnergyAnnual = utilities.utility_hpEnergySavings(
  hwmClubhouse__pi_hpType,
  hwmClubhouse__q_technologySelection.defaultHpDomesticCapacity,
  selectedProductRatedInputPower,
  numberOfProducts,
  time
);
hwmClubhouseCapexPostSdPlus = utilities.utility_hpCapex(
  hwmClubhouse__pi_hpType,
  hwmClubhouse__q_technologySelection.defaultHpDomesticCapacity,
  numberOfProducts,
  selectedProductPrice,
  selectedProductRatedInputPower,
  hpProductResolver.pipelength
);
hwmClubhouseCapex =
  hwmClubhouseCapexPostSdPlus -
  hwmClubhouse__q_outcomesPreSdPlus.hwmCapexPreSdPlus;
hwmClubhouseOpex = utilities.utility_energyOpex(
  hwmClubhouseEnergyAnnual,
  project__pi_city
);
hwmClubhouseAreaRequired =
  hwmClubhouse__q_technologySelection.hpAreaRequired;
} else if (
hwmClubhouse__pi_option === 'heat pump' &&
hwmClubhouse__pi_hpType === 'commercial'
) {
const outletTemp = utilities.utility_hwmOutletTemp(
  hwmClubhouse__pi_hpType,
  hwm__st_outletTempSwimmingPool,
  hwm__st_outletTempOther
);
hpProductResolver = utilities.utility_hpProductresolver(
  hwmClubhouse__pi_hpType,
  hwmClubhouse__q_technologySelection.defaultHpDomesticCapacity,
  time,
  project__pi_floorHeight,
  project__pi_numberOfFloors,
  outletTemp,
  hwm__st_initialTemp,
  hwm__st_conversionFactor,
  global__st_hoursInDay,
  hwm__st_heatLossCoeff,
  hwm__st_supRet,
  hwm__st_numberOfShafts,
  hwm__st_hzPipe,
  'HWM_Clubhouse'
);
theProduct = utilities.utility_defaultOrSelectedProduct(
  hpProductResolver.defaultProductIdentifier,
  hwmClubhouse__pi_selectedProductIdentifier
);
selectedProductPrice = utilities.utility_numberFromString(theProduct.price);
selectedProductRatedHeatingCapacity = utilities.utility_numberFromObject(
  theProduct.properties,
  'Rated Heating Capacity (kW)'
);
selectedProductCapacity = utilities.utility_numberFromString(
  theProduct.filters['Capacity '][0]
);
numberOfProducts =
  hpProductResolver.requiredHeatingCapacity /
  selectedProductRatedHeatingCapacity;
defaultHwmClubhouseCapacity =
  hwmClubhouse__q_technologySelection.defaultHpCommercialCapacity;
defaultHwmClubhouseCapacity = utilities.utility_userOrDefaultValue(
  defaultHwmClubhouseCapacity,
  hwmClubhouse__pi_userHpCapacity
);
hwmClubhouseEnergyAnnual = utilities.utility_hpEnergySavings(
  hwmClubhouse__pi_hpType,
  hwmClubhouse__q_technologySelection.defaultHpCommercialCapacity,
  selectedProductRatedInputPower,
  numberOfProducts,
  time
);
hwmClubhouseCapexPostSdPlus = utilities.utility_hpCapex(
  hwmClubhouse__pi_hpType,
  hwmClubhouse__q_technologySelection.defaultHpCommercialCapacity,
  numberOfProducts,
  selectedProductPrice,
  selectedProductRatedInputPower,
  hpProductResolver.pipelength
);
hwmClubhouseCapex =
  hwmClubhouseCapexPostSdPlus -
  hwmClubhouse__q_outcomesPreSdPlus.hwmCapexPreSdPlus;
hwmClubhouseOpex = utilities.utility_energyOpex(
  hwmClubhouseEnergyAnnual,
  project__pi_city
);
hwmClubhouseAreaRequired =
  hwmClubhouse__q_technologySelection.hpAreaRequired;
}
return {
defaultOrSelectedProductIdentifier: theProduct.identifier,
defaultHwmClubhouseCapacity,
hwmClubhouseEnergyAnnual,
hwmClubhouseCapexPostSdPlus,
hwmClubhouseCapex,
hwmClubhouseOpex,
hwmClubhouseAreaRequired,
numberOfDomesticHp,
numberOfCommercialHp,
hpProductResolver,
};}
export  function hwmClubhouse__q_hwmDemand(hwmClubhouse__pi_demandAssumption:HwmDemandAssumptionBase,hwmClubhouse__pi_lpcdPerOccupant:number,hwmClubhouse__pi_swimmingPoolSurfaceArea:number,hwmClubhouse__st_poolAreaPerOccupant:number,hwmClubhouse__st_showerDiversity:number){let hotWaterPerOccupant = null;
let poolOccupants = null;
let hwmDemand = null;
hwmClubhouse__pi_demandAssumption = 'lpcd per occupant';
hotWaterPerOccupant = hwmClubhouse__pi_lpcdPerOccupant;
poolOccupants =
hwmClubhouse__pi_swimmingPoolSurfaceArea /
hwmClubhouse__st_poolAreaPerOccupant;
hwmDemand =
utilities.roundTo100(hotWaterPerOccupant * poolOccupants) *
hwmClubhouse__st_showerDiversity;
return { hotWaterPerOccupant, poolOccupants, hwmDemand };}
export  function hwmClubhouse__q_technologySelection(hwmClubhouse__pi_clubhouseRooftopArea:number,hwmClubhouse__st_hotWaterHours:number,hwm__st_rooftopPerSwh:number,hwm__st_rooftopPerHp:number,hwmClubhouse__q_hwmDemand){let availableRooftop = null;
let swhAreaRequired = null;
let defaultSwhCentralCapacity = null;
let defaultSwhIndividualCapacity = null;
let hpAreaRequired = null;
let defaultHpCommercialCapacity = null;
let defaultHpDomesticCapacity = null;
availableRooftop = hwmClubhouse__pi_clubhouseRooftopArea;
swhAreaRequired = hwmClubhouse__q_hwmDemand.hwmDemand * hwm__st_rooftopPerSwh;
if (availableRooftop > swhAreaRequired) {
defaultSwhCentralCapacity = hwmClubhouse__q_hwmDemand.hwmDemand;
defaultSwhIndividualCapacity = hwmClubhouse__q_hwmDemand.hwmDemand;
} else {
swhAreaRequired = availableRooftop;
defaultSwhCentralCapacity =
  utilities.roundTo100(availableRooftop) / hwm__st_rooftopPerSwh;
defaultSwhIndividualCapacity =
  utilities.roundTo100(availableRooftop) / hwm__st_rooftopPerSwh;
}
hpAreaRequired = hwmClubhouse__q_hwmDemand.hwmDemand * hwm__st_rooftopPerHp;
if (availableRooftop > hpAreaRequired) {
defaultHpCommercialCapacity = hwmClubhouse__q_hwmDemand.hwmDemand;
defaultHpDomesticCapacity = hwmClubhouse__q_hwmDemand.hwmDemand;
} else {
hpAreaRequired = availableRooftop;
defaultHpCommercialCapacity =
  utilities.roundTo100(availableRooftop) / hwm__st_rooftopPerHp;
defaultHpDomesticCapacity =
  utilities.roundTo100(availableRooftop) / hwm__st_rooftopPerHp;
}
return {
swhAreaRequired,
defaultSwhCentralCapacity,
defaultSwhIndividualCapacity,
hpAreaRequired,
defaultHpCommercialCapacity,
defaultHpDomesticCapacity,
};}
export  function hwmClubhouse__q_outcomesPreSdPlus(hwm__st_baseCasePerLPDkWh,hwm__st_swhCapexMultiplier,hwm__st_baseCaseClubhouseSwhCapacity){let hwmClubhouseEnergyAnnualPreSdPlus =
hwm__st_baseCaseClubhouseSwhCapacity * hwm__st_baseCasePerLPDkWh;
let hwmCapexPreSdPlus =
hwm__st_baseCaseClubhouseSwhCapacity * hwm__st_swhCapexMultiplier;
return {
hwmClubhouseEnergyAnnualPreSdPlus,
hwmCapexPreSdPlus,
};}
export  function hwmClubhouse__q_projectLevelInsights(project__pi_city:string,hwmClubhouse__pi_userCityEmissionFactor:number,global__st_convertKgToTon:number,global__st_treesPerTonCF:number,hwm__st_sdgNumberForHwm:number,hwmClubhouse__q_outcomes){let defaultCityEmissionFactor =
utilities.utility_getCityEmissionFactors(project__pi_city);
defaultCityEmissionFactor = utilities.utility_userOrDefaultValue(
defaultCityEmissionFactor,
hwmClubhouse__pi_userCityEmissionFactor
);
let cfMitigated =
defaultCityEmissionFactor *
hwmClubhouse__q_outcomes.hwmClubhouseEnergyAnnual *
global__st_convertKgToTon;
let sdgNumber = hwm__st_sdgNumberForHwm;
let treesSaved = cfMitigated * global__st_treesPerTonCF;
let totalEnergyConsumptionPercentage =
(hwmClubhouse__q_outcomes.hwmClubhouseEnergyAnnual * 100) / 200;
let residentialHotWaterEnergyConsumption =
(hwmClubhouse__q_outcomes.hwmClubhouseEnergyAnnual * 100) / 300;
return {
cfMitigated,
sdgNumber,
treesSaved,
totalEnergyConsumptionPercentage,
residentialHotWaterEnergyConsumption,
};}
export  function hwmClubhouse__q_flowDiagram(global__st_daysInYear:number,hwmClubhouse__q_outcomes){let residentialHotWater = 0;
let residentialLighting = 0;
let residentialFan = 0;
let homeAppliances = 0;
let residentialHVAC = 0;
let commonArea =
hwmClubhouse__q_outcomes.hwmClubhouseEnergyAnnual / global__st_daysInYear;
return {
residentialHotWater,
residentialLighting,
residentialFan,
homeAppliances,
residentialHVAC,
commonArea,
};}
export  function hwmClubhouse__q_secondaryImpact(){let passiveWaterKL = 0;
let passiveWaterOpex = 0;
let passiveWasteKg = 0;
let passiveWasteOpex = 0;
return { passiveWaterKL, passiveWaterOpex, passiveWasteKg, passiveWasteOpex };}
export  function hwmClubhouse__q_goalMonitoring(hwmClubhouse__q_outcomes){let energyGoal = 100;
let contribution =
(hwmClubhouse__q_outcomes.hwmClubhouseEnergyAnnual * 100) / 200;
return { energyGoal, contribution };}
export  function hwmClubhouse__q_overviewBarGraph(hwmClubhouse__st_minValue:number,hwmClubhouse__q_flowDiagram,hwmClubhouse__q_outcomes){let barOneTitle = 'Annual Energy Savings';
let barOneValue = hwmClubhouse__q_outcomes.hwmClubhouseEnergyAnnual;
let barOneMax = hwmClubhouse__q_outcomes.hwmClubhouseEnergyAnnual;
let barOneMin = hwmClubhouse__st_minValue;
let barTwoSubOneTitle = 'Common Area';
let barTwoValue = hwmClubhouse__q_flowDiagram.commonArea;
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
export  function hwmClubhouse__q_overviewDonutGraph(hwmClubhouse__q_outcomes){let donutOneTitle = '% of Total Energy';
let donutOneValue =
(hwmClubhouse__q_outcomes.hwmClubhouseEnergyAnnual * 100) / 200;
let donutTwoTitle = '% of Common Area Energy';
let donutTwoValue =
(hwmClubhouse__q_outcomes.hwmClubhouseEnergyAnnual * 100) / 300;
return {
donutOneTitle,
donutOneValue,
donutTwoTitle,
donutTwoValue,
};}
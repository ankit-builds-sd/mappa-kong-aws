import { irr } from 'node-irr'; import { HwmDemandAssumptionBase, HwmDemandAssumptionVilla, HwmDemandAssumptionPenthouse, DemandAssumptionApartment, HwmDemandByBath, HwmOption, HeatPumpType, SwhType, SwhVariant, HpType, HwmHpHeatingSpeed, SdPlusInterventions, CurrentWaterTableRow, CurrentWaterTable, CurrentWaterTableInputsRow, CurrentWaterTableInputs, WaterPreSdPlusRow, WaterPreSdPlus, PlumbingDetailsPreSdPlus, EFCalculator, StpCalculator, PreSDPlusDemand, OutcomesPreSdPlus } from '../../../utilities/types'; import * as utilities from '../../../utilities/utility'; import { CityDbData, SDPlusDefaultsStore } from '../../../utilities/stores';export  function hwmSwimmingPool__q_outcomes(hwmSwimmingPool__pi_hpType:HpType,hwmSwimmingPool__pi_option:HwmOption,hwmSwimmingPool__pi_userPoolCapacity:number,hwmSwimmingPool__pi_hpHeatingSpeed:HwmHpHeatingSpeed,project__pi_city:string,project__pi_floorHeight:number,project__pi_numberOfFloors:number,hwmSwimmingPool__pi_selectedProductIdentifier:string,hwmSwimmingPool__pi_outcomePreSdPlus:number,hwm__st_slowHeatingTime:number,hwm__st_fastHeatingTime:number,hwm__st_defaultHeatingTime:number,hwm__st_initialTemp:number,hwm__st_conversionFactor:number,global__st_hoursInDay:number,hwm__st_heatLossCoeff:number,hwm__st_supRet:number,hwm__st_numberOfShafts:number,hwm__st_hzPipe:number,hwm__st_outletTempSwimmingPool:number,hwm__st_outletTempOther:number,hwmSwimmingPool__q_technologySelection){let theProduct: any;
  let defaultPoolCapacity: number;
  let hwmPoolEnergyAnnual: any;
  let hwmPoolCapexPostSdPlus: any;
  let hwmPoolCapex: number;
  let hwmPoolOpex: number;
  let hwmPoolAreaRequired: number;
  let selectedProductPrice: number;
  let selectedProductRatedInputPower: number;
  let selectedProductCapacity: number;
  let numberOfProducts: number;
  let time = utilities.utility_hwmHpTimeCalculator(
    hwmSwimmingPool__pi_hpHeatingSpeed,
    hwm__st_slowHeatingTime,
    hwm__st_fastHeatingTime,
    hwm__st_defaultHeatingTime
  );

  if (
    hwmSwimmingPool__pi_option === 'heat pump' &&
    hwmSwimmingPool__pi_hpType === 'swimming pool'
  ) {
    const outletTemp = utilities.utility_hwmOutletTemp(
      hwmSwimmingPool__pi_hpType,
      hwm__st_outletTempSwimmingPool,
      hwm__st_outletTempOther
    );
    let hpProductResolver = utilities.utility_hpProductresolver(
      hwmSwimmingPool__pi_hpType,
      hwmSwimmingPool__q_technologySelection.defaultHpPoolCapacity,
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
      'HWM_Pool'
    );
    theProduct = utilities.utility_defaultOrSelectedProduct(
      hpProductResolver.defaultProductIdentifier,
      hwmSwimmingPool__pi_selectedProductIdentifier
    );
    selectedProductPrice = utilities.utility_numberFromString(theProduct.price);
    selectedProductCapacity = utilities.utility_numberFromString(
      theProduct.filters['Capacity '][0]
    );
    selectedProductRatedInputPower = utilities.utility_numberFromObject(
      theProduct.properties,
      'Rated Input Power (kW)'
    );
    numberOfProducts =
      hpProductResolver.requiredHeatingCapacity / selectedProductCapacity;
    defaultPoolCapacity =
      hwmSwimmingPool__q_technologySelection.defaultHpPoolCapacity;
    defaultPoolCapacity = utilities.utility_userOrDefaultValue(
      defaultPoolCapacity,
      hwmSwimmingPool__pi_userPoolCapacity
    );
    hwmPoolEnergyAnnual = utilities.utility_hpEnergySavings(
      hwmSwimmingPool__pi_hpType,
      hwmSwimmingPool__q_technologySelection.defaultHpPoolCapacity,
      selectedProductRatedInputPower,
      numberOfProducts,
      time
    );
    hwmPoolCapexPostSdPlus = utilities.utility_hpCapex(
      hwmSwimmingPool__pi_hpType,
      hwmSwimmingPool__q_technologySelection.defaultHpPoolCapacity,
      numberOfProducts,
      selectedProductPrice,
      selectedProductRatedInputPower,
      hpProductResolver.pipelength
    );
    hwmPoolOpex = utilities.utility_energyOpex(
      hwmPoolEnergyAnnual,
      project__pi_city
    );
    hwmPoolCapex =
      hwmPoolCapexPostSdPlus - hwmSwimmingPool__pi_outcomePreSdPlus;
    hwmPoolAreaRequired = hwmSwimmingPool__q_technologySelection.hpAreaRequired;
  }
  return {
    defaultPoolCapacity,
    numberOfProducts,
    hwmPoolEnergyAnnual,
    hwmPoolCapexPostSdPlus,
    hwmPoolAreaRequired,
    hwmPoolCapex,
    hwmPoolOpex,
  };}
export  function hwmSwimmingPool__q_technologySelection(hwm__st_rooftopPerHp:number,hwmSwimmingPool__q_hwmDemand){let hpPoolAreaRequired = null;
let defaultHpPoolCapacity = null;
hpPoolAreaRequired = hwmSwimmingPool__q_hwmDemand * hwm__st_rooftopPerHp;
defaultHpPoolCapacity = utilities.roundTo100(hwmSwimmingPool__q_hwmDemand);
return { hpPoolAreaRequired, defaultHpPoolCapacity };}
export  function hwmSwimmingPool__q_hwmDemand(project__pi_swimmingPool:number,hwmSwimmingPool__st_hotWaterRequired){let hwmPoolDemand = null;
hwmPoolDemand =
project__pi_swimmingPool * hwmSwimmingPool__st_hotWaterRequired;
return hwmPoolDemand;}
export  function hwmSwimmingPool__q_outcomesPreSdPlus(hwm__st_baseCasePerLPDkWh:number,hwm__st_swhCapexMultiplier:number,hwm__st_baseCasePoolSwhCapacity:number){let hwmPoolEnergyAnnualPreSdPlus =
hwm__st_baseCasePoolSwhCapacity * hwm__st_baseCasePerLPDkWh;
let hwmCapexPreSdPlus =
hwm__st_baseCasePoolSwhCapacity * hwm__st_swhCapexMultiplier;
return { hwmPoolEnergyAnnualPreSdPlus, hwmCapexPreSdPlus };}
export  function hwmSwimmingPool__q_projectLevelInsights(project__pi_city:string,global__st_convertKgToTon:number,global__st_treesPerTonCF:number,hwm__st_sdgNumberForHwm:number,hwmSwimmingPool__q_outcomes){let cfMitigated =
utilities.utility_getCityEmissionFactors(project__pi_city) *
hwmSwimmingPool__q_outcomes.hwmPoolEnergyAnnual *
global__st_convertKgToTon;
let sdgNumber = hwm__st_sdgNumberForHwm;
let treesSaved = cfMitigated * global__st_treesPerTonCF;
let totalEnergyConsumptionPercentage =
(hwmSwimmingPool__q_outcomes.hwmPoolEnergyAnnual * 100) / 200;
return {
cfMitigated,
sdgNumber,
treesSaved,
totalEnergyConsumptionPercentage,
};}
export  function hwmSwimmingPool__q_flowDiagram(global__st_daysInYear:number,hwmSwimmingPool__q_outcomes){let residentialHotWater = 0;
let residentialLighting = 0;
let residentialFan = 0;
let homeAppliances = 0;
let residentialHVAC = 0;
let commonArea =
hwmSwimmingPool__q_outcomes.hwmPoolEnergyAnnual / global__st_daysInYear;
return {
residentialHotWater,
residentialLighting,
residentialFan,
homeAppliances,
residentialHVAC,
commonArea,
};}
export  function hwmSwimmingPool__q_secondaryImpact(){let passiveWaterKL = 0;
let passiveWaterOpex = 0;
let passiveWasteKg = 0;
let passiveWasteOpex = 0;
return { passiveWaterKL, passiveWaterOpex, passiveWasteKg, passiveWasteOpex };}
export  function hwmSwimmingPool__q_goalMonitoring(hwmSwmimmingPool__q_outcomes){let energyGoal = 100;
let contribution =
(hwmSwmimmingPool__q_outcomes.hwmPoolEnergyAnnual * 100) / 200;
return { energyGoal, contribution };}
export  function hwmSwimmingPool__q_overviewBarGraph(hwmSwimmingPool__st_minValue:number,hwmSwimmingPool__q_flowDiagram,hwmSwimmingPool__q_outcomes){let barOneTitle = 'Annual Energy Savings';
let barOneValue = hwmSwimmingPool__q_outcomes.hwmPoolEnergyAnnual;
let barOneMax = hwmSwimmingPool__q_outcomes.hwmPoolEnergyAnnual;
let barOneMin = hwmSwimmingPool__st_minValue;
let barTwoSubOneTitle = 'Common Area';
let barTwoValue = hwmSwimmingPool__q_flowDiagram.commonArea;
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
export  function hwmSwimmingPool__q_overviewDonutGraph(hwmSwimmingPool__q_outcomes){let donutOneTitle = '% of Total Energy';
let donutOneValue =
(hwmSwimmingPool__q_outcomes.hwmPoolEnergyAnnual * 100) / 200;
let donutTwoTitle = '% of Common Area Energy';
let donutTwoValue =
(hwmSwimmingPool__q_outcomes.hwmPoolEnergyAnnual * 100) / 300;
return {
donutOneTitle,
donutOneValue,
donutTwoTitle,
donutTwoValue,
};}
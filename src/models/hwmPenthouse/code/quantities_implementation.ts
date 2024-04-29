import { irr } from 'node-irr'; import { HwmDemandAssumptionBase, HwmDemandAssumptionVilla, HwmDemandAssumptionPenthouse, DemandAssumptionApartment, HwmDemandByBath, HwmOption, HeatPumpType, SwhType, SwhVariant, HpType, HwmHpHeatingSpeed, SdPlusInterventions, CurrentWaterTableRow, CurrentWaterTable, CurrentWaterTableInputsRow, CurrentWaterTableInputs, WaterPreSdPlusRow, WaterPreSdPlus, PlumbingDetailsPreSdPlus, EFCalculator, StpCalculator, PreSDPlusDemand, OutcomesPreSdPlus } from '../../../utilities/types'; import * as utilities from '../../../utilities/utility'; import { CityDbData, SDPlusDefaultsStore } from '../../../utilities/stores';export  function hwmPenthouse__q_outcomes(hwmPenthouse__pi_swhType:SwhType,hwmPenthouse__pi_swhVariant,hwmPenthouse__pi_hpType:HpType,hwmPenthouse__pi_option:HwmOption,hwmPenthouse__pi_hpHeatingSpeed,project__pi_city:string,project__pi_floorHeight:number,project__pi_numberOfFloors:number,hwmPenthouse__pi_userSwhCapacity,hwmPenthouse__pi_userHpCapacity,hwmPenthouse__pi_selectedProductIdentifier:string,hwm__st_slowHeatingTime:number,hwm__st_fastHeatingTime:number,hwm__st_defaultHeatingTime:number,hwm__st_initialTemp:number,hwm__st_conversionFactor:number,global__st_hoursInDay:number,hwm__st_heatLossCoeff:number,hwm__st_supRet:number,hwm__st_numberOfShafts:number,hwm__st_hzPipe:number,hwm__st_outletTempSwimmingPool:number,hwm__st_outletTempOther:number,hwmPenthouse__q_technologySelection,hwmPenthouse__q_outcomesPreSdPlus,hwmPenthouse__q_hwmDemand){let defaultProductIdentifier: string;
  let theProduct: any;
  let defaultOrSelectedProduct: any;
  let numberOfProducts: number;
  let hwmPenthouseSwhCapacity: number;
  let hwmPenthouseHpDefaultCapacity: number;
  let hwmPenthouseHpCapacity: number;
  let hwmPenthouseSwhDefaultCapacity: number;
  let hwmPenthouseEnergyAnnual: any;
  let hwmPenthouseCapexPostSdPlus: any;
  let hwmPenthouseCapex: number;
  let hwmPenthouseOpex: number;
  let hwmPenthouseAreaRequired: number;
  let numberOfDomesticHp: number;
  let selectedProductPrice: number; //change it once marketplace integrated
  let selectedProductCapacity: number; //chnage it once marketplace integrated
  let selectedProductRatedInputPower: number; //change it once marketplace integrated
  let numberOfHp: number = 10; //not present in algo
  let pipeLengthDomestic: number = 10; //not there in algo
  let hpProductResolver;
  let time = utilities.utility_hwmHpTimeCalculator(
    hwmPenthouse__pi_hpHeatingSpeed,
    hwm__st_slowHeatingTime,
    hwm__st_fastHeatingTime,
    hwm__st_defaultHeatingTime
  );
  if (
    hwmPenthouse__pi_option === 'solar water heater' &&
    hwmPenthouse__pi_swhType === 'individual'
  ) {
    defaultProductIdentifier = utilities.utility_swhProductResolver(
      hwmPenthouse__pi_swhType,
      hwmPenthouse__pi_swhVariant,
      hwmPenthouse__q_technologySelection.defaultSwhIndividualCapacity,
      'HWM_Penthouse'
    );
    theProduct = utilities.utility_defaultOrSelectedProduct(
      defaultProductIdentifier,
      hwmPenthouse__pi_selectedProductIdentifier
    );
    selectedProductPrice = utilities.utility_numberFromString(theProduct.price);
    selectedProductCapacity = utilities.utility_numberFromString(
      theProduct.filters['Capacity '][0]
    );
    hwmPenthouseSwhDefaultCapacity =
      hwmPenthouse__q_technologySelection.defaultSwhIndividualCapacity;
    hwmPenthouseSwhDefaultCapacity = utilities.utility_userOrDefaultValue(
      hwmPenthouseSwhDefaultCapacity,
      hwmPenthouse__pi_userSwhCapacity
    );
    numberOfProducts = hwmPenthouse__q_hwmDemand.hotWaterDu;

    hwmPenthouseEnergyAnnual = utilities.utility_swhEnergySavings(
      hwmPenthouse__pi_swhType,
      hwmPenthouse__q_technologySelection.defaultSwhIndividualCapacity,
      numberOfProducts
    );
    hwmPenthouseCapexPostSdPlus = utilities.utility_swhCapex(
      hwmPenthouse__pi_swhType,
      hwmPenthouse__q_technologySelection.defaultSwhIndividualCapacity,
      selectedProductPrice,
      selectedProductCapacity,
      numberOfProducts
    );
    hwmPenthouseCapex =
      hwmPenthouseCapexPostSdPlus -
      hwmPenthouse__q_outcomesPreSdPlus.hwmCapexPreSdPlus;
    hwmPenthouseOpex = utilities.utility_energyOpex(
      hwmPenthouseEnergyAnnual,
      project__pi_city
    ); //the correct value not present in the algo
    hwmPenthouseAreaRequired =
      hwmPenthouse__q_technologySelection.swhAreaRequired;
  } else if (
    hwmPenthouse__pi_option === 'heat pump' &&
    hwmPenthouse__pi_hpType === 'domestic'
  ) {
    const outletTemp = utilities.utility_hwmOutletTemp(
      hwmPenthouse__pi_hpType,
      hwm__st_outletTempSwimmingPool,
      hwm__st_outletTempOther
    );
    hpProductResolver = utilities.utility_hpProductresolver(
      hwmPenthouse__pi_hpType,
      hwmPenthouse__q_technologySelection.defaultHpDomesticCapacity,
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
      'HWM_Penthouse'
    );
    theProduct = utilities.utility_defaultOrSelectedProduct(
      hpProductResolver.defaultProductIdentifier,
      hwmPenthouse__pi_selectedProductIdentifier
    );
    selectedProductPrice = utilities.utility_numberFromString(theProduct.price);
    selectedProductRatedInputPower = utilities.utility_numberFromObject(
      theProduct.properties,
      'Rated Input Power (kW)'
    );
    numberOfProducts = hwmPenthouse__q_hwmDemand.hotWaterDu;
    hwmPenthouseHpDefaultCapacity =
      hwmPenthouse__q_technologySelection.defaultHpDomesticCapacity;
    hwmPenthouseHpDefaultCapacity = utilities.utility_userOrDefaultValue(
      hwmPenthouseHpDefaultCapacity,
      hwmPenthouse__pi_userHpCapacity
    );
    hwmPenthouseEnergyAnnual = utilities.utility_hpEnergySavings(
      hwmPenthouse__pi_hpType,
      hwmPenthouse__q_technologySelection.defaultHpDomesticCapacity,
      selectedProductRatedInputPower,
      numberOfProducts,
      time
    );
    hwmPenthouseCapexPostSdPlus = utilities.utility_hpCapex(
      hwmPenthouse__pi_hpType,
      hwmPenthouse__q_technologySelection.defaultHpDomesticCapacity,
      numberOfProducts,
      selectedProductPrice,
      selectedProductRatedInputPower,
      pipeLengthDomestic
    );
    hwmPenthouseCapex =
      hwmPenthouseCapexPostSdPlus -
      hwmPenthouse__q_outcomesPreSdPlus.hwmCapexPreSdPlus;
    hwmPenthouseOpex = utilities.utility_energyOpex(
      hwmPenthouseEnergyAnnual,
      project__pi_city
    );
    hwmPenthouseAreaRequired =
      hwmPenthouse__q_technologySelection.hpAreaRequired;
  }
  return {
    defaultOrSelectedProduct: theProduct,
    hwmPenthouseSwhDefaultCapacity,
    hwmPenthouseHpDefaultCapacity,
    hwmPenthouseEnergyAnnual,
    hwmPenthouseCapexPostSdPlus,
    hwmPenthouseCapex,
    hwmPenthouseOpex,
    hwmPenthouseAreaRequired,
    numberOfProducts,
  };}
export  function hwmPenthouse__q_hwmDemand(hwmPenthouse__pi_demandAssumptionType,hwmPenthouse__pi_demandAssumption,hwmPenthouse__pi_lpdPerPenthouse,hwmPenthouse__pi_demandByBathType,occupancy__st_singleBedroomOccupants,occupancy__q_occupancyPenthouse,occupancy__q_numberOfDwellingUnitsPenthouse){let hotWaterPerOccupant = null,
    hotWaterOccupants = null,
    hotWaterDu = null,
    hwmDemand = null;
  if (hwmPenthouse__pi_demandAssumptionType === 'lpcd per occupant') {
    hotWaterPerOccupant = hwmPenthouse__pi_demandAssumption;
  } else if (
    hwmPenthouse__pi_demandAssumptionType ===
    'link to installed efficient fixtures'
  ) {
    hotWaterPerOccupant = -1;
  } else if (hwmPenthouse__pi_demandAssumptionType === 'lpd per penthouse') {
    hotWaterPerOccupant = hwmPenthouse__pi_lpdPerPenthouse;
  }

  hotWaterDu = occupancy__q_numberOfDwellingUnitsPenthouse;
  if (hwmPenthouse__pi_demandByBathType === 'all baths') {
    hotWaterOccupants = occupancy__q_occupancyPenthouse;
  } else if (hwmPenthouse__pi_demandByBathType === 'single bath') {
    hotWaterOccupants =
      occupancy__q_numberOfDwellingUnitsPenthouse *
      occupancy__st_singleBedroomOccupants;
  } else if (hwmPenthouse__pi_demandByBathType === 'remaining baths') {
    hotWaterOccupants =
      occupancy__q_occupancyPenthouse -
      occupancy__q_numberOfDwellingUnitsPenthouse *
        occupancy__st_singleBedroomOccupants;
  } else if (hwmPenthouse__pi_demandAssumptionType === 'lpd per penthouse') {
    hotWaterOccupants = occupancy__q_numberOfDwellingUnitsPenthouse;
  }
  hwmDemand =
    utilities.roundTo100(hotWaterPerOccupant * hotWaterOccupants) /
    occupancy__q_numberOfDwellingUnitsPenthouse;
  return { hwmDemand, hotWaterOccupants, hotWaterDu };}
export  function hwmPenthouse__q_technologySelection(hwm__pi_availablePenthouseRooftop,hwm__st_rooftopPerSwh,hwm__st_rooftopPerHp,hwmPenthouse__q_hwmDemand){let swhAreaRequired = hwmPenthouse__q_hwmDemand * hwm__st_rooftopPerSwh;
  let hpAreaRequired = hwmPenthouse__q_hwmDemand * hwm__st_rooftopPerSwh;
  let defaultHpDomesticCapacity;
  let defaultSwhIndividualCapacity;
  if (hwm__pi_availablePenthouseRooftop > swhAreaRequired) {
    defaultSwhIndividualCapacity = utilities.roundTo100(
      hwmPenthouse__q_hwmDemand
    );
  } else {
    swhAreaRequired = hwm__pi_availablePenthouseRooftop;
    defaultSwhIndividualCapacity =
      utilities.roundTo100(hwm__pi_availablePenthouseRooftop) /
      hwm__st_rooftopPerSwh;
  }
  if (hwm__pi_availablePenthouseRooftop > hpAreaRequired) {
    defaultHpDomesticCapacity = utilities.roundTo100(hwmPenthouse__q_hwmDemand);
  } else {
    hpAreaRequired = hwm__pi_availablePenthouseRooftop;
    defaultHpDomesticCapacity =
      utilities.roundTo100(hwm__pi_availablePenthouseRooftop) /
      hwm__st_rooftopPerHp;
  }

  return {
    defaultSwhIndividualCapacity,
    swhAreaRequired,
    defaultHpDomesticCapacity,
    hpAreaRequired,
  };}
export  function hwmPenthouse__q_outcomesPreSdPlus(hwm__st_baseCasePerLPDkWh,hwm__st_swhCapexMultiplier,hwm__st_baseCasePenthouseSwhCapacity){let hwmPenthouseEnergyAnnualPreSdPlus =
hwm__st_baseCasePenthouseSwhCapacity * hwm__st_baseCasePerLPDkWh;
let hwmCapexPreSdPlus =
hwm__st_baseCasePenthouseSwhCapacity * hwm__st_swhCapexMultiplier;
return {
hwmPenthouseEnergyAnnualPreSdPlus,
hwmCapexPreSdPlus,
};}
export  function hwmPenthouse__q_projectLevelInsights(project__pi_city:string,global__st_convertKgToTon,global__st_treesPerTonCF,hwm__st_sdgNumberForHwm,hwmPenthouse__q_outcomes){let cfMitigated = null;
let sdgNumber = null;
let treesSaved = null;
let totalEnergyConsumptionPercentage = null;
let residentialHotWaterEnergyConsumption = null;
cfMitigated =
1.6 *
hwmPenthouse__q_outcomes.hwmPenthouseEnergyAnnual *
global__st_convertKgToTon;
sdgNumber = hwm__st_sdgNumberForHwm;
treesSaved = cfMitigated * global__st_treesPerTonCF;
totalEnergyConsumptionPercentage =
(hwmPenthouse__q_outcomes.hwmPenthouseEnergyAnnual * 100) / 200;
residentialHotWaterEnergyConsumption =
(hwmPenthouse__q_outcomes.hwmPenthouseEnergyAnnual * 100) / 300;
return {
cfMitigated,
sdgNumber,
treesSaved,
totalEnergyConsumptionPercentage,
residentialHotWaterEnergyConsumption,
};}
export  function hwmPenthouse__q_flowDiagram(global__st_daysInYear,hwmPenthouse__q_outcomes){let residentialHotWater = null;
let residentialLighting = 0;
let residentialFan = 0;
let homeAppliances = 0;
let residentialHvac = 0;
let commonArea = 0;
residentialHotWater =
hwmPenthouse__q_outcomes.hwmPenthouseEnergyAnnual / global__st_daysInYear;
return {
residentialHotWater,
residentialLighting,
residentialFan,
homeAppliances,
residentialHvac,
commonArea,
};}
export  function hwmPenthouse__q_secondaryImpact(){let passiveWaterKL = 0;
let passiveWaterOpex = 0;
let passiveWasteKg = 0;
let passiveWasteOpex = 0;
return { passiveWaterKL, passiveWaterOpex, passiveWasteKg, passiveWasteOpex };}
export  function hwmPenthouse__q_goalMonitoring(hwmPenthouse__q_outcomes){let energyGoal = null;
let contribution = null;
energyGoal = 100;
contribution =
(hwmPenthouse__q_outcomes.hwmPenthouseEnergyAnnual * 100) / 200;
return { energyGoal, contribution };}
export  function hwmPenthouse__q_overviewBarGraph(hwmPenthouse__st_minValue,hwmPenthouse__q_flowDiagram,hwmPenthouse__q_outcomes){let barOneTitle = 'Annual Energy Savings';
let barOneValue = hwmPenthouse__q_outcomes.hwmPenthouseEnergyAnnual;
let barOneMax = hwmPenthouse__q_outcomes.hwmPenthouseEnergyAnnual;
let barOneMin = hwmPenthouse__st_minValue;
let barTwoSubOneTitle = 'Residential Hot Water';
let barTwoValue = hwmPenthouse__q_flowDiagram.residentialHotWater;
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
export  function hwmPenthouse__q_overviewDonutGraph(hwmPenthouse__q_outcomes){let donutOneTitle = '% of Total Energy';
let donutOneValue =
(hwmPenthouse__q_outcomes.hwmPenthouseEnergyAnnual * 100) / 200;
let donutTwoTitle = '% of Residential Hot Water';
let donutTwoValue =
(hwmPenthouse__q_outcomes.hwmPenthouseEnergyAnnual * 100) / 300;
return {
donutOneTitle,
donutOneValue,
donutTwoTitle,
donutTwoValue,
};}
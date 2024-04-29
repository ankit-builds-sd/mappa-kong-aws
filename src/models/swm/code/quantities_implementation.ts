import { irr } from 'node-irr'; import { HwmDemandAssumptionBase, HwmDemandAssumptionVilla, HwmDemandAssumptionPenthouse, DemandAssumptionApartment, HwmDemandByBath, HwmOption, HeatPumpType, SwhType, SwhVariant, HpType, HwmHpHeatingSpeed, SdPlusInterventions, CurrentWaterTableRow, CurrentWaterTable, CurrentWaterTableInputsRow, CurrentWaterTableInputs, WaterPreSdPlusRow, WaterPreSdPlus } from '../../../utilities/types'; import * as utilities from '../../../utilities/utility';export  function swm__q_sensorCalc(swm__pi_projectCategory:string,swm__pi_clubHouseUtilitySensor:boolean,swm__pi_supplySideTankerUtilitySensor:boolean,swm__pi_supplySideBorewellUtilitySensor:boolean,swm__pi_inletsPerStudio:number,swm__pi_inletsPerOneBHK:number,swm__pi_inletsPerTwoBHK:number,swm__pi_inletsPerThreeBHK:number,swm__pi_inletsPerFourBHK:number,occupancy__pi_studio:number,occupancy__pi_oneBHK:number,occupancy__pi_twoBHK:number,occupancy__pi_threeBHK:number,occupancy__pi_fourBHK:number,occupancy__pi_villaOneBHK:number,occupancy__pi_villaFourBHK:number,occupancy__pi_villaThreeBHK:number,occupancy__pi_villaTwoBHK:number,occupancy__pi_villaStudio:number,occupancy__pi_penthouseOneBHK:number,occupancy__pi_penthouseThreeBHK:number,occupancy__pi_penthouseFourBHK:number,occupancy__pi_penthouseTwoBHK:number,occupancy__pi_penthouseStudio:number,swm__st_chSensors:number,swm__st_borewellSensors:number,swm__st_tankerSensors:number,swm__st_otherSensors:number){let swmStudio = null;
  let swmOneBHK = null;
  let swmTwoBHK = null;
  let swmThreeBHK = null;
  let swmFourBHK = null;
  let swmStudioSensors = null;
  let swmOneBHKSensors = null;
  let swmTwoBHKSensors = null;
  let swmThreeBHKSensors = null;
  let swmFourBHKSensors = null;
  let swmNumberOfSensors = null;
  let swmNumberOfUtilitySensors = null;
  if (swm__pi_projectCategory === 'villa') {
    swmStudio = 0;
    swmOneBHK = occupancy__pi_villaOneBHK;
    swmTwoBHK = occupancy__pi_villaTwoBHK;
    swmThreeBHK = occupancy__pi_villaThreeBHK;
    swmFourBHK = occupancy__pi_villaFourBHK;
  } else {
    swmStudio = occupancy__pi_studio + occupancy__pi_penthouseStudio;
    swmOneBHK = occupancy__pi_oneBHK + occupancy__pi_penthouseOneBHK;
    swmTwoBHK = occupancy__pi_twoBHK + occupancy__pi_penthouseTwoBHK;
    swmThreeBHK = occupancy__pi_threeBHK + occupancy__pi_penthouseThreeBHK;
    swmFourBHK = occupancy__pi_fourBHK + occupancy__pi_penthouseFourBHK;
  }
  swmStudioSensors = swmStudio * swm__pi_inletsPerStudio;
  swmOneBHKSensors = swmOneBHK * swm__pi_inletsPerOneBHK;
  swmTwoBHKSensors = swmTwoBHK * swm__pi_inletsPerTwoBHK;
  swmThreeBHKSensors = swmThreeBHK * swm__pi_inletsPerThreeBHK;
  swmFourBHKSensors = swmFourBHK * swm__pi_inletsPerFourBHK;

  swmNumberOfSensors =
    swmStudioSensors +
    swmOneBHKSensors +
    swmTwoBHKSensors +
    swmThreeBHKSensors +
    swmFourBHKSensors;
  if (swm__pi_clubHouseUtilitySensor === true) {
    swmNumberOfUtilitySensors = swmNumberOfUtilitySensors + swm__st_chSensors;
  }
  if (swm__pi_supplySideTankerUtilitySensor === true) {
    swmNumberOfUtilitySensors =
      swmNumberOfUtilitySensors + swm__st_tankerSensors;
  }
  if (swm__pi_supplySideBorewellUtilitySensor === true) {
    swmNumberOfUtilitySensors =
      swmNumberOfUtilitySensors + swm__st_borewellSensors;
  }
  swmNumberOfUtilitySensors = swmNumberOfUtilitySensors + swm__st_otherSensors;
  return {
    swmNumberOfSensors,
    swmNumberOfUtilitySensors,
  };}
export  function swm__q_outcomes(swm__pi_capexPreSdPlus:number,global__st_convertLtoKL:number,global__st_daysInYear:number,swm__st_fixedCost:number,swm__st_sensorInstallationCost:number,swm__q_sensorCalc,water__q_currentWaterTable){let productIdentifier = 'dummy';
let swmDaily;
let swmAnnualWater;
let swmUnitApartmentCapex;
let swmUnitUtilityCapex = null;
let swmCapexPostSdPlus = null;
let swmCapex = null;
let swmOpex = null;
swmDaily =
(water__q_currentWaterTable.smartWaterMeter.residentialDomestic * 100) /
global__st_convertLtoKL;
swmAnnualWater = swmDaily * global__st_daysInYear;
swmUnitApartmentCapex = 100;
swmUnitUtilityCapex = 100;
swmCapexPostSdPlus =
(swmUnitApartmentCapex + swm__st_sensorInstallationCost) *
  swm__q_sensorCalc.swmNumberOfSensors +
(swmUnitUtilityCapex + swm__st_sensorInstallationCost) *
  swm__q_sensorCalc.swmNumberOfUtilitySensors +
swm__st_fixedCost;
swmCapex = swmCapexPostSdPlus - swm__pi_capexPreSdPlus;
swmOpex = 100;
return {
swmDaily,
swmAnnualWater,
swmUnitApartmentCapex,
swmUnitUtilityCapex,
swmCapex,
swmOpex,
};}
export  function swm__q_outcomesPreSDPlus(project__pi_city:string,global__st_daysInYear:number,swm__st_dailyPreSDPlus:number,swm__q_sensorCalc){let swmAnnualWaterPreSDPlus = swm__st_dailyPreSDPlus * global__st_daysInYear;
let swmCapexPreSDPlus = swm__q_sensorCalc.swmNumberOfSensors * 0.6; //need to implement a new utility function
return { swmAnnualWaterPreSDPlus, swmCapexPreSDPlus };}
export  function swm__q_projectLevelInsights(swm__pi_annualBaseLineWaterConsumption:number,global__st_convertKgToTon:number,global__st_treesPerTonCF:number,swm__q_outcomes){let swmCFMitigated = null;
let swmSdgNumber = 100;
let swmTreesSaved = null;
let swmPercentageTotalWaterConsumption = null;
swmCFMitigated =
1.6 * swm__q_outcomes.swmAnnualWater * global__st_convertKgToTon;
swmTreesSaved = swmCFMitigated * global__st_treesPerTonCF;
swmPercentageTotalWaterConsumption =
(swm__q_outcomes.swmAnnualWater * 100) /
swm__pi_annualBaseLineWaterConsumption;
return { swmCFMitigated, swmTreesSaved, swmPercentageTotalWaterConsumption };}
export  function swm__q_flowDiagram(swm__q_outcomes){let swmFlowDiagramDomestic = swm__q_outcomes.swmDaily;
let swmFlowDiagramHealthFaucet = 0;
let swmFlowDiagramFlushing = 0;
let swmFlowDiagramCommonArea = 0;
let swmFlowDiagramDrinking = 0;
return swmFlowDiagramDomestic;}
export  function swm__q_passiveEnergy(project__pi_numberOfFloors:number,project__pi_floorToFloorHeight:number,global__st_convertJoulesTokW:number,global__st_convertLtoM3:number,global__st_accelarationDueToGravity:number,water__st_pumpEfficiency:number,water__st_motorEfficiency:number,water__st_specificGravityOfWater:number,water__st_pumpFlowRate:number,swm__q_outcomes){let timeTakenToPumpWater = null;
let buildingHeight = null;
let hydraulicPower = null;
let shaftPower = null;
let electricalInput = null;
let swmPassiveEnergykWh = null;
let swmPassiveEnergyOpex = null;
timeTakenToPumpWater =
(swm__q_outcomes.swmAnnualWater * global__st_convertLtoM3) /
water__st_pumpFlowRate;
buildingHeight = project__pi_numberOfFloors * project__pi_floorToFloorHeight;
hydraulicPower =
(water__st_pumpFlowRate *
  buildingHeight *
  global__st_accelarationDueToGravity *
  water__st_specificGravityOfWater) /
global__st_convertJoulesTokW;
shaftPower = hydraulicPower / water__st_pumpEfficiency;
electricalInput = shaftPower / water__st_motorEfficiency;
swmPassiveEnergykWh = electricalInput * timeTakenToPumpWater;
swmPassiveEnergyOpex = 5000;
return {
timeTakenToPumpWater,
buildingHeight,
hydraulicPower,
shaftPower,
electricalInput,
swmPassiveEnergykWh,
swmPassiveEnergyOpex,
};}
export  function swm__q_secondaryImpact(swm__q_passiveEnergy){let passiveEnergykWh = null;
let passiveEnergyOpex = null;
let passiveWasteKg = null;
let passiveWasteOpex = null;
passiveEnergykWh = swm__q_passiveEnergy.swmPassiveEnergykWh;
passiveEnergyOpex = swm__q_passiveEnergy.swmPassiveEnergyOpex;
passiveWasteKg = 0;
passiveWasteOpex = 0;
return {
passiveEnergyOpex,
passiveEnergykWh,
passiveWasteKg,
passiveWasteOpex,
};}
export  function swm__q_goalMonitoring(swm__q_outcomes){let waterGoal = null;
let contribution = null;
waterGoal = 100;
contribution = swm__q_outcomes.swmAnnualWater / 200;
return { waterGoal, contribution };}
export  function swm__q_overviewBarGraph(swm__q_outcomes){let title = null;
  let totalSavings = null;
  let seriesNameOne = null;
  let seriesValueOne = null;
  let seriesNameTwo = null;
  let seriesValueTwo = null;
  let seriesNameThree = null;
  let seriesValueThree = null;
  let seriesNameFour = null;
  let seriesValueFour = null;
  let seriesNameFive = null;
  let seriesValueFive = null;
  title = 'Smart Water Meter savings by category';
  totalSavings = swm__q_outcomes.swmAnnualWater;

  seriesNameOne = 'domestic';
  seriesValueOne = swm__q_outcomes.swmAnnualWater;
  seriesNameTwo = 'health faucet';
  seriesValueTwo = 0;
  seriesNameThree = 'flushing';
  seriesValueThree = 0;
  seriesNameFour = 'common area';
  seriesValueFour = 0;
  seriesNameFive = 'drinking';
  seriesValueFive = 0;
  return { title, totalSavings };}
export  function swm__q_overviewBarDonutGraph(swm__q_outcomes){let donutOneTitle = null;
let donutOneValue = null;
donutOneTitle = '% of Total Water';
donutOneValue = (swm__q_outcomes.swmAnnualWater * 100) / 500;
return { donutOneTitle, donutOneValue };}
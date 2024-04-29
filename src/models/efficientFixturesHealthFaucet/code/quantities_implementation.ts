import { irr } from 'node-irr'; import { HwmDemandAssumptionBase, HwmDemandAssumptionVilla, HwmDemandAssumptionPenthouse, DemandAssumptionApartment, HwmDemandByBath, HwmOption, HeatPumpType, SwhType, SwhVariant, HpType, HwmHpHeatingSpeed, SdPlusInterventions, CurrentWaterTableRow, CurrentWaterTable, CurrentWaterTableInputsRow, CurrentWaterTableInputs, WaterPreSdPlusRow, WaterPreSdPlus, PlumbingDetailsPreSdPlus, EFCalculator, StpCalculator, PreSDPlusDemand, OutcomesPreSdPlus } from '../../../utilities/types'; import * as utilities from '../../../utilities/utility'; import { CityDbData, SDPlusDefaultsStore } from '../../../utilities/stores';export  function efficientFixturesHealthFaucet__q_noop(){return null;}
export  function efficientFixturesHealthFaucet__q_igbcOutcomes(efficientFixturesHealthFaucet__pi_projectCategory:string,efficientFixturesHealthFaucet__pi_city:string,efficientFixturesHealthFaucet__st_igbcDomestichealthfaucetDaily:number,efficientFixturesHealthFaucet__st_igbcDomestichealthfaucetDuration:number,efficientFixturesHealthFaucet__st_igbcDomestichealthfaucetFlowPreSd:number,efficientFixturesHealthFaucet__st_waterDomesticHealthFaucetDaily:number,efficientFixturesHealthFaucet__st_waterDomesticHealthFaucetDuration:number,global__st_globalDaysInAYear:number,global__st_globalLToKlConverter:number,efficientFixturesHealthFaucet__q_igbcOccupanyVilla,efficientFixturesHealthFaucet__q_igbcOccupanyApartment,efficientFixturesHealthFaucet__q_igbcOccupanyPenthouse){const igbcDomesticHealthFaucetPreSdPlus =
    efficientFixturesHealthFaucet__st_igbcDomestichealthfaucetDaily *
    efficientFixturesHealthFaucet__st_igbcDomestichealthfaucetDuration *
    efficientFixturesHealthFaucet__st_igbcDomestichealthfaucetFlowPreSd;

  // EF Occupancy Calc Starts
  let efIgbcOccupancy = 0;

  if (efficientFixturesHealthFaucet__pi_projectCategory === 'Villa') {
    efIgbcOccupancy = efficientFixturesHealthFaucet__q_igbcOccupanyVilla;
  } else {
    efIgbcOccupancy =
      efficientFixturesHealthFaucet__q_igbcOccupanyApartment +
      efficientFixturesHealthFaucet__q_igbcOccupanyPenthouse;
  }
  // EF Occupancy Calc Ends

  // Actual Calc
  const efhfIgbcDailyPreSdPlus =
    (igbcDomesticHealthFaucetPreSdPlus * efIgbcOccupancy) /
    global__st_globalLToKlConverter;

  const product = utilities.utility_efHealthFaucetProductResolver();
  const waterDomesticHealthFaucet =
    product.Flowrate *
    efficientFixturesHealthFaucet__st_waterDomesticHealthFaucetDaily *
    efficientFixturesHealthFaucet__st_waterDomesticHealthFaucetDuration;

  const efhfIgbcDaily =
    (waterDomesticHealthFaucet * efIgbcOccupancy) /
    global__st_globalLToKlConverter;

  const efhfIgbcDailySavings = efhfIgbcDailyPreSdPlus - efhfIgbcDaily;

  const efhfIgbcAnnualWater =
    efhfIgbcDailySavings * global__st_globalDaysInAYear;
  const efhfIgBcOpex = utilities.utility_waterOpex(
    efficientFixturesHealthFaucet__pi_city,
    efhfIgbcAnnualWater
  );

  return {
    efhfIgbcDailyPreSdPlus,
    efhfIgbcDaily,
    efhfIgbcDailySavings,
    efhfIgbcAnnualWater,
    efhfIgBcOpex,
  };}
export  function efficientFixturesHealthFaucet__q_outcomes(efficientFixturesHealthFaucet__pi_city:string,global__st_globalDaysInAYear:number,efficientFixturesHealthFaucet__q_efhfDailyPreSdPlus,efficientFixturesHealthFaucet__q_efhfDaily,efficientFixturesHealthFaucet__q_efhfCapexPostSdPlus,efficientFixturesHealthFaucet__q_efhfResidentialHealthFaucetCapexPreSdPlus,efficientFixturesHealthFaucet__q_efhfClubHouseHealthFaucetCapexPreSdPlus){const efhfDailyPreSdPlus =
    efficientFixturesHealthFaucet__q_efhfDailyPreSdPlus;

  const efhfDaily = efficientFixturesHealthFaucet__q_efhfDaily;

  const efhfAnnualWater =
    (efhfDailyPreSdPlus - efhfDaily) * global__st_globalDaysInAYear;

  const efhfCapexPostSdPlus =
    efficientFixturesHealthFaucet__q_efhfCapexPostSdPlus;

  const efhfCapexPreSdPlus =
    efficientFixturesHealthFaucet__q_efhfResidentialHealthFaucetCapexPreSdPlus +
    efficientFixturesHealthFaucet__q_efhfClubHouseHealthFaucetCapexPreSdPlus;

  const efhfCapex = efhfCapexPostSdPlus - efhfCapexPreSdPlus;

  const efhfOpex = utilities.utility_waterOpex(
    efficientFixturesHealthFaucet__pi_city,
    efhfAnnualWater
  );

  return {
    efhfDailyPreSdPlus,
    efhfDaily,
    efhfAnnualWater,
    efhfCapex,
    efhfOpex,
  };}
export  function efficientFixturesHealthFaucet__q_outcomesPreSdPlus(efficientFixturesHealthFaucet__pi_projectCategory:string,efficientFixturesHealthFaucet__pi_projectVilla1Bhk:number,efficientFixturesHealthFaucet__pi_projectVilla2Bhk:number,efficientFixturesHealthFaucet__pi_projectVilla3Bhk:number,efficientFixturesHealthFaucet__pi_projectVilla4Bhk:number,occupancy__pi_villaStudio:number,occupancy__pi_villaOneBHK:number,occupancy__pi_villaTwoBHK:number,occupancy__pi_villaThreeBHK:number,occupancy__pi_villaFourBHK:number,efficientFixturesHealthFaucet__pi_includeClubHouse:string,efficientFixturesHealthFaucet__pi_projectStudio:number,efficientFixturesHealthFaucet__pi_project1Bhk:number,efficientFixturesHealthFaucet__pi_project2Bhk:number,efficientFixturesHealthFaucet__pi_project3Bhk:number,efficientFixturesHealthFaucet__pi_project4Bhk:number,efficientFixturesHealthFaucet__pi_projectPhStudio:number,efficientFixturesHealthFaucet__pi_projectPh1Bhk:number,efficientFixturesHealthFaucet__pi_projectPh2Bhk:number,efficientFixturesHealthFaucet__pi_projectPh3Bhk:number,efficientFixturesHealthFaucet__pi_projectPh4Bhk:number,occupancy__pi_penthouseStudio:number,occupancy__pi_penthouseOneBHK:number,occupancy__pi_penthouseTwoBHK:number,occupancy__pi_penthouseThreeBHK:number,occupancy__pi_penthouseFourBHK:number,occupancy__pi_studio:number,occupancy__pi_oneBHK:number,occupancy__pi_twoBHK:number,occupancy__pi_threeBHK:number,occupancy__pi_fourBHK:number,efficientFixturesHealthFaucet__st_globalDaysInAYear:number,efficientFixturesHealthFaucet__st_igbc1BhkRefOccupancy:number,efficientFixturesHealthFaucet__st_igbc2BhkRefOccupancy:number,efficientFixturesHealthFaucet__st_igbc3BhkRefOccupancy:number,efficientFixturesHealthFaucet__st_igbc4BhkRefOccupancy:number,occupancy__st_studioRefOccupancy:number,occupancy__st_villaOneBHKRefOccupancy:number,occupancy__st_villaTwoBHKRefOccupancy:number,occupancy__st_villaThreeBHKRefOccupancy:number,occupancy__st_villaFourBHKRefOccupancy:number,efficientFixturesHealthFaucet__st_projectHousekeepingRefOccupancy:number,efficientFixturesHealthFaucet__st_clubHouseRefOccupancy:number,efficientFixturesHealthFaucet__st_waterDomesticHealthFaucetDaily:number,efficientFixturesHealthFaucet__st_waterDomesticHealthFaucetDuration:number,efficientFixturesHealthFaucet__st_waterDomesticHealthFaucetFlowPreSdPlus:number,efficientFixturesHealthFaucet__st_waterClubHouseDomesticHealthFaucetDaily:number,efficientFixturesHealthFaucet__st_waterClubHouseDomesticHealthFaucetDuration:number,efficientFixturesHealthFaucet__st_igbcStudioRefOccupancy:number,efficientFixturesHealthFaucet__st_projectStudioRefOccupancy:number,efficientFixturesHealthFaucet__st_project1BhkRefOccupancy:number,efficientFixturesHealthFaucet__st_project2BhkRefOccupancy:number,efficientFixturesHealthFaucet__st_project3BhkRefOccupancy:number,efficientFixturesHealthFaucet__st_project4BhkRefOccupancy:number,occupancy__st_penthouseOneBHKRefOccupancy:number,occupancy__st_penthouseTwoBHKRefOccupancy:number,occupancy__st_penthouseThreeBHKRefOccupancy:number,occupancy__st_penthouseFourBHKRefOccupancy:number,occupancy__st_oneBHKRefOccupancy:number,occupancy__st_twoBHKRefOccupancy:number,occupancy__st_threeBHKRefOccupancy:number,occupancy__st_fourBHKRefOccupancy:number,efficientFixturesHealthFaucet__q_efhfDailyPreSdPlus){return (
efficientFixturesHealthFaucet__q_efhfDailyPreSdPlus *
efficientFixturesHealthFaucet__st_globalDaysInAYear
);}
export  function efficientFixturesHealthFaucet__q_projectLevelInsights(efficientFixturesHealthFaucet__pi_city:string,efficientFixturesHealthFaucet__pi_studio:number,efficientFixturesHealthFaucet__pi_oneBHK:number,efficientFixturesHealthFaucet__pi_twoBHK:number,efficientFixturesHealthFaucet__pi_threeBHK:number,efficientFixturesHealthFaucet__pi_includeClubHouse:string,efficientFixturesHealthFaucet__pi_projectLandscapeArea:number,efficientFixturesHealthFaucet__pi_projectNoOfCarParks:number,efficientFixturesHealthFaucet__pi_projectSwimmingPoolSurfaceArea:number,efficientFixturesHealthFaucet__pi_projectAreaOfLobbiesAndCorridors:number,efficientFixturesHealthFaucet__st_globalKg2tonConv:number,efficientFixturesHealthFaucet__st_efSdgNumberForEf:number,efficientFixturesHealthFaucet__st_globalTreesPerTonCf:number,efficientFixturesHealthFaucet__st_projectHousekeepingRefOccupancy:number,efficientFixturesHealthFaucet__st_studioRefOccupancy:number,efficientFixturesHealthFaucet__st_oneBHKRefOccupancy:number,efficientFixturesHealthFaucet__st_twoBHKRefOccupancy:number,efficientFixturesHealthFaucet__st_threeBHKRefOccupancy:number,efficientFixturesHealthFaucet__st_clubHouseRefOccupancy:number,efficientFixturesHealthFaucet__st_waterDailyLandscapeWaterUse:number,efficientFixturesHealthFaucet__st_waterDailyCarWashWaterUse:number,efficientFixturesHealthFaucet__st_waterSwimmingPoolDepth:number,efficientFixturesHealthFaucet__st_waterWaterPerCubicMeter:number,efficientFixturesHealthFaucet__st_waterSwimmingPoolEvaporationRate:number,efficientFixturesHealthFaucet__st_waterDailyLobbiesAndCorridorsWaterUse:number,global__st_globalDaysInAYear:number,global__st_globalLToKlConverter:number,efficientFixturesHealthFaucet__q_efhfDailyPreSdPlus,efficientFixturesHealthFaucet__q_efhfDaily,water__q_currentWaterTable){// Pre
  const efhfDailyPreSdPlus =
    efficientFixturesHealthFaucet__q_efhfDailyPreSdPlus;
  const efhfDaily = efficientFixturesHealthFaucet__q_efhfDaily;
  const efhfAnnualWater =
    (efhfDailyPreSdPlus - efhfDaily) * global__st_globalDaysInAYear;

  let cityEmissionFactor: number;
  if (efficientFixturesHealthFaucet__pi_city === 'Bangalore') {
    cityEmissionFactor = 0.6;
  } else if (efficientFixturesHealthFaucet__pi_city === 'Bombay') {
    cityEmissionFactor = 0.89;
  }

  const occupancy = utilities.utility_efHfOccupancy(
    efficientFixturesHealthFaucet__pi_studio,
    efficientFixturesHealthFaucet__st_studioRefOccupancy,
    efficientFixturesHealthFaucet__pi_oneBHK,
    efficientFixturesHealthFaucet__st_oneBHKRefOccupancy,
    efficientFixturesHealthFaucet__pi_twoBHK,
    efficientFixturesHealthFaucet__st_twoBHKRefOccupancy,
    efficientFixturesHealthFaucet__pi_threeBHK,
    efficientFixturesHealthFaucet__st_threeBHKRefOccupancy
  );

  const totalOccupancy = utilities.utility_efHfTotalOccupancy(
    efficientFixturesHealthFaucet__pi_studio,
    efficientFixturesHealthFaucet__st_studioRefOccupancy,
    efficientFixturesHealthFaucet__pi_oneBHK,
    efficientFixturesHealthFaucet__st_oneBHKRefOccupancy,
    efficientFixturesHealthFaucet__pi_twoBHK,
    efficientFixturesHealthFaucet__st_twoBHKRefOccupancy,
    efficientFixturesHealthFaucet__pi_threeBHK,
    efficientFixturesHealthFaucet__st_threeBHKRefOccupancy,
    efficientFixturesHealthFaucet__st_projectHousekeepingRefOccupancy
  );

  const currentWaterTable = water__q_currentWaterTable;
  const residentialLPCD = currentWaterTable.clientBaseCase.residentialDrinking;
  const clubHouseLPCD = currentWaterTable.clientBaseCase.clubhouseDrinking;

  let chRefOcc = 0;
  if (efficientFixturesHealthFaucet__pi_includeClubHouse === 'Yes') {
    chRefOcc = efficientFixturesHealthFaucet__st_clubHouseRefOccupancy;
  }

  const clubHouseOccupancy = occupancy * chRefOcc;

  const waterCommonAreaLandscape =
    efficientFixturesHealthFaucet__pi_projectLandscapeArea *
    efficientFixturesHealthFaucet__st_waterDailyLandscapeWaterUse;

  const waterCommonAreaCarPark =
    efficientFixturesHealthFaucet__pi_projectNoOfCarParks *
    efficientFixturesHealthFaucet__st_waterDailyCarWashWaterUse;

  const waterCommonAreaCleaning =
    efficientFixturesHealthFaucet__pi_projectAreaOfLobbiesAndCorridors *
    efficientFixturesHealthFaucet__st_waterDailyLobbiesAndCorridorsWaterUse;

  const waterSwimmingPool =
    efficientFixturesHealthFaucet__pi_projectSwimmingPoolSurfaceArea *
    efficientFixturesHealthFaucet__st_waterSwimmingPoolDepth *
    efficientFixturesHealthFaucet__st_waterWaterPerCubicMeter *
    efficientFixturesHealthFaucet__st_waterSwimmingPoolEvaporationRate;

  const totalDailyWater =
    totalOccupancy * residentialLPCD +
    clubHouseOccupancy * clubHouseLPCD +
    waterCommonAreaLandscape +
    waterCommonAreaCarPark +
    waterCommonAreaCleaning +
    waterSwimmingPool;

  const annualBaselineWaterConsumption =
    (totalDailyWater * global__st_globalDaysInAYear) /
    global__st_globalLToKlConverter;

  // Final
  const efhfCfMitigated =
    cityEmissionFactor *
    efhfAnnualWater *
    efficientFixturesHealthFaucet__st_globalKg2tonConv;

  const efhfSdgNumber = efficientFixturesHealthFaucet__st_efSdgNumberForEf;

  const efhfTreesSaved =
    efhfCfMitigated * efficientFixturesHealthFaucet__st_globalTreesPerTonCf;

  const efhfPercentTotalWaterConsumption =
    (efhfAnnualWater * 100) / annualBaselineWaterConsumption;

  return {
    efhfCfMitigated,
    efhfSdgNumber,
    efhfTreesSaved,
    efhfPercentTotalWaterConsumption,
  };}
export  function efficientFixturesHealthFaucet__q_flowDiagram(global__st_globalDaysInAYear:number,efficientFixturesHealthFaucet__q_efhfDailyPreSdPlus,efficientFixturesHealthFaucet__q_efhfDaily){const efhfDailyPreSdPlus =
    efficientFixturesHealthFaucet__q_efhfDailyPreSdPlus;
  const efhfDaily = efficientFixturesHealthFaucet__q_efhfDaily;
  const efhfAnnualWater =
    (efhfDailyPreSdPlus - efhfDaily) * global__st_globalDaysInAYear;

  const efhfFlowDiagramDomestic = 0;
  const efhfFlowDiagramHealthFaucet =
    efhfAnnualWater / global__st_globalDaysInAYear;

  const efhfFlowDiagramFlushing = 0;
  const efhfFlowDiagramCommonArea = 0;
  const efhfFlowDiagramDrinking = 0;

  return {
    efhfFlowDiagramDomestic,
    efhfFlowDiagramHealthFaucet,

    efhfFlowDiagramFlushing,
    efhfFlowDiagramCommonArea,
    efhfFlowDiagramDrinking,
  };}
export  function efficientFixturesHealthFaucet__q_secondaryImpact(efficientFixturesHealthFaucet__pi_projectNoOfFloors:number,efficientFixturesHealthFaucet__pi_projectFloorToFloorHeight:number,efficientFixturesHealthFaucet__st_globalLtoM3converter:number,efficientFixturesHealthFaucet__st_waterPumpFlowRate:number,efficientFixturesHealthFaucet__st_globalAccelerationDueToGravity:number,efficientFixturesHealthFaucet__st_waterSpecificGravityOfWater:number,efficientFixturesHealthFaucet__st_globalJoulesToKwConverter:number,efficientFixturesHealthFaucet__st_waterPumpEfficiency:number,efficientFixturesHealthFaucet__st_waterMotorEfficiency:number,efficientFixturesHealthFaucet__st_city:string,global__st_globalDaysInAYear:number,efficientFixturesHealthFaucet__q_efhfDailyPreSdPlus,efficientFixturesHealthFaucet__q_efhfDaily){const efhfDailyPreSdPlus =
    efficientFixturesHealthFaucet__q_efhfDailyPreSdPlus;
  const efhfDaily = efficientFixturesHealthFaucet__q_efhfDaily;
  const efhfAnnualWater =
    (efhfDailyPreSdPlus - efhfDaily) * global__st_globalDaysInAYear;

  const timeTakenToPumpWater =
    (efhfAnnualWater * efficientFixturesHealthFaucet__st_globalLtoM3converter) /
    efficientFixturesHealthFaucet__st_waterPumpFlowRate;

  const buildingHeight =
    efficientFixturesHealthFaucet__pi_projectNoOfFloors *
    efficientFixturesHealthFaucet__pi_projectFloorToFloorHeight;

  const hydraulicPower =
    (efficientFixturesHealthFaucet__st_waterPumpFlowRate *
      buildingHeight *
      efficientFixturesHealthFaucet__st_globalAccelerationDueToGravity *
      efficientFixturesHealthFaucet__st_waterSpecificGravityOfWater) /
    efficientFixturesHealthFaucet__st_globalJoulesToKwConverter;

  const shaftPower =
    hydraulicPower / efficientFixturesHealthFaucet__st_waterPumpEfficiency;

  const electricalInput =
    shaftPower / efficientFixturesHealthFaucet__st_waterMotorEfficiency;
  const efhfPassiveEnergykWh = electricalInput * timeTakenToPumpWater;

  const efhfPassiveEnergyOpex = utilities.utility_energyOpex(
    efhfPassiveEnergykWh,
    efficientFixturesHealthFaucet__st_city
  );}
export  function efficientFixturesHealthFaucet__q_overviewBarGraph(global__st_globalDaysInAYear:number,efficientFixturesHealthFaucet__q_efhfDailyPreSdPlus,efficientFixturesHealthFaucet__q_efhfDaily){const efhfDailyPreSdPlus =
    efficientFixturesHealthFaucet__q_efhfDailyPreSdPlus;
  const efhfDaily = efficientFixturesHealthFaucet__q_efhfDaily;
  const efhfAnnualWater =
    (efhfDailyPreSdPlus - efhfDaily) * global__st_globalDaysInAYear;

  const title = 'Efficient Fixtures water usage by category';
  const totalSavings = efhfAnnualWater;

  const seriesName1 = 'Domestic';
  const seriesValue1 = 0;
  const seriesName2 = 'Health Faucet';
  const seriesValue2 = efhfAnnualWater;
  const seriesName3 = 'Flushing';
  const seriesValue3 = 0;
  const seriesName4 = 'Common Area';
  const seriesValue4 = 0;
  const seriesName5 = 'Drinking';
  const seriesValue5 = 0;}
export  function efficientFixturesHealthFaucet__q_overviewDonutGraph(efficientFixturesHealthFaucet__pi_studio:number,efficientFixturesHealthFaucet__pi_oneBHK:number,efficientFixturesHealthFaucet__pi_twoBHK:number,efficientFixturesHealthFaucet__pi_threeBHK:number,efficientFixturesHealthFaucet__pi_includeClubHouse:string,efficientFixturesHealthFaucet__pi_projectLandscapeArea:number,efficientFixturesHealthFaucet__pi_projectNoOfCarParks:number,efficientFixturesHealthFaucet__pi_projectAreaOfLobbiesAndCorridors:number,efficientFixturesHealthFaucet__pi_projectSwimmingPoolSurfaceArea:number,efficientFixturesHealthFaucet__st_studioRefOccupancy:number,efficientFixturesHealthFaucet__st_oneBHKRefOccupancy:number,efficientFixturesHealthFaucet__st_twoBHKRefOccupancy:number,efficientFixturesHealthFaucet__st_threeBHKRefOccupancy:number,efficientFixturesHealthFaucet__st_projectHousekeepingRefOccupancy:number,efficientFixturesHealthFaucet__st_clubHouseRefOccupancy:number,efficientFixturesHealthFaucet__st_waterDailyLandscapeWaterUse:number,efficientFixturesHealthFaucet__st_waterDailyCarWashWaterUse:number,efficientFixturesHealthFaucet__st_waterDailyLobbiesAndCorridorsWaterUse:number,efficientFixturesHealthFaucet__st_waterSwimmingPoolDepth:number,efficientFixturesHealthFaucet__st_waterWaterPerCubicMeter:number,efficientFixturesHealthFaucet__st_waterSwimmingPoolEvaporationRate:number,global__st_globalDaysInAYear:number,global__st_globalLToKlConverter:number,efficientFixturesHealthFaucet__q_efhfDailyPreSdPlus,efficientFixturesHealthFaucet__q_efhfDaily,water__q_currentWaterTable){const efhfDailyPreSdPlus =
    efficientFixturesHealthFaucet__q_efhfDailyPreSdPlus;
  const efhfDaily = efficientFixturesHealthFaucet__q_efhfDaily;
  const efhfAnnualWater =
    (efhfDailyPreSdPlus - efhfDaily) * global__st_globalDaysInAYear;

  // Annual Baseline Water Consumption Starts
  const occupancy = utilities.utility_efHfOccupancy(
    efficientFixturesHealthFaucet__pi_studio,
    efficientFixturesHealthFaucet__st_studioRefOccupancy,
    efficientFixturesHealthFaucet__pi_oneBHK,
    efficientFixturesHealthFaucet__st_oneBHKRefOccupancy,
    efficientFixturesHealthFaucet__pi_twoBHK,
    efficientFixturesHealthFaucet__st_twoBHKRefOccupancy,
    efficientFixturesHealthFaucet__pi_threeBHK,
    efficientFixturesHealthFaucet__st_threeBHKRefOccupancy
  );

  const totalOccupancy = utilities.utility_efHfTotalOccupancy(
    efficientFixturesHealthFaucet__pi_studio,
    efficientFixturesHealthFaucet__st_studioRefOccupancy,
    efficientFixturesHealthFaucet__pi_oneBHK,
    efficientFixturesHealthFaucet__st_oneBHKRefOccupancy,
    efficientFixturesHealthFaucet__pi_twoBHK,
    efficientFixturesHealthFaucet__st_twoBHKRefOccupancy,
    efficientFixturesHealthFaucet__pi_threeBHK,
    efficientFixturesHealthFaucet__st_threeBHKRefOccupancy,
    efficientFixturesHealthFaucet__st_projectHousekeepingRefOccupancy
  );

  const currentWaterTable = water__q_currentWaterTable;
  const residentialLPCD = currentWaterTable.clientBaseCase.residentialDrinking;
  const clubHouseLPCD = currentWaterTable.clientBaseCase.clubhouseDrinking;

  let chRefOcc = 0;
  if (efficientFixturesHealthFaucet__pi_includeClubHouse === 'Yes') {
    chRefOcc = efficientFixturesHealthFaucet__st_clubHouseRefOccupancy;
  }

  const clubHouseOccupancy = occupancy * chRefOcc;

  const waterCommonAreaLandscape =
    efficientFixturesHealthFaucet__pi_projectLandscapeArea *
    efficientFixturesHealthFaucet__st_waterDailyLandscapeWaterUse;

  const waterCommonAreaCarPark =
    efficientFixturesHealthFaucet__pi_projectNoOfCarParks *
    efficientFixturesHealthFaucet__st_waterDailyCarWashWaterUse;

  const waterCommonAreaCleaning =
    efficientFixturesHealthFaucet__pi_projectAreaOfLobbiesAndCorridors *
    efficientFixturesHealthFaucet__st_waterDailyLobbiesAndCorridorsWaterUse;

  const waterSwimmingPool =
    efficientFixturesHealthFaucet__pi_projectSwimmingPoolSurfaceArea *
    efficientFixturesHealthFaucet__st_waterSwimmingPoolDepth *
    efficientFixturesHealthFaucet__st_waterWaterPerCubicMeter *
    efficientFixturesHealthFaucet__st_waterSwimmingPoolEvaporationRate;

  const totalDailyWater =
    totalOccupancy * residentialLPCD +
    clubHouseOccupancy * clubHouseLPCD +
    waterCommonAreaLandscape +
    waterCommonAreaLandscape +
    waterCommonAreaCleaning +
    waterSwimmingPool;

  const annualBaselineWaterConsumption =
    (totalDailyWater * global__st_globalDaysInAYear) /
    global__st_globalLToKlConverter;

  // Annual Baseline Water Consumption Ends

  const donut1Title = 'Savings as % of Total Water';
  const donut1Value = (efhfAnnualWater * 100) / annualBaselineWaterConsumption;}
export  function efficientFixturesHealthFaucet__q_efhfDailyPreSdPlus(efficientFixturesHealthFaucet__pi_projectCategory:string,efficientFixturesHealthFaucet__st_waterDomesticHealthFaucetDaily:number,efficientFixturesHealthFaucet__st_waterDomesticHealthFaucetDuration:number,efficientFixturesHealthFaucet__st_waterDomesticHealthFaucetFlowPreSdPlus:number,global__st_globalLToKlConverter:number,efficientFixturesHealthFaucet__st_waterClubHouseDomesticHealthFaucetDaily:number,efficientFixturesHealthFaucet__st_waterClubHouseDomesticHealthFaucetDuration:number,efficientFixturesHealthFaucet__q_igbcOccupanyVilla,efficientFixturesHealthFaucet__q_occupancyTotalOccupancyVilla,efficientFixturesHealthFaucet__q_occupancyClubhouseOccupancyVilla,efficientFixturesHealthFaucet__q_igbcOccupanyApartment,efficientFixturesHealthFaucet__q_igbcOccupanyPenthouse,efficientFixturesHealthFaucet__q_occupancyTotalOccupancyApartment,efficientFixturesHealthFaucet__q_occupancyClubhouseOccupancyApartment){const waterDomesticHealthFaucetPreSdPlus =
    efficientFixturesHealthFaucet__st_waterDomesticHealthFaucetDaily *
    efficientFixturesHealthFaucet__st_waterDomesticHealthFaucetDuration *
    efficientFixturesHealthFaucet__st_waterDomesticHealthFaucetFlowPreSdPlus;

  // EF Occupancy Calc Starts
  let efIgbcOccupancy = 0;
  let efTotalOccupancy = 0;
  let efClubHouseOccupancy = 0;

  if (efficientFixturesHealthFaucet__pi_projectCategory === 'Villa') {
    efIgbcOccupancy = efficientFixturesHealthFaucet__q_igbcOccupanyVilla;

    efTotalOccupancy =
      efficientFixturesHealthFaucet__q_occupancyTotalOccupancyVilla;

    efClubHouseOccupancy =
      efficientFixturesHealthFaucet__q_occupancyClubhouseOccupancyVilla;
  } else {
    efIgbcOccupancy =
      efficientFixturesHealthFaucet__q_igbcOccupanyApartment +
      efficientFixturesHealthFaucet__q_igbcOccupanyPenthouse;

    efTotalOccupancy =
      efficientFixturesHealthFaucet__q_occupancyTotalOccupancyApartment;

    efClubHouseOccupancy =
      efficientFixturesHealthFaucet__q_occupancyClubhouseOccupancyApartment;
  }

  // EF Occupancy Calc Ends
  const waterClubHouseDomesticHealthFaucetPreSdPlus =
    efficientFixturesHealthFaucet__st_waterClubHouseDomesticHealthFaucetDaily *
    efficientFixturesHealthFaucet__st_waterClubHouseDomesticHealthFaucetDuration *
    efficientFixturesHealthFaucet__st_waterDomesticHealthFaucetFlowPreSdPlus;

  const efhfDailyPreSdPlus =
    (waterDomesticHealthFaucetPreSdPlus * efTotalOccupancy +
      waterClubHouseDomesticHealthFaucetPreSdPlus * efClubHouseOccupancy) /
    global__st_globalLToKlConverter;

  return efhfDailyPreSdPlus;}
export  function efficientFixturesHealthFaucet__q_efhfDaily(efficientFixturesHealthFaucet__pi_projectCategory:string,efficientFixturesHealthFaucet__st_waterDomesticHealthFaucetDaily:number,efficientFixturesHealthFaucet__st_waterDomesticHealthFaucetDuration:number,efficientFixturesHealthFaucet__st_waterClubHouseDomesticHealthFaucetDaily:number,efficientFixturesHealthFaucet__st_waterClubHouseDomesticHealthFaucetDuration:number,efficientFixturesHealthFaucet__st_waterDomesticHealthFaucetFlow:number,global__st_globalLToKlConverter:number,efficientFixturesHealthFaucet__q_igbcOccupanyVilla,efficientFixturesHealthFaucet__q_occupancyTotalOccupancyVilla,efficientFixturesHealthFaucet__q_occupancyClubhouseOccupancyVilla,efficientFixturesHealthFaucet__q_igbcOccupanyApartment,efficientFixturesHealthFaucet__q_igbcOccupanyPenthouse,efficientFixturesHealthFaucet__q_occupancyTotalOccupancyApartment,efficientFixturesHealthFaucet__q_occupancyClubhouseOccupancyApartment){const waterDomesticHealthFaucet =
    efficientFixturesHealthFaucet__st_waterDomesticHealthFaucetDaily *
    efficientFixturesHealthFaucet__st_waterDomesticHealthFaucetDuration *
    efficientFixturesHealthFaucet__st_waterDomesticHealthFaucetFlow;

  const waterClubHouseDomesticHealthFaucet =
    efficientFixturesHealthFaucet__st_waterClubHouseDomesticHealthFaucetDaily *
    efficientFixturesHealthFaucet__st_waterClubHouseDomesticHealthFaucetDuration *
    efficientFixturesHealthFaucet__st_waterDomesticHealthFaucetFlow;

  // EF Occupancy Calc Starts
  let efIgbcOccupancy = 0;
  let efTotalOccupancy = 0;
  let efClubHouseOccupancy = 0;

  if (efficientFixturesHealthFaucet__pi_projectCategory === 'Villa') {
    efIgbcOccupancy = efficientFixturesHealthFaucet__q_igbcOccupanyVilla;
    efTotalOccupancy =
      efficientFixturesHealthFaucet__q_occupancyTotalOccupancyVilla;
    efClubHouseOccupancy =
      efficientFixturesHealthFaucet__q_occupancyClubhouseOccupancyVilla;
  } else {
    efIgbcOccupancy =
      efficientFixturesHealthFaucet__q_igbcOccupanyApartment +
      efficientFixturesHealthFaucet__q_igbcOccupanyPenthouse;

    efTotalOccupancy =
      efficientFixturesHealthFaucet__q_occupancyTotalOccupancyApartment;
    efClubHouseOccupancy =
      efficientFixturesHealthFaucet__q_occupancyClubhouseOccupancyApartment;
  }

  // EF Occupancy Calc Ends

  const efhfDaily =
    waterDomesticHealthFaucet * efTotalOccupancy +
    (waterClubHouseDomesticHealthFaucet * efClubHouseOccupancy) /
      global__st_globalLToKlConverter;

  return efhfDaily;}
export  function efficientFixturesHealthFaucet__q_efhfCapexPostSdPlus(efficientFixturesHealthFaucet__pi_projectStudio:number,efficientFixturesHealthFaucet__pi_project1Bhk:number,efficientFixturesHealthFaucet__pi_project2Bhk:number,efficientFixturesHealthFaucet__pi_project3Bhk:number,efficientFixturesHealthFaucet__pi_project4Bhk:number,efficientFixturesHealthFaucet__pi_includeClubHouse:string,efficientFixturesHealthFaucet__st_efhfStudioDomesticHealthFaucet:number,efficientFixturesHealthFaucet__st_efhf1BhkDomesticHealthFaucet:number,efficientFixturesHealthFaucet__st_efhf2BhkDomesticHealthFaucet:number,efficientFixturesHealthFaucet__st_efhf3BhkDomesticHealthFaucet:number,efficientFixturesHealthFaucet__st_efhf4BhkDomesticHealthFaucet:number,efficientFixturesHealthFaucet__st_efhfClubHouseDomesticHealthFaucet:number){const product = utilities.utility_efHealthFaucetProductResolver();
  const waterDomesticHealthFaucetPrice = utilities.utility_numberFromString(
    product.price
  );

  const efhfResidentialHealthFaucetCapexPostSdPlus =
    (efficientFixturesHealthFaucet__pi_projectStudio *
      efficientFixturesHealthFaucet__st_efhfStudioDomesticHealthFaucet +
      efficientFixturesHealthFaucet__pi_project1Bhk *
        efficientFixturesHealthFaucet__st_efhf1BhkDomesticHealthFaucet +
      efficientFixturesHealthFaucet__pi_project2Bhk *
        efficientFixturesHealthFaucet__st_efhf2BhkDomesticHealthFaucet +
      efficientFixturesHealthFaucet__pi_project3Bhk *
        efficientFixturesHealthFaucet__st_efhf3BhkDomesticHealthFaucet +
      efficientFixturesHealthFaucet__pi_project4Bhk *
        efficientFixturesHealthFaucet__st_efhf4BhkDomesticHealthFaucet) *
    waterDomesticHealthFaucetPrice;

  let projectClubHouse = 0;
  if (efficientFixturesHealthFaucet__pi_includeClubHouse === 'Yes') {
    projectClubHouse = 1;
  }

  const efhfClubHouseHealthFaucetCapexPostSdPlus =
    projectClubHouse *
    efficientFixturesHealthFaucet__st_efhfClubHouseDomesticHealthFaucet *
    waterDomesticHealthFaucetPrice;

  return (
    efhfResidentialHealthFaucetCapexPostSdPlus +
    efhfClubHouseHealthFaucetCapexPostSdPlus
  );}
export  function efficientFixturesHealthFaucet__q_efhfResidentialHealthFaucetCapexPreSdPlus(efficientFixturesHealthFaucet__pi_projectStudio:number,efficientFixturesHealthFaucet__pi_project1Bhk:number,efficientFixturesHealthFaucet__pi_project2Bhk:number,efficientFixturesHealthFaucet__pi_project3Bhk:number,efficientFixturesHealthFaucet__pi_project4Bhk:number,efficientFixturesHealthFaucet__pi_includeClubHouse:string,efficientFixturesHealthFaucet__st_efhfStudioDomesticHealthFaucet:number,efficientFixturesHealthFaucet__st_efhf1BhkDomesticHealthFaucet:number,efficientFixturesHealthFaucet__st_efhf2BhkDomesticHealthFaucet:number,efficientFixturesHealthFaucet__st_efhf3BhkDomesticHealthFaucet:number,efficientFixturesHealthFaucet__st_efhf4BhkDomesticHealthFaucet:number,efficientFixturesHealthFaucet__st_waterNbcBaseCaseHealthFaucetPrice:number){const waterDomesticHealthFaucetPricePreSdPlus =
    efficientFixturesHealthFaucet__st_waterNbcBaseCaseHealthFaucetPrice;

  const efhfResidentialHealthFaucetCapexPreSdPlus =
    (efficientFixturesHealthFaucet__pi_projectStudio *
      efficientFixturesHealthFaucet__st_efhfStudioDomesticHealthFaucet +
      efficientFixturesHealthFaucet__pi_project1Bhk *
        efficientFixturesHealthFaucet__st_efhf1BhkDomesticHealthFaucet +
      efficientFixturesHealthFaucet__pi_project2Bhk *
        efficientFixturesHealthFaucet__st_efhf2BhkDomesticHealthFaucet +
      efficientFixturesHealthFaucet__pi_project3Bhk *
        efficientFixturesHealthFaucet__st_efhf3BhkDomesticHealthFaucet +
      efficientFixturesHealthFaucet__pi_project4Bhk *
        efficientFixturesHealthFaucet__st_efhf4BhkDomesticHealthFaucet) *
    waterDomesticHealthFaucetPricePreSdPlus;

  return efhfResidentialHealthFaucetCapexPreSdPlus;}
export  function efficientFixturesHealthFaucet__q_efhfClubHouseHealthFaucetCapexPreSdPlus(efficientFixturesHealthFaucet__pi_includeClubHouse:string,efficientFixturesHealthFaucet__st_waterNbcBaseCaseHealthFaucetPrice:number,efficientFixturesHealthFaucet__st_efhfClubHouseDomesticHealthFaucet:number){const waterDomesticHealthFaucetPricePreSdPlus =
    efficientFixturesHealthFaucet__st_waterNbcBaseCaseHealthFaucetPrice;

  let projectClubHouse = 0;
  if (efficientFixturesHealthFaucet__pi_includeClubHouse === 'Yes') {
    projectClubHouse = 1;
  }

  return (
    projectClubHouse *
    efficientFixturesHealthFaucet__st_efhfClubHouseDomesticHealthFaucet *
    waterDomesticHealthFaucetPricePreSdPlus
  );}
export  function efficientFixturesHealthFaucet__q_igbcOccupanyVilla(efficientFixturesHealthFaucet__pi_projectVilla1Bhk:number,efficientFixturesHealthFaucet__pi_projectVilla2Bhk:number,efficientFixturesHealthFaucet__pi_projectVilla3Bhk:number,efficientFixturesHealthFaucet__pi_projectVilla4Bhk:number,efficientFixturesHealthFaucet__st_igbc1BhkRefOccupancy:number,efficientFixturesHealthFaucet__st_igbc2BhkRefOccupancy:number,efficientFixturesHealthFaucet__st_igbc3BhkRefOccupancy:number,efficientFixturesHealthFaucet__st_igbc4BhkRefOccupancy:number){return (
efficientFixturesHealthFaucet__pi_projectVilla1Bhk *
  efficientFixturesHealthFaucet__st_igbc1BhkRefOccupancy +
efficientFixturesHealthFaucet__pi_projectVilla2Bhk *
  efficientFixturesHealthFaucet__st_igbc2BhkRefOccupancy +
efficientFixturesHealthFaucet__pi_projectVilla3Bhk *
  efficientFixturesHealthFaucet__st_igbc3BhkRefOccupancy +
efficientFixturesHealthFaucet__pi_projectVilla4Bhk *
  efficientFixturesHealthFaucet__st_igbc4BhkRefOccupancy
);}
export  function efficientFixturesHealthFaucet__q_occupancyTotalOccupancyVilla(occupancy__pi_villaStudio:number,occupancy__pi_villaOneBHK:number,occupancy__pi_villaTwoBHK:number,occupancy__pi_villaThreeBHK:number,occupancy__pi_villaFourBHK:number,occupancy__st_studioRefOccupancy:number,occupancy__st_villaOneBHKRefOccupancy:number,occupancy__st_villaTwoBHKRefOccupancy:number,occupancy__st_villaThreeBHKRefOccupancy:number,occupancy__st_villaFourBHKRefOccupancy:number,efficientFixturesHealthFaucet__st_projectHousekeepingRefOccupancy:number,occupancy__q_occupancyVilla){const totalOccupancyVilla =
    occupancy__q_occupancyVilla *
    (1 + efficientFixturesHealthFaucet__st_projectHousekeepingRefOccupancy);

  return totalOccupancyVilla;}
export  function efficientFixturesHealthFaucet__q_igbcOccupanyApartment(efficientFixturesHealthFaucet__pi_projectStudio:number,efficientFixturesHealthFaucet__pi_project1Bhk:number,efficientFixturesHealthFaucet__pi_project2Bhk:number,efficientFixturesHealthFaucet__pi_project3Bhk:number,efficientFixturesHealthFaucet__pi_project4Bhk:number,efficientFixturesHealthFaucet__st_igbcStudioRefOccupancy:number,efficientFixturesHealthFaucet__st_igbc1BhkRefOccupancy:number,efficientFixturesHealthFaucet__st_igbc2BhkRefOccupancy:number,efficientFixturesHealthFaucet__st_igbc3BhkRefOccupancy:number,efficientFixturesHealthFaucet__st_igbc4BhkRefOccupancy:number){return (
efficientFixturesHealthFaucet__pi_projectStudio +
efficientFixturesHealthFaucet__st_igbcStudioRefOccupancy +
(efficientFixturesHealthFaucet__pi_project1Bhk +
  efficientFixturesHealthFaucet__st_igbc1BhkRefOccupancy) +
(efficientFixturesHealthFaucet__pi_project2Bhk +
  efficientFixturesHealthFaucet__st_igbc2BhkRefOccupancy) +
(efficientFixturesHealthFaucet__pi_project3Bhk +
  efficientFixturesHealthFaucet__st_igbc3BhkRefOccupancy) +
(efficientFixturesHealthFaucet__pi_project4Bhk +
  efficientFixturesHealthFaucet__st_igbc4BhkRefOccupancy)
);}
export  function efficientFixturesHealthFaucet__q_occupancyTotalOccupancyApartment(efficientFixturesHealthFaucet__pi_projectStudio:number,efficientFixturesHealthFaucet__pi_project1Bhk:number,efficientFixturesHealthFaucet__pi_project2Bhk:number,efficientFixturesHealthFaucet__pi_project3Bhk:number,efficientFixturesHealthFaucet__pi_project4Bhk:number,occupancy__pi_penthouseStudio:number,occupancy__pi_penthouseOneBHK:number,occupancy__pi_penthouseTwoBHK:number,occupancy__pi_penthouseThreeBHK:number,occupancy__pi_penthouseFourBHK:number,efficientFixturesHealthFaucet__st_projectStudioRefOccupancy:number,efficientFixturesHealthFaucet__st_project1BhkRefOccupancy:number,efficientFixturesHealthFaucet__st_project2BhkRefOccupancy:number,efficientFixturesHealthFaucet__st_project3BhkRefOccupancy:number,efficientFixturesHealthFaucet__st_project4BhkRefOccupancy:number,efficientFixturesHealthFaucet__st_projectHousekeepingRefOccupancy:number,occupancy__st_studioRefOccupancy:number,occupancy__st_penthouseOneBHKRefOccupancy:number,occupancy__st_penthouseTwoBHKRefOccupancy:number,occupancy__st_penthouseThreeBHKRefOccupancy:number,occupancy__st_penthouseFourBHKRefOccupancy:number,occupancy__q_occupancyApartment,occupancy__q_occupancyPenthouse){const totalOccupancyApartment =
    (occupancy__q_occupancyApartment + occupancy__q_occupancyPenthouse) *
    (1 + efficientFixturesHealthFaucet__st_projectHousekeepingRefOccupancy);

  return totalOccupancyApartment;}
export  function efficientFixturesHealthFaucet__q_occupancyClubhouseOccupancyApartment(occupancy__pi_studio:number,occupancy__pi_oneBHK:number,occupancy__pi_twoBHK:number,occupancy__pi_threeBHK:number,occupancy__pi_fourBHK:number,occupancy__pi_penthouseStudio:number,occupancy__pi_penthouseOneBHK:number,occupancy__pi_penthouseTwoBHK:number,occupancy__pi_penthouseThreeBHK:number,occupancy__pi_penthouseFourBHK:number,efficientFixturesHealthFaucet__pi_includeClubHouse:string,occupancy__st_studioRefOccupancy:number,occupancy__st_oneBHKRefOccupancy:number,occupancy__st_twoBHKRefOccupancy:number,occupancy__st_threeBHKRefOccupancy:number,occupancy__st_fourBHKRefOccupancy:number,occupancy__st_penthouseOneBHKRefOccupancy:number,occupancy__st_penthouseTwoBHKRefOccupancy:number,occupancy__st_penthouseThreeBHKRefOccupancy:number,occupancy__st_penthouseFourBHKRefOccupancy:number,efficientFixturesHealthFaucet__st_clubHouseRefOccupancy:number,occupancy__q_occupancyApartment,occupancy__q_occupancyPenthouse){let clubHouseRefOccupancy = 0.1;
  if (efficientFixturesHealthFaucet__pi_includeClubHouse === 'Yes') {
    clubHouseRefOccupancy =
      efficientFixturesHealthFaucet__st_clubHouseRefOccupancy;
  }

  const clubHouseOccupancyApartment =
    (occupancy__q_occupancyApartment + occupancy__q_occupancyPenthouse) *
    clubHouseRefOccupancy;

  return clubHouseOccupancyApartment;}
export  function efficientFixturesHealthFaucet__q_igbcOccupanyPenthouse(efficientFixturesHealthFaucet__pi_projectPhStudio:number,efficientFixturesHealthFaucet__pi_projectPh1Bhk:number,efficientFixturesHealthFaucet__pi_projectPh2Bhk:number,efficientFixturesHealthFaucet__pi_projectPh3Bhk:number,efficientFixturesHealthFaucet__pi_projectPh4Bhk:number,efficientFixturesHealthFaucet__st_igbcStudioRefOccupancy:number,efficientFixturesHealthFaucet__st_igbc1BhkRefOccupancy:number,efficientFixturesHealthFaucet__st_igbc2BhkRefOccupancy:number,efficientFixturesHealthFaucet__st_igbc3BhkRefOccupancy:number,efficientFixturesHealthFaucet__st_igbc4BhkRefOccupancy:number){return (
efficientFixturesHealthFaucet__pi_projectPhStudio *
  efficientFixturesHealthFaucet__st_igbcStudioRefOccupancy +
efficientFixturesHealthFaucet__pi_projectPh1Bhk *
  efficientFixturesHealthFaucet__st_igbc1BhkRefOccupancy +
efficientFixturesHealthFaucet__pi_projectPh2Bhk *
  efficientFixturesHealthFaucet__st_igbc2BhkRefOccupancy +
efficientFixturesHealthFaucet__pi_projectPh3Bhk *
  efficientFixturesHealthFaucet__st_igbc3BhkRefOccupancy +
efficientFixturesHealthFaucet__pi_projectPh4Bhk *
  efficientFixturesHealthFaucet__st_igbc4BhkRefOccupancy
);}
export  function efficientFixturesHealthFaucet__q_occupancyClubhouseOccupancyVilla(efficientFixturesHealthFaucet__pi_includeClubHouse:string,efficientFixturesHealthFaucet__st_clubHouseRefOccupancy:number,occupancy__q_occupancyVilla){let clubHouseRefOccupancy = 0.1;
  if (efficientFixturesHealthFaucet__pi_includeClubHouse === 'Yes') {
    clubHouseRefOccupancy =
      efficientFixturesHealthFaucet__st_clubHouseRefOccupancy;
  }

  const clubHouseOccupancyVilla =
    occupancy__q_occupancyVilla * clubHouseRefOccupancy;

  return clubHouseOccupancyVilla;}
import { irr } from 'node-irr'; import { HwmDemandAssumptionBase, HwmDemandAssumptionVilla, HwmDemandAssumptionPenthouse, DemandAssumptionApartment, HwmDemandByBath, HwmOption, HeatPumpType, SwhType, SwhVariant, HpType, HwmHpHeatingSpeed, SdPlusInterventions, CurrentWaterTableRow, CurrentWaterTable, CurrentWaterTableInputsRow, CurrentWaterTableInputs, WaterPreSdPlusRow, WaterPreSdPlus, PlumbingDetailsPreSdPlus, EFCalculator, StpCalculator, PreSDPlusDemand, OutcomesPreSdPlus } from '../../../utilities/types'; import * as utilities from '../../../utilities/utility'; import { CityDbData, SDPlusDefaultsStore } from '../../../utilities/stores';export  function efficientFixturesFaucet__q_outcomes(efficientFixturesFaucet__pi_city:string,global__st_globalDaysInAYear:number,efficientFixturesFaucet__q_effDailyPreSdPlus,efficientFixturesFaucet__q_effDaily,efficientFixturesFaucet__q_effCapexPostSdPlus,efficientFixturesFaucet__q_effResidentialFaucetCapexPreSdPlus,efficientFixturesFaucet__q_effClubHouseFaucetCapexPreSdPlus){const effDailyPreSdPlus = efficientFixturesFaucet__q_effDailyPreSdPlus;

  const effDaily = efficientFixturesFaucet__q_effDaily;

  const effAnnualWater =
    (effDailyPreSdPlus - effDaily) * global__st_globalDaysInAYear;

  const effCapexPostSdPlus = efficientFixturesFaucet__q_effCapexPostSdPlus;

  const effCapexPreSdPlus =
    efficientFixturesFaucet__q_effResidentialFaucetCapexPreSdPlus +
    efficientFixturesFaucet__q_effClubHouseFaucetCapexPreSdPlus;

  const effCapex = effCapexPostSdPlus - effCapexPreSdPlus;

  const effOpex = utilities.utility_waterOpex(
    efficientFixturesFaucet__pi_city,
    effAnnualWater
  );

  return {
    effDailyPreSdPlus,
    effDaily,
    effAnnualWater,
    effCapex,
    effOpex,
  };}
export  function efficientFixturesFaucet__q_effDailyPreSdPlus(efficientFixturesFaucet__pi_projectCategory:string,efficientFixturesFaucet__st_waterDomesticFaucetDaily:number,efficientFixturesFaucet__st_waterDomesticFaucetDuration:number,efficientFixturesFaucet__st_waterDomesticFaucetFlowPreSdPlus:number,global__st_globalLToKlConverter:number,efficientFixturesFaucet__st_waterClubHouseDomesticFaucetDaily:number,efficientFixturesFaucet__st_waterClubHouseDomesticFaucetDuration:number,efficientFixturesFaucet__q_occupancyTotalOccupancyVilla,efficientFixturesFaucet__q_occupancyClubhouseOccupancyVilla,efficientFixturesFaucet__q_occupancyTotalOccupancyApartment,efficientFixturesFaucet__q_occupancyClubhouseOccupancyApartment){const waterDomesticFaucetPreSdPlus =
    efficientFixturesFaucet__st_waterDomesticFaucetDaily *
    efficientFixturesFaucet__st_waterDomesticFaucetDuration *
    efficientFixturesFaucet__st_waterDomesticFaucetFlowPreSdPlus;

  // EF Occupancy Calc Starts
  let efTotalOccupancy = 0;
  let efClubHouseOccupancy = 0;

  if (efficientFixturesFaucet__pi_projectCategory === 'Villa') {
    efTotalOccupancy = efficientFixturesFaucet__q_occupancyTotalOccupancyVilla;

    efClubHouseOccupancy =
      efficientFixturesFaucet__q_occupancyClubhouseOccupancyVilla;
  } else {
    efTotalOccupancy =
      efficientFixturesFaucet__q_occupancyTotalOccupancyApartment;

    efClubHouseOccupancy =
      efficientFixturesFaucet__q_occupancyClubhouseOccupancyApartment;
  }

  // EF Occupancy Calc Ends
  const waterClubHouseDomesticFaucetPreSdPlus =
    efficientFixturesFaucet__st_waterClubHouseDomesticFaucetDaily *
    efficientFixturesFaucet__st_waterClubHouseDomesticFaucetDuration *
    efficientFixturesFaucet__st_waterDomesticFaucetFlowPreSdPlus;

  const effDailyPreSdPlus =
    (waterDomesticFaucetPreSdPlus * efTotalOccupancy +
      waterClubHouseDomesticFaucetPreSdPlus * efClubHouseOccupancy) /
    global__st_globalLToKlConverter;

  return effDailyPreSdPlus;}
export  function efficientFixturesFaucet__q_effDaily(efficientFixturesFaucet__pi_projectCategory:string,efficientFixturesFaucet__st_waterDomesticFaucetDaily:number,efficientFixturesFaucet__st_waterDomesticFaucetDuration:number,efficientFixturesFaucet__st_waterClubHouseDomesticFaucetDaily:number,efficientFixturesFaucet__st_waterClubHouseDomesticFaucetDuration:number,efficientFixturesFaucet__st_waterDomesticFaucetFlow:number,global__st_globalLToKlConverter:number,efficientFixturesFaucet__q_occupancyTotalOccupancyVilla,efficientFixturesFaucet__q_occupancyClubhouseOccupancyVilla,efficientFixturesFaucet__q_occupancyTotalOccupancyApartment,efficientFixturesFaucet__q_occupancyClubhouseOccupancyApartment){const waterDomesticFaucet =
    efficientFixturesFaucet__st_waterDomesticFaucetDaily *
    efficientFixturesFaucet__st_waterDomesticFaucetDuration *
    efficientFixturesFaucet__st_waterDomesticFaucetFlow;

  const waterClubHouseDomesticFaucet =
    efficientFixturesFaucet__st_waterClubHouseDomesticFaucetDaily *
    efficientFixturesFaucet__st_waterClubHouseDomesticFaucetDuration *
    efficientFixturesFaucet__st_waterDomesticFaucetFlow;

  // EF Occupancy Calc Starts
  let efTotalOccupancy = 0;
  let efClubHouseOccupancy = 0;

  if (efficientFixturesFaucet__pi_projectCategory === 'Villa') {
    efTotalOccupancy = efficientFixturesFaucet__q_occupancyTotalOccupancyVilla;
    efClubHouseOccupancy =
      efficientFixturesFaucet__q_occupancyClubhouseOccupancyVilla;
  } else {
    efTotalOccupancy =
      efficientFixturesFaucet__q_occupancyTotalOccupancyApartment;
    efClubHouseOccupancy =
      efficientFixturesFaucet__q_occupancyClubhouseOccupancyApartment;
  }

  // EF Occupancy Calc Ends

  const effDaily =
    waterDomesticFaucet * efTotalOccupancy +
    (waterClubHouseDomesticFaucet * efClubHouseOccupancy) /
      global__st_globalLToKlConverter;

  return effDaily;}
export  function efficientFixturesFaucet__q_effCapexPostSdPlus(efficientFixturesFaucet__pi_projectStudio:number,efficientFixturesFaucet__pi_project1Bhk:number,efficientFixturesFaucet__pi_project2Bhk:number,efficientFixturesFaucet__pi_project3Bhk:number,efficientFixturesFaucet__pi_project4Bhk:number,efficientFixturesFaucet__pi_includeClubHouse:string,efficientFixturesFaucet__st_effStudioDomesticFaucet:number,efficientFixturesFaucet__st_eff1BhkDomesticFaucet:number,efficientFixturesFaucet__st_eff2BhkDomesticFaucet:number,efficientFixturesFaucet__st_eff3BhkDomesticFaucet:number,efficientFixturesFaucet__st_eff4BhkDomesticFaucet:number,efficientFixturesFaucet__st_effClubHouseDomesticFaucet:number,efficientFixturesFaucet__q_effResidentialFaucetCapexPreSdPlus){const product = utilities.utility_efHealthFaucetProductResolver();

  let waterDomesticFaucetPrice = 0;
  if (product.length) {
    waterDomesticFaucetPrice = utilities.utility_numberFromString(
      product.price
    );
  }

  const effResidentialFaucetCapexPostSdPlus =
    (efficientFixturesFaucet__pi_projectStudio *
      efficientFixturesFaucet__st_effStudioDomesticFaucet +
      efficientFixturesFaucet__pi_project1Bhk *
        efficientFixturesFaucet__st_eff1BhkDomesticFaucet +
      efficientFixturesFaucet__pi_project2Bhk *
        efficientFixturesFaucet__st_eff2BhkDomesticFaucet +
      efficientFixturesFaucet__pi_project3Bhk *
        efficientFixturesFaucet__st_eff3BhkDomesticFaucet +
      efficientFixturesFaucet__pi_project4Bhk *
        efficientFixturesFaucet__st_eff4BhkDomesticFaucet) *
    waterDomesticFaucetPrice;

  let projectClubHouse = 0;
  if (efficientFixturesFaucet__pi_includeClubHouse === 'Yes') {
    projectClubHouse = 1;
  }

  const effClubHouseFaucetCapexPostSdPlus =
    projectClubHouse *
    efficientFixturesFaucet__st_effClubHouseDomesticFaucet *
    waterDomesticFaucetPrice;

  let effCapexPostSdPlus;
  if (product.aeratorType == 'Built-in Aerator') {
    effCapexPostSdPlus =
      effResidentialFaucetCapexPostSdPlus +
      effClubHouseFaucetCapexPostSdPlus +
      efficientFixturesFaucet__q_effResidentialFaucetCapexPreSdPlus;
  } else {
    effCapexPostSdPlus =
      effResidentialFaucetCapexPostSdPlus + effClubHouseFaucetCapexPostSdPlus;
  }

  return (
    effResidentialFaucetCapexPostSdPlus + effClubHouseFaucetCapexPostSdPlus
  );}
export  function efficientFixturesFaucet__q_effResidentialFaucetCapexPreSdPlus(efficientFixturesFaucet__pi_projectStudio:number,efficientFixturesFaucet__pi_project1Bhk:number,efficientFixturesFaucet__pi_project2Bhk:number,efficientFixturesFaucet__pi_project3Bhk:number,efficientFixturesFaucet__pi_project4Bhk:number,efficientFixturesFaucet__st_effStudioDomesticFaucet:number,efficientFixturesFaucet__st_eff1BhkDomesticFaucet:number,efficientFixturesFaucet__st_eff2BhkDomesticFaucet:number,efficientFixturesFaucet__st_eff3BhkDomesticFaucet:number,efficientFixturesFaucet__st_eff4BhkDomesticFaucet:number,efficientFixturesFaucet__st_waterNbcBaseCaseFaucetPrice:number){const waterDomesticFaucetPricePreSdPlus =
    efficientFixturesFaucet__st_waterNbcBaseCaseFaucetPrice;

  const effResidentialFaucetCapexPreSdPlus =
    (efficientFixturesFaucet__pi_projectStudio *
      efficientFixturesFaucet__st_effStudioDomesticFaucet +
      efficientFixturesFaucet__pi_project1Bhk *
        efficientFixturesFaucet__st_eff1BhkDomesticFaucet +
      efficientFixturesFaucet__pi_project2Bhk *
        efficientFixturesFaucet__st_eff2BhkDomesticFaucet +
      efficientFixturesFaucet__pi_project3Bhk *
        efficientFixturesFaucet__st_eff3BhkDomesticFaucet +
      efficientFixturesFaucet__pi_project4Bhk *
        efficientFixturesFaucet__st_eff4BhkDomesticFaucet) *
    waterDomesticFaucetPricePreSdPlus;

  return effResidentialFaucetCapexPreSdPlus;}
export  function efficientFixturesFaucet__q_effClubHouseFaucetCapexPreSdPlus(efficientFixturesFaucet__pi_includeClubHouse:string,efficientFixturesFaucet__st_waterNbcBaseCaseFaucetPrice:number,efficientFixturesFaucet__st_effClubHouseDomesticFaucet:number){const waterDomesticFaucetPricePreSdPlus =
    efficientFixturesFaucet__st_waterNbcBaseCaseFaucetPrice;

  let projectClubHouse = 0;
  if (efficientFixturesFaucet__pi_includeClubHouse === 'Yes') {
    projectClubHouse = 1;
  }

  return (
    projectClubHouse *
    efficientFixturesFaucet__st_effClubHouseDomesticFaucet *
    waterDomesticFaucetPricePreSdPlus
  );}
export  function efficientFixturesFaucet__q_igbcOccupanyVilla(efficientFixturesFaucet__pi_projectVilla1Bhk:number,efficientFixturesFaucet__pi_projectVilla2Bhk:number,efficientFixturesFaucet__pi_projectVilla3Bhk:number,efficientFixturesFaucet__pi_projectVilla4Bhk:number,efficientFixturesFaucet__st_igbc1BhkRefOccupancy:number,efficientFixturesFaucet__st_igbc2BhkRefOccupancy:number,efficientFixturesFaucet__st_igbc3BhkRefOccupancy:number,efficientFixturesFaucet__st_igbc4BhkRefOccupancy:number){return (
efficientFixturesFaucet__pi_projectVilla1Bhk *
  efficientFixturesFaucet__st_igbc1BhkRefOccupancy +
efficientFixturesFaucet__pi_projectVilla2Bhk *
  efficientFixturesFaucet__st_igbc2BhkRefOccupancy +
efficientFixturesFaucet__pi_projectVilla3Bhk *
  efficientFixturesFaucet__st_igbc3BhkRefOccupancy +
efficientFixturesFaucet__pi_projectVilla4Bhk *
  efficientFixturesFaucet__st_igbc4BhkRefOccupancy
);}
export  function efficientFixturesFaucet__q_occupancyTotalOccupancyVilla(occupancy__pi_villaStudio:number,occupancy__pi_villaOneBHK:number,occupancy__pi_villaTwoBHK:number,occupancy__pi_villaThreeBHK:number,occupancy__pi_villaFourBHK:number,occupancy__st_studioRefOccupancy:number,occupancy__st_villaOneBHKRefOccupancy:number,occupancy__st_villaTwoBHKRefOccupancy:number,occupancy__st_villaThreeBHKRefOccupancy:number,occupancy__st_villaFourBHKRefOccupancy:number,efficientFixturesFaucet__st_projectHousekeepingRefOccupancy:number,occupancy__q_occupancyVilla){const totalOccupancyVilla =
    occupancy__q_occupancyVilla *
    (1 + efficientFixturesFaucet__st_projectHousekeepingRefOccupancy);

  return totalOccupancyVilla;}
export  function efficientFixturesFaucet__q_igbcOccupanyApartment(efficientFixturesFaucet__pi_projectStudio:number,efficientFixturesFaucet__pi_project1Bhk:number,efficientFixturesFaucet__pi_project2Bhk:number,efficientFixturesFaucet__pi_project3Bhk:number,efficientFixturesFaucet__pi_project4Bhk:number,efficientFixturesFaucet__st_igbcStudioRefOccupancy:number,efficientFixturesFaucet__st_igbc1BhkRefOccupancy:number,efficientFixturesFaucet__st_igbc2BhkRefOccupancy:number,efficientFixturesFaucet__st_igbc3BhkRefOccupancy:number,efficientFixturesFaucet__st_igbc4BhkRefOccupancy:number){return (
efficientFixturesFaucet__pi_projectStudio +
efficientFixturesFaucet__st_igbcStudioRefOccupancy +
(efficientFixturesFaucet__pi_project1Bhk +
  efficientFixturesFaucet__st_igbc1BhkRefOccupancy) +
(efficientFixturesFaucet__pi_project2Bhk +
  efficientFixturesFaucet__st_igbc2BhkRefOccupancy) +
(efficientFixturesFaucet__pi_project3Bhk +
  efficientFixturesFaucet__st_igbc3BhkRefOccupancy) +
(efficientFixturesFaucet__pi_project4Bhk +
  efficientFixturesFaucet__st_igbc4BhkRefOccupancy)
);}
export  function efficientFixturesFaucet__q_occupancyTotalOccupancyApartment(efficientFixturesFaucet__pi_projectStudio:number,efficientFixturesFaucet__pi_project1Bhk:number,efficientFixturesFaucet__pi_project2Bhk:number,efficientFixturesFaucet__pi_project3Bhk:number,efficientFixturesFaucet__pi_project4Bhk:number,occupancy__pi_penthouseStudio:number,occupancy__pi_penthouseOneBHK:number,occupancy__pi_penthouseTwoBHK:number,occupancy__pi_penthouseThreeBHK:number,occupancy__pi_penthouseFourBHK:number,efficientFixturesFaucet__st_projectStudioRefOccupancy:number,efficientFixturesFaucet__st_project1BhkRefOccupancy:number,efficientFixturesFaucet__st_project2BhkRefOccupancy:number,efficientFixturesFaucet__st_project3BhkRefOccupancy:number,efficientFixturesFaucet__st_project4BhkRefOccupancy:number,efficientFixturesFaucet__st_projectHousekeepingRefOccupancy:number,occupancy__st_studioRefOccupancy:number,occupancy__st_penthouseOneBHKRefOccupancy:number,occupancy__st_penthouseTwoBHKRefOccupancy:number,occupancy__st_penthouseThreeBHKRefOccupancy:number,occupancy__st_penthouseFourBHKRefOccupancy:number,occupancy__q_occupancyApartment,occupancy__q_occupancyPenthouse){const totalOccupancyApartment =
    (occupancy__q_occupancyApartment + occupancy__q_occupancyPenthouse) *
    (1 + efficientFixturesFaucet__st_projectHousekeepingRefOccupancy);

  return totalOccupancyApartment;}
export  function efficientFixturesFaucet__q_occupancyClubhouseOccupancyApartment(occupancy__pi_studio:number,occupancy__pi_oneBHK:number,occupancy__pi_twoBHK:number,occupancy__pi_threeBHK:number,occupancy__pi_fourBHK:number,occupancy__pi_penthouseStudio:number,occupancy__pi_penthouseOneBHK:number,occupancy__pi_penthouseTwoBHK:number,occupancy__pi_penthouseThreeBHK:number,occupancy__pi_penthouseFourBHK:number,efficientFixturesFaucet__pi_includeClubHouse:string,occupancy__st_studioRefOccupancy:number,occupancy__st_oneBHKRefOccupancy:number,occupancy__st_twoBHKRefOccupancy:number,occupancy__st_threeBHKRefOccupancy:number,occupancy__st_fourBHKRefOccupancy:number,occupancy__st_penthouseOneBHKRefOccupancy:number,occupancy__st_penthouseTwoBHKRefOccupancy:number,occupancy__st_penthouseThreeBHKRefOccupancy:number,occupancy__st_penthouseFourBHKRefOccupancy:number,efficientFixturesFaucet__st_clubHouseRefOccupancy:number,occupancy__q_occupancyApartment,occupancy__q_occupancyPenthouse){let clubHouseRefOccupancy = 0.1;
  if (efficientFixturesFaucet__pi_includeClubHouse === 'Yes') {
    clubHouseRefOccupancy = efficientFixturesFaucet__st_clubHouseRefOccupancy;
  }

  const clubHouseOccupancyApartment =
    (occupancy__q_occupancyApartment + occupancy__q_occupancyPenthouse) *
    clubHouseRefOccupancy;

  return clubHouseOccupancyApartment;}
export  function efficientFixturesFaucet__q_igbcOccupanyPenthouse(efficientFixturesFaucet__pi_projectPhStudio:number,efficientFixturesFaucet__pi_projectPh1Bhk:number,efficientFixturesFaucet__pi_projectPh2Bhk:number,efficientFixturesFaucet__pi_projectPh3Bhk:number,efficientFixturesFaucet__pi_projectPh4Bhk:number,efficientFixturesFaucet__st_igbcStudioRefOccupancy:number,efficientFixturesFaucet__st_igbc1BhkRefOccupancy:number,efficientFixturesFaucet__st_igbc2BhkRefOccupancy:number,efficientFixturesFaucet__st_igbc3BhkRefOccupancy:number,efficientFixturesFaucet__st_igbc4BhkRefOccupancy:number){return (
efficientFixturesFaucet__pi_projectPhStudio *
  efficientFixturesFaucet__st_igbcStudioRefOccupancy +
efficientFixturesFaucet__pi_projectPh1Bhk *
  efficientFixturesFaucet__st_igbc1BhkRefOccupancy +
efficientFixturesFaucet__pi_projectPh2Bhk *
  efficientFixturesFaucet__st_igbc2BhkRefOccupancy +
efficientFixturesFaucet__pi_projectPh3Bhk *
  efficientFixturesFaucet__st_igbc3BhkRefOccupancy +
efficientFixturesFaucet__pi_projectPh4Bhk *
  efficientFixturesFaucet__st_igbc4BhkRefOccupancy
);}
export  function efficientFixturesFaucet__q_occupancyClubhouseOccupancyVilla(efficientFixturesFaucet__pi_includeClubHouse:string,efficientFixturesFaucet__st_clubHouseRefOccupancy:number,occupancy__q_occupancyVilla){let clubHouseRefOccupancy = 0.1;
  if (efficientFixturesFaucet__pi_includeClubHouse === 'Yes') {
    clubHouseRefOccupancy = efficientFixturesFaucet__st_clubHouseRefOccupancy;
  }

  const clubHouseOccupancyVilla =
    occupancy__q_occupancyVilla * clubHouseRefOccupancy;

  return clubHouseOccupancyVilla;}
export  function efficientFixturesFaucet__q_igbcOutcomes(efficientFixturesFaucet__pi_projectCategory:string,efficientFixturesFaucet__pi_city:string,efficientFixturesFaucet__st_igbcDomesticfaucetDaily:number,efficientFixturesFaucet__st_igbcDomesticfaucetDuration:number,efficientFixturesFaucet__st_igbcDomesticfaucetFlowPreSd:number,efficientFixturesFaucet__st_waterDomesticFaucetDaily:number,efficientFixturesFaucet__st_waterDomesticFaucetDuration:number,global__st_globalDaysInAYear:number,global__st_globalLToKlConverter:number,efficientFixturesFaucet__q_igbcOccupanyVilla,efficientFixturesFaucet__q_igbcOccupanyApartment,efficientFixturesFaucet__q_igbcOccupanyPenthouse){const igbcDomesticFaucetPreSdPlus =
    efficientFixturesFaucet__st_igbcDomesticfaucetDaily *
    efficientFixturesFaucet__st_igbcDomesticfaucetDuration *
    efficientFixturesFaucet__st_igbcDomesticfaucetFlowPreSd;

  // EF Occupancy Calc Starts
  let efIgbcOccupancy = 0;

  if (efficientFixturesFaucet__pi_projectCategory === 'Villa') {
    efIgbcOccupancy = efficientFixturesFaucet__q_igbcOccupanyVilla;
  } else {
    efIgbcOccupancy =
      efficientFixturesFaucet__q_igbcOccupanyApartment +
      efficientFixturesFaucet__q_igbcOccupanyPenthouse;
  }
  // EF Occupancy Calc Ends

  // Actual Calc
  const effIgbcDailyPreSdPlus =
    (igbcDomesticFaucetPreSdPlus * efIgbcOccupancy) /
    global__st_globalLToKlConverter;

  const product = utilities.utility_efHealthFaucetProductResolver();
  const waterDomesticFaucet =
    product.Flowrate *
    efficientFixturesFaucet__st_waterDomesticFaucetDaily *
    efficientFixturesFaucet__st_waterDomesticFaucetDuration;

  const effIgbcDaily =
    (waterDomesticFaucet * efIgbcOccupancy) / global__st_globalLToKlConverter;

  const effIgbcDailySavings = effIgbcDailyPreSdPlus - effIgbcDaily;

  const effIgbcAnnualWater = effIgbcDailySavings * global__st_globalDaysInAYear;
  const effIgBcOpex = utilities.utility_waterOpex(
    efficientFixturesFaucet__pi_city,
    effIgbcAnnualWater
  );

  return {
    effIgbcDailyPreSdPlus,
    effIgbcDaily,
    effIgbcDailySavings,
    effIgbcAnnualWater,
    effIgBcOpex,
  };}
export  function efficientFixturesFaucet__q_projectLevelInsights(efficientFixturesFaucet__pi_city:string,efficientFixturesFaucet__pi_studio:number,efficientFixturesFaucet__pi_oneBHK:number,efficientFixturesFaucet__pi_twoBHK:number,efficientFixturesFaucet__pi_threeBHK:number,efficientFixturesFaucet__pi_includeClubHouse:string,efficientFixturesFaucet__pi_projectLandscapeArea:number,efficientFixturesFaucet__pi_projectNoOfCarParks:number,efficientFixturesFaucet__pi_projectSwimmingPoolSurfaceArea:number,efficientFixturesFaucet__pi_projectAreaOfLobbiesAndCorridors:number,efficientFixturesFaucet__st_globalKg2tonConv:number,efficientFixturesFaucet__st_efSdgNumberForEf:number,efficientFixturesFaucet__st_globalTreesPerTonCf:number,efficientFixturesFaucet__st_projectHousekeepingRefOccupancy:number,efficientFixturesFaucet__st_studioRefOccupancy:number,efficientFixturesFaucet__st_oneBHKRefOccupancy:number,efficientFixturesFaucet__st_twoBHKRefOccupancy:number,efficientFixturesFaucet__st_threeBHKRefOccupancy:number,efficientFixturesFaucet__st_clubHouseRefOccupancy:number,efficientFixturesFaucet__st_waterDailyLandscapeWaterUse:number,efficientFixturesFaucet__st_waterDailyCarWashWaterUse:number,efficientFixturesFaucet__st_waterSwimmingPoolDepth:number,efficientFixturesFaucet__st_waterWaterPerCubicMeter:number,efficientFixturesFaucet__st_waterSwimmingPoolEvaporationRate:number,efficientFixturesFaucet__st_waterDailyLobbiesAndCorridorsWaterUse:number,global__st_globalDaysInAYear:number,global__st_globalLToKlConverter:number,efficientFixturesFaucet__q_effDailyPreSdPlus,efficientFixturesFaucet__q_effDaily,water__q_currentWaterTable){const effDailyPreSdPlus = efficientFixturesFaucet__q_effDailyPreSdPlus;
  const effDaily = efficientFixturesFaucet__q_effDaily;
  const effAnnualWater =
    (effDailyPreSdPlus - effDaily) * global__st_globalDaysInAYear;

  let cityEmissionFactor: number;
  if (efficientFixturesFaucet__pi_city === 'Bangalore') {
    cityEmissionFactor = 0.6;
  } else if (efficientFixturesFaucet__pi_city === 'Bombay') {
    cityEmissionFactor = 0.89;
  }

  const occupancy = utilities.utility_efHfOccupancy(
    efficientFixturesFaucet__pi_studio,
    efficientFixturesFaucet__st_studioRefOccupancy,
    efficientFixturesFaucet__pi_oneBHK,
    efficientFixturesFaucet__st_oneBHKRefOccupancy,
    efficientFixturesFaucet__pi_twoBHK,
    efficientFixturesFaucet__st_twoBHKRefOccupancy,
    efficientFixturesFaucet__pi_threeBHK,
    efficientFixturesFaucet__st_threeBHKRefOccupancy
  );

  const totalOccupancy = utilities.utility_efHfTotalOccupancy(
    efficientFixturesFaucet__pi_studio,
    efficientFixturesFaucet__st_studioRefOccupancy,
    efficientFixturesFaucet__pi_oneBHK,
    efficientFixturesFaucet__st_oneBHKRefOccupancy,
    efficientFixturesFaucet__pi_twoBHK,
    efficientFixturesFaucet__st_twoBHKRefOccupancy,
    efficientFixturesFaucet__pi_threeBHK,
    efficientFixturesFaucet__st_threeBHKRefOccupancy,
    efficientFixturesFaucet__st_projectHousekeepingRefOccupancy
  );

  const currentWaterTable = water__q_currentWaterTable;
  const residentialLPCD = currentWaterTable.clientBaseCase.residentialDrinking;
  const clubHouseLPCD = currentWaterTable.clientBaseCase.clubhouseDrinking;

  let chRefOcc = 0;
  if (efficientFixturesFaucet__pi_includeClubHouse === 'Yes') {
    chRefOcc = efficientFixturesFaucet__st_clubHouseRefOccupancy;
  }

  const clubHouseOccupancy = occupancy * chRefOcc;

  const waterCommonAreaLandscape =
    efficientFixturesFaucet__pi_projectLandscapeArea *
    efficientFixturesFaucet__st_waterDailyLandscapeWaterUse;

  const waterCommonAreaCarPark =
    efficientFixturesFaucet__pi_projectNoOfCarParks *
    efficientFixturesFaucet__st_waterDailyCarWashWaterUse;

  const waterCommonAreaCleaning =
    efficientFixturesFaucet__pi_projectAreaOfLobbiesAndCorridors *
    efficientFixturesFaucet__st_waterDailyLobbiesAndCorridorsWaterUse;

  const waterSwimmingPool =
    efficientFixturesFaucet__pi_projectSwimmingPoolSurfaceArea *
    efficientFixturesFaucet__st_waterSwimmingPoolDepth *
    efficientFixturesFaucet__st_waterWaterPerCubicMeter *
    efficientFixturesFaucet__st_waterSwimmingPoolEvaporationRate;

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
  const effCfMitigated =
    cityEmissionFactor *
    effAnnualWater *
    efficientFixturesFaucet__st_globalKg2tonConv;

  const effSdgNumber = efficientFixturesFaucet__st_efSdgNumberForEf;

  const effTreesSaved =
    effCfMitigated * efficientFixturesFaucet__st_globalTreesPerTonCf;

  const effPercentTotalWaterConsumption =
    (effAnnualWater * 100) / annualBaselineWaterConsumption;

  return {
    effCfMitigated,
    effSdgNumber,
    effTreesSaved,
    effPercentTotalWaterConsumption,
  };}
export  function efficientFixturesFaucet__q_flowDiagram(global__st_globalDaysInAYear:number,efficientFixturesFaucet__q_effDailyPreSdPlus,efficientFixturesFaucet__q_effDaily){const effDailyPreSdPlus = efficientFixturesFaucet__q_effDailyPreSdPlus;
  const effDaily = efficientFixturesFaucet__q_effDaily;
  const effAnnualWater =
    (effDailyPreSdPlus - effDaily) * global__st_globalDaysInAYear;

  const effFlowDiagramDomestic = effAnnualWater / global__st_globalDaysInAYear;
  const effFlowDiagramHealthFaucet = 0;

  const effFlowDiagramFlushing = 0;
  const effFlowDiagramCommonArea = 0;
  const effFlowDiagramDrinking = 0;

  return {
    effFlowDiagramDomestic,
    effFlowDiagramHealthFaucet,

    effFlowDiagramFlushing,
    effFlowDiagramCommonArea,
    effFlowDiagramDrinking,
  };}
export  function efficientFixturesFaucet__q_secondaryImpact(efficientFixturesFaucet__pi_projectNoOfFloors:number,efficientFixturesFaucet__pi_projectFloorToFloorHeight:number,efficientFixturesFaucet__st_globalLtoM3converter:number,efficientFixturesFaucet__st_waterPumpFlowRate:number,efficientFixturesFaucet__st_globalAccelerationDueToGravity:number,efficientFixturesFaucet__st_waterSpecificGravityOfWater:number,efficientFixturesFaucet__st_globalJoulesToKwConverter:number,efficientFixturesFaucet__st_waterPumpEfficiency:number,efficientFixturesFaucet__st_waterMotorEfficiency:number,efficientFixturesFaucet__st_city:string,global__st_globalDaysInAYear:number,efficientFixturesFaucet__q_effDailyPreSdPlus,efficientFixturesFaucet__q_effDaily){const effDailyPreSdPlus = efficientFixturesFaucet__q_effDailyPreSdPlus;
  const effDaily = efficientFixturesFaucet__q_effDaily;
  const effAnnualWater =
    (effDailyPreSdPlus - effDaily) * global__st_globalDaysInAYear;

  const timeTakenToPumpWater =
    (effAnnualWater * efficientFixturesFaucet__st_globalLtoM3converter) /
    efficientFixturesFaucet__st_waterPumpFlowRate;

  const buildingHeight =
    efficientFixturesFaucet__pi_projectNoOfFloors *
    efficientFixturesFaucet__pi_projectFloorToFloorHeight;

  const hydraulicPower =
    (efficientFixturesFaucet__st_waterPumpFlowRate *
      buildingHeight *
      efficientFixturesFaucet__st_globalAccelerationDueToGravity *
      efficientFixturesFaucet__st_waterSpecificGravityOfWater) /
    efficientFixturesFaucet__st_globalJoulesToKwConverter;

  const shaftPower =
    hydraulicPower / efficientFixturesFaucet__st_waterPumpEfficiency;

  const electricalInput =
    shaftPower / efficientFixturesFaucet__st_waterMotorEfficiency;
  const effPassiveEnergykWh = electricalInput * timeTakenToPumpWater;

  const effPassiveEnergyOpex = utilities.utility_energyOpex(
    effPassiveEnergykWh,
    efficientFixturesFaucet__st_city
  );

  return {
    timeTakenToPumpWater,
    buildingHeight,
    hydraulicPower,
    shaftPower,
    electricalInput,
    effPassiveEnergykWh,
    effPassiveEnergyOpex,
  };}
export  function efficientFixturesFaucet__q_overviewBarGraph(global__st_globalDaysInAYear:number,efficientFixturesFaucet__q_effDailyPreSdPlus,efficientFixturesFaucet__q_effDaily){const effDailyPreSdPlus = efficientFixturesFaucet__q_effDailyPreSdPlus;
  const effDaily = efficientFixturesFaucet__q_effDaily;
  const effAnnualWater =
    (effDailyPreSdPlus - effDaily) * global__st_globalDaysInAYear;

  const title = 'Efficient Fixtures water usage by category';
  const totalSavings = effAnnualWater;

  const seriesName1 = 'Domestic';
  const seriesValue1 = effAnnualWater;
  const seriesName2 = 'Health Faucet';
  const seriesValue2 = 0;
  const seriesName3 = 'Flushing';
  const seriesValue3 = 0;
  const seriesName4 = 'Common Area';
  const seriesValue4 = 0;
  const seriesName5 = 'Drinking';
  const seriesValue5 = 0;

  return {
    title,
    totalSavings,
    series: [
      {
        name: seriesName1,
        value: seriesValue1,
      },
      {
        name: seriesName2,
        value: seriesValue2,
      },
      {
        name: seriesName3,
        value: seriesValue3,
      },
      {
        name: seriesName4,
        value: seriesValue4,
      },
      {
        name: seriesName5,
        value: seriesValue5,
      },
    ],
  };}
export  function efficientFixturesFaucet__q_overviewDonutGraph(efficientFixturesFaucet__pi_studio:number,efficientFixturesFaucet__pi_oneBHK:number,efficientFixturesFaucet__pi_twoBHK:number,efficientFixturesFaucet__pi_threeBHK:number,efficientFixturesFaucet__pi_includeClubHouse:string,efficientFixturesFaucet__pi_projectLandscapeArea:number,efficientFixturesFaucet__pi_projectNoOfCarParks:number,efficientFixturesFaucet__pi_projectAreaOfLobbiesAndCorridors:number,efficientFixturesFaucet__pi_projectSwimmingPoolSurfaceArea:number,efficientFixturesFaucet__pi_projectCategory:string,efficientFixturesFaucet__st_studioRefOccupancy:number,efficientFixturesFaucet__st_oneBHKRefOccupancy:number,efficientFixturesFaucet__st_twoBHKRefOccupancy:number,efficientFixturesFaucet__st_threeBHKRefOccupancy:number,efficientFixturesFaucet__st_projectHousekeepingRefOccupancy:number,efficientFixturesFaucet__st_clubHouseRefOccupancy:number,efficientFixturesFaucet__st_waterDailyLandscapeWaterUse:number,efficientFixturesFaucet__st_waterDailyCarWashWaterUse:number,efficientFixturesFaucet__st_waterDailyLobbiesAndCorridorsWaterUse:number,efficientFixturesFaucet__st_waterSwimmingPoolDepth:number,efficientFixturesFaucet__st_waterWaterPerCubicMeter:number,efficientFixturesFaucet__st_waterSwimmingPoolEvaporationRate:number,global__st_globalDaysInAYear:number,global__st_globalLToKlConverter:number,efficientFixturesFaucet__st_waterDomesticHealthFaucetDaily:number,efficientFixturesFaucet__st_waterDomesticHealthFaucetDuration:number,efficientFixturesFaucet__st_waterDomesticHealthFaucetFlow:number,efficientFixturesFaucet__st_waterDomesticFaucetDaily:number,efficientFixturesFaucet__st_waterDomesticFaucetDuration:number,efficientFixturesFaucet__st_waterDomesticFaucetFlow:number,efficientFixturesFaucet__st_waterDomesticKitchenSinkDaily:number,efficientFixturesFaucet__st_waterDomesticKitchenSinkDuration:number,efficientFixturesFaucet__st_waterDomesticKitchenSinkFlow:number,efficientFixturesFaucet__st_waterDomesticShowerDaily:number,efficientFixturesFaucet__st_waterDomesticShowerDuration:number,efficientFixturesFaucet__st_waterDomesticShowerFlow:number,efficientFixturesFaucet__st_waterDomesticWashClothesDaily:number,efficientFixturesFaucet__st_waterDomesticWashClothesDuration:number,efficientFixturesFaucet__st_waterDomesticWashClothesFlow:number,efficientFixturesFaucet__st_waterDomesticWashUtensilsDaily:number,efficientFixturesFaucet__st_waterDomesticWashUtensilsDuration:number,efficientFixturesFaucet__st_waterDomesticWashUtensilsFlow:number,efficientFixturesFaucet__st_waterClubHouseDomesticHealthFaucetDaily:number,efficientFixturesFaucet__st_waterClubHouseDomesticHealthFaucetDuration:number,efficientFixturesFaucet__st_waterClubHouseDomesticFaucetDaily:number,efficientFixturesFaucet__st_waterClubHouseDomesticFaucetDuration:number,efficientFixturesFaucet__st_waterClubHouseDomesticShowerDaily:number,efficientFixturesFaucet__st_waterClubHouseDomesticShowerDuration:number,efficientFixturesFaucet__q_effDailyPreSdPlus,efficientFixturesFaucet__q_effDaily,water__q_currentWaterTable,efficientFixturesFaucet__q_occupancyTotalOccupancyVilla,efficientFixturesFaucet__q_occupancyClubhouseOccupancyVilla,efficientFixturesFaucet__q_occupancyTotalOccupancyApartment,efficientFixturesFaucet__q_occupancyClubhouseOccupancyApartment){const effDailyPreSdPlus = efficientFixturesFaucet__q_effDailyPreSdPlus;
  const effDaily = efficientFixturesFaucet__q_effDaily;
  const effAnnualWater =
    (effDailyPreSdPlus - effDaily) * global__st_globalDaysInAYear;

  // Annual Baseline Water Consumption Starts
  const occupancy = utilities.utility_efHfOccupancy(
    efficientFixturesFaucet__pi_studio,
    efficientFixturesFaucet__st_studioRefOccupancy,
    efficientFixturesFaucet__pi_oneBHK,
    efficientFixturesFaucet__st_oneBHKRefOccupancy,
    efficientFixturesFaucet__pi_twoBHK,
    efficientFixturesFaucet__st_twoBHKRefOccupancy,
    efficientFixturesFaucet__pi_threeBHK,
    efficientFixturesFaucet__st_threeBHKRefOccupancy
  );

  const totalOccupancy = utilities.utility_efHfTotalOccupancy(
    efficientFixturesFaucet__pi_studio,
    efficientFixturesFaucet__st_studioRefOccupancy,
    efficientFixturesFaucet__pi_oneBHK,
    efficientFixturesFaucet__st_oneBHKRefOccupancy,
    efficientFixturesFaucet__pi_twoBHK,
    efficientFixturesFaucet__st_twoBHKRefOccupancy,
    efficientFixturesFaucet__pi_threeBHK,
    efficientFixturesFaucet__st_threeBHKRefOccupancy,
    efficientFixturesFaucet__st_projectHousekeepingRefOccupancy
  );

  const currentWaterTable = water__q_currentWaterTable;
  const residentialLPCD = currentWaterTable.clientBaseCase.residentialDrinking;
  const clubHouseLPCD = currentWaterTable.clientBaseCase.clubhouseDrinking;

  let chRefOcc = 0;
  if (efficientFixturesFaucet__pi_includeClubHouse === 'Yes') {
    chRefOcc = efficientFixturesFaucet__st_clubHouseRefOccupancy;
  }

  const clubHouseOccupancy = occupancy * chRefOcc;

  const waterCommonAreaLandscape =
    efficientFixturesFaucet__pi_projectLandscapeArea *
    efficientFixturesFaucet__st_waterDailyLandscapeWaterUse;

  const waterCommonAreaCarPark =
    efficientFixturesFaucet__pi_projectNoOfCarParks *
    efficientFixturesFaucet__st_waterDailyCarWashWaterUse;

  const waterCommonAreaCleaning =
    efficientFixturesFaucet__pi_projectAreaOfLobbiesAndCorridors *
    efficientFixturesFaucet__st_waterDailyLobbiesAndCorridorsWaterUse;

  const waterSwimmingPool =
    efficientFixturesFaucet__pi_projectSwimmingPoolSurfaceArea *
    efficientFixturesFaucet__st_waterSwimmingPoolDepth *
    efficientFixturesFaucet__st_waterWaterPerCubicMeter *
    efficientFixturesFaucet__st_waterSwimmingPoolEvaporationRate;

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
  const donut1Value = (effAnnualWater * 100) / annualBaselineWaterConsumption;

  const donut2Title = 'Savings as % of Domestic Water consumption';

  let efTotalOccupancy = 0;
  let efClubHouseOccupancy = 0;

  if (efficientFixturesFaucet__pi_projectCategory === 'Villa') {
    efTotalOccupancy = efficientFixturesFaucet__q_occupancyTotalOccupancyVilla;

    efClubHouseOccupancy =
      efficientFixturesFaucet__q_occupancyClubhouseOccupancyVilla;
  } else {
    efTotalOccupancy =
      efficientFixturesFaucet__q_occupancyTotalOccupancyApartment;

    efClubHouseOccupancy =
      efficientFixturesFaucet__q_occupancyClubhouseOccupancyApartment;
  }

  const waterDomesticHealthFaucet =
    efficientFixturesFaucet__st_waterDomesticHealthFaucetDaily *
    efficientFixturesFaucet__st_waterDomesticHealthFaucetDuration *
    efficientFixturesFaucet__st_waterDomesticHealthFaucetFlow;

  const waterDomesticFaucet =
    efficientFixturesFaucet__st_waterDomesticFaucetDaily *
    efficientFixturesFaucet__st_waterDomesticFaucetDuration *
    efficientFixturesFaucet__st_waterDomesticFaucetFlow;

  const waterDomesticKitchenSink =
    efficientFixturesFaucet__st_waterDomesticKitchenSinkDaily *
    efficientFixturesFaucet__st_waterDomesticKitchenSinkDuration *
    efficientFixturesFaucet__st_waterDomesticKitchenSinkFlow;

  const waterDomesticShower =
    efficientFixturesFaucet__st_waterDomesticShowerDaily *
    efficientFixturesFaucet__st_waterDomesticShowerDuration *
    efficientFixturesFaucet__st_waterDomesticShowerFlow;

  const waterDomesticWashClothes =
    efficientFixturesFaucet__st_waterDomesticWashClothesDaily *
    efficientFixturesFaucet__st_waterDomesticWashClothesDuration *
    efficientFixturesFaucet__st_waterDomesticWashClothesFlow;

  const waterDomesticWashUtensils =
    efficientFixturesFaucet__st_waterDomesticWashUtensilsDaily *
    efficientFixturesFaucet__st_waterDomesticWashUtensilsDuration *
    efficientFixturesFaucet__st_waterDomesticWashUtensilsFlow;

  const waterResidentialDomestic =
    waterDomesticHealthFaucet +
    waterDomesticFaucet +
    waterDomesticKitchenSink +
    waterDomesticShower +
    waterDomesticWashClothes +
    waterDomesticWashUtensils;

  const waterClubHouseDomesticHealthFaucet =
    efficientFixturesFaucet__st_waterClubHouseDomesticHealthFaucetDaily *
    efficientFixturesFaucet__st_waterClubHouseDomesticHealthFaucetDuration *
    efficientFixturesFaucet__st_waterDomesticHealthFaucetFlow;

  const waterClubHouseDomesticFaucet =
    efficientFixturesFaucet__st_waterClubHouseDomesticFaucetDaily *
    efficientFixturesFaucet__st_waterClubHouseDomesticFaucetDuration *
    efficientFixturesFaucet__st_waterDomesticFaucetFlow;

  const waterClubHouseDomesticShower =
    efficientFixturesFaucet__st_waterClubHouseDomesticShowerDaily *
    efficientFixturesFaucet__st_waterClubHouseDomesticShowerDuration *
    efficientFixturesFaucet__st_waterDomesticShowerFlow;

  const waterClubHouseDomestic =
    waterClubHouseDomesticHealthFaucet +
    waterClubHouseDomesticFaucet +
    waterClubHouseDomesticShower;

  const efDomesticDaily =
    (waterResidentialDomestic * efTotalOccupancy +
      waterClubHouseDomestic * efClubHouseOccupancy) /
    global__st_globalLToKlConverter;
  const effFlowDiagramDomestic = effAnnualWater / global__st_globalDaysInAYear;

  const donut2Value = (effFlowDiagramDomestic * 100) / efDomesticDaily;

  return {
    donut1Title,
    donut1Value,
    donut2Title,
    donut2Value,
  };}
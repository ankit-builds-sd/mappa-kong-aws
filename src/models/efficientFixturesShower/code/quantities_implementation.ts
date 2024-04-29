import { irr } from 'node-irr'; import { HwmDemandAssumptionBase, HwmDemandAssumptionVilla, HwmDemandAssumptionPenthouse, DemandAssumptionApartment, HwmDemandByBath, HwmOption, HeatPumpType, SwhType, SwhVariant, HpType, HwmHpHeatingSpeed, SdPlusInterventions, CurrentWaterTableRow, CurrentWaterTable, CurrentWaterTableInputsRow, CurrentWaterTableInputs, WaterPreSdPlusRow, WaterPreSdPlus, PlumbingDetailsPreSdPlus, EFCalculator, StpCalculator, PreSDPlusDemand, OutcomesPreSdPlus } from '../../../utilities/types'; import * as utilities from '../../../utilities/utility'; import { CityDbData, SDPlusDefaultsStore } from '../../../utilities/stores';export  function efficientFixturesShower__q_outcomes(efficientFixturesShower__pi_city:string,global__st_globalDaysInAYear:number,efficientFixturesShower__q_efsDailyPreSdPlus,efficientFixturesShower__q_efsDaily,efficientFixturesShower__q_efsCapexPostSdPlus,efficientFixturesShower__q_efsResidentialFaucetCapexPreSdPlus,efficientFixturesShower__q_efsClubHouseFaucetCapexPreSdPlus){const efsDailyPreSdPlus = efficientFixturesShower__q_efsDailyPreSdPlus;

  const efsDaily = efficientFixturesShower__q_efsDaily;

  const efsAnnualWater =
    (efsDailyPreSdPlus - efsDaily) * global__st_globalDaysInAYear;

  const efsCapexPostSdPlus = efficientFixturesShower__q_efsCapexPostSdPlus;

  const efsCapexPreSdPlus =
    efficientFixturesShower__q_efsResidentialFaucetCapexPreSdPlus +
    efficientFixturesShower__q_efsClubHouseFaucetCapexPreSdPlus;

  const efsCapex = efsCapexPostSdPlus - efsCapexPreSdPlus;

  const efsOpex = utilities.utility_waterOpex(
    efficientFixturesShower__pi_city,
    efsAnnualWater
  );

  return {
    efsDailyPreSdPlus,
    efsDaily,
    efsAnnualWater,
    efsCapex,
    efsOpex,
  };}
export  function efficientFixturesShower__q_efsDailyPreSdPlus(efficientFixturesShower__pi_projectCategory:string,efficientFixturesShower__st_waterDomesticShowerDaily:number,efficientFixturesShower__st_waterDomesticShowerDuration:number,efficientFixturesShower__st_waterDomesticShowerFlowPreSdPlus:number,global__st_globalLToKlConverter:number,efficientFixturesShower__st_waterClubHouseDomesticShowerDaily:number,efficientFixturesShower__st_waterClubHouseDomesticShowerDuration:number,efficientFixturesShower__st_waterDomesticShowerFlowPreSDPlus:number,efficientFixturesShower__q_occupancyTotalOccupancyVilla,efficientFixturesShower__q_occupancyClubhouseOccupancyVilla,efficientFixturesShower__q_occupancyTotalOccupancyApartment,efficientFixturesShower__q_occupancyClubhouseOccupancyApartment){const waterDomesticShowerPreSdPlus =
    efficientFixturesShower__st_waterDomesticShowerDaily *
    efficientFixturesShower__st_waterDomesticShowerDuration *
    efficientFixturesShower__st_waterDomesticShowerFlowPreSdPlus;

  // EF Occupancy Calc Starts
  let efTotalOccupancy = 0;
  let efClubHouseOccupancy = 0;

  if (efficientFixturesShower__pi_projectCategory === 'Villa') {
    efTotalOccupancy = efficientFixturesShower__q_occupancyTotalOccupancyVilla;

    efClubHouseOccupancy =
      efficientFixturesShower__q_occupancyClubhouseOccupancyVilla;
  } else {
    efTotalOccupancy =
      efficientFixturesShower__q_occupancyTotalOccupancyApartment;

    efClubHouseOccupancy =
      efficientFixturesShower__q_occupancyClubhouseOccupancyApartment;
  }

  // EF Occupancy Calc Ends
  const waterClubHouseDomesticShowerPreSDPlus =
    efficientFixturesShower__st_waterClubHouseDomesticShowerDaily *
    efficientFixturesShower__st_waterClubHouseDomesticShowerDuration *
    efficientFixturesShower__st_waterDomesticShowerFlowPreSDPlus;

  const efsDailyPreSdPlus =
    (waterDomesticShowerPreSdPlus * efTotalOccupancy +
      waterClubHouseDomesticShowerPreSDPlus * efClubHouseOccupancy) /
    global__st_globalLToKlConverter;

  return efsDailyPreSdPlus;
}

export function efficientFixturesShower__q_efsDaily(
  efficientFixturesShower__st_waterDomesticFaucetDaily: number,
  efficientFixturesShower__st_waterDomesticFaucetDuration: number,
  efficientFixturesShower__st_waterClubHouseDomesticFaucetDaily: number,
  efficientFixturesShower__st_waterClubHouseDomesticFaucetDuration: number,
  efficientFixturesShower__pi_projectCategory: string,
  efficientFixturesShower__st_waterDomesticFaucetFlow: number,
  global__st_globalLToKlConverter: number,

  efficientFixturesShower__q_occupancyTotalOccupancyVilla,
  efficientFixturesShower__q_occupancyClubhouseOccupancyVilla,
  efficientFixturesShower__q_occupancyTotalOccupancyApartment,
  efficientFixturesShower__q_occupancyClubhouseOccupancyApartment
) {
  const waterDomesticFaucet =
    efficientFixturesShower__st_waterDomesticFaucetDaily *
    efficientFixturesShower__st_waterDomesticFaucetDuration *
    efficientFixturesShower__st_waterDomesticFaucetFlow;

  const waterClubHouseDomesticFaucet =
    efficientFixturesShower__st_waterClubHouseDomesticFaucetDaily *
    efficientFixturesShower__st_waterClubHouseDomesticFaucetDuration *
    efficientFixturesShower__st_waterDomesticFaucetFlow;

  // EF Occupancy Calc Starts
  let efTotalOccupancy = 0;
  let efClubHouseOccupancy = 0;

  if (efficientFixturesShower__pi_projectCategory === 'Villa') {
    efTotalOccupancy = efficientFixturesShower__q_occupancyTotalOccupancyVilla;
    efClubHouseOccupancy =
      efficientFixturesShower__q_occupancyClubhouseOccupancyVilla;
  } else {
    efTotalOccupancy =
      efficientFixturesShower__q_occupancyTotalOccupancyApartment;
    efClubHouseOccupancy =
      efficientFixturesShower__q_occupancyClubhouseOccupancyApartment;
  }

  // EF Occupancy Calc Ends

  const efsDaily =
    waterDomesticFaucet * efTotalOccupancy +
    (waterClubHouseDomesticFaucet * efClubHouseOccupancy) /
      global__st_globalLToKlConverter;

  return efsDaily;
}

export function efficientFixturesShower__q_efsCapexPostSdPlus(
  efficientFixturesShower__pi_projectStudio: number,
  efficientFixturesShower__pi_project1Bhk: number,
  efficientFixturesShower__pi_project2Bhk: number,
  efficientFixturesShower__pi_project3Bhk: number,
  efficientFixturesShower__pi_project4Bhk: number,

  efficientFixturesShower__st_effStudioDomesticFaucet: number,
  efficientFixturesShower__st_eff1BhkDomesticFaucet: number,
  efficientFixturesShower__st_eff2BhkDomesticFaucet: number,
  efficientFixturesShower__st_eff3BhkDomesticFaucet: number,
  efficientFixturesShower__st_eff4BhkDomesticFaucet: number,
  efficientFixturesShower__pi_includeClubHouse: string,
  efficientFixturesShower__st_effClubHouseDomesticFaucet: number,

  efficientFixturesShower__q_efsResidentialFaucetCapexPreSdPlus
) {
  const product = utilities.utility_efHealthFaucetProductResolver();

  let waterDomesticFaucetPrice = 0;
  if (product.length) {
    waterDomesticFaucetPrice = utilities.utility_numberFromString(
      product.price
    );
  }

  const effResidentialFaucetCapexPostSdPlus =
    (efficientFixturesShower__pi_projectStudio *
      efficientFixturesShower__st_effStudioDomesticFaucet +
      efficientFixturesShower__pi_project1Bhk *
        efficientFixturesShower__st_eff1BhkDomesticFaucet +
      efficientFixturesShower__pi_project2Bhk *
        efficientFixturesShower__st_eff2BhkDomesticFaucet +
      efficientFixturesShower__pi_project3Bhk *
        efficientFixturesShower__st_eff3BhkDomesticFaucet +
      efficientFixturesShower__pi_project4Bhk *
        efficientFixturesShower__st_eff4BhkDomesticFaucet) *
    waterDomesticFaucetPrice;

  let projectClubHouse = 0;
  if (efficientFixturesShower__pi_includeClubHouse === 'Yes') {
    projectClubHouse = 1;
  }

  const effClubHouseFaucetCapexPostSdPlus =
    projectClubHouse *
    efficientFixturesShower__st_effClubHouseDomesticFaucet *
    waterDomesticFaucetPrice;

  let effCapexPostSdPlus;
  if (product.aeratorType == 'Built-in Aerator') {
    effCapexPostSdPlus =
      effResidentialFaucetCapexPostSdPlus +
      effClubHouseFaucetCapexPostSdPlus +
      efficientFixturesShower__q_efsResidentialFaucetCapexPreSdPlus;
  } else {
    effCapexPostSdPlus =
      effResidentialFaucetCapexPostSdPlus + effClubHouseFaucetCapexPostSdPlus;
  }

  return (
    effResidentialFaucetCapexPostSdPlus + effClubHouseFaucetCapexPostSdPlus
  );
}

export function efficientFixturesShower__q_efsResidentialFaucetCapexPreSdPlus(
  efficientFixturesShower__pi_projectStudio: number,
  efficientFixturesShower__pi_project1Bhk: number,
  efficientFixturesShower__pi_project2Bhk: number,
  efficientFixturesShower__pi_project3Bhk: number,
  efficientFixturesShower__pi_project4Bhk: number,

  efficientFixturesShower__st_effStudioDomesticFaucet: number,
  efficientFixturesShower__st_eff1BhkDomesticFaucet: number,
  efficientFixturesShower__st_eff2BhkDomesticFaucet: number,
  efficientFixturesShower__st_eff3BhkDomesticFaucet: number,
  efficientFixturesShower__st_eff4BhkDomesticFaucet: number,
  efficientFixturesShower__st_waterNbcBaseCaseFaucetPrice: number
) {
  const waterDomesticFaucetPricePreSdPlus =
    efficientFixturesShower__st_waterNbcBaseCaseFaucetPrice;

  const efsResidentialFaucetCapexPreSdPlus =
    (efficientFixturesShower__pi_projectStudio *
      efficientFixturesShower__st_effStudioDomesticFaucet +
      efficientFixturesShower__pi_project1Bhk *
        efficientFixturesShower__st_eff1BhkDomesticFaucet +
      efficientFixturesShower__pi_project2Bhk *
        efficientFixturesShower__st_eff2BhkDomesticFaucet +
      efficientFixturesShower__pi_project3Bhk *
        efficientFixturesShower__st_eff3BhkDomesticFaucet +
      efficientFixturesShower__pi_project4Bhk *
        efficientFixturesShower__st_eff4BhkDomesticFaucet) *
    waterDomesticFaucetPricePreSdPlus;

  return efsResidentialFaucetCapexPreSdPlus;
}

export function efficientFixturesShower__q_efsClubHouseFaucetCapexPreSdPlus(
  efficientFixturesShower__pi_includeClubHouse: string,
  efficientFixturesShower__st_waterNbcBaseCaseFaucetPrice: number,
  efficientFixturesShower__st_effClubHouseDomesticFaucet: number
) {
  const waterDomesticFaucetPricePreSdPlus =
    efficientFixturesShower__st_waterNbcBaseCaseFaucetPrice;

  let projectClubHouse = 0;
  if (efficientFixturesShower__pi_includeClubHouse === 'Yes') {
    projectClubHouse = 1;
  }

  return (
    projectClubHouse *
    efficientFixturesShower__st_effClubHouseDomesticFaucet *
    waterDomesticFaucetPricePreSdPlus
  );
}

export function efficientFixturesShower__q_igbcOccupanyVilla(
  efficientFixturesShower__st_igbc1BhkRefOccupancy: number,
  efficientFixturesShower__st_igbc2BhkRefOccupancy: number,
  efficientFixturesShower__st_igbc3BhkRefOccupancy: number,
  efficientFixturesShower__st_igbc4BhkRefOccupancy: number,

  efficientFixturesShower__pi_projectVilla1Bhk: number,
  efficientFixturesShower__pi_projectVilla2Bhk: number,
  efficientFixturesShower__pi_projectVilla3Bhk: number,
  efficientFixturesShower__pi_projectVilla4Bhk: number
) {
  return (
    efficientFixturesShower__pi_projectVilla1Bhk *
      efficientFixturesShower__st_igbc1BhkRefOccupancy +
    efficientFixturesShower__pi_projectVilla2Bhk *
      efficientFixturesShower__st_igbc2BhkRefOccupancy +
    efficientFixturesShower__pi_projectVilla3Bhk *
      efficientFixturesShower__st_igbc3BhkRefOccupancy +
    efficientFixturesShower__pi_projectVilla4Bhk *
      efficientFixturesShower__st_igbc4BhkRefOccupancy
  );
}

export function efficientFixturesShower__q_occupancyTotalOccupancyVilla(
  efficientFixturesShower__st_projectHousekeepingRefOccupancy: number,

  occupancy__q_occupancyVilla
) {
  const totalOccupancyVilla =
    occupancy__q_occupancyVilla *
    (1 + efficientFixturesShower__st_projectHousekeepingRefOccupancy);

  return totalOccupancyVilla;}
export  function efficientFixturesShower__q_igbcOccupanyApartment(efficientFixturesShower__pi_projectStudio:number,efficientFixturesShower__pi_project1Bhk:number,efficientFixturesShower__pi_project2Bhk:number,efficientFixturesShower__pi_project3Bhk:number,efficientFixturesShower__pi_project4Bhk:number,efficientFixturesShower__st_igbcStudioRefOccupancy:number,efficientFixturesShower__st_igbc1BhkRefOccupancy:number,efficientFixturesShower__st_igbc2BhkRefOccupancy:number,efficientFixturesShower__st_igbc3BhkRefOccupancy:number,efficientFixturesShower__st_igbc4BhkRefOccupancy:number){return (
efficientFixturesShower__pi_projectStudio +
efficientFixturesShower__st_igbcStudioRefOccupancy +
(efficientFixturesShower__pi_project1Bhk +
  efficientFixturesShower__st_igbc1BhkRefOccupancy) +
(efficientFixturesShower__pi_project2Bhk +
  efficientFixturesShower__st_igbc2BhkRefOccupancy) +
(efficientFixturesShower__pi_project3Bhk +
  efficientFixturesShower__st_igbc3BhkRefOccupancy) +
(efficientFixturesShower__pi_project4Bhk +
  efficientFixturesShower__st_igbc4BhkRefOccupancy)
);}
export  function efficientFixturesShower__q_occupancyTotalOccupancyApartment(efficientFixturesShower__pi_projectStudio:number,efficientFixturesShower__pi_project1Bhk:number,efficientFixturesShower__pi_project2Bhk:number,efficientFixturesShower__pi_project3Bhk:number,efficientFixturesShower__pi_project4Bhk:number,occupancy__pi_penthouseStudio:number,occupancy__pi_penthouseOneBHK:number,occupancy__pi_penthouseTwoBHK:number,occupancy__pi_penthouseThreeBHK:number,occupancy__pi_penthouseFourBHK:number,efficientFixturesShower__st_projectStudioRefOccupancy:number,efficientFixturesShower__st_project1BhkRefOccupancy:number,efficientFixturesShower__st_project2BhkRefOccupancy:number,efficientFixturesShower__st_project3BhkRefOccupancy:number,efficientFixturesShower__st_project4BhkRefOccupancy:number,efficientFixturesShower__st_projectHousekeepingRefOccupancy:number,occupancy__st_studioRefOccupancy:number,occupancy__st_penthouseOneBHKRefOccupancy:number,occupancy__st_penthouseTwoBHKRefOccupancy:number,occupancy__st_penthouseThreeBHKRefOccupancy:number,occupancy__st_penthouseFourBHKRefOccupancy:number,occupancy__q_occupancyApartment,occupancy__q_occupancyPenthouse){const totalOccupancyApartment =
    (occupancy__q_occupancyApartment + occupancy__q_occupancyPenthouse) *
    (1 + efficientFixturesShower__st_projectHousekeepingRefOccupancy);

  return totalOccupancyApartment;}
export  function efficientFixturesShower__q_occupancyClubhouseOccupancyApartment(occupancy__pi_studio:number,occupancy__pi_oneBHK:number,occupancy__pi_twoBHK:number,occupancy__pi_threeBHK:number,occupancy__pi_fourBHK:number,occupancy__pi_penthouseStudio:number,occupancy__pi_penthouseOneBHK:number,occupancy__pi_penthouseTwoBHK:number,occupancy__pi_penthouseThreeBHK:number,occupancy__pi_penthouseFourBHK:number,efficientFixturesShower__pi_includeClubHouse:string,occupancy__st_studioRefOccupancy:number,occupancy__st_oneBHKRefOccupancy:number,occupancy__st_twoBHKRefOccupancy:number,occupancy__st_threeBHKRefOccupancy:number,occupancy__st_fourBHKRefOccupancy:number,occupancy__st_penthouseOneBHKRefOccupancy:number,occupancy__st_penthouseTwoBHKRefOccupancy:number,occupancy__st_penthouseThreeBHKRefOccupancy:number,occupancy__st_penthouseFourBHKRefOccupancy:number,efficientFixturesShower__st_clubHouseRefOccupancy:number,occupancy__q_occupancyApartment,occupancy__q_occupancyPenthouse){let clubHouseRefOccupancy = 0.1;
  if (efficientFixturesShower__pi_includeClubHouse === 'Yes') {
    clubHouseRefOccupancy = efficientFixturesShower__st_clubHouseRefOccupancy;
  }

  const clubHouseOccupancyApartment =
    (occupancy__q_occupancyApartment + occupancy__q_occupancyPenthouse) *
    clubHouseRefOccupancy;

  return clubHouseOccupancyApartment;}
export  function efficientFixturesShower__q_igbcOccupanyPenthouse(efficientFixturesShower__pi_projectPhStudio:number,efficientFixturesShower__pi_projectPh1Bhk:number,efficientFixturesShower__pi_projectPh2Bhk:number,efficientFixturesShower__pi_projectPh3Bhk:number,efficientFixturesShower__pi_projectPh4Bhk:number,efficientFixturesShower__st_igbcStudioRefOccupancy:number,efficientFixturesShower__st_igbc1BhkRefOccupancy:number,efficientFixturesShower__st_igbc2BhkRefOccupancy:number,efficientFixturesShower__st_igbc3BhkRefOccupancy:number,efficientFixturesShower__st_igbc4BhkRefOccupancy:number){return (
efficientFixturesShower__pi_projectPhStudio *
  efficientFixturesShower__st_igbcStudioRefOccupancy +
efficientFixturesShower__pi_projectPh1Bhk *
  efficientFixturesShower__st_igbc1BhkRefOccupancy +
efficientFixturesShower__pi_projectPh2Bhk *
  efficientFixturesShower__st_igbc2BhkRefOccupancy +
efficientFixturesShower__pi_projectPh3Bhk *
  efficientFixturesShower__st_igbc3BhkRefOccupancy +
efficientFixturesShower__pi_projectPh4Bhk *
  efficientFixturesShower__st_igbc4BhkRefOccupancy
);}
export  function efficientFixturesShower__q_occupancyClubhouseOccupancyVilla(efficientFixturesShower__pi_includeClubHouse:string,efficientFixturesShower__st_clubHouseRefOccupancy:number,occupancy__q_occupancyVilla){let clubHouseRefOccupancy = 0.1;
  if (efficientFixturesShower__pi_includeClubHouse === 'Yes') {
    clubHouseRefOccupancy = efficientFixturesShower__st_clubHouseRefOccupancy;
  }

  const clubHouseOccupancyVilla =
    occupancy__q_occupancyVilla * clubHouseRefOccupancy;

  return clubHouseOccupancyVilla;}
export  function efficientFixturesShower__q_igbcOutcomes(efficientFixturesShower__pi_projectCategory:string,efficientFixturesShower__pi_city:string,efficientFixturesShower__st_igbcDomesticShowerDaily:number,efficientFixturesShower__st_igbcDomesticShowerDuration:number,efficientFixturesShower__st_igbcDomesticShowerFlowPreSDPlus:number,efficientFixturesShower__st_waterDomesticShowerDaily:number,efficientFixturesShower__st_waterDomesticShowerDuration:number,global__st_globalDaysInAYear:number,global__st_globalLToKlConverter:number,efficientFixturesShower__q_igbcOccupanyVilla,efficientFixturesShower__q_igbcOccupanyApartment,efficientFixturesShower__q_igbcOccupanyPenthouse){const igbcDomesticShowerPreSDPlus =
    efficientFixturesShower__st_igbcDomesticShowerDaily *
    efficientFixturesShower__st_igbcDomesticShowerDuration *
    efficientFixturesShower__st_igbcDomesticShowerFlowPreSDPlus;

  // EF Occupancy Calc Starts
  let efIgbcOccupancy = 0;

  if (efficientFixturesShower__pi_projectCategory === 'Villa') {
    efIgbcOccupancy = efficientFixturesShower__q_igbcOccupanyVilla;
  } else {
    efIgbcOccupancy =
      efficientFixturesShower__q_igbcOccupanyApartment +
      efficientFixturesShower__q_igbcOccupanyPenthouse;
  }
  // EF Occupancy Calc Ends

  // Actual Calc
  const efsIgbcDailyPreSdPlus =
    (igbcDomesticShowerPreSDPlus * efIgbcOccupancy) /
    global__st_globalLToKlConverter;

  const product = utilities.utility_efHealthFaucetProductResolver();

  const waterDomesticShower =
    product.Flowrate *
    efficientFixturesShower__st_waterDomesticShowerDaily *
    efficientFixturesShower__st_waterDomesticShowerDuration;

  const efsIgbcDaily =
    (waterDomesticShower * efIgbcOccupancy) / global__st_globalLToKlConverter;

  const efsIgbcDailySavings = efsIgbcDailyPreSdPlus - efsIgbcDaily;

  const efsIgbcAnnualWater = efsIgbcDailySavings * global__st_globalDaysInAYear;
  const efsIgBcOpex = utilities.utility_waterOpex(
    efficientFixturesShower__pi_city,
    efsIgbcAnnualWater
  );

  return {
    efsIgbcDailyPreSdPlus,
    efsIgbcDaily,
    efsIgbcDailySavings,
    efsIgbcAnnualWater,
    efsIgBcOpex,
  };}
export  function efficientFixturesShower__q_outcomesPreSdPlus(efficientFixturesShower__st_globalDaysInAYear:number,efficientFixturesShower__q_efsDailyPreSdPlus){return (
efficientFixturesShower__q_efsDailyPreSdPlus *
efficientFixturesShower__st_globalDaysInAYear
);}
export  function efficientFixturesShower__q_projectLevelInsights(efficientFixturesShower__pi_city:string,efficientFixturesShower__pi_studio:number,efficientFixturesShower__pi_oneBHK:number,efficientFixturesShower__pi_twoBHK:number,efficientFixturesShower__pi_threeBHK:number,efficientFixturesShower__pi_includeClubHouse:string,efficientFixturesShower__pi_projectLandscapeArea:number,efficientFixturesShower__pi_projectNoOfCarParks:number,efficientFixturesShower__pi_projectSwimmingPoolSurfaceArea:number,efficientFixturesShower__pi_projectAreaOfLobbiesAndCorridors:number,efficientFixturesShower__st_globalKg2tonConv:number,efficientFixturesShower__st_efSdgNumberForEf:number,efficientFixturesShower__st_globalTreesPerTonCf:number,efficientFixturesShower__st_projectHousekeepingRefOccupancy:number,efficientFixturesShower__st_studioRefOccupancy:number,efficientFixturesShower__st_oneBHKRefOccupancy:number,efficientFixturesShower__st_twoBHKRefOccupancy:number,efficientFixturesShower__st_threeBHKRefOccupancy:number,efficientFixturesShower__st_clubHouseRefOccupancy:number,efficientFixturesShower__st_waterDailyLandscapeWaterUse:number,efficientFixturesShower__st_waterDailyCarWashWaterUse:number,efficientFixturesShower__st_waterSwimmingPoolDepth:number,efficientFixturesShower__st_waterWaterPerCubicMeter:number,efficientFixturesShower__st_waterSwimmingPoolEvaporationRate:number,efficientFixturesShower__st_waterDailyLobbiesAndCorridorsWaterUse:number,global__st_globalDaysInAYear:number,global__st_globalLToKlConverter:number,efficientFixturesShower__q_efsDailyPreSdPlus,efficientFixturesShower__q_efsDaily,water__q_currentWaterTable){const efsDailyPreSdPlus = efficientFixturesShower__q_efsDailyPreSdPlus;
  const efsDaily = efficientFixturesShower__q_efsDaily;
  const efsAnnualWater =
    (efsDailyPreSdPlus - efsDaily) * global__st_globalDaysInAYear;

  let cityEmissionFactor: number;
  if (efficientFixturesShower__pi_city === 'Bangalore') {
    cityEmissionFactor = 0.6;
  } else if (efficientFixturesShower__pi_city === 'Bombay') {
    cityEmissionFactor = 0.89;
  }

  const occupancy = utilities.utility_efHfOccupancy(
    efficientFixturesShower__pi_studio,
    efficientFixturesShower__st_studioRefOccupancy,
    efficientFixturesShower__pi_oneBHK,
    efficientFixturesShower__st_oneBHKRefOccupancy,
    efficientFixturesShower__pi_twoBHK,
    efficientFixturesShower__st_twoBHKRefOccupancy,
    efficientFixturesShower__pi_threeBHK,
    efficientFixturesShower__st_threeBHKRefOccupancy
  );

  const totalOccupancy = utilities.utility_efHfTotalOccupancy(
    efficientFixturesShower__pi_studio,
    efficientFixturesShower__st_studioRefOccupancy,
    efficientFixturesShower__pi_oneBHK,
    efficientFixturesShower__st_oneBHKRefOccupancy,
    efficientFixturesShower__pi_twoBHK,
    efficientFixturesShower__st_twoBHKRefOccupancy,
    efficientFixturesShower__pi_threeBHK,
    efficientFixturesShower__st_threeBHKRefOccupancy,
    efficientFixturesShower__st_projectHousekeepingRefOccupancy
  );

  const currentWaterTable = water__q_currentWaterTable;
  const residentialLPCD = currentWaterTable.clientBaseCase.residentialDrinking;
  const clubHouseLPCD = currentWaterTable.clientBaseCase.clubhouseDrinking;

  let chRefOcc = 0;
  if (efficientFixturesShower__pi_includeClubHouse === 'Yes') {
    chRefOcc = efficientFixturesShower__st_clubHouseRefOccupancy;
  }

  const clubHouseOccupancy = occupancy * chRefOcc;

  const waterCommonAreaLandscape =
    efficientFixturesShower__pi_projectLandscapeArea *
    efficientFixturesShower__st_waterDailyLandscapeWaterUse;

  const waterCommonAreaCarPark =
    efficientFixturesShower__pi_projectNoOfCarParks *
    efficientFixturesShower__st_waterDailyCarWashWaterUse;

  const waterCommonAreaCleaning =
    efficientFixturesShower__pi_projectAreaOfLobbiesAndCorridors *
    efficientFixturesShower__st_waterDailyLobbiesAndCorridorsWaterUse;

  const waterSwimmingPool =
    efficientFixturesShower__pi_projectSwimmingPoolSurfaceArea *
    efficientFixturesShower__st_waterSwimmingPoolDepth *
    efficientFixturesShower__st_waterWaterPerCubicMeter *
    efficientFixturesShower__st_waterSwimmingPoolEvaporationRate;

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
  const efsCfMitigated =
    cityEmissionFactor *
    efsAnnualWater *
    efficientFixturesShower__st_globalKg2tonConv;

  const efsSdgNumber = efficientFixturesShower__st_efSdgNumberForEf;

  const efsTreesSaved =
    efsCfMitigated * efficientFixturesShower__st_globalTreesPerTonCf;

  const efsPercentTotalWaterConsumption =
    (efsAnnualWater * 100) / annualBaselineWaterConsumption;

  return {
    efsCfMitigated,
    efsSdgNumber,
    efsTreesSaved,
    efsPercentTotalWaterConsumption,
  };
}

// ------------------------------- ProjectLevelInsights ends

//  -------------------------------  Flow Diagram starts -------------------------------

// Done
export function efficientFixturesShower__q_flowDiagram(
  efficientFixturesShower__q_efsDailyPreSdPlus,
  efficientFixturesShower__q_efsDaily,
  global__st_globalDaysInAYear: number
) {
  const efsDailyPreSdPlus = efficientFixturesShower__q_efsDailyPreSdPlus;
  const efsDaily = efficientFixturesShower__q_efsDaily;
  const efsAnnualWater =
    (efsDailyPreSdPlus - efsDaily) * global__st_globalDaysInAYear;

  const efsFlowDiagramDomestic = efsAnnualWater / global__st_globalDaysInAYear;
  const efsFlowDiagramHealthFaucet = 0;

  const efsFlowDiagramFlushing = 0;
  const efsFlowDiagramCommonArea = 0;
  const efsFlowDiagramDrinking = 0;

  return {
    efsFlowDiagramDomestic,
    efsFlowDiagramHealthFaucet,

    efsFlowDiagramFlushing,
    efsFlowDiagramCommonArea,
    efsFlowDiagramDrinking,
  };}
export  function efficientFixturesShower__q_secondaryImpact(efficientFixturesShower__pi_projectNoOfFloors:number,efficientFixturesShower__pi_projectFloorToFloorHeight:number,efficientFixturesShower__st_globalLtoM3converter:number,efficientFixturesShower__st_waterPumpFlowRate:number,efficientFixturesShower__st_globalAccelerationDueToGravity:number,efficientFixturesShower__st_waterSpecificGravityOfWater:number,efficientFixturesShower__st_globalJoulesToKwConverter:number,efficientFixturesShower__st_waterPumpEfficiency:number,efficientFixturesShower__st_waterMotorEfficiency:number,efficientFixturesShower__st_city:string,global__st_globalDaysInAYear:number,efficientFixturesShower__q_efsDailyPreSdPlus,efficientFixturesShower__q_efsDaily){const efsDailyPreSdPlus = efficientFixturesShower__q_efsDailyPreSdPlus;
  const efsDaily = efficientFixturesShower__q_efsDaily;
  const efsAnnualWater =
    (efsDailyPreSdPlus - efsDaily) * global__st_globalDaysInAYear;

  const timeTakenToPumpWater =
    (efsAnnualWater * efficientFixturesShower__st_globalLtoM3converter) /
    efficientFixturesShower__st_waterPumpFlowRate;

  const buildingHeight =
    efficientFixturesShower__pi_projectNoOfFloors *
    efficientFixturesShower__pi_projectFloorToFloorHeight;

  const hydraulicPower =
    (efficientFixturesShower__st_waterPumpFlowRate *
      buildingHeight *
      efficientFixturesShower__st_globalAccelerationDueToGravity *
      efficientFixturesShower__st_waterSpecificGravityOfWater) /
    efficientFixturesShower__st_globalJoulesToKwConverter;

  const shaftPower =
    hydraulicPower / efficientFixturesShower__st_waterPumpEfficiency;

  const electricalInput =
    shaftPower / efficientFixturesShower__st_waterMotorEfficiency;
  const efsPassiveEnergykWh = electricalInput * timeTakenToPumpWater;

  const efsPassiveEnergyOpex = utilities.utility_energyOpex(
    efsPassiveEnergykWh,
    efficientFixturesShower__st_city
  );

  const passiveEnergykWh = efsPassiveEnergykWh;
  const passiveEnergyOpex = efsPassiveEnergyOpex;
  const passiveWasteKg = 0;
  const passiveWasteOpex = 0;

  return {
    passiveEnergykWh,
    passiveEnergyOpex,
    passiveWasteKg,
    passiveWasteOpex,
  };}
export  function efficientFixturesShower__q_overviewBarGraph(global__st_globalDaysInAYear:number,efficientFixturesShower__q_efsDailyPreSdPlus,efficientFixturesShower__q_efsDaily){const efsDailyPreSdPlus = efficientFixturesShower__q_efsDailyPreSdPlus;
  const efsDaily = efficientFixturesShower__q_efsDaily;
  const efsAnnualWater =
    (efsDailyPreSdPlus - efsDaily) * global__st_globalDaysInAYear;

  const title = 'Efficient Fixtures water usage by category';
  const totalSavings = efsAnnualWater;

  const seriesName1 = 'Domestic';
  const seriesValue1 = efsAnnualWater;
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
export  function efficientFixturesShower__q_overviewDonutGraph(efficientFixturesShower__pi_studio:number,efficientFixturesShower__pi_oneBHK:number,efficientFixturesShower__pi_twoBHK:number,efficientFixturesShower__pi_threeBHK:number,efficientFixturesShower__pi_includeClubHouse:string,efficientFixturesShower__pi_projectLandscapeArea:number,efficientFixturesShower__pi_projectNoOfCarParks:number,efficientFixturesShower__pi_projectAreaOfLobbiesAndCorridors:number,efficientFixturesShower__pi_projectSwimmingPoolSurfaceArea:number,efficientFixturesShower__pi_projectCategory:string,efficientFixturesShower__st_studioRefOccupancy:number,efficientFixturesShower__st_oneBHKRefOccupancy:number,efficientFixturesShower__st_twoBHKRefOccupancy:number,efficientFixturesShower__st_threeBHKRefOccupancy:number,efficientFixturesShower__st_projectHousekeepingRefOccupancy:number,efficientFixturesShower__st_clubHouseRefOccupancy:number,efficientFixturesShower__st_waterDailyLandscapeWaterUse:number,efficientFixturesShower__st_waterDailyCarWashWaterUse:number,efficientFixturesShower__st_waterDailyLobbiesAndCorridorsWaterUse:number,efficientFixturesShower__st_waterSwimmingPoolDepth:number,efficientFixturesShower__st_waterWaterPerCubicMeter:number,efficientFixturesShower__st_waterSwimmingPoolEvaporationRate:number,global__st_globalDaysInAYear:number,global__st_globalLToKlConverter:number,efficientFixturesShower__st_waterDomesticHealthFaucetDaily:number,efficientFixturesShower__st_waterDomesticHealthFaucetDuration:number,efficientFixturesShower__st_waterDomesticHealthFaucetFlow:number,efficientFixturesShower__st_waterDomesticFaucetDaily:number,efficientFixturesShower__st_waterDomesticFaucetDuration:number,efficientFixturesShower__st_waterDomesticFaucetFlow:number,efficientFixturesShower__st_waterDomesticKitchenSinkDaily:number,efficientFixturesShower__st_waterDomesticKitchenSinkDuration:number,efficientFixturesShower__st_waterDomesticKitchenSinkFlow:number,efficientFixturesShower__st_waterDomesticShowerDaily:number,efficientFixturesShower__st_waterDomesticShowerDuration:number,efficientFixturesShower__st_waterDomesticShowerFlow:number,efficientFixturesShower__st_waterDomesticWashClothesDaily:number,efficientFixturesShower__st_waterDomesticWashClothesDuration:number,efficientFixturesShower__st_waterDomesticWashClothesFlow:number,efficientFixturesShower__st_waterDomesticWashUtensilsDaily:number,efficientFixturesShower__st_waterDomesticWashUtensilsDuration:number,efficientFixturesShower__st_waterDomesticWashUtensilsFlow:number,efficientFixturesShower__st_waterClubHouseDomesticHealthFaucetDaily:number,efficientFixturesShower__st_waterClubHouseDomesticHealthFaucetDuration:number,efficientFixturesShower__st_waterClubHouseDomesticFaucetDaily:number,efficientFixturesShower__st_waterClubHouseDomesticFaucetDuration:number,efficientFixturesShower__st_waterClubHouseDomesticShowerDaily:number,efficientFixturesShower__st_waterClubHouseDomesticShowerDuration:number,water__q_currentWaterTable,efficientFixturesShower__q_occupancyTotalOccupancyVilla,efficientFixturesShower__q_occupancyClubhouseOccupancyVilla,efficientFixturesShower__q_occupancyTotalOccupancyApartment,efficientFixturesShower__q_occupancyClubhouseOccupancyApartment,efficientFixturesShower__q_efsDailyPreSdPlus,efficientFixturesShower__q_efsDaily){const efsDailyPreSdPlus = efficientFixturesShower__q_efsDailyPreSdPlus;
  const efsDaily = efficientFixturesShower__q_efsDaily;
  const efsAnnualWater =
    (efsDailyPreSdPlus - efsDaily) * global__st_globalDaysInAYear;

  // Annual Baseline Water Consumption Starts
  const occupancy = utilities.utility_efHfOccupancy(
    efficientFixturesShower__pi_studio,
    efficientFixturesShower__st_studioRefOccupancy,
    efficientFixturesShower__pi_oneBHK,
    efficientFixturesShower__st_oneBHKRefOccupancy,
    efficientFixturesShower__pi_twoBHK,
    efficientFixturesShower__st_twoBHKRefOccupancy,
    efficientFixturesShower__pi_threeBHK,
    efficientFixturesShower__st_threeBHKRefOccupancy
  );

  const totalOccupancy = utilities.utility_efHfTotalOccupancy(
    efficientFixturesShower__pi_studio,
    efficientFixturesShower__st_studioRefOccupancy,
    efficientFixturesShower__pi_oneBHK,
    efficientFixturesShower__st_oneBHKRefOccupancy,
    efficientFixturesShower__pi_twoBHK,
    efficientFixturesShower__st_twoBHKRefOccupancy,
    efficientFixturesShower__pi_threeBHK,
    efficientFixturesShower__st_threeBHKRefOccupancy,
    efficientFixturesShower__st_projectHousekeepingRefOccupancy
  );

  const currentWaterTable = water__q_currentWaterTable;
  const residentialLPCD = currentWaterTable.clientBaseCase.residentialDrinking;
  const clubHouseLPCD = currentWaterTable.clientBaseCase.clubhouseDrinking;

  let chRefOcc = 0;
  if (efficientFixturesShower__pi_includeClubHouse === 'Yes') {
    chRefOcc = efficientFixturesShower__st_clubHouseRefOccupancy;
  }

  const clubHouseOccupancy = occupancy * chRefOcc;

  const waterCommonAreaLandscape =
    efficientFixturesShower__pi_projectLandscapeArea *
    efficientFixturesShower__st_waterDailyLandscapeWaterUse;

  const waterCommonAreaCarPark =
    efficientFixturesShower__pi_projectNoOfCarParks *
    efficientFixturesShower__st_waterDailyCarWashWaterUse;

  const waterCommonAreaCleaning =
    efficientFixturesShower__pi_projectAreaOfLobbiesAndCorridors *
    efficientFixturesShower__st_waterDailyLobbiesAndCorridorsWaterUse;

  const waterSwimmingPool =
    efficientFixturesShower__pi_projectSwimmingPoolSurfaceArea *
    efficientFixturesShower__st_waterSwimmingPoolDepth *
    efficientFixturesShower__st_waterWaterPerCubicMeter *
    efficientFixturesShower__st_waterSwimmingPoolEvaporationRate;

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

  // Annual Baseline Water Consumption Ends

  const donut1Title = 'Savings as % of Total Water';
  const donut1Value = (efsAnnualWater * 100) / annualBaselineWaterConsumption;

  const donut2Title = 'Savings as % of Domestic Water consumption';

  let efTotalOccupancy = 0;
  let efClubHouseOccupancy = 0;

  if (efficientFixturesShower__pi_projectCategory === 'Villa') {
    efTotalOccupancy = efficientFixturesShower__q_occupancyTotalOccupancyVilla;

    efClubHouseOccupancy =
      efficientFixturesShower__q_occupancyClubhouseOccupancyVilla;
  } else {
    efTotalOccupancy =
      efficientFixturesShower__q_occupancyTotalOccupancyApartment;

    efClubHouseOccupancy =
      efficientFixturesShower__q_occupancyClubhouseOccupancyApartment;
  }

  const waterDomesticHealthFaucet =
    efficientFixturesShower__st_waterDomesticHealthFaucetDaily *
    efficientFixturesShower__st_waterDomesticHealthFaucetDuration *
    efficientFixturesShower__st_waterDomesticHealthFaucetFlow;

  const waterDomesticFaucet =
    efficientFixturesShower__st_waterDomesticFaucetDaily *
    efficientFixturesShower__st_waterDomesticFaucetDuration *
    efficientFixturesShower__st_waterDomesticFaucetFlow;

  const waterDomesticKitchenSink =
    efficientFixturesShower__st_waterDomesticKitchenSinkDaily *
    efficientFixturesShower__st_waterDomesticKitchenSinkDuration *
    efficientFixturesShower__st_waterDomesticKitchenSinkFlow;

  const waterDomesticShower =
    efficientFixturesShower__st_waterDomesticShowerDaily *
    efficientFixturesShower__st_waterDomesticShowerDuration *
    efficientFixturesShower__st_waterDomesticShowerFlow;

  const waterDomesticWashClothes =
    efficientFixturesShower__st_waterDomesticWashClothesDaily *
    efficientFixturesShower__st_waterDomesticWashClothesDuration *
    efficientFixturesShower__st_waterDomesticWashClothesFlow;

  const waterDomesticWashUtensils =
    efficientFixturesShower__st_waterDomesticWashUtensilsDaily *
    efficientFixturesShower__st_waterDomesticWashUtensilsDuration *
    efficientFixturesShower__st_waterDomesticWashUtensilsFlow;

  const waterResidentialDomestic =
    waterDomesticHealthFaucet +
    waterDomesticFaucet +
    waterDomesticKitchenSink +
    waterDomesticShower +
    waterDomesticWashClothes +
    waterDomesticWashUtensils;

  const waterClubHouseDomesticHealthFaucet =
    efficientFixturesShower__st_waterClubHouseDomesticHealthFaucetDaily *
    efficientFixturesShower__st_waterClubHouseDomesticHealthFaucetDuration *
    efficientFixturesShower__st_waterDomesticHealthFaucetFlow;

  const waterClubHouseDomesticFaucet =
    efficientFixturesShower__st_waterClubHouseDomesticFaucetDaily *
    efficientFixturesShower__st_waterClubHouseDomesticFaucetDuration *
    efficientFixturesShower__st_waterDomesticFaucetFlow;

  const waterClubHouseDomesticShower =
    efficientFixturesShower__st_waterClubHouseDomesticShowerDaily *
    efficientFixturesShower__st_waterClubHouseDomesticShowerDuration *
    efficientFixturesShower__st_waterDomesticShowerFlow;

  const waterClubHouseDomestic =
    waterClubHouseDomesticHealthFaucet +
    waterClubHouseDomesticFaucet +
    waterClubHouseDomesticShower;

  const efDomesticDaily =
    (waterResidentialDomestic * efTotalOccupancy +
      waterClubHouseDomestic * efClubHouseOccupancy) /
    global__st_globalLToKlConverter;
  const efsFlowDiagramDomestic = efsAnnualWater / global__st_globalDaysInAYear;

  const donut2Value = (efsFlowDiagramDomestic * 100) / efDomesticDaily;

  return {
    donut1Title,
    donut1Value,
    donut2Title,
    donut2Value,
  };}
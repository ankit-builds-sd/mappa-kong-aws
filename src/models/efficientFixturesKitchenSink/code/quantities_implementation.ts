import { irr } from 'node-irr'; import { HwmDemandAssumptionBase, HwmDemandAssumptionVilla, HwmDemandAssumptionPenthouse, DemandAssumptionApartment, HwmDemandByBath, HwmOption, HeatPumpType, SwhType, SwhVariant, HpType, HwmHpHeatingSpeed, SdPlusInterventions, CurrentWaterTableRow, CurrentWaterTable, CurrentWaterTableInputsRow, CurrentWaterTableInputs, WaterPreSdPlusRow, WaterPreSdPlus, PlumbingDetailsPreSdPlus, EFCalculator, StpCalculator, PreSDPlusDemand, OutcomesPreSdPlus } from '../../../utilities/types'; import * as utilities from '../../../utilities/utility'; import { CityDbData, SDPlusDefaultsStore } from '../../../utilities/stores';export  function efficientFixturesKitchenSink__q_outcomes(efficientFixturesKitchenSink__pi_city:string,global__st_globalDaysInAYear:number,efficientFixturesKitchenSink__q_efksDailyPreSdPlus,efficientFixturesKitchenSink__q_efksDaily,efficientFixturesKitchenSink__q_efksCapexPostSdPlus){const efksDailyPreSdPlus = efficientFixturesKitchenSink__q_efksDailyPreSdPlus;
  const efksDaily = efficientFixturesKitchenSink__q_efksDaily;

  const efksAnnualWater =
    (efksDailyPreSdPlus - efksDaily) * global__st_globalDaysInAYear;

  const product = utilities.utility_efKitchenSinkProductResolver();

  let efksCapexPostSdPlus = efficientFixturesKitchenSink__q_efksCapexPostSdPlus;

  let efksCapexPreSdPlus = efficientFixturesKitchenSink__q_efksCapexPostSdPlus;

  if (product.aeratorType == 'Built-in Aerator') {
    efksCapexPostSdPlus = efksCapexPostSdPlus + efksCapexPreSdPlus;
  }

  const efksCapex = efksCapexPostSdPlus - efksCapexPreSdPlus;

  const efksOpex = utilities.utility_waterOpex(
    efficientFixturesKitchenSink__pi_city,
    efksAnnualWater
  );

  return {
    efksDailyPreSdPlus,
    efksDaily,
    efksAnnualWater,
    efksCapex,
    efksOpex,
  };}
export  function efficientFixturesKitchenSink__q_efksDailyPreSdPlus(efficientFixturesKitchenSink__pi_projectCategory:string,efficientFixturesKitchenSink__st_waterDomesticKitchenSinkDaily:number,efficientFixturesKitchenSink__st_waterDomesticKitchenSinkDuration:number,efficientFixturesKitchenSink__st_waterDomesticKitchenSinkFlowPreSDPlus:number,global__st_globalLToKlConverter:number,efficientFixturesKitchenSink__q_occupancyTotalOccupancyVilla,efficientFixturesKitchenSink__q_occupancyTotalOccupancyApartment){const waterDomesticKitchenSinkPreSDPlus =
    efficientFixturesKitchenSink__st_waterDomesticKitchenSinkDaily *
    efficientFixturesKitchenSink__st_waterDomesticKitchenSinkDuration *
    efficientFixturesKitchenSink__st_waterDomesticKitchenSinkFlowPreSDPlus;

  let efTotalOccupancy = 0;

  if (efficientFixturesKitchenSink__pi_projectCategory === 'Villa') {
    efTotalOccupancy =
      efficientFixturesKitchenSink__q_occupancyTotalOccupancyVilla;
  } else {
    efTotalOccupancy =
      efficientFixturesKitchenSink__q_occupancyTotalOccupancyApartment;
  }

  const product = utilities.utility_efKitchenSinkProductResolver();

  const waterDomesticKitchenSinkFlow = product.flowRate;
  const waterDomesticKitchenSink =
    efficientFixturesKitchenSink__st_waterDomesticKitchenSinkDaily *
    efficientFixturesKitchenSink__st_waterDomesticKitchenSinkDuration *
    waterDomesticKitchenSinkFlow;

  const efksDailyPreSdPlus =
    (waterDomesticKitchenSinkPreSDPlus * efTotalOccupancy) /
    global__st_globalLToKlConverter;

  return efksDailyPreSdPlus;}
export  function efficientFixturesKitchenSink__q_efksDaily(efficientFixturesKitchenSink__pi_projectCategory:string,efficientFixturesKitchenSink__st_waterDomesticKitchenSinkDaily:number,efficientFixturesKitchenSink__st_waterDomesticKitchenSinkDuration:number,global__st_globalLToKlConverter:number,efficientFixturesKitchenSink__q_occupancyTotalOccupancyVilla,efficientFixturesKitchenSink__q_occupancyTotalOccupancyApartment){const product = utilities.utility_efKitchenSinkProductResolver();

  const waterDomesticKitchenSinkFlow = product.flowRate;
  const waterDomesticKitchenSink =
    efficientFixturesKitchenSink__st_waterDomesticKitchenSinkDaily *
    efficientFixturesKitchenSink__st_waterDomesticKitchenSinkDuration *
    waterDomesticKitchenSinkFlow;

  let efTotalOccupancy = 0;

  if (efficientFixturesKitchenSink__pi_projectCategory === 'Villa') {
    efTotalOccupancy =
      efficientFixturesKitchenSink__q_occupancyTotalOccupancyVilla;
  } else {
    efTotalOccupancy =
      efficientFixturesKitchenSink__q_occupancyTotalOccupancyApartment;
  }

  const efksDaily =
    (waterDomesticKitchenSink * efTotalOccupancy) /
    global__st_globalLToKlConverter;

  return efksDaily;}
export  function efficientFixturesKitchenSink__q_efksCapexPostSdPlus(efficientFixturesKitchenSink__pi_projectStudio:number,efficientFixturesKitchenSink__pi_project1BHK:number,efficientFixturesKitchenSink__pi_project2BHK:number,efficientFixturesKitchenSink__pi_project3BHK:number,efficientFixturesKitchenSink__pi_project4BHK:number,efficientFixturesKitchenSink__st_efksStudioDomesticKitchenSink:number,efficientFixturesKitchenSink__st_efks1BHKDomesticKitchenSink:number,efficientFixturesKitchenSink__st_efks2BHKDomesticKitchenSink:number,efficientFixturesKitchenSink__st_efks3BHKDomesticKitchenSink:number,efficientFixturesKitchenSink__st_efks4BHKDomesticKitchenSink:number){const product = utilities.utility_efKitchenSinkProductResolver();
  const waterDomesticKitchenSinkPrice = product?.price;

  const efksCapexPostSdPlus =
    (efficientFixturesKitchenSink__pi_projectStudio *
      efficientFixturesKitchenSink__st_efksStudioDomesticKitchenSink +
      efficientFixturesKitchenSink__pi_project1BHK *
        efficientFixturesKitchenSink__st_efks1BHKDomesticKitchenSink +
      efficientFixturesKitchenSink__pi_project2BHK *
        efficientFixturesKitchenSink__st_efks2BHKDomesticKitchenSink +
      efficientFixturesKitchenSink__pi_project3BHK *
        efficientFixturesKitchenSink__st_efks3BHKDomesticKitchenSink +
      efficientFixturesKitchenSink__pi_project4BHK *
        efficientFixturesKitchenSink__st_efks4BHKDomesticKitchenSink) *
    waterDomesticKitchenSinkPrice;

  return efksCapexPostSdPlus;}
export  function efficientFixturesKitchenSink__q_efksCapexPreSdPlus(efficientFixturesKitchenSink__pi_projectStudio:number,efficientFixturesKitchenSink__pi_project1BHK:number,efficientFixturesKitchenSink__pi_project2BHK:number,efficientFixturesKitchenSink__pi_project3BHK:number,efficientFixturesKitchenSink__pi_project4BHK:number,efficientFixturesKitchenSink__st_waterNbcBaseCaseKitchenSinkPrice:number,efficientFixturesKitchenSink__st_efksStudioDomesticKitchenSink:number,efficientFixturesKitchenSink__st_efks1BHKDomesticKitchenSink:number,efficientFixturesKitchenSink__st_efks2BHKDomesticKitchenSink:number,efficientFixturesKitchenSink__st_efks3BHKDomesticKitchenSink:number,efficientFixturesKitchenSink__st_efks4BHKDomesticKitchenSink:number){const waterDomesticKitchenSinkPricePreSDPlus =
    efficientFixturesKitchenSink__st_waterNbcBaseCaseKitchenSinkPrice;

  const efksCapexPreSdPlus =
    (efficientFixturesKitchenSink__pi_projectStudio *
      efficientFixturesKitchenSink__st_efksStudioDomesticKitchenSink +
      efficientFixturesKitchenSink__pi_project1BHK *
        efficientFixturesKitchenSink__st_efks1BHKDomesticKitchenSink +
      efficientFixturesKitchenSink__pi_project2BHK *
        efficientFixturesKitchenSink__st_efks2BHKDomesticKitchenSink +
      efficientFixturesKitchenSink__pi_project3BHK *
        efficientFixturesKitchenSink__st_efks3BHKDomesticKitchenSink +
      efficientFixturesKitchenSink__pi_project4BHK *
        efficientFixturesKitchenSink__st_efks4BHKDomesticKitchenSink) *
    waterDomesticKitchenSinkPricePreSDPlus;

  return efksCapexPreSdPlus;
}

export function efficientFixturesKitchenSink__q_effResidentialFaucetCapexPreSdPlus(
  efficientFixturesKitchenSink__pi_projectStudio: number,
  efficientFixturesKitchenSink__pi_project1Bhk: number,
  efficientFixturesKitchenSink__pi_project2Bhk: number,
  efficientFixturesKitchenSink__pi_project3Bhk: number,
  efficientFixturesKitchenSink__pi_project4Bhk: number,

  efficientFixturesKitchenSink__st_effStudioDomesticFaucet: number,
  efficientFixturesKitchenSink__st_eff1BhkDomesticFaucet: number,
  efficientFixturesKitchenSink__st_eff2BhkDomesticFaucet: number,
  efficientFixturesKitchenSink__st_eff3BhkDomesticFaucet: number,
  efficientFixturesKitchenSink__st_eff4BhkDomesticFaucet: number,
  efficientFixturesKitchenSink__st_waterNbcBaseCaseFaucetPrice: number
) {
  const waterDomesticFaucetPricePreSdPlus =
    efficientFixturesKitchenSink__st_waterNbcBaseCaseFaucetPrice;

  const effResidentialFaucetCapexPreSdPlus =
    (efficientFixturesKitchenSink__pi_projectStudio *
      efficientFixturesKitchenSink__st_effStudioDomesticFaucet +
      efficientFixturesKitchenSink__pi_project1Bhk *
        efficientFixturesKitchenSink__st_eff1BhkDomesticFaucet +
      efficientFixturesKitchenSink__pi_project2Bhk *
        efficientFixturesKitchenSink__st_eff2BhkDomesticFaucet +
      efficientFixturesKitchenSink__pi_project3Bhk *
        efficientFixturesKitchenSink__st_eff3BhkDomesticFaucet +
      efficientFixturesKitchenSink__pi_project4Bhk *
        efficientFixturesKitchenSink__st_eff4BhkDomesticFaucet) *
    waterDomesticFaucetPricePreSdPlus;

  return effResidentialFaucetCapexPreSdPlus;
}

export function efficientFixturesKitchenSink__q_effClubHouseFaucetCapexPreSdPlus(
  efficientFixturesKitchenSink__pi_includeClubHouse: string,
  efficientFixturesKitchenSink__st_waterNbcBaseCaseFaucetPrice: number,
  efficientFixturesKitchenSink__st_effClubHouseDomesticFaucet: number
) {
  const waterDomesticFaucetPricePreSdPlus =
    efficientFixturesKitchenSink__st_waterNbcBaseCaseFaucetPrice;

  let projectClubHouse = 0;
  if (efficientFixturesKitchenSink__pi_includeClubHouse === 'Yes') {
    projectClubHouse = 1;
  }

  return (
    projectClubHouse *
    efficientFixturesKitchenSink__st_effClubHouseDomesticFaucet *
    waterDomesticFaucetPricePreSdPlus
  );
}

export function efficientFixturesKitchenSink__q_igbcOccupanyVilla(
  efficientFixturesKitchenSink__st_igbc1BhkRefOccupancy: number,
  efficientFixturesKitchenSink__st_igbc2BhkRefOccupancy: number,
  efficientFixturesKitchenSink__st_igbc3BhkRefOccupancy: number,
  efficientFixturesKitchenSink__st_igbc4BhkRefOccupancy: number,

  efficientFixturesKitchenSink__pi_projectVilla1Bhk: number,
  efficientFixturesKitchenSink__pi_projectVilla2Bhk: number,
  efficientFixturesKitchenSink__pi_projectVilla3Bhk: number,
  efficientFixturesKitchenSink__pi_projectVilla4Bhk: number
) {
  return (
    efficientFixturesKitchenSink__pi_projectVilla1Bhk *
      efficientFixturesKitchenSink__st_igbc1BhkRefOccupancy +
    efficientFixturesKitchenSink__pi_projectVilla2Bhk *
      efficientFixturesKitchenSink__st_igbc2BhkRefOccupancy +
    efficientFixturesKitchenSink__pi_projectVilla3Bhk *
      efficientFixturesKitchenSink__st_igbc3BhkRefOccupancy +
    efficientFixturesKitchenSink__pi_projectVilla4Bhk *
      efficientFixturesKitchenSink__st_igbc4BhkRefOccupancy
  );
}

export function efficientFixturesKitchenSink__q_occupancyTotalOccupancyVilla(
  efficientFixturesKitchenSink__st_projectHousekeepingRefOccupancy: number,

  occupancy__q_occupancyVilla
) {
  const totalOccupancyVilla =
    occupancy__q_occupancyVilla *
    (1 + efficientFixturesKitchenSink__st_projectHousekeepingRefOccupancy);

  return totalOccupancyVilla;
}

export function efficientFixturesKitchenSink__q_igbcOccupanyApartment(
  efficientFixturesKitchenSink__st_igbcStudioRefOccupancy: number,
  efficientFixturesKitchenSink__st_igbc1BhkRefOccupancy: number,
  efficientFixturesKitchenSink__st_igbc2BhkRefOccupancy: number,
  efficientFixturesKitchenSink__st_igbc3BhkRefOccupancy: number,
  efficientFixturesKitchenSink__st_igbc4BhkRefOccupancy: number,

  efficientFixturesKitchenSink__pi_projectStudio: number,
  efficientFixturesKitchenSink__pi_project1Bhk: number,
  efficientFixturesKitchenSink__pi_project2Bhk: number,
  efficientFixturesKitchenSink__pi_project3Bhk: number,
  efficientFixturesKitchenSink__pi_project4Bhk: number
) {
  return (
    efficientFixturesKitchenSink__pi_projectStudio +
    efficientFixturesKitchenSink__st_igbcStudioRefOccupancy +
    (efficientFixturesKitchenSink__pi_project1Bhk +
      efficientFixturesKitchenSink__st_igbc1BhkRefOccupancy) +
    (efficientFixturesKitchenSink__pi_project2Bhk +
      efficientFixturesKitchenSink__st_igbc2BhkRefOccupancy) +
    (efficientFixturesKitchenSink__pi_project3Bhk +
      efficientFixturesKitchenSink__st_igbc3BhkRefOccupancy) +
    (efficientFixturesKitchenSink__pi_project4Bhk +
      efficientFixturesKitchenSink__st_igbc4BhkRefOccupancy)
  );
}

export function efficientFixturesKitchenSink__q_occupancyTotalOccupancyApartment(
  efficientFixturesKitchenSink__st_projectHousekeepingRefOccupancy: number,

  occupancy__q_occupancyApartment,
  occupancy__q_occupancyPenthouse
): number {
  const totalOccupancyApartment =
    (occupancy__q_occupancyApartment + occupancy__q_occupancyPenthouse) *
    (1 + efficientFixturesKitchenSink__st_projectHousekeepingRefOccupancy);

  return totalOccupancyApartment;
}

export function efficientFixturesKitchenSink__q_occupancyClubhouseOccupancyApartment(
  occupancy__pi_studio: number,
  occupancy__pi_oneBHK: number,
  occupancy__pi_twoBHK: number,
  occupancy__pi_threeBHK: number,
  occupancy__pi_fourBHK: number,
  occupancy__st_studioRefOccupancy: number,
  occupancy__st_oneBHKRefOccupancy: number,
  occupancy__st_twoBHKRefOccupancy: number,
  occupancy__st_threeBHKRefOccupancy: number,
  occupancy__st_fourBHKRefOccupancy: number,

  occupancy__pi_penthouseStudio: number,
  occupancy__pi_penthouseOneBHK: number,
  occupancy__pi_penthouseTwoBHK: number,
  occupancy__pi_penthouseThreeBHK: number,
  occupancy__pi_penthouseFourBHK: number,
  occupancy__st_penthouseOneBHKRefOccupancy: number,
  occupancy__st_penthouseTwoBHKRefOccupancy: number,
  occupancy__st_penthouseThreeBHKRefOccupancy: number,
  occupancy__st_penthouseFourBHKRefOccupancy: number,
  efficientFixturesKitchenSink__pi_includeClubHouse: string,
  efficientFixturesKitchenSink__st_clubHouseRefOccupancy: number,

  occupancy__q_occupancyApartment,
  occupancy__q_occupancyPenthouse
): number {
  let clubHouseRefOccupancy = 0.1;
  if (efficientFixturesKitchenSink__pi_includeClubHouse === 'Yes') {
    clubHouseRefOccupancy =
      efficientFixturesKitchenSink__st_clubHouseRefOccupancy;
  }

  const clubHouseOccupancyApartment =
    (occupancy__q_occupancyApartment + occupancy__q_occupancyPenthouse) *
    clubHouseRefOccupancy;

  return clubHouseOccupancyApartment;
}

export function efficientFixturesKitchenSink__q_igbcOccupanyPenthouse(
  efficientFixturesKitchenSink__st_igbcStudioRefOccupancy: number,
  efficientFixturesKitchenSink__st_igbc1BhkRefOccupancy: number,
  efficientFixturesKitchenSink__st_igbc2BhkRefOccupancy: number,
  efficientFixturesKitchenSink__st_igbc3BhkRefOccupancy: number,
  efficientFixturesKitchenSink__st_igbc4BhkRefOccupancy: number,

  efficientFixturesKitchenSink__pi_projectPhStudio: number,
  efficientFixturesKitchenSink__pi_projectPh1Bhk: number,
  efficientFixturesKitchenSink__pi_projectPh2Bhk: number,
  efficientFixturesKitchenSink__pi_projectPh3Bhk: number,
  efficientFixturesKitchenSink__pi_projectPh4Bhk: number
) {
  return (
    efficientFixturesKitchenSink__pi_projectPhStudio *
      efficientFixturesKitchenSink__st_igbcStudioRefOccupancy +
    efficientFixturesKitchenSink__pi_projectPh1Bhk *
      efficientFixturesKitchenSink__st_igbc1BhkRefOccupancy +
    efficientFixturesKitchenSink__pi_projectPh2Bhk *
      efficientFixturesKitchenSink__st_igbc2BhkRefOccupancy +
    efficientFixturesKitchenSink__pi_projectPh3Bhk *
      efficientFixturesKitchenSink__st_igbc3BhkRefOccupancy +
    efficientFixturesKitchenSink__pi_projectPh4Bhk *
      efficientFixturesKitchenSink__st_igbc4BhkRefOccupancy
  );
}

export function efficientFixturesKitchenSink__q_occupancyClubhouseOccupancyVilla(
  efficientFixturesKitchenSink__pi_includeClubHouse: string,
  efficientFixturesKitchenSink__st_clubHouseRefOccupancy: number,

  occupancy__q_occupancyVilla
) {
  let clubHouseRefOccupancy = 0.1;
  if (efficientFixturesKitchenSink__pi_includeClubHouse === 'Yes') {
    clubHouseRefOccupancy =
      efficientFixturesKitchenSink__st_clubHouseRefOccupancy;
  }

  const clubHouseOccupancyVilla =
    occupancy__q_occupancyVilla * clubHouseRefOccupancy;

  return clubHouseOccupancyVilla;
}

// ------------------------------- OUTCOMES ENDS -------------------------------

//  -------------------------------  IgbcOutcomes starts -------------------------------

// Done
export function efficientFixturesKitchenSink__q_igbcOutcomes(
  efficientFixturesKitchenSink__pi_projectCategory: string,
  efficientFixturesKitchenSink__st_igbcDomesticKitchenSinkDaily: number,
  efficientFixturesKitchenSink__st_igbcDomesticKitchenSinkDuration: number,
  efficientFixturesKitchenSink__st_igbcDomesticKitchenSinkFlowPreSDPlus: number,

  efficientFixturesKitchenSink__st_waterDomesticKitchenSinkDaily: number,
  efficientFixturesKitchenSink__st_waterDomesticKitchenSinkDuration: number,
  efficientFixturesKitchenSink__pi_city: string,
  global__st_globalDaysInAYear: number,
  global__st_globalLToKlConverter: number,

  efficientFixturesKitchenSink__q_igbcOccupanyVilla,
  efficientFixturesKitchenSink__q_igbcOccupanyApartment,
  efficientFixturesKitchenSink__q_igbcOccupanyPenthouse
) {
  const igbcDomesticKitchenSinkPreSdPlus =
    efficientFixturesKitchenSink__st_igbcDomesticKitchenSinkDaily *
    efficientFixturesKitchenSink__st_igbcDomesticKitchenSinkDuration *
    efficientFixturesKitchenSink__st_igbcDomesticKitchenSinkFlowPreSDPlus;

  // EF Occupancy Calc Starts
  let efIgbcOccupancy = 0;

  if (efficientFixturesKitchenSink__pi_projectCategory === 'Villa') {
    efIgbcOccupancy = efficientFixturesKitchenSink__q_igbcOccupanyVilla;
  } else {
    efIgbcOccupancy =
      efficientFixturesKitchenSink__q_igbcOccupanyApartment +
      efficientFixturesKitchenSink__q_igbcOccupanyPenthouse;
  }
  // EF Occupancy Calc Ends

  const efksIgbcDailyPreSdPlus =
    (igbcDomesticKitchenSinkPreSdPlus * efIgbcOccupancy) /
    global__st_globalLToKlConverter;

  const product = utilities.utility_efKitchenSinkProductResolver();

  const waterDomesticKitchenSinkFlow = product.flowRate;
  const waterDomesticKitchenSink =
    efficientFixturesKitchenSink__st_waterDomesticKitchenSinkDaily *
    efficientFixturesKitchenSink__st_waterDomesticKitchenSinkDuration *
    waterDomesticKitchenSinkFlow;

  const efksIgbcDaily =
    (waterDomesticKitchenSink * efIgbcOccupancy) /
    global__st_globalLToKlConverter;

  const efksIgbcDailySavings = efksIgbcDailyPreSdPlus - efksIgbcDaily;

  const efksIgbcAnnualWater =
    efksIgbcDailySavings * global__st_globalDaysInAYear;

  const efksIgBcOpex = utilities.utility_waterOpex(
    efficientFixturesKitchenSink__pi_city,
    efksIgbcAnnualWater
  );

  return {
    efksIgbcDailyPreSdPlus,
    efksIgbcDaily,
    efksIgbcDailySavings,
    efksIgbcAnnualWater,
    efksIgBcOpex,
  };}
export  function efficientFixturesKitchenSink__q_outcomesPreSdPlus(efficientFixturesKitchenSink__st_globalDaysInAYear:number,efficientFixturesKitchenSink__q_efksDailyPreSdPlus){return (
efficientFixturesKitchenSink__q_efksDailyPreSdPlus *
efficientFixturesKitchenSink__st_globalDaysInAYear
);}
export  function efficientFixturesKitchenSink__q_projectLevelInsights(efficientFixturesKitchenSink__pi_city:string,efficientFixturesKitchenSink__pi_studio:number,efficientFixturesKitchenSink__pi_oneBHK:number,efficientFixturesKitchenSink__pi_twoBHK:number,efficientFixturesKitchenSink__pi_threeBHK:number,efficientFixturesKitchenSink__pi_includeClubHouse:string,efficientFixturesKitchenSink__pi_projectLandscapeArea:number,efficientFixturesKitchenSink__pi_projectNoOfCarParks:number,efficientFixturesKitchenSink__pi_projectSwimmingPoolSurfaceArea:number,efficientFixturesKitchenSink__pi_projectAreaOfLobbiesAndCorridors:number,efficientFixturesKitchenSink__st_globalKg2tonConv:number,efficientFixturesKitchenSink__st_efSdgNumberForEf:number,efficientFixturesKitchenSink__st_globalTreesPerTonCf:number,efficientFixturesKitchenSink__st_projectHousekeepingRefOccupancy:number,efficientFixturesKitchenSink__st_studioRefOccupancy:number,efficientFixturesKitchenSink__st_oneBHKRefOccupancy:number,efficientFixturesKitchenSink__st_twoBHKRefOccupancy:number,efficientFixturesKitchenSink__st_threeBHKRefOccupancy:number,efficientFixturesKitchenSink__st_clubHouseRefOccupancy:number,efficientFixturesKitchenSink__st_waterDailyLandscapeWaterUse:number,efficientFixturesKitchenSink__st_waterDailyCarWashWaterUse:number,efficientFixturesKitchenSink__st_waterSwimmingPoolDepth:number,efficientFixturesKitchenSink__st_waterWaterPerCubicMeter:number,efficientFixturesKitchenSink__st_waterSwimmingPoolEvaporationRate:number,efficientFixturesKitchenSink__st_waterDailyLobbiesAndCorridorsWaterUse:number,global__st_globalDaysInAYear:number,global__st_globalLToKlConverter:number,efficientFixturesKitchenSink__q_efksDailyPreSdPlus,efficientFixturesKitchenSink__q_efksDaily,water__q_currentWaterTable){const efksDailyPreSdPlus = efficientFixturesKitchenSink__q_efksDailyPreSdPlus;
  const efksDaily = efficientFixturesKitchenSink__q_efksDaily;
  const efksAnnualWater =
    (efksDailyPreSdPlus - efksDaily) * global__st_globalDaysInAYear;

  let cityEmissionFactor: number;
  if (efficientFixturesKitchenSink__pi_city === 'Bangalore') {
    cityEmissionFactor = 0.6;
  } else if (efficientFixturesKitchenSink__pi_city === 'Bombay') {
    cityEmissionFactor = 0.89;
  }

  const occupancy = utilities.utility_efHfOccupancy(
    efficientFixturesKitchenSink__pi_studio,
    efficientFixturesKitchenSink__st_studioRefOccupancy,
    efficientFixturesKitchenSink__pi_oneBHK,
    efficientFixturesKitchenSink__st_oneBHKRefOccupancy,
    efficientFixturesKitchenSink__pi_twoBHK,
    efficientFixturesKitchenSink__st_twoBHKRefOccupancy,
    efficientFixturesKitchenSink__pi_threeBHK,
    efficientFixturesKitchenSink__st_threeBHKRefOccupancy
  );

  const totalOccupancy = utilities.utility_efHfTotalOccupancy(
    efficientFixturesKitchenSink__pi_studio,
    efficientFixturesKitchenSink__st_studioRefOccupancy,
    efficientFixturesKitchenSink__pi_oneBHK,
    efficientFixturesKitchenSink__st_oneBHKRefOccupancy,
    efficientFixturesKitchenSink__pi_twoBHK,
    efficientFixturesKitchenSink__st_twoBHKRefOccupancy,
    efficientFixturesKitchenSink__pi_threeBHK,
    efficientFixturesKitchenSink__st_threeBHKRefOccupancy,
    efficientFixturesKitchenSink__st_projectHousekeepingRefOccupancy
  );

  const currentWaterTable = water__q_currentWaterTable;
  const residentialLPCD = currentWaterTable.clientBaseCase.residentialDrinking;
  const clubHouseLPCD = currentWaterTable.clientBaseCase.clubhouseDrinking;

  let chRefOcc = 0;
  if (efficientFixturesKitchenSink__pi_includeClubHouse === 'Yes') {
    chRefOcc = efficientFixturesKitchenSink__st_clubHouseRefOccupancy;
  }

  const clubHouseOccupancy = occupancy * chRefOcc;

  const waterCommonAreaLandscape =
    efficientFixturesKitchenSink__pi_projectLandscapeArea *
    efficientFixturesKitchenSink__st_waterDailyLandscapeWaterUse;

  const waterCommonAreaCarPark =
    efficientFixturesKitchenSink__pi_projectNoOfCarParks *
    efficientFixturesKitchenSink__st_waterDailyCarWashWaterUse;

  const waterCommonAreaCleaning =
    efficientFixturesKitchenSink__pi_projectAreaOfLobbiesAndCorridors *
    efficientFixturesKitchenSink__st_waterDailyLobbiesAndCorridorsWaterUse;

  const waterSwimmingPool =
    efficientFixturesKitchenSink__pi_projectSwimmingPoolSurfaceArea *
    efficientFixturesKitchenSink__st_waterSwimmingPoolDepth *
    efficientFixturesKitchenSink__st_waterWaterPerCubicMeter *
    efficientFixturesKitchenSink__st_waterSwimmingPoolEvaporationRate;

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

  const efksCfMitigated =
    cityEmissionFactor *
    efksAnnualWater *
    efficientFixturesKitchenSink__st_globalKg2tonConv;

  const efksSdgNumber = efficientFixturesKitchenSink__st_efSdgNumberForEf;

  const efksTreesSaved =
    efksCfMitigated * efficientFixturesKitchenSink__st_globalTreesPerTonCf;

  const efksPercentTotalWaterConsumption =
    (efksAnnualWater * 100) / annualBaselineWaterConsumption;

  return {
    efksCfMitigated,
    efksSdgNumber,
    efksTreesSaved,
    efksPercentTotalWaterConsumption,
  };}
export  function efficientFixturesKitchenSink__q_flowDiagram(global__st_globalDaysInAYear:number,efficientFixturesKitchenSink__q_efksDailyPreSdPlus,efficientFixturesKitchenSink__q_efksDaily){const efksDailyPreSdPlus = efficientFixturesKitchenSink__q_efksDailyPreSdPlus;
  const efksDaily = efficientFixturesKitchenSink__q_efksDaily;
  const efksAnnualWater =
    (efksDailyPreSdPlus - efksDaily) * global__st_globalDaysInAYear;

  const efksFlowDiagramDomestic =
    efksAnnualWater / global__st_globalDaysInAYear;
  const efksFlowDiagramHealthFaucet = 0;

  const efksFlowDiagramFlushing = 0;
  const efksFlowDiagramCommonArea = 0;
  const efksFlowDiagramDrinking = 0;

  return {
    efksFlowDiagramDomestic,
    efksFlowDiagramHealthFaucet,

    efksFlowDiagramFlushing,
    efksFlowDiagramCommonArea,
    efksFlowDiagramDrinking,
  };}
export  function efficientFixturesKitchenSink__q_secondaryImpact(efficientFixturesKitchenSink__pi_projectNoOfFloors:number,efficientFixturesKitchenSink__pi_projectFloorToFloorHeight:number,efficientFixturesKitchenSink__st_globalLtoM3converter:number,efficientFixturesKitchenSink__st_waterPumpFlowRate:number,efficientFixturesKitchenSink__st_globalAccelerationDueToGravity:number,efficientFixturesKitchenSink__st_waterSpecificGravityOfWater:number,efficientFixturesKitchenSink__st_globalJoulesToKwConverter:number,efficientFixturesKitchenSink__st_waterPumpEfficiency:number,efficientFixturesKitchenSink__st_waterMotorEfficiency:number,efficientFixturesKitchenSink__st_city:string,global__st_globalDaysInAYear:number,efficientFixturesKitchenSink__q_efksDailyPreSdPlus,efficientFixturesKitchenSink__q_efksDaily){const efksDailyPreSdPlus = efficientFixturesKitchenSink__q_efksDailyPreSdPlus;
  const efksDaily = efficientFixturesKitchenSink__q_efksDaily;
  const efksAnnualWater =
    (efksDailyPreSdPlus - efksDaily) * global__st_globalDaysInAYear;

  const timeTakenToPumpWater =
    (efksAnnualWater * efficientFixturesKitchenSink__st_globalLtoM3converter) /
    efficientFixturesKitchenSink__st_waterPumpFlowRate;

  const buildingHeight =
    efficientFixturesKitchenSink__pi_projectNoOfFloors *
    efficientFixturesKitchenSink__pi_projectFloorToFloorHeight;

  const hydraulicPower =
    (efficientFixturesKitchenSink__st_waterPumpFlowRate *
      buildingHeight *
      efficientFixturesKitchenSink__st_globalAccelerationDueToGravity *
      efficientFixturesKitchenSink__st_waterSpecificGravityOfWater) /
    efficientFixturesKitchenSink__st_globalJoulesToKwConverter;

  const shaftPower =
    hydraulicPower / efficientFixturesKitchenSink__st_waterPumpEfficiency;

  const electricalInput =
    shaftPower / efficientFixturesKitchenSink__st_waterMotorEfficiency;
  const efksPassiveEnergykWh = electricalInput * timeTakenToPumpWater;

  const efksPassiveEnergyOpex = utilities.utility_energyOpex(
    efksPassiveEnergykWh,
    efficientFixturesKitchenSink__st_city
  );

  return {
    timeTakenToPumpWater,
    buildingHeight,
    hydraulicPower,
    shaftPower,
    electricalInput,
    efksPassiveEnergykWh,
    efksPassiveEnergyOpex,
  };}
export  function efficientFixturesKitchenSink__q_overviewBarGraph(global__st_globalDaysInAYear:number,efficientFixturesKitchenSink__q_efksDailyPreSdPlus,efficientFixturesKitchenSink__q_efksDaily){const efksDailyPreSdPlus = efficientFixturesKitchenSink__q_efksDailyPreSdPlus;
  const efksDaily = efficientFixturesKitchenSink__q_efksDaily;
  const efksAnnualWater =
    (efksDailyPreSdPlus - efksDaily) * global__st_globalDaysInAYear;

  const title = 'Efficient Fixtures water usage by category';
  const totalSavings = efksAnnualWater;

  const seriesName1 = 'Domestic';
  const seriesValue1 = efksAnnualWater;
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
export  function efficientFixturesKitchenSink__q_overviewDonutGraph(efficientFixturesKitchenSink__pi_studio:number,efficientFixturesKitchenSink__pi_oneBHK:number,efficientFixturesKitchenSink__pi_twoBHK:number,efficientFixturesKitchenSink__pi_threeBHK:number,efficientFixturesKitchenSink__pi_includeClubHouse:string,efficientFixturesKitchenSink__pi_projectLandscapeArea:number,efficientFixturesKitchenSink__pi_projectNoOfCarParks:number,efficientFixturesKitchenSink__pi_projectAreaOfLobbiesAndCorridors:number,efficientFixturesKitchenSink__pi_projectSwimmingPoolSurfaceArea:number,efficientFixturesKitchenSink__pi_projectCategory:string,efficientFixturesKitchenSink__st_studioRefOccupancy:number,efficientFixturesKitchenSink__st_oneBHKRefOccupancy:number,efficientFixturesKitchenSink__st_twoBHKRefOccupancy:number,efficientFixturesKitchenSink__st_threeBHKRefOccupancy:number,efficientFixturesKitchenSink__st_projectHousekeepingRefOccupancy:number,efficientFixturesKitchenSink__st_clubHouseRefOccupancy:number,efficientFixturesKitchenSink__st_waterDailyLandscapeWaterUse:number,efficientFixturesKitchenSink__st_waterDailyCarWashWaterUse:number,efficientFixturesKitchenSink__st_waterDailyLobbiesAndCorridorsWaterUse:number,efficientFixturesKitchenSink__st_waterSwimmingPoolDepth:number,efficientFixturesKitchenSink__st_waterWaterPerCubicMeter:number,efficientFixturesKitchenSink__st_waterSwimmingPoolEvaporationRate:number,global__st_globalDaysInAYear:number,global__st_globalLToKlConverter:number,efficientFixturesKitchenSink__st_waterDomesticHealthFaucetDaily:number,efficientFixturesKitchenSink__st_waterDomesticHealthFaucetDuration:number,efficientFixturesKitchenSink__st_waterDomesticHealthFaucetFlow:number,efficientFixturesKitchenSink__st_waterDomesticFaucetDaily:number,efficientFixturesKitchenSink__st_waterDomesticFaucetDuration:number,efficientFixturesKitchenSink__st_waterDomesticFaucetFlow:number,efficientFixturesKitchenSink__st_waterDomesticKitchenSinkDaily:number,efficientFixturesKitchenSink__st_waterDomesticKitchenSinkDuration:number,efficientFixturesKitchenSink__st_waterDomesticKitchenSinkFlow:number,efficientFixturesKitchenSink__st_waterDomesticShowerDaily:number,efficientFixturesKitchenSink__st_waterDomesticShowerDuration:number,efficientFixturesKitchenSink__st_waterDomesticShowerFlow:number,efficientFixturesKitchenSink__st_waterDomesticWashClothesDaily:number,efficientFixturesKitchenSink__st_waterDomesticWashClothesDuration:number,efficientFixturesKitchenSink__st_waterDomesticWashClothesFlow:number,efficientFixturesKitchenSink__st_waterDomesticWashUtensilsDaily:number,efficientFixturesKitchenSink__st_waterDomesticWashUtensilsDuration:number,efficientFixturesKitchenSink__st_waterDomesticWashUtensilsFlow:number,efficientFixturesKitchenSink__st_waterClubHouseDomesticHealthFaucetDaily:number,efficientFixturesKitchenSink__st_waterClubHouseDomesticHealthFaucetDuration:number,efficientFixturesKitchenSink__st_waterClubHouseDomesticFaucetDaily:number,efficientFixturesKitchenSink__st_waterClubHouseDomesticFaucetDuration:number,efficientFixturesKitchenSink__st_waterClubHouseDomesticShowerDaily:number,efficientFixturesKitchenSink__st_waterClubHouseDomesticShowerDuration:number,efficientFixturesKitchenSink__q_efksDailyPreSdPlus,efficientFixturesKitchenSink__q_efksDaily,water__q_currentWaterTable,efficientFixturesKitchenSink__q_occupancyTotalOccupancyVilla,efficientFixturesKitchenSink__q_occupancyClubhouseOccupancyVilla,efficientFixturesKitchenSink__q_occupancyTotalOccupancyApartment,efficientFixturesKitchenSink__q_occupancyClubhouseOccupancyApartment){const efksDailyPreSdPlus = efficientFixturesKitchenSink__q_efksDailyPreSdPlus;
  const efksDaily = efficientFixturesKitchenSink__q_efksDaily;
  const efksAnnualWater =
    (efksDailyPreSdPlus - efksDaily) * global__st_globalDaysInAYear;

  // Annual Baseline Water Consumption Starts
  const occupancy = utilities.utility_efHfOccupancy(
    efficientFixturesKitchenSink__pi_studio,
    efficientFixturesKitchenSink__st_studioRefOccupancy,
    efficientFixturesKitchenSink__pi_oneBHK,
    efficientFixturesKitchenSink__st_oneBHKRefOccupancy,
    efficientFixturesKitchenSink__pi_twoBHK,
    efficientFixturesKitchenSink__st_twoBHKRefOccupancy,
    efficientFixturesKitchenSink__pi_threeBHK,
    efficientFixturesKitchenSink__st_threeBHKRefOccupancy
  );

  const totalOccupancy = utilities.utility_efHfTotalOccupancy(
    efficientFixturesKitchenSink__pi_studio,
    efficientFixturesKitchenSink__st_studioRefOccupancy,
    efficientFixturesKitchenSink__pi_oneBHK,
    efficientFixturesKitchenSink__st_oneBHKRefOccupancy,
    efficientFixturesKitchenSink__pi_twoBHK,
    efficientFixturesKitchenSink__st_twoBHKRefOccupancy,
    efficientFixturesKitchenSink__pi_threeBHK,
    efficientFixturesKitchenSink__st_threeBHKRefOccupancy,
    efficientFixturesKitchenSink__st_projectHousekeepingRefOccupancy
  );

  const currentWaterTable = water__q_currentWaterTable;
  const residentialLPCD = currentWaterTable.clientBaseCase.residentialDrinking;
  const clubHouseLPCD = currentWaterTable.clientBaseCase.clubhouseDrinking;

  let chRefOcc = 0;
  if (efficientFixturesKitchenSink__pi_includeClubHouse === 'Yes') {
    chRefOcc = efficientFixturesKitchenSink__st_clubHouseRefOccupancy;
  }

  const clubHouseOccupancy = occupancy * chRefOcc;

  const waterCommonAreaLandscape =
    efficientFixturesKitchenSink__pi_projectLandscapeArea *
    efficientFixturesKitchenSink__st_waterDailyLandscapeWaterUse;

  const waterCommonAreaCarPark =
    efficientFixturesKitchenSink__pi_projectNoOfCarParks *
    efficientFixturesKitchenSink__st_waterDailyCarWashWaterUse;

  const waterCommonAreaCleaning =
    efficientFixturesKitchenSink__pi_projectAreaOfLobbiesAndCorridors *
    efficientFixturesKitchenSink__st_waterDailyLobbiesAndCorridorsWaterUse;

  const waterSwimmingPool =
    efficientFixturesKitchenSink__pi_projectSwimmingPoolSurfaceArea *
    efficientFixturesKitchenSink__st_waterSwimmingPoolDepth *
    efficientFixturesKitchenSink__st_waterWaterPerCubicMeter *
    efficientFixturesKitchenSink__st_waterSwimmingPoolEvaporationRate;

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
  const donut1Value = (efksAnnualWater * 100) / annualBaselineWaterConsumption;

  const donut2Title = 'Savings as % of Domestic Water consumption';

  let efTotalOccupancy = 0;
  let efClubHouseOccupancy = 0;

  if (efficientFixturesKitchenSink__pi_projectCategory === 'Villa') {
    efTotalOccupancy =
      efficientFixturesKitchenSink__q_occupancyTotalOccupancyVilla;

    efClubHouseOccupancy =
      efficientFixturesKitchenSink__q_occupancyClubhouseOccupancyVilla;
  } else {
    efTotalOccupancy =
      efficientFixturesKitchenSink__q_occupancyTotalOccupancyApartment;

    efClubHouseOccupancy =
      efficientFixturesKitchenSink__q_occupancyClubhouseOccupancyApartment;
  }

  const waterDomesticHealthFaucet =
    efficientFixturesKitchenSink__st_waterDomesticHealthFaucetDaily *
    efficientFixturesKitchenSink__st_waterDomesticHealthFaucetDuration *
    efficientFixturesKitchenSink__st_waterDomesticHealthFaucetFlow;

  const waterDomesticFaucet =
    efficientFixturesKitchenSink__st_waterDomesticFaucetDaily *
    efficientFixturesKitchenSink__st_waterDomesticFaucetDuration *
    efficientFixturesKitchenSink__st_waterDomesticFaucetFlow;

  const waterDomesticKitchenSink =
    efficientFixturesKitchenSink__st_waterDomesticKitchenSinkDaily *
    efficientFixturesKitchenSink__st_waterDomesticKitchenSinkDuration *
    efficientFixturesKitchenSink__st_waterDomesticKitchenSinkFlow;

  const waterDomesticShower =
    efficientFixturesKitchenSink__st_waterDomesticShowerDaily *
    efficientFixturesKitchenSink__st_waterDomesticShowerDuration *
    efficientFixturesKitchenSink__st_waterDomesticShowerFlow;

  const waterDomesticWashClothes =
    efficientFixturesKitchenSink__st_waterDomesticWashClothesDaily *
    efficientFixturesKitchenSink__st_waterDomesticWashClothesDuration *
    efficientFixturesKitchenSink__st_waterDomesticWashClothesFlow;

  const waterDomesticWashUtensils =
    efficientFixturesKitchenSink__st_waterDomesticWashUtensilsDaily *
    efficientFixturesKitchenSink__st_waterDomesticWashUtensilsDuration *
    efficientFixturesKitchenSink__st_waterDomesticWashUtensilsFlow;

  const waterResidentialDomestic =
    waterDomesticHealthFaucet +
    waterDomesticFaucet +
    waterDomesticKitchenSink +
    waterDomesticShower +
    waterDomesticWashClothes +
    waterDomesticWashUtensils;

  const waterClubHouseDomesticHealthFaucet =
    efficientFixturesKitchenSink__st_waterClubHouseDomesticHealthFaucetDaily *
    efficientFixturesKitchenSink__st_waterClubHouseDomesticHealthFaucetDuration *
    efficientFixturesKitchenSink__st_waterDomesticHealthFaucetFlow;

  const waterClubHouseDomesticFaucet =
    efficientFixturesKitchenSink__st_waterClubHouseDomesticFaucetDaily *
    efficientFixturesKitchenSink__st_waterClubHouseDomesticFaucetDuration *
    efficientFixturesKitchenSink__st_waterDomesticFaucetFlow;

  const waterClubHouseDomesticShower =
    efficientFixturesKitchenSink__st_waterClubHouseDomesticShowerDaily *
    efficientFixturesKitchenSink__st_waterClubHouseDomesticShowerDuration *
    efficientFixturesKitchenSink__st_waterDomesticShowerFlow;

  const waterClubHouseDomestic =
    waterClubHouseDomesticHealthFaucet +
    waterClubHouseDomesticFaucet +
    waterClubHouseDomesticShower;

  const efDomesticDaily =
    (waterResidentialDomestic * efTotalOccupancy +
      waterClubHouseDomestic * efClubHouseOccupancy) /
    global__st_globalLToKlConverter;
  const effFlowDiagramDomestic = efksAnnualWater / global__st_globalDaysInAYear;

  const donut2Value = (effFlowDiagramDomestic * 100) / efDomesticDaily;

  return {
    donut1Title,
    donut1Value,
    donut2Title,
    donut2Value,
  };}
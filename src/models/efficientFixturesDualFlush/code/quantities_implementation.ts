import { irr } from 'node-irr'; import { HwmDemandAssumptionBase, HwmDemandAssumptionVilla, HwmDemandAssumptionPenthouse, DemandAssumptionApartment, HwmDemandByBath, HwmOption, HeatPumpType, SwhType, SwhVariant, HpType, HwmHpHeatingSpeed, SdPlusInterventions, CurrentWaterTableRow, CurrentWaterTable, CurrentWaterTableInputsRow, CurrentWaterTableInputs, WaterPreSdPlusRow, WaterPreSdPlus, PlumbingDetailsPreSdPlus, EFCalculator, StpCalculator, PreSDPlusDemand, OutcomesPreSdPlus } from '../../../utilities/types'; import * as utilities from '../../../utilities/utility'; import { CityDbData, SDPlusDefaultsStore } from '../../../utilities/stores';export  function efficientFixturesDualFlush__q_outcomes(efficientFixturesDualFlush__pi_city:string,global__st_globalDaysInAYear:number,efficientFixturesDualFlush__q_efdfDailyPreSdPlus,efficientFixturesDualFlush__q_efdfDaily,efficientFixturesDualFlush__q_efdfFullWcCapexPostSDPlus,efficientFixturesDualFlush__q_efdfFullWcCapexPreSDPlus){const efdfDailyPreSdPlus = efficientFixturesDualFlush__q_efdfDailyPreSdPlus;

  const efdfDaily = efficientFixturesDualFlush__q_efdfDaily;

  const efdfAnnualWater =
    (efdfDailyPreSdPlus - efdfDaily) * global__st_globalDaysInAYear;

  const efdfCapex =
    efficientFixturesDualFlush__q_efdfFullWcCapexPostSDPlus -
    efficientFixturesDualFlush__q_efdfFullWcCapexPreSDPlus;

  const efdfOpex = utilities.utility_waterOpex(
    efficientFixturesDualFlush__pi_city,
    efdfAnnualWater
  );

  return {
    efdfDailyPreSdPlus,
    efdfDaily,
    efdfAnnualWater,
    efdfCapex,
    efdfOpex,
  };}
export  function efficientFixturesDualFlush__q_efdfDailyPreSdPlus(efficientFixturesDualFlush__pi_projectCategory:string,global__st_globalLToKlConverter:number,efficientFixturesDualFlush__q_occupancyTotalOccupancyVilla,efficientFixturesDualFlush__q_occupancyClubhouseOccupancyVilla,efficientFixturesDualFlush__q_occupancyTotalOccupancyApartment,efficientFixturesDualFlush__q_occupancyClubhouseOccupancyApartment,efficientFixturesDualFlush__q_waterFlushingFullWcPreSDPlus,efficientFixturesDualFlush__q_waterFlushingHalfWcPreSDPlus,efficientFixturesDualFlush__q_waterClubHouseFlushingFullWcPreSDPlus,efficientFixturesDualFlush__q_waterClubHouseFlushingHalfWcPreSDPlus){const waterResidentialFlushingPreSDPlus =
    efficientFixturesDualFlush__q_waterFlushingFullWcPreSDPlus +
    efficientFixturesDualFlush__q_waterFlushingHalfWcPreSDPlus;

  // EF Occupancy Calc Starts
  let efTotalOccupancy = 0;
  let efClubHouseOccupancy = 0;

  if (efficientFixturesDualFlush__pi_projectCategory === 'Villa') {
    efTotalOccupancy =
      efficientFixturesDualFlush__q_occupancyTotalOccupancyVilla;

    efClubHouseOccupancy =
      efficientFixturesDualFlush__q_occupancyClubhouseOccupancyVilla;
  } else {
    efTotalOccupancy =
      efficientFixturesDualFlush__q_occupancyTotalOccupancyApartment;

    efClubHouseOccupancy =
      efficientFixturesDualFlush__q_occupancyClubhouseOccupancyApartment;
  }

  // EF Occupancy Calc Ends
  const waterClubHouseFlushingPreSDPlus =
    efficientFixturesDualFlush__q_waterClubHouseFlushingFullWcPreSDPlus +
    efficientFixturesDualFlush__q_waterClubHouseFlushingHalfWcPreSDPlus;

  const efdfDailyPreSdPlus =
    (waterResidentialFlushingPreSDPlus * efTotalOccupancy +
      waterClubHouseFlushingPreSDPlus * efClubHouseOccupancy) /
    global__st_globalLToKlConverter;

  return efdfDailyPreSdPlus;}
export  function efficientFixturesDualFlush__q_waterFlushingFullWcPreSDPlus(efficientFixturesDualFlush__st_waterFlushingFullWcDaily:number,efficientFixturesDualFlush__st_waterFlushingFullWcDuration:number,efficientFixturesDualFlush__st_waterFlushingFullWcFlowPreSDPlus:number){const waterFlushingFullWcPreSDPlus =
    efficientFixturesDualFlush__st_waterFlushingFullWcDaily *
    efficientFixturesDualFlush__st_waterFlushingFullWcDuration *
    efficientFixturesDualFlush__st_waterFlushingFullWcFlowPreSDPlus;

  return waterFlushingFullWcPreSDPlus;}
export  function efficientFixturesDualFlush__q_waterFlushingHalfWcPreSDPlus(efficientFixturesDualFlush__st_waterFlushingHalfWcDaily:number,efficientFixturesDualFlush__st_waterFlushingHalfWcDuration:number,efficientFixturesDualFlush__st_waterFlushingHalfWcFlowPreSDPlus:number){const waterFlushingHalfWcPreSDPlus =
    efficientFixturesDualFlush__st_waterFlushingHalfWcDaily *
    efficientFixturesDualFlush__st_waterFlushingHalfWcDuration *
    efficientFixturesDualFlush__st_waterFlushingHalfWcFlowPreSDPlus;

  return waterFlushingHalfWcPreSDPlus;}
export  function efficientFixturesDualFlush__q_waterClubHouseFlushingFullWcPreSDPlus(efficientFixturesDualFlush__st_waterClubHouseFlushingFullWcDaily:number,efficientFixturesDualFlush__st_waterClubHouseFlushingFullWcDuration:number,efficientFixturesDualFlush__st_waterFlushingFullWcFlowPreSDPlus:number){const waterClubHouseFlushingFullWcPreSDPlus =
efficientFixturesDualFlush__st_waterClubHouseFlushingFullWcDaily *
efficientFixturesDualFlush__st_waterClubHouseFlushingFullWcDuration *
efficientFixturesDualFlush__st_waterFlushingFullWcFlowPreSDPlus;
return waterClubHouseFlushingFullWcPreSDPlus;}
export  function efficientFixturesDualFlush__q_waterClubHouseFlushingHalfWcPreSDPlus(efficientFixturesDualFlush__st_waterClubHouseFlushingHalfWcDaily:number,efficientFixturesDualFlush__st_waterClubHouseFlushingHalfWcDuration:number,efficientFixturesDualFlush__st_waterFlushingHalfWcFlowPreSDPlus:number){const waterClubHouseFlushingHalfWcPreSDPlus =
efficientFixturesDualFlush__st_waterClubHouseFlushingHalfWcDaily *
efficientFixturesDualFlush__st_waterClubHouseFlushingHalfWcDuration *
efficientFixturesDualFlush__st_waterFlushingHalfWcFlowPreSDPlus;
return waterClubHouseFlushingHalfWcPreSDPlus;}
export  function efficientFixturesDualFlush__q_efdfDaily(efficientFixturesDualFlush__pi_projectCategory:string,efficientFixturesDualFlush__st_waterClubHouseDomesticFaucetDaily:number,efficientFixturesDualFlush__st_waterClubHouseDomesticFaucetDuration:number,efficientFixturesDualFlush__st_waterDomesticFaucetFlow:number,global__st_globalLToKlConverter:number,efficientFixturesDualFlush__q_occupancyTotalOccupancyVilla,efficientFixturesDualFlush__q_occupancyClubhouseOccupancyVilla,efficientFixturesDualFlush__q_occupancyTotalOccupancyApartment,efficientFixturesDualFlush__q_occupancyClubhouseOccupancyApartment,efficientFixturesDualFlush__q_waterClubHouseFlushingFullWc,efficientFixturesDualFlush__q_waterClubHouseFlushingHalfWc,efficientFixturesDualFlush__q_waterFlushingFullWc,efficientFixturesDualFlush__q_waterFlushingHalfWc){// Water. Residential Flushing
  // Water. ClubHouse Flushing

  const waterResidentialFlushing =
    efficientFixturesDualFlush__q_waterFlushingFullWc +
    efficientFixturesDualFlush__q_waterFlushingHalfWc;

  const waterClubHouseFlushing =
    efficientFixturesDualFlush__q_waterClubHouseFlushingFullWc +
    efficientFixturesDualFlush__q_waterClubHouseFlushingHalfWc;

  // EF Occupancy Calc Starts
  let efTotalOccupancy = 0;
  let efClubHouseOccupancy = 0;

  if (efficientFixturesDualFlush__pi_projectCategory === 'Villa') {
    efTotalOccupancy =
      efficientFixturesDualFlush__q_occupancyTotalOccupancyVilla;
    efClubHouseOccupancy =
      efficientFixturesDualFlush__q_occupancyClubhouseOccupancyVilla;
  } else {
    efTotalOccupancy =
      efficientFixturesDualFlush__q_occupancyTotalOccupancyApartment;
    efClubHouseOccupancy =
      efficientFixturesDualFlush__q_occupancyClubhouseOccupancyApartment;
  }

  // EF Occupancy Calc Ends

  const effDaily =
    waterResidentialFlushing * efTotalOccupancy +
    (waterClubHouseFlushing * efClubHouseOccupancy) /
      global__st_globalLToKlConverter;

  return effDaily;}
export  function efficientFixturesDualFlush__q_waterFlushingFullWc(efficientFixturesDualFlush__st_waterFlushingFullWcDaily:number,efficientFixturesDualFlush__st_WaterFlushingFullWcDuration:number){const product = utilities.utility_efDualFlushProductResolver();
  const WaterFlushingFullWcFlow = product.fullFlush;

  const waterFlushingFullWC =
    efficientFixturesDualFlush__st_waterFlushingFullWcDaily *
    efficientFixturesDualFlush__st_WaterFlushingFullWcDuration *
    WaterFlushingFullWcFlow;

  return waterFlushingFullWC;}
export  function efficientFixturesDualFlush__q_waterFlushingHalfWc(efficientFixturesDualFlush__st_waterFlushingHalfWcDaily:number,efficientFixturesDualFlush__st_WaterFlushingHalfWcDuration:number){const product = utilities.utility_efDualFlushProductResolver();
  const WaterFlushingHalfWcFlow = product.halfFlush;

  const waterFlushingHalfWC =
    efficientFixturesDualFlush__st_waterFlushingHalfWcDaily *
    efficientFixturesDualFlush__st_WaterFlushingHalfWcDuration *
    WaterFlushingHalfWcFlow;

  return waterFlushingHalfWC;}
export  function efficientFixturesDualFlush__q_waterClubHouseFlushingFullWc(efficientFixturesDualFlush__st_waterClubHouseFlushingFullWcDaily:number,efficientFixturesDualFlush__st_waterClubHouseFlushingFullWcDuration:number,efficientFixturesDualFlush__st_waterFlushingFullWcFlow:number){const waterClubHouseFlushingFullWc =
efficientFixturesDualFlush__st_waterClubHouseFlushingFullWcDaily *
efficientFixturesDualFlush__st_waterClubHouseFlushingFullWcDuration *
efficientFixturesDualFlush__st_waterFlushingFullWcFlow;
return waterClubHouseFlushingFullWc;}
export  function efficientFixturesDualFlush__q_waterClubHouseFlushingHalfWc(efficientFixturesDualFlush__st_waterClubHouseFlushingHalfWcDaily:number,efficientFixturesDualFlush__st_waterClubHouseFlushingHalfWcDuration:number,efficientFixturesDualFlush__st_waterFlushingHalfWcFlow:number){const waterClubHouseFlushingHalfWc =
efficientFixturesDualFlush__st_waterClubHouseFlushingHalfWcDaily *
efficientFixturesDualFlush__st_waterClubHouseFlushingHalfWcDuration *
efficientFixturesDualFlush__st_waterFlushingHalfWcFlow;
return waterClubHouseFlushingHalfWc;}
export  function efficientFixturesDualFlush__q_efdfFullWcCapexPostSDPlus(efficientFixturesDualFlush__q_efdfResidentialFullWcCapexPostSDPlus,efficientFixturesDualFlush__q_efdfClubHouseFullWcCapexPostSDPlus){efficientFixturesDualFlush__q_efdfResidentialFullWcCapexPostSDPlus +
efficientFixturesDualFlush__q_efdfClubHouseFullWcCapexPostSDPlus;}
export  function efficientFixturesDualFlush__q_efdfFullWcCapexPreSDPlus(efficientFixturesDualFlush__q_efdfResidentialFullWcCapexPreSDPlus,efficientFixturesDualFlush__q_efdfClubHouseFullWcCapexPreSDPlus){return (
efficientFixturesDualFlush__q_efdfResidentialFullWcCapexPreSDPlus +
efficientFixturesDualFlush__q_efdfClubHouseFullWcCapexPreSDPlus
);}
export  function efficientFixturesDualFlush__q_efdfResidentialFullWcCapexPostSDPlus(efficientFixturesDualFlush__pi_projectStudio:number,efficientFixturesDualFlush__pi_project1BHK:number,efficientFixturesDualFlush__pi_project2BHK:number,efficientFixturesDualFlush__pi_project3BHK:number,efficientFixturesDualFlush__pi_project4BHK:number,efficientFixturesDualFlush__st_efdfStudioFlushingFullWc:number,efficientFixturesDualFlush__st_efdf1BHKFlushingFullWc:number,efficientFixturesDualFlush__st_efdf2BHKFlushingFullWc:number,efficientFixturesDualFlush__st_efdf3BHKFlushingFullWc:number,efficientFixturesDualFlush__st_efdf4BHKFlushingFullWc:number,efficientFixturesDualFlush__st_waterFlushingFullWcPrice:number){return (
efficientFixturesDualFlush__pi_projectStudio *
  efficientFixturesDualFlush__st_efdfStudioFlushingFullWc +
efficientFixturesDualFlush__pi_project1BHK *
  efficientFixturesDualFlush__st_efdf1BHKFlushingFullWc +
efficientFixturesDualFlush__pi_project2BHK *
  efficientFixturesDualFlush__st_efdf2BHKFlushingFullWc +
efficientFixturesDualFlush__pi_project3BHK *
  efficientFixturesDualFlush__st_efdf3BHKFlushingFullWc +
efficientFixturesDualFlush__pi_project4BHK *
  efficientFixturesDualFlush__st_efdf4BHKFlushingFullWc *
  efficientFixturesDualFlush__st_waterFlushingFullWcPrice
);}
export  function efficientFixturesDualFlush__q_efdfClubHouseFullWcCapexPostSDPlus(efficientFixturesDualFlush__st_includeClubHouse:string,efficientFixturesDualFlush__st_efdfClubHouseFlushingFullWc:number,efficientFixturesDualFlush__st_waterFlushingFullWcPrice:number){let projectClubHouse = 0;
  if (efficientFixturesDualFlush__st_includeClubHouse === 'Yes') {
    projectClubHouse = 1;
  }

  return (
    projectClubHouse *
    efficientFixturesDualFlush__st_efdfClubHouseFlushingFullWc *
    efficientFixturesDualFlush__st_waterFlushingFullWcPrice
  );}
export  function efficientFixturesDualFlush__q_efdfResidentialFullWcCapexPreSDPlus(efficientFixturesDualFlush__pi_projectStudio:number,efficientFixturesDualFlush__pi_project1BHK:number,efficientFixturesDualFlush__pi_project2BHK:number,efficientFixturesDualFlush__pi_project3BHK:number,efficientFixturesDualFlush__pi_project4BHK:number,efficientFixturesDualFlush__pi_waterFlushingFullWcPricePreSdPlus:number,efficientFixturesDualFlush__st_efdfStudioFlushingFullWc:number,efficientFixturesDualFlush__st_efdf1BHKFlushingFullWc:number,efficientFixturesDualFlush__st_efdf2BHKFlushingFullWc:number,efficientFixturesDualFlush__st_efdf3BHKFlushingFullWc:number,efficientFixturesDualFlush__st_efdf4BHKFlushingFullWc:number){return (
efficientFixturesDualFlush__pi_projectStudio *
  efficientFixturesDualFlush__st_efdfStudioFlushingFullWc +
efficientFixturesDualFlush__pi_project1BHK *
  efficientFixturesDualFlush__st_efdf1BHKFlushingFullWc +
efficientFixturesDualFlush__pi_project2BHK *
  efficientFixturesDualFlush__st_efdf2BHKFlushingFullWc +
efficientFixturesDualFlush__pi_project3BHK *
  efficientFixturesDualFlush__st_efdf3BHKFlushingFullWc +
efficientFixturesDualFlush__pi_project4BHK *
  efficientFixturesDualFlush__st_efdf4BHKFlushingFullWc *
  efficientFixturesDualFlush__pi_waterFlushingFullWcPricePreSdPlus
);}
export  function efficientFixturesDualFlush__q_efdfClubHouseFullWcCapexPreSDPlus(efficientFixturesDualFlush__pi_waterFlushingFullWCPricePreSdPlus:number,efficientFixturesDualFlush__st_includeClubHouse:string,efficientFixturesDualFlush__st_efdfClubHouseFlushingFullWC:number){let projectClubHouse = 0;
  if (efficientFixturesDualFlush__st_includeClubHouse === 'Yes') {
    projectClubHouse = 1;
  }

  return (
    projectClubHouse *
    efficientFixturesDualFlush__st_efdfClubHouseFlushingFullWC *
    efficientFixturesDualFlush__pi_waterFlushingFullWCPricePreSdPlus
  );}
export  function efficientFixturesDualFlush__q_effCapexPostSdPlus(efficientFixturesDualFlush__pi_projectStudio:number,efficientFixturesDualFlush__pi_project1Bhk:number,efficientFixturesDualFlush__pi_project2Bhk:number,efficientFixturesDualFlush__pi_project3Bhk:number,efficientFixturesDualFlush__pi_project4Bhk:number,efficientFixturesDualFlush__pi_includeClubHouse:string,efficientFixturesDualFlush__st_effStudioDomesticFaucet:number,efficientFixturesDualFlush__st_eff1BhkDomesticFaucet:number,efficientFixturesDualFlush__st_eff2BhkDomesticFaucet:number,efficientFixturesDualFlush__st_eff3BhkDomesticFaucet:number,efficientFixturesDualFlush__st_eff4BhkDomesticFaucet:number,efficientFixturesDualFlush__st_effClubHouseDomesticFaucet:number,efficientFixturesDualFlush__q_effResidentialFaucetCapexPreSdPlus){const product = utilities.utility_efHealthFaucetProductResolver();

  let waterDomesticFaucetPrice = 0;
  if (product.length) {
    waterDomesticFaucetPrice = utilities.utility_numberFromString(
      product.price
    );
  }

  const effResidentialFaucetCapexPostSdPlus =
    (efficientFixturesDualFlush__pi_projectStudio *
      efficientFixturesDualFlush__st_effStudioDomesticFaucet +
      efficientFixturesDualFlush__pi_project1Bhk *
        efficientFixturesDualFlush__st_eff1BhkDomesticFaucet +
      efficientFixturesDualFlush__pi_project2Bhk *
        efficientFixturesDualFlush__st_eff2BhkDomesticFaucet +
      efficientFixturesDualFlush__pi_project3Bhk *
        efficientFixturesDualFlush__st_eff3BhkDomesticFaucet +
      efficientFixturesDualFlush__pi_project4Bhk *
        efficientFixturesDualFlush__st_eff4BhkDomesticFaucet) *
    waterDomesticFaucetPrice;

  let projectClubHouse = 0;
  if (efficientFixturesDualFlush__pi_includeClubHouse === 'Yes') {
    projectClubHouse = 1;
  }

  const effClubHouseFaucetCapexPostSdPlus =
    projectClubHouse *
    efficientFixturesDualFlush__st_effClubHouseDomesticFaucet *
    waterDomesticFaucetPrice;

  let effCapexPostSdPlus;
  if (product.aeratorType == 'Built-in Aerator') {
    effCapexPostSdPlus =
      effResidentialFaucetCapexPostSdPlus +
      effClubHouseFaucetCapexPostSdPlus +
      efficientFixturesDualFlush__q_effResidentialFaucetCapexPreSdPlus;
  } else {
    effCapexPostSdPlus =
      effResidentialFaucetCapexPostSdPlus + effClubHouseFaucetCapexPostSdPlus;
  }

  return (
    effResidentialFaucetCapexPostSdPlus + effClubHouseFaucetCapexPostSdPlus
  );}
export  function efficientFixturesDualFlush__q_effResidentialFaucetCapexPreSdPlus(efficientFixturesDualFlush__pi_projectStudio:number,efficientFixturesDualFlush__pi_project1Bhk:number,efficientFixturesDualFlush__pi_project2Bhk:number,efficientFixturesDualFlush__pi_project3Bhk:number,efficientFixturesDualFlush__pi_project4Bhk:number,efficientFixturesDualFlush__st_effStudioDomesticFaucet:number,efficientFixturesDualFlush__st_eff1BhkDomesticFaucet:number,efficientFixturesDualFlush__st_eff2BhkDomesticFaucet:number,efficientFixturesDualFlush__st_eff3BhkDomesticFaucet:number,efficientFixturesDualFlush__st_eff4BhkDomesticFaucet:number,efficientFixturesDualFlush__st_waterNbcBaseCaseFaucetPrice:number){const waterDomesticFaucetPricePreSdPlus =
    efficientFixturesDualFlush__st_waterNbcBaseCaseFaucetPrice;

  const effResidentialFaucetCapexPreSdPlus =
    (efficientFixturesDualFlush__pi_projectStudio *
      efficientFixturesDualFlush__st_effStudioDomesticFaucet +
      efficientFixturesDualFlush__pi_project1Bhk *
        efficientFixturesDualFlush__st_eff1BhkDomesticFaucet +
      efficientFixturesDualFlush__pi_project2Bhk *
        efficientFixturesDualFlush__st_eff2BhkDomesticFaucet +
      efficientFixturesDualFlush__pi_project3Bhk *
        efficientFixturesDualFlush__st_eff3BhkDomesticFaucet +
      efficientFixturesDualFlush__pi_project4Bhk *
        efficientFixturesDualFlush__st_eff4BhkDomesticFaucet) *
    waterDomesticFaucetPricePreSdPlus;

  return effResidentialFaucetCapexPreSdPlus;}
export  function efficientFixturesDualFlush__q_effClubHouseFaucetCapexPreSdPlus(efficientFixturesDualFlush__pi_includeClubHouse:string,efficientFixturesDualFlush__st_waterNbcBaseCaseFaucetPrice:number,efficientFixturesDualFlush__st_effClubHouseDomesticFaucet:number){const waterDomesticFaucetPricePreSdPlus =
    efficientFixturesDualFlush__st_waterNbcBaseCaseFaucetPrice;

  let projectClubHouse = 0;
  if (efficientFixturesDualFlush__pi_includeClubHouse === 'Yes') {
    projectClubHouse = 1;
  }

  return (
    projectClubHouse *
    efficientFixturesDualFlush__st_effClubHouseDomesticFaucet *
    waterDomesticFaucetPricePreSdPlus
  );}
export  function efficientFixturesDualFlush__q_igbcOccupanyVilla(efficientFixturesDualFlush__pi_projectVilla1Bhk:number,efficientFixturesDualFlush__pi_projectVilla2Bhk:number,efficientFixturesDualFlush__pi_projectVilla3Bhk:number,efficientFixturesDualFlush__pi_projectVilla4Bhk:number,efficientFixturesDualFlush__st_igbc1BhkRefOccupancy:number,efficientFixturesDualFlush__st_igbc2BhkRefOccupancy:number,efficientFixturesDualFlush__st_igbc3BhkRefOccupancy:number,efficientFixturesDualFlush__st_igbc4BhkRefOccupancy:number){return (
efficientFixturesDualFlush__pi_projectVilla1Bhk *
  efficientFixturesDualFlush__st_igbc1BhkRefOccupancy +
efficientFixturesDualFlush__pi_projectVilla2Bhk *
  efficientFixturesDualFlush__st_igbc2BhkRefOccupancy +
efficientFixturesDualFlush__pi_projectVilla3Bhk *
  efficientFixturesDualFlush__st_igbc3BhkRefOccupancy +
efficientFixturesDualFlush__pi_projectVilla4Bhk *
  efficientFixturesDualFlush__st_igbc4BhkRefOccupancy
);}
export  function efficientFixturesDualFlush__q_occupancyTotalOccupancyVilla(occupancy__pi_villaStudio:number,occupancy__pi_villaOneBHK:number,occupancy__pi_villaTwoBHK:number,occupancy__pi_villaThreeBHK:number,occupancy__pi_villaFourBHK:number,occupancy__st_studioRefOccupancy:number,occupancy__st_villaOneBHKRefOccupancy:number,occupancy__st_villaTwoBHKRefOccupancy:number,occupancy__st_villaThreeBHKRefOccupancy:number,occupancy__st_villaFourBHKRefOccupancy:number,efficientFixturesDualFlush__st_projectHousekeepingRefOccupancy:number,occupancy__q_occupancyVilla){const totalOccupancyVilla =
    occupancy__q_occupancyVilla *
    (1 + efficientFixturesDualFlush__st_projectHousekeepingRefOccupancy);

  return totalOccupancyVilla;}
export  function efficientFixturesDualFlush__q_igbcOccupanyApartment(efficientFixturesDualFlush__pi_projectStudio:number,efficientFixturesDualFlush__pi_project1Bhk:number,efficientFixturesDualFlush__pi_project2Bhk:number,efficientFixturesDualFlush__pi_project3Bhk:number,efficientFixturesDualFlush__pi_project4Bhk:number,efficientFixturesDualFlush__st_igbcStudioRefOccupancy:number,efficientFixturesDualFlush__st_igbc1BhkRefOccupancy:number,efficientFixturesDualFlush__st_igbc2BhkRefOccupancy:number,efficientFixturesDualFlush__st_igbc3BhkRefOccupancy:number,efficientFixturesDualFlush__st_igbc4BhkRefOccupancy:number){return (
efficientFixturesDualFlush__pi_projectStudio +
efficientFixturesDualFlush__st_igbcStudioRefOccupancy +
(efficientFixturesDualFlush__pi_project1Bhk +
  efficientFixturesDualFlush__st_igbc1BhkRefOccupancy) +
(efficientFixturesDualFlush__pi_project2Bhk +
  efficientFixturesDualFlush__st_igbc2BhkRefOccupancy) +
(efficientFixturesDualFlush__pi_project3Bhk +
  efficientFixturesDualFlush__st_igbc3BhkRefOccupancy) +
(efficientFixturesDualFlush__pi_project4Bhk +
  efficientFixturesDualFlush__st_igbc4BhkRefOccupancy)
);}
export  function efficientFixturesDualFlush__q_occupancyTotalOccupancyApartment(efficientFixturesDualFlush__pi_projectStudio:number,efficientFixturesDualFlush__pi_project1Bhk:number,efficientFixturesDualFlush__pi_project2Bhk:number,efficientFixturesDualFlush__pi_project3Bhk:number,efficientFixturesDualFlush__pi_project4Bhk:number,occupancy__pi_penthouseStudio:number,occupancy__pi_penthouseOneBHK:number,occupancy__pi_penthouseTwoBHK:number,occupancy__pi_penthouseThreeBHK:number,occupancy__pi_penthouseFourBHK:number,efficientFixturesDualFlush__st_projectStudioRefOccupancy:number,efficientFixturesDualFlush__st_project1BhkRefOccupancy:number,efficientFixturesDualFlush__st_project2BhkRefOccupancy:number,efficientFixturesDualFlush__st_project3BhkRefOccupancy:number,efficientFixturesDualFlush__st_project4BhkRefOccupancy:number,efficientFixturesDualFlush__st_projectHousekeepingRefOccupancy:number,occupancy__st_studioRefOccupancy:number,occupancy__st_penthouseOneBHKRefOccupancy:number,occupancy__st_penthouseTwoBHKRefOccupancy:number,occupancy__st_penthouseThreeBHKRefOccupancy:number,occupancy__st_penthouseFourBHKRefOccupancy:number,occupancy__q_occupancyApartment,occupancy__q_occupancyPenthouse){const totalOccupancyApartment =
    (occupancy__q_occupancyApartment + occupancy__q_occupancyPenthouse) *
    (1 + efficientFixturesDualFlush__st_projectHousekeepingRefOccupancy);

  return totalOccupancyApartment;}
export  function efficientFixturesDualFlush__q_occupancyClubhouseOccupancyApartment(occupancy__pi_studio:number,occupancy__pi_oneBHK:number,occupancy__pi_twoBHK:number,occupancy__pi_threeBHK:number,occupancy__pi_fourBHK:number,occupancy__pi_penthouseStudio:number,occupancy__pi_penthouseOneBHK:number,occupancy__pi_penthouseTwoBHK:number,occupancy__pi_penthouseThreeBHK:number,occupancy__pi_penthouseFourBHK:number,efficientFixturesDualFlush__pi_includeClubHouse:string,occupancy__st_studioRefOccupancy:number,occupancy__st_oneBHKRefOccupancy:number,occupancy__st_twoBHKRefOccupancy:number,occupancy__st_threeBHKRefOccupancy:number,occupancy__st_fourBHKRefOccupancy:number,occupancy__st_penthouseOneBHKRefOccupancy:number,occupancy__st_penthouseTwoBHKRefOccupancy:number,occupancy__st_penthouseThreeBHKRefOccupancy:number,occupancy__st_penthouseFourBHKRefOccupancy:number,efficientFixturesDualFlush__st_clubHouseRefOccupancy:number,occupancy__q_occupancyApartment,occupancy__q_occupancyPenthouse){let clubHouseRefOccupancy = 0.1;
  if (efficientFixturesDualFlush__pi_includeClubHouse === 'Yes') {
    clubHouseRefOccupancy =
      efficientFixturesDualFlush__st_clubHouseRefOccupancy;
  }

  const clubHouseOccupancyApartment =
    (occupancy__q_occupancyApartment + occupancy__q_occupancyPenthouse) *
    clubHouseRefOccupancy;

  return clubHouseOccupancyApartment;}
export  function efficientFixturesDualFlush__q_igbcOccupanyPenthouse(efficientFixturesDualFlush__pi_projectPhStudio:number,efficientFixturesDualFlush__pi_projectPh1Bhk:number,efficientFixturesDualFlush__pi_projectPh2Bhk:number,efficientFixturesDualFlush__pi_projectPh3Bhk:number,efficientFixturesDualFlush__pi_projectPh4Bhk:number,efficientFixturesDualFlush__st_igbcStudioRefOccupancy:number,efficientFixturesDualFlush__st_igbc1BhkRefOccupancy:number,efficientFixturesDualFlush__st_igbc2BhkRefOccupancy:number,efficientFixturesDualFlush__st_igbc3BhkRefOccupancy:number,efficientFixturesDualFlush__st_igbc4BhkRefOccupancy:number){return (
efficientFixturesDualFlush__pi_projectPhStudio *
  efficientFixturesDualFlush__st_igbcStudioRefOccupancy +
efficientFixturesDualFlush__pi_projectPh1Bhk *
  efficientFixturesDualFlush__st_igbc1BhkRefOccupancy +
efficientFixturesDualFlush__pi_projectPh2Bhk *
  efficientFixturesDualFlush__st_igbc2BhkRefOccupancy +
efficientFixturesDualFlush__pi_projectPh3Bhk *
  efficientFixturesDualFlush__st_igbc3BhkRefOccupancy +
efficientFixturesDualFlush__pi_projectPh4Bhk *
  efficientFixturesDualFlush__st_igbc4BhkRefOccupancy
);}
export  function efficientFixturesDualFlush__q_occupancyClubhouseOccupancyVilla(efficientFixturesDualFlush__pi_includeClubHouse:string,efficientFixturesDualFlush__st_clubHouseRefOccupancy:number,occupancy__q_occupancyVilla){let clubHouseRefOccupancy = 0.1;
  if (efficientFixturesDualFlush__pi_includeClubHouse === 'Yes') {
    clubHouseRefOccupancy =
      efficientFixturesDualFlush__st_clubHouseRefOccupancy;
  }

  const clubHouseOccupancyVilla =
    occupancy__q_occupancyVilla * clubHouseRefOccupancy;

  return clubHouseOccupancyVilla;}
export  function efficientFixturesDualFlush__q_igbcOutcomes(efficientFixturesDualFlush__pi_projectCategory:string,efficientFixturesDualFlush__pi_city:string,efficientFixturesDualFlush__st_igbcDomesticShowerDaily:number,efficientFixturesDualFlush__st_igbcDomesticShowerDuration:number,efficientFixturesDualFlush__st_igbcDomesticShowerFlowPreSDPlus:number,efficientFixturesDualFlush__st_waterDomesticShowerDaily:number,efficientFixturesDualFlush__st_waterDomesticShowerDuration:number,global__st_globalDaysInAYear:number,global__st_globalLToKlConverter:number,efficientFixturesDualFlush__q_igbcOccupanyVilla,efficientFixturesDualFlush__q_igbcOccupanyApartment,efficientFixturesDualFlush__q_igbcOccupanyPenthouse){const igbcDomesticShowerPreSDPlus =
    efficientFixturesDualFlush__st_igbcDomesticShowerDaily *
    efficientFixturesDualFlush__st_igbcDomesticShowerDuration *
    efficientFixturesDualFlush__st_igbcDomesticShowerFlowPreSDPlus;

  // EF Occupancy Calc Starts
  let efIgbcOccupancy = 0;

  if (efficientFixturesDualFlush__pi_projectCategory === 'Villa') {
    efIgbcOccupancy = efficientFixturesDualFlush__q_igbcOccupanyVilla;
  } else {
    efIgbcOccupancy =
      efficientFixturesDualFlush__q_igbcOccupanyApartment +
      efficientFixturesDualFlush__q_igbcOccupanyPenthouse;
  }
  // EF Occupancy Calc Ends

  // Actual Calc
  const efsIgbcDailyPreSdPlus =
    (igbcDomesticShowerPreSDPlus * efIgbcOccupancy) /
    global__st_globalLToKlConverter;

  const product = utilities.utility_efHealthFaucetProductResolver();

  const waterDomesticShower =
    product.Flowrate *
    efficientFixturesDualFlush__st_waterDomesticShowerDaily *
    efficientFixturesDualFlush__st_waterDomesticShowerDuration;

  const efsIgbcDaily =
    (waterDomesticShower * efIgbcOccupancy) / global__st_globalLToKlConverter;

  const efsIgbcDailySavings = efsIgbcDailyPreSdPlus - efsIgbcDaily;

  const efsIgbcAnnualWater = efsIgbcDailySavings * global__st_globalDaysInAYear;
  const efsIgBcOpex = utilities.utility_waterOpex(
    efficientFixturesDualFlush__pi_city,
    efsIgbcAnnualWater
  );

  return {
    efsIgbcDailyPreSdPlus,
    efsIgbcDaily,
    efsIgbcDailySavings,
    efsIgbcAnnualWater,
    efsIgBcOpex,
  };}
export  function efficientFixturesDualFlush__q_outcomesPreSdPlus(efficientFixturesDualFlush__st_globalDaysInAYear:number,efficientFixturesDualFlush__q_efdfDailyPreSdPlus){return (
efficientFixturesDualFlush__q_efdfDailyPreSdPlus *
efficientFixturesDualFlush__st_globalDaysInAYear
);}
export  function efficientFixturesDualFlush__q_projectLevelInsights(efficientFixturesDualFlush__pi_city:string,efficientFixturesDualFlush__pi_studio:number,efficientFixturesDualFlush__pi_oneBHK:number,efficientFixturesDualFlush__pi_twoBHK:number,efficientFixturesDualFlush__pi_threeBHK:number,efficientFixturesDualFlush__pi_includeClubHouse:string,efficientFixturesDualFlush__pi_projectLandscapeArea:number,efficientFixturesDualFlush__pi_projectNoOfCarParks:number,efficientFixturesDualFlush__pi_projectSwimmingPoolSurfaceArea:number,efficientFixturesDualFlush__pi_projectAreaOfLobbiesAndCorridors:number,efficientFixturesDualFlush__st_globalKg2tonConv:number,efficientFixturesDualFlush__st_efSdgNumberForEf:number,efficientFixturesDualFlush__st_globalTreesPerTonCf:number,efficientFixturesDualFlush__st_projectHousekeepingRefOccupancy:number,efficientFixturesDualFlush__st_studioRefOccupancy:number,efficientFixturesDualFlush__st_oneBHKRefOccupancy:number,efficientFixturesDualFlush__st_twoBHKRefOccupancy:number,efficientFixturesDualFlush__st_threeBHKRefOccupancy:number,efficientFixturesDualFlush__st_clubHouseRefOccupancy:number,efficientFixturesDualFlush__st_waterDailyLandscapeWaterUse:number,efficientFixturesDualFlush__st_waterDailyCarWashWaterUse:number,efficientFixturesDualFlush__st_waterSwimmingPoolDepth:number,efficientFixturesDualFlush__st_waterWaterPerCubicMeter:number,efficientFixturesDualFlush__st_waterSwimmingPoolEvaporationRate:number,efficientFixturesDualFlush__st_waterDailyLobbiesAndCorridorsWaterUse:number,global__st_globalDaysInAYear:number,global__st_globalLToKlConverter:number,efficientFixturesDualFlush__q_efdfDailyPreSdPlus,efficientFixturesDualFlush__q_efdfDaily,water__q_currentWaterTable){const efdfDailyPreSdPlus = efficientFixturesDualFlush__q_efdfDailyPreSdPlus;
  const efdfDaily = efficientFixturesDualFlush__q_efdfDaily;
  const efdfAnnualWater =
    (efdfDailyPreSdPlus - efdfDaily) * global__st_globalDaysInAYear;

  let cityEmissionFactor: number;
  if (efficientFixturesDualFlush__pi_city === 'Bangalore') {
    cityEmissionFactor = 0.6;
  } else if (efficientFixturesDualFlush__pi_city === 'Bombay') {
    cityEmissionFactor = 0.89;
  }

  const occupancy = utilities.utility_efHfOccupancy(
    efficientFixturesDualFlush__pi_studio,
    efficientFixturesDualFlush__st_studioRefOccupancy,
    efficientFixturesDualFlush__pi_oneBHK,
    efficientFixturesDualFlush__st_oneBHKRefOccupancy,
    efficientFixturesDualFlush__pi_twoBHK,
    efficientFixturesDualFlush__st_twoBHKRefOccupancy,
    efficientFixturesDualFlush__pi_threeBHK,
    efficientFixturesDualFlush__st_threeBHKRefOccupancy
  );

  const totalOccupancy = utilities.utility_efHfTotalOccupancy(
    efficientFixturesDualFlush__pi_studio,
    efficientFixturesDualFlush__st_studioRefOccupancy,
    efficientFixturesDualFlush__pi_oneBHK,
    efficientFixturesDualFlush__st_oneBHKRefOccupancy,
    efficientFixturesDualFlush__pi_twoBHK,
    efficientFixturesDualFlush__st_twoBHKRefOccupancy,
    efficientFixturesDualFlush__pi_threeBHK,
    efficientFixturesDualFlush__st_threeBHKRefOccupancy,
    efficientFixturesDualFlush__st_projectHousekeepingRefOccupancy
  );

  const currentWaterTable = water__q_currentWaterTable;
  const residentialLPCD = currentWaterTable.clientBaseCase.residentialDrinking;
  const clubHouseLPCD = currentWaterTable.clientBaseCase.clubhouseDrinking;

  let chRefOcc = 0;
  if (efficientFixturesDualFlush__pi_includeClubHouse === 'Yes') {
    chRefOcc = efficientFixturesDualFlush__st_clubHouseRefOccupancy;
  }

  const clubHouseOccupancy = occupancy * chRefOcc;

  const waterCommonAreaLandscape =
    efficientFixturesDualFlush__pi_projectLandscapeArea *
    efficientFixturesDualFlush__st_waterDailyLandscapeWaterUse;

  const waterCommonAreaCarPark =
    efficientFixturesDualFlush__pi_projectNoOfCarParks *
    efficientFixturesDualFlush__st_waterDailyCarWashWaterUse;

  const waterCommonAreaCleaning =
    efficientFixturesDualFlush__pi_projectAreaOfLobbiesAndCorridors *
    efficientFixturesDualFlush__st_waterDailyLobbiesAndCorridorsWaterUse;

  const waterSwimmingPool =
    efficientFixturesDualFlush__pi_projectSwimmingPoolSurfaceArea *
    efficientFixturesDualFlush__st_waterSwimmingPoolDepth *
    efficientFixturesDualFlush__st_waterWaterPerCubicMeter *
    efficientFixturesDualFlush__st_waterSwimmingPoolEvaporationRate;

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
  const efdfCfMitigated =
    cityEmissionFactor *
    efdfAnnualWater *
    efficientFixturesDualFlush__st_globalKg2tonConv;

  const efdfSdgNumber = efficientFixturesDualFlush__st_efSdgNumberForEf;

  const efdfTreesSaved =
    efdfCfMitigated * efficientFixturesDualFlush__st_globalTreesPerTonCf;

  const efdfPercentTotalWaterConsumption =
    (efdfAnnualWater * 100) / annualBaselineWaterConsumption;

  return {
    efdfCfMitigated,
    efdfSdgNumber,
    efdfTreesSaved,
    efdfPercentTotalWaterConsumption,
  };
}

// ------------------------------- ProjectLevelInsights ends

//  -------------------------------  Flow Diagram starts -------------------------------

export function efficientFixturesDualFlush__q_flowDiagram(
  efficientFixturesDualFlush__q_efdfDailyPreSdPlus,
  efficientFixturesDualFlush__q_efdfDaily,
  global__st_globalDaysInAYear: number
) {
  const efdfDailyPreSdPlus = efficientFixturesDualFlush__q_efdfDailyPreSdPlus;
  const efdfDaily = efficientFixturesDualFlush__q_efdfDaily;
  const efdfAnnualWater =
    (efdfDailyPreSdPlus - efdfDaily) * global__st_globalDaysInAYear;

  const efdfFlowDiagramDomestic = 0;
  const efdfFlowDiagramHealthFaucet = 0;

  const efdfFlowDiagramFlushing =
    efdfAnnualWater / global__st_globalDaysInAYear;
  const efdfFlowDiagramCommonArea = 0;
  const efdfFlowDiagramDrinking = 0;

  return {
    efdfFlowDiagramDomestic,
    efdfFlowDiagramHealthFaucet,

    efdfFlowDiagramFlushing,
    efdfFlowDiagramCommonArea,
    efdfFlowDiagramDrinking,
  };}
export  function efficientFixturesDualFlush__q_secondaryImpact(efficientFixturesDualFlush__pi_projectNoOfFloors:number,efficientFixturesDualFlush__pi_projectFloorToFloorHeight:number,efficientFixturesDualFlush__st_globalLtoM3converter:number,efficientFixturesDualFlush__st_waterPumpFlowRate:number,efficientFixturesDualFlush__st_globalAccelerationDueToGravity:number,efficientFixturesDualFlush__st_waterSpecificGravity:number,efficientFixturesDualFlush__st_globalJoulesToKwConverter:number,efficientFixturesDualFlush__st_waterPumpEfficiency:number,efficientFixturesDualFlush__st_waterMotorEfficiency:number,efficientFixturesDualFlush__st_city:string,global__st_globalDaysInAYear:number,efficientFixturesDualFlush__q_efdfDailyPreSdPlus,efficientFixturesDualFlush__q_efdfDaily){const efdfDailyPreSdPlus = efficientFixturesDualFlush__q_efdfDailyPreSdPlus;
  const efdfDaily = efficientFixturesDualFlush__q_efdfDaily;
  const efdfAnnualWater =
    (efdfDailyPreSdPlus - efdfDaily) * global__st_globalDaysInAYear;

  const timeTakenToPumpWater =
    (efdfAnnualWater * efficientFixturesDualFlush__st_globalLtoM3converter) /
    efficientFixturesDualFlush__st_waterPumpFlowRate;

  const buildingHeight =
    efficientFixturesDualFlush__pi_projectNoOfFloors *
    efficientFixturesDualFlush__pi_projectFloorToFloorHeight;

  const hydraulicPower =
    (efficientFixturesDualFlush__st_waterPumpFlowRate *
      buildingHeight *
      efficientFixturesDualFlush__st_globalAccelerationDueToGravity *
      efficientFixturesDualFlush__st_waterSpecificGravity) /
    efficientFixturesDualFlush__st_globalJoulesToKwConverter;

  const shaftPower =
    hydraulicPower / efficientFixturesDualFlush__st_waterPumpEfficiency;

  const electricalInput =
    shaftPower / efficientFixturesDualFlush__st_waterMotorEfficiency;
  const efdfPassiveEnergykWh = electricalInput * timeTakenToPumpWater;

  const efdfPassiveEnergyOpex = utilities.utility_energyOpex(
    efdfPassiveEnergykWh,
    efficientFixturesDualFlush__st_city
  );

  const passiveEnergykWh = efdfPassiveEnergykWh;
  const passiveEnergyOpex = efdfPassiveEnergyOpex;
  const passiveWasteKg = 0;
  const passiveWasteOpex = 0;

  return {
    passiveEnergykWh,
    passiveEnergyOpex,
    passiveWasteKg,
    passiveWasteOpex,
  };}
export  function efficientFixturesDualFlush__q_overviewBarGraph(global__st_globalDaysInAYear:number,efficientFixturesDualFlush__q_efdfDailyPreSdPlus,efficientFixturesDualFlush__q_efdfDaily){const efdfDailyPreSdPlus = efficientFixturesDualFlush__q_efdfDailyPreSdPlus;
  const efdfDaily = efficientFixturesDualFlush__q_efdfDaily;
  const efdfAnnualWater =
    (efdfDailyPreSdPlus - efdfDaily) * global__st_globalDaysInAYear;

  const title = 'Dual Flush water usage by category';
  const totalSavings = efdfAnnualWater;

  const seriesName1 = 'Domestic';
  const seriesValue1 = 0;
  const seriesName2 = 'Health Faucet';
  const seriesValue2 = 0;
  const seriesName3 = 'Flushing';
  const seriesValue3 = efdfAnnualWater;
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
export  function efficientFixturesDualFlush__q_overviewDonutGraph(efficientFixturesDualFlush__pi_studio:number,efficientFixturesDualFlush__pi_oneBHK:number,efficientFixturesDualFlush__pi_twoBHK:number,efficientFixturesDualFlush__pi_threeBHK:number,efficientFixturesDualFlush__pi_includeClubHouse:string,efficientFixturesDualFlush__pi_projectLandscapeArea:number,efficientFixturesDualFlush__pi_projectNoOfCarParks:number,efficientFixturesDualFlush__pi_projectAreaOfLobbiesAndCorridors:number,efficientFixturesDualFlush__pi_projectSwimmingPoolSurfaceArea:number,efficientFixturesDualFlush__st_studioRefOccupancy:number,efficientFixturesDualFlush__st_oneBHKRefOccupancy:number,efficientFixturesDualFlush__st_twoBHKRefOccupancy:number,efficientFixturesDualFlush__st_threeBHKRefOccupancy:number,efficientFixturesDualFlush__st_projectHousekeepingRefOccupancy:number,efficientFixturesDualFlush__st_clubHouseRefOccupancy:number,efficientFixturesDualFlush__st_waterDailyLandscapeWaterUse:number,efficientFixturesDualFlush__st_waterDailyCarWashWaterUse:number,efficientFixturesDualFlush__st_waterDailyLobbiesAndCorridorsWaterUse:number,efficientFixturesDualFlush__st_waterSwimmingPoolDepth:number,efficientFixturesDualFlush__st_waterWaterPerCubicMeter:number,efficientFixturesDualFlush__st_waterSwimmingPoolEvaporationRate:number,global__st_globalDaysInAYear:number,global__st_globalLToKlConverter:number,water__q_currentWaterTable,efficientFixturesDualFlush__q_efdfDailyPreSdPlus,efficientFixturesDualFlush__q_efdfDaily){const efdfDailyPreSdPlus = efficientFixturesDualFlush__q_efdfDailyPreSdPlus;
  const efdfDaily = efficientFixturesDualFlush__q_efdfDaily;
  const efdfAnnualWater =
    (efdfDailyPreSdPlus - efdfDaily) * global__st_globalDaysInAYear;

  // Annual Baseline Water Consumption Starts
  const occupancy = utilities.utility_efHfOccupancy(
    efficientFixturesDualFlush__pi_studio,
    efficientFixturesDualFlush__st_studioRefOccupancy,
    efficientFixturesDualFlush__pi_oneBHK,
    efficientFixturesDualFlush__st_oneBHKRefOccupancy,
    efficientFixturesDualFlush__pi_twoBHK,
    efficientFixturesDualFlush__st_twoBHKRefOccupancy,
    efficientFixturesDualFlush__pi_threeBHK,
    efficientFixturesDualFlush__st_threeBHKRefOccupancy
  );

  const totalOccupancy = utilities.utility_efHfTotalOccupancy(
    efficientFixturesDualFlush__pi_studio,
    efficientFixturesDualFlush__st_studioRefOccupancy,
    efficientFixturesDualFlush__pi_oneBHK,
    efficientFixturesDualFlush__st_oneBHKRefOccupancy,
    efficientFixturesDualFlush__pi_twoBHK,
    efficientFixturesDualFlush__st_twoBHKRefOccupancy,
    efficientFixturesDualFlush__pi_threeBHK,
    efficientFixturesDualFlush__st_threeBHKRefOccupancy,
    efficientFixturesDualFlush__st_projectHousekeepingRefOccupancy
  );

  const currentWaterTable = water__q_currentWaterTable;
  const residentialLPCD = currentWaterTable.clientBaseCase.residentialDrinking;
  const clubHouseLPCD = currentWaterTable.clientBaseCase.clubhouseDrinking;

  let chRefOcc = 0;
  if (efficientFixturesDualFlush__pi_includeClubHouse === 'Yes') {
    chRefOcc = efficientFixturesDualFlush__st_clubHouseRefOccupancy;
  }

  const clubHouseOccupancy = occupancy * chRefOcc;

  const waterCommonAreaLandscape =
    efficientFixturesDualFlush__pi_projectLandscapeArea *
    efficientFixturesDualFlush__st_waterDailyLandscapeWaterUse;

  const waterCommonAreaCarPark =
    efficientFixturesDualFlush__pi_projectNoOfCarParks *
    efficientFixturesDualFlush__st_waterDailyCarWashWaterUse;

  const waterCommonAreaCleaning =
    efficientFixturesDualFlush__pi_projectAreaOfLobbiesAndCorridors *
    efficientFixturesDualFlush__st_waterDailyLobbiesAndCorridorsWaterUse;

  const waterSwimmingPool =
    efficientFixturesDualFlush__pi_projectSwimmingPoolSurfaceArea *
    efficientFixturesDualFlush__st_waterSwimmingPoolDepth *
    efficientFixturesDualFlush__st_waterWaterPerCubicMeter *
    efficientFixturesDualFlush__st_waterSwimmingPoolEvaporationRate;

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

  const donut1Title = '% of Total Water';
  const donut1Value = (efdfAnnualWater * 100) / annualBaselineWaterConsumption;

  return {
    donut1Title,
    donut1Value,
  };}
import { irr } from 'node-irr'; import { HwmDemandAssumptionBase, HwmDemandAssumptionVilla, HwmDemandAssumptionPenthouse, DemandAssumptionApartment, HwmDemandByBath, HwmOption, HeatPumpType, SwhType, SwhVariant, HpType, HwmHpHeatingSpeed, SdPlusInterventions, CurrentWaterTableRow, CurrentWaterTable, CurrentWaterTableInputsRow, CurrentWaterTableInputs, WaterPreSdPlusRow, WaterPreSdPlus, PlumbingDetailsPreSdPlus, EFCalculator, StpCalculator, PreSDPlusDemand, OutcomesPreSdPlus } from '../../../utilities/types'; import * as utilities from '../../../utilities/utility'; import { CityDbData, SDPlusDefaultsStore } from '../../../utilities/stores';export  function occupancy__q_numberOfDwellingUnitsApartments(occupancy__pi_studio:number,occupancy__pi_oneBHK:number,occupancy__pi_twoBHK:number,occupancy__pi_threeBHK:number,occupancy__pi_fourBHK:number){return (
occupancy__pi_studio +
occupancy__pi_oneBHK +
occupancy__pi_twoBHK +
occupancy__pi_threeBHK +
occupancy__pi_fourBHK
);}
export  function occupancy__q_numberOfDwellingUnitsVilla(occupancy__pi_villaOneBHK:number,occupancy__pi_villaFourBHK:number,occupancy__pi_villaThreeBHK:number,occupancy__pi_villaTwoBHK:number,occupancy__pi_villaStudio:number){return (
occupancy__pi_villaOneBHK +
occupancy__pi_villaFourBHK +
occupancy__pi_villaThreeBHK +
occupancy__pi_villaTwoBHK +
occupancy__pi_villaStudio
);}
export  function occupancy__q_numberOfDwellingUnitsPenthouse(occupancy__pi_penthouseOneBHK:number,occupancy__pi_penthouseThreeBHK:number,occupancy__pi_penthouseFourBHK:number,occupancy__pi_penthouseTwoBHK:number,occupancy__pi_penthouseStudio:number){return (
occupancy__pi_penthouseOneBHK +
occupancy__pi_penthouseThreeBHK +
occupancy__pi_penthouseFourBHK +
occupancy__pi_penthouseTwoBHK +
occupancy__pi_penthouseStudio
);}
export  function occupancy__q_occupancyApartment(occupancy__pi_studio:number,occupancy__pi_oneBHK:number,occupancy__pi_twoBHK:number,occupancy__pi_threeBHK:number,occupancy__pi_fourBHK:number,occupancy__st_studioRefOccupancy:number,occupancy__st_oneBHKRefOccupancy:number,occupancy__st_twoBHKRefOccupancy:number,occupancy__st_threeBHKRefOccupancy:number,occupancy__st_fourBHKRefOccupancy:number){let occupancy = null;
occupancy =
occupancy__pi_studio * occupancy__st_studioRefOccupancy +
occupancy__pi_oneBHK * occupancy__st_oneBHKRefOccupancy +
occupancy__pi_twoBHK * occupancy__st_twoBHKRefOccupancy +
occupancy__pi_threeBHK * occupancy__st_threeBHKRefOccupancy +
occupancy__pi_fourBHK * occupancy__st_fourBHKRefOccupancy;
return occupancy;}
export  function occupancy__q_occupancyVilla(occupancy__pi_villaStudio:number,occupancy__pi_villaOneBHK:number,occupancy__pi_villaTwoBHK:number,occupancy__pi_villaThreeBHK:number,occupancy__pi_villaFourBHK:number,occupancy__st_studioRefOccupancy:number,occupancy__st_villaOneBHKRefOccupancy:number,occupancy__st_villaTwoBHKRefOccupancy:number,occupancy__st_villaThreeBHKRefOccupancy:number,occupancy__st_villaFourBHKRefOccupancy:number){let occupancy = null;
occupancy =
occupancy__pi_villaStudio * occupancy__st_studioRefOccupancy +
occupancy__pi_villaOneBHK * occupancy__st_villaOneBHKRefOccupancy +
occupancy__pi_villaTwoBHK * occupancy__st_villaTwoBHKRefOccupancy +
occupancy__pi_villaThreeBHK * occupancy__st_villaThreeBHKRefOccupancy +
occupancy__pi_villaFourBHK * occupancy__st_villaFourBHKRefOccupancy;
return occupancy;}
export  function occupancy__q_occupancyPenthouse(occupancy__pi_penthouseStudio:number,occupancy__pi_penthouseOneBHK:number,occupancy__pi_penthouseTwoBHK:number,occupancy__pi_penthouseThreeBHK:number,occupancy__pi_penthouseFourBHK:number,occupancy__st_studioRefOccupancy:number,occupancy__st_penthouseOneBHKRefOccupancy:number,occupancy__st_penthouseTwoBHKRefOccupancy:number,occupancy__st_penthouseThreeBHKRefOccupancy:number,occupancy__st_penthouseFourBHKRefOccupancy:number){let occupancy = null;
occupancy =
occupancy__pi_penthouseStudio * occupancy__st_studioRefOccupancy +
occupancy__pi_penthouseOneBHK * occupancy__st_penthouseOneBHKRefOccupancy +
occupancy__pi_penthouseTwoBHK * occupancy__st_penthouseTwoBHKRefOccupancy +
occupancy__pi_penthouseThreeBHK *
  occupancy__st_penthouseThreeBHKRefOccupancy +
occupancy__pi_penthouseFourBHK * occupancy__st_penthouseFourBHKRefOccupancy;
return occupancy;}
export  function occupancy__q_noop(occupancy__st_singleBedroomOccupants:number){return null;}
export  function occupancy__q_perFloorOccupancy(occupancy__pi_floors:number,occupancy__q_occupancyApartment){return occupancy__q_occupancyApartment / occupancy__pi_floors;}
export  function occupancy__q_perFloorApartments(occupancy__pi_floors:number,occupancy__q_numberOfDwellingUnitsApartments:number){return occupancy__q_numberOfDwellingUnitsApartments / occupancy__pi_floors;}
export  function occupancy__q_noOfDwellingUnits(occupancy__q_numberOfDwellingUnitsVilla:number,occupancy__q_numberOfDwellingUnitsApartments:number,occupancy__q_numberOfDwellingUnitsPenthouse:number){return (
occupancy__q_numberOfDwellingUnitsVilla +
occupancy__q_numberOfDwellingUnitsApartments +
occupancy__q_numberOfDwellingUnitsPenthouse
);}
import { irr } from 'node-irr';
import {
  HwmDemandAssumptionBase,
  HwmDemandAssumptionVilla,
  HwmDemandAssumptionPenthouse,
  DemandAssumptionApartment,
  HwmDemandByBath,
  HwmOption,
  HeatPumpType,
  SwhType,
  SwhVariant,
  HpType,
  HwmHpHeatingSpeed,
  SdPlusInterventions,
  CurrentWaterTableRow,
  CurrentWaterTable,
  CurrentWaterTableInputsRow,
  CurrentWaterTableInputs,
  WaterPreSdPlusRow,
  WaterPreSdPlus,
  PlumbingDetailsPreSdPlus,
} from '../../../utilities/types';
import * as utilities from '../../../utilities/utility';
export function hwmPenthouseDemandCalc__q_hwmDemand(
  hwmPenthouseDemandCalc__pi_demandAssumptionType: HwmDemandAssumptionPenthouse,
  hwmPenthouseDemandCalc__pi_demandAssumption: string,
  hwmPenthouseDemandCalc__pi_lpdPerPenthouse: number,
  hwmPenthouseDemandCalc__pi_demandByBathType: HwmDemandByBath,
  occupancy__st_singleBedroomOccupants: number,
  occupancy__q_occupancyPenthouse: number,
  occupancy__q_numberOfDwellingUnitsPenthouse: number
) {
  let hotWaterPerOccupant = null,
    hotWaterOccupants = null,
    hotWaterDu = null,
    hwmDemand = null;
  if (hwmPenthouseDemandCalc__pi_demandAssumptionType === 'lpcd per occupant') {
    hotWaterPerOccupant = hwmPenthouseDemandCalc__pi_demandAssumption;
  } else if (hwmPenthouseDemandCalc__pi_demandAssumptionType === 'link to installed efficient fixtures') {
    hotWaterPerOccupant = -1;
  } else if (hwmPenthouseDemandCalc__pi_demandAssumptionType === 'lpd per penthouse') {
    hotWaterPerOccupant = hwmPenthouseDemandCalc__pi_lpdPerPenthouse;
  }

  hotWaterDu = occupancy__q_numberOfDwellingUnitsPenthouse;
  if (hwmPenthouseDemandCalc__pi_demandByBathType === 'all baths') {
    hotWaterOccupants = occupancy__q_occupancyPenthouse;
  } else if (hwmPenthouseDemandCalc__pi_demandByBathType === 'single bath') {
    hotWaterOccupants = occupancy__q_numberOfDwellingUnitsPenthouse * occupancy__st_singleBedroomOccupants;
  } else if (hwmPenthouseDemandCalc__pi_demandByBathType === 'remaining baths') {
    hotWaterOccupants = occupancy__q_occupancyPenthouse - occupancy__q_numberOfDwellingUnitsPenthouse * occupancy__st_singleBedroomOccupants;
  } else if (hwmPenthouseDemandCalc__pi_demandAssumptionType === 'lpd per penthouse') {
    hotWaterOccupants = occupancy__q_numberOfDwellingUnitsPenthouse;
  }
  hwmDemand = utilities.roundTo100(hotWaterPerOccupant * hotWaterOccupants) / occupancy__q_numberOfDwellingUnitsPenthouse;
  return { hwmDemand, hotWaterOccupants, hotWaterDu };
}

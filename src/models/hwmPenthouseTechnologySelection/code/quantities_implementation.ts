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
export function hwmPenthouseTechnologySelection__q_technologySelection(
  hwm__pi_availablePenthouseRooftop: number,
  hwm__st_rooftopPerSwh: number,
  hwm__st_rooftopPerHp: number,
  hwmPenthouseDemandCalc__q_hwmDemand: number
) {
  let swhAreaRequired =
    hwmPenthouseDemandCalc__q_hwmDemand * hwm__st_rooftopPerSwh;
  let hpAreaRequired =
    hwmPenthouseDemandCalc__q_hwmDemand * hwm__st_rooftopPerSwh;
  let hpDomesticCapacity;
  let swhIndividualCapacity;
  if (hwm__pi_availablePenthouseRooftop > swhAreaRequired) {
    swhIndividualCapacity = utilities.roundTo100(
      hwmPenthouseDemandCalc__q_hwmDemand
    );
  } else {
    swhAreaRequired = hwm__pi_availablePenthouseRooftop;
    swhIndividualCapacity =
      utilities.roundTo100(hwm__pi_availablePenthouseRooftop) /
      hwm__st_rooftopPerSwh;
  }
  if (hwm__pi_availablePenthouseRooftop > hpAreaRequired) {
    hpDomesticCapacity = utilities.roundTo100(
      hwmPenthouseDemandCalc__q_hwmDemand
    );
  } else {
    hpAreaRequired = hwm__pi_availablePenthouseRooftop;
    hpDomesticCapacity =
      utilities.roundTo100(hwm__pi_availablePenthouseRooftop) /
      hwm__st_rooftopPerHp;
  }

  return {
    swhIndividualCapacity,
    swhAreaRequired,
    hpDomesticCapacity,
    hpAreaRequired,
  };
}

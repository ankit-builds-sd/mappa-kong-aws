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
} from '../../../utilities/types';
import * as utilities from '../../../utilities/utility';
export function circle__q_area(circle__st_rad: number) {
  return Math.PI * circle__st_rad * circle__st_rad;
}
export function circle__q_areaOfSector(
  circle__st_rad: number,
  circle__st_theta: number
) {
  return Math.PI * circle__st_rad * circle__st_rad * (circle__st_theta / 360);
}
export function circle__q_test(circle__q_area) {
  return circle__q_area;
}

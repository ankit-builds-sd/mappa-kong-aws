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
export function shapes__q_totalArea(rectangle__q_area: number, circle__q_area: number) {
  return rectangle__q_area + circle__q_area;
}
export function shapes__q_diffArea(circle__q_area: number, rectangle__q_area: number) {
  return circle__q_area - rectangle__q_area;
}

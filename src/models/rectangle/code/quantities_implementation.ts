import { irr } from 'node-irr'; import { HwmDemandAssumptionBase, HwmDemandAssumptionVilla, HwmDemandAssumptionPenthouse, DemandAssumptionApartment, HwmDemandByBath, HwmOption, HeatPumpType, SwhType, SwhVariant, HpType, HwmHpHeatingSpeed, SdPlusInterventions } from '../../../utilities/types'; import * as utilities from '../../../utilities/utility';export  function rectangle__q_area(rectangle__pi_length:string,rectangle__st_breadth:number){return rectangle__pi_length + rectangle__st_breadth;}
export  function rectangle__q_perimeter(rectangle__pi_length:string,rectangle__st_breadth:number){return 2 + (rectangle__pi_length + rectangle__st_breadth);}
export  function rectangle__q_foo(rectangle__q_perimeter:number){return rectangle__q_perimeter;}
export  function rectangle__q_bar(rectangle__st_breadth:number){return rectangle__st_breadth;}
export  function rectangle__q_xyz(rectangle__st_xyz:HwmDemand){if (rectangle__st_xyz === 'central') {
return true;
} else {
return false;
}}
export  function rectangle__q_t1(rectangle__pi_t1:string,rectangle__st_t1:HwmDemand){if (typeof rectangle__pi_t1 === 'number' && rectangle__st_t1 === 'central') {
return 1;
} else if (
typeof rectangle__pi_t1 === 'string' &&
rectangle__st_t1 === 'individual'
) {
return 2;
}}
import { irr } from 'node-irr';
import * as utilities from '../../../utilities/utility';
export function reverseTest__q_trial1(
  reverseTest__pi_pi1: number,
  reverseTest__pi_pi2: number,
  reverseTest__st_trial1: number,
  reverseTest__st_trial2: number,
  reverseTest__lk_dryWasteContent: number,
  reverseTest__lk_typeOfBuildingFactor: number
) {
  return reverseTest__st_trial1 + reverseTest__st_trial2;
}
export function reverseTest__q_trial2(reverseTest__pi_pi1: number, reverseTest__pi_pi2: number) {
  return reverseTest__pi_pi1 + reverseTest__pi_pi2;
}
export function reverseTest__q_yearlyConsumption(reverseTest__pi_1, reverseTest__st_dailyConsumption) {
  return utilities.utility_calculateYearlyConsumption(reverseTest__st_dailyConsumption);
}
export function reverseTest__q_test1(reverseTest__st_yearlyConsumption: number) {
  return utilities.utility_convertYearlyUnitToDaily(reverseTest__st_yearlyConsumption) + reverseTest__st_yearlyConsumption;
}
export function reverseTest__q_Valid(circle__pi_t1: number) {
  return 1;
}

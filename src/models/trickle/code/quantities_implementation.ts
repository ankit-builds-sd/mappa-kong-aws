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
  EFCalculator,
  StpCalculator,
  PreSDPlusDemand,
  OutcomesPreSdPlus,
} from '../../../utilities/types';
import * as utilities from '../../../utilities/utility';
import { CityDbData, SDPlusDefaultsStore } from '../../../utilities/stores';

export type HwmDemandAssumptionBase =
  | 'lpcd per occupant'
  | 'link to installed efficient fixtures';
export type HwmDemandAssumptionVilla =
  | HwmDemandAssumptionBase
  | 'lpd per villa';
export type HwmDemandAssumptionPenthouse =
  | HwmDemandAssumptionBase
  | 'lpd per penthouse';
export type DemandAssumptionApartment =
  | HwmDemandAssumptionBase
  | 'lpd per apartment';

export type HwmDemandByBath = 'all baths' | 'single bath' | 'remaining baths';
export type HwmOption = 'solar water heater' | 'heat pump' | 'hybrid';
export type HeatPumpType = 'domestic';
export type SwhType = 'individual' | 'central';
export type SwhVariant = 'fpc' | 'etc';
export type HpType = 'domestic' | 'commercial' | 'swimming pool';
export type HwmHpHeatingSpeed = 'slow' | 'fast';
export type SdPlusInterventions =
  | 'HWM_Apartment'
  | 'HWM_Villa'
  | 'HWM_Penthouse'
  | 'HWM_Clubhouse'
  | 'HWM_Pool';

export type CurrentWaterTableRow = {
  residentialDrinking: number;
  residentialDomestic: { domesticHealthFaucet: number };
  // residentialFlushing: number;
  // clubhouseDrinking: number;
};
export type CurrentWaterTable = {
  clientBaseCase: any;
  efficientFixtures: any;
  dualFlush: any;
  smartWaterMeter: any;
  totalLPCD: any
};

export type CurrentWaterTableInputsRow = {
  daily: number;
  duration: number;
  flow: number;
};

export type CurrentWaterTableInputs = {
  drinkingDrinking: CurrentWaterTableInputsRow;
  drinkingCooking: CurrentWaterTableInputsRow;
};

export type WaterPreSdPlusRow = {
  flow: number;
  price: number;
};

export type WaterPreSdPlus = {
  domesticHealthFaucet: WaterPreSdPlusRow;
  domesticFaucet: WaterPreSdPlusRow;
  domesticKitchenSink: WaterPreSdPlusRow;
  domesticShower: WaterPreSdPlusRow;
  domesticWashUtensilsFlow: number;
  domesticWashClothesFlow: number;
  manualLPCDNonDrinking?: number;
  flushingFull: WaterPreSdPlusRow;
  flushingHalf: WaterPreSdPlusRow;
};

export type PlumbingDetailsPreSdPlus = {
  drinkingDrinkingFlow: number;
  drinkingCookingFlow: number;
  clubhouseDrinkingFlow: number;
  clubhouseCookingFlow: number;
}

export type EFCalculator = {
  efIGBCOccupancy: number;
  efTotalOccupancy: number;
  efclubhouseOccupancy:  number;
}

export type StpCalculator = {
  stpCapacity: number;
  efDomestic: number;
  efFlushing: number; 
  stpInput: number;
  efTotalOccupancy: number;
  efClubhouseOccupancy: number;
}

export type PreSDPlusDemand = {
  stpBaseCase:boolean;
  dailyWaterPreSdPlus: number;
  reuseDemandPreSdPlus: number;
}

export type OutcomesPreSdPlus = {
  annualWaterPreSdPlus: number;
  feedWaterCapacityPreSdPlus: number;
  roPlantCostPreSdPlus: number;
  roEnergyAnnaulPreSdPlus: number;
  twrCapexPreSdPlus: number
}

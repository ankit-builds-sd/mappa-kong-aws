export type HwmDemandAssumptionBase = 'lpcd per occupant' | 'link to installed efficient fixtures';
export type HwmDemandAssumptionVilla = HwmDemandAssumptionBase | 'lpd per villa';
export type HwmDemandAssumptionPenthouse = HwmDemandAssumptionBase | 'lpd per penthouse';
export type DemandAssumptionApartment = HwmDemandAssumptionBase | 'lpd per apartment';
export type HwmDemandByBath = 'all baths' | 'single bath' | 'remaining baths';
export type HwmOption = 'solar water heater' | 'heat pump';
export type HeatPumpType = 'domestic';
export type SwhType = 'individual' | 'central';
export type SwhVariant = 'fpc' | 'etc';
export type HpType = 'domestic' | 'commercial' | 'swimming pool';
export type HwmHpHeatingSpeed = 'slow' | 'fast';
export type SdPlusInterventions = 'HWM_Apartment' | 'HWM_Villa' | 'HWM_Penthouse' | 'HWM_Clubhouse';

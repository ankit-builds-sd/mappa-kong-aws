import { SwhType, HpType, HwmHpHeatingSpeed, SdPlusInterventions, SwhVariant } from './types';
export declare function utility_calculateYearlyConsumption(dailyConsumption: any): number;
export declare function utility_convertYearlyUnitToDaily(hwm__st_yearlyConsumption: any): number;
export declare function utility_minimumPaintCost(): number;
export declare function utility_fromUtil(): number;
export declare function utility_numberFromString(str: string): number;
export declare function utility_defaultOrSelectedProduct(defaultProductIdentifier: string, selectedProductIdentifier: string): any;
export declare function utility_swhProductResolver(type: SwhType, variant: SwhVariant, capacity: number, sdplusIntervention: SdPlusInterventions): any;
export declare function utility_hybridProductResolver(swhCapacity: number, hpCapacity: number, time: number, numberOfFloors: number, EfficiencyFactor: number, floorHeight: number): {
    hybridHPRequiredHeatingCapacity: number;
    hpRequiredheatingCapacity: number;
    productIdentifier: number;
};
export declare function utility_hpProductresolver(hpType: HpType, capacity: number, time: number, floorHeight: number, numberOfFloors: number, outletTemp: number, initialTemp: number, conversionFactor: number, hoursInAday: number, heatLossCoff: number, supRet: number, noOfShafts: number, hzPipe: number, sdplusIntervention: SdPlusInterventions): {
    requiredHeatingCapacity: number;
    pipelength: number;
    defaultProductIdentifier: any;
};
export declare function utility_numberFromObject(o: any, prop: string): number;
export declare function utility_energyOpex(energy: number, city: string): any;
export declare function utility_energysavings(SWHType: SwhType, capacity: number, noOfswh: number): number;
export declare function utility_swhCapex(SWHType: SwhType, capacity: number, unitCapex: number, productCapacity: number, noOfswh: number): number;
export declare function utility_hpEnergySavings(HPType: HpType, capacity: number, ratedPowder: number, noOfHp: number, time: number): {
    hpEnergyConsumed: number;
    baseCaseEnergyConsumed: number;
    hpEnergyAnnual: number;
};
export declare function utility_hpCapex(HPType: HpType, capacity: number, noOfHP: number, capex: number, ratedPower: number, pipelength: number, hotWaterHours?: number): {
    equipmentCost: number;
    backupRequired: number;
    electricalCost: number;
    hpCapex: number;
    mixingTankCount: number;
    mixingTankCost: number;
    interconnectingPipeCost: number;
    plumbingCost: number;
};
export declare function utility_hybridEnergySavings(hpCapacity: number, swhCapacity: number, noOfHP: number, hybridNoOfHp: number, ratedPowder: number, time: number): number;
export declare function utility_hybridCapex(capacity: number, noOfHP: number, noOfswh: number, hybridHpCapex: number, hybridSWHCapex: number, ratedPower: number): number;
export declare function roundTo100(value: number): number;
export declare function utility_hwmHpTimeCalculator(hwm__pi_hpHeatingSpeed: HwmHpHeatingSpeed, hwm__st_slowHeatingTime: number, hwm__st_fastHeatingTime: number, hwm__st_defaultHeatingTime: number): number;
export declare function utility_defaultProduct(): void;

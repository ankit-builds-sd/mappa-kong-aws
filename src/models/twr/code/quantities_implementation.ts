import { irr } from 'node-irr'; import { HwmDemandAssumptionBase, HwmDemandAssumptionVilla, HwmDemandAssumptionPenthouse, DemandAssumptionApartment, HwmDemandByBath, HwmOption, HeatPumpType, SwhType, SwhVariant, HpType, HwmHpHeatingSpeed, SdPlusInterventions, CurrentWaterTableRow, CurrentWaterTable, CurrentWaterTableInputsRow, CurrentWaterTableInputs, WaterPreSdPlusRow, WaterPreSdPlus, PlumbingDetailsPreSdPlus, EFCalculator, StpCalculator, PreSDPlusDemand, OutcomesPreSdPlus } from '../../../utilities/types'; import * as utilities from '../../../utilities/utility'; import { CityDbData, SDPlusDefaultsStore } from '../../../utilities/stores';export  function twr__q_stpCapacityCalculator(twr__st_globaLToKLconverter:number,twr__st_nbcLPCD:number,twr__st_projectCategory:string,twr__st_igbcOccupancyVilla:number,twr__st_igbcTotalOccupancyVilla:number,twr__st_clubhouseOccupancyVilla:number,twr__st_igbcOccupancyApartment:number,twr__st_igbcOccupancyPenthouse:number,twr__st_OccupancyTotalApartment:number,twr__st_OccupancyClubhouseApartment:number,water__q_currentWaterTable){const efValues: EFCalculator = 
utilities.utility_EFOccupancy(twr__st_projectCategory,
    twr__st_igbcOccupancyVilla,
    twr__st_igbcTotalOccupancyVilla,
    twr__st_clubhouseOccupancyVilla,
    twr__st_igbcOccupancyApartment,
    twr__st_igbcOccupancyPenthouse,
    twr__st_OccupancyTotalApartment,
    twr__st_OccupancyClubhouseApartment)
let ret: StpCalculator;
const efDomestic = (water__q_currentWaterTable.clientBaseCase.residentialDomestic * efValues.efTotalOccupancy) * (water__q_currentWaterTable.clientBaseCase.clubhouseDomestic * efValues.efclubhouseOccupancy);
const efFlushing = (water__q_currentWaterTable.clientBaseCase.residentialFlushing * efValues.efTotalOccupancy) + (water__q_currentWaterTable.clientBaseCase.clubhouseFlushing * efValues.efclubhouseOccupancy);
ret={
    stpCapacity: efValues.efTotalOccupancy * twr__st_nbcLPCD,
    efDomestic: efDomestic,
    efFlushing: efFlushing, 
    stpInput: (efDomestic + efFlushing) / twr__st_globaLToKLconverter,
    efTotalOccupancy: efValues.efTotalOccupancy,
    efClubhouseOccupancy: efValues.efclubhouseOccupancy
}
return ret;}
export  function twr__q_reuseDemand(twr__pi_domestic:boolean,twr__pi_pool:boolean,twr__pi_flushing:boolean,twr__pi_commonAreaCleaning:boolean,twr__pi_carWash:boolean,twr__pi_landScaping:boolean,twr__st_globaLToKLconverter:number,water__q_currentWaterTable,twr__q_stpCapacityCalculator){let reuseDemand = 0;
if(twr__pi_domestic) {
    reuseDemand = reuseDemand  + (twr__q_stpCapacityCalculator.efDomestic/twr__st_globaLToKLconverter)
}
if(twr__pi_pool) {
    reuseDemand = reuseDemand + (water__q_currentWaterTable.clientBaseCase.swimmingPool/twr__st_globaLToKLconverter)
}
if(twr__pi_flushing) {
    reuseDemand = reuseDemand + (twr__q_stpCapacityCalculator.efFlushing/twr__st_globaLToKLconverter)
}
if(twr__pi_commonAreaCleaning) {
    reuseDemand = reuseDemand + (water__q_currentWaterTable.clientBaseCase.commonAreaCleaning/twr__st_globaLToKLconverter)
}
if(twr__pi_carWash) {
    reuseDemand = reuseDemand + (water__q_currentWaterTable.clientBaseCase.commonAreaCarPark/twr__st_globaLToKLconverter)
}
if(twr__pi_landScaping) {
    reuseDemand = reuseDemand + (water__q_currentWaterTable.clientBaseCase.commonAreaLandScape/twr__st_globaLToKLconverter)
}
return {reuseDemand}}
export  function twr__q_preSDPlusDemand(twr__pi_builtUpArea:number,twr__pi_domestic:boolean,twr__pi_pool:boolean,twr__pi_flushing:boolean,twr__pi_commonAreaCleaning:boolean,twr__pi_carWash:boolean,twr__pi_landScaping:boolean,twr__st_globaLToKLconverter:number,twr__st_stpEfficiency:number,twr__q_stpCapacityCalculator,water__q_currentWaterTable){let stpBaseCase:boolean;
twr__pi_builtUpArea < 18581 ? stpBaseCase=false : stpBaseCase=true;
const stpOutputPreSDPlus = twr__q_stpCapacityCalculator.twr__st_stpInput * twr__st_stpEfficiency;
let dailyWaterPreSdPlus = 0;
let ret: PreSDPlusDemand;
let reuseDemandPreSdPlus = 0;
if(twr__pi_domestic) {
    reuseDemandPreSdPlus = reuseDemandPreSdPlus  + (twr__q_stpCapacityCalculator.efDomestic/twr__st_globaLToKLconverter)
}
if(twr__pi_pool) {
    reuseDemandPreSdPlus = reuseDemandPreSdPlus + (water__q_currentWaterTable.clientBaseCase.swimmingPool/twr__st_globaLToKLconverter)
}
if(twr__pi_flushing) {
    reuseDemandPreSdPlus = reuseDemandPreSdPlus + (twr__q_stpCapacityCalculator.efFlushing/twr__st_globaLToKLconverter)
}
if(twr__pi_commonAreaCleaning) {
    reuseDemandPreSdPlus = reuseDemandPreSdPlus + (water__q_currentWaterTable.clientBaseCase.commonAreaCleaning/twr__st_globaLToKLconverter)
}
if(twr__pi_carWash) {
    reuseDemandPreSdPlus = reuseDemandPreSdPlus + (water__q_currentWaterTable.clientBaseCase.commonAreaCarPark/twr__st_globaLToKLconverter)
}
if(twr__pi_landScaping) {
    reuseDemandPreSdPlus = reuseDemandPreSdPlus + (water__q_currentWaterTable.clientBaseCase.commonAreaLandScape/twr__st_globaLToKLconverter)
}
if(stpBaseCase) {
    stpOutputPreSDPlus >= reuseDemandPreSdPlus ? dailyWaterPreSdPlus=reuseDemandPreSdPlus : dailyWaterPreSdPlus=stpOutputPreSDPlus
}
else {
    dailyWaterPreSdPlus=0;
}
ret= {
    stpBaseCase: stpBaseCase,
    dailyWaterPreSdPlus: dailyWaterPreSdPlus,
    reuseDemandPreSdPlus: reuseDemandPreSdPlus
}
return ret;}
export  function twr__q_roSystem(twr__st_stpEfficiency:number,twr__st_waterPermissibleRoLimit:number,twr__st_ufOperationHourse:number,twr__st_ufHourlyFlowRate:number,twr__st_globaLToKLconverter:number,twr__st_standardUfFeedVolume:number,twr__st_ufModulePrice:number,twr__st_ufPowerRating:number,twr__st_ufOpearationalHours:number,twr__st_roRecoveryRate:number,twr__st_roOperationalHourse:number,twr__st_standardRoFeedVolume:number,twr__st_roPumpRate:number,twr__st_roModulePrice:number,twr__st_pressureVesselPrice:number,twr__st_ozonationUnitCost:number,twr__st_uvSystemCost:number,twr__st_roPowerRating:number,twr__st_globalDaysInYear:number,twr__q_stpCapacityCalculator){let feedWaterCapacity = twr__q_stpCapacityCalculator.stpInput * twr__st_stpEfficiency
    let ret: {
        ufHourlyRate: number,
        ufFeedVolume: number,
        noOfUfModules: number,
        ufSystemCost: number,
        ufEnergy: number,
        roPermeate: number,
        roHourlyFlowRate: number,
        roFeedVolume: number,
        noRoModule: number,
        roPumpCost: number,
        roModuleCost: number,
        roPlantCost: number,
        roEnergyAnnual: number
        
    }= {
        ufHourlyRate: 0,
        ufFeedVolume: 0,
        noOfUfModules: 0,
        ufSystemCost: 0,
        ufEnergy: 0,
        roPermeate: 0,
        roHourlyFlowRate: 0,
        roFeedVolume: 0,
        noRoModule: 0,
        roPumpCost: 0,
        roModuleCost: 0,
        roPlantCost: 0,
        roEnergyAnnual: 0
    }
    let ufFeedVolume = twr__st_ufHourlyFlowRate/twr__st_globaLToKLconverter;
    let noOfUfModules = ufFeedVolume/twr__st_standardUfFeedVolume;
    let ufSystemCost = noOfUfModules * twr__st_ufModulePrice;
    let ufEnergy = twr__st_ufPowerRating * twr__st_ufOpearationalHours * noOfUfModules;
    let roPermeate = twr__st_roRecoveryRate * feedWaterCapacity;
    let roHourlyFlowRate = roPermeate/twr__st_roOperationalHourse;
    let roFeedVolume = roPermeate/twr__st_globaLToKLconverter;
    let noRoModule = roFeedVolume/twr__st_standardRoFeedVolume;
    let roPumpCost = twr__st_roPumpRate * noRoModule;
    let roModuleCost = noRoModule * (twr__st_roModulePrice + twr__st_pressureVesselPrice)
    let roPlantCost = roPumpCost + roModuleCost + ufSystemCost + twr__st_ozonationUnitCost + twr__st_uvSystemCost;
    let roEnergyAnnual = ((twr__st_roPowerRating * twr__st_roOperationalHourse * noRoModule) + ufEnergy) * twr__st_globalDaysInYear;

    if(feedWaterCapacity>twr__st_waterPermissibleRoLimit) {
        ret = {
            ufHourlyRate: feedWaterCapacity/twr__st_ufOperationHourse,
            ufFeedVolume: ufFeedVolume,
            noOfUfModules: noOfUfModules,
            ufSystemCost: ufSystemCost,
            ufEnergy: ufEnergy,
            roPermeate: roPermeate,
            roHourlyFlowRate: roHourlyFlowRate,
            roFeedVolume: roFeedVolume,
            noRoModule: noRoModule,
            roPumpCost: roPumpCost,
            roModuleCost: roModuleCost,
            roPlantCost: roPlantCost,
            roEnergyAnnual: roEnergyAnnual
        }
    }
    return ret;}
export  function twr__q_flowDiagram(twr__pi_flushing:boolean,twr__pi_landScaping:boolean,twr__pi_commonAreaCleaning:boolean,twr__pi_carWash:boolean,twr__pi_pool:boolean,twr__pi_domestic:boolean,twr__st_globaLToKLconverter:number,twr__st_stpEfficiency:number,twr__q_stpCapacityCalculator,water__q_currentWaterTable,twr__q_reuseDemand){const stpOutput = twr__q_stpCapacityCalculator.stpInput * twr__st_stpEfficiency;
    let dailyWater = 0;
    stpOutput >= twr__q_reuseDemand.reuseDemand ? dailyWater=twr__q_reuseDemand.reuseDemand : dailyWater=stpOutput
    let usableWater = dailyWater; 
    let flowDiagramFlushing = 0;
    let flowDiagramCommonArea = 0;
    let flowDiagramDomestic = 0;
    let flowDiagramDomesticHealthFaucet = 0;
    const efhfDaily = ((water__q_currentWaterTable.efficientFixtures.domesticHealthFaucet * twr__q_stpCapacityCalculator.efTotalOccupancy) * (water__q_currentWaterTable.efficientFixtures.clubhouseDomesticHealthFaucet * twr__q_stpCapacityCalculator.efclubhouseOccupancy)) / twr__st_globaLToKLconverter;
    if(twr__pi_flushing && usableWater >= twr__q_stpCapacityCalculator.efFlushing) {
        flowDiagramFlushing = twr__q_stpCapacityCalculator.efFlushing/twr__st_globaLToKLconverter;
        usableWater = usableWater - (twr__q_stpCapacityCalculator.efFlushing / twr__st_globaLToKLconverter);
    }
    if(twr__pi_landScaping && usableWater >= water__q_currentWaterTable.clientBaseCase.commonAreaLandScape) {
        flowDiagramCommonArea = flowDiagramCommonArea + (water__q_currentWaterTable.clientBaseCase.commonAreaLandScape/twr__st_globaLToKLconverter);
        usableWater = usableWater - (water__q_currentWaterTable.clientBaseCase.commonAreaLandScape/twr__st_globaLToKLconverter);
    }
    if(twr__pi_commonAreaCleaning && usableWater >= water__q_currentWaterTable.clientBaseCase.commonAreaCleaning) {
        flowDiagramCommonArea = flowDiagramCommonArea + (water__q_currentWaterTable.clientBaseCase.commonAreaCleaning/twr__st_globaLToKLconverter);
        usableWater = usableWater - (water__q_currentWaterTable.clientBaseCase.commonAreaLandScape/twr__st_globaLToKLconverter);
    }
    if(twr__pi_carWash && usableWater >= water__q_currentWaterTable.clientBaseCase.commonAreaCarPark) {
        flowDiagramCommonArea = flowDiagramCommonArea + (water__q_currentWaterTable.clientBaseCase.commonAreaCarPark/twr__st_globaLToKLconverter);
        usableWater = usableWater - (water__q_currentWaterTable.clientBaseCase.commonAreaCarPark/twr__st_globaLToKLconverter);
    }
    if(twr__pi_pool && usableWater >= water__q_currentWaterTable.clientBaseCase.swimmingPool) {
        flowDiagramCommonArea = flowDiagramCommonArea + (water__q_currentWaterTable.clientBaseCase.swimmingPool/twr__st_globaLToKLconverter);
        usableWater = usableWater - (water__q_currentWaterTable.clientBaseCase.swimmingPool/twr__st_globaLToKLconverter);
    }
    if(twr__pi_domestic && usableWater >= efhfDaily) {
        flowDiagramDomesticHealthFaucet = efhfDaily/twr__st_globaLToKLconverter;
        usableWater =  usableWater - (efhfDaily/twr__st_globaLToKLconverter);
    } 
    if(twr__pi_domestic && usableWater >= (twr__q_stpCapacityCalculator.efDomestic - efhfDaily)) {
        flowDiagramDomestic = (twr__q_stpCapacityCalculator.efDomestic - efhfDaily) / twr__st_globaLToKLconverter;
    }
    else if(twr__pi_domestic) {
        flowDiagramDomestic = usableWater;
    }
    let ret: {
        usableWater:number,
        flowDiagramCommonArea: number,
        flowDiagramFlushing: number,
        flowDiagramDomestic: number,
        flowDiagramDomesticHealthFaucet: number
    }

    ret = {
        usableWater: usableWater,
        flowDiagramCommonArea: flowDiagramCommonArea,
        flowDiagramFlushing: flowDiagramFlushing,
        flowDiagramDomestic: flowDiagramDomestic,
        flowDiagramDomesticHealthFaucet: flowDiagramDomesticHealthFaucet
    }
    return ret;}
export  function twr__q_outcomesPreSdPlus(twr__pi_pool:boolean,twr__pi_domestic:boolean,twr__st_globalDaysInYear:number,twr__st_globaLToKLconverter:number,twr__q_preSDPlusDemand,water__q_currentWaterTable,twr__q_flowDiagram,twr__q_roSystem){const annualWaterPreSdPlus = twr__q_preSDPlusDemand.dailyWaterPreSdPlus * twr__st_globalDaysInYear;
    let feedWaterCapacityPreSdPlus = 0;
    let roPlantCostPreSdPlus = 0;
    let roEnergyAnnaulPreSdPlus = 0;
    let twrCapexPreSdPlus = 0;
    let ret:OutcomesPreSdPlus;
    if(twr__pi_pool) {
        feedWaterCapacityPreSdPlus = water__q_currentWaterTable.clientBaseCase.swimmingPool / twr__st_globaLToKLconverter
    }
    if(twr__pi_domestic) {
        feedWaterCapacityPreSdPlus = twr__q_flowDiagram.flowDiagramDomestic
    }
    if(twr__pi_domestic || twr__pi_pool) {
        roPlantCostPreSdPlus = twr__q_roSystem.roPlantCost;
        roEnergyAnnaulPreSdPlus = twr__q_roSystem.roEnergyAnnual;
        twrCapexPreSdPlus = twr__q_roSystem.roPlantCost;
    }
    ret={
        annualWaterPreSdPlus: annualWaterPreSdPlus,
        feedWaterCapacityPreSdPlus: feedWaterCapacityPreSdPlus,
        roPlantCostPreSdPlus: roPlantCostPreSdPlus,
        roEnergyAnnaulPreSdPlus: roEnergyAnnaulPreSdPlus,
        twrCapexPreSdPlus: twrCapexPreSdPlus
    }

    return ret;}
export  function twr__q_outcomes(twr__pi_pool:boolean,twr__pi_domestic:boolean,twr__st_stpEfficiency:number,twr__st_globalDaysInYear:number,twr__st_offsiteReuse:boolean,twr__st_offsiteReusePrice:number,twr__st_globaLToKLconverter:number,twr__st_waterPricePerKL:number,twr__st_city:string,twr__q_stpCapacityCalculator,twr__q_reuseDemand,twr__q_roSystem,twr__q_outcomesPreSdPlus,water__q_currentWaterTable){const stpOutput = twr__q_stpCapacityCalculator.stpInput * twr__st_stpEfficiency;
let dailyWater = 0;
stpOutput >= twr__q_reuseDemand.reuseDemand ? dailyWater=twr__q_reuseDemand.reuseDemand : dailyWater=stpOutput
let dischargePercentage = 0;
let twrOffsiteReuseDailyWater = 0;
let twrOffsiteReuseOffsiteEarnings = 0;
let twrFeedWaterCapacity = 0;
let twrRoPlantCostPostSdPlus = 0;
if(twr__st_offsiteReuse) {
    twrOffsiteReuseDailyWater = stpOutput - dailyWater;
    twrOffsiteReuseOffsiteEarnings = twrOffsiteReuseDailyWater * twr__st_offsiteReusePrice;
}
dischargePercentage= ((dailyWater + twrOffsiteReuseDailyWater) / stpOutput) * 100;

let twrDischargePercentage = ((dailyWater + twrOffsiteReuseDailyWater) * 100)/stpOutput;
let twrAnnualWater = ((dailyWater + twrOffsiteReuseDailyWater) * twr__st_globalDaysInYear) - twr__q_outcomesPreSdPlus.annualWaterPreSdPlus
if(twr__pi_pool) {
    twrFeedWaterCapacity = twrFeedWaterCapacity + (water__q_currentWaterTable.clientBaseCase.swimmingPool / twr__st_globaLToKLconverter)
}
if(twr__pi_domestic) {
    twrFeedWaterCapacity = twrFeedWaterCapacity + (twr__q_stpCapacityCalculator.efDomestic / twr__st_globaLToKLconverter)
}
if(twr__pi_domestic || twr__pi_pool) {
    twrRoPlantCostPostSdPlus = twr__q_roSystem.roPlantCost
}
let twrCapex = twrRoPlantCostPostSdPlus - twr__q_outcomesPreSdPlus.twrCapexPreSdPlus
let twrOpex = (twrAnnualWater * twr__st_waterPricePerKL) - utilities.utility_energyOpex(twr__q_roSystem.roEnergyAnnual, twr__st_city) + twrOffsiteReuseOffsiteEarnings
let ret={
    stpOutput: stpOutput,
    dailyWater: dailyWater,
    dischargePercentage: dischargePercentage,
    twrOffsiteReuseDailyWater: twrOffsiteReuseDailyWater,
    twrOffsiteReuseOffsiteEarnings: twrOffsiteReuseOffsiteEarnings,
    twrDischargePercentage: twrDischargePercentage,
    twrAnnualWater: twrAnnualWater,
    twrFeedWaterCapacity: twrFeedWaterCapacity,
    twrCapexPostSdPlus: twrRoPlantCostPostSdPlus,
    twrCapex: twrCapex,
    twrOpex: twrOpex
}
return ret;}
export  function twr__q_projectLevelInsights(twr__st_city:string,twr__st_globalKgToTonConv:number,twr__st_sdgNumberForTWR:number,twr__st_globalTreesPerTonCF:number,twr__st_annualBaselineWaterConsumption:number,twr__q_outcomes){let ret: {
    twrCfMitigated: number;
    twrSDGNumber: number;
    twrTreesSaved: number;
    twrTotalPercentageWaterConsumption: number
}
ret = {
    twrCfMitigated: (CityDbData[twr__st_city].emissionFactors * twr__st_globalKgToTonConv),
    twrSDGNumber: twr__st_sdgNumberForTWR,
    twrTreesSaved: (CityDbData[twr__st_city].emissionFactors * twr__st_globalKgToTonConv) * twr__st_globalTreesPerTonCF,
    twrTotalPercentageWaterConsumption: (twr__q_outcomes.twrAnnualWater*100) / twr__st_annualBaselineWaterConsumption
    // once water service written take that value from there
}
return ret;}
export  function twr__q_passiveEnergy(twr__pi_noOfFloors:number,twr__pi_floorToFloorHeight:number,twr__st_LtoM3converter:number,twr__st_pumpFlowRate:number,twr__st_globalAccDueToGravity:number,twr__st_waterSpecificGravity:number,twr__st_globalJoulesToKwConverter:number,twr__st_pumpEfficiency:number,twr__st_motorEfficiency:number,twr__st_city:string,twr__q_outcomes){let ret = {
    timeTakenToPumpWater: (twr__q_outcomes.twrAnnualWater * twr__st_LtoM3converter) / twr__st_pumpFlowRate,
    buildingHeight: twr__pi_noOfFloors *  twr__pi_floorToFloorHeight,
    hydraulicPower: (twr__st_pumpFlowRate* twr__pi_noOfFloors *  twr__pi_floorToFloorHeight * twr__st_globalAccDueToGravity * twr__st_waterSpecificGravity) / twr__st_globalJoulesToKwConverter,
    shaftPower: ((twr__st_pumpFlowRate* twr__pi_noOfFloors *  twr__pi_floorToFloorHeight * twr__st_globalAccDueToGravity * twr__st_waterSpecificGravity) / twr__st_globalJoulesToKwConverter) / twr__st_pumpEfficiency,
    electricInput: (((twr__st_pumpFlowRate* twr__pi_noOfFloors *  twr__pi_floorToFloorHeight * twr__st_globalAccDueToGravity * twr__st_waterSpecificGravity) / twr__st_globalJoulesToKwConverter) / twr__st_pumpEfficiency) / twr__st_motorEfficiency,
    twrPassiveEnergyKwh: ((((twr__st_pumpFlowRate* twr__pi_noOfFloors *  twr__pi_floorToFloorHeight * twr__st_globalAccDueToGravity * twr__st_waterSpecificGravity) / twr__st_globalJoulesToKwConverter) / twr__st_pumpEfficiency) / twr__st_motorEfficiency) * ((twr__q_outcomes.twrAnnualWater * twr__st_LtoM3converter) / twr__st_pumpFlowRate),
    twrEnergyOpex: utilities.utility_energyOpex(((((twr__st_pumpFlowRate* twr__pi_noOfFloors *  twr__pi_floorToFloorHeight * twr__st_globalAccDueToGravity * twr__st_waterSpecificGravity) / twr__st_globalJoulesToKwConverter) / twr__st_pumpEfficiency) / twr__st_motorEfficiency) * ((twr__q_outcomes.twrAnnualWater * twr__st_LtoM3converter) / twr__st_pumpFlowRate), twr__st_city),
    passiveWasteKg: 0,
    passiveEnergyOpex: 0
}
return ret;}
export  function twr__q_goalMonitoring(twr__st_goalMonitoringWaterTarget:number,twr__st_goalSetting:number,twr__q_outcomes){let ret = {
    waterGoal: twr__st_goalMonitoringWaterTarget,
    contribution: (twr__q_outcomes.twrAnnualWater /(twr__st_goalSetting - twr__st_goalMonitoringWaterTarget)) *100 
}
return ret;}
export  function twr__q_overViewBarGraph(twr__q_outcomes,twr__q_flowDiagram){let ret = {
    title: 'Treated water reuse by category',
    totalSavings: twr__q_outcomes.twrAnnualWater,
    seriesNameOne: 'Domestic',
    seriesValueOne: twr__q_flowDiagram.flowDiagramDomestic,
    seriesNameTwo: 'Health Faucet',
    seriesValueTwo: twr__q_flowDiagram.flowDiagramDomesticHealthFaucet,
    seriesNameThree: 'Flushing',
    seriesValueThree: twr__q_flowDiagram.flowDiagramFlushing,
    seriesNameFour: 'Common Area',
    seriesValueFour: twr__q_flowDiagram.flowDiagramCommonArea,
    seriesNameFive: 'Drinking',
    seriesValueFive: twr__q_flowDiagram.usableWater,
}
return ret;}
export  function twr__q_overViewDonutGraph(twr__st_globaLToKLconverter:number,twr__q_outcomes,twr__q_flowDiagram,twr__q_stpCapacityCalculator,water__q_currentWaterTable){let ret ={ 
    donutOneTitle: "% of Total Water",
    donutOnevalue: twr__q_outcomes.twrAnnualWater * 100,
    donutTwoTitle: "% of Domestic Demand supplied by Grey Water",
    donutTwoValue: (twr__q_flowDiagram.flowDiagramDomestic * 100) / (twr__q_stpCapacityCalculator.efDomestic / twr__st_globaLToKLconverter),
    donutThreTitle: "% of Common Area Demand supplied by Grey Water",
    donutThreeValue: (twr__q_flowDiagram.flowDiagramCommonArea * 100) / ((water__q_currentWaterTable.clientBaseCase.commonAreaCarPark + water__q_currentWaterTable.clientBaseCase.commonAreaCleaning + water__q_currentWaterTable.clientBaseCase.commonAreaLandScape + water__q_currentWaterTable.clientBaseCase.swimmingPool) / twr__st_globaLToKLconverter)
}
return ret}
import { irr } from 'node-irr'; import { HwmDemandAssumptionBase, HwmDemandAssumptionVilla, HwmDemandAssumptionPenthouse, DemandAssumptionApartment, HwmDemandByBath, HwmOption, HeatPumpType, SwhType, SwhVariant, HpType, HwmHpHeatingSpeed, SdPlusInterventions, CurrentWaterTableRow, CurrentWaterTable, CurrentWaterTableInputsRow, CurrentWaterTableInputs, WaterPreSdPlusRow, WaterPreSdPlus, PlumbingDetailsPreSdPlus, EFCalculator, StpCalculator, PreSDPlusDemand, OutcomesPreSdPlus } from '../../../utilities/types'; import * as utilities from '../../../utilities/utility'; import { CityDbData, SDPlusDefaultsStore } from '../../../utilities/stores';export  function nstp__q_overviewBarGraph(nstp__q_outcomes,nstp__q_flowDiagram){return {
    title: "Treated water reuse by category",
    totalSavings: nstp__q_outcomes.annualWater,
    seriesNameOne:'Domestic',
    seriesValueOne: nstp__q_flowDiagram.flowDiagramDomestic,
    seriesNameTwo: 'Health Faucet',
    seriesValueTwo: nstp__q_flowDiagram.flowDiagramHealthFaucet,
    seriesNameThree: 'Flushing',
    seriesValueThree: nstp__q_flowDiagram.flowDiagramFlushing,
    seriesNameFour: 'Common Area',
    seriesValueFour: nstp__q_flowDiagram.flowDiagramCommonArea,
    seriesNameFive: 'Drinking',
    seriesValueFive: nstp__q_flowDiagram.flowDiagramDrinking
}}
export  function nstp__q_goalMonitoring(nstp__st_goalMonitoringWaterTarget:number,nstp__st_goalSetting:number,nstp__st_waterGoalTarget:number,nstp__q_outcomes){let ret= {
    waterGoal: nstp__st_goalMonitoringWaterTarget,
    nstpContribution: (nstp__q_outcomes.annualWater * 100) / (nstp__st_goalSetting - nstp__st_waterGoalTarget)
}
return ret;}
export  function nstp__q_secondaryImpact(nstp__pi_city:string,nstp__st_globalIndiaAverageElectricityTariff:number,nstp__q_outcomesPreSdPlus,nstp__q_outcomes){const nstpPassiveEnergy = (nstp__q_outcomesPreSdPlus.annualEnergy / nstp__st_globalIndiaAverageElectricityTariff) - (nstp__q_outcomes.nstpCapexAnnualEnergyPostSdPlus/ CityDbData[nstp__pi_city].residentialDomestic) 
const nstpEnergyOPex = (nstp__q_outcomesPreSdPlus.annualEnergy) - nstp__q_outcomes.nstpCapexAnnualEnergyPostSdPlus
return {
    nstpPassiveEnergy: nstpPassiveEnergy,
    nstpEnergyOPex: nstpEnergyOPex,
    nstpPassiveWasteKg: 0,
    nstpPassiveWasteOpex: 0
}}
export  function nstp__q_flowDiagram(){return {
    flowDiagramDomestic: 0,
    flowDiagramHealthFaucet: 0,
    flowDiagramFlushing: 0,
    flowDiagramCommonArea: 0,
    flowDiagramDrinking: 0
}}
export  function nstp__q_projectLevelInsights(nstp__pi_city:string,nstp__st_annualWater:number,nstp__st_globalLtoKLConverter:number,nstp__st_sdgNumber:number,nstp__st_globalTreesPerTonCF:number,nstp__st_annualBaselineWaterConsumption:number){const nstpCfMitigated = CityDbData[nstp__pi_city].emissionFactors * nstp__st_annualWater * nstp__st_globalLtoKLConverter;
const nstpSDGNumber =  nstp__st_sdgNumber;
const nstpTreesSaves = nstpCfMitigated * nstp__st_globalTreesPerTonCF;
const nstpPercentageTotalWaterConsumption = (nstp__st_annualWater * 100) / nstp__st_annualBaselineWaterConsumption
return {
    nstpCfMitigated: nstpCfMitigated,
    nstpSDGNumber: nstpSDGNumber,
    nstpTreesSaves: nstpTreesSaves,
    nstpPercentageTotalWaterConsumption: nstpPercentageTotalWaterConsumption
}}
export  function nstp__q_outcomesPreSdPlus(nstp__pi_city:string,nstp__pi_baseCaseStp:string,nstp__st_globalYoyInflationMBBR:number,nstp__st_globalCurrentYearMBBR:number,nstp__st_stpcoStudyYearMBBR:number,nstp__st_stpcoCivilMBBR:number,nstp__st_stpcoMAndEMBBR:number,nstp__st_stpcoCapacityMBBR:number,nstp__st_stpcoInflationMBBR:number,nstp__st_stpcoElectricityMBBR:number,nstp__st_stpcoChemicalMBBR:number,nstp__st_stpcoWorkforceMBBR:number,nstp__st_globalYoyInflationMBR:number,nstp__st_globalCurrentYearMBR:number,nstp__st_stpcoStudyYearMBR:number,nstp__st_stpcoCivilMBR:number,nstp__st_stpcoMAndEMBR:number,nstp__st_stpcoCapacityMBR:number,nstp__st_stpcoInflationMBR:number,nstp__st_stpcoElectricityMBR:number,nstp__st_stpcoChemicalMBR:number,nstp__st_stpcoWorkforceMBR:number,nstp__st_globalYoyInflationSBR:number,nstp__st_globalCurrentYearSBR:number,nstp__st_stpcoStudyYearSBR:number,nstp__st_stpcoCivilSBR:number,nstp__st_stpcoMAndESBR:number,nstp__st_stpcoCapacitySBR:number,nstp__st_stpcoInflationSBR:number,nstp__st_stpcoElectricitySBR:number,nstp__st_stpcoChemicalSBR:number,nstp__st_stpcoWorkforceSBR:number,nstp__st_mbbrArea:number,nstp__st_mbrArea:number,nstp__st_sbrArea:number,twr__q_stpCapacityCalculator){let capex = 0;
    let opex = 0;
    let annualEnergy = 0;
    let nstpAreaPreSdPlus = 0;

    if (nstp__pi_baseCaseStp === 'MBBR') {
        let { stpcoCapex: capOne, stpcoAnnualEnergy: energyOne, stpcoOpex: opexOne } = utilities.utility_stpCapexOpex(nstp__st_globalYoyInflationMBBR,
            nstp__st_globalCurrentYearMBBR,
            nstp__st_stpcoStudyYearMBBR,
            nstp__st_stpcoCivilMBBR,
            nstp__st_stpcoMAndEMBBR,
            nstp__st_stpcoCapacityMBBR,
            nstp__st_stpcoInflationMBBR,
            nstp__st_stpcoElectricityMBBR,
            nstp__pi_city,
            nstp__st_stpcoChemicalMBBR,
            nstp__st_stpcoWorkforceMBBR);
        capex = capex + capOne;
        opex = opex + opexOne;
        annualEnergy = annualEnergy + energyOne;
        nstpAreaPreSdPlus = nstp__st_mbbrArea * twr__q_stpCapacityCalculator.stpCapacity
    };
    if (nstp__pi_baseCaseStp === 'MBR') {
        let { stpcoCapex: capTwo, stpcoAnnualEnergy: energyTwo, stpcoOpex: opexTwo } = utilities.utility_stpCapexOpex(nstp__st_globalYoyInflationMBR,
            nstp__st_globalCurrentYearMBR,
            nstp__st_stpcoStudyYearMBR,
            nstp__st_stpcoCivilMBR,
            nstp__st_stpcoMAndEMBR,
            nstp__st_stpcoCapacityMBR,
            nstp__st_stpcoInflationMBR,
            nstp__st_stpcoElectricityMBR,
            nstp__pi_city,
            nstp__st_stpcoChemicalMBR,
            nstp__st_stpcoWorkforceMBR);
        capex = capex + capTwo;
        opex = opex + opexTwo;
        annualEnergy = annualEnergy + energyTwo;
        nstpAreaPreSdPlus = nstp__st_mbrArea * twr__q_stpCapacityCalculator.stpCapacity
    };
    if (nstp__pi_baseCaseStp === 'SBR') {
        let { stpcoCapex: capThree, stpcoAnnualEnergy: energyThree, stpcoOpex: opexThree } = utilities.utility_stpCapexOpex(nstp__st_globalYoyInflationSBR,
            nstp__st_globalCurrentYearSBR,
            nstp__st_stpcoStudyYearSBR,
            nstp__st_stpcoCivilSBR,
            nstp__st_stpcoMAndESBR,
            nstp__st_stpcoCapacitySBR,
            nstp__st_stpcoInflationSBR,
            nstp__st_stpcoElectricitySBR,
            nstp__pi_city,
            nstp__st_stpcoChemicalSBR,
            nstp__st_stpcoWorkforceSBR);
   
        capex = capex + capThree;
        opex = opex + opexThree;
        annualEnergy = annualEnergy + energyThree;
        nstpAreaPreSdPlus = nstp__st_sbrArea * twr__q_stpCapacityCalculator.stpCapacity
    };
    return {
        capex: capex,
        opex: opex,
        annualEnergy: annualEnergy,
        nstpAreaPreSdPlus: nstpAreaPreSdPlus
    }}
export  function nstp__q_outcomes(nstp__pi_city:string,nstp__st_waterSavingPercentage:number,nstp__st_selectedProductPrice:number,nstp__st_selectedProductOpexElectricity:number,nstp__st_globalStandardWorkforceSalary:number,nstp__st_selectedProductOpexWorkforce:number,nstp__st_selectedProductOpexBacteria:number,nstp__st_selectedProductOpexChemical:number,nstp__st_selectedProductArea:number,twr__q_stpCapacityCalculator,nstp__q_outcomesPreSdPlus){const energy = nstp__st_selectedProductOpexElectricity * twr__q_stpCapacityCalculator.stpCapacity * CityDbData[nstp__pi_city].residentialUtilityTariff;
const workforce = nstp__st_selectedProductOpexWorkforce * nstp__st_globalStandardWorkforceSalary;
const chemical = nstp__st_selectedProductOpexChemical * twr__q_stpCapacityCalculator.stpCapacity;
const bacteria = nstp__st_selectedProductOpexBacteria * twr__q_stpCapacityCalculator.stpCapacity;
let ret = {
    annualWater: twr__q_stpCapacityCalculator.stpCapacity * nstp__st_waterSavingPercentage,
    capexPostSdPlus: twr__q_stpCapacityCalculator.stpCapacity * nstp__st_selectedProductPrice,
    nstpCapex: (twr__q_stpCapacityCalculator.stpCapacity * nstp__st_selectedProductPrice) - nstp__q_outcomesPreSdPlus.capex,
    nstpCapexAnnualEnergyPostSdPlus: energy,
    nstpCapexAnnualWorkforcePostSdPlus: workforce,
    nstpCapexAnnualEnergyChemicalSdPlus: chemical,
    nstpCapexAnnualBacteriaPostSdPlus: bacteria,
    nstpOpex: nstp__q_outcomesPreSdPlus.opex - (energy + bacteria + workforce + chemical),
    nstpArea: nstp__st_selectedProductArea * twr__q_stpCapacityCalculator.stpCapacity
};
return ret}
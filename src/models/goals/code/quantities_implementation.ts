import { irr } from 'node-irr'; import { HwmDemandAssumptionBase, HwmDemandAssumptionVilla, HwmDemandAssumptionPenthouse, DemandAssumptionApartment, HwmDemandByBath, HwmOption, HeatPumpType, SwhType, SwhVariant, HpType, HwmHpHeatingSpeed, SdPlusInterventions, CurrentWaterTableRow, CurrentWaterTable, CurrentWaterTableInputsRow, CurrentWaterTableInputs, WaterPreSdPlusRow, WaterPreSdPlus, PlumbingDetailsPreSdPlus, EFCalculator, StpCalculator, PreSDPlusDemand, OutcomesPreSdPlus } from '../../../utilities/types'; import * as utilities from '../../../utilities/utility'; import { CityDbData, SDPlusDefaultsStore } from '../../../utilities/stores';export  function goals__q_totalGoalsAchieved(goals__q_goalNetZeroEnergy,goals__q_goalNetZeroWater,goals__q_goalNetZeroWaste,goals__q_goalNetZeroEmbodiedCarbon){let counter = 0;
for (const goal of [
goals__q_goalNetZeroEnergy,
goals__q_goalNetZeroWater,
goals__q_goalNetZeroWaste,
goals__q_goalNetZeroEmbodiedCarbon,
]) {
if (goal.status === 'Achieved') counter++;
}
return counter;}
export  function goals__q_totalTargetsAchieved(goals__q_targetNzeMORE,goals__q_targetNzeCAEN,goals__q_targetNzwCSWM,goals__q_targetNzecCSAM){let counter = 0;
for (const target of [
goals__q_targetNzeMORE,
goals__q_targetNzeCAEN,
goals__q_targetNzwCSWM,
goals__q_targetNzecCSAM,
]) {
if (target.status === 'Achieved') counter++;
}
return counter;}
export  function goals__q_totalTargetsTargeted(goals__q_targetNzeMORE,goals__q_targetNzeCAEN,goals__q_targetNzwCSWM,goals__q_targetNzecCSAM){let counter = 0;
for (const target of [
goals__q_targetNzeMORE,
goals__q_targetNzeCAEN,
goals__q_targetNzwCSWM,
goals__q_targetNzecCSAM,
]) {
if (target.state === true) counter++;
}
return counter;}
export  function goals__q_scCapexIncrease(goals__q_goalNetZeroEnergy,goals__q_goalNetZeroWater,goals__q_goalNetZeroWaste,goals__q_goalNetZeroEmbodiedCarbon){let sum = 0;
for (const goal of [
goals__q_goalNetZeroEnergy,
goals__q_goalNetZeroWater,
goals__q_goalNetZeroWaste,
goals__q_goalNetZeroEmbodiedCarbon,
]) {
sum += goal.costPerSqFt;
}
return sum;}
export  function goals__q_scorecard(goals__st_totalGoalsTargeted,goals__q_totalGoalsAchieved,goals__q_totalTargetsAchieved,goals__q_totalTargetsTargeted,goals__q_scCapexIncrease){return {
goals: {
  achieved: goals__q_totalGoalsAchieved,
  targeted: goals__st_totalGoalsTargeted,
},
targets: {
  achieved: goals__q_totalTargetsAchieved,
  targeted: goals__q_totalTargetsTargeted,
},
capexIncrease: goals__q_scCapexIncrease,
};}
export  function goals__q_goalNetZeroEnergy(trickle__pi_percentageEnergySavings:number,trickle__pi_capexSumEnergyEnabled:number,project__pi_builtUpArea:number){const progress = trickle__pi_percentageEnergySavings;
return {
name: 'Net Zero Energy',
description:
  'Net Zero Energy buildings generate as much energy as they consume, resulting in a net-zero balance between energy production and consumption.',
progress,
costPerSqFt: trickle__pi_capexSumEnergyEnabled / project__pi_builtUpArea,
status: utilities.utility_goalsStatusCheck(progress),
};}
export  function goals__q_targetNzeMORE(trickle__pi_renewableEnergySavings:number,trickle__pi_moreState:boolean,trickle__pi_annualBaselineEnergyConsumption:number,trickle__pi_sumOfCapexInRenewableSourcesSubCategory:number,trickle__pi_sumOfCapexInEnabledInterventionsInRenewableSourcesSubCategory:number,trickle__pi_energyServiceConsumptionSCRE:number,trickle__pi_projectBuiltUpArea:number){const maxRenewableEnergySavings = trickle__pi_renewableEnergySavings;
  const maxContributionPercentage =
    (maxRenewableEnergySavings / trickle__pi_annualBaselineEnergyConsumption) *
    100;

  const progress = trickle__pi_energyServiceConsumptionSCRE;
  const additionalCost =
    trickle__pi_sumOfCapexInRenewableSourcesSubCategory -
    trickle__pi_sumOfCapexInEnabledInterventionsInRenewableSourcesSubCategory;
  return {
    name: 'Maximize Onsite Renewable Energy',
    maxRenewableEnergySavings,
    maxContributionPercentage,
    additionalCost,
    tier: utilities.utility_goalsTierCheck(maxContributionPercentage),
    progress,
    status: utilities.utility_goalsStatusCheck(progress),
    achievability: maxRenewableEnergySavings == 0 ? 'No' : 'Yes',
    additionalCostPerUnitArea: additionalCost / trickle__pi_projectBuiltUpArea,
    state: trickle__pi_moreState,
  };}
export  function goals__q_targetNzeCAEN(trickle__pi_renewableEnergySavings:number,trickle__pi_annualBaselineEnergyConsumption:number,trickle__pi_energyServiceConsumptionSubCategoriesAnnualBaselineCommonAreaConsumption:number,trickle__pi_sumOfCapexInRenewableSourcesSubCategory:number,trickle__pi_sumOfCapexInEnabledInterventionsInRenewableSourcesSubCategory:number,trickle__pi_sumOfEnergySavingsAnnualOfEnabledInterventionsInRenewableSourcesSubCategory:number,trickle__pi_projectBuiltUpArea:number,trickle__pi_maxRenewableEnergySavings:number,trickle__pi_caenState:boolean){const maxContributionPercent =
(trickle__pi_maxRenewableEnergySavings /
  trickle__pi_annualBaselineEnergyConsumption) *
100;
const progress =
(trickle__pi_sumOfEnergySavingsAnnualOfEnabledInterventionsInRenewableSourcesSubCategory *
  100) /
trickle__pi_energyServiceConsumptionSubCategoriesAnnualBaselineCommonAreaConsumption;
const maxPotentialPercent =
(trickle__pi_maxRenewableEnergySavings * 100) /
trickle__pi_energyServiceConsumptionSubCategoriesAnnualBaselineCommonAreaConsumption;
const additionalCost =
trickle__pi_sumOfCapexInRenewableSourcesSubCategory -
trickle__pi_sumOfCapexInEnabledInterventionsInRenewableSourcesSubCategory;
return {
name: 'Common Area Energy Neutral',
maxRenewableEnergySavings: trickle__pi_renewableEnergySavings,
maxContributionPercent,
maxPotentialPercent,
additionalCost,
tier: utilities.utility_goalsTierCheck(maxContributionPercent),
progress,
status: utilities.utility_goalsStatusCheck(progress),
achievability: maxPotentialPercent < 100 ? 'No' : 'Yes',
additionalCostPerUnitArea: additionalCost / trickle__pi_projectBuiltUpArea,
state: trickle__pi_caenState,
};}
export  function goals__q_goalNetZeroWater(trickle__pi_waterServiceSustainabilityLevelPercentWaterSavings:number,trickle__pi_sumOfCapexInEnabledInterventionsInWaterCategory:number,trickle__pi_projectBuiltUpArea:number){const progress =
trickle__pi_waterServiceSustainabilityLevelPercentWaterSavings;
return {
name: 'Net Zero Water',
description:
  'Net Zero Water for a building involves strategies to minimize water usage and maximize reuse, aiming to balance water consumption with an equal return to the local watershed or aquifer, ultimately achieving a net-zero impact on water resources.',
progress,
costPerSqFt:
  trickle__pi_sumOfCapexInEnabledInterventionsInWaterCategory /
  trickle__pi_projectBuiltUpArea,
status: utilities.utility_goalsStatusCheck(progress),
};}
export  function goals__q_targetNzwCSWM(trickle__pi_swmServiceOutcomesSwmAnnualWater:number,trickle__pi_annualBaselineWaterConsumption:number,trickle__pi_projectBuiltUpArea:number,trickle__pi_swmEnabled:boolean,trickle__pi_swmServiceOutcomesSWMCapex:number,trickle__pi_cswmState:boolean){const maxContributionPercent =
(trickle__pi_swmServiceOutcomesSwmAnnualWater /
  trickle__pi_annualBaselineWaterConsumption) *
100;
const additionalCost = trickle__pi_swmEnabled
? 0
: trickle__pi_swmServiceOutcomesSWMCapex;
return {
name: 'Complete Smart Water Metering',
maxContributionPercent,
additionalCost,
tier: utilities.utility_goalsTierCheck(maxContributionPercent),
progress: trickle__pi_swmEnabled ? 100 : 0,
achievability: 'Yes',
additionalCostPerUnitArea: additionalCost / trickle__pi_projectBuiltUpArea,
state: trickle__pi_cswmState,
};}
export  function goals__q_goalNetZeroWaste(trickle__pi_waterServiceSLPercentWS:number,trickle__pi_sumOfCapexInEnabledInterventionsInWaterCategory:number,trickle__pi_projectBuiltUpArea:number){const progress = trickle__pi_waterServiceSLPercentWS;
return {
name: 'Net Zero Waste',
description:
  'Net Zero Waste in a building aims to reduce waste generation, increase recycling, and minimize landfill contributions, ultimately striving for a net-zero impact on waste disposal.',
progress,
costPerSqFt:
  trickle__pi_sumOfCapexInEnabledInterventionsInWaterCategory /
  trickle__pi_projectBuiltUpArea,
status: utilities.utility_goalsStatusCheck(progress),
};}
export  function goals__q_goalNetZeroEmbodiedCarbon(trickle__pi_materialServiceSustainabilityLevelPercentMaterialSavings:number,trickle__pi_sumOfCapexInEnabledInterventionsInMaterialCategory:number,trickle__pi_projectBuiltUpArea:number){const progress =
trickle__pi_materialServiceSustainabilityLevelPercentMaterialSavings;
return {
name: 'Net Zero Embodied Carbon',
description: `Net Zero Embodied Carbon in construction minimizes carbon emissions from building materials and processes, aiming for a net-zero impact on the building's carbon footprint.`,
progress,
costPerSqFt:
  trickle__pi_sumOfCapexInEnabledInterventionsInMaterialCategory /
  trickle__pi_projectBuiltUpArea,
status: utilities.utility_goalsStatusCheck(progress),
};}
export  function goals__q_targetNzecCSAM(trickle__pi_sumOfMaterialSavingsAnnualInStructureSubCategory:number,trickle__pi_materialServiceSustainabilityLevelAnnualBaselineEC:number,trickle__pi_sumOfCapexInStructureSubCategory:number,trickle__pi_sumOfCapexInEnabledInterventionsInStructureSubCategory:number,trickle__pi_sumOfMaterialSavingsAnnualInEnabledInterventionsInStructureSubCategory:number,trickle__pi_projectBuiltUpArea:number,trickle__pi_csamState:boolean){const maxMaterialSavings =
trickle__pi_sumOfMaterialSavingsAnnualInStructureSubCategory;
const maxContributionPercent =
(maxMaterialSavings /
  trickle__pi_materialServiceSustainabilityLevelAnnualBaselineEC) *
100;
const progress =
(trickle__pi_sumOfMaterialSavingsAnnualInEnabledInterventionsInStructureSubCategory *
  100) /
trickle__pi_materialServiceSustainabilityLevelAnnualBaselineEC;
const additionalCost =
trickle__pi_sumOfCapexInStructureSubCategory -
trickle__pi_sumOfCapexInEnabledInterventionsInStructureSubCategory;
return {
name: 'Core & Shell Alternative Materials',
list: 'Structural Steel, Cement',
maxMaterialSavings,
maxContributionPercent,
additionalCost,
tier: utilities.utility_goalsTierCheck(maxContributionPercent),
progress,
status: utilities.utility_goalsStatusCheck(progress),
achievability: 'Yes',
additionalCostPerUnitArea: additionalCost / trickle__pi_projectBuiltUpArea,
state: trickle__pi_csamState,
};}
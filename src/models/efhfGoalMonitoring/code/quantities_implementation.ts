import { irr } from 'node-irr'; import { HwmDemandAssumptionBase, HwmDemandAssumptionVilla, HwmDemandAssumptionPenthouse, DemandAssumptionApartment, HwmDemandByBath, HwmOption, HeatPumpType, SwhType, SwhVariant, HpType, HwmHpHeatingSpeed, SdPlusInterventions, CurrentWaterTableRow, CurrentWaterTable, CurrentWaterTableInputsRow, CurrentWaterTableInputs, WaterPreSdPlusRow, WaterPreSdPlus } from '../../../utilities/types'; import * as utilities from '../../../utilities/utility';

export function efhfGoalMonitoring__q_scoreCard(
  efhfGoalMonitoring__st_scTotalGoalsTargeted: number = 4,
  efhfGoalMonitoring__st_countOfAllGoalStatusEquals: number,
  efhfGoalMonitoring__st_countOfAllTargetStatusEquals: number,
  efhfGoalMonitoring__st_countOfAllTargetsStateEqualsOn: number,
  efhfGoalMonitoring__st_sumOfAllGoalCostPerSqft: number
) {
  const scTotalGoalsAchieved =
    efhfGoalMonitoring__st_countOfAllGoalStatusEquals;
  const scTotalGoalsTargeted = efhfGoalMonitoring__st_scTotalGoalsTargeted;
  const scTotalTargetsAchieved =
    efhfGoalMonitoring__st_countOfAllTargetStatusEquals;
  const scTotalTargetsTargeted =
    efhfGoalMonitoring__st_countOfAllTargetsStateEqualsOn;
  const scCapexIncrease = efhfGoalMonitoring__st_sumOfAllGoalCostPerSqft;

  return {
    scTotalGoalsAchieved,
    scTotalGoalsTargeted,
    scTotalTargetsAchieved,
    scTotalTargetsTargeted,
    scCapexIncrease,
  };
}


export function efhfGoalMonitoring__q_goalNetZeroEnergy(
  efhfGoalMonitoring__pi_energyServiceSustainabilityLevelPercentEnergySavings: number,
  efhfGoalMonitoring__pi_sumOfCapexInEnabledInterventionsInEnergyCategory: number,
  efhfGoalMonitoring__pi_projectBuiltUpArea: number
) {
  const nzeName = 'Net Zero Energy';
  const nzeProgressPercent =
    efhfGoalMonitoring__pi_energyServiceSustainabilityLevelPercentEnergySavings;
  const nzeCostPerSqft =
    efhfGoalMonitoring__pi_sumOfCapexInEnabledInterventionsInEnergyCategory /
    efhfGoalMonitoring__pi_projectBuiltUpArea;
  const nzeStatus = efhfGoalMonitoring__q_goalsStatusCheck(nzeProgressPercent);

  return {
    nzeName,
    nzeProgressPercent,
    nzeCostPerSqft,
    nzeStatus,
  };
}

export function efhfGoalMonitoring__q_nzeTargetMaximizeOnsiteRenewableEnergy(
    efhfGoalMonitoring__pi_energyServiceEnergyPotentialRenewableEnergySavings: number,
    efhfGoalMonitoring__pi_energyServiceSustainabilityLevelAnnualBaselineEnergyConsumption: number,
    efhfGoalMonitoring__pi_sumOfCapexInRenewableSourcesSubCategory: number,
    efhfGoalMonitoring__pi_sumOfCapexInEnabledInterventionsInRenewableSourcesSubCategory: number,
    efhfGoalMonitoring__pi_energyServiceConsumptionSubCategoriesRenewableEnergyPercent: number,
    efhfGoalMonitoring__pi_projectBuiltUpArea: number
) {
  const moreName = 'Maximize Onsite Renewable Energy';
  const moreListConnectedInterventions = spv;

  const moreMaxRenewableEnergySavings =
    efhfGoalMonitoring__pi_energyServiceEnergyPotentialRenewableEnergySavings;
  const moreMaxContributionPercent =
    (moreMaxRenewableEnergySavings * 100) /
    efhfGoalMonitoring__pi_energyServiceSustainabilityLevelAnnualBaselineEnergyConsumption;

  const moreAdditionalCost =
  efhfGoalMonitoring__pi_sumOfCapexInRenewableSourcesSubCategory -
  efhfGoalMonitoring__pi_sumOfCapexInEnabledInterventionsInRenewableSourcesSubCategory;

  const moreTier = (moreMaxContributionPercent);

  const moreProgressPercent =
  efhfGoalMonitoring__pi_energyServiceConsumptionSubCategoriesRenewableEnergyPercent;
  const moreStatus = efhfGoalMonitoring__q_goalsStatusCheck(moreProgressPercent);

  let moreAchievability;
  if (moreMaxRenewableEnergySavings == 0) {
    moreAchievability = 'No';
  } else {
    moreAchievability = 'Yes';
  }

  const moreAdditionalCostPerUnitArea = moreAdditionalCost / efhfGoalMonitoring__pi_projectBuiltUpArea;
}

import { irr } from 'node-irr'; import { HwmDemandAssumptionBase, HwmDemandAssumptionVilla, HwmDemandAssumptionPenthouse, DemandAssumptionApartment, HwmDemandByBath, HwmOption, HeatPumpType, SwhType, SwhVariant, HpType, HwmHpHeatingSpeed, SdPlusInterventions, CurrentWaterTableRow, CurrentWaterTable, CurrentWaterTableInputsRow, CurrentWaterTableInputs, WaterPreSdPlusRow, WaterPreSdPlus, PlumbingDetailsPreSdPlus, EFCalculator, StpCalculator, PreSDPlusDemand, OutcomesPreSdPlus } from '../../../utilities/types'; import * as utilities from '../../../utilities/utility'; import { CityDbData, SDPlusDefaultsStore } from '../../../utilities/stores';export  function water__q_customLCPDCalc(water__st_drinkingDrinkingDaily:number,water__st_drinkingDrinkingDuration:number,water__st_bisDrinkingFlow:number,water__st_drinkingCookingDaily:number,water__st_drinkingCookingDuration:number,water__st_bisCookingFlow:number,water__st_domesthicHealthFaucetDaily:number,water__st_domesthicHealthFaucetDuration:number,water__st_nbcBaseCaseHealthFaucetFlow:number,water__st_domesthicFaucetDaily:number,water__st_domesthicFaucetDuration:number,water__st_nbcBaseCaseFaucetFlow:number,water__st_domesthicKitchenSinkDaily:number,water__st_domesthicKitchenSinkDuration:number,water__st_nbcBaseCaseDomesticKitchenSinkFlow:number,water__st_domesticShowerDaily:number,water__st_domesticShowerDuration:number,water__st_nbcBaseCaseDomesticShowerFlow:number,water__st_domesticWashClothesDaily:number,water__st_domesticWashClothesDuration:number,water__st_nbcBaseCaseDomesticWashClothesFlow:number,water__st_domesticWashUtensilsDaily:number,water__st_domesticWashUtensilsDuration:number,water__st_nbcBaseCaseDomesticWashUtensilsFlow:number,water__st_FlushingFullDaily:number,water__st_FlushingFullDuration:number,water__st_nbcBaseCaseFlushingFullFlow:number,water__st_FlushingHalfDaily:number,water__st_FlushingHalfDuration:number,water__st_nbcBaseCaseFlushingHalfFlow:number){let ret;
const nbcBaseCaseDrinkingDrinkingLPCD =
water__st_drinkingDrinkingDaily * water__st_drinkingDrinkingDuration * water__st_bisDrinkingFlow
const nbcBaseCaseDrinkingCookingLPCD =
water__st_drinkingCookingDaily * water__st_drinkingCookingDuration * water__st_bisCookingFlow
const nbcBaseCaseHealthFaucetLPCD =
water__st_domesthicHealthFaucetDaily * water__st_domesthicHealthFaucetDuration * water__st_nbcBaseCaseHealthFaucetFlow
const nbcBaseCaseFaucetLPCD =
water__st_domesthicFaucetDaily * water__st_domesthicFaucetDuration * water__st_nbcBaseCaseFaucetFlow
const nbcBaseCaseKitcheSinkLPCD =
water__st_domesthicKitchenSinkDaily * water__st_domesthicKitchenSinkDuration * water__st_nbcBaseCaseDomesticKitchenSinkFlow
const nbcBaseCaseShowerLPCD =
water__st_domesticShowerDaily * water__st_domesticShowerDuration * water__st_nbcBaseCaseDomesticShowerFlow
const nbcBaseCaseWashClothesLPCD =
water__st_domesticWashClothesDaily * water__st_domesticWashClothesDuration * water__st_nbcBaseCaseDomesticWashClothesFlow
const nbcBaseCaseWashUtensilsLPCD =
water__st_domesticWashUtensilsDaily * water__st_domesticWashUtensilsDuration * water__st_nbcBaseCaseDomesticWashUtensilsFlow
const nbcBaseCaseFlushingFullLPCD =
water__st_FlushingFullDaily * water__st_FlushingFullDuration * water__st_nbcBaseCaseFlushingFullFlow
const nbcBaseCaseFlushingHalfLPCD =
water__st_FlushingHalfDaily * water__st_FlushingHalfDuration * water__st_nbcBaseCaseFlushingHalfFlow
const drinkingLPCD = nbcBaseCaseDrinkingDrinkingLPCD + nbcBaseCaseDrinkingCookingLPCD;
const nonDrinkingLPCD = nbcBaseCaseHealthFaucetLPCD + nbcBaseCaseFaucetLPCD + nbcBaseCaseKitcheSinkLPCD
+ nbcBaseCaseShowerLPCD + nbcBaseCaseWashClothesLPCD + nbcBaseCaseWashUtensilsLPCD + nbcBaseCaseFlushingFullLPCD + nbcBaseCaseFlushingHalfLPCD
const healthFaucetFactor = nbcBaseCaseHealthFaucetLPCD / nonDrinkingLPCD;
const faucetFactor = nbcBaseCaseFaucetLPCD / nonDrinkingLPCD;
const kitchenSinkFactor = nbcBaseCaseKitcheSinkLPCD / nonDrinkingLPCD;
const showerFactor = nbcBaseCaseShowerLPCD / nonDrinkingLPCD;
const washUtensilsFactor = nbcBaseCaseWashUtensilsLPCD / nonDrinkingLPCD;
const washClothesFactor = nbcBaseCaseWashClothesLPCD / nonDrinkingLPCD;
const flushingFullFactor = nbcBaseCaseFlushingFullLPCD / nonDrinkingLPCD;
const flushingHalfFactor = nbcBaseCaseFlushingHalfLPCD / nonDrinkingLPCD;
ret = {
nbcBaseCaseDrinkingDrinkingLPCD: nbcBaseCaseDrinkingDrinkingLPCD,
nbcBaseCaseDrinkingCookingLPCD: nbcBaseCaseDrinkingCookingLPCD,
nbcBaseCaseHealthFaucetLPCD: nbcBaseCaseHealthFaucetLPCD,
nbcBaseCaseFaucetLPCD: nbcBaseCaseFaucetLPCD,
nbcBaseCaseKitcheSinkLPCD: nbcBaseCaseKitcheSinkLPCD,
nbcBaseCaseShowerLPCD: nbcBaseCaseShowerLPCD,
nbcBaseCaseWashClothesLPCD: nbcBaseCaseWashClothesLPCD,
nbcBaseCaseWashUtensilsLPCD: nbcBaseCaseWashUtensilsLPCD,
nbcBaseCaseFlushingFullLPCD: nbcBaseCaseFlushingFullLPCD,
nbcBaseCaseFlushingHalfLPCD: nbcBaseCaseFlushingHalfLPCD,
drinkingLPCD: drinkingLPCD,
nonDrinkingLPCD: nonDrinkingLPCD,
healthFaucetFactor: healthFaucetFactor,
faucetFactor: faucetFactor,
kitchenSinkFactor: kitchenSinkFactor,
showerFactor: showerFactor,
washUtensilsFactor: washUtensilsFactor,
washClothesFactor: washClothesFactor,
flushingFullFactor: flushingFullFactor,
flushingHalfFactor: flushingHalfFactor
}
return ret;}
export  function water__q_preSdPlus(water__pi_manualEntry:boolean,water__pi_domestichHealthFaucetFlow:number,water__pi_domesticHealthFaucetPrice:number,water__pi_domesticFaucetFlow:number,water__pi_domesticFaucetPrice:number,water__pi_domesticKitchenSinkFlow:number,water__pi_domesticKitchenSinkPrice:number,water__pi_domesticShowerFlow:number,water__pi_domesticShowerPrice:number,water__pi_customLPCD:boolean,water__pi_domesticFlushingFullFlow:number,water__pi_domesticFlushingFullPrice:number,water__pi_domesticFlushingHalfFlow:number,water__pi_domesticFlushingHalfPrice:number,water__st_nbcBaseCaseHealthFaucetFlow:number,water__st_nbcBaseCaseHealthFaucetPrice:number,water__st_nbcBaseCaseDomesticWashUtensilsFlow:number,water__st_nbcBaseCaseDomesticWashClothesFlow:number,water__st_nbcBaseCaseFaucetFlow:number,water__st_nbcBaseCaseFaucetPrice:number,water__st_nbcBaseCaseKitchenSinkFlow:number,water__st_nbcBaseCaseKitchenSinkPrice:number,water__st_nbcBaseCaseShowerFlow:number,water__st_nbcBaseCaseShowerPrice:number,water__st_manualLPCD:number,water__st_domesticHealthFaucetDuration:number,water__st_domesticHealthFaucetDaily:number,water__st_domesticFaucetDuration:number,water__st_domesticFaucetDaily:number,water__st_domesticKitchenSinkDuration:number,water__st_domesticKitchenSinkDaily:number,water__st_domesticShowerDuration:number,water__st_domesticShowerDaily:number,water__st_domesticWashUtensilsDuration:number,water__st_domesticWashUtensilsDaily:number,water__st_domesticWashClothesDuration:number,water__st_domesticWashClothesDaily:number,water__st_flushingFullDuration:number,water__st_flushingFullDaily:number,water__st_nbcBaseFlushingFullPrice:number,water__st_flushingHalfDuration:number,water__st_flushingHalfDaily:number,water__st_nbcBaseFlushingHalfPrice:number,water__st_nbcBaseFlushingFullFlow:number,water__st_nbcBaseFlushingHalfFlow:number,water__q_customLCPDCalc){let ret: WaterPreSdPlus;
if (water__pi_manualEntry === true) {
ret = {
  domesticHealthFaucet: {
    flow: water__pi_domestichHealthFaucetFlow,
    price: water__pi_domesticHealthFaucetPrice,
  },
  domesticFaucet: {
    flow: water__pi_domesticFaucetFlow,
    price: water__pi_domesticFaucetPrice
  },
  domesticKitchenSink: {
    flow: water__pi_domesticKitchenSinkFlow,
    price: water__pi_domesticKitchenSinkPrice
  },
  domesticShower: {
    flow: water__pi_domesticShowerFlow,
    price: water__pi_domesticShowerPrice
  },
  flushingFull: {
    flow: water__pi_domesticFlushingFullFlow,
    price: water__pi_domesticFlushingFullPrice
  },
  flushingHalf: {
    flow: water__pi_domesticFlushingHalfFlow,
    price: water__pi_domesticFlushingHalfPrice
  },
  domesticWashUtensilsFlow: water__st_nbcBaseCaseDomesticWashUtensilsFlow,
  domesticWashClothesFlow: water__st_nbcBaseCaseDomesticWashClothesFlow
};
}
else if (water__pi_customLPCD === true) {
const manualLPCDNonDrinking = water__st_manualLPCD - water__q_customLCPDCalc.drinkingLPCD;
ret = {
  manualLPCDNonDrinking: manualLPCDNonDrinking,
  domesticHealthFaucet: {
    flow: (water__q_customLCPDCalc.healthFaucetFactor * manualLPCDNonDrinking) / (water__st_domesticHealthFaucetDuration * water__st_domesticHealthFaucetDaily),
    price: water__st_nbcBaseCaseHealthFaucetPrice
  },
  domesticFaucet: {
    flow: (water__q_customLCPDCalc.faucetFactor * manualLPCDNonDrinking) / (water__st_domesticFaucetDuration * water__st_domesticFaucetDaily),
    price: water__st_nbcBaseCaseFaucetPrice
  },
  domesticKitchenSink: {
    flow: (water__q_customLCPDCalc.kitchenSinkFactor * manualLPCDNonDrinking) / (water__st_domesticKitchenSinkDuration * water__st_domesticKitchenSinkDaily),
    price: water__st_nbcBaseCaseKitchenSinkPrice
  },
  domesticShower: {
    flow: (water__q_customLCPDCalc.showerFactor * manualLPCDNonDrinking) / (water__st_domesticShowerDuration * water__st_domesticShowerDaily),
    price: water__st_nbcBaseCaseShowerPrice
  },
  flushingFull: {
    flow: (water__q_customLCPDCalc.flushingFullFactor * manualLPCDNonDrinking) / (water__st_flushingFullDuration * water__st_flushingFullDaily),
    price: water__st_nbcBaseFlushingFullPrice
  },
  flushingHalf: {
    flow: (water__q_customLCPDCalc.flushingHalfFactor * manualLPCDNonDrinking) / (water__st_flushingHalfDuration * water__st_flushingHalfDaily),
    price: water__st_nbcBaseFlushingHalfPrice
  },
  domesticWashUtensilsFlow: (water__q_customLCPDCalc.washUtensilsFactor * manualLPCDNonDrinking) / (water__st_domesticWashUtensilsDuration * water__st_domesticWashUtensilsDaily),
  domesticWashClothesFlow: (water__q_customLCPDCalc.washClothesFactor * manualLPCDNonDrinking) / (water__st_domesticWashClothesDuration * water__st_domesticWashClothesDaily),
}
}
else {
ret = {
  domesticHealthFaucet: {
    flow: water__st_nbcBaseCaseHealthFaucetFlow,
    price: water__st_nbcBaseCaseHealthFaucetPrice,
  },
  domesticFaucet: {
    flow: water__st_nbcBaseCaseFaucetFlow,
    price: water__st_nbcBaseCaseFaucetPrice
  },
  domesticKitchenSink: {
    flow: water__st_nbcBaseCaseKitchenSinkFlow,
    price: water__st_nbcBaseCaseKitchenSinkPrice
  },
  domesticShower: {
    flow: water__st_nbcBaseCaseShowerFlow,
    price: water__st_nbcBaseCaseShowerPrice
  },
  flushingFull: {
    flow: water__st_nbcBaseFlushingFullFlow,
    price: water__st_nbcBaseFlushingFullPrice
  },
  flushingHalf: {
    flow: water__st_nbcBaseFlushingHalfFlow,
    price: water__st_nbcBaseFlushingHalfPrice
  },
  domesticWashUtensilsFlow: water__st_nbcBaseCaseDomesticWashUtensilsFlow,
  domesticWashClothesFlow: water__st_nbcBaseCaseDomesticWashClothesFlow
};
}
return ret;}
export  function water__q_plubmingDetailsPreSD(water__pi_alreadyInstalledCRO:boolean,water__pi_assumeIndividualRO:boolean,water__st_bisDrinkingDrinnkingFlow:number,water__st_bisDrinkingCookingFlow:number,water__st_roEfficiency:number,water__st_croEfficiency:number,water__st_bisDrinkingClubHouseFlow:number,water__st_bisCookingClubHouseFlow:number){let ret: PlumbingDetailsPreSdPlus;
if (water__pi_alreadyInstalledCRO === true) {
ret = {
  drinkingDrinkingFlow: water__st_bisDrinkingDrinnkingFlow / water__st_croEfficiency,
  drinkingCookingFlow: water__st_bisDrinkingCookingFlow / water__st_croEfficiency,
  clubhouseDrinkingFlow: water__st_bisDrinkingClubHouseFlow / water__st_croEfficiency,
  clubhouseCookingFlow: water__st_bisCookingClubHouseFlow / water__st_croEfficiency
}
}
else if (water__pi_assumeIndividualRO === true) {
ret = {
  drinkingDrinkingFlow: water__st_bisDrinkingDrinnkingFlow / water__st_roEfficiency,
  drinkingCookingFlow: water__st_bisDrinkingCookingFlow / water__st_roEfficiency,
  clubhouseDrinkingFlow: water__st_bisDrinkingClubHouseFlow / water__st_roEfficiency,
  clubhouseCookingFlow: water__st_bisCookingClubHouseFlow / water__st_roEfficiency
}
}
else {
ret = {
  drinkingDrinkingFlow: water__st_bisDrinkingDrinnkingFlow,
  drinkingCookingFlow: water__st_bisDrinkingCookingFlow,
  clubhouseDrinkingFlow: water__st_bisDrinkingClubHouseFlow,
  clubhouseCookingFlow: water__st_bisCookingClubHouseFlow
}
}
return ret;}
export  function water__q_currentWaterTable(water__pi_landscapeArea:number,water__pi_noOfCarParks:number,water__pi_areaOfLobbiesAndCorridors:number,water__pi_swimmingPoolSurfaceArea:number,water__st_drinkingDrinkingDaily:number,water__st_drinkingDrinkingDuration:number,water__st_drinkingCookingDaily:number,water__st_drinkingCookingDuration:number,water__st_domesticHealthFaucetDaily:number,water__st_domesticHealthFaucetDuration:number,water__st_domesticFaucetDaily:number,water__st_domesticFaucetDuration:number,water__st_domesticKitchenSinkDaily:number,water__st_domesticKitchenSinkDuration:number,water__st_domesticShowerDaily:number,water__st_domesticShowerDuration:number,water__st_domesticWashClothesDaily:number,water__st_domesticWashClothesDuration:number,water__st_domesticWashUtensilsDaily:number,water__st_domesticWashUtensilsDuration:number,water__st_flushingFullDaily:number,water__st_flushingFullDuration:number,water__st_flushingHalfDaily:number,water__st_flushingHalfDuration:number,water__st_clubhouseDrinkingDrinkingDaily:number,water__st_clubhouseDrinkingDrinkingDuration:number,water__st_clubhouseDrinkingCookingDaily:number,water__st_clubhouseDrinkingCookingDuration:number,water__st_clubhouseHealthFaucetDaily:number,water__st_clubhouseHealthFaucetDuration:number,water__st_clubhouseFaucetDaily:number,water__st_clubhouseFaucetDuration:number,water__st_clubhouseShowerDaily:number,water__st_clubhouseShowerDuration:number,water__st_clubhouseFlushingFullDaily:number,water__st_clubhouseFlushingFullDuration:number,water__st_clubhouseFlushingHalfDaily:number,water__st_clubhouseFlushingHalfDuration:number,water__st_dailyLandScapeWaterUse:number,water__st_dailyCarWashWaterUse:number,water__st_dailyLobbiesAndCorridorsWaterUse:number,water__st_swimmingPoolDepth:number,water__st_swimmingPoolWaterPerCubicMeter:number,water__st_swimmingPoolEvaporationRate:number,water__st_domesticSelectedHealthFaucetFlow:number,water__st_domesticSelectedFaucetFlow:number,water__st_domesticSelectedKitchenSinkFlow:number,water__st_domesticSelectedShowerFlow:number,water__st_selectedflushingHalfFlow:number,water__st_selectedflushingFullFlow:number,water__st_SWMEfficiency:number,water__q_plubmingDetailsPreSD:PlumbingDetailsPreSdPlus,water__q_preSdPlus:WaterPreSdPlus){const domesticHealthFaucet =
  water__st_domesticHealthFaucetDaily *
  water__st_domesticHealthFaucetDuration *
  water__st_domesticSelectedHealthFaucetFlow;

  const clubhouseDomesticHealthFaucet = 
  water__st_clubhouseHealthFaucetDaily * 
  water__st_clubhouseHealthFaucetDuration * 
  water__q_preSdPlus.domesticHealthFaucet.flow;

  const residentialDomesticValue =
    water__st_domesticHealthFaucetDaily *
    water__st_domesticHealthFaucetDuration *
    water__q_preSdPlus.domesticHealthFaucet.flow
    +
    water__st_domesticFaucetDaily *
    water__st_domesticFaucetDuration *
    water__q_preSdPlus.domesticFaucet.flow
    +
    water__st_domesticKitchenSinkDaily *
    water__st_domesticKitchenSinkDuration *
    water__q_preSdPlus.domesticKitchenSink.flow
    +
    water__st_domesticShowerDaily *
    water__st_domesticShowerDuration *
    water__q_preSdPlus.domesticShower.flow
    +
    water__st_domesticWashClothesDaily *
    water__st_domesticWashClothesDuration *
    water__q_preSdPlus.domesticWashClothesFlow
    +
    water__st_domesticWashUtensilsDaily *
    water__st_domesticWashUtensilsDuration *
    water__q_preSdPlus.domesticWashUtensilsFlow;

  const residentialDrinkingValue =
    water__st_drinkingDrinkingDaily *
    water__st_drinkingDrinkingDuration *
    water__q_plubmingDetailsPreSD.drinkingDrinkingFlow
    +
    water__st_drinkingCookingDaily *
    water__st_drinkingCookingDuration *
    water__q_plubmingDetailsPreSD.drinkingCookingFlow;

  const residentialFlushingValue =
    water__st_flushingHalfDaily * water__st_flushingHalfDuration * water__q_preSdPlus.flushingHalf.flow
    +
    water__st_flushingFullDaily * water__st_flushingFullDuration * water__q_preSdPlus.flushingFull.flow;
  let ret: CurrentWaterTable = {
    totalLPCD: {
      totalLPCDPreSDPlus: residentialDrinkingValue + residentialDomesticValue + residentialFlushingValue
    },
    clientBaseCase: {
      residentialDrinking: residentialDrinkingValue,
      residentialDomestic: residentialDomesticValue,
      residentialFlushing: residentialFlushingValue,
      clubhouseDrinking:
        water__st_clubhouseDrinkingDrinkingDaily * water__st_clubhouseDrinkingDrinkingDuration * water__q_plubmingDetailsPreSD.clubhouseDrinkingFlow
        +
        water__st_clubhouseDrinkingCookingDaily * water__st_clubhouseDrinkingCookingDuration * water__q_plubmingDetailsPreSD.clubhouseCookingFlow,
      clubhouseDomestic:
        water__st_clubhouseHealthFaucetDaily * water__st_clubhouseHealthFaucetDuration * water__q_preSdPlus.domesticHealthFaucet.flow
        +
        water__st_clubhouseFaucetDaily * water__st_clubhouseFaucetDuration * water__q_preSdPlus.domesticFaucet.flow
        +
        water__st_clubhouseShowerDaily * water__st_clubhouseShowerDuration * water__q_preSdPlus.domesticShower.flow,
      clubhouseFlushing:
        water__st_clubhouseFlushingFullDaily * water__st_clubhouseFlushingFullDuration * water__q_preSdPlus.flushingFull.flow
        +
        water__st_clubhouseFlushingHalfDaily * water__st_clubhouseFlushingHalfDuration * water__q_preSdPlus.flushingHalf.flow,
      commonAreaLandScape:
        water__pi_landscapeArea * water__st_dailyLandScapeWaterUse,
      commonAreaCarPark:
        water__pi_noOfCarParks * water__st_dailyCarWashWaterUse,
      commonAreaCleaning:
        water__pi_areaOfLobbiesAndCorridors * water__st_dailyLobbiesAndCorridorsWaterUse,
      swimmingPool:
        water__pi_swimmingPoolSurfaceArea * water__st_swimmingPoolDepth * water__st_swimmingPoolWaterPerCubicMeter * water__st_swimmingPoolEvaporationRate

    },
    efficientFixtures: {
      residentialDrinking:
        water__st_drinkingDrinkingDaily *
        water__st_drinkingDrinkingDuration *
        water__q_plubmingDetailsPreSD.drinkingDrinkingFlow
        +
        water__st_drinkingCookingDaily *
        water__st_drinkingCookingDuration *
        water__q_plubmingDetailsPreSD.drinkingCookingFlow,
      residentialDomestic:
        water__st_domesticHealthFaucetDaily *
        water__st_domesticHealthFaucetDuration *
        water__st_domesticSelectedHealthFaucetFlow
        +
        water__st_domesticFaucetDaily *
        water__st_domesticFaucetDuration *
        water__st_domesticSelectedFaucetFlow
        +
        water__st_domesticKitchenSinkDaily *
        water__st_domesticKitchenSinkDuration *
        water__st_domesticSelectedKitchenSinkFlow
        +
        water__st_domesticShowerDaily *
        water__st_domesticShowerDuration *
        water__st_domesticSelectedShowerFlow
        +
        water__st_domesticWashClothesDaily *
        water__st_domesticWashClothesDuration *
        water__q_preSdPlus.domesticWashClothesFlow
        +
        water__st_domesticWashUtensilsDaily *
        water__st_domesticWashUtensilsDuration *
        water__q_preSdPlus.domesticWashUtensilsFlow,
      residentialFlushing:
        water__st_flushingHalfDaily * water__st_flushingHalfDuration * water__q_preSdPlus.flushingHalf.flow
        +
        water__st_flushingFullDaily * water__st_flushingFullDuration * water__q_preSdPlus.flushingFull.flow,
      clubhouseDomestic:
        water__st_clubhouseHealthFaucetDaily * water__st_clubhouseHealthFaucetDuration * water__q_preSdPlus.domesticHealthFaucet.flow
        +
        water__st_clubhouseFaucetDaily * water__st_clubhouseFaucetDuration * water__q_preSdPlus.domesticFaucet.flow
        +
        water__st_clubhouseShowerDaily * water__st_clubhouseShowerDuration * water__q_preSdPlus.domesticShower.flow,
        domesticHealthFaucet: domesticHealthFaucet,
        clubhouseDomesticHealthFaucet: clubhouseDomesticHealthFaucet
    },
    dualFlush: {
      residentialFlushing:
        water__st_flushingHalfDaily * water__st_flushingHalfDuration * water__st_selectedflushingHalfFlow
        +
        water__st_flushingFullDaily * water__st_flushingFullDuration * water__st_selectedflushingFullFlow,
      clubhouseFlushing:
        water__st_clubhouseFlushingFullDaily * water__st_clubhouseFlushingFullDuration * water__q_preSdPlus.flushingFull.flow
        +
        water__st_clubhouseFlushingHalfDaily * water__st_clubhouseFlushingHalfDuration * water__q_preSdPlus.flushingHalf.flow,
    },
    smartWaterMeter: {
      residentialDomestic: residentialDomesticValue * water__st_SWMEfficiency
    },
  };
  return ret;}
export  function water__q_noop(water__st_pumpEfficiency,water__st_motorEfficiency,water__st_specificGravityOfWater,water__st_pumpFlowRate){return null}
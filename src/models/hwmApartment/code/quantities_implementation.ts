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
export function hwmApartment__q_outcomes(
  hwmApartment__pi_hotWaterFloors: number,
  hwmApartment__pi_swhType: SwhType,
  hwmApartment__pi_swhVariant: SwhVariant,
  hwmApartment__pi_hpType: HpType,
  hwmApartment__pi_userSwhCapacity: number,
  hwmApartment__pi_userHpCapacity: number,
  hwmApartment__pi_option: HwmOption,
  hwmApartment__pi_hpHeatingSpeed: HwmHpHeatingSpeed,
  project__pi_city: string,
  project__pi_floorHeight: number,
  project__pi_numberOfFloors: number,
  hwmApartment__pi_selectedProductIdentifier: string,
  hwmApartment__pi_efficiencyFactor: number,
  hwmApartment__pi_floorHeight: number,
  hwmApartment__pi_userCityResidentialUtilityTariff: number,
  hwm__pi_userNumberOfShafts: number,
  hwmApartment__pi_capexSourceType: string,
  hwmApartment__pi_customCapex: number,
  hwm__st_slowHeatingTime: number,
  hwm__st_fastHeatingTime: number,
  hwm__st_defaultHeatingTime: number,
  hwm__st_initialTemp: number,
  hwm__st_conversionFactor: number,
  global__st_hoursInDay: number,
  hwm__st_heatLossCoeff: number,
  hwm__st_supRet: number,
  hwm__st_defaultNumberOfShafts: number,
  hwm__st_hzPipe: number,
  hwm__st_outletTempSwimmingPool: number,
  hwm__st_outletTempOther: number,
  hwmApartment__q_outcomesPreSdPlus,
  hwmApartment__q_technologySelection,
  hwmApartment__q_hwmDemand
) {
  let defaultCityResidentialUtilityTariff: number;
  let cityResidentialUtilityTariff: number;
  let selectedProductPrice: number;
  let selectedProductCapacity: number;
  let selectedProductRatedInputPower: number;
  let selectedProductRatedHeatingCapacity: number;
  let selectedProductMiscHpCost: number;
  let selectedProductMiscSwhCost: number;
  let theProduct: any;
  let hpProductResolver: any;
  let defaultProductIdentifier: string;
  let defaultSwhApartmentCapacity = null;
  let defaultHpApartmentCapacity = null;
  let swhApartmentCapacity = null;
  let hpApartmentCapacity = null;
  let hwmApartmentEnergyAnnual = null;
  let hwmApartmentCapexPostSDplus;
  let hwmApartmentCustomCapex = null;
  let hwmApartmentVendorCapex;
  let hwmApartmentOpex = null;
  let hwmApartmentAreaReqd = null;
  let numberOfDomesticHp = null;
  let numberOfProducts = null;
  let numberOfCommercialHp = null;
  let hybridNumberOfHp = null;
  let numberOfHp = null;
  let numberOfSwh = null;
  let defaultNumberOfShafts = hwm__st_defaultNumberOfShafts;
  let numberOfShafts = utilities.utility_userOrDefaultValue(
    hwm__st_defaultNumberOfShafts,
    hwm__pi_userNumberOfShafts
  );
  let time = utilities.utility_hwmHpTimeCalculator(
    hwmApartment__pi_hpHeatingSpeed,
    hwm__st_slowHeatingTime,
    hwm__st_fastHeatingTime,
    hwm__st_defaultHeatingTime
  );
  defaultCityResidentialUtilityTariff =
    utilities.utility_getCityResidentialUtiliyTariff(project__pi_city);
  cityResidentialUtilityTariff = utilities.utility_userOrDefaultValue(
    defaultCityResidentialUtilityTariff,
    hwmApartment__pi_userCityResidentialUtilityTariff
  );
  if (
    hwmApartment__pi_option === 'solar water heater' &&
    hwmApartment__pi_swhType === 'central'
  ) {
    defaultProductIdentifier = utilities.utility_swhProductResolver(
      hwmApartment__pi_swhType,
      hwmApartment__pi_swhVariant,
      hwmApartment__q_technologySelection.defaultSwhCentralCapacity,
      'HWM_Apartment'
    );
    theProduct = utilities.utility_defaultOrSelectedProduct(
      defaultProductIdentifier,
      hwmApartment__pi_selectedProductIdentifier
    );
    selectedProductPrice = utilities.utility_numberFromString(theProduct.price);
    selectedProductCapacity = utilities.utility_numberFromString(
      theProduct.filters['Capacity '][0]
    );
    defaultSwhApartmentCapacity =
      hwmApartment__q_technologySelection.defaultSwhCentralCapacity;
    swhApartmentCapacity = utilities.utility_userOrDefaultValue(
      defaultSwhApartmentCapacity,
      hwmApartment__pi_userSwhCapacity
    );
    hwmApartmentEnergyAnnual = utilities.utility_swhEnergySavings(
      hwmApartment__pi_swhType,
      hwmApartment__q_technologySelection.defaultSwhCentralCapacity,
      0
    );
    hwmApartmentCapexPostSDplus = utilities.utility_swhCapex(
      hwmApartment__pi_swhType,
      hwmApartment__q_technologySelection.defaultSwhCentralCapacity,
      selectedProductPrice,
      selectedProductCapacity,
      0
    );
    hwmApartmentVendorCapex =
      hwmApartmentCapexPostSDplus -
      hwmApartment__q_outcomesPreSdPlus.hwmCapexPreSdPlus;
    hwmApartmentOpex = utilities.utility_energyOpex(
      hwmApartmentEnergyAnnual,
      project__pi_city
    );
    hwmApartmentAreaReqd = hwmApartment__q_technologySelection.swhAreaRequired;
  } else if (
    hwmApartment__pi_option === 'solar water heater' &&
    hwmApartment__pi_swhType === 'individual'
  ) {
    defaultProductIdentifier = utilities.utility_swhProductResolver(
      hwmApartment__pi_swhType,
      hwmApartment__pi_swhVariant,
      hwmApartment__q_technologySelection.defaultSwhCentralCapacity,
      'HWM_Apartment'
    );
    theProduct = utilities.utility_defaultOrSelectedProduct(
      defaultProductIdentifier,
      hwmApartment__pi_selectedProductIdentifier
    );
    selectedProductPrice = utilities.utility_numberFromString(theProduct.price);
    selectedProductCapacity = utilities.utility_numberFromString(
      theProduct.filters['Capacity '][0]
    );
    defaultSwhApartmentCapacity =
      hwmApartment__q_technologySelection.defaultSwhIndividualCapacity;
    swhApartmentCapacity = utilities.utility_userOrDefaultValue(
      defaultSwhApartmentCapacity,
      hwmApartment__pi_userSwhCapacity
    );
    hwmApartmentEnergyAnnual = utilities.utility_swhEnergySavings(
      hwmApartment__pi_swhType,
      hwmApartment__q_technologySelection.defaultSwhIndividualCapacity,
      hwmApartment__q_hwmDemand.hotWaterApts
    );
    hwmApartmentCapexPostSDplus = utilities.utility_swhCapex(
      hwmApartment__pi_swhType,
      hwmApartment__q_technologySelection.defaultSwhIndividualCapacity,
      selectedProductPrice,
      selectedProductCapacity,
      hwmApartment__q_hwmDemand.hotWaterApts
    );
    hwmApartmentVendorCapex =
      hwmApartmentCapexPostSDplus -
      hwmApartment__q_outcomesPreSdPlus.hwmCapexPreSdPlus;
    hwmApartmentOpex = utilities.utility_energyOpex(
      hwmApartmentEnergyAnnual,
      project__pi_city
    );
    hwmApartmentAreaReqd = hwmApartment__q_technologySelection.swhAreaRequired;
  } else if (
    hwmApartment__pi_option === 'heat pump' &&
    hwmApartment__pi_hpType === 'domestic'
  ) {
    const outletTemp = utilities.utility_hwmOutletTemp(
      hwmApartment__pi_hpType,
      hwm__st_outletTempSwimmingPool,
      hwm__st_outletTempOther
    );
    hpProductResolver = utilities.utility_hpProductresolver(
      hwmApartment__pi_hpType,
      hwmApartment__q_technologySelection.defaultHpDomesticCapacity,
      time,
      project__pi_floorHeight,
      hwmApartment__pi_hotWaterFloors,
      outletTemp,
      hwm__st_initialTemp,
      hwm__st_conversionFactor,
      global__st_hoursInDay,
      hwm__st_heatLossCoeff,
      hwm__st_supRet,
      numberOfShafts,
      hwm__st_hzPipe,
      'HWM_Apartment'
    );
    theProduct = utilities.utility_defaultOrSelectedProduct(
      hpProductResolver.defaultProductIdentifier,
      hwmApartment__pi_selectedProductIdentifier
    );
    selectedProductPrice = utilities.utility_numberFromString(theProduct.price);
    selectedProductRatedInputPower = utilities.utility_numberFromObject(
      theProduct.properties,
      'Rated Input Power (kW)'
    );
    defaultHpApartmentCapacity =
      hwmApartment__q_technologySelection.defaultHpDomesticCapacity;
    hpApartmentCapacity = utilities.utility_userOrDefaultValue(
      defaultHpApartmentCapacity,
      hwmApartment__pi_userHpCapacity
    );
    numberOfProducts = hwmApartment__q_hwmDemand.hotWaterApts;
    hwmApartmentEnergyAnnual = utilities.utility_hpEnergySavings(
      hwmApartment__pi_hpType,
      hwmApartment__q_technologySelection.defaultHpDomesticCapacity,
      selectedProductRatedInputPower,
      numberOfProducts,
      time
    );
    hwmApartmentCapexPostSDplus = utilities.utility_hpCapex(
      hwmApartment__pi_hpType,
      hwmApartment__q_technologySelection.defaultHpDomesticCapacity,
      numberOfProducts,
      selectedProductPrice,
      selectedProductRatedInputPower,
      hpProductResolver.pipelength
    );
    hwmApartmentVendorCapex =
      hwmApartmentCapexPostSDplus -
      hwmApartment__q_outcomesPreSdPlus.hwmCapexPreSdPlus;
    hwmApartmentOpex = utilities.utility_energyOpex(
      hwmApartmentEnergyAnnual,
      project__pi_city
    );
    hwmApartmentAreaReqd = hwmApartment__q_technologySelection.hpAreaRequired;
  } else if (
    hwmApartment__pi_option === 'heat pump' &&
    hwmApartment__pi_hpType === 'commercial'
  ) {
    const outletTemp = utilities.utility_hwmOutletTemp(
      hwmApartment__pi_hpType,
      hwm__st_outletTempSwimmingPool,
      hwm__st_outletTempOther
    );
    hpProductResolver = utilities.utility_hpProductresolver(
      hwmApartment__pi_hpType,
      hwmApartment__q_technologySelection.defaultHpCommercialCapacity,
      time,
      project__pi_floorHeight,
      hwmApartment__pi_hotWaterFloors,
      outletTemp,
      hwm__st_initialTemp,
      hwm__st_conversionFactor,
      global__st_hoursInDay,
      hwm__st_heatLossCoeff,
      hwm__st_supRet,
      numberOfShafts,
      hwm__st_hzPipe,
      'HWM_Apartment'
    );
    theProduct = utilities.utility_defaultOrSelectedProduct(
      hpProductResolver.defaultProductIdentifier,
      hwmApartment__pi_selectedProductIdentifier
    );
    selectedProductPrice = utilities.utility_numberFromString(theProduct.price);
    selectedProductRatedInputPower = utilities.utility_numberFromObject(
      theProduct.properties,
      'Rated Input Power (kW)'
    );
    numberOfProducts =
      hpProductResolver.requiredHeatingCapacity /
      selectedProductRatedInputPower;
    defaultHpApartmentCapacity =
      hwmApartment__q_technologySelection.defaultHpCommercialCapacity;
    hpApartmentCapacity = utilities.utility_userOrDefaultValue(
      defaultHpApartmentCapacity,
      hwmApartment__pi_userHpCapacity
    );
    hwmApartmentEnergyAnnual = utilities.utility_hpEnergySavings(
      hwmApartment__pi_hpType,
      hwmApartment__q_technologySelection.defaultHpCommercialCapacity,
      selectedProductRatedInputPower,
      numberOfProducts,
      time
    );
    hwmApartmentCapexPostSDplus = utilities.utility_hpCapex(
      hwmApartment__pi_hpType,
      hwmApartment__q_technologySelection.defaultHpCommercialCapacity,
      numberOfProducts,
      selectedProductPrice,
      selectedProductRatedInputPower,
      hpProductResolver.pipelength
    );
    hwmApartmentVendorCapex =
      hwmApartmentCapexPostSDplus -
      hwmApartment__q_outcomesPreSdPlus.hwmCapexPreSdPlus;
    hwmApartmentOpex = utilities.utility_energyOpex(
      hwmApartmentEnergyAnnual,
      project__pi_city
    );
    hwmApartmentAreaReqd = hwmApartment__q_technologySelection.hpAreaRequired;
  } else if (hwmApartment__pi_option === 'hybrid') {
    hpProductResolver = utilities.utility_hybridProductResolver(
      hwmApartment__q_technologySelection.defaultSwhCentralCapacity,
      hwmApartment__q_technologySelection.defaultHpCommercialCapacity,
      time,
      hwmApartment__q_hwmDemand.hotWaterApts, //value hotWaterFloors not present in demand calc box
      hwmApartment__pi_efficiencyFactor,
      hwmApartment__pi_floorHeight,
      'HWM_Apartment'
    );
    theProduct = utilities.utility_defaultOrSelectedProduct(
      hpProductResolver.productIdentifier,
      hwmApartment__pi_selectedProductIdentifier
    );
    selectedProductPrice = utilities.utility_numberFromString(theProduct.price);
    selectedProductRatedHeatingCapacity = utilities.utility_numberFromObject(
      theProduct.properties,
      'Rated Heating Capacity (kW)'
    );
    selectedProductCapacity = utilities.utility_numberFromString(
      theProduct.filters['Capacity '][0]
    );
    selectedProductRatedInputPower = utilities.utility_numberFromObject(
      theProduct.properties,
      'Rated Input Power (kW)'
    );
    selectedProductMiscHpCost = utilities.utility_numberFromString(
      theProduct.misc[0]
    );
    selectedProductMiscSwhCost = utilities.utility_numberFromString(
      theProduct.misc[2]
    );
    hybridNumberOfHp =
      hpProductResolver.hybridHPRequiredHeatingCapacity /
      selectedProductRatedHeatingCapacity;
    numberOfHp =
      hpProductResolver.hpRequiredheatingCapacity /
      selectedProductRatedHeatingCapacity;
    numberOfSwh = utilities.roundTo100(
      hwmApartment__q_technologySelection.defaultSwhCentralCapacity /
        selectedProductCapacity
    );

    hwmApartmentEnergyAnnual = utilities.utility_hybridEnergySavings(
      hwmApartment__q_technologySelection.defaultHpCommercialCapacity,
      hwmApartment__q_technologySelection.defaultSwhCentralCapacity,
      numberOfHp,
      hybridNumberOfHp,
      selectedProductRatedInputPower,
      time
    );
    hwmApartmentCapexPostSDplus = utilities.utility_hybridCapex(
      hwmApartment__q_technologySelection.defaultHpCommercialCapacity,
      numberOfHp,
      numberOfSwh,
      selectedProductMiscHpCost,
      selectedProductMiscSwhCost,
      selectedProductRatedInputPower
    );
    hwmApartmentVendorCapex =
      hwmApartmentCapexPostSDplus -
      hwmApartment__q_outcomesPreSdPlus.hwmCapexPreSdPlus;
    hwmApartmentOpex = utilities.utility_energyOpex(
      hwmApartmentEnergyAnnual,
      project__pi_city
    );
    hwmApartmentAreaReqd =
      hwmApartment__q_technologySelection.hybridAreaRequired;
  }
  if (hwmApartment__pi_capexSourceType === 'custom') {
    hwmApartmentCustomCapex = hwmApartment__pi_customCapex;
  }
  return {
    defaultOrSelectedProduct: theProduct,
    numberOfProducts,
    hpApartmentCapacity,
    defaultHpApartmentCapacity,
    swhApartmentCapacity,
    defaultSwhApartmentCapacity,
    hwmApartmentEnergyAnnual,
    hwmApartmentCapexPostSDplus,
    hwmApartmentVendorCapex,
    hwmApartmentCustomCapex,
    hwmApartmentOpex,
    hwmApartmentAreaReqd,
    defaultCityResidentialUtilityTariff,
    cityResidentialUtilityTariff,
  };
}
export function hwmApartment__q_hwmDemand(
  hwmApartment__pi_lpcdPerOccupant,
  hwmApartment__pi_lpdPerApartment,
  hwmApartment__pi_hotWaterFloors: number,
  hwmApartment__pi_demandAssumptionType,
  hwmApartment__pi_demandAssumption,
  hwmApartment__pi_demandByArea,
  hwmApartment__pi_demandByBath,
  occupancy__st_singleBedroomOccupants,
  occupancy__q_numberOfDwellingUnitsApartments,
  occupancy__q_occupancyApartment,
  occupancy__q_perFloorOccupancy,
  occupancy__q_perFloorApartments
) {
  let hotWaterPerOccupant = null;
  let hotWaterOccupants = null;
  let hotWaterApts = null;
  let hwmDemand = null;
  if (hwmApartment__pi_demandAssumptionType === 'lpcd per occupant') {
    hotWaterPerOccupant = hwmApartment__pi_lpcdPerOccupant;
  } else if (
    hwmApartment__pi_demandAssumptionType ===
    'link to installed efficient fixtures'
  ) {
    hotWaterPerOccupant = 100; //need efficient fixtures services
  } else if (hwmApartment__pi_demandAssumptionType === 'lpd per apartment') {
    hotWaterPerOccupant = hwmApartment__pi_lpdPerApartment;
  }

  if (hwmApartment__pi_demandByBath === 'all baths') {
    if (hwmApartment__pi_demandByArea === 'total demand') {
      hotWaterOccupants = occupancy__q_occupancyApartment;
      hotWaterApts = occupancy__q_numberOfDwellingUnitsApartments;
    } else {
      hotWaterOccupants =
        occupancy__q_perFloorOccupancy * hwmApartment__pi_hotWaterFloors;
      hotWaterApts =
        occupancy__q_perFloorApartments * hwmApartment__pi_hotWaterFloors;
    }
  } else if (hwmApartment__pi_demandByBath === 'single bath') {
    if (hwmApartment__pi_demandByArea === 'total demand') {
      hotWaterOccupants =
        occupancy__q_numberOfDwellingUnitsApartments *
        occupancy__st_singleBedroomOccupants;
      hotWaterApts = occupancy__q_numberOfDwellingUnitsApartments;
    } else {
      hotWaterOccupants =
        occupancy__q_perFloorApartments *
        occupancy__st_singleBedroomOccupants *
        hwmApartment__pi_hotWaterFloors;
      hotWaterApts =
        occupancy__q_perFloorApartments * hwmApartment__pi_hotWaterFloors;
    }
  } else if (hwmApartment__pi_demandByBath === 'remaining baths') {
    if (hwmApartment__pi_demandByArea === 'total demand') {
      hotWaterOccupants =
        occupancy__q_occupancyApartment -
        occupancy__q_numberOfDwellingUnitsApartments *
          occupancy__st_singleBedroomOccupants;
      hotWaterApts = occupancy__q_numberOfDwellingUnitsApartments;
    } else {
      hotWaterOccupants =
        (occupancy__q_perFloorOccupancy -
          occupancy__q_perFloorApartments *
            occupancy__st_singleBedroomOccupants) *
        hwmApartment__pi_hotWaterFloors;
      hotWaterApts =
        occupancy__q_perFloorApartments * hwmApartment__pi_hotWaterFloors;
    }
  } else if (hwmApartment__pi_demandAssumptionType === 'lpd per apartment') {
    if (hwmApartment__pi_demandByArea === 'total demand') {
      hotWaterOccupants = occupancy__q_numberOfDwellingUnitsApartments;
      hotWaterApts = occupancy__q_numberOfDwellingUnitsApartments;
    } else {
      hotWaterOccupants =
        occupancy__q_perFloorApartments * hwmApartment__pi_hotWaterFloors;
      hotWaterApts =
        occupancy__q_perFloorApartments * hwmApartment__pi_hotWaterFloors;
    }
  }
  hwmDemand = utilities.roundTo100(hotWaterPerOccupant * hotWaterOccupants);
  return { hotWaterPerOccupant, hotWaterOccupants, hotWaterApts, hwmDemand };
}
export function hwmApartment__q_technologySelection(
  project__pi_rooftopArea,
  project__pi_unavailableRooftopArea,
  hwmApartment__pi_option: HwmOption,
  hwm__pi_userRooftopPerSwh,
  hwm__pi_userRooftopPerHp,
  hwmApartment__pi_userHotWaterHours,
  hwm__st_defaultRooftopPerSwh,
  hwm__st_defaultRooftopPerHp,
  hwmApartment__st_defaultHotWaterHours,
  occupancy__q_numberOfDwellingUnitsApartments,
  hwmApartment__q_hwmDemand
) {
  let defaultHotWaterHours = null;
  let hotWaterHours = null;
  let defaultRooftopPerHp = null;
  let rooftopPerHp = null;
  let defaultRooftopPerSwh = null;
  let rooftopPerSwh = null;
  let defaultSwhCentralCapacity = null;
  let defaultSwhIndividualCapacity = null;
  let swhAreaRequired = null;
  let hpAreaRequired = null;
  let defaultHpCommercialCapacity = null;
  let defaultHpDomesticCapacity = null;
  let hybridAreaRequired = null;
  let availableRooftop = null;
  defaultHotWaterHours = hwmApartment__st_defaultHotWaterHours;
  hotWaterHours = utilities.utility_userOrDefaultValue(
    hwmApartment__st_defaultHotWaterHours,
    hwmApartment__pi_userHotWaterHours
  );
  defaultRooftopPerHp = hwm__st_defaultRooftopPerHp;
  rooftopPerHp = utilities.utility_userOrDefaultValue(
    hwm__st_defaultRooftopPerHp,
    hwm__pi_userRooftopPerHp
  );
  defaultRooftopPerSwh = hwm__st_defaultRooftopPerSwh;
  rooftopPerSwh = utilities.utility_userOrDefaultValue(
    hwm__st_defaultRooftopPerSwh,
    hwm__pi_userRooftopPerSwh
  );
  availableRooftop =
    project__pi_rooftopArea - project__pi_unavailableRooftopArea;
  swhAreaRequired = hwmApartment__q_hwmDemand.hwmDemand * rooftopPerSwh;
  if (availableRooftop > swhAreaRequired) {
    defaultSwhCentralCapacity = hwmApartment__q_hwmDemand.hwmDemand;
    defaultSwhIndividualCapacity = utilities.roundTo100(
      hwmApartment__q_hwmDemand.hwmDemand /
        occupancy__q_numberOfDwellingUnitsApartments
    );
  } else {
    swhAreaRequired = availableRooftop;
    defaultSwhCentralCapacity = utilities.roundTo100(
      availableRooftop / rooftopPerSwh
    );
    defaultSwhIndividualCapacity = utilities.roundTo100(
      defaultSwhCentralCapacity / occupancy__q_numberOfDwellingUnitsApartments
    );
  }
  hpAreaRequired = hwmApartment__q_hwmDemand.hwmDemand * rooftopPerHp;
  if (availableRooftop > hpAreaRequired) {
    defaultHpCommercialCapacity = hwmApartment__q_hwmDemand.hwmDemand;
    defaultHpDomesticCapacity = utilities.roundTo100(
      hwmApartment__q_hwmDemand.hwmDemand /
        occupancy__q_numberOfDwellingUnitsApartments
    );
  } else {
    hpAreaRequired = availableRooftop;
    defaultHpCommercialCapacity = utilities.roundTo100(
      availableRooftop / rooftopPerHp
    );
    defaultHpDomesticCapacity = utilities.roundTo100(
      defaultHpCommercialCapacity / occupancy__q_numberOfDwellingUnitsApartments
    );
  }
  hybridAreaRequired = swhAreaRequired + hpAreaRequired;
  if (hwmApartment__pi_option === 'hybrid') {
    if (availableRooftop > hybridAreaRequired) {
      defaultSwhCentralCapacity = hwmApartment__q_hwmDemand.hwmDemand;
      defaultHpCommercialCapacity = hwmApartment__q_hwmDemand.hwmDemand;
    } else {
      defaultSwhCentralCapacity =
        (availableRooftop - hpAreaRequired) * rooftopPerSwh;
      defaultHpCommercialCapacity =
        hwmApartment__q_hwmDemand.hwmDemand / hotWaterHours;
      hybridAreaRequired = availableRooftop;
    }
  }
  return {
    defaultSwhCentralCapacity,
    defaultSwhIndividualCapacity,
    swhAreaRequired,
    hpAreaRequired,
    defaultHpCommercialCapacity,
    defaultHpDomesticCapacity,
    hybridAreaRequired,
    defaultHotWaterHours,
    hotWaterHours,
    defaultRooftopPerHp,
    rooftopPerHp,
    defaultRooftopPerSwh,
    rooftopPerSwh,
  };
}
export function hwmApartment__q_outcomesPreSdPlus(
  hwm__pi_baseCaseSwhCapacity: number,
  hwm__st_baseCasePerLPDkWh: number,
  hwm__st_swhCapexMultiplier: number
) {
  let hwmApartmentEnergyAnnualPreSdPlus =
    hwm__pi_baseCaseSwhCapacity * hwm__st_baseCasePerLPDkWh;
  let hwmCapexPreSdPlus =
    hwm__pi_baseCaseSwhCapacity * hwm__st_swhCapexMultiplier;
  return { hwmApartmentEnergyAnnualPreSdPlus, hwmCapexPreSdPlus };
}
export function hwmApartment__q_projectLevelInsights(
  project__pi_city: string,
  hwmApartment__pi_userCityEmissionFactor: number,
  global__st_convertKgToTon: number,
  global__st_treesPerTonCF: number,
  hwm__st_sdgNumberForHwm: number,
  hwmApartment__q_outcomes
) {
  let defaultCityEmissionFactor =
    utilities.utility_getCityEmissionFactors(project__pi_city);
  let cityEmissionFactor = utilities.utility_userOrDefaultValue(
    defaultCityEmissionFactor,
    hwmApartment__pi_userCityEmissionFactor
  );
  let cfMitigated =
    cityEmissionFactor *
    hwmApartment__q_outcomes.hwmApartmentEnergyAnnual *
    global__st_convertKgToTon;
  let sdgNumber = hwm__st_sdgNumberForHwm;
  let treesSaved = cfMitigated * global__st_treesPerTonCF;
  let totalEnergyConsumptionPercentage =
    (hwmApartment__q_outcomes.hwmApartmentEnergyAnnual * 100) / 200;
  return {
    cfMitigated,
    sdgNumber,
    treesSaved,
    totalEnergyConsumptionPercentage,
    defaultCityEmissionFactor,
    cityEmissionFactor,
  };
}
export function hwmApartment__q_flowDiagram(
  global__st_daysInYear: number,
  hwmApartment__q_outcomes
) {
  let residentialHotWater =
    hwmApartment__q_outcomes.hwmApartmentEnergyAnnual / global__st_daysInYear;
  let residentialLighting = 0;
  let residentialFan = 0;
  let homeAppliances = 0;
  let residentialHVAC = 0;
  let commonArea = 0;
  return {
    residentialHotWater,
    residentialLighting,
    residentialFan,
    homeAppliances,
    residentialHVAC,
    commonArea,
  };
}
export function hwmApartment__q_secondaryImpact() {
  let passiveWaterKL = 0;
  let passiveWaterOpex = 0;
  let passiveWasteKg = 0;
  let passiveWasteOpex = 0;
  return { passiveWaterKL, passiveWaterOpex, passiveWasteKg, passiveWasteOpex };
}
export function hwmApartment__q_goalMonitoring(hwmApartment__q_outcomes) {
  let energyGoal = 100;
  let contribution =
    (hwmApartment__q_outcomes.hwmApartmentEnergyAnnual * 100) / 200;
  return { energyGoal, contribution };
}
export function hwmApartment__q_overviewBarGraph(
  hwmApartment__st_minValue: number,
  hwmApartment__q_flowDiagram,
  hwmApartment__q_outcomes
) {
  let barOneTitle = 'Annual Energy Savings';
  let barOneValue = hwmApartment__q_outcomes.hwmApartmentEnergyAnnual;
  let barOneMax = hwmApartment__q_outcomes.hwmApartmentEnergyAnnual;
  let barOneMin = hwmApartment__st_minValue;
  let barTwoSubOneTitle = 'Residential Hot Water';
  let barTwoValue = hwmApartment__q_flowDiagram.residentialHotWater;
  let barTwoSubOneTitlePercentage = (barTwoValue * 100) / barOneValue;
  return {
    barOneTitle,
    barOneValue,
    barOneMax,
    barOneMin,
    barTwoSubOneTitle,
    barTwoValue,
    barTwoSubOneTitlePercentage,
  };
}
export function hwmApartment__q_overviewDonutGraph(hwmApartment__q_outcomes) {
  let donutOneTitle = '% of Total Energy';
  let donutOneValue =
    (hwmApartment__q_outcomes.hwmApartmentEnergyAnnual * 100) / 200;
  let donutTwoTitle = '% of Residential Hot Water';
  let donutTwoValue =
    (hwmApartment__q_outcomes.hwmApartmentEnergyAnnual * 100) / 300;
  return {
    donutOneTitle,
    donutOneValue,
    donutTwoTitle,
    donutTwoValue,
  };
}

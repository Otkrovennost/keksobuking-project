'use strict';

(function () {
  var PINS_QUANTITY = 5;
  var VALUE_ANY = 'any';
  var VALUE_MIDDLE = 'middle';
  var VALUE_HIGHT = 'high';
  var VALUE_LOW = 'low';
  var houseTypeFilter = window.map.mapFiltersBlock.querySelector('#housing-type');
  var housePriceFilter = window.map.mapFiltersBlock.querySelector('#housing-price');
  var houseRoomsFilter = window.map.mapFiltersBlock.querySelector('#housing-rooms');
  var houseQuestsFilter = window.map.mapFiltersBlock.querySelector('#housing-guests');
  var houseFeatures = window.map.mapFiltersBlock.querySelector('#housing-features');
  var filterWifiCheckbox = houseFeatures.querySelector('#filter-wifi');
  var filterDishwasherCheckbox = houseFeatures.querySelector('#filter-dishwasher');
  var filterParkingCheckbox = houseFeatures.querySelector('#filter-parking');
  var filterWasherCheckbox = houseFeatures.querySelector('#filter-washer');
  var filterElevatorCheckbox = houseFeatures.querySelector('#filter-elevator');
  var filterConditionerCheckbox = houseFeatures.querySelector('#filter-conditioner');

  var houseTypeFilterHandler = function (it) {
    return houseTypeFilter.value === VALUE_ANY ? true : it.offer.type === houseTypeFilter.value;
  };

  var priceFilterHandler = function (it) {
    return housePriceFilter.value === VALUE_ANY ? true : (
      ((housePriceFilter.value === VALUE_MIDDLE) && (it.offer.price >= 10000) && (it.offer.price <= 50000)) ||
      ((housePriceFilter.value === VALUE_HIGHT) && (it.offer.price > 50000)) ||
      ((housePriceFilter.value === VALUE_LOW) && (it.offer.price < 10000))
    );
  };

  var roomsQuantityFilterHandler = function (it) {
    return houseRoomsFilter.value === VALUE_ANY ? true : it.offer.rooms === +houseRoomsFilter.value;
  };

  var guestsQuantityFilterHandler = function (it) {
    return houseQuestsFilter.value === VALUE_ANY ? true : it.offer.guests === +houseQuestsFilter.value;
  };

  var featuresAvailabilityHandler = function (filterCheckbox, it) {
    return filterCheckbox.checked ? it.offer.features.indexOf(filterCheckbox.value) !== -1 : true;
  };

  var offersFilterHandler = function (data) {
    var filteredDataByHouseType = data.filter(function (it) {
      return (
        houseTypeFilterHandler(it) &&
        priceFilterHandler(it) &&
        roomsQuantityFilterHandler(it) &&
        guestsQuantityFilterHandler(it) &&
        featuresAvailabilityHandler(filterWifiCheckbox, it) &&
        featuresAvailabilityHandler(filterDishwasherCheckbox, it) &&
        featuresAvailabilityHandler(filterParkingCheckbox, it) &&
        featuresAvailabilityHandler(filterWasherCheckbox, it) &&
        featuresAvailabilityHandler(filterElevatorCheckbox, it) &&
        featuresAvailabilityHandler(filterConditionerCheckbox, it)
      );
    });
    window.pin.updatePins(filteredDataByHouseType.slice(0, PINS_QUANTITY));

  };

  window.filters = {
    houseTypeFilterHandler: houseTypeFilterHandler,
    offersFilterHandler: offersFilterHandler
  };
})();

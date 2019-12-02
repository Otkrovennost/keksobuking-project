'use strict';

(function () {
  var map = document.querySelector('.map');
  var documentInputs = document.querySelectorAll('fieldset');
  var mapFiltersBlock = document.querySelector('.map__filters');
  var mapSelects = mapFiltersBlock.querySelectorAll('.map__filter');
  var adForm = document.querySelector('.ad-form');

  var setDisabledInputs = function (inputs, isDisabled) {
    inputs.forEach(function (input) {
      input.disabled = isDisabled;
    });
  };

  var setInactivePinCoordinates = function () {
    window.dragger.fillAddressInput(window.dragger.pinCenterX, window.dragger.pinCenterY);
  };

  var setActivePinCoordinates = function () {
    window.dragger.fillAddressInput(window.dragger.pinCenterX, window.dragger.pinPointer);
  };

  var activeMap = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    setDisabledInputs(documentInputs, false);
    setDisabledInputs(mapSelects, false);
    setActivePinCoordinates();
  };

  var inactiveMap = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    setDisabledInputs(documentInputs, true);
    setDisabledInputs(mapSelects, true);
    setInactivePinCoordinates();
  };

  window.map = {
    map: map,
    setActivePinCoordinates: setActivePinCoordinates,
    setInactivePinCoordinates: setInactivePinCoordinates,
    activeMap: activeMap,
    inactiveMap: inactiveMap,
    mapFiltersBlock: mapFiltersBlock
  };
})();

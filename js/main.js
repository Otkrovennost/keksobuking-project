'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var pinElements = null;
  var hasPins = false;
  var pinsList = [];
  var MIN_PINS = 0;
  var MAX_PINS = 5;

  var setIndexForPinList = function () {
    pinsList.forEach(function (pin) {
      pin.index = pinsList.indexOf(pin);
    });
  };

  var addHandlerOnPin = function () {
    pinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    pinElements.forEach(function (pinElement) {
      pinElement.addEventListener('click', pinElementClickHandler);
    });
  };

  var successHandler = function (data) {
    pinsList = data;
    setIndexForPinList();
    window.pin.getSimilarPins(pinsList.slice(MIN_PINS, MAX_PINS));
    addHandlerOnPin();
  };

  var sendRequestForData = function () {
    window.server.load(successHandler);
  };

  var pinElementClickHandler = function (elem) {
    elem.preventDefault();

    var pin = elem.target;
    if (!pin.classList.contains('map__pin')) {
      pin = pin.parentElement;
    }

    pinElements.forEach(function (pinElement) {
      pinElement.classList.remove('map__pin--active');
    });

    pin.classList.add('map__pin--active');

    var elemIndex = pin.dataset.index;

    window.card.popupOpenHandler(pinsList[elemIndex]);
  };

  var pinsUpdateHandler = function () {
    window.debounce(window.filters.offersFilterHandler(pinsList));
    addHandlerOnPin();
  };

  var init = function () {
    window.map.activeMap();

    if (!hasPins) {
      sendRequestForData();
      hasPins = true;
    }
  };

  var reinit = function () {
    hasPins = false;
    window.map.inactiveMap();

  };

  reinit();
  mapPinMain.addEventListener('mousedown', window.dragger.mapPinMainMovesHandler);
  mapPinMain.addEventListener('mouseup', init);
  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.enterKeyCode) {
      init();
    }
  });
  window.map.mapFiltersBlock.addEventListener('change', pinsUpdateHandler, true);

  window.main = {
    reinit: reinit
  };
})();

'use strict';

(function () {
  var MIN_PRICE_FOR_BUNGALO = 0;
  var MIN_PRICE_FOR_FLAT = 1000;
  var MIN_PRICE_FOR_HOUSE = 5000;
  var MIN_PRICE_FOR_PALACE = 10000;
  var VALIDATION_TITLE = 'title';
  var VALIDATION_TYPE = 'type';
  var VALIDATION_PRICE = 'price';
  var VALIDATION_TIME_IN = 'timein';
  var VALIDATION_TIME_OUT = 'timeout';
  var VALIDATION_ROOMS = 'rooms';
  var VALIDATION_CAPACITY = 'capacity';

  var RoomsCapacityMap = {
    '1': {
      guests: ['1'],
      messageError: 'Для 1 комнаты необходимо выбрать количество гостей: 1'
    },
    '2': {
      guests: ['1', '2'],
      messageError: 'Для 2 комнаты необходимо выбрать количество гостей: 1 или 2'
    },
    '3': {
      guests: ['1', '2', '3'],
      messageError: 'Для 3 комнат необходимо выбрать количество гостей: 1, 2 или 3'
    },
    '100': {
      guests: ['0'],
      messageError: 'Для 100 комнат необходимо выбрать: не для гостей'
    }
  };

  var adForm = document.querySelector('.ad-form');
  var priceHouse = adForm.querySelector('#price');
  var typeHouse = adForm.querySelector('#type');
  var roomsNumber = adForm.querySelector('#room_number');
  var capacityNumber = adForm.querySelector('#capacity');
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');
  var adFormReset = adForm.querySelector('.ad-form__reset');

  var resetFormHandler = function () {
    adForm.reset();
    window.map.mapFiltersBlock.reset();
    window.pin.removeMapPins();
    window.card.removeCard();
    window.uploader.removeHousePhotos();
    window.uploader.removeAvatarPhoto();
    window.dragger.setMapPinMainToTheCenter();
    window.main.reinit();
  };

  var submitForm = function (evt) {
    evt.preventDefault();
    window.server.upload(new FormData(adForm), resetFormHandler);
  };

  var validationForm = function (evt) {
    var target = evt.target;

    var titleValidation = function () {

      if (target.validity.valueMissing) {
        target.setCustomValidity('Добавьте заголовок объявления');
      } else if (target.validity.tooShort) {
        target.setCustomValidity('Заголовок объявления не должен быть меньше 30 символов');
      } else if (target.validity.tooLong) {
        target.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
      } else if (target.validity.typeMismatch) {
        target.setCustomValidity('Введено неверное значение');
      } else {
        target.setCustomValidity('');
      }
    };

    var houseTypeAndPriceValidation = function () {
      var selectedTypeHouse = typeHouse.options[typeHouse.options.selectedIndex];

      switch (selectedTypeHouse.value) {
        case window.utils.TYPE_BUNGALO:
          priceHouse.placeholder = MIN_PRICE_FOR_BUNGALO;
          priceHouse.setAttribute('min', MIN_PRICE_FOR_BUNGALO);
          break;
        case window.utils.TYPE_FLAT:
          priceHouse.placeholder = MIN_PRICE_FOR_FLAT;
          priceHouse.setAttribute('min', MIN_PRICE_FOR_FLAT);
          break;
        case window.utils.TYPE_HOUSE:
          priceHouse.placeholder = MIN_PRICE_FOR_HOUSE;
          priceHouse.setAttribute('min', MIN_PRICE_FOR_HOUSE);
          break;
        case window.utils.TYPE_PALACE:
          priceHouse.placeholder = MIN_PRICE_FOR_PALACE;
          priceHouse.setAttribute('min', MIN_PRICE_FOR_PALACE);
          break;
      }

      if (target.validity.valueMissing) {
        target.setCustomValidity('Укажите цену за ночь');
      } else if (target.validity.rangeUnderflow) {
        target.setCustomValidity('Цена за ночь не должна быть меньше ' + priceHouse.min + ' руб.');
      } else if (target.validity.rangeOverflow) {
        target.setCustomValidity('Цена за ночь не должна быть больше 1 000 000 руб.');
      } else if (target.validity.typeMismatch) {
        target.setCustomValidity('Введено неверное значение');
      } else {
        target.setCustomValidity('');
      }
    };

    var roomsAndCapacityValidation = function () {
      var selectedRoomsNumber = roomsNumber.options[roomsNumber.options.selectedIndex];
      var selectedCapacityNumber = capacityNumber.options[capacityNumber.options.selectedIndex];

      if (RoomsCapacityMap[selectedRoomsNumber.value].guests.includes(selectedCapacityNumber.value)) {
        capacityNumber.setCustomValidity('');
      } else {
        capacityNumber.setCustomValidity(RoomsCapacityMap[selectedRoomsNumber.value].messageError);
      }
    };

    var timeOut = function () {
      timeout.value = timein.value;
    };

    var timeIn = function () {
      timein.value = timeout.value;
    };

    switch (target.name) {
      case VALIDATION_TITLE:
        titleValidation();
        break;
      case VALIDATION_TYPE:
      case VALIDATION_PRICE:
        houseTypeAndPriceValidation();
        break;
      case VALIDATION_TIME_IN:
        timeOut();
        break;
      case VALIDATION_TIME_OUT:
        timeIn();
        break;
      case VALIDATION_ROOMS:
      case VALIDATION_CAPACITY:
        roomsAndCapacityValidation();
        break;
    }
  };

  adForm.addEventListener('input', validationForm, true);
  adForm.addEventListener('submit', submitForm);
  adFormReset.addEventListener('click', resetFormHandler);

  window.form = {
    validationForm: validationForm
  };
})();

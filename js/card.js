'use strict';

(function () {
  var VALUE_FOR_FLAT = 'Квартира';
  var VALUE_FOR_BUNGALO = 'Бунгало';
  var VALUE_FOR_HOUSE = 'Дом';
  var VALUE_FOR_PALACE = 'Дворец';

  var popupClose = null;
  var mapFiltersContainer = window.map.map.querySelector('.map__filters-container');
  var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');

  var getAppartmentType = function (type) {

    switch (type) {
      case window.utils.TYPE_FLAT:
        return VALUE_FOR_FLAT;
      case window.utils.TYPE_BUNGALO:
        return VALUE_FOR_BUNGALO;
      case window.utils.TYPE_HOUSE:
        return VALUE_FOR_HOUSE;
      case window.utils.TYPE_PALACE:
        return VALUE_FOR_PALACE;
      default:
        return VALUE_FOR_FLAT;
    }
  };
  var removeActivePin = function () {
    var elementPinActive = document.querySelector('.map__pin--active');
    if (elementPinActive) {
      elementPinActive.classList.remove('map__pin--active');
    }
  };

  var createFeatureElement = function (feature) {
    var featureElement = document.createElement('li');
    featureElement.className = 'popup__feature popup__feature--' + feature;
    return featureElement;
  };

  var createPhotoElement = function (photo) {
    var photoElement = document.createElement('img');
    photoElement.className = 'popup__photo';
    photoElement.setAttribute('width', '45');
    photoElement.setAttribute('height', '40');
    photoElement.setAttribute('alt', 'Фотография жилья');
    photoElement.src = photo;
    return photoElement;
  };

  var renderCard = function (card) {
    var cardElement = document.querySelector('.popup');

    if (!cardElement) {
      cardElement = similarCardTemplate.cloneNode(true);
    }

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = getAppartmentType(card.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комната(ы) для ' + card.offer.guests + ' гостя(ей)';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    cardElement.querySelector('.popup__features').innerHTML = '';

    card.offer.features.forEach(function (feature) {
      cardElement.querySelector('.popup__features').appendChild(createFeatureElement(feature));
    });

    cardElement.querySelector('.popup__photos').innerHTML = '';

    card.offer.photos.forEach(function (photo) {
      cardElement.querySelector('.popup__photos').appendChild(createPhotoElement(photo));
    });

    return cardElement;
  };

  var popupCloseHandler = function (elem) {
    elem.target.parentElement.classList.add('hidden');
    removeActivePin();
  };

  var popupOpenHandler = function (cardData) {

    var cardElement = document.querySelector('.popup');

    if (!cardElement) {
      window.map.map.insertBefore(renderCard(cardData), mapFiltersContainer);
    } else {
      cardElement = renderCard(cardData);
      cardElement.classList.remove('hidden');
    }

    popupClose = document.querySelector('.popup__close');
    popupClose.addEventListener('click', popupCloseHandler);

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.escKeyCode) {
        popupClose.parentElement.classList.add('hidden');
        removeActivePin();
      }
    });
  };

  var removeCard = function () {
    var cardElement = document.querySelector('.map__card');
    if (cardElement) {
      cardElement.remove();
    }
  };

  window.card = {
    renderCard: renderCard,
    popupOpenHandler: popupOpenHandler,
    removeCard: removeCard
  };
})();

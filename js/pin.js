'use strict';

(function () {
  var similarListElementPin = document.querySelector('.map__pins');
  var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderPin = function (pinData) {
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.style.left = pinData.location.x + 'px';
    pinElement.style.top = pinData.location.y + 'px';
    pinElement.dataset.index = pinData.index;

    var pinElementImage = pinElement.querySelector('img');

    if (pinElementImage) {
      pinElementImage.src = pinData.author.avatar;
      pinElementImage.alt = pinData.offer.title;
    }

    return pinElement;
  };

  var getSimilarPins = function (offers) {
    var fragment = document.createDocumentFragment();

    offers.forEach(function (offer) {
      fragment.appendChild(renderPin(offer));
    });

    similarListElementPin.appendChild(fragment);
  };

  var removeMapPins = function () {
    var elemsPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    elemsPins.forEach(function (elemPin) {
      elemPin.remove();
    });
  };

  var updatePins = function (data) {
    window.card.removeCard();
    removeMapPins();
    getSimilarPins(data);
  };

  window.pin = {
    getSimilarPins: getSimilarPins,
    removeMapPins: removeMapPins,
    updatePins: updatePins,
  };
})();

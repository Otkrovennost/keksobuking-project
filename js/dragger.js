'use strict';

(function () {
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_X = 0;
  var MAX_X = 1200;
  var MAP_PIN_MAIN_WIDTH = 65;
  var MAP_PIN_MAIN_HEIGHT = 70;
  var MAP_PIN_MAIN_COORD_X = 570;
  var MAP_PIN_MAIN_COORD_Y = 375;
  var mapPinMain = document.querySelector('.map__pin--main');
  var pinCenterX = mapPinMain.offsetLeft + MAP_PIN_MAIN_WIDTH / 2;
  var pinCenterY = mapPinMain.offsetTop + MAP_PIN_MAIN_HEIGHT / 2;
  var pinPointer = mapPinMain.offsetTop + MAP_PIN_MAIN_HEIGHT;

  var fillAddressInput = function (left, top) {
    var elemAddressInput = document.querySelector('#address');
    elemAddressInput.value = 'x: ' + Math.floor(left) + ', ' + 'y: ' + Math.floor(top + MAP_PIN_MAIN_HEIGHT);
  };

  var setMapPinMainToTheCenter = function () {
    mapPinMain.style.left = String(MAP_PIN_MAIN_COORD_X) + 'px';
    mapPinMain.style.top = String(MAP_PIN_MAIN_COORD_Y) + 'px';
  };

  var mapPinMainMovesHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var isDragged = false;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      isDragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newTopCoordinate = mapPinMain.offsetTop - shift.y;
      var newLeftCoordinate = mapPinMain.offsetLeft - shift.x;

      if (newTopCoordinate <= (MIN_Y - MAP_PIN_MAIN_HEIGHT)) {
        newTopCoordinate = MIN_Y - MAP_PIN_MAIN_HEIGHT;
      } else if (newTopCoordinate >= MAX_Y) {
        newTopCoordinate = MAX_Y;
      }

      if (newLeftCoordinate <= (MIN_X - MAP_PIN_MAIN_WIDTH / 2)) {
        newLeftCoordinate = MIN_X - MAP_PIN_MAIN_WIDTH / 2;
      } else if (newLeftCoordinate > (MAX_X - MAP_PIN_MAIN_WIDTH / 2)) {
        newLeftCoordinate = MAX_X - MAP_PIN_MAIN_WIDTH / 2;
      }

      mapPinMain.style.top = newTopCoordinate + 'px';
      mapPinMain.style.left = newLeftCoordinate + 'px';
      updateAddressCoordinates(newLeftCoordinate, newTopCoordinate);
    };

    var updateAddressCoordinates = function (left, top) {
      if (left <= MIN_X) {
        left = MIN_X;
      }

      if (top >= MAX_Y - MAP_PIN_MAIN_HEIGHT) {
        top = MAX_Y - MAP_PIN_MAIN_HEIGHT;
      }

      fillAddressInput(left, top);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      if (isDragged) {
        var preventDefaultOnClickHandler = function (evnt) {
          evnt.preventDefault();
          mapPinMain.removeEventListener('click', preventDefaultOnClickHandler);
        };
        mapPinMain.addEventListener('click', preventDefaultOnClickHandler);
      }
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };
  window.dragger = {
    mapPinMainMovesHandler: mapPinMainMovesHandler,
    pinCenterX: pinCenterX,
    pinCenterY: pinCenterY,
    pinPointer: pinPointer,
    fillAddressInput: fillAddressInput,
    setMapPinMainToTheCenter: setMapPinMainToTheCenter
  };
})();

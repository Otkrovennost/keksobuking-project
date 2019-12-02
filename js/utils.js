'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var TYPE_BUNGALO = 'bungalo';
  var TYPE_FLAT = 'flat';
  var TYPE_HOUSE = 'house';
  var TYPE_PALACE = 'palace';

  window.utils = {
    getRandomNum: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    enterKeyCode: ENTER_KEYCODE,
    escKeyCode: ESC_KEYCODE,
    TYPE_BUNGALO: TYPE_BUNGALO,
    TYPE_FLAT: TYPE_FLAT,
    TYPE_HOUSE: TYPE_HOUSE,
    TYPE_PALACE: TYPE_PALACE
  };
})();

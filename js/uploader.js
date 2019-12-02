'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_HOUSE_WIDTH = 40;
  var PHOTO_HOUSE_HEIGHT = 40;
  var avatarPhotoChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview');
  var housePhotoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var housePreview = document.querySelector('.ad-form__photo');

  var avatarPhotoLoadHandler = function () {
    var file = avatarPhotoChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var avatarImage = avatarPreview.querySelector('img');
        avatarImage.src = reader.result;
        avatarImage.classList.add('ad-form__avatar-img');
      });

      reader.readAsDataURL(file);
    }

  };

  var housePhotoLoadHandler = function () {
    var files = housePhotoChooser.files;

    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function (element) {
          var elementFile = element.target;
          var elementHousePhoto = document.createElement('img');
          elementHousePhoto.src = elementFile.result;
          elementHousePhoto.width = PHOTO_HOUSE_WIDTH;
          elementHousePhoto.height = PHOTO_HOUSE_HEIGHT;
          elementHousePhoto.alt = 'Фотография жилья';
          elementHousePhoto.classList.add('ad-form__house-img');
          housePreview.appendChild(elementHousePhoto);
        });
      }

      reader.readAsDataURL(file);
    }
  };

  var removeAvatarPhoto = function () {
    var imageAvatar = document.querySelector('.ad-form__avatar-img');
    if (imageAvatar) {
      imageAvatar.src = 'img/muffin-grey.svg';
    }
  };

  var removeHousePhotos = function () {
    var imagesHouse = document.querySelectorAll('.ad-form__house-img');
    if (imagesHouse) {
      imagesHouse.forEach(function (imageHouse) {
        imageHouse.remove();
      });
    }
  };

  avatarPhotoChooser.addEventListener('change', avatarPhotoLoadHandler);
  housePhotoChooser.addEventListener('change', housePhotoLoadHandler);

  window.uploader = {
    removeAvatarPhoto: removeAvatarPhoto,
    removeHousePhotos: removeHousePhotos
  };
})();

(function() {
  'use strict';
  angular.module('scheduleApp').controller('CameraCtrl', ['$state', '$cordovaCamera', '$ionicPopup' ,'$scope', CameraCtrl])
  function CameraCtrl($state, $cordovaCamera, $ionicPopup ,$scope) {

    $scope.message = function(mes) {
       $ionicPopup.alert({
         title: 'Alert',
         template: mes
       });
    };

    $scope.takeImage = function() {
        var options = {
            quality: 80,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 250,
            targetHeight: 250,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.srcImage = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            $scope.message(err.message)
        });
    }


  };
})();


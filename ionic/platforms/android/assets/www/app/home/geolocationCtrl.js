(function() {
  'use strict';
  angular.module('scheduleApp').controller('GeolocationCtrl', ['$state', '$cordovaGeolocation', '$ionicLoading', '$ionicPlatform', '$ionicPopup' ,'$scope', GeolocationCtrl])
  function GeolocationCtrl($state, $cordovaGeolocation, $ionicLoading, $ionicPlatform, $ionicPopup ,$scope) {
    var vm = this;

    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

    $scope.message = function(mes) {
       $ionicPopup.alert({
         title: 'Alert',
         template: mes
       });
    };

    $scope.findMe = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });

        var posOptions = {
            enableHighAccuracy: false,
            timeout: 10000
        };

        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
            $scope.message(position.coords.latitude);

            var lat  = position.coords.latitude;
            var long = position.coords.longitude;

            // var myLatlng = new google.maps.LatLng(lat, long);

            // var mapOptions = {
            //     center: myLatlng,
            //     zoom: 16,
            //     mapTypeId: google.maps.MapTypeId.ROADMAP
            // };

            // var map = new google.maps.Map(document.getElementById("map"), mapOptions);

            $scope.map = { center: { latitude: lat, longitude: long }, zoom: 17 };
            $ionicLoading.hide();

        }, function(err) {
            $ionicLoading.hide();
            $scope.message(err.message);
        });
      };
  };
})();


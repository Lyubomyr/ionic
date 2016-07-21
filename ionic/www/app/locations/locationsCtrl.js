(function() {
  'use strict';
  angular.module('scheduleApp').controller('LocationsCtrl', ['$state', 'scheduleApi', LocationsCtrl])
  function LocationsCtrl($state, scheduleApi) {
    var vm = this;

    scheduleApi.getLeagueData().then(function(data){
      vm.locations = data.locations;
    });

  };
})();

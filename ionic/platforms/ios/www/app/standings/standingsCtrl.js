(function() {
  'use strict';
  angular.module('scheduleApp').controller('StandingsCtrl', ['$state', 'scheduleApi', Standings])
  function Standings($state, scheduleApi) {
    var vm = this;

    scheduleApi.getLeagueData().then(function(data){
      vm.standings = data.standings;
    });

  };
})();

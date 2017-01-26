(function() {
  'use strict';
  angular.module('scheduleApp').controller('LeaguesCtrl', ['$state', 'scheduleApi', LeaguesCtrl])
  function LeaguesCtrl($state, scheduleApi) {
    var vm = this;

    scheduleApi.getLeagues().then(function(data){
      vm.leagues = data;
    });

    vm.selectLeague = function(id){
      scheduleApi.setLeagueId(id);
      $state.go('app.teams')
    };

  };
})();

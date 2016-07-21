(function() {
  'use strict';
  angular.module('scheduleApp').controller('TeamsCtrl', ['$state', 'scheduleApi', TeamsCtrl])
  function TeamsCtrl($state, scheduleApi) {
    var vm = this;

    scheduleApi.getLeagueData().then(function(data){
      vm.teams = data.teams;
    });

  };
})();

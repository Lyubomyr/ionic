(function() {
  'use strict';
  angular.module('scheduleApp').controller('MyTeamsCtrl', ['$state', 'scheduleApi', 'myTeamsService', MyTeamsCtrl])
  function MyTeamsCtrl($state, scheduleApi, myTeamsService) {
    var vm = this;

    vm.myTeams = myTeamsService.getFollowedTeams();

    vm.goToTeams = function(team) {
      scheduleApi.setLeagueId(team.leagueId());
      $state.go("app.teamDetail", {id:team.id});
    };

  };
})();

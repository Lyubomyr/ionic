(function() {
  'use strict';
  angular.module('scheduleApp').controller('GameCtrl', ['$stateParams', 'scheduleApi', GameCtrl])
  function GameCtrl($stateParams, scheduleApi) {
    var vm = this;

    var gameId = Number($stateParams.id);

    scheduleApi.getLeagueData().then(function(data){
      vm.game = _.find(data.games, {"id": gameId});
    });

  };
})();

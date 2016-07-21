(function() {
  'use strict';

  angular.module('scheduleApp').controller('TeamsCtrl', ['$scope', 'scheduleApi', TeamsCtrl]);

  function TeamsCtrl($scope, scheduleApi) {
    var vm = this;

    vm.loadList = function(forceRefresh){
      scheduleApi.getLeagueData(forceRefresh).then(function(data){
        vm.teams = data.teams;
      }).finally(function(){
        $scope.$broadcast('scroll.refreshComplete');
      });
    };

    vm.loadList(false);

  };
})();

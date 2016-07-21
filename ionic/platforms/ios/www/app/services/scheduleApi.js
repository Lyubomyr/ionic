(function() {
  'use strict';
  angular.module('scheduleApp').factory('scheduleApi', ['$http', '$q', scheduleApi])
  function scheduleApi($http, $q) {

    var currentLeagueId=2;

    function getLeagues(){
      var deferred = $q.defer();

      $http.get("http://elite-schedule.net/api/leaguedata")
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function() {
            console.log("Error while making HTTP call.");
            deferred.reject();
        });
      return deferred.promise;
    };

    function getLeagueData(){
      var deferred = $q.defer();

      $http.get("http://elite-schedule.net/api/leaguedata/" + currentLeagueId)
          .success(function(data, status) {
              console.log("Received schedule data via HTTP.", data, status);
              deferred.resolve(data);
          })
          .error(function() {
              console.log("Error while making HTTP call.");
              deferred.reject();
          });
      return deferred.promise;
    };

    function setLeagueId(leagueId){
      currentLeagueId = leagueId;
    };

    return {
      getLeagues: getLeagues,
      getLeagueData: getLeagueData,
      setLeagueId: setLeagueId
    };

  };
})();

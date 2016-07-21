(function() {
  'use strict';
  angular.module('scheduleApp').factory('scheduleApi', ['$http', '$q', '$ionicLoading', '$timeout', 'CacheFactory', scheduleApi])
  function scheduleApi($http, $q, $ionicLoading, $timeout, CacheFactory) {

    self.leaguesCache = CacheFactory.get("leaguesCache");
    self.leagueDataCache = CacheFactory.get("leagueDataCache");
    self.staticCache = CacheFactory.get("staticCache");

    self.leaguesCache.setOptions({
      onExpire: function(key, value) {
        getLeagues()
          .then(function() {
            console.log("Leagues Cache was automatically refreshed", new Date());
          }, function() {
            console.log("Error getting data. Puting expired item back into the cache", new Date());
            self.leaguesCache.put(key, value);
          });
      }
    });

    self.leagueDataCache.setOptions({
      onExpire: function(key, value) {
        getLeagueData()
          .then(function() {
            console.log("Leagues Cache was automatically refreshed", new Date());
          }, function() {
            console.log("Error getting data. Puting expired item back into the cache", new Date());
            self.leagueDataCache.put(key, value);
          });
      }
    });


    function getLeagues(){
      var deferred = $q.defer(),
          cacheKey = "leagues",
          leaguesData = self.leaguesCache.get(cacheKey);

      if (leaguesData) {
        console.log("Found data inside cache", leaguesData);
        deferred.resolve(leaguesData);
      } else {
        $http.get("http://elite-schedule.net/api/leaguedata")
          .success(function(data){
            console.log("Received data via HTTP");
            self.leaguesCache.put(cacheKey, data);
            deferred.resolve(data);
          })
          .error(function() {
              console.log("Error while making HTTP call.");
              deferred.reject();
          });
      }
      return deferred.promise;
    };

    function getLeagueData(forceRefresh){
      var deferred = $q.defer(),
          cacheKey = "leagueData-" + getLeagueId(),
          leagueData = null;

      if (!forceRefresh) {
        leagueData = self.leagueDataCache.get(cacheKey);
      };

      if (leagueData) {
        console.log("Found data inside cache", leagueData);
        deferred.resolve(leagueData);
      } else {
        $ionicLoading.show({ template: 'Loading...' })
        $http.get("http://elite-schedule.net/api/leaguedata/" + getLeagueId())
            .success(function(data, status) {
                console.log("Received schedule data via HTTP.", data, status);
                self.leagueDataCache.put(cacheKey, data);
                $ionicLoading.hide();
                deferred.resolve(data);
            })
            .error(function() {
                console.log("Error while making HTTP call.");
                $ionicLoading.hide();
                deferred.reject();
            });
      }
      return deferred.promise;
    };

    function setLeagueId(leagueId){
      self.staticCache.put("currentLeagueId", leagueId);
    };

    function getLeagueId(){
      return self.staticCache.get("currentLeagueId");
    };

    return {
      getLeagues: getLeagues,
      getLeagueData: getLeagueData,
      setLeagueId: setLeagueId
    };

  };
})();

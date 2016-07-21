angular.module('scheduleApp', ['ionic', 'angular-cache', 'ng-token-auth'])

.run(function($ionicPlatform, CacheFactory) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    CacheFactory("leagueDataCache", { storageMode: "localStorage", maxAge: 100000, deleteOnExpire: "aggressive" });
    CacheFactory("leaguesCache", { storageMode: "localStorage", maxAge: 100000, deleteOnExpire: "aggressive" });
    CacheFactory("myTeamsCache", { storageMode: "localStorage" });
    CacheFactory("staticCache", { storageMode: "localStorage" });

  });
})

.config(function($authProvider) {
  $authProvider.configure({
      apiUrl: 'http://localhost:3000/api',
      storage: 'localStorage'
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('home', {
    abstract: true,
    url: '/home',
    templateUrl: 'app/home/home.html',
  })

  .state('home.leagues', {
    url: '/leagues',
    views: {
      "tab-leagues": {
        templateUrl: 'app/home/leagues.html'
      }
    }
  })

  // only authenticated users will be able to see routes that are children of this state
  .state('admin', {
    url: '/admin',
    abstract: true,
    template: '<ui-view/>',
    resolve: {
      auth: function($auth) {
        return $auth.validateUser();
      }
    }
  })

  // this route will only be available to authenticated users
  .state('admin.dashboard', {
    url: '/dash',
    templateUrl: 'app/admin/adminPage.html',
  })

  .state('home.myteams', {
    url: '/myteams',
    views: {
      "tab-myteams": {
        templateUrl: 'app/home/myteams.html'
      }
    }
  })

  .state('app', {
    abstract: true,
    url: '/app',
    templateUrl: 'app/layout/menu.html',
  })

  .state('app.sign_in', {
    url: '/sign_in',
    views: {
      "mainContent": {
        templateUrl: 'app/users/newSession.html'
      }
    }
  })

  .state('app.sign_up', {
    url: '/sign_up',
    views: {
      "mainContent": {
        templateUrl: 'app/users/registration.html'
      }
    }
  })

  .state('app.edit_user', {
    url: '/edit_user',
    views: {
      "mainContent": {
        templateUrl: 'app/users/edit_user.html'
      }
    }
  })

  .state('app.teams', {
    url: '/teams',
    views: {
      "mainContent": {
        templateUrl: 'app/teams/teams.html'
      }
    }
  })

  .state('app.teamDetail', {
    url: '/teams/:id',
    views: {
      "mainContent": {
        templateUrl: 'app/teams/teamDetail.html'
      }
    }
  })

  .state('app.game', {
    url: '/game/:id',
    views: {
      "mainContent": {
        templateUrl: 'app/game/game.html'
      }
    }
  })

  .state('app.standings', {
    url: '/standings',
    views: {
      "mainContent": {
        templateUrl: 'app/standings/standings.html'
      }
    }
  })

  .state('app.locations', {
    url: '/locations',
    views: {
      "mainContent": {
        templateUrl: 'app/locations/locations.html'
      }
    }
  })

  .state('app.rules', {
    url: '/rules',
    views: {
      "mainContent": {
        templateUrl: 'app/rules/rules.html'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home/leagues');
});

angular.module('scheduleApp', ['ionic', 'ng-token-auth'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($authProvider) {
  $authProvider.configure({
      apiUrl: '/api'
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

  .state('sign_in', {
    url: '/sign_in',
    templateUrl: 'app/users/new.html',
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

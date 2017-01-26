angular.module('scheduleApp').controller('SessionCtrl', function($scope, $auth, $state) {
  $scope.signIn = function() {
    $auth.submitLogin($scope.user)
      .then(function(resp) {
        $state.go("home.leagues");
        console.log("Sign in successfuly!", resp)
      })
      .catch(function(resp) {
        console.log("Got error during sign in: ", resp)
      });
  };

  $scope.signOut = function() {
    $auth.signOut()
      .then(function(resp) {
        $state.go("home.leagues");
      })
      .catch(function(resp) {
        // handle error response
      });
  };

  $scope.resetPassword = function() {
    $auth.requestPasswordReset($scope.pwdResetForm)
      .then(function(resp) {
        // handle success response
      })
      .catch(function(resp) {
        // handle error response
      });
  };

});

angular.module('scheduleApp').controller('RegistrationCtrl', function($scope, $auth) {

  $scope.registerUser = function() {
    $auth.submitRegistration($scope.registrationForm)
      .then(function(resp) {
        console.log("User registered!", resp)
      })
      .catch(function(resp) {
        console.log("User FAILED to register", resp)
      });
  };

  $scope.updateAccount = function() {
    $auth.updateAccount($scope.updateAccountForm)
      .then(function(resp) {
        // handle success response
      })
      .catch(function(resp) {
        // handle error response
      });
  };

});


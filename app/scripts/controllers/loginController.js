app.controller('loginController', ['$scope', 'Authentication', function($scope, Authentication) {

	  $scope.login = function() {
	  	Authentication.login($scope.user);
	  }; // login function

	  $scope.regist = function() {
	  	Authentication.regist($scope.user);
	  }; // register function

	  $scope.signout = function() {
	  	Authentication.signout($scope.user);
	  }; // signout function

	  $scope.reset = function() {
	  	Authentication.reset($scope.user.email);
	  }; // reset function

}]); // LoginController



app.controller('InitController', ['$scope', '$http', '$window', function MyController($scope, $http, $window) {



   $scope.message = "";


}]);

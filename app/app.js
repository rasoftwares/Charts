var app = angular.module('chartapp',  ['ngRoute','ui.bootstrap']);



app.config(['$routeProvider', function($routeProvider){
   var src_dir = "app/views/";
  //Source directory where all of the html fragments are placed
  $routeProvider.
      when('/home', {
      templateUrl: src_dir +'candlestick.html'
      }).
      when('/table', {
      templateUrl: src_dir +'table.html'
      }).

      otherwise({
        redirectTo: '/home'
      });
}]);

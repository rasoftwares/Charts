var app = angular.module('chartapp',  ['ngRoute','ui.bootstrap','firebase']);



app.run(['$rootScope', '$location', function($rootScope, $location){
  $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
    if (error == 'AUTH_REQUIRED') {
      $rootScope.message = 'Sorry, you must be a registered user.'
      $location.path('/register');
    }
  })
}]);


app.config(['$routeProvider', function($routeProvider){
   var src_dir = "app/views/";
  //Source directory where all of the html fragments are placed
  $routeProvider.
    when('/register', {
    templateUrl:  src_dir +'register.html',
    controller: 'loginController'
    }).
    when('/login', {
    templateUrl:  src_dir +'login.html',
    controller: 'loginController'
    }).
    when('/success', {
    templateUrl: src_dir +'candlestick.html',
    controller: 'loginController',
    resolve: {
      'currentAuth': ['Auth', function(Auth) {
        return Auth.$requireSignIn();
      }]
    }
    }).
    when('/reset', {
    templateUrl:  src_dir +'reset.html',
    controller: 'loginController'
    }).
    when('/home', {
    templateUrl: src_dir +'candlestick.html'
    }).
    when('/table', {
    templateUrl: src_dir +'table.html'
    }).
    otherwise({
    redirectTo: '/login'
    });
}]);

app.factory('Auth', ['$firebaseAuth',
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);

app.factory('AuthenticationListener', ['$rootScope', '$firebaseAuth', '$firebaseObject', function($rootScope, $firebaseAuth, $firebaseObject){

return {
    getUser: function(firebaseUser) {
        firebase.auth().onAuthStateChanged(function(firebaseUser) {
            if (firebaseUser) {

                //console.log("AuthenticationListener: " + firebaseUser.uid);
    			firebase.database().ref('/users/' + firebaseUser.uid).once('value').then(function(snapshot) {
    			  var userfirst = snapshot.val().firstname;
    			  var userlast = snapshot.val().lastname;
                  var useremail = snapshot.val().email;
                  var timestamp = snapshot.val().date;
                  var btlist =snapshot.val().bt;
    			  console.log(userfirst + " " + userlast);
            console.log("--------->"+btlist);
    			         $rootScope.$apply(function () {
    		  		                      $rootScope.user = {
                                            date: new Date(timestamp).getDate() + "/" + (new Date(timestamp).getMonth()+1) + "/" + new Date(timestamp).getFullYear(),
                                            first: userfirst,
                                            last: userlast,
                                            email: useremail
                                          };
    		  	         });
    			  // ...
    			});

            } else {
                // No user is signed in.
                // $rootScope.$apply(function () {
                // 	$scope.message = "";
                // });
            }
        });



    } // evento
}; // return


/*  firebase.database().ref('users/'+firebaseUser.uid+'/bt').on('child_added', snapshot => {
    firebase.database().ref('bt/'+snapshot.key).on('value', snap => {
      console.log(snap.val().code); //Print name of persons in contact list
    });
  });*/

}]); // factory*/

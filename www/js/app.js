// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter',  ['ionic','angular-svg-round-progressbar'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider,$urlRouterProvider){
  $stateProvider.state('countdown',
             {
             url:"/countdown",
            views:{ countdown:{
                 templateUrl:"views/countdown.html",
                 controller:"timerCtrl"
                }
                }
             }
  )
          .state('chronometer',
                {
             url:"/chronometer",
            views:{ chronometer:{
                 templateUrl:"views/chronometer.html",
                 controller:"timerCtrl"
                }
                }
             }
          
  )
            .state('signup',
                {
             url:"/signup",
            views:{ signup:{
                 templateUrl:"views/signup.html",
                 controller:"signupCtrl"
                }
                }
             }
          
  )
              .state('login',
                {
             url:"/login",
            views:{ login:{
                 templateUrl:"views/login.html",
                 controller:"loginCtrl"
                }
                }
             }
          
  )
              .state('status',
                {
             url:"/status",
            views:{ login:{
                 templateUrl:"views/status.html",
                 controller:"statusCtrl"
                }
                }
             }
          
  )



   $urlRouterProvider.otherwise('/countdown');
})

.run(function($rootScope,$state,AuthService,AUTH_EVENTS){
  $rootScope.$on('$stateChangeStart',function(event,next,nextParams,fromState,showLogSign){
    if(!AuthService.isAuthenticated()){
      showLogSign=false;
      if(next.name==="status"){
        event.preventDefault();
        $state.go('login');
      }
    }
      
  });

});

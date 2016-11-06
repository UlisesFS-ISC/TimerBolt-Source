// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter')
.controller('loginCtrl',function($scope,AuthService,$ionicPopup,$state){
   $scope.user={
    name:'',
    password:''
   };

    $scope.login=function(){
      AuthService.login($scope.user).then(function(msg){
        $state.go('status');;
      },function(errMsg){
        var alertPopup=$ionicPopup.alert({
          title:"login failed",
          template:errMsg
        });
      });
    };
})

.controller('signupCtrl',function($scope,AuthService,$ionicPopup,$state){
  $scope.user={
    name:'',
    password:'',
    email:''
   };

    $scope.signup=function(){
      AuthService.register($scope.user).then(function(msg){
        $state.go('login');
        var alertPopup=$ionicPopup.alert({
          title:'register success!',
          template:msg
        });
      },
      function(errMsg){
          var alertPopup=$ionicPopup.alert({
            title:'Register failed',
            template:errMsg
          });
        });
    };
})

.controller('statusCtrl', function($scope,$ionicPopup,$window,AuthService,API_ENDPOINT_SENS,$state,$http){

    $scope.getInfo= function(operation){
      if(operation==='building'){
         var alertPopup=$ionicPopup.alert({
            title:'Under Construction',
            template:'Will be implemented later'
          });
         return ;
      }
      $http.get(API_ENDPOINT_SENS.url + '/'+operation+'?token='+$window.sessionStorage.token).then(function(result){
        $scope.memberinfo=result.data.msg ;
      });
    } ;


    $scope.logout= function(){
      $state.go('login');
      AuthService.logout();
    };

    $scope.remove= function(entry){
       AuthService.removeActivity(entry).then(function(msg){
        $scope.getInfo('chronoInfo');
      },function(errMsg){
        var alertPopup=$ionicPopup.alert({
          title:"Deletion failed",
          template:errMsg
        });
      });
    };

})


.controller('AppCtrl',function($scope,$rootScope,$state,$ionicPopup,AuthService,AUTH_EVENTS){
  $scope.$on(AUTH_EVENTS.notAuthenticated,function(event){
    AuthService.logout();
    $state.go('login');
    var alertPopup= $ionicPopup.alert({
      title:"Session has been lost!",
      template:'Sorry, login again'
    });
  });

})

.controller('timerCtrl',function timerCtrlFn($scope, $timeout,AuthService,$ionicPopup){
  $scope.timer= new timers();
  $scope.timerStatus=0;
  $scope.progressColors={barSeconds:"#11c1f3",
               barMinutes:"#0971B2",
               barHours:"#1485CC"
              };  
  
  //setting the progress bar style
  $scope.radius=80;
  var svg=document.getElementsByClassName('round-progress')[0];
  svg.onload= function(){
    $scope.radius=svg.getBoundingClientRect().width/2;
    $scope.timer.updateTimerCount(true);
  }
  
  var myTimerVar; 
  var clockType="";


  insertActivity=function(name,endtime){
      AuthService.insertActivity(name,endtime).then(function(msg){
        var alertPopup=$ionicPopup.alert({
          title:'Insertion success!',
          template:msg
        });
      },
      function(errMsg){
          var alertPopup=$ionicPopup.alert({
            title:'Insertion failed',
            template:errMsg
          });
        });
    };
      

    $scope.validateFields=function(){
    return ($scope.timer.count.seconds<60 && $scope.timer.count.seconds>-1 && $scope.timer.count.minutes<60 && $scope.timer.count.minutes>-1  &&  $scope.timer.count.hours>-1  && ($scope.timer.count.seconds!=null || $scope.timer.count.minutes>1 || $scope.timer.count.hours>1));
  };
  
  $scope.start = function(operation){
    if(!$scope.validateFields())
      return $ionicPopup.alert({
            title:'Invalid input value',
            template:'Type numbers between 0 and 59 for hours and minute fields'
          });
    else
      if($scope.timer.count.seconds===null) $scope.timer.count.seconds=0;
      if($scope.timer.count.minutes===null) $scope.timer.count.minutes=0;
      if($scope.timer.count.hours===null) $scope.timer.count.hours=0;
    $scope.timer.updateTimerCount($scope.validateFields());
    $scope.setTimerStatus(1);
    if(operation===0){
    clockType='timer';
    myTimerVar=$timeout($scope.timerCountDown,1000); //the timerCountDown function is called in otder to start the recursive loop 
    }
    else{
    clockType='chrono';
    myTimerVar=$timeout($scope.chronometerCount,1000)
    }
  };

  
  $scope.pause = function(){
    $timeout.cancel(myTimerVar); //Stops decreasing when the count reaches 0
    $scope.setTimerStatus(2);
    return false;
  };
  
  
  $scope.timerCountDown= function(){
    $scope.timer.timerDecrease();
    $scope.timer.updateTimerCount($scope.validateFields());
    if($scope.timer.count.seconds ===0 && $scope.timer.count.minutes ===0 && $scope.timer.count.hours ===0){ //Stops decreasing when the count reaches 0
      $scope.stop();
      var alertPopup= $ionicPopup.alert({
      title:"Timer Complete",
      template:'Get into your next activity'
    });
      return false;
      
    }
    myTimerVar= $timeout($scope.timerCountDown,1000); //starts decreasing the myTimerCount to 0 recursively

  };
  
  $scope.chronometerCount= function(){
    $scope.timer.timerIncrease();
    $scope.timer.updateTimerCount($scope.validateFields());
    myTimerVar= $timeout($scope.chronometerCount,1000);
  };
  
  
  $scope.stop=function(){
      if(AuthService.isAuthenticated() && clockType==="chrono"){
        var endtime=$scope.timer.returnCountString();
        var promptPopup = $ionicPopup.prompt({
           title: 'Save activity',
           template: 'Do you want to save this Chronometer result?',
           inputType: 'text',
           inputPlaceholder: 'Activity performed'
        });

        promptPopup.then(function(res) {
           if(res) {
              console.log(res);
              insertActivity(res,endtime);
           } 
        });
      }
    $scope.timer.synchronizeCounts(); //set both the start value and current value as equals
    $scope.pause(); 
    $scope.timer.updateTimerCount($scope.validateFields());
    $scope.setTimerStatus(0);
    return false;
  };
  

  
  
  
    $scope.setTimerStatus = function(newTimerRunning){ //notifies whenever the timer is running or not
    $scope.timerStatus=newTimerRunning;
    if($scope.timerStatus===1)      {
          $scope.progressColors.barSeconds="#33cd5f";
          $scope.progressColors.barMinutes="#0e8d32";
          $scope.progressColors.barHours="#02621d";     
          }
      else { 
          $scope.progressColors.barSeconds="#11c1f3";
          $scope.progressColors.barMinutes="#0971B2";
          $scope.progressColors.barHours="#1485CC";
           }
  };
  

  

  $scope.getStyle = function(){
    var transform =  'translateY(-50%) translateX(-50%)';
    return {
      'top': '50%',
      'bottom': 'auto',
      'left': '50%',
      'transform': transform,
      '-moz-transform': transform,
      '-webkit-transform': transform,
      'font-size': ($scope.radius/3.5)*.5 + 'px'
    };
  };
  

  
});




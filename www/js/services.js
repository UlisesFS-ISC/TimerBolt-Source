// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
angular.module('starter')

.service('AuthService',function($q,$http,$window,API_ENDPOINT,API_ENDPOINT_SENS){
  var LOCAL_TOKEN_KEY='yourTokenKey';
  var isAuthenticated=false;


  var register= function(user){
    return $q(function(resolve,reject){
      $http.post(API_ENDPOINT.url+ '/signup', user).then(function(result){
        if(result.data.success){
          resolve(result.data.msg);
        }
        else{
          reject(result.data.msg);
        }
      });
    });
  };

  var insertActivity= function(sentName,sentEndTime){
    activity={
      name:sentName,
      timeelapsed:sentEndTime,
      token:$window.sessionStorage.token
    };
    return $q(function(resolve,reject){
      $http.post(API_ENDPOINT_SENS.url+ '/insertActivity' +'?token='+$window.sessionStorage.token, activity).then(function(result){
        if(result.data.success){
          resolve(result.data.msg);
        }
        else{
          reject(result.data.msg);
        }
      });
    });
  };

    var removeActivity= function(activity){
    return $q(function(resolve,reject){
      $http.post(API_ENDPOINT_SENS.url+ '/removeActivity' +'?token='+$window.sessionStorage.token, activity).then(function(result){
        if(result.data.success){
          resolve(result.data.msg);
        }
        else{
          reject(result.data.msg);
        }
      });
    });
  };


  var login= function(user){
    return $q(function(resolve,reject){
      $http.post(API_ENDPOINT.url+'/authenticate', user).then(function(result){
        if(result.data.success){
          $window.sessionStorage.token=result.data.token;
          isAuthenticated=true;
          $http.defaults.headers.common.token=result.data.token;
          $http.defaults.headers.post['Token'] = $window.sessionStorage.token
          resolve(result.data.msg);
        }
        else{
          reject(result.data.msg);
        }
      });
    });
  };

  var destroyUserCredentials= function(){
    $window.sessionStorage.token=undefined;
  };

  var logout=function(){
    isAuthenticated=false;
    destroyUserCredentials();
  };



    return{
      login:login,
      register: register,
      logout: logout,
      insertActivity: insertActivity,
      removeActivity: removeActivity,
      isAuthenticated: function(){return isAuthenticated;}
    };
})

.factory('TokenInterceptor', function ($q, $window) {  
    return {
        request: function (config) {
           
            config.headers['token'] = $window.sessionStorage.token;
            return config;
        }
    };
})

.config(function ($httpProvider) {  
    $httpProvider.interceptors.push('TokenInterceptor');
});





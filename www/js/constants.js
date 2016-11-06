// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter')

.constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated'
})
.constant('API_ENDPOINT', {
    url: 'https://apitimerbolt.herokuapp.com'
})
.constant('API_ENDPOINT_SENS', {
    url: 'https://apitimerbolt.herokuapp.com/api'
});


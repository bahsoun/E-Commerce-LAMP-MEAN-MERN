/**
 * Created by new on 11/6/16.
 */
//Conf Route App
commoAppRoute.config(['$routeProvider',function($routeProvider){
    $routeProvider.
    when('/index',{templateUrl:'./assets/templo/maini.html',controller:'EntranceController',title:"Home"}).
    when('/login',{templateUrl:'./assets/templo/login.html',controller:'EcommoLoggiController',title:"Home"}).
    when('/register',{templateUrl:'./assets/templo/register.html',controller:'EcommoReggiController',title:"Home"}).
    when('/eindex',{templateUrl:'./assets/templo/eindex.html',controller:'EcommoController',title:"Home"}).
    when('/userInfo',{templateUrl:'./assets/templo/userInfo.html',controller:'EcommoController',title:"Home"}).
    when('/account',{templateUrl:'./assets/templo/account.html',controller:'EcommoController',title:"Home"}).
    when('/basket',{templateUrl:'./assets/templo/basketi.html',controller:'EcommoController',title:"Home"}).
    when('/call',{templateUrl:'./assets/templo/call.html',controller:'EcommoController',title:"Home"}).
    when('/p/:prodCat',{templateUrl:'./assets/templo/prodCat.html',controller:'EcommoController',title:"Home"}).
    when('/cm/:cmdId',{templateUrl:'./assets/templo/cmdIdDetail.html',controller:'EcommoController',title:"Home"}).
    otherwise({redirectTo:'/index',title:"Home"});
}]);

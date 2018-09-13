//Module
var prognozaApp = angular.module('prognozaApp',['ngRoute','ngResource']);
//Configuration routes
prognozaApp.config(function($routeProvider){
    $routeProvider
        .when('/', {
       templateUrl:'pages/pocetna.html',
        controller:'pocetnaController'
    })
       .when('/prognoza', {
       templateUrl:'pages/prognoza.html',
        controller:'prognozaController'
    })
    
    .when('/prognoza/:days', {
       templateUrl:'pages/prognoza.html',
        controller:'prognozaController'
    })
});

//Services
prognozaApp.service('cityService',function() {
    this.city =  "New York";
});

//Controller 1
prognozaApp.controller('pocetnaController',['$scope','$location','cityService',function($scope,$location,cityService) {
    $scope.city = cityService.city;
    
    $scope.$watch('city',function() {
       cityService.city = $scope.city; 
    });
    
    $scope.submit = function() {
        $location.path("/prognoza");
    };
}]);
//Controller 2
prognozaApp.controller('prognozaController',['$scope','$resource','cityService','$routeParams',function($scope,$resource,cityService,$routeParams) {
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || '2';
    $scope.prognozaAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?APPID=c15b4aa2d859cdb146d09bc0672b9671");
    $scope.rezultatiPrognoze = $scope.prognozaAPI.get({q:$scope.city, cnt:$scope.days});
    $scope.konvertujUCelzijus = function(degK) {
        return Math.round(degK-273.15);
    };
    $scope.konvertujDatum = function(dt) {
        return new Date((dt*1000));
    };
    
}]);

//Creation Directives
prognozaApp.directive('izvestajPrognoze',function() {
   return {
       restrict:'E',
       templateUrl:"directives/izvestajPrognoza.html",
       replace: true,  
       scope: {
              danPrognoze: "=",
              konvertujStandard:  "&",
              konvertujDan: "&",
              formatDatuma: "@"
              
               }
            
         }
});
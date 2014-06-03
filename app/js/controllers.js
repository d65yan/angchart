'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services'])
  .controller('MyCtrl1', ['$scope','$timeout','family',function($scope,$timeout,family) {
         
          function convert(obj){
              var objs=[];
              for(var i in obj){
                  objs.push({key:i,value:obj[i]});

              }
              return objs;
          };
          
          $scope.$watch(function(){return JSON.stringify(family.data)},function(val){
              $scope.data=convert(family.data);
          });
          
        
          
          $scope.$on('expanded',function($event,val){
              $event.stopPropagation();
              $scope.expanded=val;
          })
  }])
   .controller('MyCtrl2', ['$scope','$timeout','family',function($scope,$timeout,family) {
          
          function convert(obj){
              var objs=[];
              for(var i in obj){
                  objs.push({key:i,value:obj[i]});

              }
              return objs;
          }
           $scope.$watch(function(){return JSON.stringify(family.data)},function(val){
              $scope.data=convert(family.data);
          });
          
          
          $scope.$on('expanded',function($event,val){
              $event.stopPropagation();
              $scope.expanded=val;
          })
  }])
  .controller('MyCtrl3', ['$scope','$timeout','family',function($scope,$timeout,family) {
         
          function convert(obj){
              var objs=[];
              for(var i in obj){
                  objs.push({key:i,value:obj[i]});

              }
              return objs;
          }
           $scope.$watch(function(){return JSON.stringify(family.data)},function(val){
              $scope.data=convert(family.data);
          });
          
          
          $scope.$on('expanded',function($event,val){
              $event.stopPropagation();
              $scope.expanded=val;
          })
  }])
    .controller('manipulation', ['$scope','family',function($scope,family) {
         
          function convert(obj){
              var objs=[];
              for(var i in obj){
                  objs.push({key:i,value:obj[i]});

              }
              return objs;
          }
          
          function reverse(arr){
              var obj={};
              for(var i=0;i<arr.length;i++){
                  obj[arr[i].key]=arr[i].value;
              }
              
              return obj;
          }
          
          $scope.$watch(function(){return JSON.stringify($scope.data)},function(){
              family.set(reverse($scope.data));
          });
          
          $scope.Add=function(k,v){
              $scope.data.push({key:k,value:v});
          };
          
          $scope.Remove=function(idx){
              $scope.data.splice(idx,1);
          }
          
          $scope.data=convert(family.data);
          

  }]);


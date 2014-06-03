 /*
    * this directives replaces ng-click with tap event to avoid the 300ms delay on dom for detecting 
    * if a move event is hapening. since this is a non isolating directive a scope is not defined
    */ 
   .directive('mobileTouch',['$timeout','$location','$rootScope',function($timeout,$location,$rootScope){
        return{
            restrict:'C',
            link:function(scope,element,attrs){
                scope.tapped=false;
                scope.touchstarttime=null;
                
               $(element).off('touchstart');
               element.bind('touchstart',function($event){
                   scope.tapped=true;
                   scope.touchstarttime=Date.now();
               });
               
               $(element).bind('touchmove',function($event){
                   scope.tapped=false;
               });
                   
               $(element).bind('touchend',function($event){
                    if(!scope.tapped){
                          scope.touchstarttime=null;
                          return;
                    }
                    scope.tapped=false;
                    if(attrs.prevent && attrs.prevent==='true'){
                        $event.preventDefault();
                    }
                   $event.stopImmediatePropagation();
                   $event.stopPropagation();
                   var str=null;
                   if(attrs.message){
                       str=attrs.message;
                   }
                   var link='';
                   var path=$location.path();
                   if(attrs.href){
                      str=str||'Getting There';
                      link=attrs.href.replace(/#/,'');
                      if(link===path)
                          return;
                   }
                   if(str){
                     $rootScope.$broadcast('toast',str,5000)
                       
                   }
               $timeout(
                   function(){
                   if(attrs.href){
                        $timeout(function(){$location.path(link);},900);
                   }
                   if(attrs.ngClick){
                        $timeout(function(){scope.$apply(attrs.ngClick);},100);
                                   
                   }
                   },100);
                   });
            }
        };
    }]) 
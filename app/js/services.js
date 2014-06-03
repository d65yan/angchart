'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  service('family',[function(){
          
          return {
              set:function(data){
                  
                for(var i in this.data){
                    if(!data[1]){
                        delete this.data[i];
                    }
                }   
                  
                for(var i in data){
                    this.data[i]=data[i];
                }  
            },
            data:{
                afitness_centers:5,
                parks_and_playgrounds:15,
                health:15,
                entertainment:5,
                restaurants:10,
                schools:20,
                afterschool:30,
                shopping:5,
                weekly_necessities:30}
          }
  }]).
  service('rosestart',[function(){
          
          return {
              set:function(data){
                  
                for(var i in this.data){
                    if(!data[1]){
                        delete this.data[i];
                    }
                }   
                  
                for(var i in data){
                    this.data[i]=data[i];
                }  
            },
            flatIt:function(){
                var arr0=[]
              for(var i in this.data){
                  var arr=[];
                  var d=this.data[i];
                  for(var j in d.data){
                      var d1=d.data[j];
                      arr.push()
                  }
              }  
            },
            data:{
                section_1:{
                    pos:1,
                    data:{
                        data_1:5,
                        data_2:7
                    }
                },
                section_2:{
                    pos:2,
                    data:{
                        data_1:5,
                        data_2:7
                    }
                },
                section_3:{
                    pos:3,
                    data:{
                        data_1:5,
                        data_2:7
                    }
                },
                section_4:{
                    pos:4,
                    data:{
                        data_1:5,
                        data_2:7
                    }
                },
                section_5:{
                    pos:5,
                    data:{
                        data_1:5,
                        data_2:7
                    }
                },
                section_6:{
                    pos:6,
                    data:{
                        data_1:5,
                        data_2:7
                    }
                }
            }
          }
  }]);

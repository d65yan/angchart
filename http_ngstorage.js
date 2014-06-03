/*
  Service that issues cancellable get requests if no matching records is stored on sessionStorage 
*/


.factory('HotSpotInfo',['$http','SelectionService','$sessionStorage',function($http,SelectionService,$sessionStorage){
    
            var ss=$sessionStorage;

    
            var stash={
                getGeoSig:function(hid,b,scb,fcb,skipExists){
                    if(ss['hotspot_'+hid+'_geosig']){
                        if(skipExists){
                            return true;
                        }
                        scb(JSON.parse(ss['hotspot_'+hid+'_geosig']))
                        return true
                    }
                    $http.get('api/hotspotinfo/'+hid+'/geosig',{params:b,timeout:SelectionService.hsRequestHandler.promise}).success(function(data){

                        ss['hotspot_'+hid+'_geosig']=JSON.stringify(data.data)
                        scb(data.data);
                    }).error(function(){fcb({error:1});});
                    return false;
                },
                getContributions:function(hid,b,scb,fcb){
                    if(ss['hotspot_'+hid+'_contrib']){
                        scb(JSON.parse(ss['hotspot_'+hid+'_contrib']))
                        return
                    }
                     $http.get('api/hotspotinfo/'+hid+'/contributors?call[]='+SelectionService.actualSystems.join('&call[]='),{params:b,timeout:SelectionService.hsRequestHandler.promise}).success(function(data){
                         ss['hotspot_'+hid+'_contrib']=JSON.stringify(data)
                         scb(data);
                    }).error(function(){fcb({error:1});});
                },
                getAmenities:function(hid,b,scb,fcb){
                    if(ss['hotspot_'+hid+'_amenities']){
                        scb(JSON.parse(ss['hotspot_'+hid+'_amenities']))
                        return
                    }
                     $http.get('api/hotspotinfo/'+hid+'/amenities',{timeout:SelectionService.hsRequestHandler.promise}).success(function(data){
                         ss['hotspot_'+hid+'_amenities']=JSON.stringify(data)
                         scb(data);
                    }).error(function(){fcb({error:1});});
                },
                getIndexes:function(hid,b,scb,fcb){
                    if(ss['hotspot_'+hid+'_indexes']){
                        scb(JSON.parse(ss['hotspot_'+hid+'_indexes']))
                        return
                    }
                     $http.get('api/hotspotinfo/'+hid+'/indexes',{timeout:SelectionService.hsRequestHandler.promise}).success(function(data){
                         ss['hotspot_'+hid+'_indexes']=JSON.stringify(data.data[0].hotspot_index_api)
                         scb(data.data[0].hotspot_index_api);
                    }).error(function(){fcb({error:1});});
                },
                getDivision:function(hid,b,scb,fcb){
                    if(ss['hotspot_'+hid+'_division']){
                        scb(JSON.parse(ss['hotspot_'+hid+'_division']))
                        return
                    }
                     $http.get('api/hotspotinfo/'+hid+'/division',{params:b,timeout:SelectionService.hsRequestHandler.promise}).success(function(data){
                         ss['hotspot_'+hid+'_division']=JSON.stringify(data.data[0].hotspot_political_api)
                         scb(data.data[0].hotspot_political_api);
                    }).error(function(){fcb({error:1});});
                }
                
            }
            
            return stash;
            
}])
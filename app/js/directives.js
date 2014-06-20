'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('chart', ['$compile', function($compile) {
    return {
        templateUrl:'partials/directives/sunchart.html',
        restrict:'C',
        scope:{
            data:'=data',
            width:'@width',
            height:'@height',
            barWidth:'@barWidth',
            radius:'@radius',
            text:'@text'
        },
        controller:function($scope){

        },
        link:function(scope,elem,attrs){
            scope.collapsed=true;
            scope.ToggleView=function(){
                scope.collapsed=!scope.collapsed;
                $(elem).toggleClass('collapsed');
                var animateto={width:(scope.width+'px'),height:(scope.height+'px')};
                if(scope.collapsed){
                    var animateto={width:(scope.radius+'px'),height:((scope.radius*1.5)+'px')};
                }
                $(elem).animate(animateto,500,function(){
                    //alert('done');
                });
                scope.$emit('expanded',!scope.collapsed);
                
            }
             
            elem.width(scope.radius);
            elem.height(scope.radius*1.5);
            $(elem).children('#loading_msg').css("left",((+scope.radius)+15)+'px');
            var node=$(elem).children('#floating_graph');
            
            node.width(scope.width);
            node.height(scope.height);
            node.css('margin-top',(+scope.height/-2));
            var angle=45;
            scope.maxValue= +attrs.maxValue;
            var arc = d3.svg.arc()
            .outerRadius(scope.radius)
            .innerRadius(0)
            .startAngle(0)
            .endAngle(Math.PI);

            var svg = d3.select(node[0]).append("svg")
            .attr("width", scope.width)
            .attr("height", scope.height);

            scope.$watch(function(){return JSON.stringify(scope.data)},function(){
                var data=scope.data;
                if(!data || !data.length){
                    return;
                };
                data=data.sort(function(b,a){
                    return ((a.value-b.value)/Math.abs(a.value-b.value));
                })
                scope.maxValue=data[0].value;
                $('#loading_msg').hide('slow');
                $(elem).find('g.bars').remove();
                angle=180/(scope.data.length+1);
                var bars=svg.selectAll('.bars')
               .data(scope.data);
                bars.attr('transform',function(d,index){
                   return "translate(" + 0 + "," +(10+((+scope.height/2)-scope.width))+")rotate("+(index+1)*angle+",5,"+(+scope.width-10)+")"
                });
                bars.selectAll('.value_bar')
                .attr('height',function(d){ 
                   return (((d.value/scope.maxValue)*(+scope.width-(+scope.radius)-3)));
                })
               .attr('transform',function(d){
                   var h=(((d.value/scope.maxValue)*(+scope.width-(+scope.radius)-3)));
                   var dif=(+scope.width-10)-h;
                   return 'translate(0,'+(dif-(+scope.radius)+5)+')';
               });


               bars.enter()
               .append('g')
               .attr('class','bars').attr('transform',function(d,index){
                   return "translate(" + 0 + "," +(10+((+scope.height/2)-scope.width))+")rotate("+(index+1)*angle+",5,"+(+scope.width-10)+")"
                });
               
                
               bars.append('rect')
               .attr('width','10')
               .attr('height',(+scope.width-10))
               .style('fill','#dcdcdc');
       
               bars.append('rect')
               .attr('width','10')
               .attr('height',function(d){ 
                   return (((d.value/scope.maxValue)*(+scope.width-(+scope.radius)-3)));
                })
               .attr('transform',function(d){
                   var h=(((d.value/scope.maxValue)*(+scope.width-(+scope.radius)-3)));
                   var dif=(+scope.width-10)-h;
                   return 'translate(0,'+(dif-(+scope.radius)+5)+')';
               })
               .attr('class','value_bar')
               .style('fill','#ff0000');
               var text_left=(+scope.radius)<=40?((+scope.width)-70):((+scope.width)-(+scope.radius)-30);
               bars.append('text')
                   .text(function(d,index){
                      return d.key;
                   })
                  .attr('transform','translate(-2,'+text_left+') rotate(-90)')
                  .style('font-size','11px');
          
              bars.exit().remove();
          
                  $(svg[0]).append(sun[0]);
            })
            
                           
               
       
               var sun=svg.append("g")
            .attr("transform", "translate(" + 0 + "," + scope.height / 2 + ")");
            sun.append("path")
            .attr('ng-click','ToggleView()')
            .attr("d", arc)
            .style("fill",'#ff0000')
            .style("z-index",'1000000');
            sun.append('text')
               .text(scope.text)
               .style("fill","#ffffff")
               .attr('transform','translate(6,6)');
            $compile(angular.element($(elem).find('path')))(scope);
        }
    }
  }]).
  directive('flowerChart', ['$compile', function($compile) {
    return {
        templateUrl:'partials/directives/sunchart.html',
        restrict:'C',
        scope:{
            data:'=data',
            width:'@width',
            height:'@height',
            barWidth:'@barWidth',
            radius:'@radius',
            text:'@text'
        },
        controller:function($scope){
            
        },
        link:function(scope,elem,attrs){
            scope.collapsed=true;
            scope.ToggleView=function(){
                scope.collapsed=!scope.collapsed;
                $(elem).toggleClass('collapsed');
                var animateto={width:(scope.width+'px'),height:(scope.height+'px')};
                if(scope.collapsed){
                    var animateto={width:(scope.radius+'px'),height:((scope.radius*1.5)+'px')};
                }
                $(elem).animate(animateto,500,function(){
                    //alert('done');
                });
                scope.$emit('expanded',!scope.collapsed);
                
            }
             
            elem.width(scope.radius);
            elem.height(scope.radius*1.5);
            $(elem).children('#loading_msg').css("left",((+scope.radius)+15)+'px');
            var node=$(elem).children('#floating_graph');
            
            node.width(scope.width);
            node.height(scope.height);
            node.css('margin-top',(+scope.height/-2));
            var angle=45;
            scope.maxValue= +attrs.maxValue;
            var arc = d3.svg.arc()
            .outerRadius(scope.radius)
            .innerRadius(0)
            .startAngle(0)
            .endAngle(Math.PI);

            var svg = d3.select(node[0]).append("svg")
            .attr("width", scope.width)
            .attr("height", scope.height);

            scope.$watch(function(){return JSON.stringify(scope.data)},function(){
                var data=scope.data;
                $(elem).find('g.petals').remove();
                if(!data || !data.length){
                    return;
                };
                data=data.sort(function(b,a){
                    return ((a.value-b.value)/Math.abs(a.value-b.value));
                })
                scope.maxValue=data[0].value;
                $('#loading_msg').hide('slow');
                angle=180/(scope.data.length+1);
                var petals=svg.selectAll('.petals')
               .data(scope.data).enter()
               .append('g')
                .attr("transform", "translate(0," + scope.height / 2 + ")")
               .attr('class','petals');
       
       
               petals.append('path')
               .attr('d',function(d,index){
                   
                   var rad=40+((d.value/scope.maxValue)*(+scope.width-scope.radius));
                   var init=index*angle*0.0174532925;
                   var end=(index+1)*angle*0.0174532925;
                   var arc = d3.svg.arc()
                          .outerRadius(rad)
                          .innerRadius(+scope.radius)
                          .startAngle(init)
                          .endAngle(end);         
                          return arc();
               })
               .attr('class','petals')
               .style('fill','#ffaa44')
               .style('stroke','#ff0000');
       
               var text_left=(+scope.radius)<=40?((+scope.width)-70):((+scope.width)-(+scope.radius)-30);
               petals.append('text')
                   .text(function(d,index){
                      return index+1;
                   })
                  .attr('transform',function(d,index){
                      var rad=40+((d.value/scope.maxValue)*(+scope.width-scope.radius));
                        var init=index*angle*0.0174532925;
                        var end=(index+1)*angle*0.0174532925;
                        var arc = d3.svg.arc()
                          .outerRadius(rad)
                          .innerRadius(+scope.radius)
                          .startAngle(init)
                          .endAngle(end);         
                          return "translate("+arc.centroid()+")";
                  })
                  .style('font-size','11px')
                  .style('font-weight','bold');
            });
            
                           
               
       
               var sun=svg.append("g")
            .attr("transform", "translate(" + 0 + "," + scope.height / 2 + ")");
            sun.append("path")
            .attr('ng-click','ToggleView()')
            .attr("d", arc)
            .style("fill",'#ff0000')
            .style("z-index",'1000000');
            sun.append('text')
               .text(scope.text)
               .style("fill","#ffffff")
               .attr('transform','translate(6,6)');
            $compile(angular.element($(elem).find('path')))(scope);
        }
    }
  }]).
  directive('barchart', ['$compile', function($compile) {
    return {
        templateUrl:'partials/directives/barchart.html',
        restrict:'C',
        scope:{
            data:'=data',
            width:'@width',
            height:'@height',
            barWidth:'@barWidth',
            radius:'@radius',
            text:'@text'
        },
        controller:function($scope){

        },
        link:function(scope,elem,attrs){
            scope.collapsed=true;
            var barWidth=(+scope.barWidth)||10;
            scope.ToggleView=function(){
                scope.collapsed=!scope.collapsed;
                $(elem).toggleClass('collapsed');
                var animateto={width:(scope.width+'px'),height:(scope.height+'px')};
                if(scope.collapsed){
                    var animateto={width:(scope.radius+'px'),height:((scope.radius*1.5)+'px')};
                }
                $(elem).animate(animateto,500,function(){
                    //alert('done');
                });
                scope.$emit('expanded',!scope.collapsed);
                
            }
             
            elem.width(scope.radius);
            elem.height(scope.radius*1.5);
            
            $(elem).children('#loading_msg').css("left",((+scope.radius)+15)+'px');
            var node=$(elem).children('#graph');
            var sun=$(elem).children('#sun');
            
            node.width(scope.width);
            node.height(scope.height);
            var gap=30;
            scope.maxValue= +attrs.maxValue;
            var arc = d3.svg.arc()
            .outerRadius(scope.radius)
            .innerRadius(0)
            .startAngle(0)
            .endAngle(Math.PI);
            var h=(+scope.height)-20;
            
            var svg = d3.select(node[0]).append("svg")
            .attr("width", scope.width)
            .attr("height", h);

            

            scope.$watch(function(){return JSON.stringify(scope.data)},function(){
                var data=scope.data;
                $(elem).find('g.bars').remove();
                if(!data || !data.length){
                    return;
                };
                data=data.sort(function(b,a){
                    return ((a.value-b.value)/Math.abs(a.value-b.value));
                })
                scope.maxValue=data[0].value;
                $('#loading_msg').hide('slow');
                gap=(h/(data.length+1));
                var bars=svg.selectAll('.bars')
               .data(scope.data).enter()
               .append('g')
               .attr('class','bars')
               .attr('transform',function(d,index){
                   return "translate(5,"+((index+1)*gap)+ ")"
                });
                
               bars.append('rect')
               .attr('height',barWidth)
               .attr('width',(+scope.width-10))
               .style('fill','#dcdcdc');
       
               bars.append('rect')
               .attr('height',barWidth)
               .attr('width',function(d){ 
                   return (((d.value/scope.maxValue)*(+scope.width-10)));
                })/*
               .attr('transform',function(d){
                   var h=(((d.value/scope.maxValue)*(+scope.width-10)));
                   var dif=(+scope.width-10)-h;
                   return 'translate('+dif+',0)';
               })*/
               .style('fill','#ff0000');
               //var text_left=(+scope.radius)<=40?((+scope.width)-70):((+scope.width)-(+scope.radius)-30);
               bars.append('text')
                   .text(function(d){
                      return d.key;
                   })
                  .attr('transform','translate(40,-2)')
                  .style('font-size','11px');
            })
            

            $compile(angular.element($(elem).find('path')))(scope);
        }
    }
  }]).
  directive('roseChart', ['$compile', function($compile) {
    return {
        templateUrl:'partials/directives/sunchart.html',
        restrict:'C',
        scope:{
            data:'=data',
            width:'@width',
            height:'@height',
            barWidth:'@barWidth',
            radius:'@radius',
            text:'@text'
        },
        controller:function($scope){
            
        },
        link:function(scope,elem,attrs){
            scope.collapsed=true;
            scope.ToggleView=function(){
                scope.collapsed=!scope.collapsed;
                $(elem).toggleClass('collapsed');
                var animateto={width:(scope.width+'px'),height:(scope.height+'px')};
                if(scope.collapsed){
                    var animateto={width:(scope.radius+'px'),height:((scope.radius*1.5)+'px')};
                }
                $(elem).animate(animateto,500,function(){
                    //alert('done');
                });
                scope.$emit('expanded',!scope.collapsed);
                
            }
             
            elem.width(scope.radius);
            elem.height(scope.radius*1.5);
            $(elem).children('#loading_msg').css("left",((+scope.radius)+15)+'px');
            var node=$(elem).children('#floating_graph');
            
            node.width(scope.width);
            node.height(scope.height);
            node.css('margin-top',(+scope.height/-2));
            var angle=45;
            scope.maxValue= +attrs.maxValue;
            var arc = d3.svg.arc()
            .outerRadius(scope.radius)
            .innerRadius(0)
            .startAngle(0)
            .endAngle(2*Math.PI);

            var svg = d3.select(node[0]).append("svg")
            .attr("width", scope.width)
            .attr("height", scope.height);

            scope.$watch(function(){return JSON.stringify(scope.data)},function(){
                var data=scope.data;
                $(elem).find('g.petals').remove();
                if(!data || !data.length){
                    return;
                };
                data=data.sort(function(b,a){
                    return ((a.value-b.value)/Math.abs(a.value-b.value));
                })
                scope.maxValue=data[0].value;
                $('#loading_msg').hide('slow');
                angle=180/(scope.data.length+1);
                var petals=svg.selectAll('.petals')
               .data(scope.data).enter()
               .append('g')
                .attr("transform", "translate(" + scope.width / 2 + "," + scope.height / 2 + ")")
               .attr('class','petals');
       
       
               petals.append('path')
               .attr('d',function(d,index){
                   
                   var rad=40+((d.value/scope.maxValue)*((+scope.width/2)-scope.radius));
                   var init=index*angle*0.0174532925;
                   var end=(index+1)*angle*0.0174532925;
                   var arc = d3.svg.arc()
                          .outerRadius(rad)
                          .innerRadius(+scope.radius)
                          .startAngle(init)
                          .endAngle(end);         
                          return arc();
               })
               .attr('class','petals')
               .style('fill','#ffaa44')
               .style('stroke','#ff0000');
       
               var text_left=(+scope.radius)<=40?((+scope.width)-70):((+scope.width)-(+scope.radius)-30);
               petals.append('text')
                   .text(function(d,index){
                      return index+1;
                   })
                  .attr('transform',function(d,index){
                      var rad=40+((d.value/scope.maxValue)*(+scope.width-scope.radius));
                        var init=index*angle*0.0174532925;
                        var end=(index+1)*angle*0.0174532925;
                        var arc = d3.svg.arc()
                          .outerRadius(rad)
                          .innerRadius(+scope.radius)
                          .startAngle(init)
                          .endAngle(end);         
                          return "translate("+arc.centroid()+")";
                  })
                  .style('font-size','11px')
                  .style('font-weight','bold');
            });
            
                           
               
       

            svg.append('line')
                    .attr('x1',0)
                    .attr('y1',0)
                    .attr('x2',scope.width)
                    .attr('y2',scope.height)
                    .attr('style','stroke-width: 1px;stroke: #000000;');
            svg.append('line')
                    .attr('x1',0)
                    .attr('y1',scope.height)
                    .attr('x2',scope.width)
                    .attr('y2',0)
                    .attr('style','stroke-width: 1px;stroke: #000000;');
           svg.append('line')
                    .attr('x1',scope.width/2)
                    .attr('y1',scope.height)
                    .attr('x2',scope.width/2)
                    .attr('y2',0)
                    .attr('style','stroke-width: 1px;stroke: #000000;');
           svg.append('line')
                    .attr('x1',scope.width/2)
                    .attr('y1',scope.height/2)
                    .attr('x2',scope.width)
                    .attr('y2',scope.height/2)
                    .attr('style','stroke-width: 1px;stroke: #000000;');
            
                           var sun=svg.append("g")
            .attr("transform", "translate(" +scope.width / 2 + "," + scope.height / 2 + ")");
            sun.append("path")
            .attr('ng-click','ToggleView()')
            .attr("d", arc)
            .style("fill",'#ff0000')
            .style("z-index",'1000000');
            sun.append('text')
               .text(scope.text)
               .style("fill","#ffffff")
               .attr('transform','translate(6,6)');
            $compile(angular.element($(elem).find('path')))(scope);
        }
    }
  }]).
  directive('spiderWeb', ['$compile', function($compile) {
    return {
        templateUrl:'partials/directives/sunchart.html',
        restrict:'C',
        scope:{
            data:'=data',
            levels:'@levels',
            innerRadius:'@innerRadius',
            text:'@text'
        },
        controller:function($scope){
            
        },
        link:function(scope,elem,attrs){
            scope.collapsed=false;
            var colors=['#ff0000','#00ff00','#0000ff','#ffff00','#ff00ff','#00ff00','#00ffff'];

            var width=elem.width();
            var height=elem.height();
            
            var diagonalOffset=(Math.sqrt(Math.pow(width,2),Math.pow(height,2))-height)/2;
            
            var mainAngle=Math.atan(height/width);
            var diagonalOffsetX=diagonalOffset*Math.cos(mainAngle);
            var diagonalOffsetY=diagonalOffset*Math.sin(mainAngle);
            
            
            var radius=Math.floor(Math.min(width,height)/2);
            var thicknes=radius-20;
            var radius_increments=Math.floor(thicknes/(+scope.levels));
            
            $(elem).children('#loading_msg').remove();
            
            var node=$(elem).children('#floating_graph');
            
            var angles_1_2_4_5=Math.atan((width/2)/(height/2));
            var angules3_6=(2*Math.PI-(4*angles_1_2_4_5))/2;
            
            var anglesList=[angles_1_2_4_5,angles_1_2_4_5,angules3_6,angles_1_2_4_5,angles_1_2_4_5,angules3_6];
            var quadrant_limits=build_quadrants_start(anglesList);
            
            function build_quadrants_start(arr){
                var i;
                var larr=[0];
                for(i=0;i<arr.length-1;i++){
                       larr.push(larr[i]+arr[i]); 
                }
                return larr;
            }
            
            node.width(width);
            node.height(height);
            node.css('margin-top',(+scope.height/-2));
            scope.maxValue= +attrs.maxValue;
            var arc = d3.svg.arc()
            .outerRadius(scope.radius)
            .innerRadius(0)
            .startAngle(0)
            .endAngle(2*Math.PI);

            var svg = d3.select(node[0]).append("svg")
            .attr("width",width)
            .attr("height", height);
           
             var data={
                section_1:{
                    pos:0,
                    data:{
                        Convenience_and_Errands_1:5,
                        Convenience_and_Errands_2:7,
                        Convenience_and_Errands_3:4
                    }
                },
                section_2:{
                    pos:1,
                    data:{
                        Convenience_and_Errands__1:5,
                        Convenience_and_Errands2:7
                    }
                },
                section_3:{
                    pos:2,
                    data:{
                        Convenience_and_Errands_1:5,
                        Convenience_and_Errands_2:7,


                    }
                },
                section_4:{
                    pos:3,
                    data:{
                        Convenience_and_Errands_1:5,
                        Convenience_and_Errands_2:7
                    }
                },
                section_5:{
                    pos:4,
                    data:{
                        Convenience_and_Errands_1:5,
                        Convenience_and_Errands_2:7
                    }
               },
                section_6:{
                    pos:5,
                    data:{
                        Convenience_and_Errands_1:5,
                        Convenience_and_Errands_2:7
                    }
                }
            };
            
            function labelsDotsData(data,Maxvalue){
                Maxvalue=Maxvalue||10;
                var main=[];
                for(var i=0;i<data.length;i++){
                    var obj=angular.copy(data[i]);
                    for(var j=0;j<obj.values.length;j++){
                        var lnode={quadrant:obj.pos,label:(obj.values[j].key.replace('_and_',' & ')+'=='+obj.values[j].value),value:obj.values[j].value,order:j,splits:obj.values.length};
                        main.push(lnode);
                    }
                }
                return main.sort(function(a,b){return (a.quadrant-b.quadrant)/Math.abs(a.quadrant-b.quadrant)});
            }
            
           function transformData(data,Maxvalue){
                Maxvalue=Maxvalue||10;
                var main=[];
                for(var i in data){
                    var obj=angular.copy(data[i]);
                    obj.key=i;
                    obj.values=[];
                    for(var j in obj.data){
                        obj.values.push({key:j,value:(obj.data[j]/Maxvalue)});
                    }
                    delete obj.data;
                    main.push(obj);
                }
                return main.sort(function(a,b){return (a-b)/Math.abs(a-b)});
            }
            
            var ndata=transformData(data);
            var labelspoints=labelsDotsData(ndata);
            
            var gpoints=[];
            for(var jk=0;jk<ndata.length;jk++){
                var larr=createPoints(ndata[jk].values,anglesList[jk],(width/2),(height/2))
                larr=larr.splice(2,larr.length-3);
                gpoints=gpoints.concat(larr);
            }
            
            function Draw(data,labelspoints){
                var polig=svg.selectAll('.plygroups').
                        data(data).
                        enter().
                        append('polygon').
                        attr('class','plygroups').
                        attr('points',function(d,index){
                                return createPoints(d.values,anglesList[index]).join(' ');
                        }).
                        attr('transform',function(d,index){
                            var trans='translate('+width/2+','+height/2+') rotate('+(rad2degress(quadrant_limits[index])-90-rad2degress(angles_1_2_4_5))+')';
                            return trans;
                        }).
                        style('fill',function(d,index){return colors[index]}).
                        style('fill-opacity','0.5').
                        style('stroke','#000000');
                
                var lines=svg.selectAll('.guide-lines').
                        data(labelspoints).
                        enter().
                        append('line').
                        attr('class','guide-lines').
                        style('stroke','#cdcdcd').
                        attr('x1',0).
                        attr('y1',0).
                        attr('x2',0).
                        attr('y2',((radius-20)*-1)).
                        attr('transform',function(d,index){
                            var translate='translate('+width/2+','+height/2+')';
                            var ang=anglesList[d.quadrant]/(d.splits+1);
                            var angle=rad2degress(quadrant_limits[d.quadrant]+(d.order+1)*ang);
                            
                            
                            var rotate=' rotate('+(angle-rad2degress(angles_1_2_4_5))+',0,0)';
                            return translate+rotate;
                        });
                    for(var i=0; i<labelspoints.length;i++){
                        var d=labelspoints[i];
                        var ang=anglesList[d.quadrant]/(d.splits+1);
                        d.angle=quadrant_limits[d.quadrant]+((d.order+1)*ang)-(Math.PI/2)-angles_1_2_4_5;
                        d.radangle=rad2degress(d.angle);
                        d.offsetradangle=rad2degress(d.angle+(Math.PI/2));
                        d.point={
                            x:getX(d.value,d.angle,thicknes),
                            y:getY(d.value,d.angle,thicknes)
                        }
                        
                        d.maxPoint={
                            x:(getX(1,d.angle,thicknes)-(Math.cos(d.angle)<0?70:-10)),
                            y:getY(1.1,d.angle,thicknes)
                        }
                        
                        var sin=Math.sin(d.angle+(Math.PI/2));
                        var cos=Math.cos(d.angle+(Math.PI/2));
                        var coSign=cos/Math.abs(cos);
                        var sinSign=sin/Math.abs(sin);
                        d.placementOffset={
                            x:sinSign*80*Math.pow(1-Math.abs(sin),3),
                            y:coSign*4*Math.pow(Math.abs(cos),3)
                        }
                        
                        
                    }
                var points=svg.selectAll('.value-point').
                        data(labelspoints).
                        enter().
                        append('circle').
                        attr('class','value-point').
                        style('stroke','#cdcdcd').
                        attr('r',2).
                        attr('cx',function(d,index){
                            return d.point.x;
                        }).
                        attr('cy',function(d,index){
                            return d.point.y
                        }).
                        attr('meta',function(d){
                            return JSON.stringify(d);
                        }).
                       attr('transform',function(){
                           return 'translate('+width/2+','+height/2+')';
                       });
                       
                  var labels=svg.selectAll('.contrib-name').
                        data(labelspoints).
                        enter().
                        append('text').
                        attr('class','contrib-name').
                        style('font-size','10px').
                        html(function(d){
                            var text=d.label.split(' ');
                            var idx=text.indexOf('&');
                            if(text.length>1){
                                if(idx===0){
                                    text[1]='& '+text[1];
                                    text.shift();
                                }
                                else if(idx===(text.length-1)){
                                    text[idx-1]+=' &';
                                    text.pop();
                                }
                                else if(idx>0){
                                    if(text[idx-1].length<text[idx+1].length){
                                        text[idx-1]+= ' &';
                                    }
                                    else{
                                        text[idx-1]=text[idx-1]+' &';
                                    }
                                    text.splice(idx,1);
                                }
                            }
                            var label=text[0]||'';
                            
                            for(var i=1;i<text.length;i++){
                                label+='<tspan y="'+((+d.maxPoint.y-d.placementOffset.y)+i*10)+'" x="'+(d.maxPoint.x-d.placementOffset.x)+'">'+text[i]+'</tspan>';
                            }
                            return label;
                        }).
                        attr('x',function(d,index){
                            return d.maxPoint.x-d.placementOffset.x;
                        }).
                        attr('y',function(d,index){
                            return d.maxPoint.y-d.placementOffset.y;
                        })
                        .
                       attr('transform',function(){
                           return 'translate('+width/2+','+height/2+')';
                       }).
                        attr('meta',function(d){
                            return JSON.stringify(d);
                        });
                        


                        
            }
               
            function createPoints(larr,wide,offsetX,offsetY,offsetAlpha){
                offsetX=offsetX||0;
                offsetY=offsetY||0;
                offsetAlpha=offsetAlpha||0;
                var arr=larr.slice();
                var points=['0,0'];
                var baseAngle=wide/(arr.length+1);
                arr.unshift({value:0.5});
                arr.push({value:0.5});
                for(var i=0;i<arr.length;i++){
                    points.push((getX(arr[i].value,(baseAngle*i+offsetAlpha),thicknes)+offsetX)+','+(getY(arr[i].value,(baseAngle*i+offsetAlpha),thicknes)+offsetY));
                }
                return points;
            }
            
            function getX(value,angle,r){
                return Math.cos(angle)*(value*r);
            }            
            
            function getY(value,angle,r){
                return Math.sin(angle)*(value*r);
            }
            
            var rad2degress=function(rads){
                return (180*rads/Math.PI);
            }

            

            svg.append('line')
                    .attr('x1',diagonalOffsetX)
                    .attr('y1',diagonalOffsetY)
                    .attr('x2',(width-diagonalOffsetX))
                    .attr('y2',(height-diagonalOffsetY))
                    .attr('style','stroke-width: 1px;stroke: #000000;');
            svg.append('line')
                    .attr('x1',diagonalOffsetX)
                    .attr('y1',(height-diagonalOffsetY))
                    .attr('x2',(width-diagonalOffsetX))
                    .attr('y2',diagonalOffsetY)
                    .attr('style','stroke-width: 1px;stroke: #000000;');
           svg.append('line')
                    .attr('x1',width/2)
                    .attr('y1',height)
                    .attr('x2',width/2)
                    .attr('y2',0)
                    .attr('style','stroke-width: 1px;stroke: #000000;');
            

            var rings=[];
            for(var i=0;i<+scope.levels;i++){
                rings.push((i+1)*radius_increments);
            }
            
            svg.selectAll('.level_ring')
                    .data(rings)
                    .enter()
                    .append('circle')
                    .style('stroke','#cccccc')
                    .style('stroke-width','1px')
                    .style('fill','transparent')
                    .attr('r',function(d){
                        return d;
                    })
                    .attr("transform", "translate(" +width / 2 + "," + height / 2 + ")");
           /*svg.append('line')
                    .attr('x1',scope.width/2)
                    .attr('y1',scope.height/2)
                    .attr('x2',scope.width)
                    .attr('y2',scope.height/2)
                    .attr('style','stroke-width: 1px;stroke: #000000;');*/
            
           /*                var sun=svg.append("g")
            .attr("transform", "translate(" +width / 2 + "," + height / 2 + ")");
            sun.append("path")
            .attr('ng-click','ToggleView()')
            .attr("d", arc)
            .style("fill",'#ff0000')
            .style("z-index",'1000000');
            sun.append('text')
               .text(scope.text)
               .style("fill","#ffffff")
               .attr('transform','translate(6,6)');
            $compile(angular.element($(elem).find('path')))(scope);*/
            Draw(ndata,labelspoints);
                        svg.append('line')
                    .attr('x1',diagonalOffsetX)
                    .attr('y1',diagonalOffsetY)
                    .attr('x2',(width-diagonalOffsetX))
                    .attr('y2',(height-diagonalOffsetY))
                    .attr('style','stroke-width: 1px;stroke: #000000;');
            svg.append('line')
                    .attr('x1',diagonalOffsetX)
                    .attr('y1',(height-diagonalOffsetY))
                    .attr('x2',(width-diagonalOffsetX))
                    .attr('y2',diagonalOffsetY)
                    .attr('style','stroke-width: 1px;stroke: #000000;');
           svg.append('line')
                    .attr('x1',width/2)
                    .attr('y1',height)
                    .attr('x2',width/2)
                    .attr('y2',0)
                    .attr('style','stroke-width: 1px;stroke: #000000;');
        }
    }
  }]).
  directive('windRose', ['$compile', function($compile) {
    return {
        templateUrl:'partials/directives/sunchart.html',
        restrict:'C',
        scope:{
            data:'=data',
            levels:'@levels',
            innerRadius:'@innerRadius',
            text:'@text'
        },
        controller:function($scope){
            
        },
        link:function(scope,elem,attrs){
            scope.collapsed=false;
            var colors=['#ff0000','#00ff00','#0000ff','#ffff00','#ff00ff','#00ff00','#00ffff'];

            var width=elem.width();
            var height=elem.height();
            
           
            var radius=Math.floor(Math.min(width,height)/2);
            var thicknes=radius-20;
            var radius_increments=Math.floor(thicknes/(+scope.levels));
            
            $(elem).children('#loading_msg').remove();
            
            var node=$(elem).children('#floating_graph');
            var rad2degress=function(rads){
                return (180*rads/Math.PI);
            }
            
            var deg2rad=function(deg){
                return (Math.PI*deg/180);
            }
            
            node.width(width);
            node.height(height);
            node.css('margin-top',(+scope.height/-2));
            scope.maxValue= +attrs.maxValue;


            var svg = d3.select(node[0]).append("svg")
            .attr("width", width)
            .attr("height", height);
           
           var quadrants=[
               {
                   name:"cuadrant1",
                   values:[
                       {
                           name:"system1",
                           value:5
                       },
                       {
                           name:"system3",
                           value:3
                       },
                       {
                           name:"system2",
                           value:6
                       }

                   ]
               },
               {
                   name:"cuadrant2",
                   values:[
                       {
                           name:"system1",
                           value:5
                       },
                       {
                           name:"system2",
                           value:6
                       }
                   ]
               },
               {
                   name:"cuadrant3",
                   values:[
                       {
                           name:"system1",
                           value:5
                       },
                       {
                           name:"system2",
                           value:6
                       }
                   ]
               },
               {
                   name:"cuadrant4",
                   values:[
                       {
                           name:"system1",
                           value:5
                       },
                       {
                           name:"system2",
                           value:6
                       }
                   ]
               }
           ];
           
            function getX(value,angle,r){
                return Math.cos(angle)*(value*r);
            }            
            
            function getY(value,angle,r){
                return Math.sin(angle)*(value*r);
            }
            
           
           var maxValue=10;
           var bars=[];
           for(var i=0;i<quadrants.length;i++){
               var q=quadrants[i];
               q.base_angle=((Math.PI/2)/q.values.length)-(0.03490658503989)*2;
               q.half_base_angle=q.base_angle/2;
               q.starts_at=(i-1)*90;
               for(var j=0;j<q.values.length;j++){
                   var v=q.values[j];
                   v.base=v.value*radius/maxValue;
                   v.offset=Math.atan(q.half_base_angle)*v.base;
                   v.half_base_angle=rad2degress(q.half_base_angle);
                   v.label=v.name.replace('_and_',' & ')+'=='+v.value;
                   v.quadrant=i;
                   v.start_angle=q.starts_at;
                   v.angle_width=rad2degress(q.base_angle);
                   v.order=j;
                   v.points=['0,0',((v.offset*-1)+','+(-1*v.base)),((v.offset)+','+(-1*v.base))];
                   v.rotate_angle=(j===0)?(2+v.half_base_angle+(j*v.angle_width)+v.start_angle):(q.values[j-1].rotate_angle+v.angle_width+4);
                   bars.push(v);
                   v.color=colors[i];
                   v.marker_line_angle=v.rotate_angle;
                   
                   v.marker_line_angle_rad=deg2rad(v.marker_line_angle);
                   v.label_angle=v.marker_line_angle_rad-Math.PI/2;
                   v.maxPoint={
                     x:(getX(1,v.label_angle,thicknes)-(Math.cos(v.label_angle)<0?70:-10)),
                     y:getY(1.1,v.label_angle,thicknes)
                  }
                  var sin=Math.sin(v.marker_line_angle_rad);
                  var cos=Math.cos(v.marker_line_angle_rad);
                  var coSign=cos/Math.abs(cos);
                  var sinSign=sin/Math.abs(sin);
                  v.placementOffset={
                       x:sinSign*80*Math.pow(1-Math.abs(sin),3),
                       y:coSign*4*Math.pow(Math.abs(cos),3)
                  }
                   
               }
               
           }
           

            
            function Draw(data){
                var polig=svg.selectAll('.plygroups').
                        data(data).
                        enter().
                        append('polygon').
                        attr('class','plygroups').
                        attr('points',function(d,index){
                                return d.points.join(' ');
                        }).
                        attr('transform',function(d,index){
                            var trans='translate('+width/2+','+height/2+') rotate('+d.rotate_angle+')';
                            return trans;
                        }).
                        attr('datum',function(d){
                            return JSON.stringify(d);
                        }).
                        style('fill',function(d,index){return d.color}).
                        style('fill-opacity','0.5').
                        style('stroke','#000000')
                        ;
               
                    var lines=svg.selectAll('.guide-lines').
                        data(data).
                        enter().
                        append('line').
                        attr('class','guide-lines').
                        style('stroke','#cdcdcd').
                        attr('x1',0).
                        attr('y1',0).
                        attr('x2',0).
                        attr('y2',((radius-20)*-1)).
                        attr('transform',function(d,index){
                            var translate='translate('+width/2+','+height/2+')';
                            var rotate=' rotate('+d.marker_line_angle+',0,0)';
                            return translate+rotate;
                        });
               
                    
                  var labels=svg.selectAll('.contrib-name').
                        data(data).
                        enter().
                        append('text').
                        attr('class','contrib-name').
                        style('font-size','10px').
                        html(function(d){
                            var text=d.label.split(' ');
                            var idx=text.indexOf('&');
                            if(text.length>1){
                                if(idx===0){
                                    text[1]='& '+text[1];
                                    text.shift();
                                }
                                else if(idx===(text.length-1)){
                                    text[idx-1]+=' &';
                                    text.pop();
                                }
                                else if(idx>0){
                                    if(text[idx-1].length<text[idx+1].length){
                                        text[idx-1]+= ' &';
                                    }
                                    else{
                                        text[idx-1]=text[idx-1]+' &';
                                    }
                                    text.splice(idx,1);
                                }
                            }
                            var label=text[0]||'';
                            
                            for(var i=1;i<text.length;i++){
                                label+='<tspan y="'+((+d.maxPoint.y-d.placementOffset.y)+i*10)+'" x="'+(d.maxPoint.x-d.placementOffset.x)+'">'+text[i]+'</tspan>';
                            }
                            return label;
                        }).
                        attr('x',function(d,index){
                            return d.maxPoint.x-d.placementOffset.x;
                        }).
                        attr('y',function(d,index){
                            return d.maxPoint.y-d.placementOffset.y;
                        }).
                       attr('transform',function(){
                           return 'translate('+width/2+','+height/2+')';
                       }).
                        attr('meta',function(d){
                            return JSON.stringify(d);
                        });
                        
                                var color='#f4'+Math.ceil((201)-4.7*(+scope.text)).toString(16)+Math.ceil((89)-3*(+scope.text)).toString(16);
        var color1='#d4'+Math.ceil((201)-4.7*(+scope.text)).toString(16)+Math.ceil((89)-3*(+scope.text)).toString(16);
                      var pulse=svg.append('g').
                            attr('width','55').
                            attr('height','70');
                            
                       pulse.append('path').
                       attr('d',"M55,27.5C55,42.688,27.5,70,27.5,70S0,42.688,0,27.5S12.312,0,27.5,0S55,12.312,55,27.5z").
                        attr('class','back').
                        style('fill',color);
                      pulse.append('path').
                       attr('d',"M27.5,2C41.561,2,53,13.439,53,27.5c0,5.751-4.598,14.63-13.297,25.677\
		c-4.899,6.221-9.851,11.52-12.203,13.963c-2.352-2.443-7.305-7.742-12.203-13.963C6.598,42.13,2,33.251,2,27.5\
		C2,13.439,13.439,2,27.5,2 M27.5,0C12.312,0,0,12.312,0,27.5S27.5,70,27.5,70S55,42.688,55,27.5S42.688,0,27.5,0L27.5,0z").
                        attr('class','border').
                        style('fill',color1);
                
               pulse.append('path').
                       attr('d',"M52.993,27.5c0,14.08-50.986,14.08-50.986,0S13.42,2.007,27.5,2.007\
                                S52.993,13.42,52.993,27.5z").
                        attr('class','border').
                        style('fill','#ffffff').
                        style('opacity',0.15);
                        
              pulse.append('text').
                      text(scope.text).
                      attr('style','font-size:25px;font-style:normal;font-weight:bold;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:Sans').
                      attr('x',12).
                      attr('y',38);
              
              pulse.attr('transform','translate('+((width-55)/2)+','+((height-70)/2)+')')
                      
                        
                
                        
        /*$(svg).append('<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\
	 viewBox="0 0 55 70" >\
<g>\
	<path fill="'+color+'" d="M55,27.5C55,42.688,27.5,70,27.5,70S0,42.688,0,27.5S12.312,0,27.5,0S55,12.312,55,27.5z" class="back"/>\
	<path fill="'+color1+'" d="M27.5,2C41.561,2,53,13.439,53,27.5c0,5.751-4.598,14.63-13.297,25.677\
		c-4.899,6.221-9.851,11.52-12.203,13.963c-2.352-2.443-7.305-7.742-12.203-13.963C6.598,42.13,2,33.251,2,27.5\
		C2,13.439,13.439,2,27.5,2 M27.5,0C12.312,0,0,12.312,0,27.5S27.5,70,27.5,70S55,42.688,55,27.5S42.688,0,27.5,0L27.5,0z" class="border"/>\
<path opacity="0.15" fill="#FFFFFF" d="M52.993,27.5c0,14.08-50.986,14.08-50.986,0S13.42,2.007,27.5,2.007\
	S52.993,13.42,52.993,27.5z"/>\
                <text\
       style="font-size:50px;font-style:normal;font-weight:bold;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:Sans"\
       x="32.433043"\
       y="20.450891"\
       id="text5155"\
       sodipodi:linespacing="125%"><tspan\
         x="13"\
         y="38"\
         style="font-size:24px">'+scope.text+'</tspan></text>\
</g>\</svg>');*/
                        
                        
           }
               
            svg.append('line')
                    .attr('x1',width/2)
                    .attr('y1',0)
                    .attr('x2',width/2)
                    .attr('y2',height)
                    .attr('style','stroke-width: 1px;stroke: #000000;');
            svg.append('line')
                    .attr('x1',0)
                    .attr('y1',height/2)
                    .attr('x2',width)
                    .attr('y2',height/2)
                    .attr('style','stroke-width: 1px;stroke: #000000;');

            

            var rings=[];
            for(var i=0;i<+scope.levels;i++){
                rings.push((i+1)*radius_increments);
            }
            
            svg.selectAll('.level_ring')
                    .data(rings)
                    .enter()
                    .append('circle')
                    .style('stroke','#cccccc')
                    .style('stroke-width','1px')
                    .style('fill','transparent')
                    .attr('r',function(d){
                        return d;
                    })
                    .attr("transform", "translate(" +width / 2 + "," + height / 2 + ")");
            
            Draw(bars);
    
        }
    }
  }]).
  directive('spiderRose', ['$compile', function($compile) {
    return {
        templateUrl:'partials/directives/sunchart.html',
        restrict:'C',
        scope:{
            data:'=data',
            levels:'@levels',
            innerRadius:'@innerRadius',
            text:'@text'
        },
        controller:function($scope){
            
        },
        link:function(scope,elem,attrs){
            scope.collapsed=false;
            var colors=['#ff0000','#00ff00','#0000ff','#ffff00','#ff00ff','#00ff00','#00ffff'];

            var width=elem.width();
            var height=elem.height();
            
           
            var radius=Math.floor(Math.min(width,height)/2);
            var thicknes=radius-20;
            var radius_increments=Math.floor(thicknes/(+scope.levels));
            
            $(elem).children('#loading_msg').remove();
            
            var node=$(elem).children('#floating_graph');
            var rad2degress=function(rads){
                return (180*rads/Math.PI);
            }
            
            var deg2rad=function(deg){
                return (Math.PI*deg/180);
            }
            
            node.width(width);
            node.height(height);
            node.css('margin-top',(+scope.height/-2));
            scope.maxValue= +attrs.maxValue;


            var svg = d3.select(node[0]).append("svg")
            .attr("width", width)
            .attr("height", height);
           
           var quadrants=[
               {
                   name:"cuadrant1",
                   values:[
                       {
                           name:"system1",
                           value:5
                       },
                       {
                           name:"system3",
                           value:3
                       },
                       {
                           name:"system2",
                           value:6
                       }

                   ]
               },
               {
                   name:"cuadrant2",
                   values:[
                       {
                           name:"system1",
                           value:5
                       },
                       {
                           name:"system2",
                           value:6
                       }
                   ]
               },
               {
                   name:"cuadrant3",
                   values:[
                       {
                           name:"system1",
                           value:5
                       },
                       {
                           name:"system2",
                           value:6
                       }
                   ]
               },
               {
                   name:"cuadrant4",
                   values:[
                       {
                           name:"system1",
                           value:7
                       },
                       {
                           name:"system2",
                           value:8
                       }
                   ]
               }
           ];
           
            function getX(value,angle,r){
                return Math.cos(angle)*(value*r);
            }            
            
            function getY(value,angle,r){
                return Math.sin(angle)*(value*r);
            }
            
           
           var maxValue=10;
           var bars=[];
           for(var i=0;i<quadrants.length;i++){
               var q=quadrants[i];
               q.base_angle=((Math.PI/2)/(q.values.length+1));
               q.rotate_angle=0;
               q.starts_at=(i-1)*90;
               q.color=colors[i];
               q.points=['0,0'];
               q.points.push(getX(0.5,(deg2rad(q.starts_at)-Math.PI/2),thicknes)+','+getY(0.5,(deg2rad(q.starts_at)-Math.PI/2),thicknes));
               for(var j=0;j<q.values.length;j++){
                   var v=q.values[j];
                   v.label=v.name.replace('_and_',' & ')+'=='+v.value;
                   v.quadrant=i;
                   v.start_angle=deg2rad(q.starts_at);
                   v.angle_width=rad2degress(q.base_angle);
                   v.order=j;
                   v.rotate_angle=v.start_angle+(j+1)*q.base_angle;
                   v.rotate_angle_deg=rad2degress(v.rotate_angle);
                   v.perc=(v.value/maxValue);
                   v.marker_line_angle_rad=v.rotate_angle;
                   v.label_angle=v.marker_line_angle_rad-Math.PI/2;
                   v.maxPoint={
                     x:(getX(1,v.label_angle,thicknes)-(Math.cos(v.label_angle)<0?70:-10)),
                     y:getY(1.1,v.label_angle,thicknes)
                  }
                  
                  v.valuePoint={
                     x:getX(v.perc,v.label_angle,thicknes),
                     y:getY(v.perc,v.label_angle,thicknes)
                  }
                  q.points.push(v.valuePoint.x+','+v.valuePoint.y)
                  var sin=Math.sin(v.marker_line_angle_rad);
                  var cos=Math.cos(v.marker_line_angle_rad);
                  var coSign=cos/Math.abs(cos);
                  var sinSign=sin/Math.abs(sin);
                  v.placementOffset={
                       x:sinSign*80*Math.pow(1-Math.abs(sin),3),
                       y:coSign*4*Math.pow(Math.abs(cos),3)
                  }
                   bars.push(v);
               }
              q.points.push(getX(0.5,(deg2rad(q.starts_at)),thicknes)+','+getY(0.5,(deg2rad(q.starts_at)),thicknes));
               
           }
           

            
            function Draw(data,quadrant){
                var polig=svg.selectAll('.plygroups').
                        data(quadrant).
                        enter().
                        append('polygon').
                        attr('class','plygroups').
                        attr('points',function(d,index){
                                return d.points.join(' ');
                        }).
                        attr('transform',function(d,index){
                            var trans='translate('+width/2+','+height/2+') rotate('+d.rotate_angle+')';
                            return trans;
                        }).
                        attr('datum',function(d){
                            return JSON.stringify(d);
                        }).
                        style('fill',function(d,index){return d.color}).
                        style('fill-opacity','0.5').
                        style('stroke','#000000')
                        ;
               
                    var lines=svg.selectAll('.guide-lines').
                        data(data).
                        enter().
                        append('line').
                        attr('class','guide-lines').
                        style('stroke','#cdcdcd').
                        attr('x1',0).
                        attr('y1',0).
                        attr('x2',0).
                        attr('y2',((radius-20)*-1)).
                        attr('transform',function(d,index){
                            var translate='translate('+width/2+','+height/2+')';
                            var rotate=' rotate('+d.rotate_angle_deg+',0,0)';
                            return translate+rotate;
                        });
               
                    var points=svg.selectAll('.value-point').
                        data(data).
                        enter().
                        append('circle').
                        attr('class','value-point').
                        style('stroke','#cdcdcd').
                        attr('r',2).
                        attr('cx',function(d,index){
                            return d.valuePoint.x;
                        }).
                        attr('cy',function(d,index){
                            return d.valuePoint.y;
                        }).
                       attr('transform',function(){
                           return 'translate('+width/2+','+height/2+')';
                       });
                    
                    
                  var labels=svg.selectAll('.contrib-name').
                        data(data).
                        enter().
                        append('text').
                        attr('class','contrib-name').
                        style('font-size','10px').
                        html(function(d){
                            var text=d.label.split(' ');
                            var idx=text.indexOf('&');
                            if(text.length>1){
                                if(idx===0){
                                    text[1]='& '+text[1];
                                    text.shift();
                                }
                                else if(idx===(text.length-1)){
                                    text[idx-1]+=' &';
                                    text.pop();
                                }
                                else if(idx>0){
                                    if(text[idx-1].length<text[idx+1].length){
                                        text[idx-1]+= ' &';
                                    }
                                    else{
                                        text[idx-1]=text[idx-1]+' &';
                                    }
                                    text.splice(idx,1);
                                }
                            }
                            var label=text[0]||'';
                            
                            for(var i=1;i<text.length;i++){
                                label+='<tspan y="'+((+d.maxPoint.y-d.placementOffset.y)+i*10)+'" x="'+(d.maxPoint.x-d.placementOffset.x)+'">'+text[i]+'</tspan>';
                            }
                            return label;
                        }).
                        attr('x',function(d,index){
                            return d.maxPoint.x-d.placementOffset.x;
                        }).
                        attr('y',function(d,index){
                            return d.maxPoint.y-d.placementOffset.y;
                        }).
                       attr('transform',function(){
                           return 'translate('+width/2+','+height/2+')';
                       }).
                        attr('meta',function(d){
                            return JSON.stringify(d);
                        });
                        
                                var color='#f4'+Math.ceil((201)-4.7*(+scope.text)).toString(16)+Math.ceil((89)-3*(+scope.text)).toString(16);
        var color1='#d4'+Math.ceil((201)-4.7*(+scope.text)).toString(16)+Math.ceil((89)-3*(+scope.text)).toString(16);
                      var pulse=svg.append('g').
                            attr('width','55').
                            attr('height','70');
                            
                       pulse.append('path').
                       attr('d',"M55,27.5C55,42.688,27.5,70,27.5,70S0,42.688,0,27.5S12.312,0,27.5,0S55,12.312,55,27.5z").
                        attr('class','back').
                        style('fill',color);
                      pulse.append('path').
                       attr('d',"M27.5,2C41.561,2,53,13.439,53,27.5c0,5.751-4.598,14.63-13.297,25.677\
		c-4.899,6.221-9.851,11.52-12.203,13.963c-2.352-2.443-7.305-7.742-12.203-13.963C6.598,42.13,2,33.251,2,27.5\
		C2,13.439,13.439,2,27.5,2 M27.5,0C12.312,0,0,12.312,0,27.5S27.5,70,27.5,70S55,42.688,55,27.5S42.688,0,27.5,0L27.5,0z").
                        attr('class','border').
                        style('fill',color1);
                
               pulse.append('path').
                       attr('d',"M52.993,27.5c0,14.08-50.986,14.08-50.986,0S13.42,2.007,27.5,2.007\
                                S52.993,13.42,52.993,27.5z").
                        attr('class','border').
                        style('fill','#ffffff').
                        style('opacity',0.15);
                        
              pulse.append('text').
                      text(scope.text).
                      attr('style','font-size:25px;font-style:normal;font-weight:bold;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:Sans').
                      attr('x',12).
                      attr('y',38);
              
              pulse.attr('transform','translate('+((width-55)/2)+','+((height-70)/2)+')')
                      
                        
                
                        
        /*$(svg).append('<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\
	 viewBox="0 0 55 70" >\
<g>\
	<path fill="'+color+'" d="M55,27.5C55,42.688,27.5,70,27.5,70S0,42.688,0,27.5S12.312,0,27.5,0S55,12.312,55,27.5z" class="back"/>\
	<path fill="'+color1+'" d="M27.5,2C41.561,2,53,13.439,53,27.5c0,5.751-4.598,14.63-13.297,25.677\
		c-4.899,6.221-9.851,11.52-12.203,13.963c-2.352-2.443-7.305-7.742-12.203-13.963C6.598,42.13,2,33.251,2,27.5\
		C2,13.439,13.439,2,27.5,2 M27.5,0C12.312,0,0,12.312,0,27.5S27.5,70,27.5,70S55,42.688,55,27.5S42.688,0,27.5,0L27.5,0z" class="border"/>\
<path opacity="0.15" fill="#FFFFFF" d="M52.993,27.5c0,14.08-50.986,14.08-50.986,0S13.42,2.007,27.5,2.007\
	S52.993,13.42,52.993,27.5z"/>\
                <text\
       style="font-size:50px;font-style:normal;font-weight:bold;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:Sans"\
       x="32.433043"\
       y="20.450891"\
       id="text5155"\
       sodipodi:linespacing="125%"><tspan\
         x="13"\
         y="38"\
         style="font-size:24px">'+scope.text+'</tspan></text>\
</g>\</svg>');*/
                        
                        
           }
               
            svg.append('line')
                    .attr('x1',width/2)
                    .attr('y1',0)
                    .attr('x2',width/2)
                    .attr('y2',height)
                    .attr('style','stroke-width: 1px;stroke: #000000;');
            svg.append('line')
                    .attr('x1',0)
                    .attr('y1',height/2)
                    .attr('x2',width)
                    .attr('y2',height/2)
                    .attr('style','stroke-width: 1px;stroke: #000000;');

            

            var rings=[];
            for(var i=0;i<+scope.levels;i++){
                rings.push((i+1)*radius_increments);
            }
            
            svg.selectAll('.level_ring')
                    .data(rings)
                    .enter()
                    .append('circle')
                    .style('stroke','#cccccc')
                    .style('stroke-width','1px')
                    .style('fill','transparent')
                    .attr('r',function(d){
                        return d;
                    })
                    .attr("transform", "translate(" +width / 2 + "," + height / 2 + ")");
            
            Draw(bars,quadrants);
    
        }
    }
  }]).
  directive('bubblechart', ['$compile', function($compile) {
    return {
        templateUrl:'partials/directives/bubblechart.html',
        restrict:'C',
        scope:{
            data:'=data',
            width:'@width',
            height:'@height',
            barWidth:'@barWidth',
            radius:'@radius',
            text:'@text'
        },
        controller:function($scope){

        },
        link:function(scope,elem,attrs){
            scope.collapsed=false;
            var barWidth=(+scope.barWidth)||10;
            scope.ToggleView=function(){
                scope.collapsed=!scope.collapsed;
                $(elem).toggleClass('collapsed');
                var animateto={width:(scope.width+'px'),height:(scope.height+'px')};
                if(scope.collapsed){
                    var animateto={width:(scope.radius+'px'),height:((scope.radius*1.5)+'px')};
                }
                $(elem).animate(animateto,500,function(){
                    //alert('done');
                });
                scope.$emit('expanded',!scope.collapsed);
                
            }
             
            
            elem.width(scope.width);
            elem.height(scope.height);
            
            
            $(elem).children('#loading_msg').css("left",((+scope.radius)+15)+'px');
            var node=$(elem).children('#floating_graph');
            var data={children:[]};
            
            
            node.width(scope.width);
            node.height(scope.height);
            node.css({'margin-top':((+scope.height/-2)+'px'),'margin-left':((+scope.width/-2)+'px'),left:'50%'});
            scope.maxValue= +attrs.maxValue;
            var h=(+scope.height);
            


            scope.$watch(function(){return JSON.stringify(scope.data)},function(){
                var ldata=scope.data;
                $(elem).find('circle').remove();
                if(!ldata || !ldata.length){
                    return;
                };
                ldata=ldata.sort(function(b,a){
                    return ((a.value-b.value)/Math.abs(a.value-b.value));
                })
                scope.maxValue=ldata[0].value;
                $('#loading_msg').hide('slow');
                for(var i=0;i<ldata.length;i++){
                    
                    data.children.push({key:ldata[i].key,value:ldata[i].value,type:'contrib'});
                }
                draw(node);
                $compile(angular.element($(elem).find('circle')))(scope);
            })
            

            function draw(node){
                $(elem).find('svg').remove();
               var bubble = d3.layout.pack()
                .sort(null)
                .size([scope.width, scope.height])
                .padding(1.5);
            
            
                var svg = d3.select(node[0]).append("svg")
                .attr("width", scope.width)
                .attr("height", h);

            
                var node = svg.selectAll(".node")
                .data(bubble.nodes(classes(data))
                .filter(function(d) { return !d.children; }))
                .enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

                  /*  node.append("title")
                    .text(function(d) { return d.className + ": " + format(d.value); });*/

                node.append("circle")
                .attr("r", function(d) { return d.r; })
                .style("fill", function(d) { return d.packageName=='pulse'?'#ff0000':'#00ff00'; })
                .attr('ng-click',function(d){
                    return d.packageName=='pulse'?'ToggleView()':'';
                });

                node.append("text")
                .attr("dy", ".3em")
                .style("text-anchor", "middle")
                .text(function(d) { return d.className.substring(0, d.r / 3); });
            }
            

            function classes(root) {
                var classes = [];

                function recurse(name, node) {
                    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
                    else classes.push({packageName: node.type, className: node.key, value: node.value});
                }

                recurse(null, root);
                  
                return {children: classes};
              
            }

            draw(node);
            $compile(angular.element($(elem).find('circle')))(scope);
            
        }
    }
  }]).
  directive('windRoseV2', ['$compile', function($compile) {
    return {
        templateUrl:'partials/directives/sunchart.html',
        restrict:'A',
        scope:{
            data:'=data',
            levels:'@levels',
            innerRadius:'@innerRadius',
            text:'@text',
            details:'=',
            time:'@',
            delay:'@',
            offset:'@'
        },
        controller:function($scope){
            
        },
        link:function(scope,elem,attrs){
            scope.collapsed=false;
            var colors=['#ff0000','#00ff00','#0000ff','#ffff00','#ff00ff','#00ff00','#00ffff'];

            var width=elem.width();
            var height=elem.height();
            
           
            var radius=Math.floor(Math.min(width,height)/2);
            var thicknes=radius-(20);
            var radius_increments=Math.floor(thicknes/(+scope.levels));
            
            $(elem).children('#loading_msg').remove();
            
            var node=$(elem).children('#floating_graph');
            var rad2degress=function(rads){
                return (180*rads/Math.PI);
            }
            
            var deg2rad=function(deg){
                return (Math.PI*deg/180);
            }
            
            node.width(width);
            node.height(height);
            node.css('margin-top',(+scope.height/-2));
            scope.maxValue= +attrs.maxValue;


            var svg = d3.select(node[0]).append("svg")
            .attr("width", width)
            .attr("height", height);
           
           var quadrants=[
               {
                   name:"cuadrant1",
                   values:[
                       {
                           name:"q1_s1",
                           value:0.5
                       },
                       
                       {
                           name:"q1_s3",
                           value:6
                       },
                       {
                           name:"q1_s3",
                           value:6
                       },
                       {
                           name:"q1_s2",
                           value:10
                       },
                       {
                           name:"q1_s3",
                           value:6
                       }

                   ]
               },
               {
                   name:"cuadrant2",
                   values:[
                       {
                           name:"q2_s1",
                           value:5
                       },
                       {
                           name:"q2_s2",
                           value:6
                       }
                   ]
               },
               {
                   name:"cuadrant3",
                   values:[
                       {
                           name:"q3_s1",
                           value:5
                       },
                       {
                           name:"q3_s2",
                           value:6
                       },
                       {
                           name:"q3_s2",
                           value:8
                       }
                   ]
               },
               {
                   name:"cuadrant4",
                   values:[
                       {
                           name:"q4_s1",
                           value:5
                       },
                       {
                           name:"q4_s2",
                           value:6
                       },
                       {
                           name:"q4_s1",
                           value:8
                       },
                       {
                           name:"q4_s2",
                           value:4
                       }
                   ]
               }
           ];
           
            function getX(value,angle,r,o){
                return Math.cos(angle)*(value*(r+o));
            }            
            
            function getY(value,angle,r,o){
                return Math.sin(angle)*(value*(r+o));
            }
            
            function transformData(data){
                thicknes=radius-(20+(+(scope.offset||0)));
                radius_increments=Math.floor(thicknes/(+scope.levels));
                var lData=data.slice();
                var details=[];
                for(var i=0;i<lData.length;i++){
               var q=lData[i];
               q.order=i;
               q.quadrant=i;
               q.color=colors[i];
               q.total=0;
               q.angles={
                   rad:{
                       base:((Math.PI/2)/q.values.length),
                       half:(((Math.PI/2)/q.values.length))/2,
                       start:(i-1)*Math.PI/2,
                       ends:(i)*Math.PI/2
                   }
               }
               
               q.angles.deg={
                   base:rad2degress(q.angles.rad.base),
                   half:rad2degress(q.angles.rad.half),
                   start:rad2degress(q.angles.rad.starts),
                   ends:rad2degress(q.angles.rad.ends)
               };
               
               for(var j=0;j<q.values.length;j++){
                   var v=q.values[j];
                   v.radius=v.value*thicknes/maxValue+(+(scope.offset||0));
                   q.total+=+v.value;
                   
                   v.offset=Math.atan(q.half_base_angle)*v.base;
                   

                   v.label=v.name.replace('_and_',' & ')+'=='+v.value;
                   v.quadrant=i;
                   v.angles={
                       rad:{
                           start:q.angles.rad.start+(j*q.angles.rad.base),
                           ends:q.angles.rad.start+((j+1)*q.angles.rad.base),
                           half:q.angles.rad.start+(j*q.angles.rad.base)+q.angles.rad.half
                       }
                   }
                   
                   v.angles.deg={
                           start:rad2degress(v.angles.rad.start),
                           ends:rad2degress(v.angles.rad.ends),
                           half:rad2degress(v.angles.rad.half)
                       }
                     
                   
                   
                  v.order=j;
                  
                   v.color=colors[i];

                   v.maxPoint={
                     x:(getX(1,v.angles.rad.half-Math.PI/2,thicknes,(+(scope.offset||0)))-(Math.cos(v.angles.rad.half-Math.PI/2)<0?70:-10)),
                     y:getY(1.1,v.angles.rad.half-Math.PI/2,thicknes,(+(scope.offset||0)))
                  }
                  var sin=Math.sin(v.angles.rad.half);
                  var cos=Math.cos(v.angles.rad.half);
                  var coSign=cos/Math.abs(cos);
                  var sinSign=sin/Math.abs(sin);
                  v.placementOffset={
                       x:sinSign*80*Math.pow(1-Math.abs(sin),3),
                       y:coSign*4*Math.pow(Math.abs(cos),3)
                  }
                  v.arc=d3.svg.arc().outerRadius(v.radius).
                      innerRadius(0).
                      startAngle(v.angles.rad.start);
                      
                          
                 details.push(v);
               }
               q.value=q.total/q.values.length;
               q.radius=q.value*thicknes/maxValue+(+(scope.offset||0));
               q.arc=d3.svg.arc().outerRadius(v.radius).
                      innerRadius(0).
                      startAngle(q.angles.rad.start);
           }
           return {q:lData,v:details};
           
            }
           
           var maxValue=10;
           
           

            
            function Draw(data){
                svg.selectAll('.contrib-name').remove();
                svg.selectAll('.guide-lines').remove();
                svg.selectAll('.arcPetal').remove();
                svg.selectAll('.pulse').remove();
                
                    if(data || data.length){
                        if(data[0].label){
                            var labels=svg.selectAll('.contrib-name').
                                data(data).
                                enter().
                                append('text').
                                attr('class','contrib-name').
                                style('font-size','10px').
                                html(function(d){
                                    var text=d.label.split(' ');
                                    var idx=text.indexOf('&');
                                    if(text.length>1){
                                        if(idx===0){
                                            text[1]='& '+text[1];
                                            text.shift();
                                        }
                                        else if(idx===(text.length-1)){
                                            text[idx-1]+=' &';
                                            text.pop();
                                        }
                                        else if(idx>0){
                                            if(text[idx-1].length<text[idx+1].length){
                                                text[idx-1]+= ' &';
                                            }
                                            else{
                                                text[idx-1]=text[idx-1]+' &';
                                            }
                                            text.splice(idx,1);
                                        }
                                    }
                                    var label=text[0]||'';
                            
                                    for(var i=1;i<text.length;i++){
                                        label+='<tspan y="'+((+d.maxPoint.y-d.placementOffset.y)+i*10)+'" x="'+(d.maxPoint.x-d.placementOffset.x)+'">'+text[i]+'</tspan>';
                                    }
                                    return label;
                                }).
                                attr('x',function(d,index){
                                    return d.maxPoint.x-d.placementOffset.x;
                                }).
                                attr('y',function(d,index){
                                    return d.maxPoint.y-d.placementOffset.y;
                                }).
                                attr('transform',function(){
                                    return 'translate('+width/2+','+height/2+')';
                                }).
                                attr('meta',function(d){
                                    return JSON.stringify(d);
                                });
                                
                            var lines=svg.selectAll('.guide-lines').
                                data(data).
                                enter().
                                append('line').
                                attr('class','guide-lines').
                                style('stroke','#e6e6e6').
                                attr('x1',0).
                                attr('y1',0).
                                attr('x2',0).
                                attr('y2',((radius-20)*-1)).
                                attr('transform',function(d,index){
                                    var translate='translate('+width/2+','+height/2+')';
                                    var rotate=' rotate('+d.angles.deg.half+',0,0)';
                                    return translate+rotate;
                                });
                        }
                        
                
                        var arcs=svg.selectAll('.arcPetal').
                            data(data).
                            enter().
                            append('path').
                            attr('class','arcPetal').
                           /* attr('d',function(d,index){
                                return d.arc();
                        }).*/
                            attr('transform',function(d,index){
                            var trans='translate('+width/2+','+height/2+')';
                            return trans;
                        }).
                            attr('datum',function(d){
                            return JSON.stringify(d);
                        }).
                            style('fill',function(d,index){return d.color}).
                            style('fill-opacity','0.5').
                            style('stroke','#000000')
                            ;
               
                            arcs.transition().duration(+scope.time).delay(function(d,i){
                    return scope.delay*i;
                })
                            .attrTween("d", function(d) {
                        this._current = this._current || d.angles.rad.start; 
                        var arc=d.arc;
                        var interpolate=d3.interpolate(this._current,d.angles.rad.ends);
                        this._current=interpolate(0);
			return function(t) {
				return arc({endAngle:interpolate(t)});
			};
		});
                    }               

               
                    

                        
                                var color='#f4'+Math.ceil((201)-4.7*(+scope.text)).toString(16)+Math.ceil((89)-3*(+scope.text)).toString(16);
        var color1='#d4'+Math.ceil((201)-4.7*(+scope.text)).toString(16)+Math.ceil((89)-3*(+scope.text)).toString(16);
                      var pulse=svg.append('g').
                            attr('class','pulse').
                            attr('width','55').
                            attr('height','70');
                            
                       pulse.append('path').
                       attr('d',"M55,27.5C55,42.688,27.5,70,27.5,70S0,42.688,0,27.5S12.312,0,27.5,0S55,12.312,55,27.5z").
                        attr('class','back').
                        style('fill',color);
                      pulse.append('path').
                       attr('d',"M27.5,2C41.561,2,53,13.439,53,27.5c0,5.751-4.598,14.63-13.297,25.677\
		c-4.899,6.221-9.851,11.52-12.203,13.963c-2.352-2.443-7.305-7.742-12.203-13.963C6.598,42.13,2,33.251,2,27.5\
		C2,13.439,13.439,2,27.5,2 M27.5,0C12.312,0,0,12.312,0,27.5S27.5,70,27.5,70S55,42.688,55,27.5S42.688,0,27.5,0L27.5,0z").
                        attr('class','border').
                        style('fill',color1);
                
               pulse.append('path').
                       attr('d',"M52.993,27.5c0,14.08-50.986,14.08-50.986,0S13.42,2.007,27.5,2.007\
                                S52.993,13.42,52.993,27.5z").
                        attr('class','border').
                        style('fill','#ffffff').
                        style('opacity',0.15);
                        
              pulse.append('text').
                      text(scope.text).
                      attr('style','font-size:25px;font-style:normal;font-weight:bold;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:Sans').
                      attr('x',12).
                      attr('y',38);
              
              pulse.attr('transform','translate('+((width-(55*0.6))/2)+','+((height-(70*0.6))/2)+') scale('+(0.6)+''+(0.6)+')')
                      
                        
                
                        
        /*$(svg).append('<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\
	 viewBox="0 0 55 70" >\
<g>\
	<path fill="'+color+'" d="M55,27.5C55,42.688,27.5,70,27.5,70S0,42.688,0,27.5S12.312,0,27.5,0S55,12.312,55,27.5z" class="back"/>\
	<path fill="'+color1+'" d="M27.5,2C41.561,2,53,13.439,53,27.5c0,5.751-4.598,14.63-13.297,25.677\
		c-4.899,6.221-9.851,11.52-12.203,13.963c-2.352-2.443-7.305-7.742-12.203-13.963C6.598,42.13,2,33.251,2,27.5\
		C2,13.439,13.439,2,27.5,2 M27.5,0C12.312,0,0,12.312,0,27.5S27.5,70,27.5,70S55,42.688,55,27.5S42.688,0,27.5,0L27.5,0z" class="border"/>\
<path opacity="0.15" fill="#FFFFFF" d="M52.993,27.5c0,14.08-50.986,14.08-50.986,0S13.42,2.007,27.5,2.007\
	S52.993,13.42,52.993,27.5z"/>\
                <text\
       style="font-size:50px;font-style:normal;font-weight:bold;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;font-family:Sans"\
       x="32.433043"\
       y="20.450891"\
       id="text5155"\
       sodipodi:linespacing="125%"><tspan\
         x="13"\
         y="38"\
         style="font-size:24px">'+scope.text+'</tspan></text>\
</g>\</svg>');*/
                        
                        
           }
              
                       var rings=[];
            for(var i=0;i<+scope.levels;i++){
                rings.push((i+1)*radius_increments);
            }
            
            svg.selectAll('.level_ring')
                    .data(rings)
                    .enter()
                    .append('circle')
                    .style('stroke','#cccccc')
                    .style('stroke-width','1px')
                    .style('fill','#efefef')
                    .attr('r',function(d){
                        return d;
                    })
                    .attr("transform", "translate(" +width / 2 + "," + height / 2 + ")");
            
            svg.append('line')
                    .attr('x1',width/2)
                    .attr('y1',0)
                    .attr('x2',width/2)
                    .attr('y2',height)
                    .attr('style','stroke-width: 1px;stroke: #000000;');
            svg.append('line')
                    .attr('x1',0)
                    .attr('y1',height/2)
                    .attr('x2',width)
                    .attr('y2',height/2)
                    .attr('style','stroke-width: 1px;stroke: #000000;');

            
                    scope.$watch('details',function(v){
                        Data=transformData(quadrants);
                        if(v){
                            Draw(Data.v);
                        }
                        else{
                            Draw(Data.q);
                        }
                    })

                    scope.$watch('offset',function(v){
                        Data=transformData(quadrants);
                        if(scope.details){
                            Draw(Data.v);
                        }
                        else{
                            Draw(Data.q);
                        }
                    })

            var Data=transformData(quadrants);
            Draw(Data.q);
    
        }
    }
  }]);

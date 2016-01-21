/*
 Pi2D2 A Dynon D2 knock off to run on the Rasberry Pi 2
 David Ross
 yada yada
 blah blah

*/

var Pi2D2 =  {
   
   configs: {
      // things I expect the user will want to change
      vspeeds: { Vso: 55, Vsi: 45, Vfe: 100, Vno: 140, Vne: 160 },
      gmeter: { maxload: 4},
      vsi: { maxrate: 1000},
      alarms: {
         pitch: { max: 10, min: -10 },
         roll: { max: 15, min: -15 },  
         speed: { max: 140, min: 60 },
         gload: { max: 4, min: -2 },
         vsi: { max: 400, min: -400 },
         compass: 15,
         altitude: 50
      }
   },

   settings: {
    // things I expect a programer will want to change for a different sreen size
      screen: {x: 480, y:320},
      compass: {x: 240, y: 855, r: 590, opacity: .3 },
      altitude: { x: 385, y: 55 },
      speed: { x: 80, y: 55},
      smallFont: { fill: '#ffffff', stroke: 'none', 'font-size': '18', 'text-anchor': 'middle' },
      largeFont: { fill: '#ffffff', stroke: 'none', 'font-size': '45', 'text-anchor': 'middle' },
      cardinalFont: { fill: '#ffffff', stroke: 'none', 'font-size': '40', 'text-anchor': 'middle' },
      compassFont: { fill: '#ffffff', stroke: 'none', 'font-size': '30', 'text-anchor': 'middle' },
      gmeter: { maxrate: 4, x: 50, y: 160, degrees: 120 },
      vertspeed: {x: 430, y: 160 },
      altitudeBug: { maxrange: 50 }
   },
    
   values: {
    // Current values of each widget
      pitch: 0,
      roll: 0,
      speed: 0,
      cdi: 0,
      glideslope: 0,
      altitude: 0,
      altimeter: 29.92,
      heading: 0,
      headingBug: 0,
      altitudeBug: 0,
      gload: {load: 1, maxpos: 1, maxneg: 1},
      vertspeed: {rate: 0}
   },
    
   inop: {
//      cdi: {}, //todo
 //     glideslope: {}, //todo
      gmeter: {},
      vertspeed: {},
      compass: {},
      speed: {},
      pitch: {},
      roll: {},
      atittude: {}    
   },
    
   alarm: {
      gmeter: {},
      vertspeed: {},
      compass: {},
      speed: {},
      pitch: {},
      roll: {},
      atittude: {}    
   },


   init: function() {
      s = this.settings;
      v = this.values;
      c = this.configs;
      svg = Snap('#Pi2D2_SVG');
      this.pitch = this.pitch();
      this.roll = this.roll();
      this.compass = this.compass();
      this.headingBug = this.headingBug();
      this.speed = this.speed();
//      this.altitudeBug = this.altitudeBug();
      this.altitude = this.altitude();
      this.altimeter = this.altimeter();
      this.gmeter = this.gmeter();
      this.vertspeed = this.vertspeed();    
      this.cdi = this.cdi();
      this.glideslope = this.glideslope();
    /*  
      this.alarm.pitch = svg.group(
            svg.rect((x/2)-75, 50, 150, 50).attr( {fill: 'red', opacity: .9 }),
            svg.text((x/2), 90, "PITCH").attr( s.cardinalFont )
            ).attr( { display: 'none'} );

      this.alarm.roll = svg.group(
            svg.rect((x/2)-75, 50, 150, 50).attr( {fill: 'red', opacity: .9 }),
            svg.text((x/2), 90, "ROLL").attr( s.cardinalFont )
            ).attr( { display: 'none'} );

      this.alarm.vertspeed = svg.group(
            svg.rect((x/2)-75, 50, 150, 50).attr( {fill: 'red', opacity: .9 }),
            svg.text((x/2), 90, "VSI").attr( s.cardinalFont )
            ).attr( { display: 'none'} );

      this.alarm.compass = svg.group(
            svg.rect((x/2)-100, 50, 200, 50).attr( {fill: 'red', opacity: .9 }),
            svg.text((x/2), 90, "HEADING").attr( s.cardinalFont )
            ).attr( { display: 'none'} );
    
      this.alarm.gmeter = svg.group(
            svg.rect((x/2)-100, 50, 200, 50).attr( {fill: 'red', opacity: .9 }),
            svg.text((x/2), 90, "G LOAD").attr( s.cardinalFont )
            ).attr( { display: 'none'} );
    
      this.alarm.speed = svg.group(
            svg.rect((x/2)-80, 50, 160, 50).attr( {fill: 'red', opacity: .9 }),
            svg.text((x/2), 90, "SPEED").attr( s.cardinalFont )
            ).attr( { display: 'none'} );

      this.alarm.altitude = svg.group(
            svg.rect((x/2)-110, 50, 220, 50).attr( {fill: 'red', opacity: .9 }),
            svg.text((x/2), 90, "ALTITUDE").attr( s.cardinalFont )
            ).attr( { display: 'none'} );    
   */
   return 1;
   
   },

   
   gmeter: function(){
      x = s.screen.x;
      y = s.screen.y;
      gx = s.gmeter.x;
      gy = s.gmeter.y;

svg.text(gx, gy+7, '0').attr(s.smallFont);

for ( ii=0; ii<5; ii++ ){
  svg.line( gx-20, y/2, gx-10, y/2 ).attr( { stroke: '#ffffff', 'stroke-width': 2 }).animate({ transform: 'r' +(ii*5) +',' +(-250)+',' +(y/2) }, 100);
  svg.line( gx-20, y/2, gx-10, y/2 ).attr( { stroke: '#ffffff', 'stroke-width': 2 }).animate({ transform: 'r-' +(ii*5) +',' +(-250)+',' +(y/2) }, 100);
  svg.text(gx, gy+7, ii).attr(s.smallFont).animate({transform: 'r' +(ii*5)+',' +(-250)+',' +(y/2) }, 100);
  svg.text(gx, gy+7, ii).attr(s.smallFont).animate({transform: 'r-' +(ii*5)+',' +(-250)+',' +(y/2) }, 100);      
}
        
Gload = svg.line( gx-10, y/2, -250, y/2 ).attr( {stroke:'#ffffff', 'stroke-width': '5'});
GloadMaxPos = svg.line( gx-10, y/2, -250, y/2 ).attr( {stroke:'#ffffff', 'stroke-width': '2'});
GloadMaxNeg = svg.line( gx-10, y/2, -250, y/2 ).attr( {stroke:'#ffffff', 'stroke-width': '2'});

        
//INOP
      this.inop.gmeter = svg.group(
        // TODO Need these to be Arcs now
        // svg.rect(gx-25, (gy-size), gx, (size*2)).attr( {fill: 'red', opacity: .8 }),
         svg.text(gx, gy, "INOP").attr( s.cardinalFont )
      ).attr( {display: 'none'});

      return function( load ) {
         if ( load == null ) { return v.gload; }
         x = s.screen.x;
         y = s.screen.y;
         gx = s.gmeter.x;
         gy = s.gmeter.y;
         step = s.gmeter.degrees / s.gmeter.maxrate;
            
         if (load == 'reset' ) {
            v.gload.load =  1;
            v.gload.maxpos = 1;
            v.gload.maxneg = 1;
            this.GloadMaxPos.animate( { transform: 't0,' +( ( step * 1) *-1)  }, 100 );  
            this.GLoadMaxNeg.animate( { transform: 't0,' +( ( step * 1 ) *-1 )  }, 100 );  
            this.GLoad.animate( { transform: 't0,' +( ( step * 1 ) *-1)  }, 100 );  
            return v.gload;
         }

         if ( load == 'inop') { this.inop.gmeter.attr({display: 'inline'}); }
         else {this.inop.gmeter.attr({display: 'none'}); }

         if ( load > c.alarms.gload.max || load < c.alarms.gload.min  ) { this.alarm.gmeter.attr({display: 'inline'}); }
         else {this.alarm.gmeter.attr({display: 'none'}); }


         this.GLoad.animate( { transform: 't0,' +( ( step * load ) *-1)  }, 100 );              
            if ( v.gload.maxpos < load ){
               v.gload.maxpos = load;
               this.GloadMaxPos.animate( { transform: 't0,' +( ( step * load ) *-1)  }, 100 );  
            }
            if ( v.gload.maxneg > load ){
               v.gload.maxneg = load;
               this.GLoadMaxNeg.animate( { transform: 't0,' +( ( step * load ) *-1 )  }, 100 );  
            }                    
            return (v.gload.load =  load);
         };
   },
   
   
   cdi: function() {
      x = s.screen.x;
      y = s.screen.y;
   
//CDI HERE FOR NOW
 svg.rect( (x/2)-110, (y/2)+75, 220, 20).attr( {fill: 'black', opacity: .4 });

CDINeedle = svg.group(
svg.line(240,230, 240, 260).attr({ 'stroke': '#00ff00', 'stroke-width': 8 }), 
   svg.circle( 240, 245, 5).attr( { fill: '#000'})
);

//CDINeedle.animate({transform: 't45,0'},100);

 svg.circle( (x/2), 245, 10).attr( {'stroke':'#ffffff', 'stroke-width':2, fill: 'none'});

 svg.circle( (x/2)+25,  245, 5).attr( {'stroke':'#ffffff', 'stroke-width':2, fill: 'none'});
 svg.circle( (x/2)+50,  245, 5).attr( {'stroke':'#ffffff', 'stroke-width':2, fill: 'none'});
 svg.circle( (x/2)+75,  245, 5).attr( {'stroke':'#ffffff', 'stroke-width':2, fill: 'none'});
 svg.circle( (x/2)+100, 245, 5).attr( {'stroke':'#ffffff', 'stroke-width':2, fill: 'none'});

 svg.circle( (x/2)-25,  245, 5).attr( {'stroke':'#ffffff', 'stroke-width':2, fill: 'none'});
 svg.circle( (x/2)-50,  245, 5).attr( {'stroke':'#ffffff', 'stroke-width':2, fill: 'none'});
 svg.circle( (x/2)-75,  245, 5).attr( {'stroke':'#ffffff', 'stroke-width':2, fill: 'none'});
 svg.circle( (x/2)-100, 245, 5).attr( {'stroke':'#ffffff', 'stroke-width':2, fill: 'none'});
   

          //TODO MOVE THIS TO CDI
svg.rect( 65, 198, 60, 60).attr({ opacity: .4, fill: 'black' } );
svg.text( 95, 215, '117.95').attr( {fill: '#ffffff', stroke: 'none', 'font-size': '15', 'text-anchor': 'middle' });
svg.text( 95, 235, '039').attr( {fill: '#ffffff', stroke: 'none', 'font-size': '20', 'text-anchor': 'middle' });         
svg.text( 95, 250, 'TO').attr( {fill: '#ffffff', stroke: 'none', 'font-size': '15', 'text-anchor': 'middle' });        
     
svg.rect( 65, 124, 60, 24).attr({ opacity: .4, fill: 'black' } );
svg.text( 95, 143, 'GPS').attr( {fill: '#ffffff', stroke: 'none', 'font-size': '20', 'text-anchor': 'middle' });       

return 1;


     
   },   
   
   
   glideslope: function() {
      x = s.screen.x;
      y = s.screen.y;
   
//ILS HERE FOR NOW
svg.rect( (x-80), (y/2)-95, 20, 190).attr( {fill: 'black', opacity: .4 });

 svg.circle( (x-70), (y/2), 10).attr( {'stroke':'#ffffff', 'stroke-width':2, fill: 'none'});

ILSNeedle = svg.group(
   svg.line(395, (y/2), 425, (y/2)).attr({ 'stroke': '#00ff00', 'stroke-width': 8 }), 
   svg.circle( (x-70), (y/2), 5).attr( { fill: '#000'})

);

//ILSNeedle.animate({transform: 't0,40'},100);


 svg.circle( (x-70), (y/2)+22, 5).attr( {'stroke':'#ffffff', 'stroke-width':2, fill: 'none'});
 svg.circle( (x-70), (y/2)+44, 5).attr( {'stroke':'#ffffff', 'stroke-width':2, fill: 'none'});
 svg.circle( (x-70), (y/2)+66, 5).attr( {'stroke':'#ffffff', 'stroke-width':2, fill: 'none'});
 svg.circle( (x-70), (y/2)+88, 5).attr( {'stroke':'#ffffff', 'stroke-width':2, fill: 'none'});
 
 svg.circle( (x-70), (y/2)-22, 5).attr( {'stroke':'#ffffff', 'stroke-width':2, fill: 'none'});
 svg.circle( (x-70), (y/2)-44, 5).attr( {'stroke':'#ffffff', 'stroke-width':2, fill: 'none'});
 svg.circle( (x-70), (y/2)-66, 5).attr( {'stroke':'#ffffff', 'stroke-width':2, fill: 'none'});
 svg.circle( (x-70), (y/2)-88, 5).attr( {'stroke':'#ffffff', 'stroke-width':2, fill: 'none'});

svg.rect( 335,184, 60, 24).attr({fill: 'black', opacity: .5 } );
svg.text( 365,203, 'VLOC').attr( {fill: '#ffffff', stroke: 'none', 'font-size': '20', 'text-anchor': 'middle' });       

svg.rect( 320, 124, 75, 24).attr({fill: 'black', opacity: .5 } );
svg.text( 358, 143, '15,000').attr( {fill: '#ffffff', stroke: 'none', 'font-size': '20', 'text-anchor': 'middle' });       



//TODO
//1. widget to cgange freq on VOR
//2. Select GPS CDI Guidance. when doig this, GS will become altitude bug

return 1;
   },
   
   
    
   vertspeed: function(){
      x = s.screen.x;
      y = s.screen.y;
      maxrate = c.vsi.maxrate; // if 1000 fpm
      steps = (maxrate/100)+1; // ten steps
      degrees = 20/steps; // 2 degrees per step
      gx = s.vertspeed.x;
      gy = s.vertspeed.y;

   //   svg.circle(x+250, y/2,300); // TODO use this arc for inop
 
 svg.text(gx+20, gy+7, '0').attr(s.smallFont);
  
for ( i=0; i<steps; i++ ){
  if ( i%5 === 0 ) {
    svg.text(gx+22, gy+7, i ).attr(s.smallFont).animate({transform: 'r' +(i*degrees) +',' +(x+250)+',' +(y/2) }, 100);
    svg.text(gx+22, gy+7, i).attr(s.smallFont).animate({transform: 'r-' +(i*degrees) +',' +(x+250)+',' +(y/2) }, 100);
 svg.line( gx+13, y/2, gx, y/2 ).attr( { stroke: '#ffffff', 'stroke-width': 3 }).animate({ transform: 'r' +(i*degrees) +',' +(x+250)+',' +(y/2) }, 100);
 svg.line( gx+13, y/2, gx, y/2 ).attr( { stroke: '#ffffff', 'stroke-width': 3 }).animate({ transform: 'r-' +(i*degrees) +',' +(x+250)+',' +(y/2) }, 100);
  }
 else { 
 svg.line( gx+8, y/2, gx, y/2 ).attr( { stroke: '#ffffff', 'stroke-width': 2 }).animate({ transform: 'r' +(i*degrees) +',' +(x+250)+',' +(y/2) }, 100);
 svg.line( gx+8, y/2, gx, y/2 ).attr( { stroke: '#ffffff', 'stroke-width': 2 }).animate({ transform: 'r-' +(i*degrees) +',' +(x+250)+',' +(y/2) }, 100);

  }
}
 
      
        
// the needle
VertSpeed = svg.line( gx+10, y/2, x+250, y/2 ).attr( {stroke:'#ffffff', 'stroke-width': '5'});        
        
        //INOP
      this.inop.vertspeed = svg.group(
  //       svg.rect(gx-30, (gy-size), gx, size*2).attr( {fill: 'red', opacity: .8 }),
         svg.text(gx+4, gy, "INOP").attr( s.cardinalFont )
         ).attr({display: 'none'});
        
        
      return function( rate ) {
         if ( rate == null ) { return v.vertspeed; }
         if ( rate == 'inop') { this.inop.vertspeed.attr({display: 'inline'}); }
         else { this.inop.vertspeed.attr({display: 'none'}); }
         if ( rate > c.alarms.vsi.max || rate < c.alarms.vsi.min  ) { this.alarm.vertspeed.attr({display: 'inline'}); }
         else { this.alarm.vertspeed.attr({display: 'none'}); }

         x = s.screen.x;
         y = s.screen.y;
         gx = s.vertspeed.x;
         gy = s.vertspeed.y;
 //        this.VertSpeed.animate({transform: 'r' + (rate/50) +',' +(x+250)+',' +(y/2) }, 100);
         return ( v.vertspeed.rate = rate);
      };
},



   pitch: function(){
      x = s.screen.x;
      y = s.screen.y;
      //Build the earth and sky (pitch)
      this.theworld = svg.group(
         svg.rect( -1000, -1000, 2000, 2000).attr({fill: '#004cff'} ),         
         svg.rect ( -1000, (y/2), 2000, 2000).attr({fill: '#54350a'} ),
         svg.line( -500, (y/2), 1000, (y/2) ).attr( { stroke: '#ffffff', 'stroke-width': '1' })
      );
      this.inop.pitch = svg.group(
                        svg.circle((x/2), (y/2), 160).attr( {'fill': 'red', 'fill-opacity': .8} ),
                        svg.text( (x/2), (y/2), 'INOP').attr( s.cardinalFont )
                    ).attr( {display: 'none'});

      return function( pitch ) {
         if ( pitch == null ) { return v.pitch; }
         if ( pitch == 'inop' ) { this.inop.pitch.attr( {display: 'inline'}); }
         else {
            if ( pitch > c.alarms.pitch.max || pitch < c.alarms.pitch.min ) {
               this.alarm.pitch.attr( {display: 'inline'});
            }
            else {
               this.alarm.pitch.attr( {display: 'none'});
            }
            this.inop.pitch.attr( {display: 'none'});
            this.theworld.animate( { transform: 't0,'+(pitch*4) }, 100  );           
            }
         return ( v.pitch = pitch);
      }
      
   },

        
   roll: function(){
      x = s.screen.x;
      y = s.screen.y;
      //TODO automate build
      // hashes 0, 5, 10, 15, 20, 
      this.thewholeworld = svg.group( this.theworld,
                                    //Horizon Bar
                                    svg.rect( 260, 157.5, 95, 5 ).attr( {fill: '#ffde29' }),
                                    svg.rect( 125, 157.5,95, 5 ).attr( {fill: '#ffde29' }),
  svg.circle( 240, 160, 9  ).attr({  stroke: "#ffde29", "stroke-width":  3, fill:'none'}),
                                    //Bank Pointer
                                    svg.path( "m 230, 3 20, 0 -10 , 25").attr({  fill: "#ffffff"}),
  svg.line( (x/2)-20,  60, (x/2)+20, 60 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),
  svg.line( (x/2)-35,  80, (x/2)+35, 80 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),
                        
                                      svg.text( 187, 85, '20').attr( s.smallFont ),
                                      svg.text( 292, 85, '20').attr( s.smallFont ),

  svg.line( (x/2)-20,  100, (x/2)+20, 100 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),
  svg.line( (x/2)-35,  120, (x/2)+35, 120 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),

                                      svg.text( 187, 125, '10').attr( s.smallFont ),
                                      svg.text( 292, 125, '10').attr( s.smallFont ),

  svg.line( (x/2)-20,  140, (x/2)+20, 140 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),

  svg.line( (x/2)-20,  180, (x/2)+20, 180 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),
  svg.line( (x/2)-35,  200, (x/2)+35, 200 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),        

                                      svg.text( 187, 205, '10').attr( s.smallFont ),
                                      svg.text( 292, 205, '10').attr( s.smallFont ),

  svg.line( (x/2)-20,  220, (x/2)+20, 220 ).attr( { stroke: '#ffffff', 'stroke-width': '2' })
 );
           
        
        ////////// Bank Angle Hashes (short ones)
//TODO rotate in place. cleaner.
// put dot at 45 vs line
           var a = [  "135", "160", "170", "190", "200", "225"];
           a.forEach(function(entry) {
              anglexinradians = (entry  * Math.PI / 180);
              startx = Math.sin(anglexinradians) * 130 + 240;
              starty = Math.cos(anglexinradians) * 130 + 160;   
              stopx  = Math.sin(anglexinradians) * 140 + 240;
              stopy  = Math.cos(anglexinradians) * 140 + 160;  
              svg.line( startx, starty, stopx, stopy ).attr( { stroke: '#ffffff', 'stroke-width': '4' });
           });
           // Bank Angle Hashes (long ones)
           var a = ["120", "150",  "180", "210",  "240"];
           a.forEach(function(entry) {
              anglexinradians = (entry  * Math.PI / 180);
              startx = Math.sin(anglexinradians) * 125 + 240;
              starty = Math.cos(anglexinradians) * 125 + 160;   
              stopx  = Math.sin(anglexinradians) * 145 + 240;
              stopy  = Math.cos(anglexinradians) * 145 + 160;  
              svg.line( startx, starty, stopx, stopy ).attr( { stroke: '#ffffff', 'stroke-width': '4'});
           });
            // Edge Horizon marks that dont move.
            svg.rect( 90, 157.5, 30, 5 ).attr( {fill: '#ffde29' });
            svg.rect( 90, 157.5, 5, 15 ).attr( {fill: '#ffde29' });
            svg.rect( 360, 157.5, 30, 5 ).attr( {fill: '#ffde29' });
            svg.rect( 385, 157.5, 5, 15 ).attr( {fill: '#ffde29' });
// Center Dot on sceen
  svg.circle( (x/2),  (y/2), 6 ).attr( { fill: '#000' });

//INOP
        this.inop.roll = svg.group(
                                svg.circle((x/2), (y/2), 160).attr( {'fill': 'red', 'fill-opacity': .8} ),
                                svg.text( (x/2), (y/2), 'INOP').attr( s.cardinalFont )
                            ).attr( {display: 'none'});
        
    
        
        return function (roll){
            if ( roll == null ) { return v.roll; }
            if ( roll == 'inop' ) { this.inop.roll.attr( {display: 'inline'}); }
            else { this.inop.roll.attr( {display: 'none'}); }
            if ( roll > c.alarms.roll.max || roll < c.alarms.roll.min  ) { this.alarm.roll.attr({display: 'inline'}); }
            else { this.alarm.roll.attr({display: 'none'}); }

            this.thewholeworld.animate( { transform: 'r' +roll +',240,160' }, 100 );
            return (v.roll = roll);
        };
    },
    


    compass: function(){
        Cx = s.compass.x;
        Cy = s.compass.y;
        Cr = s.compass.r;
        y = s.screen.y;
        x = s.screen.x;
        opacity = s.compass.opacity;

        //Build the compass
        compassRose = svg.group();
//        compassRose.circle(Cx,Cy,Cr).attr( {'fill-opacity': 1} ).attr({onclick: "setBug();"});
        compassRose.circle(Cx,Cy,Cr).attr( {'fill-opacity': 1} ).attr({onclick: "setThis('headingBug', ((Pi2D2.compass() % 360)+360)%360 );"});

/*
        headingBug = compassRose.polygon(
                                    Cx +',' +((Cy-Cr)+25) +' '
                                    +(Cx-10) +',' +((Cy-Cr)-5) +' '
                                    +(Cx+10) +',' +((Cy-Cr)-5)
                                    ).attr( {fill: '#FF00FF'} );
*/
         headingBug = compassRose.line(Cx, Cy, Cx, (Cy-Cr) ).attr( { 'stroke-width': '10',stroke: '#FF00FF'} ); 

        compassRose.text( Cx, (Cy - Cr*.94), 'N').attr( s.cardinalFont );
       
        for (var i = 0; i < 36; i++) {
            var r = ( i * 10 );
            var m = r;
            var font = s.compassFont;
            if ( Cr < 20 ) { font = { fill: '#ffffff', stroke: 'none', 'font-size': '10', 'text-anchor': 'middle' };}
            if ( r == 90 )  { m = 'E'; font = s.cardinalFont; }
            if ( r == 180 ) { m = 'S'; font = s.cardinalFont; }
            if ( r == 270 ) { m = 'W'; font = s.cardinalFont; }
            compassRose.text( Cx, (Cy - Cr*.94), m).attr( font ).animate({ transform: 'r' +r+','+Cx+',' +Cy}, 100);
        }
          
        for (var i = 0; i < 360; i++) {
            y1 = (Cy - Cr*.89);
            y2 = (Cy - Cr*.92);
            width=1;
            if ( i % 5 === 0 ) { 
            	y2 = (Cy - Cr*.93); 
            	width=4;
            	}
            compassRose.line( Cx, y2, Cx, y1 ).attr( { stroke: '#ffffff', 'stroke-width': width }).animate({ transform: 'r' +i +',' +Cx+',' +Cy }, 100);
        }
       
        //Compass Marker       
        svg.polygon(
                    Cx +',' +((Cy-Cr)+25) +' '
                    +(Cx-5) +',' +((Cy-Cr)+60) +' '
                    +(Cx+5) +',' +((Cy-Cr)+60)
                    ).attr( {fill: '#FFF'} );

//INOP
        this.inop.compass = svg.group(
                                svg.circle(Cx,Cy,Cr).attr( {'fill': 'red', 'fill-opacity': .8} ),
                                svg.text( Cx, (Cy - Cr*.85), 'INOP').attr( s.cardinalFont )
                            ).attr( {display: 'none'});


        return function( heading ) {
            if ( heading == null ) { return v.heading }
            if ( heading == 'inop' ) { this.inop.compass.attr( {display: 'inline'}); }
            else {  this.inop.compass.attr( {display: 'none'}); }
            if ( ( heading - v.headingBug ) > c.alarms.compass || ( v.headingBug - heading) > c.alarms.compass  ) { this.alarm.compass.attr({display: 'inline'}); }
            else { this.alarm.compass.attr({display: 'none'}); }
            
            compassRose.animate( { transform: 'r' +heading*-1 +',' +Cx +',' +Cy }, 100 );  
            return (v.heading = heading);
        };
    
    },

    headingBug: function() {
                
        return function( bug ) {
            if ( bug == null ) { return v.headingBug }
            headingBug.animate( { transform: 'r' +bug +',' +Cx +',' +Cy }, 100 );
            return (v.headingBug = bug);
        };    
    },



    altimeter: function() {
        svg.rect( 410, 260, 63, 35).attr({fill: 'black', opacity: .4 } );
        svg.text( 440, 270, 'Alt').attr( {fill: '#ffffff', stroke: 'none', 'font-size': '10', 'text-anchor': 'middle' });


        // TODO Make the number inputs be actual vs haing to *10 and /10 for decimals
        altBox = svg.text( 440, 290, v.altimeter).attr( {fill: '#ffffff', stroke: 'none', 'font-size': '20', 'text-anchor': 'middle', onclick: "setThis('altimeter', Pi2D2.altimeter() *100 );" });            
     
       return function( altimeter ){
            if ( altimeter == null ) { return v.altimeter; }
            altBox.attr( {text: altimeter } );
            return (v.altimeter = altimeter);
          };
    },

   /////////////////////////////////////////////////////////////////////////////
   altitudeBug: function() {

      x = s.screen.x;
      y = s.screen.y;
      s.altitudeBug.step = 90 / s.altitudeBug.maxrange;;
      // 1 foot == 1 step
//      altitudeBug = svg.circle( (x*.86), (y/2), 15).attr( {fill: '#FF00FF'} ); 
      altitudeBug = svg.circle( (x*.86), (y/2), 15).attr( {fill: '#ff00ff'} ); 

      return function ( altBug ) {
         if ( altBug == null ) { return v.altitudeBug; }
         altitudeBug.animate( { transform: 't0,' +( (s.altitudeBug.step * ( v.altitude - altBug ) ) )  }, 100 );  
            console.log('boo');

         return  v.altitudeBug = altBug;
      };
      
   },

    ////////////////////////////////////////////////////////////////////////////
    altitude: function( ) {
        x = s.altitude.x;
        y = s.altitude.y;
        // build the altimeter
            
        alt = { dims: { x: x, y: y },
                      dial : [],
                      centers: [],
                      window: {}
            };
          
//        alt.group = svg.rect(x, (y-25), 90, 30).attr( {fill: 'none' });
        alt.group = svg.rect(x, (y-25), 90, 30).attr( {fill: 'none' });
        svg.text( x, (y-40), "Altitude - Feet").attr({fill: '#ffffff', stroke: 'none', 'font-size': '10' });
    
        tX = -50;
        rX = 120;   
        for (j=0; j<5; j++) {
            alt.dial[j] = svg.group(); // 10,000
            tX = tX + 25;
            rX = rX - 25;   
            alt.centers[j] = x-rX;
            alt.dial[j].text( (x+tX), y, '0').attr( s.largeFont );  
            for (var i = 0; i < 10; i++) {
                r = i*36;
                alt.dial[j].text( (x+tX), y, i).attr( s.largeFont ).attr( { transform: 'r-' +r +','+alt.centers[j] +',' +y }, 1000 );
            }
        }
       alt.window = svg.group( alt.dial[0], alt.dial[1], alt.dial[2], alt.dial[3], alt.dial[4] ).attr({ clip: svg.rect((x-43), (y-35), 200, 40), onclick: "setThis('altitudeBug', Pi2D2.altitude() )" });

//INOP
        this.inop.altitude = svg.group(
                                svg.rect((x-43), (y-35), 200, 40).attr( {fill: 'red', opacity: .8 }),
                                svg.text(x+30, (y), "INOP").attr( s.cardinalFont )
                            ).attr( {display: 'none'});

        return function( altitude ){
    //TODO prevent rolling back to 99999
            if ( altitude == null ) { return v.altitude; }
            if ( altitude == 'inop' ) { this.inop.altitude.attr( {display: 'inline'}); }
            else { this.inop.altitude.attr( {display: 'none'}); }
            correctedAltitude = ( ((v.altimeter - 29.92)*1000) + altitude  );
            x = s.altitude.x;
            y = s.altitude.y;
            alt.dial[0].animate( { transform: 'r' +Math.floor( correctedAltitude / 10000 )*36 +',' +alt.centers[0] +',' +y }, 200 );  
            alt.dial[1].animate( { transform: 'r' +Math.floor( correctedAltitude / 1000 )*36 +',' +alt.centers[1] +',' +y }, 200 );  
            alt.dial[2].animate( { transform: 'r' +Math.floor( correctedAltitude / 100 )*36 +',' +alt.centers[2] +',' +y }, 200 );  
            alt.dial[3].animate( { transform: 'r' +Math.floor( correctedAltitude / 10 )*36 +',' +alt.centers[3] +',' +y }, 200 );  
            alt.dial[4].animate( { transform: 'r' +Math.floor( correctedAltitude / 1 )*36 +',' +alt.centers[4] +',' +y }, 2 );  

   
            if ( ( v.altitudeBug  - altitude ) > c.alarms.altitude || ( altitude - v.altitudeBug ) > c.alarms.altitude  ) {
               this.alarm.altitude.attr({display: 'inline'});
               }
            else { this.alarm.altitude.attr({display: 'none'}); }

            altitudeBug.animate( { transform: 't0,' +( (s.altitudeBug.step * ( altitude - v.altitudeBug ) ) )  }, 100 );  

            return (v.altitude = altitude);
        };
    },
////////////////////////////////////////////////////////////////////////////////
   speed: function(  ){
        // Build speed
        x = s.speed.x;
        y = s.speed.y;
        Vso = c.vspeeds.Vso;
        Vsi = c.vspeeds.Vsi;
        Vfe = c.vspeeds.Vfe;
        Vno = c.vspeeds.Vno;
        Vne = c.vspeeds.Vne; 
        
        asi = {   dial : [],
                  centers: [],
                  window: {} };
        svg.text( (x-30), (y-40), "GPS - MPH").attr({fill: '#ffffff', stroke: 'none', 'font-size': '10' });
          
        asi.group = svg.rect(x, (y-25), 55, 30).attr( {fill: 'none' });
        
        tX = -50; //tX text placement x coordinate
        rX = 120; //rX text rotation x coordinate  
        for (j=0; j<3; j++) {
            asi.dial[j] = svg.group(); 
            tX = tX + 25;
            rX = rX - 25;   
            asi.centers[j] = x-rX;
            asi.dial[j].text( (x+tX), y, '0').attr( s.largeFont );  
            for (var i = 0; i < 10; i++) {
                r = i*36;
                asi.dial[j].text( (x+tX), y, i).attr( s.largeFont ).attr( { transform: 'r-' +r +','+asi.centers[j] +',' +y }, 1000 );
            }
        }
        asi.window = svg.group( asi.dial[0], asi.dial[1], asi.dial[2] ).attr({ clip: svg.rect((x-40), (y-35), 100, 45) });
       
        zero = y;
        asi.arcs = svg.group (
                            //Green Arc
                           svg.rect( 0, zero - Vno*4, 15, Vno*4 - Vsi*4 ).attr( {fill: 'green',stroke: "none", 'stroke-width': "0" }),
                            // White Arc
                            svg.rect( 0, (zero - Vfe*4), 10, (Vfe*4 - Vso*4)).attr( {fill: 'white',stroke: "none", 'stroke-width': "0" }),
                            //Yellow Arc
                            svg.rect( 0, (zero - Vne*4), 15, (Vne*4 - Vno*4) ).attr( {fill: 'yellow',stroke: "none", 'stroke-width': "0" }),
                            //RedLine
                            svg.rect( 0, ( (zero - 100) - Vne*4 ), 15, 100 ).attr( {fill: 'red',stroke: "none", 'stroke-width': "0" })
                         );
             // Zero center line for speed tape
    
        svg.polygon( '15,38 35,28 35, 48').attr( {fill: '#fff'} );
//INOP
        this.inop.speed = svg.group(
                                svg.rect(x-75, (y-35), 125, 40).attr( {fill: 'red', opacity: .8 }),
                                svg.text(x-10, (y), "INOP").attr( s.cardinalFont )
                            ).attr( {display: 'none'});

        return function ( speed ){
            if ( speed == null ) { return v.speed; }
            if ( speed == 'inop' ) { this.inop.speed.attr( {display: 'inline'}); }
            else { this.inop.speed.attr( {display: 'none'}); }

            x = s.speed.x;
            y = s.speed.y;
            asi.arcs.animate( { transform: 't0,' +((speed*4)-12) }, 200 );
            asi.dial[0].animate( { transform: 'r' +Math.floor( speed / 100 )*36 +',' +asi.centers[0] +',' +y }, 200 );  
            asi.dial[1].animate( { transform: 'r' +Math.floor( speed / 10 )*36 +',' +asi.centers[1] +',' +y }, 200 );  
            asi.dial[2].animate( { transform: 'r' +Math.floor( speed / 1 )*36 +',' +asi.centers[2] +',' +y }, 200 );  
            return v.speed = speed;
        };
    }
};
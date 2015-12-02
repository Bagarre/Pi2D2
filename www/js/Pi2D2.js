/*
 Pi2D2 A Dynon D2 knock off to run on the Rasberry Pi 2
 David Ross
 yada yada
 blah blah

*/

 var Pi2D2 =  {
    
    configs: {
        vspeeds: { Vsi: 45, Vfe: 100, Vno: 140, Vne: 160 },
        gmeter: { maxload: 4},
        vsi: { maxrate: 1000 }
    },

    
    settings: {
        screen: {x: 480, y:320},
        compass: {x: 240, y: 600, r: 350, opacity: .3 },
        altitude: { x: 385, y: 55 },
        speed: { x: 80, y: 55, Vso: 55, Vsi: 45, Vfe: 100, Vno: 140, Vne: 160 },
        smallFont: { fill: '#ffffff', stroke: 'none', 'font-size': '18', 'text-anchor': 'middle' },
        largeFont: { fill: '#ffffff', stroke: 'none', 'font-size': '45', 'text-anchor': 'middle' },
        cardinalFont: { fill: '#ffffff', stroke: 'none', 'font-size': '40', 'text-anchor': 'middle' },
        compassFont: { fill: '#ffffff', stroke: 'none', 'font-size': '30', 'text-anchor': 'middle' },
        gmeter: { maxrate: 4, x: 50, y: 160, size: 120 },
        vertspeed: {x: 430, y: 160, maxrate: 1 },
        altitudeBug: { maxrange: 50 }
    },
    
    values: {
        pitch: 0,
        roll: 0,
        speed: 1,
        altitude: 0,
        altimeter: 29.92,
        heading: 0,
        headingBug: 0,
        altitudeBug: 0,
        gload: {load: 0, maxpos: 1, maxneg: 1},
        vertspeed: {rate: 0}
    },
    
    inop: {
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
        svg = Snap("#Pi2D2_SVG");
        this.pitch = this.pitch();
        this.roll = this.roll();
        this.compass = this.compass();
        this.headingBug = this.headingBug();
        this.speed = this.speed();
        this.altitudeBug = this.altitudeBug();
        this.altitude = this.altitude();
        this.altimeter = this.altimeter();
        this.gmeter = this.gmeter();
        this.vertspeed = this.vertspeed();


    },
    
    gmeter: function(){
        x = s.screen.x;
        y = s.screen.y;
        gx = s.gmeter.x;
        gy = s.gmeter.y;
        maxrate = s.gmeter.maxrate;
        size = s.gmeter.size;
        step = size / maxrate;
        tick = step / 2;
        gy = gy+step;

        svg.line( gx, gy + size , gx, gy - size ).attr( { stroke: '#ffffff', 'stroke-width': '3' });

        xdec = gx - 10;
        ydec = gy;
        svg.text( xdec - 11, ydec + 6, '0').attr( { fill: '#ffffff', 'text-anchor': 'center' } );
        for (i=0; i < s.gmeter.maxrate; i++)  {
            svg.line( gx, ydec, xdec, ydec).attr( { stroke: '#ffffff', 'stroke-width': '2' });
            svg.text( xdec - 11 , ydec+6, i).attr( { fill: '#ffffff', 'text-anchor': 'center' } );
            for ( j=0; j<2; j++) {
                if ( j == 5){
                    svg.line( gx, ydec, xdec-10, ydec).attr( { stroke: '#ffffff', 'stroke-width': '3' });
                }
                svg.line( gx, ydec, xdec+5, ydec).attr( { stroke: '#ffffff', 'stroke-width': '1' });
                ydec = ydec-tick;
            }
        }
        svg.line( gx, ydec, xdec, ydec).attr( { stroke: '#ffffff', 'stroke-width': '2' });
        svg.text( xdec - 11, ydec+6, i).attr( { fill: '#ffffff', 'text-anchor': 'center' } );

        xdec = gx - 10;
        ydec = gy+tick*2;
        for (i=1; i < s.gmeter.maxrate; i++)  {
            svg.line( gx, ydec, xdec, ydec).attr( { stroke: '#ffffff', 'stroke-width': '2' });
            svg.text( xdec - 18, ydec+6, "-"+i).attr( { fill: '#ffffff', 'text-anchor': 'center' } );
            for ( j=0; j<2; j++) {
               if ( j == 5){
                    svg.line( gx, ydec, xdec+10, ydec).attr( { stroke: '#ffffff', 'stroke-width': '3' });
                }
                svg.line( gx, ydec, xdec+5, ydec).attr( { stroke: '#ffffff', 'stroke-width': '1' });
                ydec = ydec+tick;
            } 
        }
        svg.line( gx, ydec, xdec, ydec).attr( { stroke: '#ffffff', 'stroke-width': '2' });
        svg.text( xdec - 18, ydec+6, "-" +i).attr( { fill: '#ffffff', 'text-anchor': 'center' } );
            

        this.GloadMaxPos =  svg.polygon( gx +',' +gy +' ' +(gx+20) +',' +(gy-8) +' ' +(gx+20) +',' +(gy) ).attr( {fill: '#fff'} );
        this.GloadMaxPos.animate( { transform: 't0,' +( ( step * 1 ) *-1)  }, 100 );

        this.GLoadMaxNeg =  svg.polygon( gx +',' +gy +' ' +(gx+20) +',' +(gy) +' ' +(gx+20) +',' +(gy+8) ).attr( {fill: '#fff'} );
        this.GLoadMaxNeg.animate( { transform: 't0,' +( ( step * 1 ) *-1)  }, 100 );

        this.GLoad =  svg.group ( svg.polygon( gx +',' +gy +' ' +(gx+30) +',' +(gy-12) +' ' +(gx+30) +',' +(gy+12) ).attr( {fill: '#fff',  onclick: "Pi2D2.gmeter('reset');"}),        
           svg.text( gx+15,gy+5, "G").attr( { fill: '#000000', 'text-anchor': 'center' } )        );
        this.GLoad.animate( { transform: 't0,' +( ( step * 1 ) *-1)  }, 100 );


//INOP
        this.inop.gmeter = svg.group(
            svg.rect(gx-25, (gy-size), gx, (size*2)).attr( {fill: 'red', opacity: .8 }),
            svg.text(gx, gy, "INOP").attr( s.cardinalFont )
        ).attr( {display: 'none'});



        return function( load ) {
            if ( load == null ) { return v.gload }
            x = s.screen.x;
            y = s.screen.y;
            gx = s.vertspeed.x;
            gy = s.vertspeed.y;
            maxrate = s.gmeter.maxrate;
            size = s.gmeter.size;
            step = size / maxrate;
            
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

            this.GLoad.animate( { transform: 't0,' +( ( step * load ) *-1)  }, 100 );              
                if ( v.gload.maxpos < load ){
                    v.gload.maxpos = load;
                    this.GloadMaxPos.animate( { transform: 't0,' +( ( step * load ) *-1)  }, 100 );  
                }
               if ( v.gload.maxneg > load ){
                    v.gload.maxneg = load;
                    this.GLoadMaxNeg.animate( { transform: 't0,' +( ( step * load ) *-1 )  }, 100 );  
                }                    
            v.gload.load =  load;
            return  v.gload;
        }   
    },
    
    vertspeed: function(){
        x = s.screen.x;
        y = s.screen.y;
        gx = s.vertspeed.x;
        gy = s.vertspeed.y;
        maxrate = s.vertspeed.maxrate;
        size = 90;
        step = size / maxrate;
        tick = step / 10;
        svg.line( gx, gy + size , gx, gy - size ).attr( { stroke: '#ffffff', 'stroke-width': '3' });
        svg.line( gx, gy, gx+20, gy).attr( { stroke: '#ffffff', 'stroke-width': '2' });
        svg.text( gx+25, gy+6, '0').attr( { fill: '#ffffff', 'text-anchor': 'left' } );
        xdec = gx + 20;
        ydec = gy;
        for (i=0; i < s.vertspeed.maxrate; i++) {
            svg.line( gx, ydec, xdec, ydec).attr( { stroke: '#ffffff', 'stroke-width': '3 ' });
            svg.text( xdec + 5, ydec+6, i).attr( { fill: '#ffffff', 'text-anchor': 'center' } );
            for ( j=0; j<10; j++) {
                if ( j == 5){
                    svg.line( gx, ydec, xdec, ydec).attr( { stroke: '#ffffff', 'stroke-width': '3' });
                }
            svg.line( gx, ydec, xdec-10, ydec).attr( { stroke: '#ffffff', 'stroke-width': '1' });
            ydec = ydec-tick;
            }
        }
        svg.line( gx, ydec, xdec, ydec).attr( { stroke: '#ffffff', 'stroke-width': '3' });
        svg.text( xdec + 5, ydec+6, i +"k").attr( { fill: '#ffffff', 'text-anchor': 'center' } );

        xdec = gx + 20;
        ydec = gy;
        for (i=0; i < s.vertspeed.maxrate; i++)   {
            svg.line( gx, ydec, xdec, ydec).attr( { stroke: '#ffffff', 'stroke-width': '3' });
            svg.text( xdec + 5, ydec+6, i).attr( { fill: '#ffffff', 'text-anchor': 'center' } );
            for ( j=0; j<10; j++) {
               if ( j == 5){
                    svg.line( gx, ydec, xdec, ydec).attr( { stroke: '#ffffff', 'stroke-width': '3' });
                }
            svg.line( gx, ydec, xdec-10, ydec).attr( { stroke: '#ffffff', 'stroke-width': '1' });
            ydec = ydec+tick;
            } 
        }
        svg.line( gx, ydec, xdec, ydec).attr( { stroke: '#ffffff', 'stroke-width': '2' });
        svg.text( xdec + 5, ydec+6, i+"k").attr( { fill: '#ffffff', 'text-anchor': 'center' } );
        this.VertSpeed =  svg.polygon( gx +',' +gy +' ' +(gx-30) +',' +(gy-10) +' ' +(gx-30) +',' +(gy+10) ).attr( {fill: '#fff'} );
        
        //INOP
        this.inop.vertspeed = svg.group(
            svg.rect(gx-30, (gy-size), gx, size*2).attr( {fill: 'red', opacity: .8 }),
            svg.text(gx+4, gy, "INOP").attr( s.cardinalFont )
            ).attr({display: 'none'});
        
        
        return function( rate ) {
            if ( rate == null ) { return v.vertspeed }
            if ( rate == 'inop') { this.inop.vertspeed.attr({display: 'inline'}); }
            else { this.inop.vertspeed.attr({display: 'none'}); }

            x = s.screen.x;
            y = s.screen.y;
            gx = s.vertspeed.x;
            gy = s.vertspeed.y;
            maxrate = s.vertspeed.maxrate;
            size = 90;
            step = size / maxrate;
            tick = step / 1000;
                this.VertSpeed.animate( { transform: 't0,' +( ( tick * rate ) *-1)  }, 100 );  
            v.vertspeed.rate =  rate;
            return  v.vertspeed;
        }       
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
            else { this.inop.pitch.attr( {display: 'none'}); }

            this.theworld.animate( { transform: 't0,'+(pitch*4) }, 100  );           
            return ( v.pitch = pitch);
        };
    },

        
    roll: function(){
        x = s.screen.x;
        y = s.screen.y;
        this.thewholeworld = svg.group( this.theworld,
                                      //Horizon Bar
                                      svg.rect( 260, 157.5, 95, 5 ).attr( {fill: '#ffde29' }),
                                      svg.rect( 125, 157.5,95, 5 ).attr( {fill: '#ffde29' }),
                                      svg.circle( 240, 160, 5  ).attr({  fill: "#ffde29"}),
                                      //Bank Pointer
                                      svg.path( "m 230, 3 20, 0 -10 , 15").attr({  fill: "#ffffff"}),
        
//                                     svg.line( 220,  50, 260, 50 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),
//                                      svg.line( 230,  60, 250,  60 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),
//                                      svg.line( 220,  70, 260,  70 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),
                                      svg.line( 200,  80, 280,  80 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),
                                      svg.text( 187, 85, '20').attr( s.smallFont ),
                                      svg.text( 292, 85, '20').attr( s.smallFont ),
                                      
                                      svg.line( 220,  90, 260,  90 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),
                                      svg.line( 230, 100, 250, 100 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),
                                      svg.line( 220, 110, 260, 110 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),
                                      svg.line( 200, 120, 280, 120 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),
                                      svg.text( 187, 125, '10').attr( s.smallFont ),
                                      svg.text( 292, 125, '10').attr( s.smallFont ),
        
                                      svg.line( 220, 130, 260, 130 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),
                                      svg.line( 230, 140, 250, 140 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),                                    
                                      svg.line( 220, 150, 260, 150 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),
                                      
                                      svg.line( 220, 170, 260, 170 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),
                                      svg.line( 230, 180, 250, 180 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),
                                      svg.line( 220, 190, 260, 190 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),
                                      svg.line( 200, 200, 280, 200 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),
                                      svg.text( 187, 205, '10').attr( s.smallFont ),
                                      svg.text( 292, 205, '10').attr( s.smallFont ),
                                      svg.line( 220, 210, 260, 210 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),
                                      svg.line( 230, 220, 250, 220 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),
                                      svg.line( 220, 230, 260, 230 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),
                                      svg.line( 200, 240, 280, 240 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),
                                      svg.text( 187, 245, '20').attr( s.smallFont ),
                                      svg.text( 292, 245, '20').attr( s.smallFont )
        
//                                      svg.line( 220, 250, 260, 250 ).attr( { stroke: '#ffffff', 'stroke-width': '2' }),
//                                      svg.line( 230, 260, 250, 260 ).attr( { stroke: '#ffffff', 'stroke-width': '2' })                                 
                                    );
           
        
        ////////////////////////////////////////////////////////////////////////////////
        ////////// Bank Angle Hashes (short ones)
           var a = ["130", "140", "160", "170", "190", "200", "220", "230"];
           a.forEach(function(entry) {
              anglexinradians = (entry  * Math.PI / 180);
              startx = Math.sin(anglexinradians) * 130 + 240;
              starty = Math.cos(anglexinradians) * 130 + 160;   
              stopx  = Math.sin(anglexinradians) * 140 + 240;
              stopy  = Math.cos(anglexinradians) * 140 + 160;  
              svg.line( startx, starty, stopx, stopy ).attr( { stroke: '#ffffff', 'stroke-width': '2' });
           });
           // Bank Angle Hashes (long ones)
           var a = ["120", "150",  "180", "210",  "240"];
           a.forEach(function(entry) {
              anglexinradians = (entry  * Math.PI / 180);
              startx = Math.sin(anglexinradians) * 125 + 240;
              starty = Math.cos(anglexinradians) * 125 + 160;   
              stopx  = Math.sin(anglexinradians) * 145 + 240;
              stopy  = Math.cos(anglexinradians) * 145 + 160;  
              svg.line( startx, starty, stopx, stopy ).attr( { stroke: '#ffffff', 'stroke-width': '2' });
           });
            // Edge Horizon marks that dont move.
            svg.rect( 90, 157.5, 30, 5 ).attr( {fill: '#ffde29' });
            svg.rect( 90, 157.5, 5, 15 ).attr( {fill: '#ffde29' });
            svg.rect( 360, 157.5, 30, 5 ).attr( {fill: '#ffde29' });
            svg.rect( 385, 157.5, 5, 15 ).attr( {fill: '#ffde29' });
//INOP
        this.inop.roll = svg.group(
                                svg.circle((x/2), (y/2), 160).attr( {'fill': 'red', 'fill-opacity': .8} ),
                                svg.text( (x/2), (y/2), 'INOP').attr( s.cardinalFont )
                            ).attr( {display: 'none'});
    
        
        return function (roll){
            if ( roll == null ) { return v.roll; }
            if ( roll == 'inop' ) { this.inop.roll.attr( {display: 'inline'}); }
            else { this.inop.roll.attr( {display: 'none'}); }

            this.thewholeworld.animate( { transform: 'r' +roll +',240,160' }, 100 );
            return v.roll = roll;
        };
    },
    


    compass: function(){
        Cx = s.compass.x;
        Cy = s.compass.y;
        Cr = s.compass.r;
        y = s.screen.y;
        opacity = s.compass.opacity;

        //Build the compass
        compassRose = svg.group();
        compassRose.circle(Cx,Cy,Cr).attr( {'fill-opacity': 1} ).attr({onclick: "setBug();"});
/*
        headingBug = compassRose.polygon(
                                    Cx +',' +((Cy-Cr)+25) +' '
                                    +(Cx-10) +',' +((Cy-Cr)-5) +' '
                                    +(Cx+10) +',' +((Cy-Cr)-5)
                                    ).attr( {fill: '#FF00FF'} );
*/
         headingBug = compassRose.line(Cx, Cy, Cx, (y*.5) ).attr( { 'stroke-width': '8',stroke: '#FF00FF'} ); 

        compassRose.text( Cx, (Cy - Cr*.91), 'N').attr( s.cardinalFont );
       
        for (var i = 0; i < 36; i++) {
            var r = ( i * 10 );
            var m = r/10;
            var font = s.compassFont;
            if ( Cr < 20 ) { font = { fill: '#ffffff', stroke: 'none', 'font-size': '10', 'text-anchor': 'middle' };}
            if ( r == 90 ) { m = 'E'; font = s.cardinalFont; }
            if ( r == 180 ) { m = 'S'; font = s.cardinalFont; }
            if ( r == 270 ) { m = 'W'; font = s.cardinalFont; }
            compassRose.text( Cx, (Cy - Cr*.91), m).attr( font ).animate({ transform: 'r' +r+','+Cx+',' +Cy}, 100);
        }
          
        for (var i = 0; i < 360; i++) {
            y1 = (Cy - Cr*.87);
            y2 = (Cy - Cr*.89);
            
            if ( i % 5 === 0 ) { y2 = (Cy - Cr*.91) }
            compassRose.line( Cx, y2, Cx, y1 ).attr( { stroke: '#ffffff', 'stroke-width': '1' }).animate({ transform: 'r' +i +',' +Cx+',' +Cy }, 100);
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
            compassRose.animate( { transform: 'r' +heading*-1 +',' +Cx +',' +Cy }, 100 );  
            return v.heading = heading;
        }
    
    },

    headingBug: function() {
                
        return function( bug ) {
            if ( bug == null ) { return v.headingBug }
            headingBug.animate( { transform: 'r' +bug +',' +Cx +',' +Cy }, 100 );
            return v.headingBug = bug;
        }    
    },



    altimeter: function() {
        svg.rect( 410, 260, 63, 35).attr({fill: 'none', stroke: '#ffffff', 'stroke-width': '1' } );
        svg.text( 440, 270, 'Alt').attr( {fill: '#ffffff', stroke: 'none', 'font-size': '10', 'text-anchor': 'middle' });
        altBox = svg.text( 440, 290, v.altimeter).attr( {fill: '#ffffff', stroke: 'none', 'font-size': '20', 'text-anchor': 'middle', onclick: "setAlt();" });            
     
       return function( altimeter ){
            if ( altimeter == null ) { return v.altimeter; }
            altBox.attr( {text: altimeter } );
            return v.altimeter = altimeter;
          };
    },

   /////////////////////////////////////////////////////////////////////////////
   altitudeBug: function() {

      x = s.screen.x;
      y = s.screen.y;
      s.altitudeBug.step = 90 / s.altitudeBug.maxrange;;
      // 1 foot == 1 step
      altitudeBug = svg.circle( (x*.86), (y/2), 10).attr( {fill: '#FF00FF'} ); 

      return function ( altBug ) {
         if ( altBug == null ) { return v.altitudeBug; }

         altitudeBug.animate( { transform: 't0,' +( (s.altitudeBug.step * ( v.altitude - altBug ) ) )  }, 100 );  
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
       alt.window = svg.group( alt.dial[0], alt.dial[1], alt.dial[2], alt.dial[3], alt.dial[4] ).attr({ clip: svg.rect((x-43), (y-35), 200, 40), onclick: "setAltBug()" });

//INOP
        this.inop.altitude = svg.group(
                                svg.rect(x-43, (y-35), 200, 40).attr( {fill: 'red', opacity: .8 }),
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
            altitudeBug.animate( { transform: 't0,' +( (s.altitudeBug.step * ( altitude - v.altitudeBug ) ) )  }, 100 );  
            return v.altitude = altitude;
        };
    },

////////////////////////////////////////////////////////////////////////////////
    speed: function(  ){
        // Build speed
        x = s.speed.x;
        y = s.speed.y;
        Vso = s.speed.Vso;
        Vsi = s.speed.Vsi;
        Vfe = s.speed.Vfe;
        Vno = s.speed.Vno;
        Vne = s.speed.Vne; 
        
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
        }
    }
};
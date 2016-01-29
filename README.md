# Pi2D2

Pi2D2 is a Dynon D2 knockoff based on the Raspberry Pi. Pi 2 D2, Pi2D2.....get it?  get it???

Its a basic javascript driven SVG using snap.svg and gets AHRS data from https://github.com/cyoung/stratux.

Its currently buggy as hell and I'm beating the poor Stratx 10 times a second. IE TONS of room for improvement.

Screen Resolution is 480x320 and intended for the 3.5" PiTFT hats. I built it in a way to allow larger screen resolutions and each widget can be moved around independently. The idea was, if it was a larger screen, re-organize the stuff to make sense vs make everythig bigger.

### Motivation

Mainly because I thought it'd be fun to work with but also as an exercise in what a backup EFIS should really be.
Most people make these things to look like mini fighter jet EFISs with Speed tapes and all kind of stuff.
I wanted a platform to explore what would be really needed if your primary gave out.  Thus VSI only being 500 FPM and the more obvious heading and altitude bugs.
The GMeter is there as an exercise in math but of little value in a survival situation.
The Alarms might be valuable to help you focus on level flight.
There is no slip indicator - they never fail - it's a ball in a tube.

### Installation 
I was able to get it working on a Stratux image using a twisted variation of 
http://blog.qruizelabs.com/2014/04/29/raspberrypi-kiosk-matchbox-uzbl/
But I don't have it documented yet.

If you really want a cheap way out, copy /www into /var/www/ahrs on a Stratux load atand point your browser to http://yourstratux/ahrs/Pi2D2.html

Loading instructions to come soon.
![alt text](https://raw.githubusercontent.com/Bagarre/Pi2D2/master/screenshots/Pi2D2Shot2.png)

Hope you think this is cool.

### What Works?
Everything in the SVG works if you call it but only the following are working via test.js
Pitch, Roll, Compass, Heading Bug and Altimeter
* Heading Bug: Click the compass rose and set the heading bug
* Altimeter: Click the altimeter box to set. Altitude is based on pressure altimeter, not GPS
* AltimeterBug: Click the altitude top right to set the bug. Uses the glideslope to indicate. One mark per 10 feet.

### What is yet to work
* I've disabled all of the INOP indications for now. I think it was bogging down the system to have to check all the time.


### Version
0.0.0.0.0.1

### Usage

Pi2D2.html is a decent example of how to use it but everything is in js/Pi2D2.js
Simply create an svg tag
```sh
<svg class="my-svg" id="svg" version="1.1" xmlns="http://www.w3.org/2000/svg" height="320px" width="480px"></svg>
```
### Settings
These probably wont have to ever change unless you want a different screen size.
Each element's x,y are where it shows up on the screen.

```sh
Pi2D2.settings: {
        screen: {x: 480, y:320},
        compass: {x: 240, y: 600, r: 340, opacity: .3 },
        altitude: { x: 385, y: 55 },
        speed: { x: 80, y: 55 },
        smallFont: { fill: '#ffffff', stroke: 'none', 'font-size': '18', 'text-anchor': 'middle' },
        largeFont: { fill: '#ffffff', stroke: 'none', 'font-size': '45', 'text-anchor': 'middle' },
        cardinalFont: { fill: '#ffffff', stroke: 'none', 'font-size': '40', 'text-anchor': 'middle' },
        compassFont: { fill: '#ffffff', stroke: 'none', 'font-size': '30', 'text-anchor': 'middle' },
        gmeter: { maxrate: 4, x: 50, y: 160, size: 120 },
        vertspeed: {x: 430, y: 160 }
    },

```

### Configs and Alarms
These are things that users will want to change based on their aircraft.

Alarms are limits for when an alert should be displayed on the screen.
IE, if bank angle exceeds 15 degrees an alert is displayed until corrected.

I hope to have these exposed in the UI at some point.
```sh
   configs: {
      vspeeds: { Vso: 55, Vsi: 45, Vfe: 100, Vno: 140, Vne: 160 },
      gmeter: { maxload: 4},
      vsi: { maxrate: 500},
      alarms: {
         pitch: { max: 10, min: -10 },
         roll: { max: 15, min: -15 },  
         speed: { max: 140, min: 60 },
         gload: { max: 2, min: -1 },
         vsi: { max: 400, min: -400 },
         compass: 15,
         altitude: 50
      }
   },

```

 ... or just leave everything defaults.
 And then call init
```sh
Pi2D2.init();
```

### Updating the UI
If you're using a Stratux, just set `pollStratux = true` after running `Pi2D2.init()`
* You will need to uncomment the pollStratux.js file in Pi2D2.html
* 
If you want to roll your own from a different source.
Calling a function with no value  returns the current set value.
Calling with a value will set it to that value (and animate the screen)
(Not Working) - Calling it with 'inop' will set that instrument to INOP and red it out.
(Not Working) - The next time you call the function with a value, it will unINOP.

```sh
   Pi2D2.roll( 30 ); -- sets roll to 30 degrees right.
   Pi2D2.pitch( 10 ); -- sets pitch 10 degrees up.
   (Not Working) - Pi2D2.altitude( 'inop' ); - blanks out the Altitude indicator with INOP;   
   Pi2D2.altimeter( 29.92 ); - Sets the altimieter and will adjust altitude accordingly   
   Pi2D2.speed( 123 );
   Pi2D2.compass( 33 );
   Pi2D2.headingBug(  12);
   Pi2D2.vertspeed( 300 ); -- feet per minute
   Pi2D2.gmeter( -1 );
```

### INOP - NOT WORKING 
When using `pollStratux=true;` we will set a given instrument `INOP` if we don't revieve an update for 3 seconds.
At next successfull poll, we turn off the INOP indication.

### Tests
Yeah, they'd be nice.

### Tech

Pi2D2 uses a number of open source projects to work properly:

* [SnapSVG] - An easy way to make SVG http://snapsvg.io/
* [jQuery] - duh
* [Stratux] - 


### Todos

 - Write Tests
 - Install documentation
 - Add Code Comments
 - Add Night Mode
 - More things than you can think

License
----

Apache 2



# Pi2D2

Pi2D2 is a Dynon D2 knockoff based on the Raspberry Pi. Pi 2 D2, Pi2D2.....get it?  get it???

Its a basic javascript driven SVG using snap.svg and gets AHRS data from Stratux.

Its currently buggy as hell and I'm beating the poor Stratx 10 times a second. IE TONS of room for improvement.

Screen Resolution is 480x320 and intended for the 3.5" PiTFT hats. I built it in a way to allow larger screen resolutions and each widget can be moved around independently. The idea was, if it was a larger screen, re-organize the stuff to make sense vs make everythig bigger.

### Installation 
I was able to get it working on a Stratux image using a twisted variation of 
http://blog.qruizelabs.com/2014/04/29/raspberrypi-kiosk-matchbox-uzbl/
But I don't have it documented yet.

If you really want a cheap way out, copy /www into /var/www/ahrs on a Stratux load and point your browser to http://yourstratus/ahrs/Pi2D2.html

Loading instructions to come soon.
![alt text](https://raw.githubusercontent.com/Bagarre/Pi2D2/master/screenshots/Pi2D2Shot2.png)

Hope you think this is cool.

### What Works?
Everything in the SVG works if you call it but only the following are working via test.js
Pitch, Roll, Compass, Heading Bug and Altimeter
* Heading Bug: Click the compass rose and set the heading bug
* Altimeter: Click the altimeter to set. Altitude is based on pressure altimeter, not GPS


### What is yet to work
* G Meter: `Pi2D2.gmeter(int);` sets the bar. Max and Min are also marked, Click the hash to reset.
* Vertical Speed: `Pi2D2.vertspeed(int);` sets the bar.


### Version
0.0.0.0.0.1

### Usage

Pi2D2.html is a decent example of how to use it but everything is in js/Pi2D2.js
Simply create an svg tag
```sh
<svg class="my-svg" id="svg" version="1.1" xmlns="http://www.w3.org/2000/svg" height="320px" width="480px"></svg>
```
Add any configs you want:

```sh
Pi2D2.settings: {
        screen: {x: 480, y:320},
        compass: {x: 240, y: 600, r: 340, opacity: .3 },
        altitude: { x: 385, y: 55 },
        speed: { x: 80, y: 55, Vso: 55, Vsi: 45, Vfe: 100, Vno: 140, Vne: 160 },
        smallFont: { fill: '#ffffff', stroke: 'none', 'font-size': '18', 'text-anchor': 'middle' },
        largeFont: { fill: '#ffffff', stroke: 'none', 'font-size': '45', 'text-anchor': 'middle' },
        cardinalFont: { fill: '#ffffff', stroke: 'none', 'font-size': '40', 'text-anchor': 'middle' },
        compassFont: { fill: '#ffffff', stroke: 'none', 'font-size': '30', 'text-anchor': 'middle' },
        gmeter: { maxrate: 4, x: 50, y: 160, size: 120 },
        vertspeed: {x: 430, y: 160, maxrate: 1 }
    },

```
 ... or just leave everything defaults.
 And then call init
```sh
Pi2D2.init();
```

### Updating
Calling a function with no value  returns the current set value.
Calling with a value will set it to that value (and animate the screen)
Calling it with 'inop' will set that instrument to INOP and red it out.
The next time you call the function with a value, it will unINOP.

```sh

   Pi2D2.roll( 30 ); -- sets roll to 30 degrees right.
   Pi2D2.pitch( 10 ); -- sets pitch 10 degrees up.
   Pi2D2.altitude( 'inop' ); - blanks out the Altitude indicator with INOP;   
   Pi2D2.altimeter( 29.92 ); - Sets the altimieter and will adjust altitude accordingly   
   Pi2D2.speed( 123 );
   Pi2D2.compass( 33 );
   Pi2D2.headingBug(  12);
   Pi2D2.vertspeed( 300 ); -- feet per minute
   Pi2D2.gmeter( -1 );

```


### Tech

Pi2D2 uses a number of open source projects to work properly:

* [SnapSVG] - An easy way to make SVG http://snapsvg.io/
* [jQuery] - duh
* [Stratux] - 


### Todos

 - Write Tests
 - Rethink Github Save
 - Add Code Comments
 - Add Night Mode
 - More things than you can think

License
----

Apache 2



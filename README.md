# Pi2D2

Pi2D2 is a Dynon D2 knockoff based on the Raspberry Pi. Pi 2 D2, Pi2D2.....get it?  get it???

Its a basic javascript driven SVG using snap.svg and gets AHRS data from Stratux.

I'm currently buggy as hell and Im beating the poor Stratx 10 times a second. IE TONS of room for improvement.

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
Pitch, Roll, Compass, Heading Bug and Altimeter
* Heading Bug: Click the compass rose and set the heading bug
* Altimeter: Click the altimeter to set. Altitude is based on pressure altimeter, not GPS

### What is yet to work
* G Meter: `Pi2D2.gmeter(int);` sets the bar. Max and Min are also marked, Click the hash to reset.
* Vertical Speed: `Pi2D2.vertspeed(int);` sets the bar.

### Version
0.0.0.0.0.1

### Configs

Some items can be set up to suite your plane. Many more to come.
At some point, I want these exposed in a menu.

```sh
Pi2D2.configs.vspeeds = { Vsi: 45, Vfe: 100, Vno: 140, Vne: 160 };
Pi2D2.configs.gmeter.maxload=4;
```
Items can be moved around as well. 
Want the airspeed in the bottom left?
```sh
Pi2D2.settings.speed.y = 250;
```




### Tech

Pi2D2 uses a number of open source projects to work properly:

* [SnapSVG] - An easy way to make SVG http://snapsvg.io/
* [jQuery] - duh



### Todos

 - Write Tests
 - Rethink Github Save
 - Add Code Comments
 - Add Night Mode
 - More things than you can think

License
----

Apache 2



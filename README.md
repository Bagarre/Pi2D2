# Pi2D2

Pi2D2 is a Dynon D2 knockoff based on the Raspberry Pi..get it?
Its a basic javascript driven SVG using snap.svg and gets AHRS data from Stratux.

I'm currently buggy as hell and Im beating the poor Stratx 10 times a second. IE TONS of room for improvement.

Screen Resolution is 480x320 and intended for the 3.5" PiTFT hats.
 
Loading instructions to come soon.
Hope you think this is cool.

### What Works?
Pitch, Roll, Compass, Heading Bug and Altimeter
* Heading Bug: Click the compass rose and set the heading bug
* Altimeter: Click the altimeter to set. Altitude is based on pressure altimeter, not GPS

### What is yet to work
* G Meter: Pi2D2.gmeter(int); sets the bar. Max and Min are also marked, Click the hash to reset.
* Vertical Speed: Pi2D2.vertspeed(int); sets the bar.

### Version
haha

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



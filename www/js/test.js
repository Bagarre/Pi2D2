var doPoll;

function doPolling() {
    
   doPoll = setTimeout(function() {
            $.ajax({
                url: "/getSituation",
                type: "GET",
                success: function(data) {
                    console.log(data);
                    speed = Math.round( data.GroundSpeed);
                    if ( Pi2D2.speed() != speed){
                        Pi2D2.speed( speed );
                    }
                    heading = Math.round( data.Gyro_heading );
                    if ( Pi2D2.compass() != heading ) {
                        Pi2D2.compass( heading );
                    }

                    pitch = Math.round( data.Pitch );
                    if ( Pi2D2.pitch != pitch) {
                        Pi2D2.pitch( pitch );
                    }

                    roll = Math.round( data.Roll );
                    if ( Pi2D2.roll() != roll ){
                        Pi2D2.roll( roll );
                    }

                    altitude = Math.round( data.altitude );
                    if ( Pi2D2.altitude() != altitude ) {
                        Pi2D2.altitude( data.Pressure_alt );
                    }

                },
                dataType: "json",
                complete: poll,
                timeout: 100
            })
    }, 200);
}



function updatePi2D2() {
   Pi2D2.roll( document.getElementById("roll").value );
   Pi2D2.pitch(document.getElementById("pitch").value);
   Pi2D2.altitude( document.getElementById("altitude").value );   
   Pi2D2.altimeter( document.getElementById("altimeter").value );   
   Pi2D2.speed( document.getElementById("speed").value );
   Pi2D2.compass( document.getElementById("heading").value );
   Pi2D2.headingBug( document.getElementById("headingBug").value );
   Pi2D2.vertspeed( document.getElementById("vertspeed").value );
   Pi2D2.gmeter( document.getElementById("gload").value );
   }


document.onkeydown = function(e) {
var axis;
var value = 0;
   switch (e.keyCode) {
      case 32:
         Pi2D2.roll(0);
         Pi2D2.pitch(0);
         Pi2D2.speed(0);
         Pi2D2.altitude(0);
//         Pi2D2.altimeter(29.92);
         Pi2D2.compass(0);
         Pi2D2.headingBug(0);
         break;

      case 37:
         // Roll Left
         Pi2D2.roll(Pi2D2.roll()-1);
         break;
      case 39:
         // Roll Right
         Pi2D2.roll(Pi2D2.roll()+1);
         break;
      
      case 38:
         //pitch up
         Pi2D2.pitch(Pi2D2.pitch()-1);
         break
      case 40:
         //pitch down
         Pi2D2.pitch(Pi2D2.pitch()+1);
         break;
      
      case 81:
         // Speed up
         Pi2D2.speed(Pi2D2.speed()+1);
         break;
      case 65:
         //Speed Down
         Pi2D2.speed(Pi2D2.speed()-1);
         break;
      
      case 87:
         // Ascend
         Pi2D2.altitude(Pi2D2.altitude()+1);
         break;

      case 83:
         //Descend
         Pi2D2.altitude(Pi2D2.altitude()-1);
         break;

      case 90:
         //steer left
         Pi2D2.compass(Pi2D2.compass()-1);
         break;

      case 88:
         //steer left
         Pi2D2.compass(Pi2D2.compass()+1);
         break;
      }

      
      };
/*
window.ondevicemotion = function(event) {

   Pi2D2.roll( event.accelerationIncludingGravity.y * 8 );
   Pi2D2.pitch( event.accelerationIncludingGravity.z * 8);
   var xValue = Math.round(event.gamma);
   var yValue = Math.round(event.beta);
   var Rotation = Math.round(event.alpha);

}
 */

function setAlt() {
    document.getElementById('ALTnumber').value = '';
    document.getElementById('Pi2D2_SVG').style.display='none';
    document.getElementById('AltimeterInput').style.display='inline';
}


function setAltBug() {
    clearTimeout(doPoll);
    document.getElementById('AltimeterInput').style.display='inline';

    

    Pi2D2.altitudeBug ( Pi2D2.altitude() );
    
}
function setBug() {
    document.getElementById('HeadNumber').value = ((Pi2D2.compass() % 360)+360)%360;
    document.getElementById('Pi2D2_SVG').style.display='none';
    document.getElementById('HeadingBugInput').style.display='inline';
}



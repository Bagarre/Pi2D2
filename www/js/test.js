
function setZero() {
    Pi2D2.roll(0);
    Pi2D2.pitch(0);
    Pi2D2.speed(0);
    Pi2D2.altitude(0);
    Pi2D2.compass(0);
    Pi2D2.headingBug(0);
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


function setThis( item, value ){
    numcount=0;

//    pollStratux = false;
    document.getElementById('NumberInputValue').value = value;
    
    document.getElementById('Pi2D2_SVG').style.display='none';

    document.getElementById('NumberInputSET').onclick =
            function () {
                document.getElementById('NumberInput').style.display='none';
                document.getElementById('Pi2D2_SVG').style.display='block';
                switch (item) {
                    case "headingBug":
                        Pi2D2.headingBug( ((document.getElementById('NumberInputValue').value  % 360)+360)%360 );
                    break;
                    case "altitudeBug":
                        Pi2D2.altitudeBug( document.getElementById('NumberInputValue').value  );
                    break;
                    case "altimeter":
                        Pi2D2.altimeter( document.getElementById('NumberInputValue').value / 100 );
                        Pi2D2.altitude( Pi2D2.altitude() );
                    break;                    
                }
//                pollStratux = true;
            };
    
    document.getElementById('NumberInput').style.display='inline';

}





function setAlt() {
    document.getElementById('ALTnumber').value = '';
    document.getElementById('Pi2D2_SVG').style.display='none';
    document.getElementById('AltimeterInput').style.display='inline';
}


function setAltBug() {
    document.getElementById('AltimeterInput').style.display='inline';
    Pi2D2.altitudeBug ( Pi2D2.altitude() );
    
}


function setBug() {
    document.getElementById('HeadNumber').value = ((Pi2D2.compass() % 360)+360)%360;
    document.getElementById('Pi2D2_SVG').style.display='none';
    document.getElementById('HeadingBugInput').style.display='inline';
}



var pollStratux = false;
var lastPoll = ( new Date).getTime();


(function checkINOP() {
    setTimeout(function () {
        tick = (new Date).getTime() - lastPoll;
        if ( tick > 3000  &&  pollStratux == true) {
            // 3 seconds since our last successful poll.
            Pi2D2.speed( 'inop' ); 
            Pi2D2.compass( 'inop' );
            Pi2D2.pitch( 'inop' );
            Pi2D2.roll( 'inop' );
            Pi2D2.altitude( 'inop' );
            }
        checkINOP();
    }, 1000);
})();

var lastAltitudeValue;
lastAltitudeCheck = (new Date).getTime() / 1000;
(function computeVSI() {
    setTimeout( function () {
        timeSpan = ( (new Date).getTime() / 1000 ) - lastAltitudeCheck;
        altitudeSpan =  Pi2D2.altitude() - lastAltitudeValue;
        FPM = altitudeSpan / (timeSpan/60)
        Pi2D2.vertspeed( FPM );
        lastAltitudeValue = Pi2D2.altitude();
        lastAltitudeCheck = (new Date).getTime() / 1000;
        computeVSI();
    }, 500 );    
})();




(function poll(){
    setTimeout(function(){
        if ( pollStratux == true ){
            $.ajax({ url: "/getSituation", success: function(data){
                lastPoll = (new Date).getTime();
                //Update values
                
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
            }, dataType: "json"});
        }
    //Setup the next poll recursively
    poll();
    }, 100);
})();

/**
 * Created by David on 18/05/2014.
 */
function addEventListeners() {
    window.addEventListener( 'resize', onWindowResize, false );

    launchBtn = document.getElementById('launchBtn');

    launchBtn.addEventListener('mouseover', function() {
        //charge bar

    }, false);

    $(launchBtn).mousehold(function(i) {
        currentState = PLAYING;
        if (ballSpeedCharged < 5) {
            ballSpeedCharged += 0.025;
        }
        var charge = ballSpeedCharged * 20;
        $('#bar').width(charge +"%");
    });

    launchBtn.addEventListener('mouseup', function() {
        //place ball infront of camera
        //create and fire ball
        ball = null;
        ball = new Projectile(cameraPositions[currentCameraPosition].x, cameraPositions[currentCameraPosition].y, cameraPositions[currentCameraPosition].z, PROJECTILE_RADIUS, -0.001, ballSpeedCharged * 600);

        console.log("Speed:" + ballSpeedCharged);
        console.log(ball);

        ballSpeedCharged = 0;
        $('#bar').animate({width: "0px"}, 320);
    }, false);


    btn = document.getElementById('btn');
    btn.addEventListener('click', function() {

        moveToNextCameraPosition();

    } ,false);

}
/**
 * Created by David on 18/05/2014.
 */
function moveToNextCameraPosition() {

    if (currentCameraPosition < cameraPositions.length -1) {
        currentCameraPosition++;
    } else {
        currentCameraPosition = 0;
    }


    var target = new THREE.Vector3(0,0,0);
    target.copy(cameraPositions[currentCameraPosition]);

    // Position the camera to fit
    var tween = new TWEEN.Tween(app.camera.position).to(target)
        .easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
        app.camera.lookAt(lookPositions[currentLookPosition]);
    }).onComplete(function () {
            cameraPositions[0] = new THREE.Vector3(0, 0, -8); //reset??
    }).start();

}

function checkCameraPosition() { //not used
    console.log(app.camera.position.distanceTo(cameraPositions[currentCameraPosition]));
    if (app.camera.position.distanceTo(cameraPositions[currentCameraPosition]) != 0) {
        //move towards current camera position
        app.camera.position = cameraPositions[currentCameraPosition];

        if (app.camera.position.x < cameraPositions[currentCameraPosition].x) {
            app.camera.position.x += cameraSpeed;
        } else if (app.camera.position.x > cameraPositions[currentCameraPosition].x) {
            app.camera.position.x += cameraSpeed;
        }

        if (app.camera.position.y < cameraPositions[currentCameraPosition].y) {
            app.camera.position.y += cameraSpeed;
        } else if (app.camera.position.y > cameraPositions[currentCameraPosition].y) {
            app.camera.position.y += cameraSpeed;
        }

        if (app.camera.position.z < cameraPositions[currentCameraPosition].z) {
            app.camera.position.z += cameraSpeed;
        } else if (app.camera.position.z > cameraPositions[currentCameraPosition].z) {
            app.camera.position.z += cameraSpeed;
        }

        console.log(app.camera.position.x);
        app.camera.lookAt(lookPositions[0]);
    }
}

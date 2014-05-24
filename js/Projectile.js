/**
 * Created by David on 18/05/2014.
 */
function Projectile(_x, _y, _z, _radius, _gravity, _speed) {
    this.x = _x*1;
    this.y = _y*1;
    this.z = _z*1;
    this.radius = _radius;
    this.gravity = _gravity;
    this.speed = _speed;

    var ballGeometry = new THREE.SphereGeometry(this.radius);
    var ballMaterial = Physijs.createMaterial(new THREE.MeshLambertMaterial( {color: 0xffffff} ),
        FRICTION,
        RESTITUTION
    );

    if (ballObject != null) {
        ballObject.removeEventListener('collision');
        app.scene.remove(ballObject);
        ballObject = null;
    }

    ballObject = new Physijs.SphereMesh(ballGeometry, ballMaterial);
    ballObject.position.x = this.x;
    ballObject.position.y = this.y;
    ballObject.position.z = this.z;
    ballObject.castShadow = true;
    //ballObject.receiveShadow = true;
    ballObject.mass = 1;
    ballObject.collisions = 0;
    ballObject.setCcdSweptSphereRadius(PROJECTILE_RADIUS - 0.05);
    setRandomColor(ballObject, getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255));

    /*ballObject.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {

        switch(other_object.name) {
            case ROOF:
                console.log("Roof");
                    ball.ySpeed = ball.ySpeed * -1;
                    ballObject.position.y = 5 - (PROJECTILE_RADIUS + 0.01);
                    ballObject.__dirtyPosition = true;
                    ball.ySpeed = ball.ySpeed * BOUNCE;
                break;

            case FLOOR:
                    console.log("Floor");
                    ball.ySpeed = ball.ySpeed * -1;
                    ballObject.position.y = -5 + (PROJECTILE_RADIUS + 0.01);
                    ballObject.__dirtyPosition = true;
                    ball.ySpeed = ball.ySpeed * BOUNCE;
                break;

            case WALL_NORTH:
                console.log("Red");
                    ball.zSpeed = ball.zSpeed * -1;
                    ballObject.position.z = 10 - (PROJECTILE_RADIUS + 0.01);
                    ballObject.__dirtyPosition = true;
                    ball.zSpeed = ball.zSpeed * BOUNCE;
                break;

            case WALL_SOUTH:
                console.log("Green");
                    ball.zSpeed = ball.zSpeed * -1;
                    ballObject.position.z = -10 + (PROJECTILE_RADIUS + 0.01);
                    ballObject.__dirtyPosition = true;
                    ball.zSpeed = ball.zSpeed * BOUNCE;
                break;

            case WALL_EAST:
                console.log("Blue");
                    ball.xSpeed = ball.xSpeed * -1;
                    ballObject.position.x = -10 + (PROJECTILE_RADIUS + 0.01);
                    ballObject.__dirtyPosition = true;
                    ball.xSpeed = ball.xSpeed * BOUNCE;
                break;

            case WALL_WEST:
                console.log("Yellow");
                    ball.xSpeed = ball.xSpeed * -1;
                    ballObject.position.x = 10 - (PROJECTILE_RADIUS + 0.01);
                    ballObject.__dirtyPosition = true;
                    ball.xSpeed = ball.xSpeed * BOUNCE;
                break;
        }
    });*/

    app.scene.add(ballObject);

    var start =  cameraPositions[currentCameraPosition];
    var end = lookPositions[currentLookPosition];

    //get xy angle
    var x = end.x - start.x;
    var y = end.y - start.y;
    this.xyAngle = Math.atan2(y, x);
    console.log("xyAngle: " + this.xyAngle);

    //get zx angle
    var z = end.z - start.z;
    this.zxAngle = Math.atan2(z, x);

    this.xSpeed = this.speed * Math.sin(this.xyAngle * 180/Math.PI);
    this.ySpeed = this.speed * Math.cos(this.xyAngle  * 180/Math.PI);
    this.zSpeed = this.speed * Math.sin(this.zxAngle * 180/Math.PI);

    var force = new THREE.Vector3(end.x - start.x, end.y - start.y, end.z - start.z);

    ballObject.applyImpulse(force, new THREE.Vector3(start.x, start.y, start.z));

    currentState = LAUNCHING;
    time = 0; //reset time
}

Projectile.prototype.update = function() {
    /*this.x = this.xSpeed * time;
    this.z = this.zSpeed * time;
    this.y = this.ySpeed * time + (0.5  * ball.gravity * Math.pow(time, 2));
    time += 0.2;


    ballObject.position.x = this.x;
    ballObject.position.y = this.y;
    ballObject.position.z = this.z;
    ballObject.__dirtyPosition = true;*/



    this.ySpeed += this.gravity;
    //apply drag
    this.xSpeed = this.xSpeed * DRAG;
    this.zSpeed = this.zSpeed * DRAG;
    ballObject.position.x += this.xSpeed;
    ballObject.position.y += this.ySpeed;
    ballObject.position.z += this.zSpeed;
    ballObject.__dirtyPosition = true;

    //console.log("x:" + this.xSpeed + " y:" + this.ySpeed + " z:" +this.zSpeed);
    if (ballObject.position.y < -9 && this.xSpeed < 0.01 && this.zSpeed < 0.01) { //stopped
        currentState = PLAYING;
    }

}
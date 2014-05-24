/**
 * Created by David on 18/05/2014.
 */
function App() {
    // create a WebGL renderer, camera and scene
    this.scene = new Physijs.Scene;
    this.scene.fog = new THREE.FogExp2(0xffffff, fogLevel);
    if (Detector.webgl) { //web gl not supported fix
        this.renderer = new THREE.WebGLRenderer({antialias: true});
    } else {
        this.renderer = new THREE.CanvasRenderer();
    }
    this.scene.setGravity(new THREE.Vector3( 0, -9, 0 ));

    //set attributes for the renderer object
    this.renderer.setSize(window.innerWidth, window.innerHeight); //full screen
    this.renderer.setClearColor(0x000000, 1.0); //clear black
    this.renderer.shadowMapType = THREE.PCFSoftShadowMap;

    this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

    // add the camera to the scene, set its direction and focus
    this.scene.add(this.camera);
    this.camera.position = cameraPositions[0];
    this.camera.lookAt(lookPositions[0]);

    //add lighting
    this.point = new THREE.PointLight( 0xffffff, 1, 0 );
    this.point.position.set(0, 4.5, 0);
    this.scene.add( this.point );

    this.directionalLight = new THREE.SpotLight( 0xffffff );
    this.directionalLight.position.set( 0, 4.5, 0 );

    this.directionalLight.castShadow = true;
    this.directionalLight.angle = Math.PI/2;
    this.directionalLight.shadowDarkness = 0.5;
    this.directionalLight.shadowCameraVisible = true;
    this.directionalLight.shadowBias = 0.05;
    this.directionalLight.shadowCameraNear = 1;
    this.directionalLight.shadowCameraFar = 100;
    this.directionalLight.shadowCameraFov = 170;
    this.directionalLight.target.position.set( 0, 0, 0 );
    this.scene.add( this.directionalLight );

    // start the renderer and set its attributes
    this.renderer.setSize(WIDTH, HEIGHT);
    this.renderer.shadowMapEnabled = true; //allow shadows to be cast
    //this.renderer.shadowMapType = THREE.PCFSoftShadowMap;
    this.renderer.shadowCameraNear = 3;
    this.renderer.shadowCameraFar = this.camera.far;
    this.renderer.shadowCameraFov = 50;
    this.renderer.shadowMapBias = 0.0039;
    this.renderer.shadowMapDarkness = 0.5; //darkness of shadows
    //this.renderer.shadowMapWidth = 1024; //resolution of the shadows
    //this.renderer.shadowMapHeight = 1024;

    // attach the render-supplied DOM element
    $('#container').prepend(this.renderer.domElement);

}

App.prototype.load = function (init) {
    //load 3d models
    init();
}

App.prototype.update = function(){
    //logic
    switch(currentState) {
        case PAUSED:

            break;

        case LOADING:

            break;

        case PLAYING:

            break;

        case LAUNCHING:
            //ball.update();
            //console.log(ballObject.position);

            app.camera.lookAt(ballObject.position);
            break;
    }
}

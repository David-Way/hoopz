/**
 * Created by David on 18/05/2014.
 */
function drawScene() {
    drawWalls();
    drawFloorAndRoof();
}

function drawFloorAndRoof () {
    var floorGeometry = new THREE.BoxGeometry(21, 21, 1);
    var roofGeometry = new THREE.BoxGeometry(21, 21, 1);

    var floorMaterial = Physijs.createMaterial(new THREE.MeshLambertMaterial({color: 0xffffff}),
        .95, // high friction
        .95 // low restitution
    );
    var roofMaterial = Physijs.createMaterial(new THREE.MeshLambertMaterial({color: 0xffffff}),
        .95, // high friction
        .95 // low restitution
    );

    var floor = new Physijs.BoxMesh( floorGeometry, floorMaterial );
    var roof = new Physijs.BoxMesh( roofGeometry, roofMaterial );

    roof.position.y = 5;
    floor.position.y = -5;
    floor.rotation.x = toRad(90);
    roof.rotation.x = toRad(90);

    //roof.setDamping(0.5,0.8);
    //floor.setDamping(0.5,0.8);

    roof.name = ROOF;
    floor.name = FLOOR;

    roof.mass = 0;
    floor.mass = 0;

    //roof.castShadow = true;
    roof.receiveShadow = true;
    //floor.castShadow = true;
    floor.receiveShadow = true;

    app.scene.add( roof );
    app.scene.add( floor );
}

function drawWalls() {
    var wallGeometryNorth = new THREE.BoxGeometry(20, 10, 1);
    var wallGeometrySouth = new THREE.BoxGeometry(20, 10, 1);
    var wallGeometryEast = new THREE.BoxGeometry(20, 10, 1);
    var wallGeometryWest = new THREE.BoxGeometry(20, 10, 1);

    var wallMaterialNorth = Physijs.createMaterial(new THREE.MeshLambertMaterial( {color: 0xff0000} ),
        .95, // high friction
        .95 // low restitution
    );
    var wallMaterialSouth = Physijs.createMaterial(new THREE.MeshLambertMaterial( {color: 0x00ff00}),
        .95, // high friction
        .95 // low restitution
    );
    var wallMaterialEast = Physijs.createMaterial(new THREE.MeshLambertMaterial( {color: 0x0000ff}),
        .95, // high friction
        .95 // low restitution
    );
    var wallMaterialWest = Physijs.createMaterial(new THREE.MeshLambertMaterial( {color: 0xffff00}),
        .95, // high friction
        .95 // low restitution
    );

    var wallNorth = new Physijs.BoxMesh( wallGeometryNorth, wallMaterialNorth );
    var wallSouth = new Physijs.BoxMesh( wallGeometrySouth, wallMaterialSouth );
    var wallEast = new Physijs.BoxMesh( wallGeometryEast, wallMaterialEast );
    var wallWest = new Physijs.BoxMesh( wallGeometryWest, wallMaterialWest );

    wallNorth.rotation.y = toRad(0);
    wallSouth.rotation.y = toRad(0);
    wallEast.rotation.y = toRad(-90);
    wallWest.rotation.y = toRad(90);
    wallNorth.position.z = 10;
    wallSouth.position.z = -10;
    wallEast.position.x = -10;
    wallWest.position.x = 10;

    wallNorth.name = WALL_NORTH;
    wallSouth.name = WALL_SOUTH;
    wallEast.name = WALL_EAST;
    wallWest.name = WALL_WEST;

    wallNorth.mass = 0;
    wallSouth.mass = 0;
    wallEast.mass = 0;
    wallWest.mass = 0;


    wallNorth.receiveShadow = true;

    wallSouth.receiveShadow = true;
    //wallEast.castShadow = true;
    wallEast.receiveShadow = true;
    //wallWest.castShadow = true;
    wallWest.receiveShadow = true;

    app.scene.add( wallNorth );
    app.scene.add( wallSouth );
    app.scene.add( wallEast );
    app.scene.add( wallWest );

}
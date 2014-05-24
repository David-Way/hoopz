/**
 * Created by David on 18/05/2014.
 */
function drawScene() {
    drawWalls();
    drawFloorAndRoof();
    drawTable();
}

function drawTable() {

    var table = new THREE.Object3D();

    var tableMaterial = Physijs.createMaterial(new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('images/table.jpg') }),
        FRICTION / 2, // high friction
        RESTITUTION // low restitution
    );

    var tableTopGeometry = new THREE.BoxGeometry(5, 3,.25);
    var tableLegGeometry = new THREE.BoxGeometry(.25, 4,.25);

    var tableTop = new Physijs.BoxMesh( tableTopGeometry, tableMaterial );
    var tableLegOne = new Physijs.BoxMesh( tableLegGeometry, tableMaterial );
    var tableLegTwo = new Physijs.BoxMesh( tableLegGeometry, tableMaterial );
    var tableLegThree = new Physijs.BoxMesh( tableLegGeometry, tableMaterial );
    var tableLegFour = new Physijs.BoxMesh( tableLegGeometry, tableMaterial );

    tableTop.position.y = -1;
    tableTop.rotation.x = toRad(90);
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;

    tableLegOne.position.y = -3;
    tableLegOne.position.x = 2.25;
    tableLegOne.position.z = 1.25;

    tableLegTwo.position.y = -3;
    tableLegTwo.position.x = 2.25;
    tableLegTwo.position.z = -1.25;

    tableLegThree.position.y = -3;
    tableLegThree.position.x = -2.25;
    tableLegThree.position.z = 1.25;

    tableLegFour.position.y = -3;
    tableLegFour.position.x = -2.25;
    tableLegFour.position.z = -1.25;

    tableLegOne.castShadow = true;
    tableLegOne.receiveShadow = true;
    tableLegTwo.castShadow = true;
    tableLegTwo.receiveShadow = true;
    tableLegThree.castShadow = true;
    tableLegThree.receiveShadow = true;
    tableLegFour.castShadow = true;
    tableLegFour.receiveShadow = true;


    table.add(tableTop);
    table.add(tableLegOne);
    table.add(tableLegTwo);
    table.add(tableLegThree);
    table.add(tableLegFour);

    table.rotation.y = toRad(5);
    table.position.y = 0;

    app.scene.add(table);
}

function drawFloorAndRoof () {
    var floorGeometry = new THREE.BoxGeometry(21, 21, 1);
    var roofGeometry = new THREE.BoxGeometry(21, 21, 1);

    var floorMaterial = Physijs.createMaterial(new THREE.MeshLambertMaterial({color: 0xffffff}),
        FRICTION, // high friction
        RESTITUTION // low restitution
    );
    var roofMaterial = Physijs.createMaterial(new THREE.MeshLambertMaterial({color: 0xffffff}),
        FRICTION, // high friction
        RESTITUTION // low restitution
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
    var wallGeometryNorth = new THREE.BoxGeometry(20, 10, 1, 4, 4, 4);
    var wallGeometrySouth = new THREE.BoxGeometry(20, 10, 1);
    var wallGeometryEast = new THREE.BoxGeometry(20, 10, 1);
    var wallGeometryWest = new THREE.BoxGeometry(20, 10, 1);

    var whiteWallTexture = THREE.ImageUtils.loadTexture('images/wall_white.jpg');
    whiteWallTexture.wrapS = whiteWallTexture.wrapT = THREE.RepeatWrapping;
    whiteWallTexture.repeat.x=2;
    whiteWallTexture.repeat.y=2;


    var wallMaterialNorth = Physijs.createMaterial(new THREE.MeshLambertMaterial( { map: whiteWallTexture } ),
        FRICTION, // high friction
        RESTITUTION // low restitution
    );
    var wallMaterialSouth = Physijs.createMaterial(new THREE.MeshLambertMaterial( { map: whiteWallTexture }),
        FRICTION, // high friction
        RESTITUTION // low restitution
    );
    var wallMaterialEast = Physijs.createMaterial(new THREE.MeshLambertMaterial( { map: whiteWallTexture }),
        FRICTION, // high friction
        RESTITUTION // low restitution
    );
    var wallMaterialWest = Physijs.createMaterial(new THREE.MeshLambertMaterial( { map: whiteWallTexture }),
        FRICTION, // high friction
        RESTITUTION // low restitution
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
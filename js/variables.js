/**
 * Created by David on 18/05/2014.
 */
// set the scene size
var WIDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var HEIGHT = window.innerHeight || document.documentElement.clientHeight ||document.body.clientHeight;
HEIGHT = HEIGHT /100 * 85;
var VIEW_ANGLE = 45, ASPECT = WIDTH / HEIGHT, NEAR = 0.1, FAR = 10000;

var PROJECTILE_RADIUS = 0.15;
var BOUNCE = 0.6; //higher is less energy loss
var DRAG = 0.99; //higher is less drag

//object references
var FLOOR = 0;
var ROOF = 1;
var WALL_NORTH = 2;
var WALL_SOUTH = 3
var WALL_EAST = 4;
var WALL_WEST = 5;

var FRICTION = 0.95;
var RESTITUTION = 0.95;

//gamestates
var LOADING = -1;
var PAUSED = 0;
var PLAYING = 1;
var LAUNCHING = 2;
var currentState = 0;

var fogLevel = 0.001; //0.001 - 0.009

var app;

var cameraSpeed = 0.000028;

var currentLookPosition = 0;
var lookPositions = new Array();
lookPositions.push(new THREE.Vector3(0, 0, 0));

var currentCameraPosition = 0;
var cameraPositions = new Array();
cameraPositions.push(new THREE.Vector3(0, 0, -8));
cameraPositions.push(new THREE.Vector3(8, -4, -8));

cameraPositions.push(new THREE.Vector3(8, 0, 0));
cameraPositions.push(new THREE.Vector3(8, 4, 8));

cameraPositions.push(new THREE.Vector3(0, 0, 8));
cameraPositions.push(new THREE.Vector3(-8, -4, 8));

cameraPositions.push(new THREE.Vector3(-8, 0, 0));
cameraPositions.push(new THREE.Vector3(-8, 4, -8));

var btn;
var bar;
var launchBtn;
var ball;
var ballObject;
var ballSpeedCharged = 0;
var time = 0;

function onWindowResize() {
    if (app != null) {
        WIDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        HEIGHT = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        HEIGHT = HEIGHT / 100 * 85;

        app.camera.aspect = window.innerWidth / window.innerHeight;
        app.camera.updateProjectionMatrix();

        app.renderer.setSize(WIDTH, HEIGHT);
    }
}

function toRad(Value) {
    return Value * Math.PI / 180;
}

function setRandomColor(ball, r, g, b) {
    ballObject.material.color.setHex("0x" + componentToHex(r) + componentToHex(g) + componentToHex(b));
}

//used to convert rgb 0 - 255 values into hex digits, corrects them if too short for hex string (adds 0 to front)
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function getRandomInt(min, max) { //function gives a random number between two values
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

jQuery.fn.mousehold = function(timeout, f) {
    if (timeout && typeof timeout == 'function') {
        f = timeout;
        timeout = 100;
    }
    if (f && typeof f == 'function') {
        var timer = 0;
        var fireStep = 0;
        return this.each(function() {
            jQuery(this).mousedown(function() {
                fireStep = 1;
                var ctr = 0;
                var t = this;
                timer = setInterval(function() {
                    ctr++;
                    f.call(t, ctr);
                    fireStep = 2;
                }, timeout);
            })

            clearMousehold = function() {
                clearInterval(timer);
                if (fireStep == 1) f.call(this, 1);
                fireStep = 0;
            }

            jQuery(this).mouseout(clearMousehold);
            jQuery(this).mouseup(clearMousehold);
        })
    }
}

function drawAxes(length) { //this function uses the build axis function to create 3d coloured axis object
    var axes = new THREE.Object3D();

    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(length, 0, 0), 0xFF0000, false)); // +X
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-length, 0, 0), 0xFF0000, true)); // -X
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, length, 0), 0x00FF00, false)); // +Y
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -length, 0), 0x00FF00, true)); // -Y
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, length), 0x0000FF, false)); // +Z
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -length), 0x0000FF, true)); // -Z

    return axes;
}

function buildAxis(src, dst, colorHex, dashed) {
    var geom = new THREE.Geometry();
    var axisMaterial;
    if (dashed) {
        axisMaterial = new THREE.LineDashedMaterial({linewidth: 3, color: colorHex, dashSize: 1, gapSize:.75});
    } else {
        axisMaterial = new THREE.LineBasicMaterial({linewidth: 3, color: colorHex});
    }
    geom.vertices.push(src.clone());
    geom.vertices.push(dst.clone());
    geom.computeLineDistances();
    var axis = new THREE.Line(geom, axisMaterial, THREE.LinePieces);
    return axis;
}
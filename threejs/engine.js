/**
 * Created with JetBrains PhpStorm.
 * User: Robert
 * Date: 8/1/13
 * Time: 12:39 PM
 * To change this template use File | Settings | File Templates.
 */
if (!Detector.webgl) Detector.addGetWebGLMessage();
var container, stats;

var camera, scene, renderer;
var pointLight, sunLight;

var materials = new Array();
var meshes = new Array();
var gameObjects = new Array();
var shimmerMaterials = new Array();
var delta, elapsedTime;
var ship;
var loader;
var clock = new THREE.Clock();
var controls, projector;
var renderDistance = 5000;


function engineStart(){
    // Load resources & start engine
    buildMaterials();
    loadModels();
}

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0x000000, 0.00025 );

    // Lights
    pointLight = new THREE.PointLight(0xFFFFFF, 2, 350);
    scene.add(pointLight);

    var ambientLighting = new THREE.AmbientLight(0x050505);
    scene.add(ambientLighting);

    // Cameras
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, renderDistance);
    camera.position.set(0, 15, 20);
    camera.lookAt(scene.position);

    // Projector
    projector = new THREE.Projector();

    // Objects
    buildGameObjects();

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialiasing: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Stats
    stats = new Stats();
    container.appendChild(stats.domElement);

    // Events
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener( 'mousedown', onDocumentMouseDown, false );
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    render();
}

function render() {
    requestAnimationFrame(render);
    stats.update();

    // vertex animation
    delta = clock.getDelta();
    elapsedTime = clock.getElapsedTime();

    // Update vertex shaded materials
    customUniformsShields.time.value += delta / 100;
    customUniformsSun.time.value += delta / 100;
    customUniformsAtmosphere.time.value += delta / 200;

    // Update gameObject positions, animations, particles
    for (var obj in gameObjects) {
        if(gameObjects[obj].moveable || gameObjects[obj].orbiting !== undefined)
            gameObjects[obj].updatePosition();
        if(gameObjects[obj].animated)
            gameObjects[obj].updateAnimations();
        if(gameObjects[obj].hasEmitters)
            gameObjects[obj].updateEmitters();
    }

    // Shimmer shimmering materials
    for (var matIndex in shimmerMaterials) {
        var v = Math.sin(elapsedTime * 2.5);

        var mat = shimmerMaterials[matIndex];
//        windows.ambient.setRGB(2.5,5,10);
//        shimmer.ambient.setRGB(5,10,5);
//        ringShimmer.ambient.setRGB(5,10,10);
        mat.ambient.setRGB(12.5 * v + 10, 10*v + 10 , 5*v+20);
    }

    guiUpdateTargetDistances();

    pointLight.position = camera.position;

    controls.update();
    gameObjects['sky'].setPosition(camera.position.x, camera.position.y, camera.position.z);
    renderer.render(scene, camera);
}
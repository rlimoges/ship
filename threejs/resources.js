var loadedModels = new Array();

function addMaterial(id, mat){
    materials[id] = mat;
    materials[id].name = id;
}

function buildMaterials(){
    // Build default texture materials
    for (var id in textures){
        mat = new THREE.MeshLambertMaterial({
            map: textures[id]
        });
        addMaterial(textures[id].name, mat);
    }

    // Sun
    customUniformsSun = {
        baseTexture: { type: "t", value: textures['planet-lava1'] },
        baseSpeed: { type: "f", value: 1.25 },
        noiseTexture: { type: "t", value: textures['sky-cloud'] },
        noiseScale: { type: "f", value: 0.5 },
        alpha: { type: "f", value: 0.5 },
        time: { type: "f", value: 0.25 }
    };

    // Shields
    customUniformsShields = {
        baseTexture: { type: "t", value: textures['sky-shields'] },
        baseSpeed: { type: "f", value: 3.25 },
        noiseTexture: { type: "t", value: textures['sky-cloud'] },
        noiseScale: { type: "f", value: 0.5 },
        alpha: { type: "f", value: 1.0 },
        time: { type: "f", value: 0.25 }
    };
    addMaterial('shieldsMaterial', new THREE.ShaderMaterial({
        uniforms: customUniformsShields,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
        transparent: true,
        emmisive: 1
    }));


    // Atmosphere
    customUniformsAtmosphere = {
        baseTexture: { type: "t", value: textures['sky-cloud'] },
        baseSpeed: { type: "f", value: 3.25 },
        noiseTexture: { type: "t", value: textures['sky-shields'] },
        noiseScale: { type: "f", value: 0.5 },
        alpha: { type: "f", value: 1.0 },
        time: { type: "f", value: 0.25 }
    };
    addMaterial('atmosphere', new THREE.ShaderMaterial({
        uniforms: customUniformsAtmosphere,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
        transparent: true,
        emmisive: 1
    }));

    // Sky
    addMaterial('skyMaterial', new THREE.MeshLambertMaterial({
        map: textures['sky-neb1'],
        side: THREE.DoubleSide,
        shininess: 100,
        fog: false
    }));

    // Sun
    addMaterial('sunMaterial', new THREE.ShaderMaterial({
        uniforms: customUniformsSun,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
    }));
}

// load Models
function loadModels(){
    loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;

    load_ship1();
    load_ship2();
    load_station1();
    load_station2();
}


function loadedModel(model){
    loadedModels.push(model);

    if(loadedModels.length >= 4) {
        setTimeout("init();" , 1000);
    }
}

function load_ship1() {
    loader.load('models/ship1.dae', function (collada) {
        var ship = collada.scene;
        ship.scale.x = ship.scale.y = ship.scale.z = 1;

        var matMain = ship.children[0].material.materials[4];
        var matWindow = ship.children[0].material.materials[1];
        var matLasers = ship.children[0].material.materials[3];
        var matHighlight = ship.children[0].material.materials[0];

        matMain.map = textures['structure-plaque'];
        matMain.specularMap = textures['structure-plaque_SPEC'];
//        matMain.bumpMap = textures['structure-plaque_NRM'];
        matMain.bumpScale = 0.01;
        matMain.shininess = 10;

        matHighlight.map = textures['structure-plaque'];
        matHighlight.specularMap = textures['structure-plaque_SPEC'];
//        matHighlight.bumpMap = textures['structure-plaque_NRM'];
        matHighlight.bumpScale = 0.01;
        matHighlight.shininess = 30;

        matWindow.map = textures['sky-neb2'];
        matWindow.reflection = 1;

        matLasers.map = textures['sky-neb1'];

        meshes['ship'] = ship;
        loadedModel('ship');
    });
}

function load_ship2() {
    loader.load('models/ship2.dae', function (collada) {
        var ship2 = collada.scene;
        ship2.scale.x = ship2.scale.y = ship2.scale.z = 10;

        var shimmer3 = ship2.children[0].material.materials[0];
        var metal3 = ship2.children[0].material.materials[1];

        metal3.map= textures['planet-iron'];
        metal3.specularMap = textures['planet-iron'];
        metal3.shininess = 10;

        shimmer3.map = textures['planet-ice1'];

        meshes['ship2'] = ship2;
        shimmerMaterials.push(shimmer3);

        loadedModel('ship2');
    });
}

function load_station1() {
    loader.load('models/station1.dae', function (collada) {
        var station = collada.scene;
        station.scale.x = station.scale.y = station.scale.z = 10;

        var metal = station.children[0].material.materials[0];
        var windows = station.children[0].material.materials[1];
        var shimmer = station.children[0].material.materials[2];
        var outerRingmetal = station.children[0].children[0].material.materials[0];
        var ringShimmer = station.children[0].children[0].material.materials[1];

        metal.map= textures['structure-plaque'];
        metal.specularMap = textures['structure-plaque_SPEC'];
        metal.bumpMap = textures['structure-plaque_OCC'];
        metal.bumpScale = 0.01;
        metal.shininess = 10;

        outerRingmetal.map = textures['structure-plaque'];

        outerRingmetal.specularMap = textures['structure-plaque_SPEC'];
        outerRingmetal.bumpMap = textures['structure-plaque_OCC'];
        outerRingmetal.bumpScale = 0.01;
        outerRingmetal.shininess = 10;

        shimmer.map = textures['planet-ice1'];
        windows.map = textures['sky-neb3'];
        ringShimmer.map = textures['planet-ice1'];
        windows.reflection = 1;

        meshes['station'] = station;
        shimmerMaterials.push(windows, shimmer, ringShimmer);

        loadedModel('station');
    });
}



function load_station2() {
    loader.load('models/station2.dae', function (collada) {
        var station2 = collada.scene;
        station2.scale.x = station2.scale.y = station2.scale.z = 10;

        var shimmer4 = station2.children[0].material.materials[1];
        var shimmer5 = station2.children[0].material.materials[2];
        var metal4 = station2.children[0].material.materials[0];

        metal4.map= textures['structure-plaque'].clone();
        shimmer4.map = textures['structure-plaque'].clone();

        meshes['station2'] = station2;
        shimmerMaterials.push(shimmer4, shimmer5);

        loadedModel('station2');
    });
}

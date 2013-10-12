function debulon() {
// Default / test zone

// Skysphere
    addGameObject('sky', new THREE.Mesh(new THREE.SphereGeometry(renderDistance - 500, 25, 40), materials['skyMaterial']), 'sky');
    gameObjects['sky'].anim_r_y = 0.0001;
    gameObjects['sky'].animated = true;

// Sun
    var sunGeometry = new THREE.SphereGeometry(200, 20, 20);
    addGameObject('sun', new THREE.Mesh(sunGeometry, materials['sunMaterial']), 'sun');
    gameObjects['sun'].setPosition(0, 1200, 0);
    gameObjects['sun'].setRotation(90, 0, 0);
    gameObjects['sun'].anim_r_y = 0.005;
    gameObjects['sun'].animated = true;
    gameObjects['sun'].targetable = true;
    gameObjects['sun'].type = "star";
    gameObjects['sun'].orbital = 800;
    gameObjects['sun'].addEmitter("sunFlares");
    gameObjects['sun'].addEmitter("solarWind");
    gameObjects['sun'].name = "Debulon";

    sunLight = new THREE.PointLight(0xFFFFDD, 2.5, 35000);
    sunLight.position.set(0, 1200, 0);
    addGameObject('sunLight', sunLight, 'light');

// Drones
    addGameObject('ship2', meshes['ship2'].clone(), 'spacecraft');
    gameObjects['ship2'].targetable = true;
    gameObjects['ship2'].type = "Spacecraft";
    gameObjects['ship2'].moveable = true;
    gameObjects['ship2'].orbitRadius = 100;
    gameObjects['ship2'].speed = 75;
    gameObjects['ship2'].name = "Drone 1";
    gameObjects['ship2'].addEmitter("drone");
    addGameObject('ship2Shields', new THREE.Mesh(new THREE.SphereGeometry(60, 30, 30), materials['shieldsMaterial']));
    gameObjects['ship2'].followers.push(gameObjects['ship2Shields']);

    addGameObject('ship3', meshes['ship2'].clone(), 'spacecraft');
    gameObjects['ship3'].targetable = true;
    gameObjects['ship3'].type = "Spacecraft";
    gameObjects['ship3'].moveable = true;
    gameObjects['ship3'].orbitRadius = 100;
    gameObjects['ship3'].speed = 75;
    gameObjects['ship3'].name = "Drone 2";
    gameObjects['ship3'].orbit(gameObjects['sun']);
    gameObjects['ship3'].addEmitter("drone");
//    addGameObject('ship3Shields', new THREE.Mesh(new THREE.SphereGeometry(60, 30, 30), materials['shieldsMaterial']));
//    gameObjects['ship3'].followers.push(gameObjects['ship3Shields']);

// Planets
    addGameObject('planet', new THREE.Mesh(new THREE.SphereGeometry(80, 15, 15), materials['planet-lava3']).clone(), 'planet');
    gameObjects['planet'].setRotation(90, 0, 0);
    gameObjects['planet'].anim_r_y = 0.001;
    gameObjects['planet'].targetable = true;
    gameObjects['planet'].type = "Planet";
    gameObjects['planet'].animated = true;
    gameObjects['planet'].moveable = true;
    gameObjects['planet'].orbital = 300;
    gameObjects['planet'].orbit(gameObjects['sun']);
    gameObjects['planet'].orbitRadius = 4500;
    gameObjects['planet'].speed = 60;
    gameObjects['planet'].name = "Debulon I";

    addGameObject('planet2', new THREE.Mesh(new THREE.SphereGeometry(120, 20, 20), materials['planet-red']).clone(), 'planet');
    gameObjects['planet2'].setRotation(90, 0, 0);
    gameObjects['planet2'].anim_r_y = -0.001;
    gameObjects['planet2'].targetable = true;
    gameObjects['planet2'].type = "Planet";
    gameObjects['planet2'].animated = true;
    gameObjects['planet2'].moveable = true;
    gameObjects['planet2'].orbital = 300;
    gameObjects['planet2'].orbit(gameObjects['sun']);
    gameObjects['planet2'].orbitRadius = 10000;
    gameObjects['planet2'].speed = 200;
    gameObjects['planet2'].name = "Debulon II";
    addGameObject('atmosphere2', new THREE.Mesh(new THREE.SphereGeometry(125, 20, 20), materials['atmosphere']), 'atmosphere');
    gameObjects['atmosphere2'].setRotation(90, 0, 0);
    gameObjects['planet2'].followers.push(gameObjects['atmosphere2']);

    addGameObject('planet3', new THREE.Mesh(new THREE.SphereGeometry(100, 20, 20), materials['planet-m2']).clone(), 'planet');
    gameObjects['planet3'].setRotation(90, 0, 0);
    gameObjects['planet3'].anim_r_y = -0.001;
    gameObjects['planet3'].targetable = true;
    gameObjects['planet3'].type = "Planet";
    gameObjects['planet3'].animated = true;
    gameObjects['planet3'].moveable = true;
    gameObjects['planet3'].orbital = 300;
    gameObjects['planet3'].orbit(gameObjects['sun']);
    gameObjects['planet3'].orbitRadius = 13000;
    gameObjects['planet3'].speed = 220;
    gameObjects['planet3'].name = "Debulon III";
    addGameObject('atmosphere3', new THREE.Mesh(new THREE.SphereGeometry(105, 20, 20), materials['atmosphere']), 'atmosphere');
    gameObjects['atmosphere3'].setRotation(90, 0, 0);
    gameObjects['planet3'].followers.push(gameObjects['atmosphere3']);

    addGameObject('planet4', new THREE.Mesh(new THREE.SphereGeometry(350, 20, 20), materials['planet-g1']).clone(), 'planet');
    gameObjects['planet4'].setRotation(90, 0, 0);
    gameObjects['planet4'].anim_r_y = -0.01;
    gameObjects['planet4'].targetable = true;
    gameObjects['planet4'].type = "Planet";
    gameObjects['planet4'].animated = true;
    gameObjects['planet4'].moveable = true;
    gameObjects['planet4'].orbital = 800;
    gameObjects['planet4'].orbit(gameObjects['sun']);
    gameObjects['planet4'].orbitRadius = 16000;
    gameObjects['planet4'].speed = 250;
    gameObjects['planet4'].name = "Debulon IV";
    addGameObject('atmosphere4', new THREE.Mesh(new THREE.SphereGeometry(255, 20, 20), materials['atmosphere']), 'atmosphere');
    gameObjects['atmosphere4'].setRotation(90, 0, 0);
    gameObjects['planet4'].followers.push(gameObjects['atmosphere4']);

    addGameObject('planet5', new THREE.Mesh(new THREE.SphereGeometry(250, 20, 20), materials['planet-m4']).clone(), 'planet');
    gameObjects['planet5'].setRotation(90, 0, 0);
    gameObjects['planet5'].anim_r_y = -0.001;
    gameObjects['planet5'].targetable = true;
    gameObjects['planet5'].type = "Planet";
    gameObjects['planet5'].animated = true;
    gameObjects['planet5'].moveable = true;
    gameObjects['planet5'].orbital = 600;
    gameObjects['planet5'].orbit(gameObjects['sun']);
    gameObjects['planet5'].orbitRadius = 20000;
    gameObjects['planet5'].speed = 280;
    gameObjects['planet5'].name = "Debulon V";
    addGameObject('atmosphere5', new THREE.Mesh(new THREE.SphereGeometry(255, 20, 20), materials['atmosphere']), 'atmosphere');
    gameObjects['atmosphere5'].setRotation(90, 0, 0);
    gameObjects['planet5'].followers.push(gameObjects['atmosphere5']);

    addGameObject('planet6', new THREE.Mesh(new THREE.SphereGeometry(150, 20, 20), materials['planet-ice1']).clone(), 'planet');
    gameObjects['planet6'].setRotation(90, 0, 0);
    gameObjects['planet6'].anim_r_y = -0.001;
    gameObjects['planet6'].targetable = true;
    gameObjects['planet6'].type = "Planet";
    gameObjects['planet6'].animated = true;
    gameObjects['planet6'].moveable = true;
    gameObjects['planet6'].orbital = 300;
    gameObjects['planet6'].orbit(gameObjects['sun']);
    gameObjects['planet6'].orbitRadius = 22000;
    gameObjects['planet6'].speed = 300;
    gameObjects['planet6'].name = "Debulon VI";


    addGameObject('planet7', new THREE.Mesh(new THREE.SphereGeometry(50, 20, 20), materials['planet-m3']).clone(), 'planet');
    gameObjects['planet7'].setRotation(90, 0, 0);
    gameObjects['planet7'].anim_r_y = -0.0005;
    gameObjects['planet7'].targetable = true;
    gameObjects['planet7'].type = "Planet";
    gameObjects['planet7'].animated = true;
    gameObjects['planet7'].moveable = true;
    gameObjects['planet7'].orbital = 300;
    gameObjects['planet7'].orbit(gameObjects['sun']);
    gameObjects['planet7'].orbitRadius = 25000;
    gameObjects['planet7'].speed = 400;
    gameObjects['planet7'].name = "Debulon VII";

// Moons
    addGameObject('moon0', new THREE.Mesh(new THREE.SphereGeometry(35, 20, 20), materials['planet-sand']).clone(), 'moon');
    gameObjects['moon0'].setRotation(190, 0, 0);
    gameObjects['moon0'].anim_r_y = -0.01;
    gameObjects['moon0'].targetable = true;
    gameObjects['moon0'].type = "Moon";
    gameObjects['moon0'].animated = true;
    gameObjects['moon0'].moveable = true;
    gameObjects['moon0'].orbital = 100;
    gameObjects['moon0'].orbit(gameObjects['planet']);
    gameObjects['moon0'].orbitRadius = 470;
    gameObjects['moon0'].speed = 35;
    gameObjects['moon0'].name = "Debulon I-A";

    addGameObject('moon1', new THREE.Mesh(new THREE.SphereGeometry(20, 20, 20), materials['planet-cracks']).clone(), 'moon');
    gameObjects['moon1'].setRotation(190, 0, 0);
    gameObjects['moon1'].anim_r_y = -0.01;
    gameObjects['moon1'].targetable = true;
    gameObjects['moon1'].type = "Moon";
    gameObjects['moon1'].animated = true;
    gameObjects['moon1'].moveable = true;
    gameObjects['moon1'].orbital = 300;
    gameObjects['moon1'].orbit(gameObjects['planet2']);
    gameObjects['moon1'].orbitRadius = 500;
    gameObjects['moon1'].speed = 15;
    gameObjects['moon1'].name = "Debulon II-A";

    addGameObject('moon2', new THREE.Mesh(new THREE.SphereGeometry(20, 20, 20), materials['planet-moon1']).clone(), 'moon');
    gameObjects['moon2'].setRotation(90, 0, 0);
    gameObjects['moon2'].anim_r_y = -0.01;
    gameObjects['moon2'].targetable = true;
    gameObjects['moon2'].type = "Moon";
    gameObjects['moon2'].animated = true;
    gameObjects['moon2'].moveable = true;
    gameObjects['moon2'].orbital = 300;
    gameObjects['moon2'].orbit(gameObjects['planet3']);
    gameObjects['moon2'].orbitRadius = 500;
    gameObjects['moon2'].speed = 15;
    gameObjects['moon2'].name = "Debulon III-A";

    addGameObject('moon3', new THREE.Mesh(new THREE.SphereGeometry(40, 20, 20), materials['planet-ice2']).clone(), 'moon');
    gameObjects['moon3'].setRotation(90, 0, 0);
    gameObjects['moon3'].anim_r_y = -0.01;
    gameObjects['moon3'].targetable = true;
    gameObjects['moon3'].type = "Moon";
    gameObjects['moon3'].animated = true;
    gameObjects['moon3'].moveable = true;
    gameObjects['moon3'].orbital = 300;
    gameObjects['moon3'].orbit(gameObjects['planet5']);
    gameObjects['moon3'].orbitRadius = 450;
    gameObjects['moon3'].speed = 12;
    gameObjects['moon3'].name = "Debulon V-A";

    addGameObject('moon4', new THREE.Mesh(new THREE.SphereGeometry(25, 20, 20), materials['planet-grey']).clone(), 'moon');
    gameObjects['moon4'].setRotation(90, 0, 0);
    gameObjects['moon4'].anim_r_y = -0.01;
    gameObjects['moon4'].targetable = true;
    gameObjects['moon4'].type = "Moon";
    gameObjects['moon4'].animated = true;
    gameObjects['moon4'].moveable = true;
    gameObjects['moon4'].orbital = 300;
    gameObjects['moon4'].orbit(gameObjects['planet5']);
    gameObjects['moon4'].orbitRadius = 650;
    gameObjects['moon4'].speed = 10;
    gameObjects['moon4'].name = "Debulon V-B";

// Asteroids
    addGameObject('asteroid1', new THREE.Mesh(new THREE.SphereGeometry(5, 15, 15), materials['planet-iron']).clone(), 'asteroid');
    gameObjects['asteroid1'].setRotation(90, 0, 0);
    gameObjects['asteroid1'].anim_r_y = 0.0075;
    gameObjects['asteroid1'].targetable = true;
    gameObjects['asteroid1'].type = "Iron";
    gameObjects['asteroid1'].moveable = true;
    gameObjects['asteroid1'].animated = true;
    gameObjects['asteroid1'].orbit(gameObjects['moon0']);
    gameObjects['asteroid1'].orbitRadius = 300;
    gameObjects['asteroid1'].speed = 20;
    gameObjects['asteroid1'].name = "Asteroid";

    addGameObject('asteroid2', new THREE.Mesh(new THREE.SphereGeometry(10, 10, 10), materials['planet-iron'].clone()), 'asteroid');
    gameObjects['asteroid2'].setRotation(-90, 0, 0);
    gameObjects['asteroid2'].anim_r_y = 0.01;
    gameObjects['asteroid2'].targetable = true;
    gameObjects['asteroid2'].type = "Iron";
    gameObjects['asteroid2'].moveable = true;
    gameObjects['asteroid2'].animated = true;
    gameObjects['asteroid2'].orbit(gameObjects['planet']);
    gameObjects['asteroid2'].orbitRadius = 1500;
    gameObjects['asteroid2'].speed = 25;
    gameObjects['asteroid2'].name = "Asteroid";

    addGameObject('asteroid3', new THREE.Mesh(new THREE.SphereGeometry(5, 15, 15), materials['planet-iron']).clone(), 'asteroid');
    gameObjects['asteroid3'].setRotation(90, 0, 0);
    gameObjects['asteroid3'].anim_r_y = 0.0075;
    gameObjects['asteroid3'].targetable = true;
    gameObjects['asteroid3'].type = "Iron";
    gameObjects['asteroid3'].moveable = true;
    gameObjects['asteroid3'].animated = true;
    gameObjects['asteroid3'].orbit(gameObjects['planet4']);
    gameObjects['asteroid3'].orbitRadius = 600;
    gameObjects['asteroid3'].speed = 20;
    gameObjects['asteroid3'].name = "Asteroid";

    addGameObject('asteroid4', new THREE.Mesh(new THREE.SphereGeometry(10, 10, 10), materials['planet-ruby'].clone()), 'asteroid');
    gameObjects['asteroid4'].setRotation(-90, 0, 0);
    gameObjects['asteroid4'].anim_r_y = 0.01;
    gameObjects['asteroid4'].targetable = true;
    gameObjects['asteroid1'].type = "Iron";
    gameObjects['asteroid4'].moveable = true;
    gameObjects['asteroid4'].animated = true;
    gameObjects['asteroid4'].orbit(gameObjects['planet4']);
    gameObjects['asteroid4'].orbitRadius = 700;
    gameObjects['asteroid4'].speed = 25;
    gameObjects['asteroid4'].name = "Asteroid";

// Comets
    addGameObject('comet', new THREE.Mesh(new THREE.SphereGeometry(3, 5, 5), materials['planet-ice1']).clone(), 'comet');
    gameObjects['comet'].anim_r_y = 0.005;
    gameObjects['comet'].targetable = true;
    gameObjects['comet'].type = "Ice Comet";
    gameObjects['comet'].moveable = true;
    gameObjects['comet'].animated = true;
    gameObjects['comet'].orbit(gameObjects['sun']);
    gameObjects['comet'].orbitRadius = 8500;
    gameObjects['comet'].addEmitter("cometTrail");
    gameObjects['comet'].speed = 150;
    gameObjects['comet'].name = "Comet 1";

    addGameObject('comet2', new THREE.Mesh(new THREE.SphereGeometry(6, 5, 5), materials['planet-ice2']).clone(), 'comet');
    gameObjects['comet2'].anim_r_y = 0.05;
    gameObjects['comet2'].targetable = true;
    gameObjects['comet2'].type = "Ice Comet";
    gameObjects['comet2'].moveable = true;
    gameObjects['comet2'].animated = true;
    gameObjects['comet2'].orbit(gameObjects['sun']);
    gameObjects['comet2'].orbitRadius = 21500;
    gameObjects['comet2'].addEmitter("cometTrail");
    gameObjects['comet2'].speed = 50;
    gameObjects['comet2'].name = "Comet 2";

// space station
    addGameObject('station', meshes['station'].clone(), 'spacecraft');
    gameObjects['station'].anim_r_y = 0.001;
    gameObjects['station'].targetable = true;
    gameObjects['station'].animated = true;
    gameObjects['station'].moveable = true;
    gameObjects['station'].orbital = 90;
    gameObjects['station'].orbitRadius = 250;
    gameObjects['station'].speed = 15;
    gameObjects['station'].name = "Space station Alpha";
    gameObjects['station'].orbit(gameObjects['planet3']);
    addGameObject('stationLightSource', new THREE.PointLight(0xDDDDFF, 20, 80), 'light');
    gameObjects['station'].followers.push(gameObjects['stationLightSource']);
//    addGameObject('stationShields', new THREE.Mesh(new THREE.SphereGeometry(60, 30, 30), materials['shieldsMaterial']));
//    gameObjects['stationShields'].setScale(1, 0.5, 1);
//    gameObjects['station'].followers.push(gameObjects['stationShields']);

    // Dependents
    gameObjects['ship2'].target = gameObjects['asteroid1'];
    gameObjects['ship2'].orbit(gameObjects['asteroid1']);

    gameObjects['ship3'].target = gameObjects['asteroid2'];
    gameObjects['ship3'].orbit(gameObjects['asteroid2']);
}

function randomZone(id) {
    system = new zone(id);

    system.addRndObj('sun');

    system.addRndObj('sky');

    system.addRndObj('planet');
    system.addRndObj('planet');
    system.addRndObj('planet');
    system.addRndObj('planet');
    system.addRndObj('planet');
    system.addRndObj('planet');

    system.addRndObj('moon');
    system.addRndObj('moon');
    system.addRndObj('moon');
    system.addRndObj('moon');
    system.addRndObj('moon');
    system.addRndObj('moon');
    system.addRndObj('moon');
    system.addRndObj('moon');

    system.addRndObj('asteroid');
    system.addRndObj('asteroid');
    system.addRndObj('asteroid');
    system.addRndObj('asteroid');
    system.addRndObj('asteroid');
    system.addRndObj('asteroid');
    system.addRndObj('asteroid');
    system.addRndObj('asteroid');
    system.addRndObj('asteroid');

    system.addRndObj('comet');
    system.addRndObj('comet');
    system.addRndObj('comet');

    system.addRndObj('station');
    system.addRndObj('station2');
//    system.addRndObj('station3');
//
    system.addRndObj('drone');
    system.addRndObj('drone');
}

function zone(id) {
    this.name = "Jarvan";
    this.sky = null;
    this.sun = null;
    this.planets = new Array();
    this.moons = new Array();
    this.asteroids = new Array();
    this.spacecraft = new Array();
    this.comets = new Array();

    this.addRndObj = function (type) {
        switch (type) {
            case "sky":
                var mats = new Array('neb1', 'neb2', 'stars', 'stary1', 'stary1', 'neb1');
                var matIndex = mats[Math.floor(Math.random() * mats.length)]
                var material = materials["sky-" + matIndex].clone();
                material.color = gameObjects['sun'].color;

                var m = false;
                if (material.name == "sky-neb1") {
                    m = Math.ceil(Math.random() + 0.6);
                }
                if (material.name == "sky-neb2") {
                    m = Math.ceil(Math.random() * 1 + 1);
                }
                if (material.name == "sky-teal") {
                    m = Math.ceil(Math.random() * 1 + 1);
                }
                if (material.name == "sky-spiral") {
                    m = 2;
                }
                if (material.name == "sky-stars") {
                    m = Math.ceil(Math.random() * 10 + 5);
                }
                if (material.name == "sky-stary1") {
                    m = Math.ceil(Math.random() * 5 + 2);
                }

                if (m) {
                    material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
                    material.map.repeat.x = material.map.repeat.y = m;
                }

                addGameObject('sky', new THREE.Mesh(new THREE.SphereGeometry(renderDistance - 500, 25, 40), material), 'sky');
                gameObjects['sky'].mesh.material.shininess = 100;
                gameObjects['sky'].mesh.material.side = THREE.DoubleSide;
                gameObjects['sky'].mesh.material.fog = false;
                gameObjects['sky'].anim_r_y = 0.0001;
                gameObjects['sky'].animated = true;

                ship.mesh.children[0].material.materials[1].map = material.map;
                break;

            case "sun":
                var size = Math.random() * 50 + 25;
                var r = Math.random() + 1;
                var g = Math.random() + 1;
                var b = Math.random() + 1;
                var color = new THREE.Color();
                color.setHSL(r/2, g/3, b);
                var color2 = new THREE.Color();
                color2.setHSL(r, g/2, 1);

                pSystems.sunFlares.colorTween = new Tween([0.25, 1], [ new THREE.Vector3(r / 5, g / 5, b / 5), new THREE.Vector3(r / 2, g / 3, b / 3) ]);
                pSystems.starfield.colorTween = new Tween([0.25, 1], [ new THREE.Vector3(r / 5, g / 5, b / 5), new THREE.Vector3(r / 2, g / 3, b / 3) ]);

                var sunGeometry = new THREE.SphereGeometry(size, 20, 20);
                addGameObject('sun', new THREE.Mesh(sunGeometry, materials['sunMaterial']), 'sun');
                gameObjects['sun'].color = color2;
                gameObjects['sun'].size = size;
                gameObjects['sun'].anim_r_y = 0.005;
                gameObjects['sun'].animated = true;
                gameObjects['sun'].targetable = true;
                gameObjects['sun'].orbital = size * 5;
                gameObjects['sun'].addEmitter("sunFlares");
                gameObjects['sun'].addEmitter("solarWind");
                gameObjects['sun'].name = this.name;

                sunLight = new THREE.PointLight(color2, 2.5, 45000);
                sunLight.position.set(0, 0, 0);
                addGameObject('sunLight', sunLight, 'light');
                system.sun = gameObjects['sun'];
                break;

            case "planet":
                var id = "planet" + (this.planets.length + 1);
                var size = Math.random() * 300 + 50;
                var distance = Math.random() * 34000 + 1000;
                var name = 'planet' + (this.planets.length+1);
                var romans = new Array("", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X");

                addGameObject(id, new THREE.Mesh(new THREE.SphereGeometry(size, 20, 20), materials["planets-" + name]), 'planet');
                gameObjects[id].size = size;
                gameObjects[id].anim_r_y = Math.random() / 200;
                gameObjects[id].targetable = true;
                gameObjects[id].animated = true;
                gameObjects[id].moveable = true;
                gameObjects[id].orbital = size * 5;
                gameObjects[id].orbit(gameObjects['sun']);
                gameObjects[id].orbitRadius = distance;
                gameObjects[id].speed = distance / 40;
                gameObjects[id].name = this.name + " " + romans[(this.planets.length)];

                if (distance > 12000 && distance < 28000) {
                    // m class
                    addGameObject(id + '_atmosphere', new THREE.Mesh(new THREE.SphereGeometry(size + (size * 0.015), 20, 20), materials['atmosphere']), 'atmosphere');
                    gameObjects[id].followers.push(gameObjects[id + '_atmosphere']);
                }

                this.planets.push(gameObjects[id]);
                break;

            case "moon":
                var id = "moon" + this.moons.length;
                var planetId = Math.floor(Math.random() * this.planets.length)
                var planet = this.planets[planetId];
                var size = (Math.random() * planet.size) * 0.2 + 10;
                var distance = (planet.size * 6) + (Math.random() * planet.size * 3);
                var alphabet = new Array("", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J");
                addGameObject(id, new THREE.Mesh(new THREE.SphereGeometry(size, 15, 15), materials["moons-moon" + this.moons.length]), 'moon');

                gameObjects[id].size = size;
                gameObjects[id].anim_r_y = Math.random() / 200;
                gameObjects[id].targetable = true;
                gameObjects[id].animated = true;
                gameObjects[id].moveable = true;
                gameObjects[id].orbital = size * 3;
                gameObjects[id].orbit(planet);
                gameObjects[id].orbitRadius = distance;
                gameObjects[id].speed = distance / 20;
                gameObjects[id].name = planet.name + " - " + alphabet[planet.orbiters];
                this.moons.push(gameObjects[id]);
                break;

            case "asteroid":
                var id = "asteroid" + this.asteroids.length;
                var planetId = Math.floor(Math.random() * this.planets.length)
                var planet = this.planets[planetId];
                var size = (Math.random() * 10) + 5;
                var distance = (planet.size * 8) + (Math.random() * planet.size * 6);
                var r = Math.random();
                var g = Math.random();
                var b = Math.random();
                var mats = new Array('iron', 'iron', 'ruby', 'stone', 'yellow', 'iron', 'cracks', 'ice1', 'ice2');
                var mat = "planet-" + mats[Math.floor(Math.random() * mats.length)];
                var color = new THREE.Color;
                color.setRGB(r, g, b);
                var alphabet = new Array("", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J");

                addGameObject(id, new THREE.Mesh(new THREE.SphereGeometry(size, 10, 10), materials[mat].clone()), 'asteroid');
                gameObjects[id].mesh.material.color = color;
                gameObjects[id].size = size;
                gameObjects[id].anim_r_y = Math.random() / 200;
                gameObjects[id].targetable = true;
                gameObjects[id].animated = true;
                gameObjects[id].moveable = true;
                gameObjects[id].orbital = size * 3;
                gameObjects[id].orbit(planet);
                gameObjects[id].orbitRadius = distance;
                gameObjects[id].speed = distance / 20;
                gameObjects[id].name = "Asteroid " + planet.name + " - " + alphabet[planet.orbiters];
                this.asteroids.push(gameObjects[id]);
                break;

            case "comet":
                var id = "comet" + this.comets.length;
                var size = Math.random() * 20 + 5;
                var distance = Math.random() * 24000 + 10000;
                var mats = new Array('ice1', 'ice2', 'grey');
                var mat = "planet-" + mats[Math.floor(Math.random() * mats.length)];
                var r = Math.random() * 5 + 5;
                addGameObject(id, new THREE.Mesh(new THREE.SphereGeometry(size, r, r), materials[mat].clone()), 'comet');
                gameObjects[id].size = size;
                gameObjects[id].anim_r_y = Math.random() / 200;
                gameObjects[id].targetable = true;
                gameObjects[id].animated = true;
                gameObjects[id].moveable = true;
                gameObjects[id].orbital = size * 5;
                gameObjects[id].orbit(gameObjects['sun']);
                gameObjects[id].orbitRadius = distance;
                gameObjects[id].speed = distance / 40;
                gameObjects[id].name = "Comet " + (this.comets.length + 1);
                gameObjects[id].addEmitter("cometTrail");
                this.comets.push(gameObjects[id]);
                break;

            case "station":
                var id = "station";
                addGameObject(id, meshes['station'].clone(), 'spacecraft');
                gameObjects[id].anim_r_y = 0.001;
                gameObjects[id].targetable = true;
                gameObjects[id].animated = true;
                gameObjects[id].moveable = true;
                gameObjects[id].orbital = 120;
                gameObjects[id].orbitRadius = gameObjects['planet3'].size * 3;
                gameObjects[id].speed = 15;
                gameObjects[id].name = "Space station Alpha";
                gameObjects[id].orbit(gameObjects['planet3']);
                addGameObject('stationLightSource', new THREE.PointLight(0xDDDDFF, 20, 80), 'light');
                gameObjects[id].followers.push(gameObjects['stationLightSource']);
                addGameObject('stationShields', new THREE.Mesh(new THREE.SphereGeometry(60, 30, 30), materials['shieldsMaterial']), 'shields');
                gameObjects['stationShields'].setScale(1, 0.5, 1);
                gameObjects[id].followers.push(gameObjects['stationShields']);
                gameObjects[id].mesh.children[0].material.materials[1].map = gameObjects['sky'].mesh.material.map;
                break;

            case "station2":
                var id = "station2";
                addGameObject(id, meshes['station2'].clone(), 'spacecraft');
                gameObjects[id].anim_r_y = 0.001;
                gameObjects[id].targetable = true;
                gameObjects[id].animated = true;
                gameObjects[id].moveable = true;
                gameObjects[id].orbital = 120;
                gameObjects[id].orbitRadius = gameObjects['planet2'].size * 3;
                gameObjects[id].speed = 15;
                gameObjects[id].name = "Space station Beta";
                gameObjects[id].orbit(gameObjects['planet2']);
                addGameObject('stationLightSource2', new THREE.PointLight(0xDDDDFF, 20, 80), 'light');
                gameObjects[id].followers.push(gameObjects['stationLightSource2']);
                addGameObject('stationShields2', new THREE.Mesh(new THREE.SphereGeometry(60, 30, 30), materials['shieldsMaterial']), 'shields');
                gameObjects['stationShields2'].setScale(1, 0.5, 1);
                gameObjects[id].followers.push(gameObjects['stationShields2']);
                gameObjects[id].mesh.children[0].material.materials[2].map = gameObjects['sky'].mesh.material.map;
                break;

            case "station3":
                var id = "station3";
                addGameObject(id, meshes['station3'].clone(), 'spacecraft');
                gameObjects[id].anim_r_y = 0.001;
                gameObjects[id].targetable = true;
                gameObjects[id].animated = true;
                gameObjects[id].moveable = true;
                gameObjects[id].orbital = 120;
                gameObjects[id].orbitRadius = gameObjects['planet1'].size * 3;
                gameObjects[id].speed = 15;
                gameObjects[id].name = "Space station Gamma";
                gameObjects[id].orbit(gameObjects['planet1']);
                addGameObject('stationLightSource3', new THREE.PointLight(0xDDDDFF, 20, 80), 'light');
                gameObjects[id].followers.push(gameObjects['stationLightSource3']);
                addGameObject('stationShields3', new THREE.Mesh(new THREE.SphereGeometry(60, 30, 30), materials['shieldsMaterial']), 'shields');
                gameObjects['stationShields3'].setScale(1, 0.5, 1);
                gameObjects[id].followers.push(gameObjects['stationShields3']);
                gameObjects[id].mesh.children[0].material.materials[2].map = gameObjects['sky'].mesh.material.map;
                break;

            case "drone":
                var id = "drone" + this.spacecraft.length;
                var asteroidId = Math.floor(Math.random() * this.asteroids.length)
                var asteroid = this.asteroids[asteroidId];
                addGameObject(id, meshes['ship2'].clone(), 'spacecraft');
                gameObjects[id].anim_r_y = 0.001;
                gameObjects[id].targetable = true;
                gameObjects[id].animated = true;
                gameObjects[id].moveable = true;
                gameObjects[id].orbital = 120;
                gameObjects[id].orbitRadius = 100;
                gameObjects[id].speed = 15;
                gameObjects[id].name = "Mining Drone " + (this.spacecraft.length + 1).toString();
                gameObjects[id].addEmitter("drone");
                gameObjects[id].target = asteroid;
                gameObjects[id].orbit(asteroid);
                this.spacecraft.push(gameObjects[id]);

//                addGameObject('stationShields', new THREE.Mesh(new THREE.SphereGeometry(60, 30, 30), materials['shieldsMaterial']), 'shields');
//                gameObjects['stationShields'].setScale(1, 0.5, 1);
//                gameObjects[id].followers.push(gameObjects['stationShields']);
                break;

        }
    }
}
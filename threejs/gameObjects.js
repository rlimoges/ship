/**
 * Created with JetBrains PhpStorm.
 * User: Robert
 * Date: 8/4/13
 * Time: 9:01 PM
 * To change this template use File | Settings | File Templates.
 */

function buildGameObjects() {
    loadZone();
    guiInitTargetList();
}

function addGameObject(id, obj, type) {
    gameObjects[id] = new gameObject(id, obj, type);
    meshes.push(gameObjects[id].mesh);
    scene.add(gameObjects[id].mesh);
}

function gameObject(id, sceneObj, type) {
    this.id = id;
    this.mesh = sceneObj;
    this.size = 1;
    this.type = type;
    //this.mesh.updateMatrixWorld(true);
    this.mesh._gameObject = id;
    this.name = id;
    this.targetable = false;
    this.target;
    this.animated = false;
    this.hasEmitters = false;
    this.emitters = new Array();
    this.thrustersOn = false;
    this.weaponsOn = false;
    this.shieldsOn = false;
    this.firing = false;
    this.moveable = false;
    this.orbital = 100;
    this.orbiting = false;
    this.orbitRadius;
    this.followers = new Array();
    this.speed = 10;
    this.orbiters = 0; // num of objects orbiting this one
    this.lookingAt = null;

    this.lastPosition = this.mesh.position;

    this.setPosition = function (nx, ny, nz) {
        this.mesh.position.set(nx, ny, nz);
    };
    this.setPositionV = function (v) {
        this.mesh.position.set(v.x, v.y, v.z);
    };

    this.getPosition = function () {
        return this.mesh.position
    };

    this.setRotation = function (x, y, z) {
        this.mesh.rotation.set(x, y, z);
    };

    this.setScale = function (x, y, z) {
        this.mesh.scale.set(x, y, z);
    };

    this.getDistance = function () {
        return Math.ceil(ship.mesh.position.distanceTo(this.mesh.position));
    };

    this.getDistanceToObj = function (target) {
        return Math.ceil(this.mesh.position.distanceTo(target.mesh.position));
    };

    this.updateAnimations = function () {
        if (this.anim_r_y != 0) {
            this.mesh.rotation.y += this.anim_r_y;

            if (this.followers.length > 0) {
                for (i = 0; i < this.followers.length; i++) {
                    this.followers[i].mesh.rotation.y += this.anim_r_y;
                }
            }
        }
    };

    this.orbit = function (obj) {
        this.orbiting = obj;
        obj.orbiters += 1;
    };

    this.targetObj = function () {
        if(this.targetable && ship.target != this) {
            ship.target = this;
            if (this == ship) {
                guiUpdateTarget(this);
            }
            ship.lookAt(this.mesh.position);
            gameObjects['shields'].lookAt(this.mesh.position);

            if ($(".targetList").hasClass('open')) {
                toggleTargetList();
            }
            $(".btn.scan").hide(0);
            controls.exitZoom();
        }
    };

    this.lookAt = function (tp) {
        this.lookingAt = tp;
        this.mesh.lookAt(tp);
    };

    this.updatePosition = function () {
        // Has something targeted
        if (this.target) {
            if (this.target.mesh) {
                if (this.target.getDistance() > this.target.orbital && this.thrustersOn) {
                    this.lastPosition = this.mesh.position;
                    var np = this.getMidPoint(this.getPosition(), this.target.getPosition(), 500);
                    gameObjects['ship'].setPosition(np.x, np.y, np.z);
                }
                this.lookAt(this.target.mesh.position);
                if (this == ship) {
                    guiUpdateTarget(this.target);
                }

            }
        }

        // Orbiting something
        if (this.orbiting) {
            var nx = this.orbiting.mesh.position.x - Math.sin(elapsedTime / this.speed) * this.orbitRadius;
            var ny = this.orbiting.mesh.position.y - Math.cos(elapsedTime / this.speed) * this.orbitRadius;
            var nz = this.orbiting.mesh.position.z - Math.cos(elapsedTime / this.speed + this.orbitRadius) * this.orbitRadius;
            this.mesh.position = new THREE.Vector3(nx, ny, nz);
        }

        // Have the followers follow
        if (this.followers.length > 0) {
            for (i = 0; i < this.followers.length; i++) {
                this.followers[i].mesh.position = this.mesh.position;
                if (this.lookingAt) {
                    this.followers[i].mesh.lookAt(this.lookingAt);
                }
            }
        }
    };

    this.getMidPoint = function (v1, v2, byass) {
        return new THREE.Vector3(
            (v1.x * byass + v2.x) / (byass + 1),
            (v1.y * byass + v2.y) / (byass + 1),
            (v1.z * byass + v2.z) / (byass + 1)
        );
    };

    this.addEmitter = function (type, positionOffset, anchorPoint) {
        this.hasEmitters = true;

        var emitter = new ParticleEngine();

        switch (type) {
            case"thruster":
                emitter.settings = pSystems.thrusters;
                break;
            case"laser":
                emitter.settings = pSystems.lasers;
                break;
            case"headlight":
                emitter.settings = pSystems.headlights;
                break;
            case"solarWind":
                emitter.settings = pSystems.starfield;
                break;
            case"sunFlares":
                emitter.settings = pSystems.sunFlares;
                break;
            case"cometTrail":
                emitter.settings = pSystems.cometTrail;
                break;
            case"drone":
                emitter.settings = pSystems.drone;
                break;

        }

        emitter.setValues(emitter.settings);
        emitter.type = type;
        if (anchorPoint) {
            emitter.anchorPoint = anchorPoint;
        }
        if (positionOffset) {
            emitter.positionOffset = positionOffset;
            emitter.positionBase = this.getEmitterPosition(emitter);
        }

        emitter.initialize();
        this.emitters.push(emitter);
    };

    this.removeEmitter = function (type) {
        for (var system in this.emitters) {
            if (this.emitters[system].type == type || type == "all") {
                this.emitters[system].destroy();
            }
        }
    };

    this.updateEmitters = function () {
        if (this.hasEmitters) {
            for (var system in this.emitters) {
                var emitter = this.emitters[system];
                if (emitter.positionOffset || this.moveable) {
                    emitter.positionBase = this.getEmitterPosition(emitter);
                }

                if (emitter.anchorPoint) {
                    if (emitter.type == "thruster" && this.thrustersOn) {
                        emitter.update(delta);
                    }
                    //if(emitter.type == "laser" && this.weaponsOn){ emitter.update(delta); }
                    if (emitter.type == "headlight" && this.weaponsOn) {
                        emitter.update(delta);
                    }
                } else {
                    emitter.update(delta);
                }
            }
        }
    };

    this.getEmitterPosition = function (emitter) {
        if (emitter.anchorPoint) {
            var objMesh = this.mesh.children[emitter.anchorPoint];
            objMesh.geometry.computeBoundingBox();

            var boundingBox = objMesh.geometry.boundingBox;
            var position = new THREE.Vector3();
            position.subVectors(boundingBox.max, boundingBox.min);
            position.multiplyScalar(0.5);
            position.add(boundingBox.min);
            position.applyMatrix4(objMesh.matrixWorld);
        } else {
            position = this.mesh.position;
        }

        return position;
    };

    this.getEmitterVelocity = function (emitter) {
        var eposition = this.getEmitterPosition(emitter);
//
//        if(this.target && this.firing && (emitter.type=="laser" || emitter.type=="headlight")){
//            var velocity = eposition.multiply(this.target.mesh.position);
//        } else {
//
//            var velocity = eposition.multiplyScalar(emitter.velocityScalar);
//        }

        //velocity = this.getMidPoint(eposition, this.lastPosition);
        var velocity = this.getMidPoint(eposition, this.mesh.position, 1);
        velocity = new THREE.Vector3(0, 0, 0);
        return velocity;
    };

    this.powerSystems = function () {
        //Shields
        this.systemsToggle('shields', false);

        // Thrusters
        //this.systemsToggle('thrusters', false);

        // Weapons
        //this.systemsToggle('weapons', true);

        for (var emitter in this.mesh.children) {
            if (this.mesh.children[emitter]) {
                this.mesh.children[emitter].visible = false;
            }
        }

        this.mesh.children[0].visible = true;

    };

    this.systemsToggle = function (system, state) {
        switch (system) {
            case "shields":
                this.shieldsOn = state;
                if (this.shieldsOn) {
                    scene.add(gameObjects['shields'].mesh);
                } else {
                    scene.remove(gameObjects['shields'].mesh);
                }
                break;

            case "thrusters":
                this.thrustersOn = state;
                if (this.thrustersOn) {
                    this.addEmitter('thruster', new THREE.Vector3(-2.9, 0.4, -2), 1);
                    this.addEmitter('thruster', new THREE.Vector3(0, 0.4, -2.7), 2);
                    this.addEmitter('thruster', new THREE.Vector3(2.9, 0.4, -2), 3);
                } else {
                    this.removeEmitter('thruster');
                }
                break;

            case "weapons":
                this.weaponsOn = state;
                if (this.weaponsOn) {
                    this.addEmitter('laser', new THREE.Vector3(0, 1, 3.5), 4);
                    this.addEmitter('laser', new THREE.Vector3(-2.2, 0.5, 1.7), 5);
                    this.addEmitter('laser', new THREE.Vector3(2.2, 0.5, 1.7), 6);

                    this.addEmitter('headlight', new THREE.Vector3(0, 1, 3.4), 4);
                    this.addEmitter('headlight', new THREE.Vector3(-2.2, 0.5, 1.7), 5);
                    this.addEmitter('headlight', new THREE.Vector3(2.2, 0.5, 1.7), 6);
                } else {
                    this.removeEmitter('laser');
                    this.removeEmitter('headlight');
                }
                break;
        }
    };
}
/**
 * @author Lee Stemkoski   http://www.adelphi.edu/~stemkoski/
 */

/* 
 Particle Engine options:

 positionBase   : new THREE.Vector3(),
 positionStyle : Type.CUBE or Type.SPHERE,

 // for Type.CUBE
 positionSpread  : new THREE.Vector3(),

 // for Type.SPHERE
 positionRadius  : 10,

 velocityStyle : Type.CUBE or Type.SPHERE,

 // for Type.CUBE
 velocityBase       : new THREE.Vector3(),
 velocitySpread     : new THREE.Vector3(),

 // for Type.SPHERE
 speedBase   : 20,
 speedSpread : 10,

 accelerationBase   : new THREE.Vector3(),
 accelerationSpread : new THREE.Vector3(),

 particleTexture : THREE.ImageUtils.loadTexture( '/ship/textures/star.png' ),

 // rotation of image used for particles
 angleBase               : 0,
 angleSpread             : 0,
 angleVelocityBase       : 0,
 angleVelocitySpread     : 0,
 angleAccelerationBase   : 0,
 angleAccelerationSpread : 0,

 // size, color, opacity
 //   for static  values, use base/spread
 //   for dynamic values, use Tween
 //   (non-empty Tween takes precedence)
 sizeBase   : 20.0,
 sizeSpread : 5.0,
 sizeTween  : new Tween( [0, 1], [1, 20] ),

 // colors stored in Vector3 in H,S,L format
 colorBase   : new THREE.Vector3(0.0, 1.0, 0.5),
 colorSpread : new THREE.Vector3(0,0,0),
 colorTween  : new Tween( [0.5, 2], [ new THREE.Vector3(0, 1, 0.5), new THREE.Vector3(1, 1, 0.5) ] ),

 opacityBase   : 1,
 opacitySpread : 0,
 opacityTween  : new Tween( [2, 3], [1, 0] ),

 blendStyle    : THREE.NormalBlending (default), THREE.AdditiveBlending

 particlesPerSecond : 200,
 particleDeathAge   : 2.0,
 emitterDeathAge    : 60
 */

pSystems = {
    starfield: {
        positionStyle: Type.CUBE,
        positionBase: new THREE.Vector3(0, 0, 0),
        positionSpread: new THREE.Vector3(-500, -500, -500),

        velocityStyle: Type.CUBE,
        //velocityBase: new THREE.Vector3(200, 200, 200),
        velocitySpread: new THREE.Vector3(1000, 1000, 1000),

        opacityTween: new Tween([0, 0.5, 2.5, 3], [0, 1, 1, 0]),
        colorTween: new Tween([0, 3], [ new THREE.Vector3(1, 0, 0.25), new THREE.Vector3(1, 1, 0.25) ]),
        sizeTween: new Tween([0,3], [10, 120]),

        particleTexture: textures['particle-spikey'],
        particlesPerSecond: 5,
        particleDeathAge: 3,
        emitterDeathAge: 999999,

        blendStyle: THREE.AdditiveBlending
    },

    drone: {
        positionStyle: Type.CUBE,
        positionBase: new THREE.Vector3(0, 0, 0),
        positionSpread: new THREE.Vector3(-20, -20, -20),

        velocityStyle: Type.CUBE,
        //velocityBase: new THREE.Vector3(200, 200, 200),
        velocitySpread: new THREE.Vector3(40, 40, 40),

        opacityTween: new Tween([0, 0.25, 0.75, 2], [0, 1, 1, 0]),
        colorTween: new Tween([0, 2], [ new THREE.Vector3(0.1, 0, 0.25), new THREE.Vector3(1, 1, 1) ]),
        sizeTween: new Tween([0,2], [8, 0]),

        particleTexture: textures['particle-spikey'],
        particlesPerSecond: 3,
        particleDeathAge: 2.25,
        emitterDeathAge: 999999,

        blendStyle: THREE.AdditiveBlending
    },

    sunFlares: {
        positionStyle: Type.CUBE,
        positionBase: new THREE.Vector3(0, 0, 0),
        positionSpread: new THREE.Vector3(-30, -30, -30),

        velocityStyle: Type.CUBE,
        velocityBase: new THREE.Vector3(0, 0, 0),
        velocitySpread: new THREE.Vector3(30, 30, 30),

        opacityTween: new Tween([0, 1, 2], [0, 1, 0]),
        colorTween: new Tween([0.25, 1], [ new THREE.Vector3(0.02, 1, 0.5), new THREE.Vector3(0.05, 1, 0.2) ]),
        sizeTween: new Tween([0,1], [1500, 4000]),

        particleTexture: textures['particle-spikey'],
        particlesPerSecond: 5,
        particleDeathAge: 15,
        emitterDeathAge: 999999,

        blendStyle: THREE.AdditiveBlending
    },

    cometTrail: {
        positionStyle: Type.SPHERE,
        positionBase: new THREE.Vector3(0, 0, 0),
        positionSpread: new THREE.Vector3(20, 20, 20),
        positionRadius: 0,

        velocityStyle: Type.CUBE,
        velocityScalar: 0.25,
        velocitySpread: new THREE.Vector3(20,20,20),


        particleTexture: textures['particle-smoke'],

        sizeTween: new Tween([0,1], [20, 120]),
        opacityTween  : new Tween( [0, 1], [.5, 0] ),
        colorTween: new Tween([0.15, 1], [ new THREE.Vector3(0.15, 0.15, 0.9), new THREE.Vector3(0.8, 0.8, 1) ]),

        blendStyle: THREE.AdditiveBlending,

        particlesPerSecond: 10,
        particleDeathAge: 2,
        emitterDeathAge: 999999
    },

    thrusters: {
        positionStyle: Type.SPHERE,
        positionBase: new THREE.Vector3(0, 0, 0),
        positionRadius: 0,

        velocityStyle: Type.CUBE,
        velocityScalar: 0.25,

        particleTexture: textures['particle-smoke'],

        sizeTween: new Tween([0, 0.25], [0.3, 25]),
        opacityTween  : new Tween( [0, 0.25], [0.75, 0] ),
        colorTween: new Tween([0, 1], [ new THREE.Vector3(0.02, 1, 0.5), new THREE.Vector3(0.05, 1, 0) ]),
        blendStyle: THREE.AdditiveBlending,

        particlesPerSecond: 25,
        particleDeathAge: 3,
        emitterDeathAge: 999999
    },

    lasers: {
        positionStyle: Type.SPHERE,
        positionBase: new THREE.Vector3(0, 0, 0),
        positionRadius: 0,

        velocityStyle: Type.CUBE,
        velocitySpread: new THREE.Vector3(0, 0, 0),
        velocityScalar: 0.1,

        particleTexture: textures['particle-spark'],

        sizeTween: new Tween([0,1], [2.5, 1, 1]),
        opacityTween: new Tween([0.15, 5], [2, 2]),
        colorTween: new Tween([0.25, 1.0], [ new THREE.Vector3(0.02, 1, 0.5), new THREE.Vector3(0.05, 1, 0) ]),
        blendStyle: THREE.AdditiveBlending,

        particlesPerSecond: 5,
        particleDeathAge: 0.15,
        emitterDeathAge: 9999
    },

    headlights: {
        positionStyle: Type.SPHERE,
        positionBase: new THREE.Vector3(0, 0, 0),
        positionRadius: 0,

        velocityStyle: Type.CUBE,
        velocitySpread: new THREE.Vector3(0, 0, 0),
        velocityScalar: 0.05,

        sizeBase: 2.5,
        sizeSpread: 0,

        particleTexture: textures['particle-spark'],


        opacityTween: new Tween([0,0.25], [1, 0]),
        colorTween: new Tween([0.25, 1.0], [ new THREE.Vector3(0.02, 0.02, 0.95), new THREE.Vector3(0.05, 0.02, 0) ]),

        blendStyle: THREE.AdditiveBlending,

        particlesPerSecond: 10,
        particleDeathAge: 0.25,
        emitterDeathAge: 9999
    }

}
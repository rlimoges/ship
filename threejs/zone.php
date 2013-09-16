var system;
function loadZone() {
    addGameObject('ship', meshes['ship'].clone(), 'spacecraft');
    ship = gameObjects['ship'];
    addGameObject('shields', new THREE.Mesh(new THREE.SphereGeometry(6.5, 30, 15), materials['shieldsMaterial']));
    gameObjects['shields'].setScale(0.7, 0.35, 0.9);
    ship.followers.push(gameObjects['shields']);
    ship.setPosition(600, 600, 600);
    ship.powerSystems();
    ship.moveable = true;


<?php
    if(isset($_GET['id'])){
        echo "randomZone(" . $_GET['id'] . ");";
    } else {
        echo "debulon();";
    }
?>


}


/**
 * Created with JetBrains PhpStorm.
 * User: Robert
 * Date: 8/5/13
 * Time: 12:05 PM
 * To change this template use File | Settings | File Templates.
 */

function onDocumentMouseDown( event ) {
    event.preventDefault();

    var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
    projector.unprojectVector( vector, camera );

    var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
    var intersects = raycaster.intersectObjects( meshes );

    if ( intersects.length > 0 ) {
        for(i=0; i < intersects.length; i++){
            target = intersects[i].object._gameObject;
            if(gameObjects[target].targetable){
                gameObjects[target].targetObj();
            }
        }
    }


}

function onKeyDown(event) {
    switch (event.keyCode) {
        case 87:
            ship.systemsToggle('thrusters', !ship.thrustersOn);
            break;
    }
}

function onKeyUp(event) {
//    switch (event.keyCode) {
//        case 87: // Forward thrust
//            ship.systemsToggle('thrusters', false);
//            break;
//
//    }

}

function onWindowResize(event) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

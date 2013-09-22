var textures = new Array();

function addTexture(id, fn, rx, ry){
    var texture = new THREE.ImageUtils.loadTexture('textures/' + fn);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.name = id;
    textures[id]=texture;
}

function loadTextures(){
    <?php

        function importDir($path, $n){
            if ($handle = opendir($path)) {
                while (false !== ($fn = readdir($handle))) {
                    if ($fn != "." && $fn != "..") {
                        $name = $fn;
                        $name=str_replace(".jpg", "", $name);
                        $name=str_replace(".png", "", $name);
                        $name = $n . "-" . $name;
                        $fn = $n . '/' .  $fn;
                        echo "addTexture('$name', '$fn' ,1,1); \n";
                    }
                }
                closedir($handle);
            }
        }

        //$path = 'c:\wampSLT\data\htdocs\ship';
        $path = 'c:\xampp\htdocs\ship';

        importDir($path . '\textures\particle', 'particle');
        importDir($path . '\textures\planet', 'planet');
        importDir($path . '\textures\sky', 'sky');
        importDir($path . '\textures\structure', 'structure');

    

    ?>
}

loadTextures();
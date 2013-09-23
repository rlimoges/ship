<?php
//$path = 'c:\wampSLT\data\htdocs\ship';
$path = 'd:\xampp\htdocs\ship';

function importDir($path, $n)
{
    if ($handle = opendir($path)) {
        while (false !== ($fn = readdir($handle))) {
            if ($fn != "." && $fn != "..") {
                $name = $fn;
                $name = str_replace(".jpg", "", $name);
                $name = str_replace(".png", "", $name);
                $name = $n . "-" . $name;
                $fn = $n . '/' . $fn;
                echo "addTexture('$name', '$fn' ,1,1); \n\t";
            }
        }
        closedir($handle);
    }
}

print "var textures = new Array();";
print "function addTexture(id, fn, rx, ry){var texture = new THREE.ImageUtils.loadTexture('textures/' + fn); texture.wrapS = texture.wrapT = THREE.RepeatWrapping; texture.name = id; textures[id]=texture; } ";

importDir($path . '\textures\particle', 'particle');
importDir($path . '\textures\sky', 'sky');
importDir($path . '\textures\structure', 'structure');
importDir($path . '\textures\moons', 'moons');
importDir($path . '\textures\planets', 'planets');
importDir($path . '\textures\planet', 'planet');
?>
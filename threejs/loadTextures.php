<?php
//$path = 'c:\wampSLT\data\htdocs\ship';
$path = dirname(dirname(__FILE__));

function importDir($path, $n, $x, $y)
{
    if ($handle = opendir($path)) {
        while (false !== ($fn = readdir($handle))) {
            if ($fn != "." && $fn != "..") {
                $name = $fn;
                $name = str_replace(".jpg", "", $name);
                $name = str_replace(".png", "", $name);
                $name = $n . "-" . $name;
                $fn = $n . '/' . $fn;
                echo "addTexture('$name', '$fn' , $x, $y); \n\t";
            }
        }
        closedir($handle);
    }
}

print "var textures = new Array();";
print "function addTexture(id, fn, rx, ry){var texture = new THREE.ImageUtils.loadTexture('textures/' + fn); texture.wrapS = texture.wrapT = THREE.RepeatWrapping; texture.repeat.set(rx, ry); texture.name = id; textures[id]=texture; } ";

importDir($path . '/textures/particle', 'particle', 1, 1);
importDir($path . '/textures/sky', 'sky', 1, 1);
importDir($path . '/textures/structure', 'structure', 1, 1);
importDir($path . '/textures/planet', 'planet', 1, 1);

importDir($path . '/textures/moons', 'moons', 1, 1);
importDir($path . '/textures/planets', 'planets', 1, 1);

?>
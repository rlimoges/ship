<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Robert
 * Date: 9/22/13
 * Time: 9:57 PM
 * To change this template use File | Settings | File Templates.
 */

$systems = array(
    "Vargas", "Debulon", "Jarvan", "Atlayis", "Porthos", "Zergon", "Verulon", "Vuela", "Zargoth", "Panthar", "Protos", "Zebulon", "Targas", "Batlak", "GorBos"
);

$name = $systems[rand(0, count($systems) - 1)];
//print $name;

for ($i = 0; $i < 10; $i++) {
    $name = 'planet' . $i;
    createTexture('planets', $name);

    $name = 'moon' . $i;
    createTexture('moons', $name);
}

function createTexture($p, $fn){
    $path = 'http://localhost/ship/';
    $input = $path . 'galaxyBuilder/createTexture.php?fn=' . $fn . '&r=' . rand(0,65500);
    $output = '..\textures\\'. $p . '\\' . $fn . '.jpg';

    print $output;

    file_put_contents($output, file_get_contents($input));
}

?>
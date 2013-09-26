<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Robert
 * Date: 9/22/13
 * Time: 9:57 PM
 * To change this template use File | Settings | File Templates.
 */

if (isset($_GET['step'])) {
    $step = $_GET['step'];
} else {
    $step = 0;
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Galaxy Builder</title>
    <script src="../threejs/jquery.js"></script>

    <script type="text/javascript">
        $( document ).ready(function() {
            step = <?php print $step+1; ?>;
            if(step < 20){
                this.location.href = "build.php?step="+step;
            }
        });
    </script>
</head>
<body>


<?php

$systems = array(
    "Vargas", "Debulon", "Jarvan", "Atlayis", "Porthos", "Zergon", "Verulon", "Vuela", "Zargoth", "Panthar", "Protos", "Zebulon", "Targas", "Batlak", "GorBos"
);

$name = $systems[rand(0, count($systems) - 1)];
//print $name;

if ($step <= 10) {
    $name = 'planet' . $step;

    $types = array('hot', 'mclass', 'gasGiant', 'icy');
    $r = rand(0, count($types) - 1);
    $type = $types[$r];
    createTexture($type, $name);
}

if ($step >= 11 && $step <= 20) {
    $name = 'moon' . ($step - 10);
    createTexture('moon', $name);
}

function createTexture($type, $fn)
{
    if ($type == 'moon') {
        $folder = 'moons';
    } else {
        $folder = 'planets';
    }

    $path = 'http://localhost/ship/';
    $input = $path . 'galaxyBuilder/createTexture.php?type=' . $type . '&fn=' . $fn . '&r=' . rand(0, 65500);
    $output = '..\textures\\' . $folder . '\\' . $fn . '.jpg';

    print "<pre>\n";
    print "Building " . $fn . " \n\t";
    print $input . "\n\t";
    print $output . "\n";
    print "<img src='/ship/textures/" . $folder . "/" . $fn . ".jpg' alt='' width='1024' height='1024' />";
    print "</pre>\n";
    file_put_contents($output, file_get_contents($input));
}

?>


</body>
</html>
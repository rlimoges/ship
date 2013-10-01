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
        $(document).ready(function () {
            step = <?php print $step+1; ?>;
            if (step < 20) {
                this.location.href = "build.php?step=" + step;
            }
        });
    </script>
    <style type="text/css">
        body {
            background-color: #666666;
            margin: 0;
            padding: 0;
        }

        .infos {
            background-color: #333333;
            display: inline-block;
            position: relative;
            width: auto;
            top: 0;
            left: 0;
            color: white;
            font-family: arial, helvetica;
            z-index: 2;

            border: 1px solid white;
            border-radius: 20px;
            padding: 20px;
            margin: 20px;
        }

        img {
            margin: 20px 0 0 0;
        }
    </style>
</head>
<body>

<div class="infos">
    <?php

    $systems = array(
        "Vargas", "Debulon", "Jarvan", "Atlayis", "Porthos", "Zergon", "Verulon", "Vuela", "Zargoth", "Panthar", "Protos", "Zebulon", "Targas", "Batlak", "GorBos"
    );

    $name = $systems[rand(0, count($systems) - 1)];
    //print $name;

    if ($step <= 9) {
        $name = 'planet' . $step;

        $types = array('hot', 'mclass', 'gasGiant', 'icy');
        $r = rand(0, count($types) - 1);
        $type = $types[$r];
        createTexture($type, $name);
    }

    if ($step >= 10 && $step <= 20) {
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
//    $input = $path . 'galaxyBuilder/createTexture.php?type=' . $type . '&fn=' . $fn . '&r=' . rand(0, 65500);
        $input = $path . 'galaxyBuilder/createPlasma.php?type=' . $type . '&fn=' . $fn . '&r=' . rand(0, 65500);
        $output = '..\textures\\' . $folder . '\\' . $fn . '.png';

        print "<strong>Building : </strong>" . $fn . "<br/>";
        print "<strong>Type: </strong>" . $type . "<br/>";
        print "<strong>Input: </strong>" . $input . "<br/>";
        print "<strong>Output: </strong>" . $output . "<br/>";
        print "<img src='/ship/textures/" . $folder . "/" . $fn . ".png' alt='' /><br/>";
        file_put_contents($output, file_get_contents($input));
    }

    ?>

</div>
</body>
</html>
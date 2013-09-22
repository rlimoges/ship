<?php
    $width = $_GET['width'];
    $height = $_GET['height'];
    $mode = $_GET['mode'];

    $rstart = rand(1,100);
    $gstart = rand(1,100);
    $bstart = rand(1,100);

    $rend = rand(1,220);
    $gend = rand(1,220);
    $bend = rand(1,220);

    $r = $rstart;
    $g = $gstart;
    $b = $bstart;

    $bigger = imagecreatetruecolor($width, $height);

    $w2 = $width / 2;
    $h2 = $height / 2;

    for ($y = 0; $y <= $h2; $y++) {
        if ($mode == 'horiz') { //if doing a horizontal gradient, reset to the starting color every row
            $r = $rstart;
            $g = $gstart;
            $b = $bstart;
        }
        for ($x = 0; $x <= $width; $x++) {
            $rnd = 20;

            imagesetpixel($bigger, $x, $y, imagecolorallocate($bigger, $r+rand(0,$rnd), $g+rand(0,$rnd), $b+rand(0,$rnd)));
            imagesetpixel($bigger, $x, $height - $y, imagecolorallocate($bigger, $r+rand(0,$rnd), $g+rand(0,$rnd), $b+rand(0,$rnd)));
            if ($mode == "horiz") {
                if ($r != $rend) {
                    $r = $r + (($rend - $rstart) / $width);
                }
                if ($g != $gend) {
                    $g = $g + (($gend - $gstart) / $width);
                }
                if ($b != $bend) {
                    $b = $b + (($bend - $bstart) / $width);
                }
            }
        }
        if ($mode == "vert") {
            if ($r != $rend) {
                $r = $r + (($rend - $rstart) / $h2);
            }
            if ($g != $gend) {
                $g = $g + (($gend - $gstart) / $h2);
            }
            if ($b != $bend) {
                $b = $b + (($bend - $bstart) / $h2);
            }
        }
    }


s
    header("Content-type: image/jpeg");
    header('Content-Disposition: inline; filename="gradient.jpg"');

    imagejpeg($bigger, NULL, 80);
    imagedestroy($bigger);
?>
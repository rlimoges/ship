<?php
$fn = $_GET['fn'];
$type = $_GET['type'];
$width = 512;
$height = 512;

if($type == "planet") {
    $mode = 'vert';
    $noise = rand(0, 30);

    $rstart = rand(1, 100);
    $gstart = rand(1, 100);
    $bstart = rand(1, 100);

    $rend = rand(51, 200);
    $gend = rand(51, 200);
    $bend = rand(51, 200);

} else{
    $mode = 'vert';
    $noise = rand(20, 50);

    $rstart = rand(1, 60);
    $gstart = rand(1, 60);
    $bstart = rand(1, 60);

    $rend = rand(51, 120);
    $gend = rand(51, 120);
    $bend = rand(51, 120);
}


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
        imagesetpixel($bigger, $x, $y, imagecolorallocate($bigger, $r + rand(0, $noise), $g + rand(0, $noise), $b + rand(0, $noise)));
        imagesetpixel($bigger, $x, $height - $y, imagecolorallocate($bigger, $r + rand(0, $noise), $g + rand(0, $noise), $b + rand(0, $noise)));
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

header("Content-type: image/jpeg");
header('Content-Disposition: inline; filename=' . $fn . '".jpg"');

imagejpeg($bigger, NULL, 90);
imagedestroy($bigger);
?>
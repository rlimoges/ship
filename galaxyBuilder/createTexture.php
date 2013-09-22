<?php
$width = $_GET['width'];
$height = $_GET['height'];
$starts = explode(",", $_GET['startcolor']);
$ends = explode(",", $_GET['endcolor']);
$mode = $_GET['mode'];


$rstart = $starts[0];
$gstart = $starts[1];
$bstart = $starts[2];
$rend = $ends[0];
$gend = $ends[1];
$bend = $ends[2];
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
        imagesetpixel($bigger, $x, $y, imagecolorallocate($bigger, $r, $g, $b));
        imagesetpixel($bigger, $x, $height - $y, imagecolorallocate($bigger, $r, $g, $b));
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
header('Content-Disposition: inline; filename="gradient.jpg"');

imagejpeg($bigger, NULL, 80);
imagedestroy($bigger);
?>
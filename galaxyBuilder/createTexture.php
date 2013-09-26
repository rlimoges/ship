<?php
$fn = $_GET['fn'];
$type = $_GET['type'];
$width = 512;
$height = 512;

if ($type == "planet") {
    $noise = rand(1, 50);

    $rstart = rand(1, 250);
    $gstart = rand(1, 250);
    $bstart = rand(1, 250);

    $rend = rand(150, 250);
    $gend = rand(150, 250);
    $bend = rand(150, 250);
} else {
    $noise = rand(15, 30);

    $rstart = rand(1, 60);
    $gstart = rand(1, 30);
    $bstart = rand(1, 60);

    $rend = rand(51, 160);
    $gend = rand(51, 120);
    $bend = rand(51, 160);
}


$img = imagecreatetruecolor($width, $height);

// 1st pass
$lastr = 0;
$lastg = 0;
$lastb = 0;

$f=1;

for ($y = 0; $y <= $height; $y++) {
    for ($x = 0; $x <= $width; $x++) {
        if ($type == "planet") {
            if ($y > $height / 2) {
                $y2 = $y;
            } else {
                $y2 = $height - $y;
            }

            $r = $y2 * (($rend - $rstart) / $height);
            $g = $y2 * (($gend - $gstart) / $height);
            $b = $y2 * (($bend - $bstart) / $height);

            if($y2==0){
                $f = $y2 / rand(1, 250);
            }
            if($x==0){
                $f = $y2 / rand(1, 50);
            }

            $r2 = $r * cos($f + rand(1, 10));
            $g2 = $g * cos($f + rand(1, 10));
            $b2 = $b * cos($f + rand(1, 10));

            $averageCount = rand(3, 10);
        }
        if ($type == "moon") {
            if ($x > $width / 2) {
                $x2 = $x;
            } else {
                $x2 = $width - $x;
            }

            $r = $x2 * (($rend - $rstart) / $width);
            $g = $x2 * (($gend - $gstart) / $width);
            $b = $x2 * (($bend - $bstart) / $width);

            $f = $x2 / rand(1, 50);
            $r2 = $r * cos($f * 1.15);
            $g2 = $g * cos($f * 1.1);
            $b2 = $b * cos($f * 1.2);

            $averageCount = 1;
        }

        // Average out with last pixel
        $r2 = (($averageCount*$lastr) + $r2) / ($averageCount+1);
        $g2 = (($averageCount*$lastg) + $g2) / ($averageCount+1);
        $b2 = (($averageCount*$lastb) + $b2) / ($averageCount+1);

        // Add random noise
        $r2 = $r2 + rand(1, $noise);
        $g2 = $g2 + rand(1, $noise);
        $b2 = $b2 + rand(1, $noise);

        // Limit checks
        if ($r2 > 255) {
            $r2 = 255;
        }
        if ($g2 > 255) {
            $g2 = 255;
        }
        if ($b2 > 255) {
            $b2 = 255;
        }
        if ($r2 < 0) {
            $r2 = 0;
        }
        if ($g2 < 0) {
            $g2 = 0;
        }
        if ($b2 < 0) {
            $b2 = 0;
        }

        // paint the pixel
        $lastr = $r2;
        $lastg = $g2;
        $lastb = $b2;
        imagesetpixel($img, $x, $y, imagecolorallocate($img, $r2, $g2, $b2));
    }
}


header("Content-type: image/jpeg");
header('Content-Disposition: inline; filename=' . $fn . '".jpg"');

$r = rand(100, 200);
$g = rand(100, 200);
$b = rand(100, 200);
$a = rand(200, 255);

if ($type == "planet") {

    imagefilter($img, IMG_FILTER_SMOOTH, rand(10,100));
    imagefilter($img, IMG_FILTER_GAUSSIAN_BLUR, rand(150,220));
    imagefilter($img, IMG_FILTER_COLORIZE, $r, $g, $b);
} else {
    imagefilter($img, IMG_FILTER_EMBOSS, 1);
    imagefilter($img, IMG_FILTER_COLORIZE, $r, $g, $b);
    imagefilter($img, IMG_FILTER_GAUSSIAN_BLUR, 20);
}


imagejpeg($img, NULL, 90);
imagedestroy($img);
?>
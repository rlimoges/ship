<?php
$fn = $_GET['fn'];
$type = $_GET['type'];
$width = 1024;
$height = 1024;

if ($type == "mclass") {
    $noise = rand(1, 50);

    $rstart = rand(1, 250);
    $gstart = rand(1, 250);
    $bstart = rand(1, 250);

    $rend = rand(50, 150);
    $gend = rand(50, 150);
    $bend = rand(50, 150);

    $averageCount = 3;

}

if ($type == "hot") {
    $noise = rand(1, 50);

    $rstart = rand(50, 250);
    $gstart = rand(1, 150);
    $bstart = rand(1, 150);

    $rend = rand(50, 250);
    $gend = rand(50, 150);
    $bend = rand(50, 150);

    $averageCount = 3;

}

if ($type == "icy") {
    $noise = rand(5, 100);

    $rstart = rand(1, 150);
    $gstart = rand(1, 150);
    $bstart = rand(50, 250);

    $rend = rand(50, 150);
    $gend = rand(50, 150);
    $bend = rand(50, 150);

    $averageCount = 5;

}

if ($type == "gasGiant") {
    $noise = rand(1, 50);

    $rstart = rand(1, 250);
    $gstart = rand(1, 250);
    $bstart = rand(1, 250);

    $rend = rand(150, 250);
    $gend = rand(150, 250);
    $bend = rand(150, 250);

    $averageCount = 5;

}

if ($type == "moon") {

    $noise = rand(25, 100);

    $rstart = rand(1, 60);
    $gstart = rand(1, 30);
    $bstart = rand(1, 60);

    $rend = rand(51, 160);
    $gend = rand(51, 120);
    $bend = rand(51, 160);

    $averageCount = 1;
}


$img = imagecreatetruecolor($width, $height);

// 1st pass
$lastr = 0;
$lastg = 0;
$lastb = 0;

$f=1;

for ($y = 0; $y <= $height; $y++) {
    for ($x = 0; $x <= $width; $x++) {
        if ($type == "mclass" || $type == "icy" || $type == "hot") {
            $r = $y * (($rend - $rstart) / ($y+1) * sin($y+1) *5);
            $g = $y * (($gend - $gstart) / ($y+1) * sin($y+1) *5);
            $b = $y * (($bend - $bstart) / ($y+1) * sin($y+1) *5);

            $f = rand(100, 150) / rand(1,200);

            $r2 = $r * cos($f*(($x*$y)/3));
            $g2 = $g * cos($f*(($x*$y)/3));
            $b2 = $b * cos($f*(($x*$y)/3));
        }
        if ($type == "gasGiant") {
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

            if($y==0){
                $f = $y / rand(1, 250);
            }

            $r = $x2 * (($rend - $rstart) / $width);
            $g = $x2 * (($gend - $gstart) / $width);
            $b = $x2 * (($bend - $bstart) / $width);


            $r2 = $r * cos($f * 1.15);
            $g2 = $g * cos($f * 1.1);
            $b2 = $b * cos($f * 1.2);
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


if ($type == "gasGiant") {
    $r = rand(50, 150);
    $g = rand(50, 150);
    $b = rand(50, 150);

    imagefilter($img, IMG_FILTER_SMOOTH, rand(10,50));
    imagefilter($img, IMG_FILTER_GAUSSIAN_BLUR, rand(15,20));
    imagefilter($img, IMG_FILTER_COLORIZE, $r, $g, $b);
}
if ($type == "mclass") {
    $r = rand(50, 100);
    $g = rand(50, 100);
    $b = rand(50, 100);

    imagefilter($img, IMG_FILTER_CONTRAST, rand(20,50));
    imagefilter($img, IMG_FILTER_GAUSSIAN_BLUR, rand(50,120));
    imagefilter($img, IMG_FILTER_COLORIZE, $r, $g, $b);
}

if ($type == "icy") {
    $r = rand(50, 100);
    $g = rand(50, 100);
    $b = rand(50, 200);

    imagefilter($img, IMG_FILTER_CONTRAST, rand(20,50));
    imagefilter($img, IMG_FILTER_GAUSSIAN_BLUR, rand(50,120));
    imagefilter($img, IMG_FILTER_COLORIZE, $r, $g, $b);
}

if ($type == "hot") {
    $r = rand(50, 200);
    $g = rand(50, 100);
    $b = rand(50, 100);

    imagefilter($img, IMG_FILTER_CONTRAST, rand(10, 20));
    imagefilter($img, IMG_FILTER_GAUSSIAN_BLUR, rand(1, 20));
    imagefilter($img, IMG_FILTER_COLORIZE, $r, $g, $b);
}


if ($type == "moon") {
    $r = rand(50, 100);
    $g = rand(50, 100);
    $b = rand(50, 100);

    imagefilter($img, IMG_FILTER_COLORIZE, $r, $g, $b);
    imagefilter($img, IMG_FILTER_GAUSSIAN_BLUR, 20);
}


imagejpeg($img, NULL, 90);
imagedestroy($img);
?>
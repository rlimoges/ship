<?php

global $width, $height, $roughness;

$fn = $_GET['fn'];
$type = $_GET['type'];

$itterations = 120;
$roughness = rand(30, 1000) / 100;
$noise = 40;
$max = rand(200, 255);
$min = rand(0, 25);

$blur = 20;
$contrast = 20;


$width = 512;
$height = 512;
$img = imagecreatetruecolor($width, $height);

function hex2rgb($hex)
{
    $hex = str_replace("#", "", $hex);

    if (strlen($hex) == 3) {
        $r = hexdec(substr($hex, 0, 1) . substr($hex, 0, 1));
        $g = hexdec(substr($hex, 1, 1) . substr($hex, 1, 1));
        $b = hexdec(substr($hex, 2, 1) . substr($hex, 2, 1));
    } else {
        $r = hexdec(substr($hex, 0, 2));
        $g = hexdec(substr($hex, 2, 2));
        $b = hexdec(substr($hex, 4, 2));
    }
    $rgb = array($r, $g, $b);
    //return implode(",", $rgb); // returns the rgb values separated by commas
    return $rgb; // returns an array with the rgb values
}

function make_seed()
{
    list($usec, $sec) = explode(' ', microtime());
    return (float)$sec + ((float)$usec * 100000);
}

srand(make_seed());


// Step 1
// Draw 4 random corner rectangles

$x1 = 0;
$x2 = $width - 1;
$y1 = 0;
$y2 = $height - 1;
$mx = $width / 2;
$my = $height / 2;

$h = rand(0, 250);
imagefilledrectangle($img, $x1, $y1, $mx, $my, $h);
$h = rand(0, 250);
imagefilledrectangle($img, $mx, $y1, $x2, $my, $h);
$h = rand(0, 250);
imagefilledrectangle($img, $x1, $my, $mx, $y2, $h);
$h = rand(0, 250);
imagefilledrectangle($img, $mx, $my, $x2, $y2, $h);


function drawSquare($img, $x1, $y1, $x2, $y2, $min, $max)
{

    $width = $GLOBALS['width'];
    $roughness= $GLOBALS['roughness'];

    $mx = ($x2 + $x1) / 2;
    $my = ($y2 + $y1) / 2;

    if ($x2 > $width - 2) {
        $xx2 = 0;
    } else {
        $xx2 = $x2;
    }
    // get the 4 edge colors
    $ec1 = imagecolorat($img, $x1, $y1);
    $ec2 = imagecolorat($img, $xx2, $y1);
    $ec3 = imagecolorat($img, $x1, $y2);
    $ec4 = imagecolorat($img, $xx2, $y2);

    $ec1 = hex2rgb($ec1);
    $ec2 = hex2rgb($ec2);
    $ec3 = hex2rgb($ec3);
    $ec4 = hex2rgb($ec4);

    // Determine mid colors + add roughness
    $c1 = ceil(($ec1[0] + $ec2[0]) / 2) + rand(-$roughness,$roughness);
    $c2 = ceil(($ec3[0] + $ec2[0]) / 2) + rand(-$roughness,$roughness);
    $c3 = ceil(($ec1[0] + $ec4[0]) / 2) + rand(-$roughness,$roughness);
    $c4 = ceil(($ec3[0] + $ec4[0]) / 2) + rand(-$roughness,$roughness);

    // Max pass
    if ($c1 > $max) {
        $c1 = $max;
    }
    if ($c2 > $max) {
        $c2 = $max;
    }
    if ($c3 > $max) {
        $c3 = $max;
    }
    if ($c4 > $max) {
        $c4 = $max;
    }

    // Min pass
    if ($c1 < $min) {
        $c1 = $min;
    }
    if ($c2 < $min) {
        $c2 = $min;
    }
    if ($c3 < $min) {
        $c3 = $min;
    }
    if ($c4 < $min) {
        $c4 = $min;
    }


    $c1 = imagecolorallocate($img, $c1, $c1, $c1);
    $c2 = imagecolorallocate($img, $c2, $c2, $c2);
    $c3 = imagecolorallocate($img, $c3, $c3, $c3);
    $c4 = imagecolorallocate($img, $c4, $c4, $c4);

    imagefilledrectangle($img, $x1, $y1, $mx, $my, $c1);
    imagefilledrectangle($img, $mx, $y1, $x2, $my, $c2);
    imagefilledrectangle($img, $x1, $my, $mx, $y2, $c3);
    imagefilledrectangle($img, $mx, $my, $x2, $y2, $c4);
}


// Create Plasma layer
for ($i = 1; $i < $itterations; $i++) {
    $w = $width - 1;
    $h = $height - 1;
    $s = ($h / $i);

    for ($y1 = 0; $y1 < $h; $y1 += $s) {
        for ($x1 = 0; $x1 < $w; $x1 = $x1 += $s) {
            $x2 = $x1 + $s;
            $y2 = $y1 + $s;

            // Max filters
            if ($x2 > $w) {
                $x2 = $w;
            }
            if ($y2 > $h) {
                $y2 = $h;
            }

            drawSquare($img, $x1, $y1, $x2, $y2, $min, $max);
        }
    }
}

// Noise & gradient pass
for ($y = 0; $y < $w; $y++) {
    for ($x = 0; $x < $w; $x++) {

        $c = imagecolorat($img, $x, $y);
        $color = hex2rgb($c);
        $color = $color[0] + rand(-$noise, $noise);

        imagesetpixel($img, $x, $y, imagecolorallocate($img, $color, $color, $color));
    }
}


header("Content-type: image/jpeg");
header('Content-Disposition: inline; filename=' . $fn . '".jpg"');

$r = rand(50, 150);
$g = rand(50, 150);
$b = rand(50, 150);

if ($contrast > 0) {
    imagefilter($img, IMG_FILTER_CONTRAST, rand(-$contrast, $contrast));
}
if ($blur > 0) {
    imagefilter($img, IMG_FILTER_GAUSSIAN_BLUR, rand(-$blur, $blur));
}

imagefilter($img, IMG_FILTER_COLORIZE, $r, $g, $b);

imagejpeg($img, NULL, 90);
imagedestroy($img);

?>
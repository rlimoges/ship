<?php
$fn = $_GET['fn'];
$type = $_GET['type'];

$roughness = rand(1, 50);
$max = rand(230, 255);
$min = rand(1, 10);

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

$width = 512;
$height = 512;
$img = imagecreatetruecolor($width, $height);

// Step 1
// Draw 4 random corner pixels
$r = rand(0, 150);
$g = rand(0, 150);
$b = rand(0, 150);
imagesetpixel($img, 0, 0, imagecolorallocate($img, $r, $g, $b));

$r = rand(0, 50);
$g = rand(0, 50);
$b = rand(0, 50);
imagesetpixel($img, 0, $width - 1, imagecolorallocate($img, $r, $g, $b));

$r = rand(0, 50);
$g = rand(0, 50);
$b = rand(0, 50);
imagesetpixel($img, $height - 1, 0, imagecolorallocate($img, $r, $g, $b));

$r = rand(0, 50);
$g = rand(0, 50);
$b = rand(0, 50);
imagesetpixel($img, $height - 1, $width - 1, imagecolorallocate($img, $r, $g, $b));

function drawSquare($img, $x1, $y1, $x2, $y2, $roughness, $min, $max)
{
    $mx = ($x2 + $x1) / 2;
    $my = ($y2 + $y1) / 2;

    // get the 4 edge colors
    $ec1 = imagecolorat($img, $x1, $y1);
    $ec2 = imagecolorat($img, $x2, $y1);
    $ec3 = imagecolorat($img, $x1, $y2);
    $ec4 = imagecolorat($img, $x2, $y2);

    $ec1 = hex2rgb($ec1);
    $ec2 = hex2rgb($ec2);
    $ec3 = hex2rgb($ec3);
    $ec4 = hex2rgb($ec4);

    // Determine mid colors + add roughness
    $c1r = ceil(($ec1[0] + $ec2[0]) / 2) + rand(-$roughness, $roughness);
    $c1g = ceil(($ec1[1] + $ec2[1]) / 2) + rand(-$roughness, $roughness);
    $c1b = ceil(($ec1[2] + $ec2[2]) / 2) + rand(-$roughness, $roughness);
    
    $c2r = ceil(($ec3[0] + $ec2[0]) / 2) + rand(-$roughness, $roughness);
    $c2g = ceil(($ec3[1] + $ec2[1]) / 2) + rand(-$roughness, $roughness);
    $c2b = ceil(($ec3[2] + $ec2[2]) / 2) + rand(-$roughness, $roughness);

    $c3r = ceil(($ec1[0] + $ec4[0]) / 2) + rand(-$roughness, $roughness);
    $c3g = ceil(($ec1[1] + $ec4[1]) / 2) + rand(-$roughness, $roughness);
    $c3b = ceil(($ec1[2] + $ec4[2]) / 2) + rand(-$roughness, $roughness);

    $c4r = ceil(($ec3[0] + $ec4[0]) / 2) + rand(-$roughness, $roughness);
    $c4g = ceil(($ec3[1] + $ec4[1]) / 2) + rand(-$roughness, $roughness);
    $c4b = ceil(($ec3[2] + $ec4[2]) / 2) + rand(-$roughness, $roughness);

    // Average pass
    $c1 = ($c1r+$c1g+$c1b)/3;
    $c2 = ($c2r+$c2g+$c2b)/3;
    $c3 = ($c3r+$c3g+$c3b)/3;
    $c4 = ($c4r+$c4g+$c4b)/3;

    $c1r = ceil(($c1 + $c1r*3)/5);
    $c1g = ceil(($c1 + $c1g*3)/5);
    $c1b = ceil(($c1 + $c1b*3)/5);

    $c2r = ceil(($c2 + $c2r*3)/5);
    $c2g = ceil(($c2 + $c2g*3)/5);
    $c2b = ceil(($c2 + $c2b*3)/5);

    $c3r = ceil(($c3 + $c3r*3)/5);
    $c3g = ceil(($c3 + $c3g*3)/5);
    $c3b = ceil(($c3 + $c3b*3)/5);

    $c4r = ceil(($c4 + $c4r*3)/5);
    $c4g = ceil(($c4 + $c4g*3)/5);
    $c4b = ceil(($c4 + $c4b*3)/5);

    $c1 = imagecolorallocate($img, $c1r, $c1g, $c1b);
    $c2 = imagecolorallocate($img, $c2r, $c2g, $c2b);
    $c3 = imagecolorallocate($img, $c3r, $c3g, $c3b);
    $c4 = imagecolorallocate($img, $c4r, $c4g, $c4b);

    imagefilledrectangle($img, $x1, $y1, $mx, $my, $c1);
    imagefilledrectangle($img, $mx, $y1, $x2, $my, $c2);
    imagefilledrectangle($img, $x1, $my, $mx, $y2, $c3);
    imagefilledrectangle($img, $mx, $my, $x2, $y2, $c4);
}


// Iterate
for ($i = 1; $i < 100; $i++) {
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

            drawSquare($img, $x1, $y1, $x2, $y2, $roughness, $min, $max);
        }
    }
}


header("Content-type: image/jpeg");
header('Content-Disposition: inline; filename=' . $fn . '".jpg"');

$r = rand(0, 250);
$g = rand(0, 250);
$b = rand(0, 250);

//imagefilter($img, IMG_FILTER_CONTRAST, rand(20,30));
imagefilter($img, IMG_FILTER_GAUSSIAN_BLUR, rand(10, 20));
imagefilter($img, IMG_FILTER_COLORIZE, $r, $g, $b);

imagejpeg($img, NULL, 90);
imagedestroy($img);

?>
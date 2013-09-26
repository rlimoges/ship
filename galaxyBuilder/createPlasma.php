<?php
//$fn = $_GET['fn'];
//$type = $_GET['type'];
$width = 512;
$height = 512;
$fn = "test";
$img = imagecreatetruecolor($width, $height);

// Step 1
// Draw 4 random corner pixels
$h = rand(0, 255);
imagesetpixel($img, 0, 0, imagecolorallocate($img, $h, $h, $h));
$h = rand(0, 255);
imagesetpixel($img, 0, $width - 1, imagecolorallocate($img, $h, $h, $h));
$h = rand(0, 255);
imagesetpixel($img, $height - 1, 0, imagecolorallocate($img, $h, $h, $h));
$h = rand(0, 255);
imagesetpixel($img, $height - 1, $width - 1, imagecolorallocate($img, $h, $h, $h));


function drawSquare($img, $x1, $y1, $x2, $y2)
{
    $mx = ($x2 + $x1) / 2;
    $my = ($y2 + $y1) / 2;

    // get the 4 edge colors
    $ec1 = imagecolorat($img, $x1, $y1);
    $ec2 = imagecolorat($img, $x2, $y1);
    $ec3 = imagecolorat($img, $x1, $y2);
    $ec4 = imagecolorat($img, $x2, $y2);

    $ec1 = ($ec1 >> 16) & 0xFF;
    $ec2 = ($ec2 >> 16) & 0xFF;
    $ec3 = ($ec3 >> 16) & 0xFF;
    $ec4 = ($ec4 >> 16) & 0xFF;

    // Determine mid colors
    $c1 = ceil(($ec1 + $ec2) / 2);
    $c2 = ceil(($ec3 + $ec2) / 2);
    $c3 = ceil(($ec1 + $ec4) / 2);
    $c4 = ceil(($ec3 + $ec4) / 2);

    $r = 10;
    $c1 = imagecolorallocate($img, $c1 + rand(0,$r), $c1 + rand(0,$r), $c1 + rand(0,$r));
    $c2 = imagecolorallocate($img, $c2 + rand(0,$r), $c2 + rand(0,$r), $c2 + rand(0,$r));
    $c3 = imagecolorallocate($img, $c3 + rand(0,$r), $c3 + rand(0,$r), $c3 + rand(0,$r));
    $c4 = imagecolorallocate($img, $c4 + rand(0,$r), $c4 + rand(0,$r), $c4 + rand(0,$r));

//    $c1 = imagecolorallocate($img,  0,  250, 0);
//    $c2 = imagecolorallocate($img,  250,  0, 250);
//    $c3 = imagecolorallocate($img,  0,  0, 250);
//    $c4 = imagecolorallocate($img,  0,  250, 0);

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
            if($x2 > $w) {
                $x2 = $w;
            }
            if($y2 > $h) {
                $y2 = $h;
            }

            drawSquare($img, $x1, $y1, $x2, $y2);
        }
    }
}


header("Content-type: image/jpeg");
header('Content-Disposition: inline; filename=' . $fn . '".jpg"');


//imagefilter($img, IMG_FILTER_SMOOTH, rand(10,20));
//imagefilter($img, IMG_FILTER_GAUSSIAN_BLUR, rand(15,20));
//imagefilter($img, IMG_FILTER_COLORIZE, $r, $g, $b);

imagejpeg($img, NULL, 90);
imagedestroy($img);

?>
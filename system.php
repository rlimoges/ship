<!DOCTYPE html>
<html lang="en">
<head>
    <title>Ship</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <link rel="stylesheet" href="css/styles.css"/>
    <?php include("shaders/shaders.php"); ?>
</head>

<body>
    <script src="threejs/jquery.js"></script>
    <script src="threejs/three.min.js"></script>
    <script src="threejs/ColladaLoader.js"></script>
    <script src="threejs/Detector.js"></script>
    <script src="threejs/loadTextures.php"></script>
    <script src="threejs/resources.js"></script>
    <script src="threejs/particles.js"></script>
    <script src="threejs/particleSystems.js"></script>
    <script src="threejs/gui.js"></script>
    <script src="threejs/orbitControls.js"></script>
    <script src="threejs/stats.min.js"></script>

    <script src="threejs/zone.js"></script>
    <script src="threejs/zone.php?id=0"></script>

    <script src="threejs/gameObjects.js"></script>
    <script src="threejs/events.js"></script>
    <script src="threejs/engine.js"></script>

    <?php include("interface/menu.php"); ?>

    <script type="text/javascript">engineStart();</script>
</body>
</html>


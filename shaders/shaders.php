<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Robert
 * Date: 8/4/13
 * Time: 10:26 PM
 * To change this template use File | Settings | File Templates.
 */
?>

<!-- ---------------- Custom Shader Code ------------------------ -->
<script id="vertexShader" type="x-shader/x-vertex">
    varying vec2 vUv;
    void main()
{
vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
</script>

<!-- fragment shader a.k.a. pixel shader -->
<script id="fragmentShader" type="x-shader/x-vertex">
    uniform sampler2D baseTexture;
    uniform float baseSpeed;
    uniform sampler2D noiseTexture;
    uniform float noiseScale;
    uniform float alpha;
    uniform float time;

    varying vec2 vUv;
    void main()
{
vec2 uvTimeShift = vUv + vec2( -0.2, 2.5 ) * time * baseSpeed;
    vec4 noiseGeneratorTimeShift = texture2D( noiseTexture, uvTimeShift );

    vec2 uvNoiseTimeShift = vUv + noiseScale * vec2( noiseGeneratorTimeShift.g , noiseGeneratorTimeShift.b );
    vec4 baseColor = texture2D( baseTexture, uvNoiseTimeShift );

    baseColor.a = alpha * baseColor.b / 3.0;
    gl_FragColor = baseColor * noiseGeneratorTimeShift.b * 3.0;
    }
</script>

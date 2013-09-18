<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Robert
 * Date: 8/4/13
 * Time: 10:28 PM
 * To change this template use File | Settings | File Templates.
 */
?>
<div class="panel scanInfo">
    <div class="content">
        <h2>Name: <span></span></h2>

        <h3>Type: <span></span></h3>

        <p class='orbiting'>Orbiting: <span></span></p>

        <p class='distanceFromSun'>Distance from sun: <span></span> SU</p>
        <span class="btn ok">OK</span>
    </div>
</div>

<div id="menu">
    <div class="panel commandPanel">
        <div class="options">
            <span class="btn toggle">Help</span>
            <span class="btn toggle">Settings</span>
            <span class="btn toggle">Quests</span>
        </div>
        <div class="commands">
            <span class="btn thrusters toggle">Thrusters</span>
            <span class="btn weapons toggle">Weapons</span>
            <span class="btn shields toggle">Shields</span>
            <span class="btn scan push">Scan</span>
            <!--<span class="btn mine push">Mine</span>-->
            <!--<span class="btn attack push">Attack</span>-->
            <!--<span class="btn warp push">Warp</span>-->
        </div>
    </div>
    <div class="centerPanel">
        <div class="panel targets">
            <ul class="targetList open"></ul>
            <div class="target">Target: none</div>
        </div>
    </div>
    <div class="panel gauges">
        <div class="gauge hull">Hull Integrity: 100/100</div>
        <div class="gauge shields">Shield Strength: 100/100</div>
        <div class="gauge fuel">Fuel: 100/100</div>
        <div class="gauge cargo">Cargo capacity: 100/100</div>
    </div>
</div>

/**
 * Created with JetBrains PhpStorm.
 * User: Robert
 * Date: 8/1/13
 * Time: 11:29 AM
 * To change this template use File | Settings | File Templates.
 */

// Jquery selectors
var $targetList, $menuContainer, $target, $scanInfo, $commands;
var $btnScan, $btnOk, $btnWeapons, $btnThrusters, $btnShields
var scanState = false;

$(document).ready(function () {
    $scanInfo = $('.panel.scanInfo');
    $menuContainer = $("#menu");
    $target = $menuContainer.find(".target");
    $commands = $menuContainer.find('.panel.commandPanel');
    $btnScan = $commands.find('.btn.scan');
    $btnWeapons = $commands.find('.btn.weapons');
    $btnThrusters = $commands.find('.btn.thrusters');
    $btnShields = $commands.find('.btn.shields');
    $btnOk = $scanInfo.find('.btn.ok');

    document.oncontextmenu = function () {
        return false;
    };
    $btnShields.on('click', function (e) {
        toggleShields();
    });
    $btnWeapons.on('click', function (e) {
        toggleWeapons();
    });
    $btnThrusters.on('click', function (e) {
        toggleThrusters();
    });
    $target.on('click', function (e) {
        toggleTargetList()
    });
    $btnScan.on('click', function (e) {
        controls.enterZoom();
    });
    $btnOk.on('click', function (e) {
        controls.exitZoom();
        $scanInfo.hide(250);
        $btnOk.hide(250);
    });
});

function toggleMenu() {
    if ($menuContainer.hasClass('open')) {
        $menuContainer.show(500, function () {
            $menuContainer.removeClass('open');
        });
    } else {
        $menuContainer.hide(500, function () {
            $menuContainer.addClass('open');
        });
    }
}

function toggleTargetList() {
    if ($targetList.hasClass('open')) {
        $targetList.slideUp(500, function () {
            $targetList.removeClass('open');
        });

    } else {
        $targetList.slideDown(500, function () {
            $targetList.addClass('open');
        });
    }
}

function guiInitTargetList() {
    var html = "";
    $targetList = $(".targetList");

    for (var objID in gameObjects) {
        var obj = gameObjects[objID];
        classes = "targetListObj";
        if (obj.targetable) {
            var level = 0;

            switch (obj.type) {
                case "sun":
                    level = 1;
                    break;

                case "planet":
                    level = 2;
                    break;

                case "comet":
                    level = 2;
                    break;

                default :
                    level = 3;
                    break;
            }

            classes += " lvl" + level;
            html += "<li class='" + classes + "' data-target='" + objID + "' data-distance=''>" + obj.name + ": <span class='type'>(" + obj.type + ")</span> <span class='distance'></span></li>";
        }
    }

    $targetList.html(html);
    toggleTargetList();
}

var sort_by_name = function (a, b) {
    return a.innerHTML.toLowerCase() < b.innerHTML.toLowerCase();
}

var sort_by_distance = function (a, b) {
    aa = parseInt(a.attributes['data-distance'].value);
    bb = parseInt(b.attributes['data-distance'].value);
    return aa < bb;
}

function guiUpdateTargetDistances() {
    $targetList.find('.targetListObj').each(function () {
        var self = $(this);

        obj = self.attr('data-target');
        var level = 0;
        if (self.hasClass("lvl1")) {
            level = 1;
        }
        if (self.hasClass("lvl2")) {
            level = 2;
        }
        if (self.hasClass("lvl3")) {
            level = 3;
        }

        distance = gameObjects[obj].getDistance();
        distance = (parseFloat(distance) / 200).toFixed(2);
        self.attr("data-distance", distance);
        if (distance < 200 && level < 2 || distance < 100 && level < 3 || distance < 50) {
            $(this).fadeIn(100);
            $(this).find(".distance").html(distance + " SU");
        } else {
            $(this).fadeOut(100);
        }
    });

    targetList = $(".targetList");
    var list = targetList.children();
    list.sort(sort_by_distance);
    targetList.html(list);
    targetList.find('.targetListObj').click(function (e) {
        gameObjects[$(this).attr('data-target')].targetObj();
    });
}

function guiUpdateTarget(target) {
    var distance = (target.getDistance() / 200).toFixed(2);
    $target.html(target.name + "<div class='distance'>Distance: " + distance + " SU</div>");
    $scanInfo.find("h2 span").html(target.name);
    $scanInfo.find("h3 span").html(target.type);
    $scanInfo.find("p.distanceFromSun span").html(distance);
    if (target.orbiting) {
        $scanInfo.find("p.orbiting span").html(target.orbiting.name);
    }
}

function toggleShields() {
    if (ship.shieldsOn) {
        $btnShields.removeClass('on');
    } else {
        $btnShields.addClass('on');
    }
    ship.systemsToggle('shields', !ship.shieldsOn);
}

function toggleWeapons() {
    if (ship.weaponsOn) {
        $btnWeapons.removeClass('on');
    } else {
        $btnWeapons.addClass('on');
    }
    ship.systemsToggle('weapons', !ship.weaponsOn);
}

function toggleThrusters() {
    if (ship.thrustersOn) {
        $btnThrusters.removeClass('on');
    } else {
        $btnThrusters.addClass('on');
    }
    ship.systemsToggle('thrusters', !ship.thrustersOn);
}



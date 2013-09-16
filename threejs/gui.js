/**
 * Created with JetBrains PhpStorm.
 * User: Robert
 * Date: 8/1/13
 * Time: 11:29 AM
 * To change this template use File | Settings | File Templates.
 */

var scanState = false;

$(document).ready(function () {
    document.oncontextmenu = function () {
        return false;
    };
    $("#menu .btn.shields").on('click', function (e) {
        e.preventDefault();
        toggleShields();
    });
    $("#menu .btn.weapons").on('click', function (e) {
        e.preventDefault();
        toggleWeapons();
    });
    $("#menu .btn.thrusters").on('click', function (e) {
        e.preventDefault();
        toggleThrusters();
    });
    $(".target").on('click', function (e) {
        e.preventDefault();
        toggleTargetList()
    });
    $(".btn.scan").on('click', function (e) {
        e.preventDefault();
        controls.enterZoom();
    });
    $(".btn.ok").on('click', function (e) {
        e.preventDefault();
        controls.exitZoom();
        $('.panel.scanInfo').hide(250);
        $('.btn.ok').hide(250);
    });
});

function toggleMenu() {
    var menuContainer = $("#menu");
    if (menuContainer.hasClass('open')) {
        menuContainer.show(500, function () {
            menuContainer.removeClass('open');
        });
    } else {
        menuContainer.hide(500, function () {
            menuContainer.addClass('open');
        });
    }
}

function toggleTargetList() {
    var targetListContainer = $(".targetList");
    if (targetListContainer.hasClass('open')) {
        targetListContainer.slideUp(500, function () {
            targetListContainer.removeClass('open');
        });

    } else {
        targetListContainer.slideDown(500, function () {
            targetListContainer.addClass('open');
        });
    }
}

function guiInitTargetList() {
    var html = "";

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
            html += "<li class='" + classes + "' data-target='" + objID + "' data-name='" + obj.name + "'>" + obj.name + ": <span class='type'>(" + obj.type + ")</span> <span class='distance'></span></li>";
        }
    }



    $(".targetList").html(html);
    // sort the list
    $this = $(".targetList");
    var list = $this.children();
    list.sort(sort_by_name);

    $this.html(list);

    $('.targetListObj').click(function (e) {
        gameObjects[$(this).attr('data-target')].targetObj();
    });

    toggleTargetList();
}

var sort_by_name = function(a, b) {
    return a.innerHTML.toLowerCase() < b.innerHTML.toLowerCase();
}

function guiUpdateTargetDistances() {
    $('.targetListObj').each(function () {
        obj = $(this).attr('data-target');
        distance = gameObjects[obj].getDistance();
        if (distance < 20000) {
            $(this).fadeIn(100);
            distance = parseFloat(distance);
            $(this).find(".distance").html((distance / 200).toFixed(2) + " SU");
        } else {
            $(this).fadeOut(100);
        }
    });
}

function guiUpdateTarget(target) {
    $(".target").html(target.name + "<div class='distance'>Distance: " + (target.getDistance() / 200).toFixed(2) + " SU</div>");
    $(".panel.scanInfo h2 span").html(target.name);
    $(".panel.scanInfo h3 span").html(target.type);
    $(".panel.scanInfo p.distanceFromSun span").html((target.getDistanceToObj(gameObjects['sun']) / 200).toFixed(2));
    if (target.orbiting) {
        $(".panel.scanInfo p.orbiting span").html(target.orbiting.name);
    }
}

function toggleShields() {
    if (ship.shieldsOn) {
        $("#menu .btn.shields").removeClass('on');
    } else {
        $("#menu .btn.shields").addClass('on');
    }

    ship.systemsToggle('shields', !ship.shieldsOn);
}

function toggleWeapons() {
    if (ship.weaponsOn) {
        $("#menu .btn.weapons").removeClass('on');
    } else {
        $("#menu .btn.weapons").addClass('on');
    }
    ship.systemsToggle('weapons', !ship.weaponsOn);
}

function toggleThrusters() {
    if (ship.thrustersOn) {
        $("#menu .btn.thrusters").removeClass('on');
    } else {
        $("#menu .btn.thrusters").addClass('on');
    }
    ship.systemsToggle('thrusters', !ship.thrustersOn);
}



'use strict';

window.isDragging = false;

var tempHotspots = [];

var activeSceneList = ['0-scene-1'];

// NEW: 21 July 2016: painting kit
tempHotspots[0] = scenes[0].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-1"), {
    yaw: -0.378,
    pitch: 0.013
}, {
        perspective: {
            radius: 532,
            extraRotations: "rotateX(0deg)"
        }
    });
// needles & thread sewing kit
tempHotspots[1] = scenes[0].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-2"), {
    yaw: 1.73,
    pitch: -0.11
}, {
        perspective: {
            radius: 729,
            extraRotations: "rotateX(0deg)"
        }
    });
// axe
tempHotspots[2] = scenes[0].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-3"), {
    yaw: -1.65,
    pitch: 0.008
}, {
        perspective: {
            radius: 510,
            extraRotations: "rotateX(5deg)"
        }
    });
// clay
tempHotspots[3] = scenes[0].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-4"), {
    yaw: 0.3,
    pitch: 0.025
}, {
        perspective: {
            radius: 530,
            extraRotations: "rotateX(5deg)"
        }
    });
// FALSE: sculpting kit
tempHotspots[4] = scenes[0].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-5"), {
    yaw: -0.123,
    pitch: 0.04
}, {
        perspective: {
            radius: 470,
            extraRotations: "rotateX(5deg)"
        }
    }); // OK
// FALSE: hammer
tempHotspots[5] = scenes[0].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-6"), {
    yaw: -2.12,
    pitch: -0.16
}, {
        perspective: {
            radius: 600,
            extraRotations: "rotateX(5deg)"
        }
    }); // OK
// FALSE: knife
tempHotspots[6] = scenes[0].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-7"), {
    yaw: -1.21,
    pitch: -0.029
}, {
        perspective: {
            radius: 590,
            extraRotations: "rotateX(5deg)"
        }
    }); // OK
// FALSE: saw
tempHotspots[7] = scenes[0].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-8"), {
    yaw: -1.91,
    pitch: 0.117
}, {
        perspective: {
            radius: 560,
            extraRotations: "rotateX(5deg)"
        }
    }); // OK
// FALSE: spade
tempHotspots[8] = scenes[0].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-9"), {
    yaw: 0.048,
    pitch: -0.1
}, {
        perspective: {
            radius: 530,
            extraRotations: "rotateX(5deg)"
        }
    }); // OK
// FALSE: tape
tempHotspots[9] = scenes[0].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-10"), {
    yaw: 1.985,
    pitch: -0.04
}, {
        perspective: {
            radius: 540,
            extraRotations: "rotateX(5deg)"
        }
    }); // OK

var showPage = function (newPage) {
    $(newPage).fadeIn();
}

var hidePage = function (page) {
    $(page).fadeOut();
}



var glowed = [];

function hideInteractionPrompt() {
    hidePage('#interactionPromptTemp');
}

function viewChange() {
    var view = activeScene.marzipanoObject.view();
    var yaw = view.yaw();
    for (var i = 0; i < 10; i++) {
        var hotspotYaw = tempHotspots[i].position().yaw;
        //console.log( hotspotYaw, yaw );
        if (
            hotspotYaw < yaw + 0.78 &&
            hotspotYaw > yaw - 0.78
        ) {
            animateGlow(i)
        }
    }
}

function debounce(fn, delay) {
    var timer = null;
    return function () {
        var context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}

function animateGlow(param) {
    if (!glowed[param]) {
        glowed[param] = true;
        setTimeout(function () {

            window.tempSprite[param].toEnd(false, function () {
                window.tempSprite[param].toStart();
            });

        }, 300);
    }
}

setInterval(function () {
    var view = activeScene.marzipanoObject.view();
    var yaw = view.yaw();
    for (var i = 0; i < 10; i++) {
        var hotspotYaw = tempHotspots[i].position().yaw;
        //console.log( hotspotYaw, yaw );
        if (
            hotspotYaw < yaw + 0.78 &&
            hotspotYaw > yaw - 0.78
        ) {
        }
        else {
            glowed[i] = false;
        }
    }
}, 500);

var sfx = {};
sfx['enter-game'] = new Howl({
    src: ['audio/mp3/bow_bgm.mp3'],
    loop: true
});
sfx['user-fails'] = new Howl({
    src: ['audio/mp3/fail.mp3']
});
sfx['wrong-answer'] = new Howl({
    src: ['audio/mp3/wrong.mp3']
});
sfx['correct-answer'] = new Howl({
    src: ['audio/mp3/correct.mp3']
});

function playSfx(param) {
    sfx[param].play();
}

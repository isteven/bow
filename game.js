'use strict';

window.isDragging = false;

var tempHotspots = [];

var activeSceneList = ['0-scene-1'];

// Get the viewer's underlying DragControlMethod instance for mouse drag.
var dragControlMethod = viewer.controls().method('mouseViewDrag').instance;

// sculpting kit
tempHotspots[0] = scenes[0].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-1"), {
    yaw: -0.15,
    pitch: 0.05
}, {
    perspective: {
        radius: 520,
        extraRotations: "rotateX(5deg)"
    }
});
// needles & thread sewing kit
tempHotspots[1] = scenes[0].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-2"), {
    yaw: 1.73,
    pitch: -0.11
}, {
    perspective: {
        radius: 530,
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
// FALSE: box
tempHotspots[4] = scenes[0].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-5"), {
    yaw: -0.41,
    pitch: 0.07
}, {
    perspective: {
        radius: 600,
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
    yaw: 0.038,
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

$('.panoCenter').click(function(e) {
    var activeSceneIdx = activeSceneList.indexOf(activeScene.data.id);
    if (canClick[activeSceneIdx] && !cluesFound[activeSceneIdx]) {
        $('#cluePlaceholder').show();
        $('#cluePlaceholder > .closeButtonRed').show();
        $('#cluePlaceholder > img').attr('src', 'img/photo_clue_' + (activeSceneIdx + 1) + '.png');
        $('.panoCenter').hide();
        $('.empMeter').attr('src', 'img/emf_1.png');
        canClick[activeSceneIdx] = false;
        cluesFound[activeSceneIdx] = true;
    }
});

$('#cluePlaceholder > .closeButtonRed').click(function(e) {
    $('#cluePlaceholder').animate({
        height: '20px',
        width: '20px',
        top: '85%',
        left: '90%',
    }, 400, function() {
        $('.cluesCtr').show();
        $(this).hide();
        $('#cluePlaceholder > img').attr('src', '');
        $('#cluePlaceholder').attr('style', '');
        $('#cluePlaceholder').addClass('cluePlaceholder');
    });
});

var showPage = function(newPage) {
    $(newPage).fadeIn();
}

var hidePage = function(page) {
    $(page).fadeOut();
}


/*
var element = document.getElementById( 'clue-10' );
var sprite = new Motio(element, {
    fps: 11,
    frames: 11
});
window.tempSprite = sprite;

$( '#clue-10' ).mouseover( function( e ) {
    window.tempSprite.play();

})

$( '#clue-10' ).mouseout( function( e ) {
    window.tempSprite.pause();
    window.tempSprite.toStart();

})
*/
/*
scenes.map(function(scene) {
    var view = activeScene.marzipanoObject.view();
    //console.log( view );
    view.addEventListener('change', function() {
        // Get the current viewport dimensions
        var size = activeScene.marzipanoObject.view().size();
        // Transform the hotspot coordinates into screen coordinates.

        for (var i = 0; i < 10; i++) {

            var panning_x = (activeScene.marzipanoObject.view().yaw()).toFixed(2);
            console.log( panning_x );
            if (panning_x > 1.7 && panning_x < 2.6) {
            //

            }


        }


    });
});
*/

var dragControlMethod = viewer.controls().method('mouseViewDrag').instance;

// Listen for the end of a drag.
dragControlMethod.addEventListener('parameterDynamics', function() {
    //console.log('log');
    // Get the current viewport dimensions
    var size = activeScene.marzipanoObject.view().size();
    // Transform the hotspot coordinates into screen coordinates.
    // var screen = activeScene.marzipanoObject.view().coordinatesToScreen({
    //     yaw: tempHotspots[ 0 ].position().yaw,
    //     pitch: tempHotspots[ 0 ].position().pitch
    // });
    //
    //console.log( size );
    for ( var i = 0; i < 10; i++ ) {
        // Transform the hotspot coordinates into screen coordinates.
        var screen = activeScene.marzipanoObject.view().coordinatesToScreen({
            yaw: tempHotspots[ i ].position().yaw,
            pitch: tempHotspots[ i ].position().pitch
        });
        console.log( screen );
        if (
            screen &&
            Math.abs(screen.x - size.width/2) < 50 &&
            Math.abs(screen.y - size.height/2) < 180
        ) {
            window.tempSprite[ i ].play();
        }
        else {
            window.tempSprite[ i ].toStart( true );
        }
    }
});

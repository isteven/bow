'use strict';

var tempHotspots = [];

var activeSceneList = [ '0-scene-1' ];

// Get the viewer's underlying DragControlMethod instance for mouse drag.
var dragControlMethod = viewer.controls().method('mouseViewDrag').instance;

// sculpting kit
tempHotspots[ 0 ] = scenes[ 0 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-1"), { yaw: -0.2, pitch: 0.0 });
// needles & thread sewing kit
tempHotspots[ 0 ] = scenes[ 0 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-2"), { yaw: 1.68, pitch: 0.0 });
// axe
tempHotspots[ 0 ] = scenes[ 0 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-3"), { yaw: -1.87, pitch: 0.2 });
// clay
tempHotspots[ 0 ] = scenes[ 0 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-4"), { yaw: 0.24, pitch: 0.0 });

// FALSE: box
tempHotspots[ 0 ] = scenes[ 0 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-5"), { yaw: -0.47, pitch: 0.07 }); // OK
// FALSE: hammer
tempHotspots[ 0 ] = scenes[ 0 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-6"), { yaw: -2.12, pitch: -0.16 }); // OK
// FALSE: knife
tempHotspots[ 0 ] = scenes[ 0 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-7"), { yaw: -1.21, pitch: 0.0 }); // OK
// FALSE: saw
tempHotspots[ 0 ] = scenes[ 0 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-8"), { yaw: -1.71, pitch: 0.0 }); // OK
// FALSE: spade
tempHotspots[ 0 ] = scenes[ 0 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-9"), { yaw: 0.0, pitch: -0.15 }); // OK
// FALSE: tape
tempHotspots[ 0 ] = scenes[ 0 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-10"), { yaw: 1.90, pitch: 0.0 }); // OK


$('.panoCenter').click(function(e) {
    var activeSceneIdx = activeSceneList.indexOf( activeScene.data.id );
    if ( canClick[ activeSceneIdx ] && !cluesFound[ activeSceneIdx ] ) {
        $('#cluePlaceholder').show();
        $('#cluePlaceholder > .closeButtonRed').show();
        $('#cluePlaceholder > img').attr('src', 'img/photo_clue_' + (activeSceneIdx + 1) + '.png');
        $('.panoCenter').hide();
        $('.empMeter').attr('src', 'img/emf_1.png');
        canClick[  activeSceneIdx  ] = false;
        cluesFound[ activeSceneIdx ] = true;
    }
});

$('#cluePlaceholder > .closeButtonRed').click(function(e) {
    $('#cluePlaceholder').animate({
        height: '20px',
        width: '20px',
        top: '85%',
        left: '90%',
    }, 400, function() {
        $( '.cluesCtr' ).show();
        $(this).hide();
        $('#cluePlaceholder > img').attr('src', '');
        $( '#cluePlaceholder').attr( 'style', '' );
        $( '#cluePlaceholder' ).addClass( 'cluePlaceholder' );
    });
});

var showPage = function( newPage ) {
    $( newPage ).fadeIn();
}

var hidePage = function( page ) {
    $( page ).fadeOut();
}

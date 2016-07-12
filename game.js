'use strict';

var tempHotspots = [];

var activeSceneList = [ '0-scene-1' ];

// Get the viewer's underlying DragControlMethod instance for mouse drag.
var dragControlMethod = viewer.controls().method('mouseViewDrag').instance;

// sculpting kit
tempHotspots[ 0 ] = scenes[ 0 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-1"),
    { yaw: -0.2, pitch: 0.0 }, { perspective: { radius: 600, extraRotations: "rotateX(5deg)" } } );
// needles & thread sewing kit
tempHotspots[ 0 ] = scenes[ 0 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-2"),
    { yaw: 1.68, pitch: 0.0 }, { perspective: { radius: 600, extraRotations: "rotateX(5deg)" } });
// axe
tempHotspots[ 0 ] = scenes[ 0 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-3"),
    { yaw: -1.87, pitch: 0.2 }, { perspective: { radius: 600, extraRotations: "rotateX(5deg)" } });
// clay
tempHotspots[ 0 ] = scenes[ 0 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-4"),
    { yaw: 0.24, pitch: 0.0 }, { perspective: { radius: 600, extraRotations: "rotateX(5deg)" } });

// FALSE: box
tempHotspots[ 0 ] = scenes[ 0 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-5"),
    { yaw: -0.47, pitch: 0.07 }, { perspective: { radius: 600, extraRotations: "rotateX(5deg)" } }); // OK
// FALSE: hammer
tempHotspots[ 0 ] = scenes[ 0 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-6"),
    { yaw: -2.12, pitch: -0.16 }, { perspective: { radius: 600, extraRotations: "rotateX(5deg)" } }); // OK
// FALSE: knife
tempHotspots[ 0 ] = scenes[ 0 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-7"),
    { yaw: -1.21, pitch: 0.0 }, { perspective: { radius: 600, extraRotations: "rotateX(5deg)" } }); // OK
// FALSE: saw
tempHotspots[ 0 ] = scenes[ 0 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-8"),
    { yaw: -1.71, pitch: 0.0 }, { perspective: { radius: 600, extraRotations: "rotateX(5deg)" } }); // OK
// FALSE: spade
tempHotspots[ 0 ] = scenes[ 0 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-9"),
    { yaw: 0.0, pitch: -0.15 }, { perspective: { radius: 600, extraRotations: "rotateX(5deg)" } }); // OK
// FALSE: tape
tempHotspots[ 0 ] = scenes[ 0 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-10"),
    { yaw: 1.90, pitch: 0.08 }, { perspective: { radius: 600, extraRotations: "rotateX(5deg)" } } ); // OK

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

$( '#clue-10' ).mouseover( function( e ) {
    $( '#clue-10' ).addClass( 'animate' );
    var element = document.getElementById( 'clue-10' );
    var sprite = new Motio(element, {
        fps: 11,
        frames: 11
    });
    sprite.play();
    window.sprite = sprite;
})

$( '#clue-10' ).mouseout( function( e ) {
    window.sprite.toStart( true, function() {
        $( '#clue-10' ).removeClass('animate' );
    });

})

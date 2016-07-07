'use strict';

var canClick        = [ false, false, false ];
var cluesFound      = [ false, false, false ];
var clueIndex       = 0;
var tempHotspots    = [];
var activeSceneList = [ '0-scene-1', '0-scene-2', '0-scene-3' ];
var frameQty        = [ 9, 8, 7, 8, 6, 8, 6, 8, 8 ];

// Get the viewer's underlying DragControlMethod instance for mouse drag.
var dragControlMethod = viewer.controls().method('mouseViewDrag').instance;

// clue 1
tempHotspots[ 0 ] = scenes[ 0 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-1"), {
    yaw: 1.4,
    pitch: 0.06
});

// clue 2
tempHotspots[ 1 ] = scenes[ 1 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-2"), {
    yaw: -1.92,
    pitch: -0.10
});

// clue 3
tempHotspots[ 2 ] = scenes[ 2 ].marzipanoObject.hotspotContainer().createHotspot(document.querySelector("#clue-3"), {
    yaw: 1.9,
    pitch: 0.00
});

// Listen for the end of a drag.
dragControlMethod.addEventListener('inactive', function(e) {

    // Get the current viewport dimensions
    var size = activeScene.marzipanoObject.view().size();

    var activeSceneIdx = activeSceneList.indexOf( activeScene.data.id );

    // Transform the hotspot coordinates into screen coordinates.
    var screen = activeScene.marzipanoObject.view().coordinatesToScreen({
        yaw: tempHotspots[ activeSceneIdx ].position().yaw,
        pitch: tempHotspots[ activeSceneIdx ].position().pitch
    });

    // Check whether the hotspot is within regionSize pixels of the screen center.
    if (screen) {
        var
            xDistance = Math.abs(screen.x - size.width / 2),
            yDistance = Math.abs(screen.y - size.height / 2);

        if (xDistance < 50 && yDistance < 100) {
            $('.empMeter').attr('src', 'img/emf_5.png');
            canClick[ activeSceneIdx ] = true;
            $('.panoCenter').show();
        } else if (xDistance < 70 && yDistance < 120) {
            $('.empMeter').attr('src', 'img/emf_4.png');
            canClick[ activeSceneIdx ] = false;
            $('.panoCenter').hide();
        } else if (xDistance < 100 && yDistance < 150) {
            $('.empMeter').attr('src', 'img/emf_3.png');
            canClick[ activeSceneIdx ] = false;
            $('.panoCenter').hide();
        } else if (xDistance < 130 && yDistance < 180) {
            $('.empMeter').attr('src', 'img/emf_2.png');
            canClick[ activeSceneIdx ] = false;
            $('.panoCenter').hide();
        } else {
            $('.empMeter').attr('src', 'img/emf_1.png');
            canClick[  activeSceneIdx  ] = false;
            $('.panoCenter').hide();
        }
    }
});

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

var showClues = function() {
    var allCluesFound = 0;
    $('#pageClues > .closeButtonRed').show();
    for ( var i = 0; i < 3; i++ )
    {
        if ( cluesFound[ i ] ) {
            var tempDom = $( '#pageClues > img' );
            $( tempDom[ i ] ).attr( 'src' , 'img/photo_clue_' + ( i + 1 ) + '.png' );
            allCluesFound++;
        }
    }
    $('#pageClues > .closeButtonRed').click( function(e) {
        $( '.fadePage').fadeOut();
        $( '#pageClues').hide();
    });

    if ( allCluesFound == 3 ) {
        $( '#pageClues > .btnGuess' ).addClass( 'active' );
        $( '#pageClues > .btnGuess.active' ).click( function(e) {

        } );
    }

    // hidePage( '.fadePage' );
    hidePage( '#pageClues' );
    showPage( '#pageGuessName' );
    $( '#pageGuessName' ).show();
}

function animatePontianakError( triesLeft ) {
    console.log( 'animating pontianak ERROR: ' + triesLeft );
    $( '.pontianakBox div' ).fadeOut( 800 );
    var pontianakIdx = ( ( 5 - triesLeft ) * 2 ) + 1;
    console.log( 'pontianak index:'  + pontianakIdx );
    $( '.pontianak' + pontianakIdx ).show();
    $( '.pontianak' + pontianakIdx ).sprite({
        no_of_frames: frameQty[ pontianakIdx - 1 ],
        fps: 8,
        play_frames: frameQty[ pontianakIdx - 1 ]
    });
}

function animatePontianakWaiting( triesLeft ) {
    console.log( 'animating pontianak WAITING: ' + triesLeft );
    var pontianakIdx = ( ( 5 - triesLeft ) * 2 ) + 2;
    console.log( 'pontianak index:'  + pontianakIdx );
    $( '.pontianak' + ( pontianakIdx - 1 )).fadeOut( 500 );
    $( '.pontianakBox div' ).fadeOut( 800 );
    $( '.pontianak' + pontianakIdx ).show();
    $( '.pontianak' + pontianakIdx ).sprite({
        no_of_frames: frameQty[ pontianakIdx - 1 ],
        fps: 4
    });
}

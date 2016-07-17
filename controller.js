var myApp = angular.module('myApp',[]);

angular.module('myApp', []).controller( 'bodyCtrl', [ '$scope', '$http', '$timeout', '$window', '$sce',
function( $scope, $http, $timeout, $window, $sce ) {

    $scope.lang            = 'en';

    var gameStartTime       = null;
    var gameEndTime         = null;
    $scope.elapsedGameTime  = null;

    $scope.entry1to5 = [];
    $scope.entry2to5 = [];

    var currentItemIdx  = 1;
    var trials          = 4;
    $scope.parentData   = {};
    $scope.parentData.currentMsg   = '';

    $scope.message      = [];
    $scope.message[ 0 ] = '"Ah, such a round nose we have here. It simply will not do, I have to sharpen it further."';
    $scope.message[ 1 ] = '"This isn\'t good at all, she\'s falling apart right along the sides. I need to tighten the seams."';
    $scope.message[ 2 ] = '"All bruised and broken, this hand will be rendered useless. I\'ll have to get rid of it."';
    $scope.message[ 3 ] = '"It\'s time to patch things up. Hand over the materials to seal off these hollow areas."';

    $scope.getContent = function( index, html ) {
        console.log( index, $scope.lang, window.languageSet[ $scope.lang ][ index ] );
        if ( html ) {
            return $sce.trustAsHtml( window.languageSet[ $scope.lang ][ index ] );
        }
        else {
            return window.languageSet[ $scope.lang ][ index ];
        }
    }


    function getUrlVar( variable )
    {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return( false );
   }

    function searchArrayOfObject( searchKeyword, propertyToSearch, myArrayOrObject ){
        var result = [];
        for (var i = 0; i < myArrayOrObject.length; i++) {
            if ( myArrayOrObject[ i ][ propertyToSearch ].toUpperCase() === searchKeyword.toUpperCase() ) {
                result.push( i );
            }
        }
        return result;
    }

    $scope.showPage = function( domString ) {
        window.showPage( domString );
    }

    $scope.hidePage = function( domString ) {
        window.hidePage( domString );
    }

    $scope.closeClue = function( element ) {
        $( '#singleClue' ).fadeOut();
        $( '#tempFade' ).fadeOut();
        var tempMsg = $scope.getContent( 'clue');
        $scope.parentData.currentMsg =  tempMsg[ currentItemIdx - 1 ];
        // $scope.parentData.currentMsg = $scope.message[ currentItemIdx - 1 ];
    }

    $scope.processClue = function( param ) {
        if ( window.isDragging ) {
            return;
        }
        showPage( '.bottomArea' );
        if ( param < 5 && param == currentItemIdx ) {
            showPage( '#singleClue' );
            showPage( '#tempFade' );
            $( '#singleClue > img' ).attr( 'src', 'img/items/tool_' + param + '.png' );
            $scope.parentData.currentMsg = $scope.getContent( 'clue-ok' );
            // '"Ah yes, this would be perfect for the task."';
            if ( currentItemIdx >= 4 ) {
                calculateGameTime();
                setTimeout( function() {
                    hidePage( '#singleClue' );
                    hidePage( '.bottomArea' );
                    hidePage( '.splatter' );
                    // showPage( '#pageBlackBg' );
                    hidePage( '#tempFade' );
                    showPage( '#pageShare' );
                }, 900);
                loadLeaderboard();
            }
            currentItemIdx++;
        }
        else {
            if ( trials > 1 ) {
                showPage( '#singleClue' );
                $( '#singleClue > img' ).attr( 'src', 'img/items/tool_' + param + '.png' );
                $scope.parentData.currentMsg = $scope.getContent( 'clue-false' );
                // '"You fool! Hand me the correct item, or you\'ll become my next tool!"'
                var tempTrials = trials;
                $( '#tempFade' ).show();
                $( '#pageSplatter_' + tempTrials ).show();
                // fadeout for msie < 11
                if ( bowser.msie && bowser.version < 11 ) {
                    setTimeout( function() {
                        $( '#tempFade' ).fadeOut();
                        $( '#pageSplatter_' + tempTrials ).fadeOut();
                    },3000);
                }
                $( '.heart_' + tempTrials ).attr( 'src', 'img/heart_strike.png');
                trials--;
            }
            else {
                $( '.heart_' + trials ).attr( 'src', 'img/heart_strike.png');
                $( '#pageSplatter_' + trials ).show();
                hidePage( '#singleClue' );
                hidePage( '.bottomArea' );

                setTimeout( function() {
                    showPage( '#pageBlackBg' );
                    showPage( '#pageFails' );
                }, 100);
            }
        }
    }

    function pad(pad, str, padLeft) {
    if (typeof str === 'undefined')
        return pad;
    if (padLeft) {
        return (pad + str).slice(-pad.length);
    } else {
        return (str + pad).substring(0, pad.length);
    }
}


    loadLeaderboard = function() {
        $http({
            method: 'GET',
            url: configGet('apiUrl') + '_laravel/game/board/2',
        }).then(
            function(success) {
                var idx = 0;
                angular.forEach(success.data, function(value, key) {
                    //console.log( value );
                    var paddedIdx = pad('00', (idx + 1), true);
                    if (idx < 5) {
                        $scope.entry1to5.push({
                            idxString: paddedIdx,
                            time: value.time
                        });
                    } else if (idx < 10) {
                        $scope.entry2to5.push({
                            idxString: paddedIdx,
                            time: value.time
                        });
                    }
                    idx++;
                });
            },
            function(error) {
                console.log(error);
            }
        );
    }

    var calculateGameTime = function() {
        gameEndTime = performance.now();
        $scope.elapsedGameTime = gameEndTime - gameStartTime;
        console.log('elapsed game time (ms): ' + $scope.elapsedGameTime);
        console.log('elapsed game time (s): ' + $scope.elapsedGameTime * 0.001);
    }

    $scope.millisToMinutesAndSeconds = function(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        var paddedMinutes = pad('00', minutes, true);
        return paddedMinutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    $scope.share_facebook = function() {
        if ( window.fbLoggedIn ) {
            fbPost( window.fbResponse.authResponse.userID, window.fbResponse );
        }
        else {
            FB.login(function(response) {
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    FB.api('/me', function(response) {
                        console.log( response );
                        fbPost( response.id, response );
                        // console.log('Good to see you, ' + response.name + '.');
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            });
        }
    }

    $scope.share_twitter = function() {
        window.open(
            'http://stg.craftandcode.com.sg/clients/rws/hhn6/_laravel/game/twitter?gameId=' + configGet( 'gameId' ) + '&gameTime=' + $scope.elapsedGameTime,
            'twitter-share',
            'width=400,height=300,toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=1,left=0,top=0'
        );
    }

    var fbPost = function( fbId, response1 ) {
        FB.api(
            "/" + fbId,
            function(response2) {
                if (response2 && !response2.error) {
                    FB.ui({
                        method: 'share',
                        display: 'popup',
                        href: 'http://www.halloweenhorrornights.com.sg/',
                    }, function(response3) {
                        console.log('FB posting.. ')
                        var tempEmail = response2.email;
                        if (!tempEmail) {
                            tempEmail = '';
                        }
                        var tempPhone = response2.phone;
                        if (!tempPhone) {
                            tempPhone = '';
                        }
                        var dataToSend = {
                            game: configGet('gameId'),
                            account: 'facebook',
                            user_name: fbId,
                            full_name: response2.name,
                            time: Math.round(Number($scope.elapsedGameTime)),
                            email: tempEmail,
                            phone: tempPhone
                        };
                        postToDb(dataToSend);
                    });
                }
            }
        );
    }

    var postToDb = function(param) {
        console.log('postToDb()');
        $http({
            method: 'POST',
            url: configGet('apiUrl') + '_laravel/game/submit',
            data: param
        }).then(
            function(success) {
                console.log('postToDb success');
                console.log(success);
            },
            function(error) {
                console.log('postToDb ERROR');
                console.log(error);
            }
        );
    }


    $scope.startGame = function() {

        gameStartTime   = performance.now();

        $scope.triesLeft    = 4;

        hidePage( '.fadePage' );
        $( '#pageLanding' ).fadeOut( 400 );
        hidePage( '#pageFails' );
        showPage( '.bottomArea' );

        var tempMsg = $scope.getContent( 'clue');
        $scope.parentData.currentMsg =  tempMsg[ currentItemIdx - 1 ];
        window.tempSprite = [];
        for ( var i = 0 ; i < 10; i++ ) {

            $( '#clue-' + ( i + 1)).css( "background", "transparent url( img/items/tool_glow_" + (i + 1) + ".png )  no-repeat 0 0" );

            var element = document.getElementById( 'clue-' + (i + 1) );
            var sprite = new Motio(element, {
                fps: 18,
                frames: 11
            });

            window.tempSprite[ i ] = sprite;

            $( '#clue-' + (i+1) ).mouseover( function( e ) {
                var idx = e.target.id.split( '-' );
                idx = idx[ 1 ] - 1;
                window.tempSprite[ idx ].play();
            })
            $( '#clue-' + (i+1) ).mouseout( function( e ) {
                var idx = e.target.id.split( '-' );
                idx = idx[ 1 ] - 1;
                window.tempSprite[ idx ].pause();
                window.tempSprite[ idx ].toStart();
            })
        }
        console.log( window.tempSprite );
    }

    var tempLang = getUrlVar( 'lang' );
    if ( tempLang ) {
        $scope.lang = tempLang;
    }

    hidePage( '.bottomArea' );
    //$scope.startGame();
    // showPage( '#pageShare' );
    showPage( '#pageLanding' );
    // showPage( '#pageShare' );
    // showPage( '#pageFails' );

}]);

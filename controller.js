var myApp = angular.module('myApp',[]);

angular.module('myApp', []).controller( 'bodyCtrl', [ '$scope', '$http', '$timeout', function( $scope, $http, $timeout ) {

    $scope.lang            = 'en';

    var gameStartTime       = null;
    var gameEndTime         = null;
    $scope.elapsedGameTime  = null;


    var currentItemIdx  = 1;
    var trials          = 4;
    $scope.parentData   = {};
    $scope.parentData.currentMsg   = '';

    $scope.message      = [];
    $scope.message[ 0 ] = '"Ah, such a round nose we have here. It simply will not do, I have to sharpen it further."';
    $scope.message[ 1 ] = '"This isn\'t good at all, she\'s falling apart right along the sides. I need to tighten the seams."';
    $scope.message[ 2 ] = '"All bruised and broken, this hand will be rendered useless. I\'ll have to get rid of it."';
    $scope.message[ 3 ] = '"It\'s time to patch things up. Hand over the materials to seal off these hollow areas."';

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
        $scope.parentData.currentMsg = $scope.message[ currentItemIdx - 1 ];
    }

    $scope.processClue = function( param ) {
        showPage( '#singleClue' );
        $( '#singleClue > img' ).attr( 'src', 'img/items/tool_' + param + '.png' );
        if ( param < 5 && param == currentItemIdx ) {
            $scope.parentData.currentMsg = '"Ah yes, this would be perfect for the task."';
            if ( currentItemIdx >= 4 ) {
                setTimeout( function() {
                    hidePage( '#singleClue' );
                    hidePage( '.bottomArea' );
                    showPage( '#pageFailsBg' );
                    showPage( '#pageShare' );
                }, 900);
            }
            currentItemIdx++;
        }
        else {
            if ( trials > 1 ) {
                $scope.parentData.currentMsg = '"You fool! Hand me the correct item, or you\'ll become my next tool!"'
                var tempTrials = trials;
                $( '#pageSplatter_' + tempTrials ).show();
                $( '.heart_' + tempTrials ).attr( 'src', 'img/heart_strike.png');
                trials--;
            }
            else {
                $( '.heart_' + trials ).attr( 'src', 'img/heart_strike.png');
                $( '#pageSplatter_' + trials ).show();
                setTimeout( function() {
                    hidePage( '#singleClue' );
                    hidePage( '.bottomArea' );
                    showPage( '#pageFailsBg' );
                    showPage( '#pageFails' );
                }, 900);
            }
        }
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
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
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
            '1468140690854',
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

        gameStartTime   = null;
        gameEndTime     = null;

        $scope.triesLeft    = 4;

        var tempLang = getUrlVar( 'lang' );
        if ( tempLang ) {
            lang = tempLang;
        }

        hidePage( '.fadePage' );
        $( '#pageLanding' ).fadeOut( 400 );
        hidePage( '#pageFails' )
        $( '.bottomArea').hide();
        //showPage( '#pageShare');

        $scope.parentData.currentMsg = $scope.message[ currentItemIdx - 1 ];
    }
    $scope.startGame();
    showPage( '#pageLanding' );
}]);

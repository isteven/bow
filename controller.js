var myApp = angular.module('myApp',[]);

myApp.controller( 'bodyCtrl', [ '$scope', '$http', function( $scope, $http ) {

    var lang            = 'en';
    var gameStartTime   = null;
    var gameEndTime     = null;

    $scope.menu                 = {};
    $scope.menu.active          = false;
    $scope.footer               = {};
    $scope.footer.section       = '';
    $scope.footer.popupActive   = false;

    $scope.message = '"Ah, such a round nose we have here. It simply will not do, I have to sharpen it further.""';

    $scope.entry1to5 = [
        { time: 100 },
        { time: 200 },
        { time: 300 },
        { time: 400 },
        { time: 500 },
    ];
    $scope.entry2to5 = [
        { time: 600 },
        { time: 700 },
        { time: 800 },
        { time: 900 },
        { time: 1000 },
    ];

    $scope.showFooterPopup = function( type ) {
        $scope.footer.popupActive  = true;
        $scope.footer.section = type;
    }

    $scope.hideFooterPopup = function( type ) {
        $scope.footer.popupActive  = false;
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

    var tempLang = getUrlVar( 'lang' );
    if ( tempLang ) {
        lang = tempLang;
    }

    $scope.showPage = function( domString ) {
        window.showPage( domString );
    }

    $scope.hidePage = function( domString ) {
        window.hidePage( domString );
    }

    $scope.share = function( type ) {

        gameEndTime = performance.now();
        var elapsedGameTime = gameStartTime - gameEndTime;

        FB.ui({
            method: 'share_open_graph',
            action_type: 'og.likes',
            action_properties: JSON.stringify({
                object: 'https://developers.facebook.com/docs/',
            })
        }, function(response) {
            if ( typeof response != 'undefined' ) {
                var dataToSend = {
                    id          : null,
                    game        : 1,
                    account     : 'facebook',
                    user_name   : 'test-user',
                    full_name   : 'mr. test-user',
                    time        : elapsedGameTime,
                    email       : 'test@test.com',
                    phone       : '99998888'
                };

                $http({
                    method  : 'POST',
                    url     : 'http://54.169.173.245/clients/rws/hhn6/_laravel/game/submit',
                    data    : dataToSend
                }).then(
                    function( success ) {
                        console.log( success );
                    },
                    function( error ) {
                        console.log( error );
                    }
                );
            }
        });
    }

    $scope.startGame = function() {

        gameStartTime   = null;
        gameEndTime     = null;

        $scope.guessCorrect = true;
        $scope.failLetter   = '';
        $scope.triesLeft    = 5;
        $scope.singleLetter = '';
        $scope.menu.active  = false;

        hidePage( '.fadePage' );
        $( '#pageLanding' ).fadeOut( 400 );
        hidePage( '#pageFails' );
    }

    showPage( '#pageLanding' );
}]);

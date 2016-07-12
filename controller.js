var myApp = angular.module('myApp',[]);

angular.module('myApp', []).controller( 'bodyCtrl', [ '$scope', '$http', '$timeout', function( $scope, $http, $timeout ) {

    var lang            = 'en';
    var gameStartTime   = null;
    var gameEndTime     = null;
    var currentItemIdx  = 0;
    var trials          = 4;

    $scope.parentData = {};
    $scope.parentData.currentMsg   = '';

    $scope.message      = [];
    $scope.message[ 0 ] = '"Ah, such a round nose we have here. It simply will not do, I have to sharpen it further."';
    $scope.message[ 1 ] = '"This isn\'t good at all, she\'s falling apart right along the sides. I need to tighten the seams."';
    $scope.message[ 2 ] = '"All bruised and broken, this hand will be rendered useless. I\'ll have to get rid of it."';
    $scope.message[ 3 ] = '"It\'s time to patch things up. Hand over the materials to seal off these hollow areas."';

    $scope.entry1to5 = [];
    $scope.entry2to5 = [];

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
        console.log( $scope.message[ currentItemIdx ] );
        $scope.parentData.currentMsg = $scope.message[ currentItemIdx ];
        console.log( $scope.parentData.currentMsg );
    }

    $scope.processClue = function( param ) {
        showPage( '#singleClue' );
        $( '#singleClue > img' ).attr( 'src', 'img/items/tool_' + param + '.png' );
        if ( param < 5 ) {
            $scope.parentData.currentMsg = '"Ah yes, this would be perfect for the task."';
            currentItemIdx++;
        }
        else {
            if ( trials > 0 ) {
                $scope.parentData.currentMsg = '"You fool! Hand me the correct item, or you\'ll become my next tool!"'
                $( '.heart_' + trials ).attr( 'src', 'img/heart_strike.png');
                trials--;
            }
            else {
                
            }

        }
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
        hidePage( '#pageFails' );

        $scope.parentData.currentMsg = $scope.message[ currentItemIdx ];
    }
    $scope.startGame();
    // showPage( '#pageLanding' );
}]);

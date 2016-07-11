var myApp = angular.module('myApp',[]);

myApp.controller( 'bodyCtrl', [ '$scope', '$http', '$timeout', function( $scope, $http, $timeout ) {

    var lang            = 'en';
    var gameStartTime   = null;
    var gameEndTime     = null;
    var currentItemIdx  = 0;
    $scope.currentMsg   = '';

    $scope.message      = [];
    $scope.message[ 0 ] = '"Ah, such a round nose we have here. It simply will not do, I have to sharpen it further."';
    $scope.message[ 1 ] = '"1"';
    $scope.message[ 2 ] = '"2"';

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

    $scope.processTrue = function() {
        showPage( '#singleClue' );
        $scope.currentMsg = '"Ah yes, this would be perfect for the task."';
        currentItemIdx++;
        console.log( 'true' );
    }

    $scope.processFalse = function() {
        showPage( '#singleClue' );
        $scope.currentMsg = '"You fool! Hand me the correct item, or you\'ll become my next tool!"'
        console.log(  $scope.message[ currentItemIdx ]);
        $timeout( function() {
            $scope.currentMsg = $scope.message[ currentItemIdx ];
        }, 1500 );
        console.log( 'error' );
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

        $scope.currentMsg = $scope.message[ currentItemIdx ];
    }
    $scope.startGame();
    // showPage( '#pageLanding' );
}]);

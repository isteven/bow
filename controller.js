var myApp = angular.module('myApp', []);

angular.module('myApp', []).controller('bodyCtrl', ['$scope', '$http', '$timeout', '$window', '$sce',
    function ($scope, $http, $timeout, $window, $sce) {

        $scope.lang = 'en';

        var gameStartTime = null;
        var gameEndTime = null;
        $scope.elapsedGameTime = null;
        $scope.toolsCollected = 1;

        var closeClueTimerId = null;
        var activeGlowTimerId = null;

        $scope.entry1to5 = [];
        $scope.entry2to5 = [];
        $scope.entryResult = [
            { idxString: '01', time: 0 },
            { idxString: '02', time: 0 },
            { idxString: '03', time: 0 },
            { idxString: '04', time: 0 },
            { idxString: '05', time: 0 },
            { idxString: '06', time: 0 },
            { idxString: '07', time: 0 },
            { idxString: '08', time: 0 },
            { idxString: '09', time: 0 },
            { idxString: '10', time: 0 }
        ];

        var currentItemIdx = 1;
        var trials = 4;
        $scope.parentData = {};
        $scope.parentData.currentMsg = '';

        $scope.message = [];
        $scope.message[0] = '"She looks as pale as death. Perhaps a little colour on her cheeks would add some life back in."';
        $scope.message[1] = '"This isn\'t good at all, she\'s falling apart right along the sides. I need to tighten the seams."';
        $scope.message[2] = '"All bruised and broken, this hand will be rendered useless. I\'ll have to get rid of it."';
        $scope.message[3] = '"It\'s time to patch things up. Hand over the materials to seal off these hollow areas."';

        $scope.getContent = function (index, html) {
            // console.log( index, $scope.lang, window.languageSet[ $scope.lang ][ index ] );
            if (html) {
                return $sce.trustAsHtml(window.languageSet[$scope.lang][index]);
            }
            else {
                return window.languageSet[$scope.lang][index];
            }
        }


        function getUrlVar(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) { return pair[1]; }
            }
            return (false);
        }

        function searchArrayOfObject(searchKeyword, propertyToSearch, myArrayOrObject) {
            var result = [];
            for (var i = 0; i < myArrayOrObject.length; i++) {
                if (myArrayOrObject[i][propertyToSearch].toUpperCase() === searchKeyword.toUpperCase()) {
                    result.push(i);
                }
            }
            return result;
        }

        $scope.showPage = function (domString) {
            window.showPage(domString);
        }

        $scope.hidePage = function (domString) {
            window.hidePage(domString);
        }

        $scope.closeClue = function (element) {
            $('#singleClue').fadeOut();
            $('#tempFade').fadeOut();
            var tempMsg = $scope.getContent('clue');
            $scope.parentData.currentMsg = tempMsg[currentItemIdx - 1];
            $('.bloodBox').addClass('activeGlow');
            activeGlowTimerId = $timeout(function () {
                $('.bloodBox').removeClass('activeGlow');
            }, 1000);
            $('.bloodBox h4').removeClass('wrong-answer-red');
            $timeout.cancel(closeClueTimerId);
            $scope.toolsCollected = currentItemIdx;
            //$timeout.cancel( activeGlowTimerId );
        }

        $scope.processClue = function (param, angEvent, x1, x2, y1, y2) {
            $('#singleClue > img').attr('src', 'img/transparent.png');
            if (window.isDragging) {
                return;
            }
            showPage('.bottomArea');

            // correct guess
            if (param < 5 && param == currentItemIdx) {
                $scope.playSfx('correct-answer');
                showPage('#singleClue');
                showPage('#tempFade');
                $('#singleClue > img').attr('src', 'img/items/tool_' + param + '.png');
                closeClueTimerId = $timeout(function () {
                    $scope.closeClue();
                }, 2000);
                $scope.parentData.currentMsg = $scope.getContent('clue-ok');
                $('.bloodBox').addClass('activeGlow');
                activeGlowTimerId = $timeout(function () {
                    $('.bloodBox').removeClass('activeGlow');
                }, 1000);
                // '"Ah yes, this would be perfect for the task."';
                if (currentItemIdx >= 4) {
                    calculateGameTime();
                    $timeout(function () {
                        hidePage('#singleClue');
                        hidePage('.bottomArea');
                        hidePage('.splatter');
                        hidePage('#tempFade');
                        showPage('#pageShare');
                    }, 900);
                    loadLeaderboard();
                }
                currentItemIdx++;
            }

            // wrong guess
            else {
                $scope.playSfx('wrong-answer');
                if (trials > 1) {
                    showPage('#singleClue');
                    $('#singleClue > img').attr('src', 'img/items/tool_' + param + '.png');
                    $('.bloodBox').addClass('activeGlow');
                    $('.bloodBox h4').addClass('wrong-answer-red');
                    activeGlowTimerId = $timeout(function () {
                        $('.bloodBox').removeClass('activeGlow');
                    }, 1000);
                    closeClueTimerId = $timeout(function () {
                        $scope.closeClue();
                        $('.bloodBox h4').removeClass('wrong-answer-red');
                    }, 2000);
                    $scope.parentData.currentMsg = $scope.getContent('clue-false');
                    // '"You fool! Hand me the correct item, or you\'ll become my next tool!"'
                    var tempTrials = trials;
                    $('#tempFade').show();
                    $('#pageSplatter_' + tempTrials).show();
                    // fadeout for msie < 11
                    if (bowser.msie && bowser.version < 11) {
                        $timeout(function () {
                            $('#tempFade').fadeOut();
                            $('#pageSplatter_' + tempTrials).fadeOut();
                        }, 3000);
                    }
                    $('.heart_' + tempTrials).attr('src', 'img/heart_strike.png');
                    trials--;
                }
                else {
                    $('.heart_' + trials).attr('src', 'img/heart_strike.png');
                    $('#pageSplatter_' + trials).show();
                    hidePage('#singleClue');
                    hidePage('.bottomArea');
                    showPage('#pageBlackBg');
                    showPage('#pageFails');
                    $timeout(function () {
                        $scope.playSfx('user-fails');
                    }, 300);

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


        loadLeaderboard = function () {
            $http({
                method: 'GET',
                url: configGet('apiUrl') + 'game/board/2',
            }).then(
                function (success) {
                    // var idx = 0;
                    // angular.forEach(success.data, function(value, key) {
                    //     //console.log( value );
                    //     var paddedIdx = pad('00', (idx + 1), true);
                    //     if (idx < 5) {
                    //         $scope.entry1to5.push({
                    //             idxString: paddedIdx,
                    //             time: value.time
                    //         });
                    //     } else if (idx < 10) {
                    //         $scope.entry2to5.push({
                    //             idxString: paddedIdx,
                    //             time: value.time
                    //         });
                    //     }
                    //     idx++;
                    // });
                    for (var i = 1; i <= 10; i++) {

                        if (success.data[i] !== undefined) {

                            $scope.entryResult[i - 1].time = success.data[i].time;

                        }

                    }
                },
                function (error) {
                    console.log(error);
                }
            );
        }

        var calculateGameTime = function () {
            gameEndTime = performance.now();
            $scope.elapsedGameTime = gameEndTime - gameStartTime;
            console.log('elapsed game time (ms): ' + $scope.elapsedGameTime);
            console.log('elapsed game time (s): ' + $scope.elapsedGameTime * 0.001);
        }

        $scope.millisToMinutesAndSeconds = function (millis) {
            var minutes = Math.floor(millis / 60000);
            var seconds = ((millis % 60000) / 1000).toFixed(0);
            var paddedMinutes = pad('00', minutes, true);
            return paddedMinutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }

        $scope.share_facebook = function () {
            if (window.fbLoggedIn) {
                fbPost(window.fbResponse.authResponse.userID, window.fbResponse);
            }
            else {
                FB.login(function (response) {
                    if (response.authResponse) {
                        console.log('Welcome!  Fetching your information.... ');
                        FB.api('/me', function (response) {
                            console.log(response);
                            fbPost(response.id, response);
                            // console.log('Good to see you, ' + response.name + '.');
                        });
                    } else {
                        console.log('User cancelled login or did not fully authorize.');
                    }
                });
            }
        }

        $scope.share_twitter = function () {
            window.open(
                'http://stg.craftandcode.com.sg/clients/rws/hhn6/game/twitter?gameId=' + configGet('gameId') + '&gameTime=' + $scope.elapsedGameTime,
                'twitter-share',
                'width=400,height=300,toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=1,left=0,top=0'
            );
        }

        var fbPost = function (fbId, response1) {
            FB.api(
                "/" + fbId,
                function (response2) {
                    if (response2 && !response2.error) {
                        FB.ui({
                            method: 'share',
                            display: 'popup',
                            href: 'http://www.halloweenhorrornights.com.sg/',
                        }, function (response3) {
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

        var postToDb = function (param) {
            console.log('postToDb()');
            $http({
                method: 'POST',
                url: configGet('apiUrl') + 'game/submit',
                data: param
            }).then(
                function (success) {
                    console.log('postToDb success');
                    console.log(success);
                },
                function (error) {
                    console.log('postToDb ERROR');
                    console.log(error);
                }
            );
        }

        $scope.highlight = function (param, angEvent, x1, x2, y1, y2) {
            //console.log( angEvent.offsetX, angEvent.offsetY, x1, x2, y1, y2);
            if (
                (angEvent.offsetX < x1 || angEvent.offsetX > x2) ||
                (angEvent.offsetY < y1 || angEvent.offsetY > y2)
            ) {
                return;
            }
            else {
                console.log('highlight');
                window.tempSprite[param - 1].to(5);
            }
        }

        $scope.startGame = function () {

            gameStartTime = performance.now();

            $scope.playSfx('enter-game');

            $scope.triesLeft = 4;

            hidePage('.fadePage');
            $('#pageLanding').fadeOut(400);
            hidePage('#pageFails');
            if (Modernizr.mq('(max-width: 769px)')) {

                showPage('.bottomArea');
            }
            var tempMsg = $scope.getContent('clue');
            $scope.parentData.currentMsg = tempMsg[currentItemIdx - 1];
            window.tempSprite = [];
            for (var i = 0; i < 10; i++) {

                $('#clue-' + (i + 1)).css("background", "transparent url( img/items/tool_glow_" + (i + 1) + ".png )  no-repeat 0 0");

                var element = document.getElementById('clue-' + (i + 1));
                var sprite = new Motio(element, {
                    fps: 12,
                    frames: 6
                });

                window.tempSprite[i] = sprite;

                $('#clue-' + (i + 1) + ' > div').mouseover(function (e) {
                    var idx = e.target.id.split('-');
                    idx = idx[1] - 1;
                    window.tempSprite[idx].to(5);
                })

                $('#clue-' + (i + 1) + ' > div').mouseout(function (e) {
                    var idx = e.target.id.split('-');
                    idx = idx[1] - 1;
                    window.tempSprite[idx].pause();
                    window.tempSprite[idx].toStart();
                })
            }
            if (Modernizr.mq('(max-width: 769px)')) {
                // if small device
                var view = window.activeScene.marzipanoObject.view();
                view.addEventListener('change', window.viewChange);
            }
            else {
                var view = window.activeScene.marzipanoObject.view();
                view.addEventListener('change', window.hideInteractionPrompt);
                // show drag icon
                showPage('#interactionPromptTemp');
            }
            // hidePage( '#bottomArea' );
        }

        $scope.revealBottomClue = function () {
            console.log('showing');
            $('.bottomArea').fadeIn();
            $('.bloodBox').addClass('activeGlow');
            activeGlowTimerId = $timeout(function () {
                $('.bloodBox').removeClass('activeGlow');
            }, 1000);
            //$( '#bottomArea' ).fadeIn();
        }

        $scope.playSfx = function (param) {
            window.playSfx(param);
        }

        var tempLang = getUrlVar('lang');
        if (tempLang) {
            $scope.lang = tempLang.toLowerCase();
            if ($scope.lang != 'en' && $scope.lang != 'zh') {
                $scope.lang = 'en';
            }
        }

        /*
        *   PRELOADER FOR IMAGES AND AUDIOS
        */
        var loadManifest = function ($data, callback) {

            $http({
                method: 'GET',
                url: 'manifest/manifest-bow.json',
            }).then(
                function (success) {
                    loadImages(success.data);
                    // console.log(success.data);
                },
                function (error) {
                    console.log(error);
                }
            );

        };

        var loadImages = function ($data) {

            var count = 0;

            angular.forEach($data.images, function (value, key) {

                var img = new Image();

                img.onload = function () {
                    count++;
                    if (count === $data.images.length) {
                        //after loading images, proceed to load audios
                        $scope.gameIsLoaded = true;
                        loadAudios();

                    }
                };

                // img.src = 'img/'+value;
                img.src = cdn_url + '/' + value;
            });

        };

        var audioFiles = [
            cdn_url + "/bow/audio/bow_bgm.mp3",
            cdn_url + "/bow/audio/correct.mp3",
            cdn_url + "/bow/audio/wrong.mp3",
            cdn_url + "/bow/audio/fail.mp3"
        ];

        var preloadAudio = function (url) {
            var audio = new Audio();
            // once this file loads, it will call loadedAudio()
            // the file will be kept by the browser as cache
            audio.addEventListener('canplaythrough', loadedAudio, false);
            audio.src = url;
        };

        var loadAudios = function () {

            for (var i in audioFiles) {
                preloadAudio(audioFiles[i]);
            }
        };

        var loaded = 0;
        function loadedAudio() {
            // this will be called every time an audio file is loaded
            // we keep track of the loaded files vs the requested files
            loaded++;
            if (loaded == audioFiles.length) {
                // all have loaded
                // showPage('#pageLanding');
                $('.preloader').fadeOut(400);
                // showPage('#pageLanding');
            }
        }

        //  on first load, show preloader first and load the assets
        if (!$scope.gameIsLoaded) {
            showPage('.preloader');
            loadManifest();
            // hidePage('.preloader');
        }

        // $( '#bottomArea' ).hide();
        hidePage('#interactionPromptTemp');
        hidePage('.bottomArea');

        // $scope.startGame();
        // showPage( '#pageShare' );
        showPage('#pageLanding');
        // hidePage( '#pano' );
        // showPage( '#pageShare' );
        // showPage( '#pageFails' );

    }]);

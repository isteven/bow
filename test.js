! function() {
    "use strict";
    angular.module("source", ["ngAnimate", "ngCookies", "ngTouch", "ngSanitize", "ngMessages", "ngAria", "ui.router", "monospaced.mousewheel"])
}(),
function() {
    "use strict";

    function e() {
        function e(e) {
            var s = this;
            s.active = !1, e.$on("menu.toggle", function() {
                s.active = !s.active
            })
        }

        function s(e, s, t, i, a) {}
        e.$inject = ["$scope"];
        var t = {
            restrict: "E",
            templateUrl: "app/components/menu/menu.html",
            scope: {},
            link: s,
            controller: e,
            controllerAs: "menu",
            bindToController: !0
        };
        return t
    }
    angular.module("source").directive("menu", e)
}(),
function() {
    "use strict";

    function e() {
        function e(e) {
            var s = this;
            s.popupActive = !1, this.showPopup = function(e) {
                console.log("show: " + e), s.section = e, s.popupActive = !0
            }, this.hidePopup = function(e) {
                console.log("hide"), s.popupActive = !1
            }, e.scrollDown = function() {
                e.$parent.$broadcast("scroll down")
            }
        }

        function s(e, s, t, i, a) {}
        e.$inject = ["$scope"];
        var t = {
            restrict: "E",
            templateUrl: "app/components/footer/footer.html",
            scope: {},
            link: s,
            controller: e,
            controllerAs: "footer",
            bindToController: !0
        };
        return t
    }
    angular.module("source").directive("footer", e)
}(),
function() {
    "use strict";

    function e() {
        function e() {}

        function s(e, s, t, i, a) {}
        var t = {
            restrict: "E",
            templateUrl: "app/components/equalizer/equalizer.html",
            scope: {},
            link: s,
            controller: e,
            controllerAs: "vm",
            bindToController: !0
        };
        return t
    }
    angular.module("source").directive("equalizer", e)
}(),
function() {
    "use strict";

    function e() {
        function e() {}

        function s(e, s, t, i, a) {
            e.calendar.size = t.size
        }
        var t = {
            restrict: "E",
            templateUrl: "app/components/calendar/calendar.html",
            scope: {},
            transclude: !0,
            link: s,
            controller: e,
            controllerAs: "calendar",
            bindToController: !0
        };
        return t
    }

    function s() {
        function e() {}

        function s(e, s, t, i, a) {}
        var t = {
            restrict: "A",
            scope: {},
            link: s,
            controller: e,
            controllerAs: "calendarItem",
            bindToController: !0
        };
        return t
    }
    angular.module("source").directive("calendar", e).directive("calendarItem", s)
}(),
function() {
    "use strict";

    function e() {
        function e(e) {
            e.showItem = function(e) {}
        }

        function s(e, s, t, i, a) {
            var l = $(".accordion__link"),
                n = $(".accordion__content"),
                o = $(".accordion__item").eq(0).find(".accordion__content");
            o.addClass("is-active"), o.prev().addClass("is-active"), n.each(function() {
                $(this).attr("data-height", $(this)[0].clientHeight), $(this).height(0)
            }), TweenMax.to(o, 1, {
                height: o.attr("data-height"),
                ease: Expo.easeOut
            }), l.click(function() {
                var e = ($(this).parent().index(), $(this).next()),
                    s = $(".accordion__content.is-active");
                s.removeClass("is-active"), s.prev().removeClass("is-active"), TweenMax.to(s, 1, {
                    height: 0,
                    ease: Expo.easeOut,
                    onComplete: function() {}
                }), e.prev().addClass("is-active"), e.addClass("is-active"), TweenMax.to(e, 1, {
                    height: e.attr("data-height"),
                    ease: Expo.easeOut,
                    onComplete: function() {}
                })
            })
        }
        e.$inject = ["$scope"];
        var t = {
            restrict: "EA",
            templateUrl: "app/components/accordion/accordion.html",
            transclude: !0,
            link: s,
            controller: e,
            controllerAs: "vm",
            bindToController: !0
        };
        return t
    }
    angular.module("source").directive("accordion", e)
}(),
function() {
    "use strict";

    function e(e, s) {
        var t = this;
        s({
            url: "app/data/tickets.json",
            type: "GET"
        }).success(function(e) {
            t.categories = e.categories
        })
    }
    e.$inject = ["$scope", "$http"], angular.module("source").controller("TicketsController", e)
}(),
function() {
    "use strict";

    function e() {
        var e = this;
        e.howTo = [{
            name: "Train/<br>Sentosa Express",
            slug: "train-express"
        }, {
            name: "Bus",
            slug: "bus"
        }, {
            name: "Car",
            slug: "car"
        }, {
            name: "Taxi",
            slug: "taxi"
        }, {
            name: "Cable Car",
            slug: "cable-car"
        }, {
            name: "On Foot",
            slug: "on-foot"
        }, {
            name: "Tourist Coach<br>(Johor)",
            slug: "tourist-coach"
        }]
    }
    angular.module("source").controller("InformationController", e)
}(),
function() {
    "use strict";

    function e(e, s) {
        window.sr = ScrollReveal({
            container: ".gallery",
            delay: 200,
            distance: "290px",
            duration: 2e3,
            rotate: {
                x: 30
            },
            easing: "cubic-bezier(0.19, 1, 0.22, 1)",
            viewFactor: .2
        }), s.$on("scroll down", function() {
            console.log("down"), TweenMax.to($(".page.home"), 1.3, {
                yPercent: -100,
                ease: Expo.easeOut
            }), TweenMax.to($(".page.gallery"), 1, {
                yPercent: -100,
                ease: Expo.easeOut,
                onComplete: function() {
                    sr.reveal(".img")
                }
            })
        }), s.$on("$viewContentLoaded", function() {})
    }

    function s() {
        var e = {
            restrict: "EA",
            link: function(e, s) {
                console.log("blah");
                var t = Math.round(200 * Math.random()) + 100;
                s.css({
                    margin: t + "px 0 0"
                })
            }
        };
        return e
    }
    e.$inject = ["$timeout", "$scope"], angular.module("source").controller("MainController", e).directive("scrollImage", s)
}(),
function() {
    "use strict";

    function e() {}
    angular.module("source").controller("HighlightsController", e)
}(),
function() {
    "use strict";

    function e() {
        window.sr = ScrollReveal({}), sr.reveal(".foo", {
            duration: 2e3,
            distance: "500px",
            rotate: {
                x: 35
            }
        })
    }
    angular.module("source").controller("GalleryController", e)
}(),
function() {
    "use strict";

    function e(e) {
        var s = this;
        s.menu = [{
            name: "Photos",
            slug: "photos"
        }, {
            name: "Videos",
            slug: "videos"
        }, {
            name: "Community",
            slug: "community"
        }, {
            name: "Snaps",
            slug: "snaps"
        }, {
            name: "Testimonials",
            slug: "testimonials"
        }], s.activeCategory = s.menu[0].slug
    }
    e.$inject = ["$scope"], angular.module("source").controller("EventGuideGalleryController", e)
}(),
function() {
    "use strict";

    function e(e, s) {
        var t = this;
        t.activeCategory = "", t.menu = [{
            name: "Photos",
            slug: "photos"
        }, {
            name: "Videos",
            slug: "videos"
        }, {
            name: "Community",
            slug: "community"
        }, {
            name: "Snaps",
            slug: "snaps"
        }, {
            name: "Testimonials",
            slug: "testimonials"
        }], s({
            url: "app/data/roadshows.json",
            type: "GET"
        }).then(function(e) {
            t.listings = e.data.roadshows, console.log(t.roadshows)
        }), e.$watch("activeCategory", function() {
            console.log("loaded");
            var e = new Freewall("#freewall");
            e.reset({
                selector: "li",
                animate: !0,
                cellW: 200,
                cellH: "auto",
                onResize: function() {
                    e.fitWidth()
                }
            }), e.container.find("li").load(function() {
                e.fitWidth()
            })
        }, !0)
    }
    e.$inject = ["$scope", "$http"], angular.module("source").controller("EventGuideController", e)
}(),
function() {
    "use strict";

    function e(e, s) {
        e.debug("runBlock end"), s.init = !0
    }
    e.$inject = ["$log", "$rootScope"], angular.module("source").run(e)
}(),
function() {
    "use strict";

    function e(e, s, t) {
        e.state("home", {
            url: "/",
            templateUrl: "app/main/main.html",
            controller: "MainController",
            controllerAs: "main"
        }).state("gallery", {
            url: "/gallery",
            templateUrl: "app/gallery/gallery.html",
            controller: "GalleryController",
            controllerAs: "gallery"
        }).state("tickets", {
            url: "/tickets",
            templateUrl: "app/tickets/tickets.html",
            controller: "TicketsController",
            controllerAs: "tickets"
        }).state("highlights", {
            url: "/highlights",
            templateUrl: "app/highlights/highlights.html",
            controller: "HighlightsController",
            controllerAs: "highlights"
        }).state("highlights.section", {
            url: "/:section",
            templateUrl: function(e) {
                return "app/highlights/highlights." + e.section + ".html"
            }
        }).state("information", {
            url: "/information",
            templateUrl: "app/information/information.html",
            controller: "InformationController",
            controllerAs: "information"
        }).state("information.section", {
            url: "/:section",
            templateUrl: function(e) {
                return "app/information/" + e.section + ".html"
            }
        }).state("event-guide", {
            url: "/event-guide",
            templateUrl: "app/eventGuide/eventGuide.html"
        }).state("event-guide.section", {
            url: "/:section",
            templateUrl: function(e) {
                return "app/eventGuide/eventGuide." + e.section + ".html"
            }
        }), s.otherwise("/")
    }
    e.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"], angular.module("source").config(e)
}(),
function() {
    "use strict";
    angular.module("source").directive("box", function() {
        return {
            restrict: "EA",
            link: function(e, s, t) {
                s.addClass("box"), s.css({
                    padding: t.border + "px"
                })
            },
            transclude: !0,
            template: '<div class="inner" ng-transclude></div>'
        }
    })
}(),
function() {
    "use strict";

    function e(e, s, t, i, a) {
        var l = this;
        $(".fog");
        s.$state = i, s.calendarOpen = !1, l.fogX = 0, e.$on("bgTransitionStart", function() {
            s.showFog = !1, console.log("state change start"), TweenMax.to($(".fog"), .5, {
                opacity: 0
            })
        }), e.$on("bgTransitionComplete", function() {
            s.showFog = !0, console.log("view loaded"), TweenMax.to($(".fog"), .5, {
                opacity: 1
            })
        }), s.mousewheel = function(e, s, t, i) {}, s.menuToggle = function() {
            s.$broadcast("menu.toggle")
        }, s.mousemove = function(e) {
            var s = e.pageX / 10 - a.innerWidth / 10,
                t = e.pageY / 10 - a.innerHeight / 10;
            TweenMax.to($(".fog"), 2, {
                x: -s,
                y: -t
            })
        }
    }
    e.$inject = ["$rootScope", "$scope", "$timeout", "$state", "$window"], angular.module("source").controller("IndexController", e)
}(),
function() {
    "use strict";
    angular.module("source").constant("malarkey", malarkey).constant("moment", moment)
}(),
function() {
    "use strict";

    function e(e) {
        e.debugEnabled(!0)
    }
    e.$inject = ["$logProvider"], angular.module("source").config(e)
}(),
function() {
    "use strict";
    angular.module("source").animation(".animate", ["$window", "$rootScope", "$timeout", function(e, s, t) {
        return {
            enter: function(e, t) {
                s.$apply(function() {
                    s.$broadcast("bgTransitionStart")
                }), e.css({
                    overflowY: "auto"
                }), TweenMax.fromTo(e, 1.2, {
                    yPercent: 80,
                    rotationX: 20
                }, {
                    yPercent: 0,
                    rotationX: 0,
                    ease: Expo.easeInOut
                }), TweenMax.fromTo(e, 1.2, {
                    opacity: .2
                }, {
                    opacity: 1,
                    delay: .3,
                    ease: Expo.easeInOut,
                    onComplete: function() {
                        s.$apply(function() {
                            s.$broadcast("bgTransitionComplete")
                        }), e.css({
                            zIndex: 1
                        }), e.css({
                            overflowY: "hidden"
                        }), t()
                    }
                })
            },
            leave: function(e, t) {
                e.css({
                    overflowY: "hidden"
                }), s.animating = !0, s.$apply(), TweenMax.fromTo(e, 1.2, {
                    yPercent: 0
                }, {
                    yPercent: -100,
                    ease: Expo.easeInOut,
                    onComplete: function() {
                        s.$apply(function() {
                            s.animating = !1, s.$broadcast("bgTransitionComplete")
                        }), e.css({
                            overflowY: "auto"
                        }), t()
                    }
                })
            }
        }
    }])
}(), angular.module("source").run(["$templateCache", function(e) {
    e.put("app/eventGuide/eventGuide.gallery.html", '<div ng-controller="EventGuideGalleryController as event"><h2>Gallery & Testimonials</h2><ul class="list--reset list--horizontal tabs__nav" ng-init=""><li ng-class="{ \'is-active\' : event.activeCategory == category.slug }" ng-repeat="category in event.menu" ng-click="event.activeCategory = category.slug " ng-bind-html=category.name>{{ category.name }}</li></ul><div ng-switch=event.activeCategory class=tabs__pane><div ng-switch-when=photos class=simple-fade-in><div class=tabs__header><h3>Photos</h3><div class=event__year><select><option>2016</option><option>2015</option><option>2014</option></select></div></div><ul class="list--reset photos__list"><li class=photos__item><img src=assets/images/gallery/thumb.jpg></li><li class=photos__item><img src=assets/images/gallery/thumb.jpg></li><li class=photos__item><img src=assets/images/gallery/thumb.jpg></li><li class=photos__item><img src=assets/images/gallery/thumb.jpg></li><li class=photos__item><img src=assets/images/gallery/thumb.jpg></li><li class=photos__item><img src=assets/images/gallery/thumb.jpg></li><li class=photos__item><img src=assets/images/gallery/thumb.jpg></li><li class=photos__item><img src=assets/images/gallery/thumb.jpg></li><li class=photos__item><img src=assets/images/gallery/thumb.jpg></li><li class=photos__item><img src=assets/images/gallery/thumb.jpg></li><li class=photos__item><img src=assets/images/gallery/thumb.jpg></li><li class=photos__item><img src=assets/images/gallery/thumb.jpg></li><li class=photos__item><img src=assets/images/gallery/thumb.jpg></li><li class=photos__item><img src=assets/images/gallery/thumb.jpg></li><li class=photos__item><img src=assets/images/gallery/thumb.jpg></li><li class=photos__item><img src=assets/images/gallery/thumb.jpg></li><li class=photos__item><img src=assets/images/gallery/thumb.jpg></li><li class=photos__item><img src=assets/images/gallery/thumb.jpg></li><li class=photos__item><img src=assets/images/gallery/thumb.jpg></li><li class=photos__item><img src=assets/images/gallery/thumb.jpg></li><li class=photos__item><img src=assets/images/gallery/thumb.jpg></li></ul></div><div ng-switch-when=videos class=simple-fade-in><div class=tabs__header><h3>Videos</h3><div class=event__year><select><option>2016</option><option>2015</option><option>2014</option></select></div><ul class="list--reset videos__list"><li class=videos__item><div class=videos__item__inner><div border=3 class=videos__item__overlay><h3 class=videos__item__title>Video Title</h3></div><img src=assets/images/highlights/videos/thumb.jpg></div></li><li class=videos__item><div class=videos__item__inner><div border=3 class=videos__item__overlay><h3 class=videos__item__title>Video Title</h3></div><img src=assets/images/highlights/videos/thumb.jpg></div></li><li class=videos__item><div class=videos__item__inner><div border=3 class=videos__item__overlay><h3 class=videos__item__title>Video Title</h3></div><img src=assets/images/highlights/videos/thumb.jpg></div></li><li class=videos__item><div class=videos__item__inner><div border=3 class=videos__item__overlay><h3 class=videos__item__title>Video Title</h3></div><img src=assets/images/highlights/videos/thumb.jpg></div></li><li class=videos__item><div class=videos__item__inner><div border=3 class=videos__item__overlay><h3 class=videos__item__title>Video Title</h3></div><img src=assets/images/highlights/videos/thumb.jpg></div></li><li class=videos__item><div class=videos__item__inner><div border=3 class=videos__item__overlay><h3 class=videos__item__title>Video Title</h3></div><img src=assets/images/highlights/videos/thumb.jpg></div></li></ul></div></div><div ng-switch-when=community class=simple-fade-in><h3>Community</h3></div><div ng-switch-when=snaps class=simple-fade-in><h3>Snaps</h3></div><div ng-switch-when=testimonials class="simple-fade-in testimonials"><h3>Testimonials</h3><div class=h-clearfix><div class=col><ul class="list--reset testimonials__list"><li class=testimonials__item><p>â€œHalloween Horror Nights 4 was out of this world, my friends and I had so much fun! Expect the unexpected!â€</p><h4 class=testimonials__item__name>Russell Ong</h4><span class=testimonials__item__info>Singapore National Swimmer</span></li><li class=testimonials__item><p>â€œIt was very scary but also kind of fun to scream your lungs out.â€</p><h4 class=testimonials__item__name>XiaXue</h4><span class=testimonials__item__info>Asia Pacificâ€™s Top Blogger</span></li><li class=testimonials__item><p>â€œThe best part about of what you do is that I can bring my 5 and 3 year old, it\'s just scary enough where they get startled but not afraid. You\'re a big part of why we all enjoy Halloween!â€</p><h4 class=testimonials__item__name>Joe</h4></li><li class=testimonials__item><p>â€œHalloween Horror Nights 4 was out of this world, my friends and I had so much fun! Expect the unexpected!â€</p><h4 class=testimonials__item__name>Russell Ong</h4><span class=testimonials__item__info>Singapore National Swimmer</span></li></ul></div><div class=col><ul class="list--reset testimonials__list"><li class=testimonials__item><p>â€œHailed as a comprehensive Halloween theme park experience, the attraction features movie-quality haunted houses and four immersive scare zones, on top of rides and shows.â€</p><h4 class=testimonials__item__name>The Star</h4></li><li class=testimonials__item><p>â€œScream time & blood-stopping arm grabs.. My first horror night in USS was absolutely 101% awesome.â€</p><h4 class=testimonials__item__name>Chloeandchoo.com</h4></li><li class=testimonials__item><p>â€œHalloween Horror Nights 4 was out of this world, my friends and I had so much fun! Expect the unexpected!â€</p><h4 class=testimonials__item__name>Russell Ong</h4><span class=testimonials__item__info>Singapore National Swimmer</span></li><li class=testimonials__item><p>â€œHalloween Horror Nights 4 was out of this world, my friends and I had so much fun! Expect the unexpected!â€</p><h4 class=testimonials__item__name>Russell Ong</h4><span class=testimonials__item__info>Singapore National Swimmer</span></li></ul></div><div class=col><ul class="list--reset testimonials__list"><li class=testimonials__item><p>â€œMati Camp at Halloween Horror Nights 4 at Universal Studions Singapore is a MUST for horror fans.â€</p><h4 class=testimonials__item__name>TODAY</h4></li><li class=testimonials__item><p>â€œI was freaking scared, but was having so much fun with my friends. I loved it and will be back next week for more!â€</p><h4 class=testimonials__item__name>Geraldine Chan</h4></li><li class=testimonials__item><p>â€œHalloween Horror Nights 4 was out of this world, my friends and I had so much fun! Expect the unexpected!â€</p><h4 class=testimonials__item__name>Russell Ong</h4><span class=testimonials__item__info>Singapore National Swimmer</span></li><li class=testimonials__item><p>â€œHalloween Horror Nights 4 was out of this world, my friends and I had so much fun! Expect the unexpected!â€</p><h4 class=testimonials__item__name>Russell Ong</h4><span class=testimonials__item__info>Singapore National Swimmer</span></li></ul></div></div></div></div></div>'), e.put("app/eventGuide/eventGuide.html", '<div class="page event" style="background-image:url(\'assets/images/bg-tickets.jpg\')"><div class=wrapper><ui-view></ui-view></div></div>'), e.put("app/eventGuide/eventGuide.roadshows.html", '<div class=roadshows ng-controller="EventGuideController as roadshows"><h2>Roadshows</h2><div class=roadshows__row ng-repeat="list in roadshows.listings"><h3>{{ list.category }}</h3><table class=table--basic cellspacing=0><tr><th width=20%>Road show</th><th width=40%>Description</th><th width=25%>Date and time</th><th width=15%>&nbsp;</th></tr><tr ng-repeat="event in list.events"><td><p><strong>{{ event.venue }}</strong></p></td><td><p>{{ event.description }}</p></td><td><p ng-bind-html=event.date></p></td><td><p><a href="">View map</a></p></td></tr></table></div></div>'), e.put("app/gallery/gallery.html", '<div class=page style="text-align:center;font-size:50px;background-color: #999;background-image:url(\'assets/images/bg-social.jpg\')"><!--   <img class="foo" src="http://placekitten.com/480/480"/>\n  <img class="foo" src="http://placekitten.com/480/480"/>\n  <img class="foo" src="http://placekitten.com/480/480"/>\n  <img class="foo" src="http://placekitten.com/480/480"/>\n  <img class="foo" src="http://placekitten.com/480/480"/>\n  <img class="foo" src="http://placekitten.com/480/480"/>\n  <img class="foo" src="http://placekitten.com/480/480"/>\n  <img class="foo" src="http://placekitten.com/480/480"/>\n  <img class="foo" src="http://placekitten.com/480/480"/>\n  <img class="foo" src="http://placekitten.com/480/480"/>\n  <img class="foo" src="http://placekitten.com/480/480"/>\n  <img class="foo" src="http://placekitten.com/480/480"/>\n  <img class="foo" src="http://placekitten.com/480/480"/>\n  <img class="foo" src="http://placekitten.com/480/480"/> --></div>'), e.put("app/highlights/highlights.html", '<div class="page highlights"><ui-view class="view--subsection animate"></ui-view></div>'), e.put("app/highlights/highlights.main.html", '<div class="highlights__main highlights--landing"><div class="highlights__content h-clearfix"><div class=highlights__content__inner><h2>Summon The Evil Within</h2><p>An evil entity will be summoned every week.<br>Survive their tests and collect five special codes to unlock<br>the horror within the final haunting.</p><h4>Enter the gates of evil below:</h4><ul class="landing__games__list list--reset"><li><a href="">Old Changi Hospital</a></li><li><a href="">Bodies of Work</a></li><li><a href="">Hu Li\'s Inn</a></li><li><a href="">Hawker Centre Massacre</a></li><li><a href="">The Salem Witch House</a></li><li><a href="">The Final Haunting</a></li></ul><img class=landing__summon src=assets/images/highlights/summon_29jul.png></div></div></div>'), e.put("app/highlights/highlights.rewards.html", '<div class="highlights__main highlights--rewards" style="background-image:url(\'../assets/images/highlights/bg-rewards.jpg\')"><div class="highlights__content h-clearfix"><h2>Evil Rewards</h2><h4>Win great prizes at every reveal</h4><div><div class=col><span class="rewards__2 gfx--2">2</span><p class=rewards__details>pairs of General Admission tickets every Week</p><p>Survive the test and share it on Facebook or Twitter at every haunting reveal to qualify for the draw. Complete in the shortest time to win!</p></div><div class=col><span class="rewards__2 gfx--2">2</span><p class=rewards__details>pairs of exclusive Invites for<br>Preview Night</p><p>Unlock the final haunting and be one of the first to experience Halloween Horror Nights 6. Every haunted house shared increases your chances of winning.</p></div></div><div class=rewards__tnc><a class=link--bright href="">Terms & Conditions</a> apply.</div></div><!-- <img class="highlights__bg" src="assets/images/highlights/bg-rewards.jpg" /> --></div>'), e.put("app/includes/calendar-overlay.html", '<a href="" class="calendar__close icon--close" ng-click="$parent.calendarOpen = false"></a><div class=calendar__wrapper><calendar style=display:inline-block size=large></calendar><div class=calendar__promos><h2>Tickets & Promotions</h2><ul class=list--reset><li class=calendar__promos__item><strong>15% off Early Bird Special</strong><br>From now till 28 August.<br><em>S$55</em> (U.P. S$68) <a class="btn btn--textured btn__buynow">Buy now</a></li><li class=calendar__promos__item><strong>Online Exclusive "Buy 3 Get 1 Free"</strong><br>Limited to the first 2,350 packages purchased only.<br><em>S$51 each</em> <a class="btn btn--textured btn__buynow">Buy now</a></li><li class=calendar__promos__item><strong>Express Pass</strong><br>Skip the queue with the Express Pass.<br>(Only valid in combination with an admission ticket.)<br><em>S$50</em> <a class="btn btn--textured btn__buynow">Buy now</a></li></ul><p><a href="" class="btn btn--textured">View all promotions</a></p></div></div>'), e.put("app/includes/header.html", '<header class=hdr><a class=hdr__logo ui-sref=home ng-hide="$state.is(\'home\')"><img src=assets/images/logo-narrow.png></a><div class=hdr__quicklinks ng-hide="$state.is(\'home\')"><h4><small>Select nights</small><br>30 Sep - 31 Oct</h4><a class="btn btn--textured btn--calendar" href="" ng-click="$parent.calendarOpen = true">View calendar <span class=icon--calendar></span></a> <a class="btn btn--textured btn--tickets" href="">Buy tickets <span class=icon--tickets></span></a></div><a class=nav__toggle href="" ng-click=menuToggle()><span class=icon--menu></span></a><menu></menu></header>'), e.put("app/information/faq.html", '<h2>FAQ</h2><accordion><ul class=list--reset><li class=accordion__item><a class=accordion__link href="" ng-click=click()>WHAT IS HALLOWEEN HORROR NIGHTS<sup>â„¢</sup> 6?</a><div class=accordion__content><p>Itâ€™s the sixth edition of Southeast Asiaâ€™s largest and most intense Halloween event at Universal Studios Singapore. The park will once again be transformed after-hours into a horrifying territory claimed by monsters, demons and ghouls, making guest feel like they are immersed in the depths of horror. This year, the event runs for 16 select nights during September & October, with extended hours, new storylines and new iconic characters. There are 7 haunted attractions â€“ 5 haunted houses, 2 scare zones this year. Also back by popular demand is Jack the Clown in a brand new show in Pantages Theater. There are also 2 safe zones for guests to relax and take a break from the intense horrors of the event. In addition, guests can enjoy the theme parkâ€™s top rides at night, such as TRANSFORMERS The Ride: The Ultimate 3D Battle, Revenge Of The Mummy<sup>Â®</sup>, Battlestar Galactica: HUMAN<sup>Â®</sup>, Battlestar Galactica: CYLON<sup>Â®</sup>, and many more! Definitely an event not to be missed, especially for the thrill-seekers, adrenaline junkies and horror film buffs!</p></div></li><li class=accordion__item><a class=accordion__link href="">I HAVE ALREADY PAID FOR DAY PASSES TO UNIVERSAL STUDIOS SINGAPORE. WHY DO I HAVE TO BUY ANOTHER TICKET FOR THIS EVENT, WHEN IT IS HELD AT THE SAME LOCATION?</a><div class=accordion__content><p>Halloween Horror Nights<sup>â„¢</sup> Â 6 is a special ticketed event that transforms Universal Studios Singapore into the largest and most immersive horror experience in Southeast Asia. We go to great lengths to produce world-class sets, featured in 2 scare zones and 5 haunted houses, which completely change the park into an authentic horror movie set with hundreds of scare-actors and elaborate props.</p><p>Selected rides and attractions will also be open to guests.</p><p>Guest visiting Universal Studios Singapore during the day will be able to purchase Halloween Horror Nights<sup>â„¢</sup> Â Stay & Scream Tickets for the same date for an additional fee.</p></div></li><li class=accordion__item><a class=accordion__link href="">ARE THERE SPECIAL RATES FOR THIS EVENT?</a><div class=accordion__content><p>Yes, please log on toÂ <a href=http://www.halloweenhorrornights.com.sg target=_blank>www.halloweenhorrornights.com.sg</a>Â orÂ <a href=http://www.rwsentosa.com target=_blank>www.rwsentosa.com</a>Â to purchase tickets. Tickets are also available to purchase at the ticket booths and Guest Services located at the Universal Studios Singapore entrance.</p></div></li><li class=accordion__item><a class=accordion__link href="">WHAT IS THE KEY HIGHLIGHT OF THE EVENT?</a><div class=accordion__content><p></p><p>There are many highlights for this event:</p><ul><li>Guest can experience 5 brand new original haunted houses and 2 scare zones with extended hours for both peak and non-peak event days.</li><li>Guests can experience selected world-class Universal Studios Singapore rides and attractions at night.</li><li>Guests can also purchase the Frequent Fear Pass to enter the event multiple times on all event nights.</li></ul><p></p></div></li><li class=accordion__item><a class=accordion__link href="">CAN I UPGRADE MY REGULAR DAY PASS TO THE FREQUENT FEAR PASS?</a><div class=accordion__content><p>No, Halloween Horror Nights<sup>â„¢</sup> Â 6 is a separately ticketed event. However, you may upgrade your Halloween Horror NightsTMÂ 6 ticket to the Frequent Fear Pass.</p></div></li><li class=accordion__item><a class=accordion__link href="">WILL THERE BE FIREWORKS?</a><div class=accordion__content><p>Lake Hollywood Spectacular<sup>â„¢</sup> will be postponed from 27th August please check <a href=http://www.rwsentosa.com target=_blank>www.rwsentosa.com</a> for further details.</p></div></li><li class=accordion__item><a class=accordion__link href="">WHAT IS THE MINIMUM AGE TO PARTICIPATE IN THE EVENT?</a><div class=accordion__content><p>Halloween Horror Nights<sup>â„¢</sup> Â  is a horror event, which is too intense for young children. Therefore, we do not recommend that children under the age of 13 attend the event.</p></div></li><li class=accordion__item><a class=accordion__link href="">CAN GUESTS BRING TODDLERS INTO THE PARK?</a><div class=accordion__content><p>Halloween Horror Nights<sup>â„¢</sup> Â  is a horror event, which is too intense for young children. Therefore, we do not recommend that children under the age of 13 attend the event.</p></div></li><li class=accordion__item><a class=accordion__link href="">IS THE PARK ACCESSIBLE FOR DISABLED GUESTS?</a><div class=accordion__content><p>Yes. Please note that guests travelling in electronic-convenience vehicles will be required to transfer to a manual wheelchair to experience the haunted houses and scare zones. Strollers, wheelchairs and electronic convenience vehicles are available for rental, subject to availability.</p></div></li><li class=accordion__item><a class=accordion__link href="">IS THERE A LIMITED NUMBER OF GUESTS THAT WILL BE PERMITTED INTO THE EVENT?</a><div class=accordion__content><p>It may be necessary to limit the number of visitors to ensure a quality experience. We encourage guests to purchase their tickets early.</p></div></li><li class=accordion__item><a class=accordion__link href="">WHAT DINING OPTIONS ARE AVAILABLE?</a><div class=accordion__content><p>Food and refreshments will be available in selected zones throughout the park.</p></div></li><li class=accordion__item><a class=accordion__link href="">WILL THERE BE THEMED MERCHANDISE FOR PURCHASE?</a><div class=accordion__content><p>Yes, there will be Halloween themed merchandise available at selected retail outlets.</p></div></li><li class=accordion__item><a class=accordion__link href="">WILL THERE BE HALAL OPTIONS AVAILABLE FOR GUESTS?</a><div class=accordion__content><p>Yes Melâ€™s Drive-in and Goldilocks are Halal restaurants within Universal Studios Singapore which will be open during Halloween Horror Nights<sup>â„¢</sup>Â 6</p></div></li><li class=accordion__item><a class=accordion__link href="">WILL THERE BE VEGETARIAN OPTIONS AVAILABLE FOR GUESTS?</a><div class=accordion__content><p>Yes, vegetarian options will be available at all Food & Beverage outlets during the event</p></div></li><li class=accordion__item><a class=accordion__link href="">WILL THERE BE REGULAR UNIVERSAL STUDIOS SINGAPORE<sup>Â®</sup>Â RIDES AND ATTRACTIONS OPEN DURING THE EVENT?</a><div class=accordion__content><p>Select regular shows/attractions will be available- TRANSFORMERS The Ride: The Ultimate Battle, Revenge of the Mummy, Battlestar Galactica: HUMAN, Battlestar Galactica: CYLON, Puss in Bootsâ€™ Giant Journey, Accelerator<sup>Â®</sup>, Canopy Flyer<sup>Â®</sup>Â and Enchanted Airways<sup>Â®</sup></p></div></li><li class=accordion__item><a class=accordion__link href="">CAN GUESTS BE IN COSTUME DURING THE EVENT?</a><div class=accordion__content><p>There are no costumes, make-up or masks allowed at this event. However guests are welcome to our Halloween themed face painting services available at the entrance to Universal Studios Singapore.</p></div></li></ul></accordion>'), e.put("app/information/how-to-get-there.html", '<h2>How to get there</h2><ul class="list--reset list--horizontal tabs__nav" ng-init="information.activeCategory = \'train-express\'"><li ng-class="{ \'is-active\' : information.activeCategory == category.slug }" ng-repeat="category in information.howTo" ng-click="information.activeCategory = category.slug " ng-bind-html=category.name>{{ category.name }}</li></ul><div ng-switch=information.activeCategory class=tabs__pane><div ng-switch-when=train-express class=simple-fade-in><h3>Train/Sentosa Express</h3></div><div ng-switch-when=bus class=simple-fade-in><h3>Public Bus Services to Resorts World Sentosa</h3><p>Public bus services ensure a convenient connection from the tourist belt and most hotels in the city to Resorts Worldâ„¢ Sentosa.</p><table class="table--basic info__table" cellspacing=0><tr><th width=10%>Bus No.</th><th width=20%>Board/Alight</th><th width=30%>Availability</th><th width=20%>Fares</th><th width=20%>Departing RWS</th></tr><tr><td><p><strong>RWS 8</strong></p></td><td><p>Outside VivoCity and HarbourFront Station bus stops</p><p>From 11:30pm only outbound from RWS</p></td><td><p>Daily</p><p>Extension timings for HHN nights only. Last bus departs RWS at</p><p>3.30am on 2, 3, 9, 11, 18, 25 & 29 Oct</p><p>4.30am on 10, 16, 17, 23, 24, 30 & 31 Oct</p></td><td><p>InBound - S$2.00 Outbound - Free</p></td><td><p>First bus: 6am<br>Last bus: 11.30pm</p></td></tr><tr><td><p><strong>188R</strong></p></td><td><p>Choa Chu Kang Interchange and or any 188R bus stops</p><p>Bus Frequency: about 35 minutes</p></td><td><p>Saturdays, Sundays & Public Holidays</p></td><td><p>S$1.50 - S$3.00</p></td><td><p>From Choa Chu Kang: 7am to 10pm</p><p>From RWS: 8.30am to 11.30pm</p></td></tr><tr><td><p><strong>963R</strong></p></td><td><p>Woodlands Regional and or any 963R bus stops</p><p>Bus Frequency: about 35 minutes</p></td><td><p>Saturdays, Sundays & Public Holidays</p></td><td><p>S$1.50 - S$3.00</p></td><td><p>From Woodlands: 7am to 10pm</p><p>From RWS: 8.30am to 11.30pm</p></td></tr></table></div><div ng-switch-when=car class=simple-fade-in><h3>Car</h3></div><div ng-switch-when=taxi class=simple-fade-in><h3>Taxi</h3></div><div ng-switch-when=cable-car class=simple-fade-in><h3>Cable car</h3></div><div ng-switch-when=on-foot class=simple-fade-in><h3>On foot</h3></div><div ng-switch-when=tourist-coach class=simple-fade-in><h3>Tourist Coach (Johor)</h3></div></div>'), e.put("app/information/how-to-survive.html", '<div class=info__survive><h2>How To Survive</h2><p>Just as there are house rules, entering the land of the dead requires you to abide by their code of conduct â€“ if you want to get out alive.</p><ul class="list--reset list--horizontal h-clearfix"><li><div class=icon--mask></div><br><p><strong>NO MASKS OR COSTUMES ARE ALLOWED</strong><br>your terrified face is all you need.</p></li><li><div class="icon--nosmoke icon--large"></div><br><p>No smoking or place-holding in the attraction queues.</p></li></ul><ul class="list--reset list--horizontal h-clearfix"><li><div class=icon--foul></div><br><p>Line jumping, foul language and behavior that is not appropriate in public will be dealt with accordingly, including possible expulsion from the event.</p></li><li><div class=icon--nofood></div><br><p>No food, drinks, bottles, laser pointers, video recording or photography of any kind are allowed in the haunted attractions. However screaming and crying is fine.</p></li></ul><ul class="list--reset list--horizontal h-clearfix"><li><div class=icon--lockers></div><br><p>All loose articles must be placed in lockers before riding Revenge of the MummyÂ®, Battlestar Galactica: HumanÂ® and Battlestar Galactica: CylonÂ®</p></li><li><div class="icon--touch icon--large"></div><br><p><strong>PLEASE DO NOT MISTREAT THE EVENTâ€™S â€œSCARE-ACTORSâ€</strong><br>They know where you live!</p></li></ul></div>'),
        e.put("app/information/information.html", '<div class="page info" style="background-image:url(\'assets/images/bg-tickets.jpg\')"><div class=wrapper><ui-view></ui-view></div></div>'), e.put("app/information/park-information.html", '<h2>Park information</h2><accordion><ul class=list--reset><li class=accordion__item><a class=accordion__link href="" ng-click=click()><span class="icon--accordion icon--hours"></span>Opening hours</a><div class=accordion__content><p><strong>Non-Peak Nights</strong><br>2, 3, 9, 11, 18, 25 and 29 October 7.30pm - 12.30am</p><p><strong>Peak Nights</strong><br>10, 16, 17, 23, 24, 30 and 31 October 7.30pm - 1.30am</p></div></li><li class=accordion__item><a class=accordion__link href=""><span class="icon--accordion icon--service"></span>Guest services</a><div class=accordion__content><p>Located to the left side of the Main Entrance inside the Studio.<br>Guest Services offers:<br><ul><li>Lost and Found Assistance</li><li>Lost Children Assistance</li></ul></p></div></li><li class=accordion__item><a class=accordion__link href=""><span class="icon--accordion icon--stroller"></span>Stroller & wheelchair rentals</a><div class=accordion__content><p>Located to the right side of the Main Entrance inside the Studio.</p></div></li><li class=accordion__item><a class=accordion__link href=""><span class="icon--accordion icon--firstaid"></span>First aid</a><div class=accordion__content><p>Located next to Stroller & Wheelchair Rentals â€” look for the white cross with green background.</p></div></li><li class=accordion__item><a class=accordion__link href=""><span class="icon--accordion icon--safety"></span>For your safety</a><div class=accordion__content><p><ul><li>Loose articles (sunglasses, cameras, hats, etc.) must be secured in the lockers or left with a non-rider prior to experiencing Revenge of the Mummy<sup>Â®</sup>, Battlestar Galactica: HUMAN<sup>Â®</sup> and Battlestar Galactica: CYLON<sup>Â®</sup></li><li>Attraction lockers are available for your use, free of charge for a set period of time.</li><li><p><strong>Additional height requirements are:</strong></p><p>Guests under 122cm may not ride Revenge of the Mummy<sup>Â®</sup></p><ul><li>Guests under 102cm may not ride TRANSFORMERS The Ride: The Ultimate 3D Battle</li><li>Guest under 92cm may not ride Canopy Flyer<sup>Â®</sup> and Enchanted Airways</li><li>Guests under 100cm may not ride Puss in Bootsâ€™ Giant Journey</li><li>Guests under 125cm may not ride Battlestar Galactica: HUMAN<sup>Â®</sup> and Battlestar Galactica: CYLON<sup>Â®</sup></li></ul><p>Please note and adhere to height requirements and health requirements posted at each attraction.</p><p>Children under 122cm in height must be accompanied by a supervising companion and must be able to sit upright, unassisted, on all rides.</p><p>Failure to follow posted attraction guidelines may result in serious injury or expulsion from the Studio.</p><p>Many haunted venues maintain safety admission requirements for guests with disabilities. Additional health requirements and guidelines are posted at each haunted venue. We apologise , but Electronic Convenience Vehicles (ECV) are not permitted on any ride vehicle or haunted venue. If you have questions, please see any Team Member or visit Guest Services.</p><p>A complimentary Rider\'s Guide for Rider\'s Safety and Guests with Disabilities is available at Guest Services.</p></li></ul></p></div></li><li class=accordion__item><a class=accordion__link href=""><span class="icon--accordion icon--mothers"></span>Expectant mothers</a><div class=accordion__content><p>Due to the nature of the attractions, expectant mothers are requested to avoid riding Accelerator<sup>Â®</sup>, Revenge of the Mummy<sup>Â®</sup>, Canopy Flyer<sup>Â®</sup>, Enchanted Airways, TRANSFORMERS The Ride: The Ultimate 3D Battle, Puss in Bootsâ€™ Giant Journey, Battlestar Galactica: HUMAN<sup>Â®</sup>, Battlestar Galactica: CYLON<sup>Â®</sup>, Hell House , Tunnel People, Siloso Gateway Block 50 and True Singapore Ghost Stories: The MRT- this is hhn5 haunted houses</p><p>We have provided comfortable areas where you may wait for your party.</p></div></li><li class=accordion__item><a class=accordion__link href=""><span class="icon--accordion icon--nosmoke"></span>Smoking information</a><div class=accordion__content><p>Universal Studio Singapore<sup>Â®</sup> strives to ensure Studio common areas are smoke-free.</p><p>Smoking is permitted only in areas designated by the smoking symbol in the park studio guide.</p></div></li><li class=accordion__item><a class=accordion__link href=""><span class="icon--accordion icon--readmission"></span>Re-admission</a><div class=accordion__content><p><ul><li>For same day re-admission, you must present your event admission ticket and hand stamp for re-entry.</li><li>Hand stamp can be obtained at the exit turnstile prior to exiting.</li></ul></p></div></li><li class=accordion__item><a class=accordion__link href=""><span class="icon--accordion icon--brochure"></span>Park hours, attractions and show times</a><div class=accordion__content><p>Event guides are located at the front gate turnstiles and selected restaurants and merchandise locations. In the event of lightning within close proximity to the Studio, we will, for the safety of our guests, close most of the outdoor attractions.</p></div></li><li class=accordion__item><a class=accordion__link href=""><span class="icon--accordion icon--touch"></span>Park rules & regulations</a><div class=accordion__content><p><ul><li><strong>NO COSTUMES, MAKE UP OR MASKS ALLOWED AT THIS EVENT</strong></li><li><strong>GUEST WEARING COSTUMES WILL BE TURNED AWAY AT THE FRONT GATE</strong></li><li><strong>THIS EVENT MAY BE TOO INTENSE FOR YOUNG CHILDREN AND IS NOT RECOMMENDED FOR CHILDREN UNDER THE AGE OF 13, ADULT DISCRETION IS STRONGLY ADVISED</strong></li><li>No outside food and beverages are allowed.</li><li>Proper attire, including shoes and shirts, must be worn at all times while visiting the Studio.</li><li>For the safety of your children, please ensure that they are supervised at all times.</li><li>No flash photography, video recording, eating, drinking or smoking is allowed inside any Universal Studio Singapore<sup>Â®</sup> attraction.</li><li>For your safety and to avoid injury, you must comply with all notices, directions and requests of any team member. Failure to follow posted attraction guidelines may result in serious injury.</li></ul></p></div></li></ul></accordion>'), e.put("app/information/section.html", "<h1>SECTION</h1>"), e.put("app/main/main.html", '<div class="page home"><div class=home__logo><img src=assets/images/logo-big.png></div><calendar size=small><h3><span>Be Engulfed By The</span><br>Darkness Within</h3></calendar><div class=home__game><h3>Haunting Unveiled</h3><a href="" class=home__game__frame><img class=home__game__image src=assets/images/och.jpg> </a>Win great prizes at each<br>reveal every week.<br><a href="">Explore Now</a></div></div><div class="page gallery h-clearfix"><div class=row><div class=col><img class=gallery__hashtag src=assets/images/gallery/hashtag.png></div><!--\n--><div class=col><img scroll-image class=img src=assets/images/gallery/thumb.jpg> <img scroll-image class=img src=assets/images/gallery/thumb.jpg> <img scroll-image class=img src=assets/images/gallery/thumb.jpg> <img scroll-image class=img src=assets/images/gallery/thumb.jpg> <img scroll-image class=img src=assets/images/gallery/thumb.jpg> <img scroll-image class=img src=assets/images/gallery/thumb.jpg> <img scroll-image class=img src=assets/images/gallery/thumb.jpg></div><!--\n--><div class=col><img scroll-image class=img src=assets/images/gallery/thumb.jpg> <img scroll-image class=img src=assets/images/gallery/thumb.jpg> <img scroll-image class=img src=assets/images/gallery/thumb.jpg> <img scroll-image class=img src=assets/images/gallery/thumb.jpg> <img scroll-image class=img src=assets/images/gallery/thumb.jpg> <img scroll-image class=img src=assets/images/gallery/thumb.jpg> <img scroll-image class=img src=assets/images/gallery/thumb.jpg></div><!--\n--><div class=col><img scroll-image class=img src=assets/images/gallery/thumb.jpg> <img scroll-image class=img src=assets/images/gallery/thumb.jpg> <img scroll-image class=img src=assets/images/gallery/thumb.jpg> <img scroll-image class=img src=assets/images/gallery/thumb.jpg> <img scroll-image class=img src=assets/images/gallery/thumb.jpg> <img scroll-image class=img src=assets/images/gallery/thumb.jpg> <img scroll-image class=img src=assets/images/gallery/thumb.jpg></div></div></div>'), e.put("app/tickets/tickets.html", '<div class="page tickets" style="background-color: #999;background-image:url(\'assets/images/bg-tickets.jpg\')"><div class=wrapper ng-init="tickets.activeCategory = \'admission-tickets\'"><h2>Tickets</h2><ul class="list--reset list--horizontal tabs__nav"><li ng-class="{ \'is-active\' : tickets.activeCategory == category.slug }" ng-repeat="category in tickets.categories" ng-click="tickets.activeCategory = category.slug ">{{ category.name }}</li></ul><div ng-switch=tickets.activeCategory class=tabs__pane><div ng-switch-when=admission-tickets class=simple-fade-in><h3>Admission Tickets</h3><ul class=list--reset><li class="tickets__item h-clearfix" ng-repeat="item in tickets.categories[0].items"><div class=tickets__description><span class=tickets__item__title>{{ item.title }}</span> <span class=tickets__item__details ng-if="typeof(item.details) !== \'undefined\'" ng-bind-html=item.details>{{ item.details }}</span></div><div class=tickets__price>S{{ item.price }}</div><div class=tickets__buynow><a href="" class=btn--textured>Buy now</a></div></li></ul></div><div ng-switch-when=frequent-fear-pass class=simple-fade-in><h3>Frequent Fear Pass</h3><h4>*** To be replaced ***</h4><h4>*** To be replaced ***</h4><ul class=list--reset><li class="tickets__item h-clearfix" ng-repeat="item in tickets.categories[0].items"><div class=tickets__description><span class=tickets__item__title>{{ item.title }}</span> <span class=tickets__item__details ng-if="typeof(item.details) !== \'undefined\'" ng-bind-html=item.details>{{ item.details }}</span></div><div class=tickets__price>S{{ item.price }}</div><div class=tickets__buynow><a href="" class=btn--textured>Buy now</a></div></li></ul></div><div ng-switch-when=rip-tour class=simple-fade-in><h3>R.I.P Tour</h3><h4>*** To be replaced ***</h4><ul class=list--reset><li class="tickets__item h-clearfix" ng-repeat="item in tickets.categories[0].items"><div class=tickets__description><span class=tickets__item__title>{{ item.title }}</span> <span class=tickets__item__details ng-if="typeof(item.details) !== \'undefined\'" ng-bind-html=item.details>{{ item.details }}</span></div><div class=tickets__price>S{{ item.price }}</div><div class=tickets__buynow><a href="" class=btn--textured>Buy now</a></div></li></ul></div><div ng-switch-when=add-ons class=simple-fade-in><h3>Add-ons</h3><h4>*** To be replaced ***</h4><h4>*** To be replaced ***</h4><h4>*** To be replaced ***</h4><h4>*** To be replaced ***</h4><ul class=list--reset><li class="tickets__item h-clearfix" ng-repeat="item in tickets.categories[0].items"><div class=tickets__description><span class=tickets__item__title>{{ item.title }}</span> <span class=tickets__item__details ng-if="typeof(item.details) !== \'undefined\'" ng-bind-html=item.details>{{ item.details }}</span></div><div class=tickets__price>S{{ item.price }}</div><div class=tickets__buynow><a href="" class=btn--textured>Buy now</a></div></li></ul></div><div ng-switch-when=hotel-packages class=simple-fade-in><h3>Hotel Packages</h3><h4>*** To be replaced ***</h4><h4>*** To be replaced ***</h4><ul class=list--reset><li class="tickets__item h-clearfix" ng-repeat="item in tickets.categories[0].items"><div class=tickets__description><span class=tickets__item__title>{{ item.title }}</span> <span class=tickets__item__details ng-if="typeof(item.details) !== \'undefined\'" ng-bind-html=item.details>{{ item.details }}</span></div><div class=tickets__price>S{{ item.price }}</div><div class=tickets__buynow><a href="" class=btn--textured>Buy now</a></div></li></ul></div></div></div></div>'), e.put("app/components/accordion/accordion.html", "<ng-transclude></ng-transclude>"), e.put("app/components/calendar/calendar.html", '<div class="calendar calendar--{{ calendar.size }}"><ng-transclude></ng-transclude><div class=calendar__box><table cellspacing=0><tr><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr><tr><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td><td calendar-item class=calendar__item--active><a href="">30</a></td><td calendar-item class=calendar__item--active><a href="">1</a></td></tr><tr><td>2</td><td>3</td><td>4</td><td>5</td><td class=calendar__item--active><a href="">6</a></td><td class=calendar__item--active><a href="">7</a></td><td class=calendar__item--active><a href="">8</a></td></tr><tr><td>9</td><td>10</td><td>11</td><td>12</td><td class=calendar__item--active><a href="">13</a></td><td class=calendar__item--active><a href="">14</a></td><td class=calendar__item--active><a href="">15</a></td></tr><tr><td>16</td><td>17</td><td>18</td><td>19</td><td class=calendar__item--active><a href="">20</a></td><td class=calendar__item--active><a href="">21</a></td><td class=calendar__item--active><a href="">22</a></td></tr><tr><td>23</td><td>24</td><td>25</td><td>26</td><td class=calendar__item--active style="border-bottom:1px #fff solid"><a href="">27</a></td><td class=calendar__item--active style="border-bottom:1px #fff solid"><a href="">28</a></td><td class=calendar__item--active style="border-bottom:1px #fff solid"><a href="">29</a></td></tr><tr><td class=calendar__item--active style="border-bottom:1px #fff solid"><a href="">30</a></td><td class=calendar__item--active style="border-bottom:1px #fff solid; border-right: 1px #fff solid"><a href="">31</a></td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr><tr><td class=calendar__legend colspan=7>Sold out, Selling fast, Available</td></tr></table></div></div>'), e.put("app/components/equalizer/equalizer.html", "<div class=bar-c><div id=bar-1 class=bar></div><div id=bar-2 class=bar></div><div id=bar-3 class=bar></div><div id=bar-4 class=bar></div><div id=bar-5 class=bar></div></div>"), e.put("app/components/footer/footer.html", '<img class=ftr__background src=assets/images/footer-mask.png> <a class=ftr__logo href=""><img src=assets/images/footer-logo.svg></a><a href="" ng-click=scrollDown() class=nav--footer__scroll><img src=assets/images/text-scroll.png><br><span class=icon--arrow--down></span></a><div class=ftr__links><equalizer></equalizer><a class=ftr__link href="" ng-click="footer.showPopup(\'share\')">Share</a> <a class=ftr__link href="" ng-click="footer.showPopup(\'connected\')">Stay connected</a> <a class=ftr__link href="" ng-click="footer.showPopup(\'legal\')">Legal</a></div><div class=ftr__popup ng-class="{ \'is-active\' : footer.popupActive }" ng-switch=footer.section><div class="inner ftr__popup--legal" ng-switch-when=legal><img src=assets/images/footer-warning.svg><ul class="list--reset list--horizontal"><li><a href="">Legal Information</a></li><li><a href="">Contact Us</a></li><li><a href="">Terms & Conditions</a></li></ul><p class=legal__rights>UNIVERSAL STUDIOS, UNIVERSAL STUDIOS SINGAPORE, Universal Globe logo, and all Universal elements and related indicia TM & Â© Universal Studios. All Rights Reserved.</p></div><div class="inner ftr__popup--connected h-clearfix" ng-switch-when=connected><div class=connected__follow><h3>Follow Us</h3><a class=ftr__icon href=""><svg id=Layer_1 data-name="Layer 1" xmlns=http://www.w3.org/2000/svg viewBox="0 0 25.6 53"><defs><style>.cls-1{fill:#e5e5cf;}</style></defs><path class=cls-1 d=M187.2,391h5.5v-5.3c0-2.3.1-6,1.8-8.2s4.3-4,8.5-4c6.9,0,9.8,1,9.8,1l-1.4,8.1a18.5,18.5,0,0,0-4.4-.7c-2.1,0-4,.8-4,2.9V391h8.7l-.6,7.9H203v27.5H192.7V399h-5.5Z transform="translate(-187.2 -373.5)"/></svg></a><a class="ftr__icon ftr__icon" href=""><svg id=Layer_1 data-name="Layer 1" xmlns=http://www.w3.org/2000/svg viewBox="0 0 55 55"><defs><style>.cls-1{fill:#e5e5cf;}</style></defs><path class=cls-1 d=M382.1,242.8H348.3a10.6,10.6,0,0,0-10.6,10.6v33.7a10.6,10.6,0,0,0,10.6,10.6h33.8a10.6,10.6,0,0,0,10.6-10.6V253.4A10.6,10.6,0,0,0,382.1,242.8Zm3.1,6.3h1.2v9.3h-9.3v-9.3Zm-27.8,15.5a9.7,9.7,0,1,1-1.8,5.6A9.7,9.7,0,0,1,357.4,264.7Zm30,22.5a5.3,5.3,0,0,1-5.3,5.3H348.3a5.3,5.3,0,0,1-5.3-5.3V264.7h8.2a15,15,0,1,0,27.9,0h8.2Z transform="translate(-337.7 -242.8)"/></svg></a><a class=ftr__icon href=""><svg id=Layer_1 data-name="Layer 1" xmlns=http://www.w3.org/2000/svg viewBox="0 0 64.4 55"><defs><style>.cls-1{fill:#e5e5cf;}</style></defs><path class=cls-1 d=M493.2,258.2v12.3l-1,.9-.9.4a.8.8,0,0,1-.6-.3,1.2,1.2,0,0,1-.2-.8V258.2h-3.3v13.5a3.4,3.4,0,0,0,.6,2.2,2.1,2.1,0,0,0,1.7.7,4.4,4.4,0,0,0,1.9-.5,7.2,7.2,0,0,0,1.9-1.5v1.8h3.3V258.2Zm-10.1.8a4.8,4.8,0,0,0-3.4-1.2,5.5,5.5,0,0,0-3.6,1.1,3.7,3.7,0,0,0-1.3,3v8.4a4.3,4.3,0,0,0,1.3,3.3,5.7,5.7,0,0,0,7,0,4.1,4.1,0,0,0,1.3-3.2V262A3.9,3.9,0,0,0,483.1,259ZM481,270.6a1.3,1.3,0,0,1-.4,1,1.4,1.4,0,0,1-1.1.4,1.3,1.3,0,0,1-1-.4,1.4,1.4,0,0,1-.4-1v-8.8a1,1,0,0,1,.4-.8,1.4,1.4,0,0,1,1-.3,1.7,1.7,0,0,1,1.1.3,1,1,0,0,1,.4.8Zm-10.3-18.2-2.3,8.8h-.3l-2.4-8.8H462l4.4,13.2v8.7h3.7v-9.1l4.3-12.8Zm25.8,38.6a2.3,2.3,0,0,1,.3,1.3v1.5h-2.6v-1.5a2,2,0,0,1,.3-1.3,1.4,1.4,0,0,1,2,0Zm-10.2-.1a1.1,1.1,0,0,0-.9-.4h-.6l-.6.5v9.2l.7.5.7.2a.9.9,0,0,0,.8-.3,1.5,1.5,0,0,0,.3-1v-7.6A1.6,1.6,0,0,0,486.4,291Zm0,0a1.1,1.1,0,0,0-.9-.4h-.6l-.6.5v9.2l.7.5.7.2a.9.9,0,0,0,.8-.3,1.5,1.5,0,0,0,.3-1v-7.6A1.6,1.6,0,0,0,486.4,291ZM503,279.7H457a9.2,9.2,0,0,0-9.2,9.2v9.4a9.2,9.2,0,0,0,9.2,9.2h46a9.2,9.2,0,0,0,9.2-9.2v-9.4A9.3,9.3,0,0,0,503,279.7Zm-33.6,6.5H466v17h-3.3v-17h-3.4v-2.9h10.2Zm9.7,17h-3v-1.6a5.5,5.5,0,0,1-1.7,1.4,3.4,3.4,0,0,1-1.7.5,1.9,1.9,0,0,1-1.6-.7,3.2,3.2,0,0,1-.5-2V288.5h2.9v11.3a1.2,1.2,0,0,0,.2.7.7.7,0,0,0,.6.2l.8-.3a3,3,0,0,0,.9-.8V288.5h3Zm10.6-3.1a3.7,3.7,0,0,1-.7,2.4,2.5,2.5,0,0,1-2,.8,3.3,3.3,0,0,1-1.5-.3,4,4,0,0,1-1.3-1v1.1h-3V283.3h3v6.4a4.6,4.6,0,0,1,1.3-1,3.1,3.1,0,0,1,1.4-.4,2.5,2.5,0,0,1,2.1.9,4.3,4.3,0,0,1,.7,2.7Zm10.2-3.9h-5.6V299a3.1,3.1,0,0,0,.3,1.6,1.1,1.1,0,0,0,1,.5,1.2,1.2,0,0,0,1-.4,3.1,3.1,0,0,0,.3-1.7v-.7h3.1v.7a4.6,4.6,0,0,1-1.1,3.4,4.2,4.2,0,0,1-3.3,1.1,4,4,0,0,1-3.1-1.2,4.7,4.7,0,0,1-1.1-3.3v-6.6a4.1,4.1,0,0,1,1.3-3.1,4.4,4.4,0,0,1,3.2-1.2,4.1,4.1,0,0,1,3.1,1.1,4.4,4.4,0,0,1,1.1,3.2Zm-14.4-5.6h-.6l-.6.5v9.2l.7.5.7.2a.9.9,0,0,0,.8-.3,1.5,1.5,0,0,0,.3-1v-7.6a1.6,1.6,0,0,0-.3-1.1A1.1,1.1,0,0,0,485.5,290.6Zm.9.4a1.1,1.1,0,0,0-.9-.4h-.6l-.6.5v9.2l.7.5.7.2a.9.9,0,0,0,.8-.3,1.5,1.5,0,0,0,.3-1v-7.6A1.6,1.6,0,0,0,486.4,291Zm0,0a1.1,1.1,0,0,0-.9-.4h-.6l-.6.5v9.2l.7.5.7.2a.9.9,0,0,0,.8-.3,1.5,1.5,0,0,0,.3-1v-7.6A1.6,1.6,0,0,0,486.4,291Z transform="translate(-447.8 -252.5)"/></svg></a></div><div class=connected__subscribe><div class=inner><h3>Be Warned Of Stirring Evils</h3><input type=email placeholder="Email address"> <button class="btn btn--textured">Submit</button><p><input type=checkbox id=agree><label for=agree><small>&nbsp;I consent to Resorts World Sentosa (â€œRWSâ€) to collect, use and disclose to companies within the Genting Group, my personal data for customer research and marketing purposes.</small></label></p></div></div></div><div class="inner ftr__popup--spread" ng-switch-when=share><h3>Spread the Evil</h3><a class=ftr__icon href=""><svg id=Layer_1 data-name="Layer 1" xmlns=http://www.w3.org/2000/svg viewBox="0 0 25.6 53"><defs><style>.cls-1{fill:#e5e5cf;}</style></defs><path class=cls-1 d=M187.2,391h5.5v-5.3c0-2.3.1-6,1.8-8.2s4.3-4,8.5-4c6.9,0,9.8,1,9.8,1l-1.4,8.1a18.5,18.5,0,0,0-4.4-.7c-2.1,0-4,.8-4,2.9V391h8.7l-.6,7.9H203v27.5H192.7V399h-5.5Z transform="translate(-187.2 -373.5)"/></svg></a><a class=ftr__icon href=""><svg id=Layer_1 data-name="Layer 1" xmlns=http://www.w3.org/2000/svg viewBox="0 0 56.2 45"><defs><style>.cls-1{fill:#e5e5cf;}</style></defs><path class=cls-1 d=M619.7,153.8a23.3,23.3,0,0,1-6.6,1.8,11.4,11.4,0,0,0,5.1-6.3,23.3,23.3,0,0,1-7.3,2.8,11.6,11.6,0,0,0-8.4-3.6,11.5,11.5,0,0,0-11.5,11.4,11.1,11.1,0,0,0,.3,2.6,32.9,32.9,0,0,1-23.8-11.9,11.3,11.3,0,0,0,3.6,15.2,11.7,11.7,0,0,1-5.2-1.4h0a11.4,11.4,0,0,0,9.3,11.1,11.4,11.4,0,0,1-3,.4l-2.2-.2a11.5,11.5,0,0,0,10.8,7.9,23.4,23.4,0,0,1-14.3,4.9l-2.8-.2a33,33,0,0,0,17.7,5.1c21.2,0,32.8-17.3,32.8-32.3,0-.5,0-1,0-1.5a23.1,23.1,0,0,0,5.8-5.9 transform="translate(-563.4 -148.5)"/></svg></a><a class=ftr__icon href=""><svg id=Layer_1 data-name="Layer 1" xmlns=http://www.w3.org/2000/svg viewBox="0 0 63 45"><defs><style>.cls-1{fill:#e5e5cf;}</style></defs><path class=cls-1 d=M480.6,289.8l-7.8-6.8L450.5,302a4.5,4.5,0,0,0,3.1,1.2h53.9a4.5,4.5,0,0,0,3.1-1.2l-22.3-19.1Zm0,0 transform="translate(-449.1 -258.3)"/><path class=cls-1 d=M510.6,259.5a4.4,4.4,0,0,0-3.1-1.2H453.6a4.5,4.5,0,0,0-3.1,1.2l30.1,25.8Zm0,0 transform="translate(-449.1 -258.3)"/><path class=cls-1 d=M449.1,262.2v37.4l21.8-18.5Zm0,0 transform="translate(-449.1 -258.3)"/><path class=cls-1 d=M490.3,281.1l21.8,18.5V262.2Zm0,0 transform="translate(-449.1 -258.3)"/></svg></a><a class="ftr__icon ftr__icon--ig" href=""><svg id=Layer_1 data-name="Layer 1" xmlns=http://www.w3.org/2000/svg viewBox="0 0 55 55"><defs><style>.cls-1{fill:#e5e5cf;}</style></defs><path class=cls-1 d=M382.1,242.8H348.3a10.6,10.6,0,0,0-10.6,10.6v33.7a10.6,10.6,0,0,0,10.6,10.6h33.8a10.6,10.6,0,0,0,10.6-10.6V253.4A10.6,10.6,0,0,0,382.1,242.8Zm3.1,6.3h1.2v9.3h-9.3v-9.3Zm-27.8,15.5a9.7,9.7,0,1,1-1.8,5.6A9.7,9.7,0,0,1,357.4,264.7Zm30,22.5a5.3,5.3,0,0,1-5.3,5.3H348.3a5.3,5.3,0,0,1-5.3-5.3V264.7h8.2a15,15,0,1,0,27.9,0h8.2Z transform="translate(-337.7 -242.8)"/></svg></a><a href="">#HHN6</a></div><button class="ftr__close icon--close btn" ng-click=footer.hidePopup()>Close</button></div>'), e.put("app/components/menu/menu.html", '<div class="menu fade" ng-show=menu.active><a href="" class="menu__close icon--close" ng-click="menu.active = false"></a><div class=menu__content><ul class="menu__list list--reset h-clearfix"><box border=3 class=menu__item><div class=menu__item__content><h3 class=menu__links><a ng-click="menu.active = false" ui-sref=home>Home</a></h3></div></box><box border=3 class=menu__item><div class=menu__item__content><h3 class=menu__links><a ng-click="menu.active = false" ui-sref=tickets>Tickets</a></h3></div></box><box border=3 class=menu__item><div class=menu__item__content><h3><a class=menu__links ng-click="menu.active = false" ui-sref="highlights.section({ section: \'main\' })">Highlights</a></h3><div class=menu__sub><a class=menu__links ng-click="menu.active = false" ui-sref="highlights.section({ section: \'revwards\' })">Haunts</a><br><a class=menu__links ng-click="menu.active = false" ui-sref=highlights>Scarezones & Shows</a><br><a class=menu__links ng-click="menu.active = false" ui-sref=highlights>Winners</a><br></div></div></box><box border=3 class=menu__item><div class=menu__item__content><h3><a class=menu__links ng-click="menu.active = false" ui-sref=event-guide>Event Guide</a></h3><div class=menu__sub><a class=menu__links ng-click="menu.active = false" ui-sref=event-guide>Map</a><br><a class=menu__links ng-click="menu.active = false" ui-sref="event-guide.section({ section: \'roadshows\'})">Road Shows</a><br><a class=menu__links ng-click="menu.active = false" ui-sref="event-guide.section({ section: \'gallery\'})">Gallery & Testimonials</a><br></div></div></box><box border=3 class=menu__item><div class=menu__item__content><h3>Information</h3><div class=menu__sub><a class=menu__links ng-click="menu.active = false" ui-sref="information.section({ section: \'park-information\' })">Park information</a><br><a class=menu__links ng-click="menu.active = false" ui-sref="information.section({ section: \'how-to-get-there\' })">How to get there</a><br><a class=menu__links ng-click="menu.active = false" ui-sref="information.section({ section: \'faq\' })">FAQ</a><br><a class=menu__links ng-click="menu.active = false" ui-sref="information.section({ section: \'how-to-survive\' })">How to survive</a></div></div></box></ul></div></div>')
}]);
//# sourceMappingURL=../maps/scripts/app.js.map

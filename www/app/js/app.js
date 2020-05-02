angular.module('app', ['ionic', 'app.controllers', 'ionicUIRouter', 'app.directives', 'app.services', ])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.constant('config', {
    base: '/',
    baseUrl: '/api/',
    baseXXX: '/xxx'
})

.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider, $sceDelegateProvider) {


    $sceDelegateProvider.resourceUrlWhitelist(['self', '*://playerapi.com/vid/**', '*://streaming.disk.yandex.net/hls/**', '*://egohub.github.io/watch/**', '*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

    $stateProvider.state('tabsController.home', {
        url: '/home',
        views: {
            'tab1': {
                templateUrl: 'app/templates/home.html',
                controller: 'homeCtrl'
            }
        }
    })

    .state('tabsController.category', {
        url: '/category',
        views: {
            'tab2': {
                templateUrl: 'app/templates/category.html',
                controller: 'categoryCtrl'
            }
        }
    })

    .state('tabsController.setting', {
        url: '/setting',
        views: {
            'tab3': {
                templateUrl: 'app/templates/setting.html',
                controller: 'settingCtrl'
            }
        }
    })

    .state('tabsController', {
        url: '/page1',
        templateUrl: 'app/templates/tabsController.html',
        abstract: true
    })

    .state('tabsController.detail', {
            url: '/homeDetail/:id',
            views: {
                'tab1': {
                    templateUrl: 'app/templates/detail.html',
                    controller: 'detailCtrl'
                },
                'tab2': {
                    templateUrl: 'app/templates/detail.html',
                    controller: 'detailCtrl'
                }
            }
        })
        .state('tabsController.catdetail', {
            url: '/cat/:id',
            views: {

                'tab2': {
                    templateUrl: 'app/templates/category/detail.html',
                    controller: 'catdetailCtrl'
                }
            }
        })
        .state('tabsController.setdetail', {
            url: '/set/:id',
            views: {

                'tab3': {
                    templateUrl: 'app/templates/setting/detail.html',
                    controller: 'setdetailCtrl'
                }
            }
        })
        .state('tabsController.details', {
            url: '/movies/:id',
            views: {

                'tab2': {
                    templateUrl: 'app/templates/details.html',
                    controller: 'detailsCtrl'
                }
            }
        })

    .state('tabsController.watch', {
        url: '/watch/:id',
        views: {
            'tab1': {
                templateUrl: 'app/templates/watch.html',
                controller: 'watchCtrl'
            },
            'tab2': {
                templateUrl: 'app/templates/watch.html',
                controller: 'watchCtrl'
            }
        }
    })

    .state('tabsController.movies', {
        url: '/movies/:id',
        views: {
            'tab2': {
                templateUrl: 'app/templates/movies.html',
                controller: 'moviesCtrl'
            }
        }
    })

    $urlRouterProvider.otherwise('/page1/home')


})



.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",
        controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {

            function stopDrag() {
                $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag() {
                $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])

.directive('hrefInappbrowser', function() {
    return {
        restrict: 'A',
        replace: false,
        transclude: false,
        link: function(scope, element, attrs) {
            var href = attrs['hrefInappbrowser'];

            attrs.$observe('hrefInappbrowser', function(val) {
                href = val;
            });

            element.bind('click', function(event) {

                window.open(href, '_system', 'location=yes');

                event.preventDefault();
                event.stopPropagation();

            });
        }
    };
})

.run(['$http', function($http) {

    function injectIconCSS(url) {
        var link = document.createElement("link");
        link.href = url;
        link.type = "text/css";
        link.rel = "stylesheet";
        link.media = "screen,print";
        document.getElementsByTagName("head")[0].appendChild(link);
    }

    var set = window.iconset;

    console.info("ICONSET", set);

    if (set == "ionicons3") {
        injectIconCSS('/lib/ionicons3/css/ionicons.min.css');
    } else if (set == "ionicons") {
        injectIconCSS('https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css');
    }

}])

.config(function($provide) {
    $provide.decorator('ionTabDirective', function($delegate, $timeout) {
        var directive = $delegate[0];

        var originalCompile = angular.copy(directive.compile);

        directive.compile = originalCompile;

        directive.compile = function(element, attr) {

            var set = window.iconset;
            if (set == 'ionicons3') {
                attr.icon = ionicon3(attr.icon);
            }

            return originalCompile(element, attr);
        };

        return $delegate;
    });
})

.directive('ionicon3', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        scope: {},
        link: function($scope, $element, $attr) {

            function loadIcon() {

                if (!window.ionicons3) {
                    $timeout(loadIcon, 10);
                    return;
                }

                $element.addClass(ionicon3($attr['ionicon3']));
            }

            loadIcon();

        }
    }
}])






angular.module('app.directives', [])

.directive('blankDirective', [function() {

}]);
angular.module('app.controllers', [])

.controller('homeCtrl', function($scope, $timeout, $log, MovieService, config, DataLoader) {

    var singlePostApi = 'https://moviechannel.herokuapp.com/movies',
        postsApi = 'wp-json/wp/v2/posts/';
    $scope.moreItems = false;

    $scope.loadPosts = function() {

        // Get all of our posts
        DataLoader.get('https://moviechannel.herokuapp.com/movies/').then(function(response) {

            $scope.posts = response.data.results;

            $scope.moreItems = true;

            console.log(postsApi, response.data);

        }, function(response) {
            console.log(postsApi, response.data);
        });

    }
    $scope.loadPosts();
    paged = 2;
    $scope.loadMore = function() {
        if (!$scope.moreItems) {
            return;
        }
        var pg = paged++;
        console.log('loadMore ' + pg);
        $timeout(function() {

            DataLoader.get(singlePostApi + '/page/' + pg).then(function(response) {
                angular.forEach(response.data.results, function(value, key) {
                    $scope.posts.push(value);
                });
                if (response.data.length <= 0) {
                    $scope.moreItems = false;
                }
            }, function(response) {
                $scope.moreItems = false;
                $log.error(response);
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.resize');
        }, 1000);
    }
    $scope.moreDataExists = function() {
        return $scope.moreItems;
    }

    $scope.doRefresh = function() {
        $timeout(function() {
            $scope.loadPosts();
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    };
})

.controller('detailCtrl', ['$scope', '$stateParams', 'DataLoader',
    function($scope, $stateParams, DataLoader) {
        $scope.tabName = "tab3";
        DataLoader.get('https://moviechannel.herokuapp.com/movie/' + $stateParams.id).then(function(resp) {
            $scope.data = resp.data;
        });

    }
])

.controller('categoryCtrl', ['$scope', '$stateParams', 'DataLoader', 'config',
        function($scope, $stateParams, DataLoader, config) {
            DataLoader.get(config.base + 'category').then(function(resp) {
                $scope.list = resp.data;
            });
        }
    ])
    .controller('catdetailCtrl', ['$scope', '$stateParams', 'DataLoader', 'config',
        function($scope, $stateParams, DataLoader, config) {
            $scope.tabName = "tab3";
            DataLoader.get('https://moviechannel.herokuapp.com/movie/' + $stateParams.id).then(function(resp) {
                $scope.data = resp.data;
            });

        }
    ])

.controller('menuCtrl', ['$scope', '$stateParams',
    function($scope, $stateParams) {}
])

.controller('watchCtrl', ['$scope', '$stateParams', 'DataLoader',
    function($scope, $stateParams, DataLoader) {
        //https://untitled-d7a4ca7dqc5s.runkit.sh/yadi/?url=
        DataLoader.get('https://moviechannel.herokuapp.com/yadi?url=' + $stateParams.id).then(function(response) {
            $scope.data = response.data;
            console.log(response)
        });
    }
])

.controller('detailsCtrl', ['$scope', '$stateParams', 'MovieService', 'DataLoader', 'config',
    function($scope, $stateParams, MovieService, DataLoader, config) {
        DataLoader.get(config.baseUrl + 'movie/' + $stateParams.id).then(function(response) {
            $scope.news = response.data;
            console.log(response.data)
        });
    }
])

.controller('moviesCtrl', function($scope, $timeout, $log, $stateParams, config, DataLoader) {

    $scope.moreItems = false;

    $scope.loadPosts = function() {

        // Get all of our posts
        DataLoader.get(config.base + 'category/' + $stateParams.id + '/page/1').then(function(response) {
            $scope.posts = response.data.results;
            $scope.moreItems = true;
        }, function(response) {
            //console.log(postsApi, response.data);
        });

    }
    $scope.loadPosts();
    paged = 2;
    $scope.loadMore = function() {
        if (!$scope.moreItems) {
            return;
        }
        var pg = paged++;
        console.log('loadMore ' + pg);
        $timeout(function() {

            DataLoader.get(config.base + 'category/' + $stateParams.id + '/page/' + pg).then(function(response) {
                angular.forEach(response.data.results, function(value, key) {
                    $scope.posts.push(value);
                });
                if (response.data.length <= 0) {
                    $scope.moreItems = false;
                }
            }, function(response) {
                $scope.moreItems = false;
                $log.error(response);
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.resize');
        }, 1000);
    }
    $scope.moreDataExists = function() {
        return $scope.moreItems;
    }

    $scope.doRefresh = function() {
        $timeout(function() {
            $scope.loadPosts();
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    };
})

.controller('settingCtrl', function($scope, $timeout, $log, MovieService, config, DataLoader) {

    var singlePostApi = 'https://moviechannel.herokuapp.com/xxx',
        postsApi = 'https://channelmyanmar.org/wp-json/wp/v2/posts/';
    $scope.moreItems = false;

    $scope.loadPosts = function() {

        // Get all of our posts
        DataLoader.get('https://moviechannel.herokuapp.com/xxx/page/1').then(function(response) {

            $scope.posts = response.data;

            $scope.moreItems = true;

            console.log(postsApi, response.data);

        }, function(response) {
            console.log(postsApi, response.data);
        });

    }
    $scope.loadPosts();
    paged = 2;
    $scope.loadMore = function() {
        if (!$scope.moreItems) {
            return;
        }
        var pg = paged++;
        console.log('loadMore ' + pg);
        $timeout(function() {

            DataLoader.get(singlePostApi + '/page/' + pg).then(function(response) {
                angular.forEach(response.data, function(value, key) {
                    $scope.posts.push(value);
                });
                if (response.data.length <= 0) {
                    $scope.moreItems = false;
                }
            }, function(response) {
                $scope.moreItems = false;
                $log.error(response);
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.resize');
        }, 1000);
    }
    $scope.moreDataExists = function() {
        return $scope.moreItems;
    }

    $scope.doRefresh = function() {
        $timeout(function() {
            $scope.loadPosts();
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    };
})

.controller('setdetailCtrl', ['$scope', '$stateParams', 'DataLoader', 'config',
    function($scope, $stateParams, DataLoader, config) {
        //$scope.news = MovieService.get($stateParams.id);
        DataLoader.get('https://moviechannel.herokuapp.com/xxx/' + $stateParams.id).then(function(resp) {
            $scope.news = resp.data;
        });

    }
])

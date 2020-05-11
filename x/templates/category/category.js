angular.module('app.category', [])

.controller('categoryCtrl', CategoryCtrl)
    .controller('moviesCtrl', MoviesCtrl)
    .controller('catDetailCtrl', CatDetailCtrl)

function CategoryCtrl($scope, movieService) {
    movieService.getCategory().then(function(result) {
        $scope.category = result;
    }, function(error) {
        consol.log(error.statusText);
    });

}

function CatDetailCtrl($scope, $stateParams, $ionicLoading, movieService) {

    $scope.tabName = "tab3";
    $ionicLoading.show({
        template: '<ion-spinner icon="lines" class="spinner-assertive"></ion-spinner> ',
        duration: 3000
    }).then(function() {
        console.log("The loading indicator is now displayed");
    });
    movieService.getMovieId($stateParams.slug).then(function(result) {
        console.log(result);
        $ionicLoading.hide();
        $scope.data = result;
    }, function(error) {
        // consol.log(error.statusText);
    });
}

function MoviesCtrl($scope, $timeout, $log, $ionicLoading, $stateParams, config, DataLoader) {

    $scope.moreItems = false;

    $scope.loadPosts = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="lines" class="spinner-assertive"></ion-spinner> ',
            duration: 3000
        }).then(function() {
            console.log("The loading indicator is now displayed");
        });
        // Get all of our posts
        DataLoader.get('/category/' + $stateParams.id + '/page/1').then(function(response) {
            $ionicLoading.hide();
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

            DataLoader.get('/category/' + $stateParams.id + '/page/' + pg).then(function(response) {
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
}
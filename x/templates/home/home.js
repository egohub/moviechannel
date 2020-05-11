angular.module('app.home', [])

.controller('homeCtrl', HomeCtrl)
    .controller('homeDetailCtrl', HomeDetailCtrl)

function HomeCtrl($scope, $ionicLoading, $log, $timeout, config, DataLoader) {

    $scope.moreItems = false;

    $scope.loadPosts = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="lines" class="spinner-assertive"></ion-spinner> ',
            duration: 3000
        }).then(function() {
            console.log("The loading indicator is now displayed");
        });

        // Get all of our posts
        DataLoader.get('/movies/').then(function(response) {
            $ionicLoading.hide();
            $scope.posts = response.data.results;

            $scope.moreItems = true;

            console.log(response.data);

        }, function(response) {
            console.log(response.data);
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

            DataLoader.get('/movies/page/' + pg).then(function(response) {
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
};


function HomeDetailCtrl($scope, $stateParams, $ionicLoading, movieService) {

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
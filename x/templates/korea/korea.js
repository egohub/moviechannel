angular.module('app.korea', [])


.controller('koreaCtrl', KoreaCtrl)
    .controller('koreaWatchCtrl', koreaWatchCtrl)


function KoreaCtrl($scope, $log, $timeout, $ionicLoading, config, DataLoader) {

    var singlePostApi = 'https://moviechannel.herokuapp.com/xxx';
    $scope.moreItems = false;

    $scope.loadPosts = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="lines" class="spinner-assertive"></ion-spinner> '
            // duration: 3000
        }).then(function() {
            console.log("The loading indicator is now displayed");
        });
        // Get all of our posts
        DataLoader.get('/api/sports').then(function(response) {
            $ionicLoading.hide();
            $scope.posts = response.data;
            $scope.soccer = response.data.soccer;
            $scope.basketball = response.data.basketball;
            $scope.games = response.data.games;
            $scope.tennis = response.data.tennis;
            $scope.moreItems = true;

            console.log(response.data.basketball);

        }, function(response) {
            console.log(response.data);
        });

    }
    $scope.loadPosts();
    // paged = 2;
    // $scope.loadMore = function() {
    //     if (!$scope.moreItems) {
    //         return;
    //     }
    //     var pg = paged++;
    //     console.log('loadMore ' + pg);
    //     $timeout(function() {

    //         DataLoader.get('/xxx/page/' + pg).then(function(response) {
    //             angular.forEach(response.data, function(value, key) {
    //                 $scope.posts.push(value);
    //             });
    //             if (response.data.length <= 0) {
    //                 $scope.moreItems = false;
    //             }
    //         }, function(response) {
    //             $scope.moreItems = false;
    //             $log.error(response);
    //         });
    //         $scope.$broadcast('scroll.infiniteScrollComplete');
    //         $scope.$broadcast('scroll.resize');
    //     }, 1000);
    // }
    // $scope.moreDataExists = function() {
    //     return $scope.moreItems;
    // }

    $scope.doRefresh = function() {
        $timeout(function() {
            $scope.loadPosts();
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    };
}


function koreaWatchCtrl($scope, $stateParams, $ionicLoading, DataLoader, config) {
    $ionicLoading.show({
        template: '<ion-spinner icon="lines" class="spinner-assertive"></ion-spinner> '
    }).then(function() {
        console.log("The loading indicator is now displayed");
    });
    DataLoader.get('/api/sports/detail/' + $stateParams.id).then(function(resp) {
        $ionicLoading.hide();
        $scope.news = resp.data;
        console.log(resp.data);
    });
}

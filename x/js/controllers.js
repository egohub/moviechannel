angular.module('app.controllers', [])


.controller('menuCtrl', ['$scope', '$stateParams',
    function($scope, $stateParams) {


    }
])

.controller('watchCtrl', function($scope, $stateParams, $ionicLoading, DataLoader) {
    $ionicLoading.show({
        template: '<ion-spinner icon="lines" class="spinner-assertive"></ion-spinner> ',
        duration: 3000
    }).then(function() {
        console.log("The loading indicator is now displayed");
    });
    DataLoader.get('/yadi?url=' + $stateParams.id).then(function(response) {
        $ionicLoading.hide();
        $scope.data = response.data;
        console.log(response)
    });
})

.controller('streamCtrl', function($scope, $stateParams, $ionicLoading, DataLoader) {
    $ionicLoading.show({
        template: '<ion-spinner icon="lines" class="spinner-assertive"></ion-spinner> ',
        duration: 3000
    }).then(function() {
        console.log("The loading indicator is now displayed");
    });
    DataLoader.get('/upstream?url=' + $stateParams.id).then(function(response) {
        $ionicLoading.hide();
        $scope.data = response.data;
        console.log(response)
    });
})


.controller('settingCtrl', ['$scope', '$stateParams',
    function($scope, $stateParams) {


    }
])

.controller('aboutCtrl', ['$scope', '$stateParams', 'movieService',
    function($scope, $stateParams, movieService) {
        $scope.getSampleData = function() {
            movieService.getSampleList().then(function(result) {
                $scope.sample = result;
            }, function(error) {
                console.log(error.statusText);
            });
        }


    }
])

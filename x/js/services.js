angular.module('app.services', [])

.factory('DataLoader', function($http) {

    return {
        get: function(url) {
            // Simple index lookup
            return $http.get(url);
        }
    }

})

.service('BlankService', [function() {

    }])
    //'https://moviechannel.herokuapp.com/movies'
    .factory('movieService', movieService);

function movieService($http, $q, config) {
    var items = [];

    var fetch = function(url) {
        var deffered = $q.defer();
        $http.get(url).then(function(response) {
            items = response.data.results;
            deffered.resolve(response.data.results);
        }, function(error) {
            deffered.reject(error);
        });
        return deffered.promise;
    };

    var sampleList = function() {
        var deffered = $q.defer();
        $http.get('data/movies.json').then(function(response) {
            items = response.data;
            deffered.resolve(response.data);
        }, function(error) {
            deffered.reject(error);
        });
        return deffered.promise;
    };
    var movieList = function() {
        var deffered = $q.defer();
        $http.get(config.base).then(function(response) {
            items = response.data.results;
            deffered.resolve(response.data.results);
        }, function(error) {
            deffered.reject(error);
        });
        return deffered.promise;
    };

    var categories = function() {
        var deffered = $q.defer();
        $http.get('data/categories.json').then(function(response) {
            items = response.data.results;
            deffered.resolve(response.data);
        }, function(error) {
            deffered.reject(error);
        });
        return deffered.promise;
    };

    var movieId = function(slug) {
        var deffered = $q.defer();
        $http.get('/movie/' + slug).then(function(response) {
            items = response.data;
            console.log(response.data);

            deffered.resolve(response.data);
        }, function(error) {
            deffered.reject(error);
        });
        return deffered.promise;
    };


    return {
        getFetch: fetch,
        getMovieList: movieList,
        getMovieId: movieId,
        getSampleList: sampleList,
        getCategory: categories
    }
}
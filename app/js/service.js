angular.module('app.services', [])

.factory('CatService', function($http, config) {


    var content = [],
        catItem = [];
    var gc = 'https://untitled-o2334v8oxm2y.runkit.sh/';
    $http.get(config.baseUrl + '1').then(function(response) {
        for (var i = 0; i < response.data.results.length; i++) {

            content.push(response.data.results[i]);
        }
    })


    return {
        all: function() {
            return content;
        },

        get: function(petId) {
            for (var i = 0; i < content.length; i++) {
                if (content[i].id === parseInt(petId)) {
                    return content[i];
                }
            }
            return null;
        },

        cat: function(id) {
            console.log(config.base + 'category' + id + 'page/' + 1);
            $http.get(config.base + 'category' + id + 'page/' + 1).then(function(response) {
                for (var i = 0; i < response.data.results.length; i++) {

                    catItem.push(response.data.results[i]);
                }
            })
        },
        catId: function(petId) {
            for (var i = 0; i < catItem.length; i++) {
                if (catItem[i].id === parseInt(petId)) {
                    return catItem[i];
                }
            }
            return null;
        }
    };

})

.factory('MovieService', function($http, config) {


    var content = [];
    var gc = 'https://untitled-o2334v8oxm2y.runkit.sh/';
    $http.get(config.baseXXX).then(function(response) {
        for (var i = 0; i < response.data.results.length; i++) {

            content.push(response.data.results[i]);
        }
    })


    return {
        all: function() {
            return content;
        },

        get: function(petId) {
            for (var i = 0; i < content.length; i++) {
                if (content[i].id === parseInt(petId)) {
                    return content[i];
                }
            }
            return null;
        }
    };

})

.factory('DataLoader', function($http) {

    return {
        get: function(url) {
            // Simple index lookup
            return $http.get(url);
        }
    }

})

.factory('PaginatorService', PaginatorService)

function PaginatorService() {
    function getPaginator(totalItems, currentPage, pageSize) {
        currentPage = currentPage || 1;
        pageSize = pageSize || 48;
        console.log("currentPage:" + currentPage);
        console.log("pageSize:" + pageSize);
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage, startEllipses, endEllipses;
        if (totalPages <= 7) {
            // less than 7 total pages so show all
            startPage = 2;
            endPage = totalPages - 1;
            startEllipses = endEllipses = false;
        } else {
            // more than 7 total pages so calculate start and end pages
            if (currentPage <= 3) {
                startPage = 2;
                endPage = 5;
                endEllipses = true;
                startEllipses = false;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 4;
                endPage = totalPages - 1;
                startEllipses = true;
                endEllipses = false;
            } else {
                startPage = currentPage - 1;
                endPage = currentPage + 1;
                startEllipses = endEllipses = true;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = getPages(startPage, endPage); //

        function getPages(startPage, endPage) {
            console.log(startPage + " " + endPage);
            var pages = [];
            if (startPage <= endPage) {
                var length = endPage - startPage + 1;
                pages = Array(length);
                for (var i = 0; i < length; i++) {
                    pages[i] = startPage + i;
                }
            }
            return pages;
        }

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            startEllipses: startEllipses,
            endEllipses: endEllipses,
            pages: pages
        };
    }
    return {
        paginate: getPaginator
    }
}
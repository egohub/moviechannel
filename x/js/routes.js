angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('tabs.home', {
    url: '/home',
    views: {
      'tab1': {
        templateUrl: 'templates/home/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('tabs.homeDetail', {
    url: '/homedetail/:slug',
    views: {
      'tab1': {
        templateUrl: 'templates/home/homeDetail.html',
        controller: 'homeDetailCtrl'
      }
    }
  })

  .state('tabs.category', {
    url: '/category',
    views: {
      'tab2': {
        templateUrl: 'templates/category/category.html',
        controller: 'categoryCtrl'
      }
    }
  })

  .state('tabs.korea', {
    url: '/Korea',
    views: {
      'tab3': {
        templateUrl: 'templates/korea/korea.html',
        controller: 'koreaCtrl'
      }
    }
  })

  .state('tabs', {
    url: '/tabs',
    templateUrl: 'templates/tabs.html',
    abstract:true
  })


  .state('tabs.watch', {
    url: '/watch/:id',
    views: {
      'tab1': {
        templateUrl: 'templates/watch.html',
        controller: 'watchCtrl'
      },
      'tab2': {
        templateUrl: 'templates/watch.html',
        controller: 'watchCtrl'
      }
    }
  })

  .state('tabs.movies', {
    url: '/movies/:id',
    views: {
      'tab2': {
        templateUrl: 'templates/movies.html',
        controller: 'moviesCtrl'
      }
    }
  })

  .state('setting', {
    url: '/setting',
    templateUrl: 'templates/setting.html',
    controller: 'settingCtrl'
  })

  .state('about', {
    url: '/about',
    templateUrl: 'templates/about.html',
    controller: 'aboutCtrl'
  })

  .state('tabs.catDetail', {
    url: '/catdetail/:slug',
    views: {
      'tab2': {
        templateUrl: 'templates/category/catDetail.html',
        controller: 'catDetailCtrl'
      }
    }
  })

  .state('tabs.koreaWatch', {
    url: '/koreaDetail/:id',
    views: {
      'tab3': {
        templateUrl: 'templates/korea/koreaWatch.html',
        controller: 'koreaWatchCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/tabs/home')


});
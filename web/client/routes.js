angular.module("admin").run(['$rootScope', '$state', function($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === 'AUTH_REQUIRED') {
      $state.go('producto');
    }

  });
}]);

angular.module('admin').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
function($urlRouterProvider, $stateProvider, $locationProvider){

  $locationProvider.html5Mode(true);
  $stateProvider
  .state('producto', {
    url: '/productos',
    templateUrl: 'client/productos/views/lista-productos.ng.html',
    controller: 'ListaProductosCtrl'
  })
  .state('detalleProducto', {
    url: '/productos/:productoId',
    templateUrl: 'client/productos/views/detalle-producto.ng.html',
    controller: 'DetalleProductoCtrl',
    resolve: {
      "currentUser": ["$meteor", function($meteor){
        return $meteor.requireUser();
      }]
    }
    // resolve: {
    //    "currentUser": ["$meteor", function($meteor){
    //      return $meteor.requireValidUser(function(user) {
    //        alert(JSON.stringify(user));
    //        return user._id== "Eijyc8xR57XCCnRtA";
    //      });
    //    }]
    //  }
  });

  $urlRouterProvider.otherwise("/productos");
}]);

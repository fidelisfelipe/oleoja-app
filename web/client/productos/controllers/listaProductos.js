angular.module('admin').controller('ListaProductosCtrl', ['$scope','$meteor','$log', function($scope,$meteor,$log){

  $scope.pagina = 1;
  $scope.porPagina = 5;
  $scope.orden = { Descripcion: 1 };
  $scope.ordenDePropiedad = '1';
  $scope.productos = $meteor.collection(function(){
      return Productos.find({}, {
        sort: $scope.getReactively('orden')
      });
  });




  $meteor.autorun($scope, function() {
  $meteor.subscribe('productos', {
    limit: parseInt($scope.getReactively('porPagina')),
    skip: parseInt(($scope.getReactively('pagina') - 1) * $scope.getReactively('porPagina')),
    sort: $scope.orden
  }).then(function(){
    $scope.cantidadDeProductos = $meteor.object(Counts, 'numeroDeProductos', false);
  });
});

  $scope.remove= function (producto) {
    $scope.productos.splice($scope.productos.indexOf(producto),1);
  };

  $scope.paginaCambiada = function(nuevaPagina) {
      $scope.pagina = nuevaPagina;
    };

  $scope.$watch('ordenDePropiedad', function(){
     if ($scope.ordenDePropiedad)
     console.log($scope.cantidadDeProductos);
       $scope.orden = {Descripcion: parseInt($scope.ordenDePropiedad)};
   });

}]);

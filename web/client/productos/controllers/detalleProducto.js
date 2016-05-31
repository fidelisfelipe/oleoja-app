angular.module("admin").controller("DetalleProductoCtrl", ['$scope', '$stateParams','$meteor',
  function($scope, $stateParams, $meteor){

    $scope.productoId = $stateParams.productoId;
    // el parametro de false, se usa para indicar que no se hagan los cambios automaticos a medida que editan el producto
    $scope.producto = $meteor.object(Productos, $stateParams.productoId,false).subscribe('productos');
    // el false es para evitar cambiar el usuario desde el cliente
    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

    $scope.guardar = function () {
      $scope.producto.save().then(function(numeroDeDocumentos){
        console.log('Se ha guardado el producto exitosamente, documentos afectatos: ', numeroDeDocumentos);
      }, function(error){
        console.log('Error al guardar el producto', error);
      });
    };

    $scope.restaurar = function () {
      $scope.producto.reset();
    };

  }]);

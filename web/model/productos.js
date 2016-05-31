Productos = new Mongo.Collection("productos");
Productos.allow({
  insert: function(userId, producto){
    return userId && producto.propietario === userId;
  },
  update: function(userId, producto, fields, modifier){
    return userId && producto.propietario === userId;
  },
  remove: function(userId, producto){
    return userId && producto.propietario === userId;
  }
});

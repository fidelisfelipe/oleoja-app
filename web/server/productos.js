Meteor.publish("productos", function (opciones) {
  Counts.publish(this, 'numeroDeProductos', Productos.find({}), { noReady: true });


  return Productos.find({},opciones);
});

// Meteor.publish("productos", function () {
//   return Productos.find({
//     $or:[
//       {$and:[
//         {"public": true},
//         {"public": {$exists: true}}
//       ]},
//       {$and:[
//         {propietario: this.userId},
//         {propietario: {$exists: true}}
//       ]}
//     ]});
// });

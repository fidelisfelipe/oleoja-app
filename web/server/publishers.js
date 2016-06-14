Meteor.publish('drivers', function(){
	return Drivers.find({});
});
Meteor.publish('drivers', function(){
	return Drivers.find({});
});

Meteor.publish('requests', function(){
	return Requests.find({status: 'opened'});
});
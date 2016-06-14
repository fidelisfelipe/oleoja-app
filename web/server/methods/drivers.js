Meteor.methods({
	saveDriver: function(driver){
		check(driver, {
			name: String,
			email: String,
			latitude: String,
			longitude: String
		});

		var id = Drivers.insert(driver);
	},

	removeDriver: function(id){
		check(id, String);

		var driver = Drivers.remove({
			_id: id
		});
	},

	updateDriver: function(driver){
		check(driver, {
			id: String,
			name: String,
			email: String,
			latitude: String,
			longitude: String
		});

		var driver = Drivers.update(driver.id, {
			$set: {
				name: driver.name,
				email: driver.email,
				latitude: driver.latitude,
				longitude: driver.longitude
			}
		});
	}
});
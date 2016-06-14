var iugu = require('iugu')('c73d49f9-6490-46ee-ba36-dcf69f6334fd');

Meteor.methods({
	addUser : function(user) {
		check(payment, {
			name: String,
			email: String,
			profile: Object
		});

		iugu.customer.create({
			email: user.email,
			name: user.name,
			notes: 'Public User'
		}, function(error, customer) {
			if (error == null) {
				var user = Accounts.createUser({
					name: user.name,
					email: user.email,
					password: user.password,
					profile: customer
				});
			}
		});

		return user;
	},

	updateUser : function(id, user) {
		Meteor.users.update(id, {
			$set : {
				profile : user.profile
			}
		});

		if (user.password != '123456') {
			Accounts.setPassword(id, user.password);
		}

		return true;
	},

	removeUser : function(id) {
		var user = Accounts.find({_id: id});

		Meteor.users.remove(user._id);
		iugu.customers.del(user.profile.key);

		return id;
	}
});
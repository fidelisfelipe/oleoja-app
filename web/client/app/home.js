Session.setDefault('editing', false);

Template.Home.onRendered(function(){
	$('.form').validate();
});

Template.Home.onCreated(function() {
	var self = this;
	self.autorun(function(){
		self.subscribe('drivers');
	})
});

Template.Home.events({
	'click .save': function(e, tmpl){
		var name = tmpl.find('#name').value;
		var email = tmpl.find('#email').value;
		var latitude = tmpl.find('#latitude').value;
		var longitude = tmpl.find('#longitude').value;
		
		var driver = {
			name: name,
			email: email,
			latitude: latitude,
			longitude: longitude
		};
		
		Meteor.call('saveDriver', driver, function(error){
			if(error)
				return throwError(error.reason);	
		});
		
		$('#name').val("").focus();
		$('#email').val("");
		$('#latitude').val("");
		$('#longitude').val("");
	}
});

Template.Home.helpers({
	drivers: function() {
		return Drivers.find({});
	}
});

Template.Driver.helpers({
	editing: function() {
		return Session.get('editing');
	}
});

Template.Driver.events({
	'click .remove': function(e, tmpl) {
		var id = this._id;
		Meteor.call('removeDriver', id, function(error){
			if (error){
				return throwError(error.reason);
			}
		});
	},
	
	'dblclick .row': function(e, tmpl) {
		Session.set('editing', true);
	},
	
	'keyup .edit': function (e, tmpl) {

        var current = this._id;

        if (e.which === 13) {
            var name = tmpl.find('.name').value;
            var email = tmpl.find('.email').value;
            var latitude = tmpl.find('.latitude').value;
            var longitude = tmpl.find('.longitude').value;

            var driver = {
                id: current,
                name: name,
                email: email,
                latitude: latitude,
                longitude: longitude
            };

            Meteor.call('updateDriver', driver, function (error, result) {
                if (error)
                    return throwError(error.reason);
            });

            Session.set('editing', false);
        }
    }
});
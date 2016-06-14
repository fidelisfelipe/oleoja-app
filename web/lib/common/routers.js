FlowRouter.route('/',{
	name: 'Home',
	action() {
		BlazeLayout.render('Main',{
			main: 'Home'
		});
	}
});

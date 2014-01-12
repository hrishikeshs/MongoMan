Mongoman.StartRoute = Ember.Route.extend({
	init: function() {
		this._super();
		window.history.pushState("", "",'/#/');
	},

	model: function() {
	  return Mongoman.Request.find("/databases",'databases');
	},

	renderTemplate: function() {
		this.render('databases');
	},
	
	setupController: function(controller,model) {
		controller.set('content', null);
		controller.set('content', model);
		controller.set('content.isLoaded', false);
	}

});
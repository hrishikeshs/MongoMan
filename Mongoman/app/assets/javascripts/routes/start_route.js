Mongoman.StartRoute = Ember.Route.extend({
	init: function() {
		this._super();
		window.history.pushState("", "",'/#/');
	},

	model: function() {
	  return Mongoman.Request.find("/databases",'databases');
	},

	setupController: function(controller,model) {
		controller.set('content',model);
	}

});
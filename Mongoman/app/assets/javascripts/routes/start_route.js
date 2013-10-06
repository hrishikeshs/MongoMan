Mongoman.StartRoute = Ember.Route.extend({
	init: function() {
		this._super();	
		window.history.pushState("", "", window.location+'#/');
	},

	model: function() {
	  return Mongoman.Request.find();
	},

	setupController: function(controller,model) {
		controller.set('content',model);
	}

});
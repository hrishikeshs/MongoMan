Mongoman.StartRoute = Ember.Route.extend({
	init: function() {
		this._super();
		window.history.pushState("", "",'/#/');
	},

	model: function() {
	  return Mongoman.Request.find("/databases?")
	},

	renderTemplate: function() {
		this.render('databases');
	},
	
	setupController: function(controller,model) {
		controller.set('content', null)
		controller.set('isLoaded', false)
		model().then(
			function success(response) {
				controller.set('content', response.databases)
				controller.set('content.count', response.count)
			},
			function failure(errorThrown) {
				controller.set('content', [])
				console.log("errorThrown: " )
				console.log(errorThrown)
			});
	}

});
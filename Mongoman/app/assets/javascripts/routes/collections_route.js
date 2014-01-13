Mongoman.CollectionsRoute = Ember.Route.extend({

	model: function(params) {
		var collection_name = params.name
		var api= "/collections/" + collection_name
		return Mongoman.Request.find(api,'collections')
	},
	
	setupController: function(controller,model) {
		controller.set('content', null)
		controller.set('isLoaded', false)
		controller.set('content',model)
	},

	renderTemplate: function() {
		this.render('collections', {outlet: "main" , into:"application"})
	},

	deactivate:function() {
		var controller = this.controllerFor('collections')
		controller.set('content', null);
	}

});
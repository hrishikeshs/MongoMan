Mongoman.CollectionsRoute = Ember.Route.extend({

	model: function(params) {
		var collection_name = params.name
		var api= "/collections/" + collection_name
		this.controllerFor('collections').set('collection_name', collection_name)
		return Mongoman.Request.find(api)
	},
	
	setupController: function(controller,model) {
		controller.set('content', null)
		controller.set('isLoaded', false)
		model().then(
			function success(response) {
				controller.set('content', response.collections)
				controller.set('isLoaded', true)
				controller.set('content.count', response.count)
			},
			function failure(errorThrown) {
				controller.set('content', [])
				console.log("errorThrown: " )
				console.log(errorThrown)
			});
	},

	renderTemplate: function() {
		this.render('collections', {outlet: "main" , into:"application"})
	},

	deactivate:function() {
		var controller = this.controllerFor('collections')
		controller.set('content', null);
	}

});
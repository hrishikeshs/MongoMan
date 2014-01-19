Mongoman.DocumentsRoute = Ember.Route.extend({

	model: function(params) {
		var collection = params.collection
		var database_name= params.database
		var api= "/documents/" + collection + '/?'+"database=" + encodeURIComponent(database_name) + "&collection=" + collection
		var controller = this.controllerFor('documents')
    controller.set('collection_name',collection)
    controller.set('database_name', database_name)
		return Mongoman.Request.find(api)
	},

	renderTemplate: function() {
		this.render('documents',{outlet: "main" , into:"application"})
	},

	setupController: function(controller,model) {

		controller.set('content', null)
		model().then(
			function success(response) {
				controller.set('content', response.documents)
				controller.set('documentCount', response.count)
				controller.send('initVisibleContent', true)
			},
			function failure(errorThrown) {
				controller.set('content', [])
				console.log("errorThrown: " )
				console.log(errorThrown)
			});
	},

	deactivate: function() {
		this.controllerFor('documents').set('content', [])
		this.controllerFor('documents').set('documentCount', 0)
	}

});
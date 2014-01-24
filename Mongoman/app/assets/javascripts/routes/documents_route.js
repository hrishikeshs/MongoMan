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
		controller.set('content', model.documents)
		controller.set('documentCount', model.count)
		controller.send('initVisibleContent', true)
	},

	deactivate: function() {
		this.controllerFor('documents').set('content', [])
		this.controllerFor('documents').set('documentCount', 0)
	}

});

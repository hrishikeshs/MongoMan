Mongoman.DocumentsRoute = Ember.Route.extend({

	model: function(params) {
		var collection = params.collection
		var database_name= params.database
		var api= "/documents/" + collection + '/?'+"database=" + encodeURIComponent(database_name) + "&collection=" + collection
    this.controllerFor('documents').set('collection_name',collection)
    this.controllerFor('documents').set('database_name', database_name)
		return Mongoman.Request.find(api,"documents")
	},

	renderTemplate: function() {
		this.render('documents',{outlet: "main" , into:"application"})
	},

	setupController: function(controller,model) {
		controller.set('content', null)
		controller.set('content',model)
	}

});
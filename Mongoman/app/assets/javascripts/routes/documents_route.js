Mongoman.DocumentsRoute = Ember.Route.extend({

	model: function(params) {
		var collection = params.collection;
		var database_name= params.database;
		var api= "/documents/" + collection + '/?'+"database=" + database_name;
    this.controllerFor('documents').set('collection_name',collection);
    this.controllerFor('documents').set('database_name',database_name);
		return Mongoman.Request.find(api,"documents");
	},

	setupController: function(controller,model) {
		controller.set('content',model);
	},

	renderTemplate: function() {
		this.render('documents-nav',{outlet: "main",into:"application"});
	}



});
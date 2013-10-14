Mongoman.DocumentsRoute = Ember.Route.extend({

	model: function(params) {
		var collection_name = params.collection;
		var database_name= collection_name.split('.')[0];
		var collection = collection_name.split('.')[1];
		var api= "/documents/" + collection + '/?'+"database=" + database_name;
		return Mongoman.Request.find(api,"documents");
	},

	setupController: function(controller,model) {
		controller.set('content',model);
	},

	renderTemplate: function() {
		this.render('documents-nav',{outlet: "main",into:"application"});
	}



});
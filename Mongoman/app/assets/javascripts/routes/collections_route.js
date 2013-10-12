Mongoman.CollectionsRoute = Ember.Route.extend({

	model: function(params) {
		console.log("In model.");
		var collection_name = params.name;
		var api= "/collections/" + collection_name;
		return Mongoman.Request.find(api,'collections');
	},

	setupController: function(controller,model) {
		controller.set('content',model);
	},

	renderTemplate: function() {
		this.render('collections-nav',{outlet: "main",into:"application"});
	}



});
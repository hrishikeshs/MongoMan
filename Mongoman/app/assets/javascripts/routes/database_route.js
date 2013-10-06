Mongoman.DatabaseRoute = Ember.Route.extend({

	model: function() {
		console.log("In model.");
		return [];
	},

	renderTemplate: function() {
		this.render('collections',{outlet: "main",into:"application"});
	}



});
Mongoman.AboutRoute = Ember.Route.extend({

	renderTemplate: function() {
		this.render('about',{outlet: "main",into:"application"});
	}



});
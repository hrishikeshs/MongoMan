Mongoman.CollectionsRoute = Ember.Route.extend({

	model: function(params) {
		var collection_name = params.name
		var api= "/collections/" + collection_name
		this.controllerFor('collections').set('collection_name', collection_name)
		return Mongoman.Request.find(api)
	},

	setupController: function(controller,model) {
		controller.set('content', model.collections)
		controller.set('content.isLoaded',false)
		controller.set('content.count', model.count)
		controller.set('content.isLoaded',true)
	},

	renderTemplate: function() {
		this.render('collections', {outlet: "main" , into:"application"})
	},

	deactivate:function() {
		var controller = this.controllerFor('collections')
		controller.set('content', null);
	}

    })

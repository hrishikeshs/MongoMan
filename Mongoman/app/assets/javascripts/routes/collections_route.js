Mongoman.CollectionsRoute = Ember.Route.extend({

  model: function(params) {
    return Mongoman.Database.collections(params.database);
  },

  setupController: function(controller, model) {
    controller.set('content', model.databases);
  },

  deactivate:function() {
    var controller = this.controllerFor('collections');
    controller.setProperties({
      content: null,
      selectedItem: null
    });
  }

});

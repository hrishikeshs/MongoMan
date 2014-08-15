Mongoman.CollectionsRoute = Ember.Route.extend({

  model: function(params) {
    return Mongoman.Database.collections(params.database);
  },

  setupController: function(controller, model) {
    controller.setProperties({
      model: model.databases,
      database: model.databases[0].stats.ns.split('.')[0]
    });
  },

  deactivate:function() {
    var controller = this.controllerFor('collections');
    controller.setProperties({
      content: null,
      selectedItem: null
    });
  }
});

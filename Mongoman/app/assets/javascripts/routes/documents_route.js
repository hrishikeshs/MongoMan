Mongoman.DocumentsRoute = Ember.Route.extend({

  model: function(params) {
    var collection = params.collection;
    var database_name= params.database;
    var api= "/documents/" + collection + '/?'+"database_name=" + encodeURIComponent(database_name) + "&collection_name=" + collection;
    var controller = this.controllerFor('documents');
    controller.setProperties({
      collection: collection,
      database: database_name
    });
    return Mongoman.Request.find(api);
  },

  setupController: function(controller, model) {
    controller.setProperties({
      model: model.documents,
      documentCount: model.count
    });
  },

  deactivate: function() {
    var controller = this.controllerFor('documents');
    controller.setProperties({
      content: [],
      documentCount: 0,
      searching: false,
      visibleStartIndex: 1
    });
  }

});

Mongoman.CollectionsDocumentsRoute = Ember.Route.extend({

  model: function(params) {
    var collection = params.collection;
    var database_name= params.database;
    var api= "/documents/" + collection + '/?'+"database_name=" + encodeURIComponent(database_name) + "&collection_name=" + collection;
    // var controller = this.controllerFor('collections.documents');
    // controller.setProperties({
    //   collection_name: collection,
    //   database_name: database_name
    // });
    return Mongoman.Request.find(api);
  },

  setupController: function(controller, model) {
    controller.setProperties({
      content: model.documents,
      documentCount: model.count
    });
    controller.send('initVisibleContent', true);
  },

  deactivate: function() {
    var controller = this.controllerFor('collections.documents');
    controller.setProperties({
      content: [],
      documentCount: 0,
      searching: false
    });
  }

});

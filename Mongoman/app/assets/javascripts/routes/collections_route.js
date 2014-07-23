Mongoman.CollectionsRoute = Ember.Route.extend({

  model: function(params) {
    var collection_name = params.name;
    var api= "/database/" + collection_name;
    this.controllerFor('collections').set('collection_name', collection_name);
    return Mongoman.Request.find(api);
  },

  setupController: function(controller,model) {
    controller.setProperties({
      content: model.collections || [],
      'content.count': model.count || 0
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

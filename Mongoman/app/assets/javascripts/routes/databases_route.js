Mongoman.DatabasesRoute = Ember.Route.extend({
 
  init: function() {
    this._super();
    window.history.pushState("", "",'/#/');
  },

  model: function() {
    return Mongoman.Request.find("/databases?");
  },

  setupController: function(controller,model) {
    
    controller.setProperties({
      content: model.databases,
     // 'content.count': model.count,
      // selectedItem: null
    });
  },

  deactivate: function() {
    this.controllerFor('databases').set('selectedItem', null);
  }

});

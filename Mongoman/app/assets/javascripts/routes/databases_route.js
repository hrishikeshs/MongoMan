Mongoman.DatabasesRoute = Ember.Route.extend({

  /*
  * Needed to handle the <back> and <forward> navigations on the landing page. A usability enhancement.
  */
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
      selectedItem: null
    });
    controller.initializeOriginalContent(model.databases);
  },

  deactivate: function() {
    var controller = this.controllerFor('databases');
    controller.set('selectedItem', null);
    controller.get('content').clear();
  }

});

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
  },

  deactivate: function() {
    this.controllerFor('databases').set('selectedItem', null);
  }

});

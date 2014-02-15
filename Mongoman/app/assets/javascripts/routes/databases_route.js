Mongoman.DatabasesRoute = Ember.Route.extend({
  init: function() {
      this._super();
      window.history.pushState("", "",'/#/');
  },

  model: function() {
    return Mongoman.Request.find("/databases?");
  },

  setupController: function(controller,model) {
    controller.set('content', model.databases);
    controller.set('content.count', model.count);
  }

});

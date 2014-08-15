Ember.Handlebars.registerBoundHelper('getdbName', function (text) {
  return text.split('.')[0];
});

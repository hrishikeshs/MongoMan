Ember.Handlebars.registerBoundHelper('truncate', function (number) {
  return Math.floor(number ? number : 0);
});
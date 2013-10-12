Ember.Handlebars.registerBoundHelper('sanitize', function (text) {
  text = text.split('.')[1]
  return new Handlebars.SafeString(text);
});
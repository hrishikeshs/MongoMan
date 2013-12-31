Ember.Handlebars.registerBoundHelper('sanitize', function (context,text) {
  splits = text.split('.')
  splits.shift()
  text = splits.join('.')
  return text;
});
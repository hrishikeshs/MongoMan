Ember.Handlebars.registerBoundHelper('sanitize', function (context,text) {
	console.log(text);

  splits = text.split('.');
  text = splits[splits.length -1];

  return new Handlebars.SafeString(text);
});
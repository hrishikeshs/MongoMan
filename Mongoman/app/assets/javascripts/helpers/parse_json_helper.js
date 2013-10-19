Ember.Handlebars.registerBoundHelper('parseJSON', function (text) {
	var s = JSON.stringify(text, undefined, 2);
	var html = "<pre>" + s + "</pre>";
  return new Handlebars.SafeString(html);
});
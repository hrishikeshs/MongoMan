Ember.Handlebars.registerBoundHelper('convertToGB', function (number) {
 return Math.round((number / Math.pow(2,30)), 15);
});
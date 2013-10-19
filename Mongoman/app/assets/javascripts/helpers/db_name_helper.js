Ember.Handlebars.registerBoundHelper('getdbName', function (text) {
  list = text.split('.');
  dbname = list[0];
  return dbname;
});
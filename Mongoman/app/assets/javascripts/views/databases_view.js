Mongoman.DatabasesView = Ember.View.extend({
  templateName: 'databases',

  //set properties to use in the component
  headers: ["Database Name", "Collections", "Size", "Indexes"],

  tableCells: [
    { field: 'name',
      customView: true,
      view: Em.View.extend({
                defaultTemplate: Em.Handlebars.compile("{{#linkTo 'collections' name class='table-links'}}{{name}}{{/linkTo}}")
            }),
    },
    { field: 'collection_count', customView: false},
    { field: 'size', customView: false},
    { field: 'indexes', customView: false}
  ]

});

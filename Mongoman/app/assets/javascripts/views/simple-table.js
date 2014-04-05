Mongoman.SimpleTableComponent = Ember.Component.extend({
  headers: null,       //header names are here in the same order as you would want them to appear.
  cells: null,


  init: function() {
    this._super();
    this.tableContents();
  },

  itemSelected: function(item) {
    this.sendAction('action', item);
  },

  tableContents: function() {
    this.set('augmentedContent', this.get('content'));
    this.set('augmentedContent.keys', this.get('cells'));
  }

});

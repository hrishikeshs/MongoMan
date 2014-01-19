Mongoman.DocumentsDisplayView = Ember.CollectionView.extend({
  tagName: 'ul',
  content: Em.computed.alias('controller.content'),
  itemViewClass: 'Mongoman.DocumentView',

});
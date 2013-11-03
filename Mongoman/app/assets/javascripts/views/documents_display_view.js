Mongoman.DocumentsDisplayView = Ember.CollectionView.extend({
  tagName: 'ul',
  content: Em.computed.alias('controller.visibleContent'),
  itemViewClass: 'Mongoman.DocumentView',

});
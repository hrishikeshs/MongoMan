Mongoman.DocumentsView = Ember.CollectionView.extend({
  tagName: 'ul',
  content: Em.computed.alias('controller.content.content'),
  itemViewClass: 'Mongoman.DocumentView',



});
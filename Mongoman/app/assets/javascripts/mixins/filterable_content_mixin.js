Mongoman.FilterableContentMixin = Em.Mixin.create({

  //keep a copy of the original content
  originalContent: "",
  filterPhrase: "",

  initializeOriginalContent: function(content) {
    this.set('originalContent', Array.prototype.slice.call(content, 0, content.length));
  },

  
  filterContent: function() {
    var phrase = this.get('filterPhrase');
    if(phrase) {
      this.set('content', this.get('originalContent'));
      this.set('content', this.get('content').filter(function(elem) {
        return elem.name.match("%@".fmt(phrase));
      }));
    }
    else {
      this.set('content', this.get('originalContent'));
    }
  }.observes('filterPhrase')
});

Mongoman.FilterableContentMixin = Em.Mixin.create({

  //keep a copy of the original content
  originalContent: "",
  filterPhrase: "",

  initializeOriginalContent: function() {
    //use compact to create a copy ;-)
    if(!this.get('originalContent')) {
      this.set('originalContent', this.get('content').compact());
    }
  }.observes('content'),

  
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

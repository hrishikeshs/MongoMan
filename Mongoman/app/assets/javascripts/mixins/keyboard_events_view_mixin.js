Mongoman.KeyBoardEventsViewMixin = Ember.Mixin.create({
  
  keyPress: function(event, view) {
    var key = String.fromCharCode(event.keyCode);
    if(key === 'f') {
      this.get('controller').send('findModeActivated');
    }
  }

});

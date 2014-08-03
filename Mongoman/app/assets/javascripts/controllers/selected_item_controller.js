Mongoman.SelectedItemController = Ember.ObjectController.extend({
  selected: null,
  
  selecteddidChange: function() {
    this.get('parentController').send((this.get('selected') ? 'selected' : 'deselect'), this);
  }.observes('selected'),

  actions : {

    toggleSelection: function() {
      this.toggleProperty('selected');
    }

  }
});


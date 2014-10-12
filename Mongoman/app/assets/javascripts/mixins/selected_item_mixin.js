Mongoman.SelectedItemMixin = Ember.Mixin.create({
  selectedItem: null,
  
  updateSelectedItem: function() {
    this.set('selectedItem', null);
  }.observes('content'),

 /**
  * Let only one item to be in selected state
  * at any given time.
  */
  actions : {
    selected: function(item) {
      if (!this.get('selectedItem')) {
        this.set('selectedItem', item);
      }
      else {
        this.get('selectedItem').set('selected', false);
        this.set('selectedItem', item);
      }
    },

    /**
    * When the checkbox is unchecked
    */
    deselect: function(item) {
      if (this.get('selectedItem') === item) {
        this.set('selectedItem', null);
      }
    }
  }
});

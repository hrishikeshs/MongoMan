Mongoman.SelectedItemMixin = Ember.Mixin.create({
  selectedItem: null,

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
        this.get('selectedItem').send('toggleSelection');
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

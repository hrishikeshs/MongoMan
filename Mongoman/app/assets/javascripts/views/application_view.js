Mongoman.ApplicationView = Ember.View.extend(Mongoman.KeyBoardEventsViewMixin, {
  classNames: ["application"],

  didInsertElement: function() {
    this.$().focus();
  }
});
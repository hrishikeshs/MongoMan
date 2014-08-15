Mongoman.SelectableRowView = Em.View.extend(Ember.TargetActionSupport, {
  tagName: 'tr',
  classNames: ["table-row"],
  classNameBindings: ["selected:selected-row"],
  templateName: 'selectableRow',
  selected: false,

  selectedDidChange: function() {
    var action = this.get('selected') ? 'selected' : 'deselect';
    this.triggerAction({
      action: action,
      target: this.get('controller'),
      actionContext: this
    });
  }.observes('selected')
});

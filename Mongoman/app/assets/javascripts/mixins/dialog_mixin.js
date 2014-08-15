Mongoman.DialogMixin = Ember.Mixin.create({
  //dimesions for the dialog box
  resizable: false,
  draggable: true,
  height:250,
  width: 450,
  modal: true,
  buttons: {},

  displayDialog: function(selector, actions, width, height) {
    var self = this;
    var properties = self.getProperties('resizable','draggable','height','width','modal','buttons');
    $(selector).dialog({
      resizable: properties.resizable,
      draggable: properties.draggable,
      height:    height || properties.height,
      width:     width || properties.width,
      modal:     properties.modal,
      buttons:   actions
    });
  }
});

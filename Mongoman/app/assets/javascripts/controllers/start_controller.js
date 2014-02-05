Mongoman.StartController = Ember.ArrayController.extend({
  content: null,
  isLoaded: Ember.computed.alias('content.length'),


  actions: {

    addDatabase: function() {
      var self = this;
      $("#newdb-create" ).dialog({
        resizable: false,
        height:250,
        width: 450,
        modal: true,
        buttons: {
          Create: function() {
            var newDbName = self.get('content.newDbName')
            var url = '/databases?'
            Mongoman.PostRequest.post(url, {dbname: newDbName}, 'POST')
            $(this).dialog("close")
          },
          Cancel: function() {
            $(this).dialog("close")
          }
        }
      });
    }
  }





})

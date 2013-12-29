Mongoman.StartController = Ember.ArrayController.extend({
	content: null,
	isVisible: true,

	update: function() {
		this.set('content',this.get('content'));
    if (this.get('content')) {
      this.set('content.isLoaded', true);
    }
	}.observes('content.content'),

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
            self.set('content.isLoaded', false);
            self.set('content', Mongoman.Request.find("/databases",'databases'))            
          },
          Cancel: function() {
            $(this).dialog("close") 
          }
        }
      });
    }
  }





})
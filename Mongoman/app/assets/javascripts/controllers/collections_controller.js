Mongoman.CollectionsController = Ember.ArrayController.extend({
	stats: null,
	isVisible: true,
	database_name:null,


	update: function() {		
		if (this.get('content.content') ) {
			var database_name = this.get('content.content')[0]['stats']['ns'].split('.')[0]
      this.set('stats',this.get('content.content'))
      this.set('isLoaded', true)
		}
    else {
      this.set('stats', null);
    }
    this.set('database_name',database_name)
	}.observes('content.content'),

	actions: {
		dropDatabase : function() {
			var self = this;
			$("#placeholder-confirm-drop-db" ).dialog({
		  	resizable: false,
		  	height:250,
		  	width: 450,
		  	modal: true,
		  	buttons: {
		      Delete: function() {
		      	var url = '/databases/' + self.get('database_name')
						Mongoman.PostRequest.post(url , {} , 'DELETE')
						$(this).dialog("close")
						self.transitionTo('start')
			    },
		    	Cancel: function() {
		     		$(this).dialog("close") 
		      }
			  }
			});	
		},

		addCollection: function() {
			var self = this;
			$("#newcollection-create" ).dialog({
        resizable: false,
        height:250,
        width: 450,
        modal: true,
        buttons: {
          Create: function() {
            var newCollection = self.get('content.newCollection')
            var url = '/collections?'
            Mongoman.PostRequest.post(url, {collectionName: newCollection, db: self.get('database_name')}, 'POST')
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
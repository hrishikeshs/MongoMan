Mongoman.DocumentsController = Ember.ArrayController.extend({ 
	isVisible: true,
	fields: null,
	data: null,
	collection_name: null,
	database_name: null,
	page: null,
	visibleContent: null,
	totalContent: null,


	initVisibleContent: function() {
		if (this.get('content.content')) {
			var content = this.get('content.content');
			this.set('visibleContent',content.slice(0,15));
			this.set('totalContent',content.slice(15));
		}
	}.observes('content.content'),


	actions: {  
  	editDocument: function(p) {
		},

		deleteDocument: function(p) {
			var self = this
			$("#placeholder-confirm" ).dialog({
		  	resizable: false,
		  	height:250,
		  	width: 450,
		  	modal: true,
		  	buttons: {
		      Delete: function() {
			      self.get('visibleContent').removeObject(p)
						if (self.get('totalContent').length ) {
							self.get('visibleContent').pushObject(self.get('totalContent').shiftObject())
						}
						var url = '/documents/' + ( p._id.$oid ? p._id.$oid : JSON.stringify(p._id)) + '?'
						Mongoman.PostRequest.post(url , {database_name : self.get('database_name'), collection_name: self.get('collection_name')}, 'delete')
						$(this).dialog("close")
			    },
		    	Cancel: function() {
		     		$(this).dialog("close") 
		      }
			  }
			});
		},

		pageChanged: function(new_page) {
			var totalContent = this.get('totalContent')
			var paginated_content_index = (new_page-1)*15
			this.set('visibleContent',totalContent.slice(paginated_content_index,paginated_content_index+15))
		}

	}

});
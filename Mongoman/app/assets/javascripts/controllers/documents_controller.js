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
      this.set('content.isLoaded', true)
		}
	}.observes('content.content'),

	isValidDocument: function(payload) {
		var result = ""
		try {
			result = JSON.stringify(payload)
			return result;
		}
		catch(e) {
			return false;
		}
	},	


	actions: {  

  	addDocument: function() {
  		var self = this
  		$( "#dialog-form" ).dialog({
      resizable: false,
      height:400,
		  width: 500,
		  modal: true,
		  buttons: {
        "Add Document" : function() {
        	var json = self.isValidDocument(self.newDocument);
        	if (json && (self.newDocument !== "")) {
        		var url = '/documents?' + jQuery.param({newdoc : self.newDocument}) + "&"
        		Mongoman.PostRequest.post(url , {database_name : self.get('database_name'), collection_name: self.get('collection_name')}, 'POST')
        		$( this ).dialog( "close" )
        	} 
        	else {
        		$.flash("Your JSON is invalid!! Please enter valid JSON.")
        	}
        },
        Cancel: function() {
          $( this ).dialog( "close" )
        }
      }
    });

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
              window.scroll(0,0);
						}
						var url = '/documents/' + ((typeof p._id === "string") ? p._id.match(/[0-9a-f]{24}/)[0] : -1 ) + '?'
						Mongoman.PostRequest.post(url , {document_index: JSON.stringify(p._id), database_name : self.get('database_name'), collection_name: self.get('collection_name')}, 'delete')
						$(this).dialog("close")
			    },
		    	Cancel: function() {
		     		$(this).dialog("close") 
		      }
			  }
			});
		},


    dropCollection: function() {
      var self = this;
      $("#placeholder-confirm-drop-collection" ).dialog({
        resizable: false,
        height:250,
        width: 450,
        modal: true,
        buttons: {
          Drop: function() {
            var url = '/collections/' + self.get('collection_name') + '?'
            Mongoman.PostRequest.post(url , {database_name: self.get('database_name') } , 'DELETE')
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
			var paginated_content_index = (new_page-1) * 15
			this.set('visibleContent',totalContent.slice(paginated_content_index,paginated_content_index+15))
      window.scroll(0,0);
		}

	}

});
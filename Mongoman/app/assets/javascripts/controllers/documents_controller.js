Mongoman.DocumentsController = Ember.ArrayController.extend({ 
	isVisible: true,
	fields: null,
	data: null,
	collection_name: null,
	database_name: null,
	page: null,
	visibleContent: null,
	totalContent: null,
  visibleStartIndex: null,
  visibleEndIndex: null,
  count: Ember.computed.alias('content.content.count'),


	initVisibleContent: function() {
		if (this.get('content.content')) {
			var content = this.get('content.content')
			this.set('visibleContent',content.slice(0,15))
      this.set('visibleStartIndex', 1)
      this.set('visibleEndIndex', this.get('visibleContent').length)
			this.set('totalContent',content.slice(15))
      this.set('content.isLoaded', true)
		}
	}.observes('content.content'),


  jsonifyText: function(str) {
    var keys = str.match(/[a-zA-Z0-9_]+:\s+/g)
    for (var i = 0, j = keys.length; i < j; i++) {
      str = str.replace(keys[i],'"' + keys[i].split(':')[0] + '":' )
    }
    return str
  },
  
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
      resizable: true,
      height:450,
		  width: 600,
		  modal: true,
		  buttons: {
        "Add Document" : function() {
        	var json = self.isValidDocument(self.newDocument);
        	if (json && (self.newDocument !== "")) {
        		var url = '/documents/?'
        		Mongoman.PostRequest.post(url , {database_name : self.get('database_name'), collection_name: self.get('collection_name')}, 'POST', self.jsonifyText(self.newDocument.trim()))
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
      this.set('visibleStartIndex',paginated_content_index + 1 )
      this.set('visibleEndIndex', paginated_content_index + this.get('visibleContent').length + 1)
      window.scroll(0,0);
		}

	}

});
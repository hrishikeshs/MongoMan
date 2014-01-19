Mongoman.DocumentsController = Ember.ArrayController.extend({ 
	isVisible: true,
	fields: null,
	data: null,
	collection_name: null,
	database_name: null,
	totalPages: null,
	visibleContent: null,
	totalContent: null,
  visibleStartIndex: null,
  visibleEndIndex: null,
  eagerLoaded: false,
  count: Ember.computed.alias('documentCount'),


  jsonifyText: function(str) {
    var keys = str.match(/[a-zA-Z0-9_\"\s\']+:\s+/g)
    if (keys) {
      for (var i = 0, j = keys.length; i < j; i++) {
        str = str.replace(keys[i],'"' + keys[i].split(':')[0] + '":' )
      }
    }
    else {
      str = '{}'
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


    initVisibleContent: function() {
      if (this.get('content')) {
        this.set('visibleStartIndex', 1)
        this.set('visibleEndIndex', this.get('content.length'))
        this.set('isLoaded', true)
      }
    },  


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
      var self = this;
			var paginated_content_index = (new_page - 1 ) * 15
      this.set('visibleStartIndex', paginated_content_index + 1)
      var difference = this.get('count') - this.get('visibleStartIndex')
      if (difference > 15) {
        this.set('visibleEndIndex', paginated_content_index + 15)
      }
      else {
        this.set('visibleEndIndex', this.get('count'))
      }

      var api = "/documents/" + this.get('collection_name') + '/?'+ "database=" + encodeURIComponent(this.get('database_name')) + "&collection=" + this.get('collection_name') + "&from=" + paginated_content_index

      var getMoreContent = Mongoman.Request.find(api)
      this.set('isLoaded', false)
      this.set('content', [])
      getMoreContent().
        then(function success(response){
            self.set('content', response.documents)
            self.set('isLoaded', true)
        },
        function failure(error) {
          
        }
      );
    }
	}

});
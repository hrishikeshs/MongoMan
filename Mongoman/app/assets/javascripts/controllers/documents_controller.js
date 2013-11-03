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
			console.log("calledEdit");
			console.log(p);
		},

		deleteDocument: function(p) {
			console.log("Called Delete");
			alert("Are you sure?");
			this.get('visibleContent').removeObject(p);
			if (this.get('totalContent').length ) {
				this.get('visibleContent').pushObject(this.get('totalContent').shiftObject());
			}
		},

		pageChanged: function(new_page) {
			var totalContent = this.get('totalContent');
			var paginated_content_index = (new_page-1)*15;
			this.set('visibleContent',totalContent.slice(paginated_content_index,paginated_content_index+15));
		}

	}



	

});
Mongoman.DocumentsController = Ember.ArrayController.extend({ 
	isVisible: true,
	fields: null,
	data: null,
	collection_name: null,
	database_name: null,


	actions: {  
  	editDocument: function(p) {
			console.log("calledEdit");
			console.log(p);
		},

		deleteDocument: function(p) {
			console.log("Called Delete");
			alert("Are you sure?");
			this.get('content.content').removeObject(p)
		}
	}



	

});
Mongoman.DocumentsController = Ember.ArrayController.extend({ 
	isVisible: true,
	fields: null,
	data: null,
	collection_name: null,
	database_name: null,


	editDocument: function() {
		console.log("Called");
		alert("You are gonna edit this?");
	},

	deleteDocument: function() {
		alert("Are you sure?");
		console.log("Called Delete");
	}

})
Mongoman.DocumentsController = Ember.ArrayController.extend({ 
	isVisible: true,
	fields: null,
	data: null,
	collection_name: null,

	update: function() {		
		if (this.get('content.content')) {
			var o = this.get('content.content')[0];
			console.log(this.get('content'));
		}
	}.observes('content.content')
})
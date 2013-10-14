Mongoman.DocumentsController = Ember.ArrayController.extend({
	isVisible: true,
	fields: null,
	data: null,

	update: function() {		
		if (this.get('content.content')) {
			var o = this.get('content.content')[0];
			console.log(Object.keys(o));
		}
	}.observes('content.content')
})
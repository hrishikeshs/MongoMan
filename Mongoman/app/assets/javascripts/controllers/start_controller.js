Mongoman.StartController = Ember.ArrayController.extend({
	content: null,
	isVisible: true,

	update: function() {
		this.set('content',this.get('content'));
	}.observes('content.content')
})
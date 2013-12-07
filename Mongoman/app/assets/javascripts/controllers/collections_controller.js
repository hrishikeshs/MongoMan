Mongoman.CollectionsController = Ember.ArrayController.extend({
	stats: null,
	isVisible: true,
	database_name:null,

	update: function() {		
		if (this.get('content.content')) {
			var database_name = this.get('content.content')[0]['stats']['ns'].split('.')[0];
			this.set('database_name',database_name);
			this.set('stats',this.get('content.content'));
		}
	}.observes('content.content')
})
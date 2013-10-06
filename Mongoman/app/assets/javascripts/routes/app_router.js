Mongoman.Router.map(function() {
	
	this.resource('start', {path: '/'});/*,function() {

		this.resource('database', {path: '/database/:name'}, function() {
			this.route('collections', {path: '/database/:name/:collection' });
		});
	}); */

	this.route('database',{path: '/database/:name'});




	
});
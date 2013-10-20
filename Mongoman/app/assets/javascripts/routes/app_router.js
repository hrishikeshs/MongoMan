Mongoman.Router.map(function() {
	
	this.route('start', {path: '/'});
	this.route('collections',{path: '/collections/:name'});
	this.route('documents', {path: '/documents/:collection'});




	
});
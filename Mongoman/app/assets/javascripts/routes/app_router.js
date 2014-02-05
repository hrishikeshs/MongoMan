Mongoman.Router.map(function() {

	this.route('start', {path: '/'});
	this.route('about', {path: '/about'});
	this.route('collections',{path: '/collections/:name'});
	this.route('documents', {path: '/documents/:database/:collection'});





});

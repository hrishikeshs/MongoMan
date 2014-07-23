Mongoman.Router.map(function() {

	
	this.route('about', {path: '/about'});
	// this.route('collections',{path: '/collections/databases/:name'});
	// this.route('documents', {path: '/documents/:database/:collection'});
  this.resource('databases', {path: '/'}, function() {
    this.resource('collections', {path: '/:database/:collection_name'}, function() {
      this.route('index', {path: '/'});
      this.route('documents', {path: '/documents'});
    });  
  });


});

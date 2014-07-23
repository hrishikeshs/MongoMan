Mongoman.Router.map(function() {

	
	this.route('about', {path: '/about'});

  this.resource('databases', {path: '/'}, function() {
    this.resource('collections', {path: '/:database'}, function() {
      this.route('index', {path: '/'});
      this.route('documents', {path: '/:collection/documents'});
    });  
  });


});

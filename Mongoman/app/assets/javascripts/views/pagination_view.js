Mongoman.PaginationView = Ember.View.extend({
	tagName: 'div',
  pagination: null,
  defaultTemplate: Em.Handlebars.compile('<div style="clear:both"></div><div class="page-selection" style="margin-left:480px;"></div>'),

  didInsertElement: function() {
    var controller = this.get('controller')
		if (controller.get('content')) {
      var contentLength = controller.get('count')
      var numPages = contentLength/15
      var spillOver = ((numPages % 1 ) !== 0) ? 1 : 0
			var totalPages = Math.floor(numPages) + spillOver
      controller.set('totalPages', totalPages)
      $('.page-selection').bootpag({
	      	total: totalPages || 0,
	      	maxVisible: 8,
	      }).
        on("page", function(event, num){
	      	controller.send('pageChanged',num)
    	  }); 
			} 
    else {
     	Ember.run.next(this, function() {
        this.didInsertElement()
  	 });  		
	}
	}  

});
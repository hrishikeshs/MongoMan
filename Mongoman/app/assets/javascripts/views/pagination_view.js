Mongoman.PaginationView = Ember.View.extend({
	tagName: 'div',
  pagination: null,
  defaultTemplate: Em.Handlebars.compile('<div style="clear:both"></div><div id="page-selection" style="margin-left:480px;"></div>'),



  didInsertElement: function() {

  		var controller = this.get('controller');

  		if (controller.get('content.content')) {
  			var total_pages = Math.ceil(controller.get('totalContent').length/15); 
  				$('#page-selection').bootpag({
		      	    total: total_pages,
		      	    page: 1,
		      	    maxVisible: 8,
		      	}).on("page", function(event, num){
		      		controller.send('pageChanged',num);
	    		}); 
 			} else {
	     	Ember.run.next(this, function() {
	        this.didInsertElement();
    	 });  		
		}
	}  

});
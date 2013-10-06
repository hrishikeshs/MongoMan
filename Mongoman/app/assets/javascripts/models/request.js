Mongoman.Request = Ember.Object.extend({

});


Mongoman.Request.reopenClass({

	find: function() {
		var model= Em.A([]);
	  var url =  "/databases";            
    $.ajax({
      url: url,
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      type: 'get',
      data: {},
      async: true,
      cache: false,
      success: function(data, status, xhr) {
        model.set('content',data['databases']);
      },
      error: function(xhr, textStatus, errorThrown) {
        console.log(xhr,textStatus);
      }
    });
		return model;
	}

});
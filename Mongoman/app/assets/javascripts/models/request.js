Mongoman.Request = Ember.Object.extend({

});


Mongoman.Request.reopenClass({

	find: function(api,index_symbol) {
		var model= Em.A([]);
	  var url = api ;            
    $.ajax({
      url: url,
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      type: 'get',
      data: {},
      async: true,
      cache: false,
      success: function(data, status, xhr) {
        model.set('content',data[index_symbol]);
      },
      error: function(xhr, textStatus, errorThrown) {
        console.log(xhr,textStatus);
      }
    });
		return model;
	}

});

Mongoman.PostRequest = Ember.Object.extend({

});

Mongoman.PostRequest.reopenClass({
  
  delete: function(api,type) {
    var url = api ;            
    $.ajax({
      url: url,
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      type: 'post',
      data: {},
      async: true,
      cache: false,
      success: function(data, status, xhr) {
        model.set('content',data[index_symbol]);
      },
      error: function(xhr, textStatus, errorThrown) {
        console.log(xhr,textStatus);
      }
    });
  }
});
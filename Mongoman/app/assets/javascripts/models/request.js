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
  
  purge: function(api,params) {

    var root = api + '?database_name=' + params[0] + '&collection_name=' + params[1];
    $.ajax({
      url: root,
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      type: 'delete',
      data: {},
      async: true,
      cache: false,
      success: function(data, status, xhr) {
        $.flash(data.notice);
      },
      error: function(xhr, textStatus, errorThrown) {
        console.log(xhr,textStatus);
        return null;
      }
    });
  }
});
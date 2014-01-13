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
        model.set('content.count', data['count']);
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
  
  post: function(api , params, type, data) {
    var api = api + jQuery.param(params);
    $.ajax({
      url: api,
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      type: type,
      data: data,
      async: true,
      cache: false,
      success: function(data, status, xhr) {
        $.flash(data.notice);
      },
      error: function(xhr, textStatus, errorThrown) {
        console.log(xhr,textStatus);
        $.flash("Invalid operation");
        return null;
      }
    });
    return null;
  }
});
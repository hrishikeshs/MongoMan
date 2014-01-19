Mongoman.Request = Ember.Object.extend({

});

Mongoman.Request.reopenClass({

  find: function(url) {
    var api = url;
    return function() {
      var promise = new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.$.ajax({
          dataType: "json",
          url: api,
          data: {},
          contentType: 'application/json; charset=utf-8',
          type: 'GET',
          success: function(response, status, xhr) {
            resolve(response);
          },
          error: function(xhr, textStatus, errorThrown) {
            reject(errorThrown);
          }
        });
      });
    return promise;
   }
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
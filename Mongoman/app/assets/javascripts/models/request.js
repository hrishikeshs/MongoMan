Mongoman.Request = Ember.Object.extend({

});

Mongoman.Request.reopenClass({

  find: function getData(url) {
    var promise = new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.$.ajax({
          dataType: "json",
          url: url,
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

});


Mongoman.PostRequest = Ember.Object.extend({

});

Mongoman.PostRequest.reopenClass({

  post: function(api , params, type, data) {

    var promise = new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.$.ajax({
          dataType: "json",
          url:  api + jQuery.param(params),
          data: data,
          contentType: 'application/json; charset=utf-8',
          type: type,
          success: function(response, status, xhr) {
            $.flash(response.notice);
            resolve();
          },
          error: function(xhr, textStatus, errorThrown) {
            console.log(xhr,textStatus);
            $.flash("Invalid operation");
            reject();
          }
        });
      });
    return promise;
  }

});

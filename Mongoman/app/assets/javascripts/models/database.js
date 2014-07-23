Mongoman.Database = Ember.Object.extend({

});

Mongoman.Database.reopenClass({

  createDatabase: function(name) {
    var url = '/databases?';
    return Mongoman.PostRequest.post(url, {database_name: name}, 'POST');
  },

  copy: function(originaldb, newName) {
    var url = '/databases/copy/' + newName + '?';
    return Mongoman.PostRequest.post(url, {database_name: originaldb}, 'PUT');
  },

  rename: function(originaldb, newName) {
    var url = '/databases/rename/' + originaldb + '?';
    return Mongoman.PostRequest.post(url, {new_name: newName}, 'PUT');
  },

  drop: function(dbName) {
    var url = '/databases/' + dbName;
    return Mongoman.PostRequest.post(url , {} , 'DELETE');
  },

  collections: function(name) {
    var url = "/databases/" + name;
    return Mongoman.Request.find(url).then(function(response) {
      return Em.A(response);
    });
  }

});

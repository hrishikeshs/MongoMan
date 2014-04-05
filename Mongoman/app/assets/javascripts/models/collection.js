Mongoman.Collection = Ember.Object.extend({

});

Mongoman.Collection.reopenClass({

  createCollection: function(collection, database) {
    var url =  '/collections?';
    return Mongoman.PostRequest.post(url, {database_name: database, collection_name: collection}, 'POST');
  },

  copy: function(original, copyname, database) {
    var url = '/collections/copy?';
    return Mongoman.PostRequest.post(url, {database_name: database, collection_name: original, copyas: copyname}, 'POST');
  },

  rename: function(collection, database, newname) {
    var url = '/collections/rename?';
    return Mongoman.PostRequest.post(url, {
      database_name: database,
      collection_name: collection,
      new_name: newname
    }, 'PUT');
  },

  drop: function(database, collection) {
    var url = '/collections/' + collection + '?';
    return Mongoman.PostRequest.post(url , {database_name: database} , 'DELETE');
  }

});

Mongoman.DocumentsController = Ember.ArrayController.extend({
  isVisible: true,
  fields: null,
  data: null,
  collection: null,
  database: null,
  totalPages: null,
  visibleStartIndex: 1,
  
  visibleEndIndex: function() {
    var visibleStartIndex = this.get('visibleStartIndex');
    var contentLength = this.get('content.length');
    var pageSize = 14;
    return visibleStartIndex + (contentLength < 15 ? contentLength - 1 : pageSize);
  }.property('content', 'visibleStartIndex'),

  searchCount : null,
  count: Ember.computed.alias('documentCount'),

 
  actions: {

    search: function() {
      var searchPhrase = encodeURIComponent(this.get('searchtext').replace(/\./g,"*"));
      var api = "/documents/search/" + searchPhrase +'?'+ "database_name=" +
      encodeURIComponent(this.get('database'))+ "&collection_name=" + encodeURIComponent(this.get('collection'));

      var getSearchresult = Mongoman.Request.find(api);
      getSearchresult.then(function loadedSearchContent(response) {
        this.set('content', response.documents);
        this.set('searchCount', response.documents.count);
        if (response.notice) {
          $.flash(response.notice);
        }
      }.bind(this),
      function failedToLoadContent(error) {
        self.set('content', error);
      }.bind(this));

      this.set('searching', searchPhrase.length > 0);

    },

    addDocument: function() {
      var self = this;
      $("#dialog-form").dialog({
      resizable: true,
      height:450,
      width: 600,
      modal: true,
      buttons: {
        "Add Document" : function() {
          var url = '/documents/?';
          var json = Mongoman.Utils.sanitizeInput(self.newDocument.replace(/\n/g,'').replace(/\t+/g,''));
          var promise = Mongoman.PostRequest.post(url , { database_name : self.get('database'), collection_name: self.get('collection') }, 'POST', json);
          promise.then(function() { });
          $(this).dialog("close");
        },
        Cancel: function() {
          $(this).dialog( "close" );
        }
      }
    });

    },


    dropCollection: function() {
      var self = this;
      $("#placeholder-confirm-drop-collection" ).dialog({
        resizable: false,
        height:250,
        width: 450,
        modal: true,
        buttons: {
          Drop: function() {
            var url = '/collections/' + self.get('collection') + '?';
            Mongoman.PostRequest.post(url , {database_name: self.get('database') } , 'DELETE');
            $(this).dialog("close");
          },
          Cancel: function() {
            $(this).dialog("close");
          }
        }
      });
    },

    pageChanged: function(new_page) {
      var paginated_content_index = (new_page - 1 ) * 15;
      this.set('visibleStartIndex', paginated_content_index + 1);
      var api = "/documents/" + this.get('collection') + '/?'+ "database_name=" + encodeURIComponent(this.get('database')) + "&collection_name=" + this.get('collection') + "&from=" + paginated_content_index;
      var getMoreContent = Mongoman.Request.find(api);
      getMoreContent.then(function loadedMoreContent(response) {
        this.set('content', response.documents);
      }.bind(this),
      function failedToLoadContent(error) {
        this.set('content', error);
      }.bind(this));
    }
  }

});

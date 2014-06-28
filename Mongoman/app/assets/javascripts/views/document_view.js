Mongoman.DocumentView = Ember.View.extend({
  classNames:['document'],
  classNameBindings: ['editing:js-editing-document'],
  tagName: 'div',
  editing: false,
  templateName: 'document',
  
  buttonText: function() {
    return this.get('editing') ? 'Save' : 'Edit';
  }.property('editing'),

  actions: {
    
    editOrSaveDocument: function() {
      this.toggleProperty('editing');
      if(!this.get('editing')) {
        var updated_document = this.$().text().match(/\{.+\}/)[0];
        updated_document = Mongoman.Utils.sanitizeInput(updated_document);
        var url = '/documents/id?';
        var promise = Mongoman.PostRequest.post(url , {database_name : this.get('controller.database_name'), collection_name: this.get('controller.collection_name')}, 'PUT', updated_document);
        promise.then(
          function(response) {
            this.get('parentView').removeObject(this.get('content'));
            this.get('parentView').addObject(response.document);
            this.rerender();
          }.bind(this), 
          function failure() {
            this.rerender();
          }.bind(this));
      }
    },

    deleteDocument: function() {
      var self = this;
      var p = this.get('content');
      $("#placeholder-confirm" ).dialog({
        resizable: false,
        height:250,
        width: 450,
        modal: true,
        buttons: {
          Delete: function() {
            self.get('controller.content').removeObject(p)
            var url = '/documents/' + ((typeof p._id === "string") ? p._id.match(/[0-9a-f]{24}/)[0] : -1 ) + '?'
            Mongoman.PostRequest.post(url , {document_index: JSON.stringify(p._id), database_name : self.get('controller.database_name'), collection_name: self.get('controller.collection_name')}, 'delete')
            window.scroll(0,0);
            $(this).dialog("close")
            self.set('controller.count', self.get('controller.count')  - 1)
            self.set('controller.visibleEndIndex', self.get('controller.visibleEndIndex') - 1)
          },
          Cancel: function() {
            $(this).dialog("close")
          }
        }
      });
    },

  },


 });


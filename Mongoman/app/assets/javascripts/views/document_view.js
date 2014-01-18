Mongoman.DocumentView = Ember.View.extend({
  classNames:['document'],
  classNameBindings: ['editing:js-editing-document'],
  tagName: 'div',
  editing: false,
  
  template: Ember.Handlebars.compile("<button class='delete-btn'{{action 'deleteDocument' target='view'}}>Delete</button><button class='edit-save-button' {{action 'editOrSaveDocument' target='view'}} title='syntax is key:[space]value-in-double-quotes'>Edit</button><div contenteditable='false' class='document-content'>{{parseJSONString view.content}}</div>"),

  actions: {
    editOrSaveDocument: function() {

      if (this.get('editing') === false) {
        this.set('editing', true)   
        this.$('.edit-save-button')[0].innerHTML = 'Save'     
        this.$('.document-content')[0].contentEditable = true
      }
      else {
        this.$('.document-content')[0].contentEditable = false
        var updated_document = this.$('.document-content').text()
        var jsonified = this.get('controller.jsonifyText')(updated_document.trim())
        var url = '/documents/id?'
        Mongoman.PostRequest.post(url , {database_name : this.get('controller.database_name'), collection_name: this.get('controller.collection_name')}, 'PUT', jsonified)
        this.set('editing', false)
        this.$('.edit-save-button')[0].innerHTML = 'Edit'
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
            self.get('controller.visibleContent').removeObject(p)
            if (self.get('controller.totalContent').length ) {
              self.get('controller.visibleContent').pushObject(self.get('controller.totalContent').shiftObject())
              window.scroll(0,0);
            }
            var url = '/documents/' + ((typeof p._id === "string") ? p._id.match(/[0-9a-f]{24}/)[0] : -1 ) + '?'
            Mongoman.PostRequest.post(url , {document_index: JSON.stringify(p._id), database_name : self.get('controller.database_name'), collection_name: self.get('controller.collection_name')}, 'delete')
            window.scroll(0,0);
            $(this).dialog("close")
            self.set('count', self.get('count')  - 1)
          },
          Cancel: function() {
            $(this).dialog("close") 
          }
        }
      });
    },

  },


 });
    
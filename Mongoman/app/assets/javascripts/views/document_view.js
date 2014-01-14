Mongoman.DocumentView = Ember.View.extend({
  classNames:['document'],
  classNameBindings: ['isEditing:editing'],
  tagName: 'div',

  template: Ember.Handlebars.compile("<button class='delete-btn'{{action 'deleteDocument' view.content}}>Delete</button><button class='edit-save-button' {{action 'editOrSaveDocument' view.content target='view'}} title='syntax is key:[space]value'>Edit</button><div contenteditable='false' class='document-content'>{{parseJSONString view.content}}</div>"),
  
 actions: {
    editOrSaveDocument: function(p) {

      var flag = this.$('.edit-save-button')[0].innerHTML == 'Edit' ? 'edit' : 'save'

      if(flag === 'edit') {
        this.$('.document-content')[0].contentEditable = true;
        this.$('.document')['context'].style['background-color'] = 'white';
        this.$('.document')['context'].style['border'] = '2px solid rgba(65,131,196,0.4)';
        this.$('.edit-save-button')[0].innerHTML = 'Save'
      }
      else {
          var updated_document = this.$('.document-content')[0].innerText.trim()
          var matches = updated_document.match(/(.+): /g)
          for (var i = 0, j = matches.length; i < j; i++) {
            var temp = matches[i].split(':')[0]
            updated_document = updated_document.replace(matches[i],'"' + temp + '":')
          }
          //@Todo remove this parsing code by modifying the parse_json_helper
          updated_document = updated_document.replace(/[\s+\n+]/g,'')
          updated_document = updated_document.replace(/\'/g,'"')
          updated_document = updated_document.replace(/\("/g,'(')
          updated_document = updated_document.replace(/"\)/g,')')
          var url = '/documents/id?'
          Mongoman.PostRequest.post(url , {database_name : this.get('controller.database_name'), collection_name: this.get('controller.collection_name')}, 'PUT', updated_document)
          this.$('.document-content')[0].contentEditable = false
          this.$('.document')['context'].style['background-color'] = '#f9f9f9'
          this.$('.document')['context'].style['border'] = 'none'
          this.$('.edit-save-button')[0].innerHTML = 'Edit'

      }

    }
  }
 });
  
Mongoman.CollectionsController = Ember.ArrayController.extend(Mongoman.DialogMixin, Mongoman.SelectedItemMixin,{
  stats: null,
  isVisible: true,
  database_name:null,
  collection_name: null,
  newCollection: null,
  copyas: null,
  newName: null,
  itemController: 'selectedItem',


  update: function() {
    var database_name = "";
    if (this.get('content') && this.get('content')[0]) {
      database_name = this.get('content')[0]['stats']['ns'].split('.')[0];
      this.set('stats',this.get('content'));
      this.set('isLoaded', true);
    }
    else {
      this.set('stats', null);
      this.set('isLoaded', true);
    }
    this.set('database_name',database_name);
  }.observes('content'),

  actions: {
    dropDatabase : function() {
      var self = this;
      var buttons = {
          Delete: function() {
            Mongoman.Database.drop(self.get('database_name')).then(function() {
              self.transitionToRoute('databases');
            });
            $(this).dialog("close");
          },
          Cancel: function() { $(this).dialog("close"); }
        };
      this.displayDialog("#placeholder-confirm-drop-db", buttons);
    },

    addCollection: function() {
      var self = this;
      var buttons = {
        Create: function() {
          var newCollection = self.get('newCollection');
          var database_name = self.get('database_name');
          Mongoman.Collection.createCollection(newCollection, database_name).then(function() {
            self.transitionToRoute('databases');
          });
          $(this).dialog("close");
        },
        Cancel: function() { $(this).dialog("close"); }
      };
      this.displayDialog("#newcollection-create",buttons);
    },

    copy: function() {
      var self = this;
      var buttons = {
        Copy: function() {
          self.setProperties({
            'statusText': 'Copying Collection. Just hang on...',
            'isLoaded' : false
          });
          var ns = self.get('selectedItem.content.stats.ns');
          var splits = ns.split('.'); splits.shift();
          var collectionName = splits.join('.');
          Mongoman.Collection.copy(collectionName, self.get('copyas'), self.get('database_name')).
            then(function() {
              window.location.href = '/';
          });
          $(this).dialog("close");
        },
        Cancel: function() { $(this).dialog("close");}
      };
      this.displayDialog('#collection-copy-dialog', buttons);
    },


    rename: function() {
      var self = this;
      var buttons = {
        Rename: function() {
          var newName = self.get('newName');
          var databaseName = self.get('database_name');
          var ns = self.get('selectedItem.content.stats.ns');
          var splits = ns.split('.'); splits.shift();
          var collectionName = splits.join('.');
          Mongoman.Collection.rename(collectionName, databaseName, newName).then(function(){
            window.location.href = '/';
          });
          $(this).dialog("close");
        },
        Cancel: function() { $(this).dialog("close"); }
      };
      this.displayDialog("#collection-rename-dialog",buttons);
    },

    drop: function() {
      var self = this;
      var buttons = {
        "Drop Collection": function() {
          self.setProperties({
            'statusText': 'Dropping collection',
            'isLoaded': false
          });
          var databaseName = self.get('database_name');
          var ns = self.get('selectedItem.content.stats.ns');
          var splits = ns.split('.'); splits.shift();
          var collectionName = splits.join('.');
          Mongoman.Collection.drop(databaseName, collectionName).then(function() {
            window.location.href = '/';
          });

          $(this).dialog("close");
        },

        Cancel: function() { $(this).dialog("close");}
      };
      this.displayDialog('#placeholder-confirm-drop-collection', buttons);
    }
  }
});

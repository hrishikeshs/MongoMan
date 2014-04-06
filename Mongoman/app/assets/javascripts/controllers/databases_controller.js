Mongoman.DatabasesController = Ember.ArrayController.extend(Mongoman.DialogMixin,  Mongoman.SelectedItemMixin, {
  content: null,
  copieddbName: null,
  newName: null,
  itemController: 'selectedItem',
  isLoaded: Em.computed.alias('content'),
  statusText: "Hang on...",

  // an extremely ugly hack. @todo fix this up asap.
  removeAdminDatabase: function() {
    if(this.get('content')) {
      var admindb = this.get('content.firstObject');
      if((admindb.size === 0) && (admindb.name === 'admin') && (admindb.collection_count === 0)) {
        this.get('content').shiftObject();
      }
    }
  }.observes('content.firstObject'),

  actions: {

    addDatabase: function() {
      var self = this;
      var buttons = {
        Create: function() {
          if(self.get('newDbName')) {
            self.setProperties({
              'statusText': 'Creating database... just for you',
              'isLoaded' : false
            });

            Mongoman.Database.createDatabase(self.get('newDbName')).then(function() {
              window.location.href = '/';
            });
          }
          else {
            $.flash("Please enter a valid database name.");
          }
          $(this).dialog("close");

        },

        Cancel: function() { $(this).dialog("close"); }
      };
      this.displayDialog('#newdb-create', buttons);
    },

    copy: function() {
      var self = this;
      var buttons = {
        Copy: function() {
          self.setProperties({
            'statusText': 'Copying database. Just hang on...',
            'isLoaded' : false
          });
          Mongoman.Database.copy(self.get('selectedItem').get('name'), self.get('copieddbName')).then(function() {
            window.location.href = '/';
          });
          $(this).dialog("close");
        },
        Cancel: function() { $(this).dialog("close");}
      };
      this.displayDialog('#db-copy-dialog', buttons);
    },

    /**
      These four methods are invoked via the 'action' present on the widgets.
      They all work on the 'selectedItem' which is the database that currently holds user's interest.
      @todo figure out how to do this better because the controller seems to be getting a little fat.
    */

    rename: function() {
      var self = this;
      var buttons = {
        Rename: function() {
          self.setProperties({
            'statusText': 'Renaming database...',
            'isLoaded' : false
          });
          Mongoman.Database.rename(self.get('selectedItem.name'), self.get('newName')).then(function() {
            window.location.href = '/';
          });
          $(this).dialog("close");
        },

        Cancel: function() { $(this).dialog("close");}

      };
      this.displayDialog('#db-rename-dialog', buttons);
    },

    drop: function() {
      var self = this;
      var buttons = {
        "Drop Database": function() {
          self.setProperties({
            'statusText': 'Dropping database',
            'isLoaded': false
          });
          Mongoman.Database.drop(self.get('selectedItem.name')).then(function() {
            window.location.href = '/';
          });
          $(this).dialog("close");
        },
        Cancel: function() { $(this).dialog("close");}
      };
      this.displayDialog('#placeholder-confirm-drop-db', buttons);
    }
  }

});

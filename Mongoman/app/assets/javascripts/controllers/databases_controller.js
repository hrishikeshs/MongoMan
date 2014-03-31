Mongoman.DatabasesController = Ember.ArrayController.extend(Mongoman.DialogMixin,{
  content: null,
  selectedItem: null,
  copieddbName: null,
  newName: null,
  itemController: 'database',
  isLoaded: Em.computed.alias('content'),
  statusText: "Hang on...",

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

    Rename: function() {
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
    },

    /**
    * Let only one db to be in selected state
    * at any given time.
    */
    selected: function(item) {
      if (!this.get('selectedItem')) {
        this.set('selectedItem', item);
      }
      else {
        this.get('selectedItem').send('toggleSelection');
        this.set('selectedItem', item);
      }

    },

    /**
    * When the checkbox is unchecked
    */
    deselect: function(item) {
      if (this.get('selectedItem') === item) {
        this.set('selectedItem', null);
      }
    }
  }

});

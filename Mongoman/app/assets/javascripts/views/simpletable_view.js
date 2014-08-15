(function(namespace) {
  namespace.RowView = Ember.View.extend({
  classNames: ['table-row'],
  defaultTemplate: Ember.Handlebars.compile('<tr class="table-row">{{#each cellValue in view.cellValues}}<td>{{cellValue}}</td>{{/each}}<tr>'),
  cellValues: function() {
    var content = this.get('content'),
      keys = Ember.keys(content);
      return keys.map(function(key) {
        return [content[key]];
      });
    }.property('content')
  });

  namespace.SimpleTableView = Ember.View.extend({
    tagName: 'table',
    classNames: ['table', 'table-default'],
    templateName: 'simpletable'
  });

  namespace.TableView = Ember.CollectionView.extend({
    tagName: 'tbody',
    contentBinding: 'controller.content',
    rowView: Ember.computed.alias('parentView.rowView'),
    emptyView: Ember.View.extend({
      template: Ember.Handlebars.compile("No data")
    }),

    createChildView: function(viewClass, attrs) {
      if (this.get('rowView')) {
        viewClass = this.get('rowView');
      }
      else {
        viewClass = 'row';
      }
      return this._super(viewClass, attrs);
    }
  });

  namespace.TableHeaderView = Ember.View.extend({
    tagName: 'thead',
    contentBinding: 'controller.headers',
    classNames: ['table-row'],
    defaultTemplate: Ember.Handlebars.compile('<tr>{{#each header in view.content}}<th>{{header}}</th>{{/each}}</tr>')
  });
}(Mongoman));

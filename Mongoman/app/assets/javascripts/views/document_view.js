Mongoman.DocumentView = Ember.View.extend({
	  classNames:['document'],
	  tagName: 'div',
    template: Ember.Handlebars.compile("<button class='delete-btn'{{action 'deleteDocument' view.content}}>Delete</button><button class='edit-button' {{action 'editDocument' view.content}}>Edit</button>{{parseJSONString view.content}}"),
 });
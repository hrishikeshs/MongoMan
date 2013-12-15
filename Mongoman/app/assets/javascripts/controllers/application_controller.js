Mongoman.ApplicationController = Ember.Controller.extend({
	needs:['start'],
	init: function() {
		this._super();
	},


	routeChanged: function() {
  	var loc = window.location.href;
  }
	
});
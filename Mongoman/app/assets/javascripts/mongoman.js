//= require_tree ./models
//= require_tree ./controllers
//= require_tree ./views
//= require_tree ./templates
//= require_tree ./routes
//= require_self
//= require application







var csrf_token = $('meta[name=csrf-token]').attr('content');

$.ajaxPrefilter(function(options, originalOptions, xhr) {
  if (!options.crossDomain) {
    xhr.setRequestHeader('X-CSRF-Token', csrf_token);
  }
});

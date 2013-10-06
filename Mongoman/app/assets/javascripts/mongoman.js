//= require_self
var csrf_token = $('meta[name=csrf-token]').attr('content');
$.ajaxPrefilter(function(options, originalOptions, xhr) {
  if (!options.crossDomain) {
    xhr.setRequestHeader('X-CSRF-Token', csrf_token);
  }
});

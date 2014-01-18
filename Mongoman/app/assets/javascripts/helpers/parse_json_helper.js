Ember.Handlebars.registerBoundHelper('parseJSONString', function (json) {

  function prettyPrint(json) {

    var type = typeof json;

    switch(type) {
      
      case 'string' : return '"' + json + '"'
      case 'number' : 
      case 'undefined' : 
      case 'boolean' : 
            return json;
      break;

      default:
        if (Array.isArray(json)) {
          json = json.map(prettyPrint);
          return  "[<div class='collapsible'>"  + json.join(',<br />') + "</div>]";
        }
        else {
        //none of the above so it is the object
          if (json !== null) {
            var keys = Object.keys(json)
            var htmlArray = []
            for(var i = 0, len = keys.length; i < len; i++) {
                var k = keys[i];
                var html = "<br /><div class='showhide'><strong>" + k + '</strong>' + ':  '  + "<span style='overflow:auto;'>" + prettyPrint(json[k]) + "</span></div>";
                htmlArray.push(html);
            }
            return '{' + "<div class='collapsible'>" + htmlArray.join() + '<br />' + '</div>}';
        }
        return 'null';
      }
    }
  }

  var html = prettyPrint(json)
  return new Handlebars.SafeString(html)

});
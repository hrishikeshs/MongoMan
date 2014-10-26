Ember.Handlebars.registerBoundHelper('parseJSONString', function (json) {

  function prettyPrint(json) {

    var type = typeof json;

    switch(type) {

      case 'string' :
          
          if(json.match(/^ObjectId*/)) {
            return '<span class="object-id">%@</span>'.fmt(Handlebars.Utils.escapeExpression(json));
          }
          else if(json.match(/^ISODate*/)) {
            return '<span class="iso-date">%@</span>'.fmt(Handlebars.Utils.escapeExpression(json));
          }
          else {
            json = '"' + json + '"';
            return '<span class="character-string">%@</span>'.fmt(Handlebars.Utils.escapeExpression(json));
          }
      break;

      case 'number' :
      case 'undefined' :
      case 'boolean' :
        
        return '<span>%@</span>'.fmt(json);

      default:
        if (Array.isArray(json)) {
          json = json.map(prettyPrint);
          return  "[<div class='collapsible'>"  + json.join(',<br />') + "</div>]";
        }
        else {
          //none of the above so it is the object
          if (json !== null) {
            var keys = Object.keys(json);
            var htmlArray = [];
            for(var i = 0, len = keys.length; i < len; i++) {
              var k = keys[i];
              if(k.indexOf(' ') !== -1) {
                k = '"' + k + '"';
              }
              var html = "<div class='showhide'><strong class='field-name'>"+ k + '</strong>' + ':  '  + "<span style='overflow:auto;'>" + prettyPrint(json[k]) + "</span></div>";
              htmlArray.push(html);
            }
            return '{' + "<div class='collapsible'>" + htmlArray.join(',<br />') + '</div>}';
          }
          return 'null';
        }
    }
  }

  var html = prettyPrint(json);
  return new Handlebars.SafeString(html);

});

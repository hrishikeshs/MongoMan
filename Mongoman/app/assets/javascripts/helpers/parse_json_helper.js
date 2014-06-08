Ember.Handlebars.registerBoundHelper('parseJSONString', function (json) {

  function prettyPrint(json) {

    var type = typeof json;

    switch(type) {

      case 'string' : 
        if(json.match(/^ObjectId*/)) {
          return '<span class="invisible">"</span>' + '<span class="object-id">' +
              Handlebars.Utils.escapeExpression(json) + '</span>' + '<span class="invisible">"</span>';
        }
        else if(json.match(/^ISODate*/)) {
         return '<span class="invisible">"</span>' + '<span class="iso-date"> ' +
              Handlebars.Utils.escapeExpression(json) + '</span>' + '<span class="invisible">"</span>' 
        }

        return '<span class="character-string">"' +
              Handlebars.Utils.escapeExpression(json) + '"</span>';
              

      case 'number' :
      case 'undefined' :
      case 'boolean' :

        return json;

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
                var html = "<br /><div class='showhide'><strong class='field-name'>" + k + '</strong>' + ':    '  + "<span style='overflow:auto;padding-left:10px;'>" + prettyPrint(json[k]) + "</span></div>";
                htmlArray.push(html);
            }
            return '{' + "<div class='collapsible'>" + htmlArray.join() + '<br />' + '</div>}';
        }
        return 'null';
      }
    }
  }

  var html = prettyPrint(json);
  return new Handlebars.SafeString(html);

});

(function(namespace) {
  namespace.sanitizeInput = function (jsonString) {

    function convertToStringForm(jsonString) {

      function scanUntilClosingElement(string, startElement, closingElement) {
        var buffer = "";
        var i = 0;
        var len = string.length;
        while(i < len) {
          var currentChar = string.charAt(i);
          if((currentChar === startElement) && (startElement !== closingElement)) {
            var token =  startElement + scanUntilClosingElement(string.slice(i + 1), startElement, closingElement) + closingElement;
            i += token.length;
            buffer += token;
          }
          if(currentChar === closingElement) {
            return buffer;
          }
          buffer += string.charAt(i);
          i++;
        }
        throw {error: 'Unclosed Element: ' + startElement};
      }

      var buffer = "";
      var i = 0,
          len = jsonString.length;

      //start scanning the string.
      while(i < len) {

        var currentChar = jsonString.charAt(i);
        var token = "";

        switch(currentChar)  {


          case '"':   token = scanUntilClosingElement(jsonString.slice(i+1), '"', '"');
                      i += token.length + 2;
                      buffer += '"' + convertToStringForm(token) + '"';
          break;

          case "'":   token = scanUntilClosingElement(jsonString.slice(i+1), "'", "'");
                      i += token.length + 2;
                      buffer += "'" + convertToStringForm(token) + "'";
          break;


          case '{':   token = scanUntilClosingElement(jsonString.slice(i+1), '{', '}');
                      if(jsonString.charAt(i+1) !== '}') {
                        buffer += '{"' + convertToStringForm(token) + '}';
                      }
                      else {
                       buffer += '{' + convertToStringForm(token) + '}';
                      }
                      i += token.length + 2;
          break;

          case '[':   token = scanUntilClosingElement(jsonString.slice(i+1), '[', ']');
                      i += token.length + 2;
                      buffer += '[' + convertToStringForm(token) + ']';
          break;

          case ',':   if( (jsonString.charAt(i+1) !== '{') && (jsonString.charAt(i+1) !== '[') && (jsonString.charAt(i+1) !== '"')) {
                        buffer += ',"';
                      }
                      else {
                        buffer += currentChar;
                      }
                      i++;
          break;

          case ':':   if(jsonString.charAt(i+1) === ' ') {
                        buffer =  buffer + '":';
                      }
                      else {
                        buffer += currentChar;
                      }
                      i++;
          break;



          default:    buffer += currentChar;
                      i++;

        }
      }
      return buffer;
    }

    jsonString = jsonString.replace(/ObjectId/g, '"ObjectId');
    jsonString = jsonString.replace(/ISODate/g, '"ISODate');
    jsonString = jsonString.replace(/\(\"/g, "('");
    jsonString = jsonString.replace(/\"\)/g, "')");
    jsonString = jsonString.replace(/\)/g, ')"');
    return convertToStringForm(jsonString);
  };

}(Mongoman.Utils = Mongoman.Utils || {}));
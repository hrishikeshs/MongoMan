(function(namespace) {

  namespace.sanitizeInput = function (jsonString) {

    function parse(jsonString) {

      function getStringBetweenQuotes(string) {

        var currentChar = string.charAt(0);
        var scanningChar = "";
        var len = string.length;
        var j = 0, result = "";

        if ((currentChar === '"') || (currentChar === "'")) {
          j++;
          var closingChar = currentChar;
          result = "";
          currentChar = string.charAt(j);
          while(currentChar !== closingChar) {
            result += currentChar;
            j++;
            currentChar = string.charAt(j);
          }
        }
        else {
          result = "";
        }
        return '"' + result + '"';
      }


      function parseStringBetweenBraces(string) {

        var buffer = "",
            i = 0,
            temp = "",
            len = string.length,
            j = i + 1;
            nextChar = string.charAt(j);
        while(j < len ) {

          switch(nextChar) {

            case '"':
            case "'":              temp = getStringBetweenQuotes(string.slice(j));
                                   j += temp.length;
                                   buffer += temp;
            break;


            case '{':              if(string.charAt(j + 1) !== '}') {
                                       if(string.charAt(j+1) !== '"') {
                                          buffer += '{"';
                                       }
                                       else {
                                          buffer += '{';
                                       }
                                    }
                                    else {
                                     buffer += '{';
                                    }
                                   j++;
            break;


            case ':':              if((string.charAt(j - 1) !== '"') && (string.charAt(j - 1) !== "'")) {
                                     buffer += '":';
                                    }
                                   else {
                                     buffer += ':';
                                   }
                                   j++;
            break;

            case ',':              buffer +=  ',';
                                   if((string.charAt(j + 1)  !== '{') && (string.charAt(j+1) !== '[') && ((string.charAt(j+1) !== '"') 
                                                                                                          && (string.charAt(j+1) !== "'")) ){
                                     buffer += '"';
                                    }
                                   j++;
            break;

            case '\"':
            case "\'":             buffer += '"';
                                   j += 1;

            break;
            default:               buffer += nextChar;
                                   j++;
            break;
          }
          nextChar = string.charAt(j);
        }
        return buffer ;
      }
      jsonString = jsonString.replace(/ObjectId/g, '"ObjectId');
      jsonString = jsonString.replace(/ISODate/g, '"ISODate');
      jsonString = jsonString.replace(/\(\"/g, "('");
      jsonString = jsonString.replace(/\"\)/g, "')");
      jsonString = jsonString.replace(/\)/g, ')"');
      var result = parseStringBetweenBraces(jsonString);
      if(result.charAt(0) !== '"') {
        result = '{"' + result;
      }
      else {
        result = '{' + result;
      }
      return result;
    }
    return parse(jsonString);
  };
}(Mongoman.Utils = Mongoman.Utils || {}));

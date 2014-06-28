(function(namespace) {
  namespace.sanitizeInput = function (jsonString) {
    var buffer = '';
    var currentChar = "";
    var previousChar = "";
    var correctionCharacter = "";
    var i = 0;
    var j = jsonString.length;
    while(i < j) {
      currentChar = jsonString[i];
      while((i < j) && (currentChar === '"') || (currentChar === "'")) {
        buffer += currentChar;
        i += 1;
        currentChar = jsonString[i];
      }
      while((i < j) && ((currentChar === '\n') || (currentChar === '\t') || (currentChar === ' '))) {
        i += 1;
        currentChar = jsonString[i];
      }

      buffer += currentChar;
      i += 1;
    }

    buffer = buffer.replace(/ObjectId/g, '"ObjectId');
    buffer = buffer.replace(/ISODate/g, '"ISODate');
    buffer = buffer.replace(/\(\"/g, "('");
    buffer = buffer.replace(/\"\)/g, "')");
    buffer = buffer.replace(/\)/g, ')"');

    i = 0;
    j = buffer.length;
    var sanitizedStr = "";
    currentChar = "";
    while(i < j) {
      previousChar = currentChar;
      currentChar = buffer[i];
      if(((previousChar === '{') || (previousChar === ',')) && (currentChar !== '}') ) {
        sanitizedStr += '"';
        while((currentChar !== ']') && (currentChar !== ':')) {
          sanitizedStr += currentChar;
          i += 1;
          previousChar = currentChar;
          currentChar = buffer[i];
        }
      sanitizedStr += '"';
      }
      
      sanitizedStr += currentChar;
      i += 1;
    }
    sanitizedStr = sanitizedStr.replace(/:\s+/,':');
    return sanitizedStr.replace(/\"\"/g, '"');
  }
}(Mongoman.Utils = Mongoman.Utils || {}));
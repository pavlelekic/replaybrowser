(function() {
"use strict";

  module.exports = function cssPathExtended(cssPath) { 
    return function(element) {
      if (element === window) return "window";
      else if (element === document) return "document";
      else return cssPath(element);      
    };
  };
})();

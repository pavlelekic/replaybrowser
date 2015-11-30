/*jshint -W087 */
var rpl = rpl || {};

(function(namespace) {
  "use strict";

  namespace.cssPathExtended = function cssPathExtended(cssPath) { 
    return function(element) {
      if (element === window) return "window";
      else if (element === document) return "document";
      else return cssPath(element);      
    };
  };
})(rpl);
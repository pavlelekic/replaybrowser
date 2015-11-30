/*jshint -W087 */
var rpl = rpl || {};

(function(namespace) {
  "use strict";

  describe("cssPath function", function() {
    var cssPathExtended = namespace.make.cssPath();

    it("should return 'window' when passed window object", function() {
      expect(cssPathExtended(window)).toEqual("window");
    });
    
    it("should return 'document' when passed document object", function() {
      expect(cssPathExtended(window.document)).toEqual("document");
    });
  });
}(rpl));

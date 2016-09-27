(function() {
"use strict";

  var make = module.exports = {};

  make.cssPathExtended = function () {
    if (typeof namespace.cssPath === "undefined") 
      throw new Error("Cannot find cssPath() function inside the namespace.");

    return namespace.cssPathExtended(namespace.cssPath);
  }; 

  make.recorder = function () {
    return new namespace.Recorder(this.cssPath());
  };

  make.player = function () {
    var t = new namespace.Trigger();
    return new namespace.Player(t); 
  };  
  /*
  make.bookmarklet = function () {
    var r = this.recorder();
    var p = this.player();    
    return new namespace.Bookmarklet(r, p); 
  };
  */
})();

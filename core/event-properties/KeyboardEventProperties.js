var rpl = rpl || {};

(function(namespace) {
  "use strict";

  namespace.KeyboardEventProperties = function (event) { 
    namespace.UIEventProperties.call(this, event);
    this.key = event.key;
    this.code = event.code;
    this.location = event.location;
    this.ctrlKey = event.ctrlKey;
    this.shiftKey = event.shiftKey;
    this.altKey = event.altKey;
    this.metaKey = event.metaKey;
    this.repeat = event.repeat;
    this.isComposing = event.isComposing;
    this.charCode = event.charCode;
    this.keyCode = event.keyCode;
    this.which = event.which;
  };
})(rpl);
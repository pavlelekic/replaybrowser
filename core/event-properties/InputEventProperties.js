var rpl = rpl || {};

(function(namespace) {
  "use strict";

  namespace.InputEventProperties = function (event) { 
    namespace.UIEventProperties.call(this, event);
    this.isComposing = event.isComposing;
  };
})(rpl);
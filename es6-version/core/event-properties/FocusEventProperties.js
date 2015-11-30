var rpl = rpl || {};

(function(namespace) {
  "use strict";

  namespace.FocusEventProperties = function (event) { 
    namespace.UIEventProperties.call(this, event);
    this.relatedTarget = event.relatedTarget;
  };
})(rpl);
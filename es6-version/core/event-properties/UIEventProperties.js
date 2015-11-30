var rpl = rpl || {};

(function(namespace) {
  "use strict";

  namespace.UIEventProperties = function (event) { 
    namespace.EventProperties.call(this, event);
    this.detail = event.detail;
    this.view = event.view;
  };
})(rpl);

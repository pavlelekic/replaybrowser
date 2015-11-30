var rpl = rpl || {};

(function(namespace) {
  "use strict";

  namespace.MouseEventProperties = function (event) { 
    namespace.UIEventProperties.call(this, event);
    this.screenX = event.screenX;
    this.screenY = event.screenY;
    this.clientX = event.clientX;
    this.clientY = event.clientY;
    this.ctrlKey = event.ctrlKey;
    this.shiftKey = event.shiftKey;
    this.altKey = event.altKey;
    this.metaKey = event.metaKey;
    this.button = event.button;
    this.buttons = event.buttons;
    this.relatedTarget = event.relatedTarget;
    this.region = event.region;
  };
})(rpl);
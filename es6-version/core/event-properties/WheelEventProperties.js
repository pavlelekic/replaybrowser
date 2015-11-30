var rpl = rpl || {};

(function(namespace) {
  "use strict";

  namespace.WheelEventProperties = function (event) { 
    namespace.MouseEventProperties.call(this, event);
    this.deltaX = event.deltaX;
    this.deltaY = event.deltaY;
    this.deltaZ = event.deltaZ;
    this.deltaMode = event.deltaMode;
  };
})(rpl);
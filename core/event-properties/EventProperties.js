var rpl = rpl || {};

(function(namespace) {
  "use strict";

  var EventProperties = namespace.EventProperties = function (event) { 
    this.type = event.type;
    this.bubbles = event.bubbles;
    this.cancelable = event.cancelable;
    this.timestamp = event.timeStamp;
    this.target = event.target;
  };
})(rpl);
/*jshint -W087 */
var rpl = rpl || {};

(function(namespace) {
  "use strict";

  // TO DO: TouchEvents

  var eventPropertiesFactory = namespace.eventPropertiesFactory = function (event) { 
  	if (isMouseEvent(event)) return new MouseEventProperties(event);
  	else if (isKeyboardEvent(event)) return new KeyboardEventProperties(event);
  	else if (isScrollEvent(event)) return new WheelEventProperties(event);
  	else if (isFocusEvent(event)) return new FocusEventProperties(event);
  	else if (isInputEvent(event)) return new InputEventProperties(event);
  	else if (isChangeEvent(event)) return new EventProperties(event);

  	throw new Error(event.type + " events are not supported."); 
  };

  // helper functions
  
  function isInputEvent(event) {
    return event.type === "input";
  }

  function isChangeEvent(event) {
    return event.type === "change";
  }

  var isMouseEvent = makeIsEventTypeFn(["mousemove", "mousedown", "mouseup", "click", "dblclick", "mouseover", "mouseenter", "mouseleave", "mouseout", "contextmenu", "show"]);
  var isKeyboardEvent = makeIsEventTypeFn(["keydown", "keyup", "keypress"]);
  var isScrollEvent = makeIsEventTypeFn(["wheel", "mousewheel", "scroll"]);
  var isFocusEvent = makeIsEventTypeFn(["blur", "focus", "focusin", "focusout"]);

  function makeIsEventTypeFn(eventsArr) {
    return function (event) {
      return eventsArr.indexOf(event.type) === -1 ? false : true;
    };
  }
})(rpl);
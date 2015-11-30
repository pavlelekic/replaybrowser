"use strict";

export default function Recorder(cssPath) {
  this.attachments = [];
  this.recordings = [];
  this.cssPath = cssPath;  
  this.eventListenerFn = this._eventListenerFn.bind(this);  
};

Recorder.mouseEvents = ["mousemove", "mousedown", "mouseup", "click", "dblclick", "mouseover", "mouseenter", "mouseleave", "mouseout"];
Recorder.scrollEvents = ["wheel", "mousewheel", "scroll"];
Recorder.keyboardEvents = ["keydown", "keyup", "keypress"];
Recorder.catchInCapturingPhase = true;

Recorder.MouseProperties = function (event, targetCssPath, relatedTargetCssPath) {
  this.type = event.type;
  this.timestamp = event.timeStamp;
  this.altKey = event.altKey;
  this.button = event.button;
  this.clientX = event.clientX;
  this.clientY = event.clientY;
  this.ctrlKey = event.ctrlKey;
  this.target = targetCssPath; // element on which the event occurred.
  this.detail = event.detail;
  //this.keyCode = event.keyCode;
  this.metaKey = event.metaKey;
  //this.which = event.which;
  this.shiftKey = event.shiftKey;
  this.screenX = event.screenX;
  this.screenY = event.screenY;
  this.relatedTarget = relatedTargetCssPath;// that is the element just left (in case of  a mouseenter or mouseover) or is entering (in case of a mouseout or mouseleave). 
};  

Recorder.prototype._isMouseEvent = function(event) {
  return Recorder.mouseEvents.indexOf(event) === -1 ? false : true;
};

Recorder.prototype._isKeyboardEvent = function(event) {
  return Recorder.keyboardEvents.indexOf(event) === -1 ? false : true;
};

Recorder.prototype._isScrollEvent = function(event) {
  return Recorder.scrollEvents.indexOf(event) === -1 ? false : true;
};

Recorder.prototype._getRelatedTargetCssPath = function(relatedTarget) {
  return relatedTarget ? this.cssPath(relatedTarget) : undefined;
};

Recorder.prototype._createMouseEventPropertiesObj = function(event) {
  var targetCssPath = this.cssPath(event.target); 
  var relatedTargetCssPath = this._getRelatedTargetCssPath(event.relatedTarget);

  return new Recorder.MouseProperties(event, targetCssPath, relatedTargetCssPath);
};

Recorder.prototype._createKeyboardEventPropertiesObj = function(event) {
  //event = new KeyboardEvent(typeArg, KeyboardEventInit);    
  /*
"key", optional and defaulting to "", of type DOMString, that sets the value of KeyboardEvent.key.
"code", optional and defaulting to "", of type DOMString, that sets the value of KeyboardEvent.code.
"location", optional and defaulting to 0, of type unsigned long, that sets the value of KeyboardEvent.location.
"ctrlKey", optional and defaulting to false, of type Boolean, that sets the value of KeyboardEvent.ctrlKey.
"shiftKey", optional and defaulting to false, of type Boolean, that sets the value of KeyboardEvent.shiftKey.
"altKey", optional and defaulting to false, of type Boolean, that sets the value of KeyboardEvent.altKey.
"metaKey", optional and defaulting to false, of type Boolean, that sets the value of KeyboardEvent.metaKey.
"repeat", optional and defaulting to false, of type Boolean, that sets the value of KeyboardEvent.repeat.
"isComposing", optional and defaulting to false, of type Boolean, that sets the value of KeyboardEvent.isComposing.
"charCode", optional and defaulting to 0, of type unsigned long, that sets the value of the deprecated KeyboardEvent.charCode.
"keyCode", optional and defaulting to 0, of type unsigned long, that sets the value of the deprecated KeyboardEvent.keyCode.
"which", optional and defaulting to 0, of type unsigned long, that sets the value of the deprecated KeyboardEvent.which.


"detail", optional and defaulting to 0, of type long, that is a event-dependant value associated with the event. UIEvent.detail lists the semantic for standard events.
"view", optional and defaulting to null, of type WindowProxy, that is the Window associated with the event .

"bubbles", optional and defaulting to false, of type Boolean, indicating if the event bubbles or not.
"cancelable", optional and defaulting to false, of type Boolean, indicating if the event can be canceled or not.

  */
};  

Recorder.prototype._createRecord = function(event) {
  var propertiesObj;

  if (this._isMouseEvent(event.type)) {
    propertiesObj = this._createMouseEventPropertiesObj(event); 
  }
  else if (this._isKeyboardEvent(event.type)) {
    debugger;
    propertiesObj = this._createKeyboardEventPropertiesObj(event);
  }
  else if (this._isScrollEvent(event.type)) {
    debugger;
    propertiesObj = this._createWheelEventPropertiesObj(event);
  }
  else {
    throw new Error("Unknown event type: " + event.type);
  }    

  return propertiesObj;
};

Recorder.prototype._createWheelEventPropertiesObj = function(event) {
  var targetCssPath = this.cssPath(event.target); 
  var relatedTargetCssPath = this._getRelatedTargetCssPath(event.relatedTarget);

  return new Recorder.WheelProperties(event, targetCssPath, relatedTargetCssPath);
};

Recorder.WheelProperties = function (event, targetCssPath, relatedTargetCssPath) {
  this.type = event.type;
  this.deltaMode = event.deltaMode;
  this.deltaX = event.deltaX;
  this.deltaY = event.deltaY;
  this.deltaZ = event.deltaZ;
  this.cancelable = event.cancelable;
  this.bubbles = event.bubbles;
  this.button = event.button;
  this.screenX = event.screenX;
  this.altKey = event.altKey;
  this.shiftKey = event.shiftKey;
  this.metaKey = event.metaKey;
  this.ctrlKey = event.ctrlKey;        
  this.screenY = event.screenY;
  this.clientX = event.clientX;
  this.clientY = event.clientY;        
  this.target = targetCssPath; // element on which the event occurred.
  this.relatedTarget = relatedTargetCssPath; // that is the element just left (in case of  a mouseenter or mouseover) or is entering (in case of a mouseout or mouseleave). 
};  

Recorder.prototype._eventListenerFn = function(event) {
  var record = this._createRecord(event);
  this.recordings.push(record);
};

Recorder.prototype.listen = function(element, events) {
  // TODO: check if you already added listeners to the same element and event
  this.attachments.push({
    element: element,
    events: events
  });

  this._attachEventListeners(element, events);
};

Recorder.prototype._attachEventListeners = function(element, events) {
  for (var i = events.length - 1; i >= 0; i--) 
    element.addEventListener(events[i], this.eventListenerFn, Recorder.catchInCapturingPhase);
};

Recorder.prototype.detachAllEventListeners = function() {
  this._removeEventListeners(this._element);
  return this.recordings;
};

Recorder.prototype._removeEventListeners = function(element) {
  var attachment;

  while(this.attachments.length) {
    attachment = this.attachments.pop();

    for (var i = attachment.events.length - 1; i >= 0; i--) {
      attachment.element.removeEventListener(attachment.events[i], this.eventListenerFn, Recorder.catchInCapturingPhase);
    }
  }
};

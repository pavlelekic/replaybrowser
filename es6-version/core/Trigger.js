"use strict";

export default function Trigger() {};

Trigger.prototype.triggerMouseEvent = function(eventProperties) { 
  var target = this._findElement(eventProperties.target);
  var relatedTarget = this._findRelatedTarget(eventProperties.relatedTarget);
  if (target) this._dispatchMouseEvent(eventProperties, target, relatedTarget);
};

Trigger.prototype.triggerWheelEvent = function(eventProperties) {  
  var target = this._findElement(eventProperties.target);
  var relatedTarget = this._findRelatedTarget(eventProperties.relatedTarget);
  if (target) this._dispatchWheelEvent(eventProperties, target, relatedTarget);
};

Trigger.prototype._findRelatedTarget = function(relatedTarget) {  
  return relatedTarget ? this._findElement(relatedTarget) : null;
};  

Trigger.prototype._dispatchMouseEvent = function(eventProperties, target, relatedTarget) {
  var event = this._createMouseEventObj(eventProperties, relatedTarget);
  target.dispatchEvent(event);
};

Trigger.prototype._findElement = function(selector) {
  if (selector === "window") return window;
  else if (selector === "document") return window.document;
  else return this._findHtmlElement(selector);
};

Trigger.prototype._cannotFindElement = function(selector) {
  console.log("Cannot find element with selector '" + selector + "'.");
};

Trigger.prototype._findHtmlElement = function(selector) {
  var el = document.querySelector(selector);
  if (el === null) this._cannotFindElement(selector);
  return el;        
};

Trigger.prototype._createWheelEventObj = function(eventProperties, relatedTarget) {
  var prop = Object.create(eventProperties);
  prop.relatedTarget = relatedTarget;
  return new WheelEvent(prop.type, prop); 
};

Trigger.prototype._dispatchWheelEvent = function(eventProperties, target, relatedTarget) {
  var event = this._createWheelEventObj(eventProperties, relatedTarget);
  //console.log("Executing " + eventProperties.type + " on " + eventProperties.target);
  target.dispatchEvent(event);
};

Trigger.prototype._createMouseEventObj = function(eventProperties, relatedTarget) {
  var mouseEvent = document.createEvent("MouseEvents");

  mouseEvent.initMouseEvent(
    eventProperties.type,
    true, //canBubble
    true, //cancelable
    window, //event's AbstractView : should be window 
    eventProperties.detail, // Event's mouse click count 
    eventProperties.screenX,
    eventProperties.screenY,
    eventProperties.clientX,
    eventProperties.clientY,
    eventProperties.ctrlKey,
    eventProperties.altKey,
    eventProperties.shiftKey,
    eventProperties.metaKey, 
    eventProperties.button, // 0 = click, 1 = middle button, 2 = right button  
    relatedTarget // Only used with some event types (e.g. mouseover and mouseout). In other cases, pass null.
  );

  return mouseEvent;
};

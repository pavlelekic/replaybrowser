"use strict";

export default function EventProperties(event) { 
  this.type = event.type;
  this.bubbles = event.bubbles;
  this.cancelable = event.cancelable;
  this.timestamp = event.timeStamp;
  this.target = event.target;
};

"use strict";

export default function Player(trigger) { 
  this._trigger = trigger; 
  this._recordings = [];
  this._index = undefined;
  this._lastTimeoutID = undefined;
};

Player.prototype.play = function(recordings) {
  if (recordings.length > 0) {
    this._recordings = recordings;
    this._index = -1;
    this._fireEventFn();
  }
};

Player.prototype.stop = function() {
  window.clearTimeout(this._lastTimeoutID);
  this._recordings = [];
  this._index = -1;
};

Player.prototype._fireEventFn = function() {
  this._index++;
  var record = this._recordings[this._index];

  if (this._recordings[this._index + 1]) this._scheduleNextEventToTrigger();

  this._trigger.triggerMouseEvent(record);
}; 

Player.prototype._scheduleNextEventToTrigger = function() {
  var delay = this._recordings[this._index + 1].timestamp - this._recordings[this._index].timestamp;   
  this._lastTimeoutID = setTimeout(this._fireEventFn.bind(this), delay);    
};

var rpl = rpl || {};

(function(namespace) {
  "use strict";
  
  var Bookmarklet = namespace.Bookmarklet = function(recorder, player) {
    this._recorder = recorder;
    this._player = player;
  };

  Bookmarklet.allMouseEvents = ["contextmenu", "mousemove", "mousedown", "mouseup", "click", "dblclick", "mouseover", "mouseenter", "mouseleave", "mouseout"];
  Bookmarklet.allScrollEvents = ["wheel", "mousewheel", "scroll"];

  Bookmarklet.prototype.startRecording = function() {
    this._recorder.listen(window, Bookmarklet.allMouseEvents);
    this._recorder.listen(window, Bookmarklet.allScrollEvents);    
  };

  Bookmarklet.prototype.stopRecording = function() {
    var recordings = this._recorder.detachAllEventListeners();
    this._resetState();
    this._tryToSaveRecordings(recordings);
  };

  Bookmarklet.prototype._resetState = function() {
    this._recorder.recordings = [];
  };

  Bookmarklet.prototype._tryToSaveRecordings = function(recordings) {
    if (this.isLocalStorageSupported()) {
      this._saveRecordings(recordings);
    }
    else {
      this._tellTheUserThatHeCannotSaveRecordings();
    }    
  };

  Bookmarklet.prototype._saveRecordings = function(recordings) {
    var recordingsAsString = JSON.stringify(recordings);
    localStorage.setItem("lastRecording", recordingsAsString);    
  };

  Bookmarklet.prototype.replayLastRecording = function() {
    if (this.isLocalStorageSupported()) {
      this._playLastRecording();
    }
    else {
      this._tellTheUserThatHeCannotLoadRecordings();
    }     
  };

  Bookmarklet.prototype._playLastRecording = function() {
    var recordingsAsString = localStorage.getItem("lastRecording");
    var records = JSON.parse(recordingsAsString);
    this._player.play(records);    
  };

  Bookmarklet.prototype.isThereLastRecording = function() {
    return localStorage.getItem("lastRecording") ? true : false;
  };

  Bookmarklet.prototype.isLocalStorageSupported = function() {
    try {
      return 'localStorage' in window && window.localStorage !== null;
    } catch (e) {
      return false;
    }
  };

  Bookmarklet.prototype._tellTheUserThatHeCannotLoadRecordings = function() {
    throw new Error("Your browser doesn't support localStorage, therefore you don't have any previously saved recordings.");
  };

  Bookmarklet.prototype._tellTheUserThatHeCannotSaveRecordings = function() {
    throw new Error("Your browser doesn't support localStorage, therefore you cannot save recordings.");
  };

})(rpl);




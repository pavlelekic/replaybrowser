/*jshint -W087 */

var rpl = rpl || {};

(function(namespace) {
  "use strict";

  var UI = namespace.UI = function(bookmarklet) {
    this.bookmarklet = bookmarklet;
    this.container = undefined;

    if (!this.bookmarklet.isLocalStorageSupported()) 
      alert("Your browser doesn't support localStorage. This bookmarklet cannot work without localStorage.");
  };

  UI.prototype.display = function() {   
    if (this.container) this.container.style.display = "inline";
    else this._initializeContainer();
  };

  UI.prototype._initializeContainer = function() {
    var buttons = this._createButtons();
    this.container = this._createContainer(buttons);   
    document.body.appendChild(this.container); 
  };

  UI.prototype._createButtons = function() {
    var buttons = this._createButtonDomElements();
    this._setInitialButtonsState(buttons);
    this._attachEventListenersToButtons(buttons);
    
    return buttons;
  };

  UI.prototype._setInitialButtonsState = function(buttons) {
    buttons.stop.setAttribute("disabled", true);
    if (!this.bookmarklet.isThereLastRecording()) buttons.replay.setAttribute("disabled", true);    
  };

  UI.prototype._createButtonDomElements = function() {
    return {
      "start": this._createButton("Start recording"),
      "stop": this._createButton("Stop recording"),
      "replay": this._createButton("Replay last recording")
    };
  };

  UI.prototype._attachEventListenersToButtons = function(buttons) {
    this._attachStartButtonEventListener(buttons);
    this._attachStopButtonEventListener(buttons);
    this._attachReplayButtonEventListener(buttons);  
  };

  UI.prototype._attachReplayButtonEventListener = function(buttons) {
    var self = this;

    buttons.replay.addEventListener("click", function() {
      self.bookmarklet.replayLastRecording();
    }, true);
  };

  UI.prototype._attachStartButtonEventListener = function(buttons) {
    var self = this;

    buttons.start.addEventListener("click", function() {
      buttons.stop.removeAttribute("disabled");
      buttons.start.setAttribute("disabled", true);
      self.bookmarklet.startRecording();
    }, true);
  };

  UI.prototype._attachStopButtonEventListener = function(buttons) {
    var self = this;

    buttons.stop.addEventListener("click", function() {
      buttons.stop.setAttribute("disabled", true);
      buttons.start.removeAttribute("disabled");
      buttons.replay.removeAttribute("disabled");
      self.bookmarklet.stopRecording();
    }, true);
  };

  UI.prototype._createContainer = function(buttons) {
    var container = document.createElement("span");
    this._setContainerStyles(container);
    // TO DO: add dragable bar on the top
    this._appendButtonsToContainer(buttons, container);
        
    return container;
  };

  UI.prototype._appendButtonsToContainer = function(buttons, container) {
    container.appendChild(buttons.start);
    container.appendChild(buttons.stop);
    container.appendChild(buttons.replay);    
  };

  UI.prototype._setContainerStyles = function(container) {
    container.style.padding = "10px";
    container.style.backgroundColor = "#000000";
    container.style.bottom = "10px";
    container.style.right = "10px";
    container.style.position = "fixed";
    container.style.zIndex = 4000;    
    container.style.whiteSpace = "nowrap";    
  };

  UI.prototype._createButton = function(text) {
    var button = document.createElement("input");
    button.setAttribute("type", "button");   
    button.setAttribute("value", text);

    return button;
  };

  UI.prototype.hide = function() {   
    this.container.style.display = "none";
  };
}(rpl));
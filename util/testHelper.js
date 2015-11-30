/*jshint -W087 */
var rpl = rpl || {};

(function(namespace) {
  "use strict";

  var testHelper = namespace.testHelper = {};

  testHelper.once = function(event, element, handlerFn, capturingPhase) {
    capturingPhase = capturingPhase || true;
    
    var oneTimeHandler = function(e) {
      element.removeEventListener(event, oneTimeHandler, capturingPhase);      
      handlerFn(e);
    };

    element.addEventListener(event, oneTimeHandler, capturingPhase);
  };

  testHelper.findElementByID = function (id) {
    var el = document.getElementById(id);

    if (el === null) throw new Error("Cannot find #" + id + " element!");  
     
    return el;  
  };

  testHelper.createDomElement = function(element, id) {
    var el = document.createElement(element);
    el.setAttribute("id", id);
    return el;
  };

  // TestEventProperties class
  testHelper.TestEventProperties = function() {
  };
  
  testHelper.TestEventProperties.prototype.get = function(type, targetSelector, relatedTargetSelector) {
    var event = Object.create(this._testEvents[type]);//this._object(this._testEvents[type]);
    event.target = targetSelector;
    event.relatedTarget = relatedTargetSelector;
    return event;
  };

  testHelper.TestEventProperties.prototype._testEvents = {
    "mousemove": {
      "type":"mousemove",
      "altKey":false,
      "button":0,
      "clientX":205,
      "clientY":67,
      "ctrlKey":false,
      "timestamp": 0,
      "target":"#inner",
      "detail":0,
      "keyCode":0,
      "metaKey":false,
      "which":0,
      "shiftKey":false,
      "screenX":2125,
      "screenY":152,
      "relatedTarget": null      
    },
    "mouseover": {
      "type": "mouseover",
      "timestamp": 0,
      "altKey": false,
      "button": 0,
      "clientX": 415,
      "clientY": 140,
      "ctrlKey": false,
      "target": "#inner",
      "detail": 0,
      "metaKey": false,
      "shiftKey": false,
      "screenX": 519,
      "screenY": 350,
      "relatedTarget": null     
    },
    "mouseout": {
      "type": "mouseout",
      "timestamp": 0,
      "altKey": false,
      "button": 0,
      "clientX": 416,
      "clientY": 142,
      "ctrlKey": false,
      "target": "#inner",
      "detail": 0,
      "metaKey": false,
      "shiftKey": false,
      "screenX": 520,
      "screenY": 352,
      "relatedTarget": null   
    },
    "click": {
      "type": "click",
      "timestamp": 0,
      "altKey": false,
      "button": 0,
      "clientX": 414,
      "clientY": 210,
      "ctrlKey": false,
      "target": "#inner",
      "detail": 1,
      "metaKey": false,
      "shiftKey": false,
      "screenX": 518,
      "screenY": 350,
      "relatedTarget": null  
    },
    "dblclick": {
      "type": "dblclick",
      "timestamp": 0,
      "altKey": false,
      "button": 0,
      "clientX": 414,
      "clientY": 210,
      "ctrlKey": false,
      "target": "#inner",
      "detail": 1,
      "metaKey": false,
      "shiftKey": false,
      "screenX": 518,
      "screenY": 350,
      "relatedTarget": null  
    },    
    "mouseup": {
      "type": "mouseup",
      "timestamp": 0,
      "altKey": false,
      "button": 0,
      "clientX": 414,
      "clientY": 210,
      "ctrlKey": false,
      "target": "#inner",
      "detail": 1,
      "metaKey": false,
      "shiftKey": false,
      "screenX": 518,
      "screenY": 350,
      "relatedTarget": null   
    },
    "mousedown": {
      "type": "mousedown",
      "timestamp": 0,
      "altKey": false,
      "button": 0,
      "clientX": 414,
      "clientY": 210,
      "ctrlKey": false,
      "target": "#inner",
      "detail": 1,
      "metaKey": false,
      "shiftKey": false,
      "screenX": 518,
      "screenY": 350,
      "relatedTarget": null    
    }
  };

  // Assert class
  testHelper.Assert = function(cssPath) {
    this.cssPath = cssPath;
  };
  
  testHelper.Assert.prototype.eventsAreEqual = function(event, propertiesObj) {
    expect(event.altKey).toEqual(propertiesObj.altKey);
    expect(event.type).toEqual(propertiesObj.type);
    expect(event.button).toEqual(propertiesObj.button);
    expect(event.clientX).toEqual(propertiesObj.clientX);
    expect(event.clientY).toEqual(propertiesObj.clientY);
    expect(event.ctrlKey).toEqual(propertiesObj.ctrlKey);
    expect(event.shiftKey).toEqual(propertiesObj.shiftKey);
    expect(event.metaKey).toEqual(propertiesObj.metaKey);
    expect(event.detail).toEqual(propertiesObj.detail);
    expect(event.screenX).toEqual(propertiesObj.screenX);
    expect(event.screenY).toEqual(propertiesObj.screenY);

    var targetSelector = (typeof event.target === "string") ? event.target : this.cssPath(event.target);
    expect(targetSelector).toEqual(propertiesObj.target);

    if (event.relatedTarget || propertiesObj.relatedTarget) {
      var relatedTargetSelector = (typeof event.relatedTarget === "string") ? event.relatedTarget : this.cssPath(event.relatedTarget);
      expect(relatedTargetSelector).toEqual(propertiesObj.relatedTarget);
    }  
  };
}(rpl));

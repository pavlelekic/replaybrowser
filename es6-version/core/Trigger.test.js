/*jshint -W087 */
var rpl = rpl || {};

(function(namespace) {
  "use strict";
/*
  {
    "type": "wheel",
    "deltaMode": 0,
    "deltaX": 0,
    "deltaY": 53,
    "deltaZ": 0,
    "cancelable": true,
    "bubbles": true,
    "button": 0,
    "screenX": 254,
    "altKey": false,
    "shiftKey": false,
    "metaKey": false,
    "ctrlKey": false,
    "screenY": 627,
    "clientX": 164,
    "clientY": 412,
    "target": "#startRecordingButton"
  },
  {
    "type": "wheel",
    "deltaMode": 0,
    "deltaX": 0,
    "deltaY": 159,
    "deltaZ": 0,
    "cancelable": true,
    "bubbles": true,
    "button": 0,
    "screenX": 254,
    "altKey": false,
    "shiftKey": false,
    "metaKey": false,
    "ctrlKey": false,
    "screenY": 627,
    "clientX": 164,
    "clientY": 412,
    "target": "#startRecordingButton"
  },

*/
  var th = rpl.testHelper;
  var prop = new th.TestEventProperties();
  var t = new namespace.Trigger();
  var assert = new th.Assert(namespace.make.cssPath()); 
    
  describe("Trigger class:", function() { 
  
    describe("triggerMouseEvent() function", function() {
      var outerDiv = th.createDomElement("div", "outer");
      var innerDiv = th.createDomElement("div", "inner");
      var outer;       
      var click = prop.get("click", "#inner");
      var mousemove = prop.get("mousemove", "#inner");
      var mouseover = prop.get("mouseover", "#inner");
      var mouseout = prop.get("mouseout", "#inner");
     
      beforeAll(function() {
        outerDiv.appendChild(innerDiv);
        document.body.appendChild(outerDiv);
        innerDiv = th.findElementByID("inner");
        outer = th.findElementByID("outer"); 
      });

      afterAll(function() {
        document.body.removeChild(outerDiv);
      });

      it("should produce events that can be captured in capturing phase", function(done) {
        th.once("mousemove", outer, done, true);
        t.triggerMouseEvent(mousemove);        
      });

      it("should produce events that can be captured in bubbling phase", function(done) {
        th.once("mousemove", outer, done, false);
        t.triggerMouseEvent(mousemove);        
      });      

      it("should produce events that are the same as the source event used for triggering", function(done) {
        th.once("mousemove", outer, function(e){
          assert.eventsAreEqual(e, mousemove);
          done();
        }, true);

        t.triggerMouseEvent(mousemove);        
      });

      it("should produce mousemove event that is catchable on the target in capturing phase", function(done) {
        th.once("mousemove", innerDiv, done, true);
        t.triggerMouseEvent(mousemove);        
      });

      it("should produce mousemove event that is catchable on the target in bubbling up phase", function(done) {
        th.once("mousemove", innerDiv, done, false);
        t.triggerMouseEvent(mousemove);        
      });

      it("should produce mousemove event that is catchable on the window obj in capturing phase", function(done) {
          th.once("mousemove", window, done, true);
          t.triggerMouseEvent(mousemove);        
      });

      it("should produce mousemove event that is catchable on the window obj in bubbling up phase", function(done) {
          th.once("mousemove", window, done, false);
          t.triggerMouseEvent(mousemove);        
      });

      it("should produce click event correctly", function(done) {
        th.once("click", outer, function(e){
          assert.eventsAreEqual(e, click);
          done();
        }, true);

        t.triggerMouseEvent(click);        
      });      

      it("should produce mouseover event correctly", function(done) {
          th.once("mouseover", outer, function(e){
            assert.eventsAreEqual(e, mouseover);
            done();
          }, true);

          t.triggerMouseEvent(mouseover, innerDiv);        
      });   

      it("should produce mouseout event correctly", function(done) {
          th.once("mouseout", outer, function(e){
            assert.eventsAreEqual(e, mouseout);
            done();
          }, true);

          t.triggerMouseEvent(mouseout);        
      });     

      // TO DO: test mouseover, mouseout events with relatedTarget element 
      var innerDivSelector = "#inner";
      it("capturing click event on the window obj should work in capturing phase", testEventInTheCapturingPhase("click", innerDivSelector, window));
      it("capturing dblclick event on the window obj should work in capturing phase", testEventInTheCapturingPhase("dblclick", innerDivSelector, window));     
      it("capturing mouseup event on the window obj should work in capturing phase", testEventInTheCapturingPhase("mouseup", innerDivSelector, window));       
      it("capturing mousedown event on the window obj should work in capturing phase", testEventInTheCapturingPhase("mousedown", innerDivSelector, window));       
      //it("capturing mouseenter event on the window obj should work in capturing phase", testEventInTheCapturingPhase("mouseenter", innerDivSelector, window));       
      //it("capturing mouseleave event on the window obj should work in capturing phase", testEventInTheCapturingPhase("mouseleave", innerDivSelector, window));       
      it("capturing mouseover event on the window obj should work in capturing phase", testEventInTheCapturingPhase("mouseover", innerDivSelector, window));       
      it("capturing mouseout event on the window obj should work in capturing phase", testEventInTheCapturingPhase("mouseout", innerDivSelector, window));       

      it("capturing click event on the window obj should work in bubbling up phase", testEventInTheCapturingPhase("click", innerDivSelector, window));
      it("capturing dblclick event on the window obj should work in bubbling up phase", testEventInTheCapturingPhase("dblclick", innerDivSelector, window));     
      it("capturing mouseup event on the window obj should work in bubbling up phase", testEventInTheCapturingPhase("mouseup", innerDivSelector, window));       
      it("capturing mousedown event on the window obj should work in bubbling up phase", testEventInTheCapturingPhase("mousedown", innerDivSelector, window));       
      //it("capturing mouseenter event on the window obj should work in bubbling up phase", testEventInTheCapturingPhase("mouseenter", innerDivSelector, window));       
      //it("capturing mouseleave event on the window obj should work in bubbling up phase", testEventInTheCapturingPhase("mouseleave", innerDivSelector, window));       
      it("capturing mouseover event on the window obj should work in bubbling up phase", testEventInTheCapturingPhase("mouseover", innerDivSelector, window));       
      it("capturing mouseout event on the window obj should work in bubbling up phase", testEventInTheCapturingPhase("mouseout", innerDivSelector, window)); 
    });
  });
  
  // helper functions
  function testEventInTheCapturingPhase(eventType, targetSelector, listenEl) {
    return testEvent(eventType, targetSelector, listenEl, true);
  }

  function testEventInTheBubblingUp(eventType, targetSelector, listenEl) {
    return testEvent(eventType, targetSelector, listenEl, false);
  }  

  function testEvent(eventType, targetSelector, listenEl, phase) {
    return function(done) {
      th.once(eventType, listenEl, done, phase);
      var event = prop.get(eventType, targetSelector);
      t.triggerMouseEvent(event);         
    };
  }
}(rpl));


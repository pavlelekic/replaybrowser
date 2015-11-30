/*jshint -W087 */
var rpl = rpl || {};

(function(namespace) {
  "use strict";

  describe("Recorder class:", function() {
    var th = namespace.testHelper;
    var t = new namespace.Trigger();
    var assert = new th.Assert(namespace.make.cssPath());
    var prop = new th.TestEventProperties();
    var r, outer;
    var outerDiv = th.createDomElement("div", "outer");
    var innerDiv = th.createDomElement("div", "inner");    
    var click = prop.get("click", "#inner");
    var mousemove = prop.get("mousemove", "#inner");
    var mouseover = prop.get("mouseover", "#inner", "#inner");
    var mouseout = prop.get("mouseout", "#inner", "#inner");

    beforeAll(function() {
      outerDiv.appendChild(innerDiv);
      document.body.appendChild(outerDiv);
      innerDiv = th.findElementByID("inner");
      outer = th.findElementByID("outer");      
    });

    afterAll(function() {
      document.body.removeChild(outerDiv);
    });


    describe("listen() method", function() {
      beforeEach(function() {
        r = namespace.make.recorder();
      });

      it("should be able to record single event", function(done) {
        r.listen(window, ["mousemove"]);

        th.once("mousemove", window, function(e) {
          expect(r.recordings.length).toEqual(1);
          assert.eventsAreEqual(e, mousemove);
          r.detachAllEventListeners();
          done();
        }, false);

        t.triggerMouseEvent(mousemove);        
      });

      it("should be able to record multiple (2) events (and events should match, and are in the correct order)", function(done) {
        r.listen(window, ["mousemove", "mouseover"]);

        th.once("mouseover", window, function(e) {
          var recordings = r.detachAllEventListeners();

          expect(recordings.length).toEqual(2);
          assert.eventsAreEqual(recordings[0], mousemove);          
          assert.eventsAreEqual(recordings[1], mouseover);

          done();
        }, false);

        t.triggerMouseEvent(mousemove);    
        t.triggerMouseEvent(mouseover);    
      });      

      it("should not attach the same listener twice", function(done) {
        r.listen(window, ["mousemove"]);
        r.listen(window, ["mousemove"]);
        
        th.once("mousemove", window, function() {
          if (r.recordings.length === 1) done();
          else throw new Error("Recorder attaches the same handler twice when called twice.");
        }, false);
        
        t.triggerMouseEvent(mousemove);        
      });


      it("should be able to record events that are fired on the target element", function(done) {
        r.listen(innerDiv, ["mousemove"]);

        th.once("mousemove", innerDiv, function(e) {
          expect(r.recordings.length).toEqual(1);
          assert.eventsAreEqual(e, mousemove);
          r.detachAllEventListeners();
          done();
        }, false);

        t.triggerMouseEvent(mousemove);        
      });  

      // "should be able to record events that are fired on the children elements" - this is already covered with previous tests    
    
      it("should record correctly mouseover events with relatedTarget set", function(done) {
        r.listen(innerDiv, ["mouseover"]);

        th.once("mouseover", innerDiv, function(e) {
          expect(r.recordings.length).toEqual(1);
          assert.eventsAreEqual(e, mouseover);
          r.detachAllEventListeners();
          done();
        }, false);

        t.triggerMouseEvent(mouseover);        
      });

      it("should record correctly mouseout events with relatedTarget set", function(done) {
        r.listen(innerDiv, ["mouseout"]);

        th.once("mouseout", innerDiv, function(e) {
          expect(r.recordings.length).toEqual(1);
          assert.eventsAreEqual(e, mouseout);
          r.detachAllEventListeners();
          done();
        }, false);

        t.triggerMouseEvent(mouseout);        
      });         
    });
     

    describe("stopRecording() method", function() {
      beforeEach(function() {
        r = namespace.make.recorder();
      });

      it("should detach all event listeners", function(done) {
        r.listen(window, ["mousemove", "mouseout"]);
        r.listen(window, ["mousemove", "mouseout"]);// just to test if this will cause any problems
        r.detachAllEventListeners();

        th.once("mouseout", window, function() {
          expect(r.recordings.length).toEqual(0);
          done();
        }, false);

        t.triggerMouseEvent(mousemove);        
        t.triggerMouseEvent(mouseout);        
      });
    });

  });
}(rpl));


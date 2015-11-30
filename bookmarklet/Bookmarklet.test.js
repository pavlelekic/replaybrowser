/*jshint -W087 */
var rpl = rpl || {};
/*
  * testing of the save functionality
  Just do one end-to-end test, pass some records to the bookmarklet via fake recorder, 
  then test the replayLastRecording() to see if you got the same json back
*/
(function(namespace) {
  "use strict";
      
  describe("Bookmarklet class", function() {
    var bookmarklet = namespace.make.bookmarklet();     
    var th = namespace.testHelper;
    var assert = new th.Assert(namespace.make.cssPath());
    var prop = new th.TestEventProperties();
    var click = prop.get("click", "#inner");
    var mousemove = prop.get("mousemove", "#inner");
    var t = new namespace.Trigger();


    it("should save recordings correctly", function(done) {
      var eventsOrder = [];
      bookmarklet.startRecording();
      t.triggerMouseEvent(mousemove);      
      t.triggerMouseEvent(click);
      bookmarklet.stopRecording();
      th.once("mousemove", window, function(e) { 
        assert.eventsAreEqual(e, mousemove); 
        eventsOrder.push("mousemove");
      }, true);  

      th.once("click", window, function(e) { 
        assert.eventsAreEqual(e, click); 
        eventsOrder.push("click");
        expect(eventsOrder).toEqual(["mousemove", "click"]);
        done();
      }, true);       
      bookmarklet.replayLastRecording(); 
    });
  });
}(rpl));

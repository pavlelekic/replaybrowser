/*jshint -W087 */
var rpl = rpl || {};

(function(namespace) {
  "use strict";
  
  // setup
  var th = namespace.testHelper;
  var prop = new th.TestEventProperties();
  var outerDiv = th.createDomElement("div", "outer");
  var innerDiv = th.createDomElement("div", "inner");
  var mousemove = prop.get("mousemove", "#inner");
  var t = new namespace.Trigger();

  beforeAll(function() {
    outerDiv.appendChild(innerDiv);
    document.body.appendChild(outerDiv);
  });

  afterAll(function() {
    document.body.removeChild(outerDiv);
  });

  describe("Once() function", function() {
    it("should execute the handler function on event", function(done) {
      th.once("mousemove", window, done, true);
      t.triggerMouseEvent(mousemove);         
    });

    it("should execute the handler function only once (should detach event handler after first event fired)", function(done) {
      var onceCounter = 0;
      var eventNumber = 0;

      th.once("mousemove", window, function() { onceCounter++; }, true);
      window.addEventListener("mousemove", assertCounterIsNotIncrementedTwice, false);

      t.triggerMouseEvent(mousemove);          
      t.triggerMouseEvent(mousemove);          
      
      function assertCounterIsNotIncrementedTwice() {
        eventNumber++;

        if (eventNumber === 2) {
          if (onceCounter === 1) {
            window.removeEventListener("mousemove", assertCounterIsNotIncrementedTwice, false);
            done();
          }
          else {
            throw new Error("once() function was fired twice!");
          }
        }
      }
    });
  });

}(rpl));


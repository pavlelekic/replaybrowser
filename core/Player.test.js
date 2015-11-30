/*jshint -W087 */
var rpl = rpl || {};

(function(namespace) {
  "use strict";
      
  describe("Player class:", function() {
    var th = namespace.testHelper;
    var player = namespace.make.player();     
    var assert = new th.Assert(namespace.make.cssPath());
    var outerDiv = th.createDomElement("div", "outer");
    var innerDiv = th.createDomElement("div", "inner");
    var prop = new th.TestEventProperties();
    var click = prop.get("click", "#inner");
    var mousemove = prop.get("mousemove", "#inner");

    beforeAll(function() {
      outerDiv.appendChild(innerDiv);
      document.body.appendChild(outerDiv);
      innerDiv = th.findElementByID("inner");
    });

    afterAll(function() {
      document.body.removeChild(outerDiv);
    });     
     
    describe("play() method", function() {

      it("should be able to replay single event", function(done) {
          th.once("mousemove", window, done, true);
          player.play([mousemove]);      
      });

      it("should be able to replay multiple events", function(done) {
        var counter = 0;

        window.addEventListener("mousemove", function testIfCalledTwice(e) {
          counter++;

          if (counter === 2) {
            window.removeEventListener("mousemove", testIfCalledTwice, true);
            done();
          }
        }, true);

        player.play([mousemove, mousemove]);       
      });      

      it("should preserve the order of events", function(done) {
        var order = [];

        th.once("mousemove", window, function() { order.push("mousemove"); }, true);
        th.once("click", window, function() {
          order.push("click");

          if (order[0] === "mousemove" && order[1] === "click") done();
          else throw new Error("Wrong order of replayed events: " + JSON.stringify(order));
        }, true);
        
        player.play([mousemove, click]);     
      });

    });
  });

}(rpl));

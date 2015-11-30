/*jshint -W087 */
var rpl = rpl || {};

(function(namespace) {
  "use strict";

  describe("cssPath function", function() {
    var cssPath = namespace.cssPath;
    var fixture = new DocumentFragment();    

    describe("when encounters ID selector", function() {
      var parent = document.createElement("div");
      var child = document.createElement("div");
      var grandChild = document.createElement("div");

      beforeAll(function() {
        child.appendChild(grandChild);
        parent.appendChild(child);
        fixture.appendChild(parent);
      });

      afterAll(function() {
        fixture.innerHtml = "";
      });     

      it("should return ID selector of the target if ID is present", function() {
        temporaryChangeAttribute(grandChild, "id", "testId", function() {
          testIfCssSelectorMatchesElement(cssPath(grandChild), grandChild);
        });        
      });

      it("should stop looking for parents when it encounters parent with ID", function() {
        temporaryChangeAttribute(child, "id", "testId", function() {
          testIfCssSelectorMatchesElement(cssPath(grandChild), grandChild);
        });
      });

      it("should stop looking for parents when it encounters parent with ID (testing a bit deeper)", function() {
        temporaryChangeAttribute(parent, "id", "testId", function() {
          testIfCssSelectorMatchesElement(cssPath(grandChild), grandChild);
        });
      });    
    });

    describe("when working with sibling selectors", function() {
      beforeAll(function() {
        var aTag = document.createElement("a");
        aTag.appendChild(document.createElement("img"));
        var center = document.createElement("center");
        center.appendChild(aTag.cloneNode(true));
        center.appendChild(aTag);
        var span = document.createElement("span");
        span.appendChild(center);
        var div = document.createElement("div");
        div.setAttribute("id", "testSiblings");
        div.appendChild(span);
        fixture.appendChild(div);
      });

      afterAll(function() {
        fixture.innerHtml = "";
      });     


      it("should select second sibling correctly", function() {
        var secondATag = fixture.querySelector("#testSiblings > span > center > a:nth-child(2)");
        testIfCssSelectorMatchesElement(cssPath(secondATag), secondATag);
      });

      it("should select first sibling correctly", function() {
        var firstATag = fixture.querySelector("#testSiblings > span > center > a:nth-child(1)");
        testIfCssSelectorMatchesElement(cssPath(firstATag), firstATag);
      });
    });
     
    // helper functions
    
    function temporaryChangeAttribute(element, attribute, value, callback) {
      var oldValue = element[attribute];
      element.setAttribute(attribute, value);
      callback();
      element.setAttribute(attribute, oldValue);
    }

    function testIfCssSelectorMatchesElement(selector, element) {
      var match = fixture.querySelector(selector);
      
      if (match !== element) fail("Css selector " + selector + " did not match the orignal element.");              
    }

    function testIfCssSelectorMatchesElementOnDocumentLevel(selector, element) {
      var match = document.querySelector(selector);
      
      if (match !== element) fail("Css selector " + selector + " did not match the orignal element.");              
    }      
  });
}(rpl));

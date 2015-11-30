/*jshint -W087 */
var rpl = rpl || {};

(function(namespace) {
  "use strict";

  namespace.cssPath = function(element) {
    checkIfElementIsValid(element);
    var path = createPathArray(element);
    return path.join(" > ");
  };

  function createPathArray(element) {
    for (var el = element, path = []; el && el.nodeType === Node.ELEMENT_NODE; el = el.parentNode) {
      if (el.id) {
        path.unshift('#' + el.id);
        break;
      }

      path.unshift(makeSelector(el));      
    }

    return path;
  }

  function checkIfElementIsValid(element) {
    if (!(element instanceof Element)) 
      throw new Error("Wrong object type. Expected html element.");
  }

  function makeSelector(element) {
    var tagName = element.nodeName.toLowerCase();
    return tagName + addNthChild(element, tagName); 
  }

  function addNthChild(element, tagName) {
    var sibling = element.previousElementSibling, nth = 1;

    while (sibling) {
      if (sibling.nodeName.toLowerCase() == tagName) nth++;

      sibling = sibling.previousElementSibling;
    }

    return (nth != 1) ? ":nth-of-type(" + nth + ")" : "";	
  }
}(rpl));


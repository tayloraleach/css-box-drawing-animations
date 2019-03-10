"use strict";

(function boxAnimations() {
  var didScroll = false;

  // Add page sections here:
  var pageSections = [document.querySelector("#about-us-section .container"), document.querySelector("#what-we-do-section .container"), document.querySelector("#contact-section .container")];

  var createMasks = function createMasks() {
    var classes = {
      lt: "left-mask-top",
      ll: "left-mask-side",
      lb: "left-mask-bottom",
      rt: "right-mask-top",
      rr: "right-mask-side",
      rb: "right-mask-bottom"
    };
    Object.keys(classes).map(function (key) {
      var elm = document.createElement("span");
      elm.classList.add(classes[key]);
      classes[key] = elm;
    });
    return classes;
  };

  // When the user scrolls, inject the created DOM elements and the css takes over!
  window.onscroll = function () {
    return detectElementsOnScroll();
  };

  var detectElementsOnScroll = function detectElementsOnScroll() {
    didScroll = true;
    if (pageSections.length) {
      pageSections.map(function (section, index) {
        if (isScrolledIntoView(section)) {
          load_masks(section, createMasks());
          pageSections.splice(index, 1);
        }
      });
    } else {
      clearInterval(interval);
    }
  };

  var interval = setInterval(function () {
    if (didScroll) {
      didScroll = false;
    }
  }, 100);

  // Takes in a section and appends the correct DOM elements.
  var load_masks = function load_masks(section, masks) {
    section.style.border = "2px solid black";
    var headingFragment = document.createDocumentFragment(),
        remainingFragment = document.createDocumentFragment(),
        heading = section.querySelector("h2");
    ["lt", "rt"].map(function (m) {
      headingFragment.appendChild(masks[m]);
    });
    ["ll", "lb", "rr", "rb"].map(function (m) {
      remainingFragment.appendChild(masks[m]);
    });
    heading.appendChild(headingFragment);
    section.appendChild(remainingFragment);
    section.flag = true;
  };

  // Detect if the element is in the viewport.
  var isScrolledIntoView = function isScrolledIntoView(element) {
    var rect = element.getBoundingClientRect(),
        elemTop = rect.top,
        elemBottom = rect.bottom;
    return elemTop < window.innerHeight && elemBottom >= 0;
  };

  (function unrelatedJS() {
    // Sets the current year in the footer
    var year = new Date().getFullYear(),
        footerYear = document.querySelector("footer span");
    footerYear.innerHTML = year;
  })();
})();
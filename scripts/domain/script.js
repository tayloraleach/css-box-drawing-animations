(function boxAnimations() {
  let didScroll = false;

  // Add page sections here:
  const pageSections = [
    document.querySelector("#about-us-section .container"),
    document.querySelector("#what-we-do-section .container"),
    document.querySelector("#contact-section .container")
  ];

  const createMasks = () => {
    const classes = {
      lt: "left-mask-top",
      ll: "left-mask-side",
      lb: "left-mask-bottom",
      rt: "right-mask-top",
      rr: "right-mask-side",
      rb: "right-mask-bottom"
    };
    Object.keys(classes).map(key => {
      const elm = document.createElement("span");
      elm.classList.add(classes[key]);
      classes[key] = elm;
    });
    return classes;
  };

  // When the user scrolls, inject the created DOM elements and the css takes over!
  window.onscroll = () => detectElementsOnScroll();

  const detectElementsOnScroll = () => {
    didScroll = true;
    if (pageSections.length) {
      pageSections.map((section, index) => {
        if (isScrolledIntoView(section)) {
          load_masks(section, createMasks());
          pageSections.splice(index, 1);
        }
      });
    } else {
      clearInterval(interval);
    }
  };

  const interval = setInterval(() => {
    if (didScroll) {
      didScroll = false;
    }
  }, 100);

  // Takes in a section and appends the correct DOM elements.
  const load_masks = (section, masks) => {
    section.style.border = "2px solid black";
    const headingFragment = document.createDocumentFragment(),
      remainingFragment = document.createDocumentFragment(),
      heading = section.querySelector("h2");
    ["lt", "rt"].map(m => {
      headingFragment.appendChild(masks[m]);
    });
    ["ll", "lb", "rr", "rb"].map(m => {
      remainingFragment.appendChild(masks[m]);
    });
    heading.appendChild(headingFragment);
    section.appendChild(remainingFragment);
    section.flag = true;
  };

  // Detect if the element is in the viewport.
  const isScrolledIntoView = element => {
    const rect = element.getBoundingClientRect(),
      elemTop = rect.top,
      elemBottom = rect.bottom;
    return elemTop < window.innerHeight && elemBottom >= 0;
  };

  (function unrelatedJS() {
    // Sets the current year in the footer
    const year = new Date().getFullYear(),
      footerYear = document.querySelector("footer span");
    footerYear.innerHTML = year;
  })();
})();

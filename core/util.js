/* eslint-disable no-param-reassign, radix */
// function hide(el) {
//   el.style.display = 'none';
// }

// function show(el) {
//   el.style.display = '';
// }

// // elements
// function addClass(el, className) {
//   const ac = (tel, clstr) => {
//     if (tel.classList) {
//       tel.classList.add(clstr);
//     } else {
//       tel.className += ` ${clstr}`;
//     }
//   };
//   if (className && typeof (className) === 'string') {
//     ac(el, className);
//   }
//   if (className && Array.isArray(className)) {
//     className.forEach((cls) => {
//       ac(el, cls);
//     });
//   }
// }

// function after(el, htmlString) {
//   el.insertAdjacentHTML('afterend', htmlString);
// }

// function append(p, el) {
//   p.appendChild(el);
// }

// function applyStyle(el, style) {
//   Object.keys(style).forEach((key) => {
//     el.style[key] = style[key];
//   });
// }

// function before(el, htmlString) {
//   el.insertAdjacentHTML('beforebegin', htmlString);
// }

// function clone(el) {
//   return el.cloneNode(true);
// }

// function create(type, classes, styles) {
//   const el = document.createElement(type);
//   classes && addClass(el, classes);
//   styles && applyStyle(el, styles);

//   return el;
// }

// function contains(el, child) {
//   return el !== child && el.contains(child);
// }

// function containsSelector(el, selector) {
//   el.querySelector(selector) !== null;
// }

// function each(selector, fun) {
//   const elements = document.querySelectorAll(selector);
//   Array.prototype.forEach.call(elements, fun);
// }

// function empty(el) {
//   el.innerHTML = '';
// }

// function filter(selector, filterFn) {
//   return Array.prototype.filter.call(document.querySelectorAll(selector), filterFn);
// }

// function findChildren(el, selector) {
//   return el.querySelectorAll(selector);
// }

// function findElements(selector) {
//   return document.querySelectorAll(selector);
// }

// function getAttribute(el, attr) {
//   return el.getAttribute(attr);
// }

// function getInnerHTML(el) {
//   return el.innerHTML;
// }

// function getOuterHTML(el) {
//   return el.outerHTML;
// }

// function getStyle(el, ruleName) {
//   return getComputedStyle(el)[ruleName];
// }

// function getText(el) {
//   return el.textContent;
// }

// function hasClass(el, className) {
//   if (el.classList) { return el.classList.contains(className); }
//   return new RegExp(`(^| )${className}( |$)`, 'gi').test(el.className);
// }

// function matchs(el1, el2) {
//   return el1 === el2;
// }

// function matchsSelector(el, selector) {
//   return (el.matches
//     || el.matchesSelector
//     || el.msMatchesSelector
//     || el.mozMatchesSelector
//     || el.webkitMatchesSelector
//     || el.oMatchesSelector).call(el, selector);
// }

// function next(el) {
//   return el.nextElementSibling;
// }

// function offset(el) {
//   const rect = el.getBoundingClientRect();

//   return {
//     top: rect.top + document.body.scrollTop,
//     left: rect.left + document.body.scrollLeft,
//   };
// }

// function offsetParent(el) {
//   return el.offsetParent || el;
// }

// function outerHeight(el) {
//   return el.offsetHeight;
// }

// function outerHeightWithMargin(el) {
//   let height = el.offsetHeight;
//   const style = getComputedStyle(el);

//   height += parseInt(style.marginTop) + parseInt(style.marginBottom);
//   return height;
// }

// function outerWidth(el) {
//   return el.offsetWidth;
// }

// function outerWidthWithMargin(el) {
//   let width = el.offsetWidth;
//   const style = getComputedStyle(el);

//   width += parseInt(style.marginLeft) + parseInt(style.marginRight);
//   return width;
// }

// function parent(el) {
//   return el.parentNode;
// }

// function position(el) {
//   return {
//     left: el.offsetLeft,
//     top: el.offsetTop,
//   };
// }

// function positionRelativeToViewPort(el) {
//   return el.getBoundingClientRect();
// }

// function prepend(el, p) {
//   p.insertBefore(el, p.firstChild);
// }

// function prev(el) {
//   return el.previousElementSibling;
// }

// function remove(el) {
//   el.parentNode.removeChild(el);
// }

// function removeClass(el, className) {
//   if (el.classList) {
//     el.classList.remove(className);
//   } else {
//     el.className = el.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), ' ');
//   }
// }

// function replaceWithHTML(el, string) {
//   el.outerHTML = string;
// }

// function removeAllAttributes(el) {
//   const attributes = [];
//   Array.prototype.forEach.call(el.attributes, (att) => {
//     attributes.push(att.name);
//   });

//   attributes.forEach(att => el.removeAttribute(att));
// }

// function setAttr(el, attr, value) {
//   el.setAttribute(attr, value);
// }

// function setHTML(el, htmlString) {
//   el.innerHTML = htmlString;
// }

// function setText(el, text) {
//   el.textContent = text;
// }

// function siblings(el) {
//   return Array.prototype.filter.call(el.parentNode.children, (child) => {
//     return child !== el;
//   });
// }

// function toggleClass(el, className) {
//   if (el.classList) {
//     el.classList.toggle(className);
//   } else {
//     const classes = el.className.split(' ');
//     const existingIndex = classes.indexOf(className);

//     if (existingIndex >= 0) { classes.splice(existingIndex, 1); } else { classes.push(className); }

//     el.className = classes.join(' ');
//   }
// }

// // events
// function on(el, eventName, eventHandler) {
//   el.addEventListener(eventName, eventHandler);
// }

// function off(el, eventName, eventHandler) {
//   el.removeEventListener(eventName, eventHandler);
// }

// function ready(fn) {
//   if (document.readyState !== 'loading') {
//     fn();
//   } else {
//     document.addEventListener('DOMContentLoaded', fn);
//   }
// }

function clearUserSelection() {
  if (window.getSelection) {
    if (window.getSelection().empty) { // Chrome
      window.getSelection().empty();
    } else if (window.getSelection().removeAllRanges) { // Firefox
      window.getSelection().removeAllRanges();
    }
  } else if (document.selection) { // IE?
    document.selection.empty();
  }
}

// // http://honyovk.com/Colors/
// function rgb2hex(rgb) {
//   rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

//   function hex(x) {
//     return (`0${parseInt(x).toString(16)}`).slice(-2);
//   }
//   return `#${hex(rgb[1])}${hex(rgb[2])}${hex(rgb[3])}`;
// }

// function getContrastYIQ(hexcolor) {
//   const r = parseInt(hexcolor.substr(0, 2), 16);
//   const g = parseInt(hexcolor.substr(2, 2), 16);
//   const b = parseInt(hexcolor.substr(4, 2), 16);
//   const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
//   return (yiq >= 128) ? 'black' : 'white';
// }

// function getEmpyImage() {
//   const emptyDragImage = document.createElement('img');
//   emptyDragImage.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
//   return emptyDragImage;
// }

// const emptyDragImage = document.createElement('img');
// emptyDragImage.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

export default {
  // hide,
  // show,

  // addClass,
  // after,
  // append,
  // applyStyle,
  // before,
  // clone,
  // contains,
  // containsSelector,
  // create,
  // each,
  // empty,
  // filter,
  // findChildren,
  // findElements,
  // getAttribute,
  // getInnerHTML,
  // getOuterHTML,
  // getStyle,
  // getText,
  // hasClass,
  // matchs,
  // matchsSelector,
  // next,
  // offset,
  // offsetParent,
  // outerHeight,
  // outerHeightWithMargin,
  // outerWidth,
  // outerWidthWithMargin,
  // parent,
  // position,
  // positionRelativeToViewPort,
  // prepend,
  // prev,
  // ready,
  // remove,
  // removeClass,
  // replaceWithHTML,
  // setAttr,
  // removeAllAttributes,
  // setHTML,
  // setText,
  // siblings,
  // toggleClass,

  // on,
  // off,

  // rgb2hex,
  // getContrastYIQ,
  clearUserSelection,

  // getEmpyImage,
  // emptyDragImage,
};

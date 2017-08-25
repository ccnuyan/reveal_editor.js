const rules = {
  slides: {
    classesAllowed: ['slides'],
    attributesAllowed: ['data-id'],
  },
  section: {
    classesAllowed: [],
    attributesAllowed: ['data-id', 'data-background-color'],
  },
  block: {
    classesAllowed: ['sl-block'],
    attributesAllowed: ['data-id', 'data-block-type', 'style', 'data-vote-selectable', 'data-transform'],
  },
};

// class cleaner

const removeClassNotExistedInArray = (el, array) => {
  const classToRemove = [];
  Array.prototype.forEach.call(el.classList, (cn) => {
    if (array.indexOf(cn) < 0) {
      classToRemove.push(cn);
    }
  });
  classToRemove.forEach((cn) => {
    el.classList.remove(cn);
  });
};

// attribute cleaner

const removeAttrNotExistedInArray = (el, array) => {
  const attrsToRemove = [];
  Array.prototype.forEach.call(el.attributes, (attr) => {
    if (attr.name === 'class') {
      if (el.classList.length === 0) {
        attrsToRemove.push(attr.name);
      }
    } else if (array.indexOf(attr.name) < 0) {
      attrsToRemove.push(attr.name);
    }
  });

  attrsToRemove.forEach((attr) => {
    el.removeAttribute(attr);
  });
};

const getSnapshot = (editor) => {
  const cwp = editor.reveal.cloneNode(true);
  const slides = cwp.querySelector('div.slides');

  // const removeSelectors = ['.editing-ui', '.arranging-ui', 'div.slides>div'];
  const removeSelectors = ['.editing-ui', '.arranging-ui', 'div.slides>div'];

  Array.prototype.forEach.call(removeSelectors, (selector) => {
    const euis = slides.querySelectorAll(selector);
    Array.prototype.forEach.call(euis, (el) => {
      el.parentNode.removeChild(el);
    });
  });

  const sections = slides.querySelectorAll('section');
  const blocks = slides.querySelectorAll('div.sl-block');

  removeClassNotExistedInArray(slides, rules.slides.classesAllowed);
  Array.prototype.forEach.call(sections, (el) => {
    removeClassNotExistedInArray(el, rules.section.classesAllowed);
  });
  Array.prototype.forEach.call(blocks, (el) => {
    removeClassNotExistedInArray(el, rules.block.classesAllowed);
  });

  removeAttrNotExistedInArray(slides, rules.slides.attributesAllowed);
  Array.prototype.forEach.call(sections, (el) => {
    removeAttrNotExistedInArray(el, rules.section.attributesAllowed);
  });
  Array.prototype.forEach.call(blocks, (el) => {
    removeAttrNotExistedInArray(el, rules.block.attributesAllowed);
  });

  return slides.innerHTML;
};

export default getSnapshot;

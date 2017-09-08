class Snapshot {
  constructor(editor) {
    this.editor = editor;
  }

  rules = {
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
      attributesAllowed: ['data-id',
        'data-svg-shape',
        'data-block-type',
        'style',
        'data-vote-selectable',
        'data-transform'],
    },
  };

  // class cleaner
  removeClassNotExistedInArray = (el, array) => {
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
  removeAttrNotExistedInArray = (el, array) => {
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

  getSnapshot = () => {
    const cwp = this.editor.reveal.cloneNode(true);
    const slides = cwp.querySelector('div.slides');

    const removeSelectors = ['.editing-ui', '.arranging-ui', 'div.slides>div'];

    Array.prototype.forEach.call(removeSelectors, (selector) => {
      const euis = slides.querySelectorAll(selector);
      Array.prototype.forEach.call(euis, (el) => {
        el.parentNode.removeChild(el);
      });
    });

    const sections = slides.querySelectorAll('section');
    const blocks = slides.querySelectorAll('div.sl-block');

    Array.prototype.forEach.call(sections, (section) => {
      Array.prototype.forEach.call(section.querySelectorAll('section>div:not(.sl-block)'), (el) => {
        if (el.parentNode === section)section.removeChild(el);
      });
      const cavs = section.querySelector('canvas');
      if (cavs) {
        section.removeChild(cavs);
      }
    });

    this.removeClassNotExistedInArray(slides, this.rules.slides.classesAllowed);
    Array.prototype.forEach.call(sections, (el) => {
      this.removeClassNotExistedInArray(el, this.rules.section.classesAllowed);
    });
    Array.prototype.forEach.call(blocks, (block) => {
      Array.prototype.forEach.call(block.querySelectorAll('div.sl-block>div:not(.sl-block-content)'), (el) => {
        if (el.parentNode === block)block.removeChild(el);
      });
      this.removeClassNotExistedInArray(block, this.rules.block.classesAllowed);
    });

    this.removeAttrNotExistedInArray(slides, this.rules.slides.attributesAllowed);
    Array.prototype.forEach.call(sections, (section) => {
      this.removeAttrNotExistedInArray(section, this.rules.section.attributesAllowed);
    });
    Array.prototype.forEach.call(blocks, (block) => {
      this.removeAttrNotExistedInArray(block, this.rules.block.attributesAllowed);
    });

    return slides.innerHTML;
  };
}

export default Snapshot;

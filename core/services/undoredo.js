import _u from '../util';

class UndoRedo {
  constructor(editor) {
    this.editor = editor;
    this.initialize();
  }

  initialize() {
    this.queue = [];
    this.pointer = null;
  }

  couldUndo() {
    return this.pointer !== null && this.pointer > 0;
  }

  couldRedo() {
    return this.pointer !== null && this.pointer < this.queue.length - 1;
  }

  getSnapshot() {
    const rules = {
      slides: {
        classesAllowed: ['slides'],
        attributesAllowed: ['data-id'],
      },
      section: {
        classesAllowed: [],
        attributesAllowed: ['data-id'],
      },
      block: {
        classesAllowed: ['sl-block'],
        attributesAllowed: ['data-id', 'data-block-type', 'style', 'data-vote-selectable', 'data-transform'],
      },
    };

    const cwp = _u.clone(this.editor.dom);
    const slides = cwp.querySelector('div.slides');
    // remove no use elements

    const removeSelectors = ['.editing-ui', '.overviewing-ui', 'div.slides>div'];

    Array.prototype.forEach.call(removeSelectors, (selector) => {
      const euis = slides.querySelectorAll(selector);
      Array.prototype.forEach.call(euis, (el) => {
        _u.remove(el);
      });
    });


    const sections = slides.querySelectorAll('section');
    const blocks = slides.querySelectorAll('div.sl-block');

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

    removeClassNotExistedInArray(slides, rules.slides.classesAllowed);

    Array.prototype.forEach.call(sections, (el) => {
      removeClassNotExistedInArray(el, rules.section.classesAllowed);
    });

    Array.prototype.forEach.call(blocks, (el) => {
      removeClassNotExistedInArray(el, rules.block.classesAllowed);
    });

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

    removeAttrNotExistedInArray(slides, rules.slides.attributesAllowed);

    Array.prototype.forEach.call(sections, (el) => {
      removeAttrNotExistedInArray(el, rules.section.attributesAllowed);
    });

    Array.prototype.forEach.call(blocks, (el) => {
      removeAttrNotExistedInArray(el, rules.block.attributesAllowed);
    });

    return _u.getOuterHTML(slides);
  }

  enqueue() {
    const innerHtml = this.getSnapshot();

    this.queue.splice(this.pointer);
    this.queue.push(innerHtml);
    this.pointer = this.queue.length;
  }

  undo() {
    if (!this.couldUndo()) {
      return false;
    }
    if (this.queue.length === this.pointer) {
      const innerHtml = this.getSnapshot();
      this.queue.push(innerHtml);
    }
    this.pointer -= 1;
    this.editor.reload({ html: this.queue[this.pointer] });
    return true;
  }

  redo() {
    if (!this.couldRedo()) {
      return false;
    }
    this.pointer += 1;
    this.editor.reload({ html: this.queue[this.pointer] });

    return true;
  }
}

export default UndoRedo;

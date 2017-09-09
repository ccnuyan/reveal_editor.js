import BlockContent from './BlockContent';
import Elements from './Elements';

/* eslint-disable no-param-reassign, radix */

class Block extends Elements {
  anchorTypes = [];
  D2R = Math.PI / 180;
  state = { status: 'previewing' };

  minsize = {
    width: 24,
    height: 24,
  };

  constructor({ parent, el }) {
    super({ parent, el });

    this.editor = parent.editor;
    this.section = this.parent;

    this.state.blockType = this.dom.getAttribute('data-block-type');

    const contentDom = this.dom.querySelector('div.sc-block>div.sc-block-content');

    this.blockContent = new BlockContent({
      parent: this,
      el: contentDom,
    });
  }

  toEdit() {
    if (this.state.status === 'editing') return;

    this.editor.services.undoredo.enqueue();

    this.section.blocks.forEach((block) => {
      if (block.dom !== this.dom) {
        block.toPreview();
      }
    });

    this.editor.debouncedEventEmit();
  }

  // when selected;
  toManipulate() {
    if (this.state.status === 'manipulating') return;

    this.dom.setAttribute('sc-block-status', 'manipulating');

    this.editor.services.undoredo.enqueue();

    this.state.status = 'manipulating';
    // set ddmrr in inherit classes

    const currentRect = this.dom.getBoundingClientRect();
    this.section.axis.activate(
      [currentRect.top, (currentRect.top + currentRect.bottom) / 2.0, currentRect.bottom - 1],
      [currentRect.left, (currentRect.left + currentRect.right) / 2.0, currentRect.right - 1],
    );

    this.ddmrr.emitter.on('move_going', () => {
      const rect = this.dom.getBoundingClientRect();
      this.section.axis.activate(
        [rect.top, (rect.top + rect.bottom) / 2.0, rect.bottom - 1],
        [rect.left, (rect.left + rect.right) / 2.0, rect.right - 1],
      );
    });

    this.ddmrr.emitter.on('rotate_going', () => {
      const rect = this.dom.getBoundingClientRect();
      this.section.axis.activate(
        [rect.top, (rect.top + rect.bottom) / 2.0, rect.bottom - 1],
        [rect.left, (rect.left + rect.right) / 2.0, rect.right - 1],
      );
    });

    this.ddmrr.emitter.on('resize_going', () => {
      const rect = this.dom.getBoundingClientRect();
      this.section.axis.activate(
        [rect.top, (rect.top + rect.bottom) / 2.0, rect.bottom - 1],
        [rect.left, (rect.left + rect.right) / 2.0, rect.right - 1],
      );
    });

    this.ddmrr.emitter.on('move_end', () => {
      const rect = this.dom.getBoundingClientRect();
      this.section.axis.activate(
        [rect.top, (rect.top + rect.bottom) / 2.0, rect.bottom - 1],
        [rect.left, (rect.left + rect.right) / 2.0, rect.right - 1],
      );
    });

    this.ddmrr.emitter.on('rotate_end', () => {
      const rect = this.dom.getBoundingClientRect();
      this.section.axis.activate(
        [rect.top, (rect.top + rect.bottom) / 2.0, rect.bottom - 1],
        [rect.left, (rect.left + rect.right) / 2.0, rect.right - 1],
      );
    });

    this.ddmrr.emitter.on('resize_end', () => {
      const rect = this.dom.getBoundingClientRect();
      this.section.axis.activate(
        [rect.top, (rect.top + rect.bottom) / 2.0, rect.bottom - 1],
        [rect.left, (rect.left + rect.right) / 2.0, rect.right - 1],
      );
    });

    this.editor.debouncedEventEmit();
  }

  getLength = (len) => {
    return len ? Math.round(parseFloat(len)) : 0;
  };

  getColor = (color) => {
    return color || 'transparent';
  };

  getFontSize = (fs) => {
    return fs || '100%';
  };

  getBorderStyle = (bs) => {
    return bs || 'none';
  };

  getZIndex = (zi) => {
    if (!zi || zi === 'auto') {
      return 0;
    }
    return parseInt(zi);
  };

  toPreview() {
    this.dom.setAttribute('sc-block-status', 'previewing');
    if (this.state.status === 'previewing') return;
    this.state.status = 'previewing';
    if (this.ddmrr) {
      this.ddmrr.release();
      this.ddmrr = null;
    }
    this.editor.debouncedEventEmit();
  }

  remove() {
    this.dom.parentNode.removeChild(this.dom);
  }
}

export default Block;

import BlockContent from './BlockContent';
import Elements from './Elements';

/* eslint-disable no-param-reassign, radix */

class Block extends Elements {
  anchorTypes = [];
  D2R = Math.PI / 180;
  state = { mode: 'previewing', transform: 0 };
  minsize = {
    width: 24,
    height: 24,
  };

  constructor({ parent, el }) {
    super({ parent, el });

    this.editor = parent.editor;
    this.section = this.parent;

    this.state.blockType = this.dom.dataset.blockType;

    const contentDom = this.dom.querySelector('div.sl-block>div.sl-block-content');

    this.blockContent = new BlockContent({
      parent: this,
      el: contentDom,
    });
  }

  getTs() {
    const blockStyle = getComputedStyle(this.dom);
    return {
      left: parseInt(blockStyle.left),
      top: parseInt(blockStyle.top),
      width: parseInt(blockStyle.width),
      height: parseInt(blockStyle.height),
    };
  }

  toEdit() {
    if (this.state.mode === 'editing') return;
    this.section.blocks.forEach((block) => {
      if (block.dom !== this.dom) {
        block.toPreview();
      }
    });

    this.editor.debouncedEventEmit();
  }

  // when selected;
  toManipulate() {
    if (this.state.mode === 'manipulating') return;
    this.state.mode = 'manipulating';
    // set ddmrr in inherit classes

    this.dom.style.userSelect = 'none';
    this.dom.style.mozUserSelect = 'none';
    this.dom.style.webkitUserSelect = 'none';
    this.dom.style.msUserSelect = 'none';

    this.editor.debouncedEventEmit();
  }

  toPreview() {
    if (this.state.mode === 'previewing') return;
    this.state.mode = 'previewing';
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

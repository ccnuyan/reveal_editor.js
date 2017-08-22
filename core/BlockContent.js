import _u from './util';
import Elements from './Elements';

class BlockContent extends Elements {
  constructor({ parent, el }) {
    super({ parent, el });
    this.linkBlockContentEvents();

    this.block = this.parent;
    this.editor = this.parent.editor;
  }

  linkBlockContentEvents = () => {
    _u.on(this.dom, 'dblclick', (event) => {
      event.stopPropagation();
    });

    _u.on(this.dom, 'click', (event) => {
      if (this.editor.mode === 'previewing') {
        return;
      }
      if (this.block.mode !== 'editing') {
        event.stopPropagation();
        this.parent.parent.blocks.forEach((block) => {
          block.toPreview();
        });
        this.parent.toManipulate();
      }
    });
  }
}

export default BlockContent;

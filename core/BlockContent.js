import _u from './util';
import Elements from './Elements';

class BlockContent extends Elements {
  constructor({ parent, el }) {
    super({ parent, el });
    this.linkBlockContentEvents();
  }

  linkBlockContentEvents = () => {
    _u.on(this.dom, 'dblclick', (event) => {
      event.stopPropagation();
    });

    _u.on(this.dom, 'click', (event) => {
      event.stopPropagation();
      if (this.parent.mode !== 'editing') {
        this.parent.parent.blocks.forEach((block) => {
          block.toPreview();
        });
        this.parent.toManipulate();
      }
    });
  }
}

export default BlockContent;

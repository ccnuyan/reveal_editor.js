import _u from './util';
import Elements from './Elements';

class BlockContent extends Elements {
  constructor({ parent, el }) {
    super({ parent, el });
    this.linkBlockContentEvents();

    this.editor = this.parent.editor;
    this.section = this.parent.section;
    this.block = this.parent;
  }

  linkBlockContentEvents = () => {
    _u.on(this.dom, 'dblclick', (event) => {
      event.stopPropagation();
    });

    _u.on(this.dom, 'click', (event) => {
      // here is editor state
      if (this.editor.state.mode === 'previewing') {
        return;
      }

      // here is block state
      if (this.block.state.mode !== 'editing') {
        event.stopPropagation();
        this.section.blocks.forEach((block) => {
          if (block === this.block) {
            block.toManipulate();
          } else {
            block.toPreview();
          }
        });
      } else {
        event.stopPropagation();
      }
    });
  }
}

export default BlockContent;

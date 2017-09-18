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
    this.dom.addEventListener('dblclick', (event) => {
      event.stopPropagation();
    });

    this.dom.addEventListener('click', (event) => {
      // here is editor state
      event.stopPropagation();

      if (window.Reveal.isOverview()) {
        return;
      }

      if (this.editor.state.status === 'previewing') {
        return;
      }
      // here is block state
      if (this.block.state.status === 'previewing') {
        this.section.blocks.forEach((block) => {
          if (block === this.block) {
            block.toManipulate();
          } else {
            block.toPreview();
          }
        });
      }
    });
  }
}

export default BlockContent;

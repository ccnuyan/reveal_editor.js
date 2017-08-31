import Elements from './Elements';
import _u from './util';
import TransformerResizeAnchor from './TransformerResizeAnchor';
import TransformerRotateAnchor from './TransformerRotateAnchor';
/* eslint-disable no-param-reassign, radix */

class Transformer extends Elements {
  constructor({ parent, el }) {
    super({ parent, el });

    this.editor = parent.editor;
    this.block = parent;
    this.section = parent.parent;

    this.initializeAnchors();

    this.dom.setAttribute('draggable', true);

    _u.on(this.dom, 'dragstart', this.dragstart);
    _u.on(this.dom, 'dragover', this.do);
    _u.on(this.dom, 'dragend', this.dragend);


    _u.on(this.dom, 'click', this.onClick);
    _u.on(this.dom, 'dblclick', this.onDblclick);

    window.Reveal.addEventListener('overviewshown', () => {
      this.hide();
    });
  }

  onClick = (event) => {
    event.stopPropagation();
  }

  onDblclick = (event) => {
    event.stopPropagation();
    if (this.block.toEdit) {
      this.block.toEdit();
    }
  }

  initializeAnchors = () => {
    this.anchors = [];

    const ra = new TransformerRotateAnchor({ parent: this });
    this.anchors.push(ra);

    if (!this.block.dom.dataset.blockType) {
      return;
    }
    this.block.anchorTypes.forEach((at) => {
      this.anchors.push(new TransformerResizeAnchor({
        parent: this,
        dr: at,
      }));
    });
  }

  // do = dargover, capture the event emmited by this dom elements
  do = (event) => {
    // redirect to the handler where the dragstart
    this.editor.draggingElement.dragover(event);
  }

  dragstart = (event) => {
    console.log('Transformer dragstart'); // eslint-disable-line
    event.stopPropagation();

    // transformer.block.section.editor
    this.editor.draggingMode = 'move';
    this.editor.draggingElement = this;

    this.dom.style.cursor = 'move';

    event.dataTransfer.effectAllowed = 'move';

    event.dataTransfer.setDragImage && event.dataTransfer.setDragImage(_u.emptyDragImage, 0, 0);

    this.section.getSelectedBlocks().forEach((block) => {
      const orignalStyle = getComputedStyle(block.dom);
      block.originalLocation = {
        left: parseInt(orignalStyle.left),
        top: parseInt(orignalStyle.top),
      };
    });

    this.editor.dragfrom = {
      x: event.clientX,
      y: event.clientY,
    };
  }

  dragover = (event) => {
    event.stopPropagation();

    event.dataTransfer.dropEffect = 'move';

    const offsetX = event.clientX - this.editor.dragfrom.x;
    const offsetY = event.clientY - this.editor.dragfrom.y;

    this.section.getSelectedBlocks().forEach((block) => {
      Math.abs(offsetX) > 1 && (block.dom.style.left = `${block.originalLocation.left + offsetX}px`);
      Math.abs(offsetX) > 1 && (block.dom.style.top = `${block.originalLocation.top + offsetY}px`);
    });
  }

  dragend = (event) => {
    event.stopPropagation();
    this.dom.style.cursor = 'default';
  }
}

export default Transformer;

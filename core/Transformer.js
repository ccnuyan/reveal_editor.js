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

    _u.on(this.dom, 'click', this.onClick);
    _u.on(this.dom, 'dblclick', this.onDblclick);
  }

  onClick = (event) => {
    event.stopPropagation();
  }

  onDblclick = (event) => {
    event.stopPropagation();
    this.block.toEdit();
  }

  initializeAnchors = () => {
    this.anchors = [];

    const ra = new TransformerRotateAnchor({ parent: this });
    this.anchors.push(ra);

    if (!this.block.dom.dataset.blockType) {
      return;
    }

    switch (this.block.dom.dataset.blockType) {
      case 'text': {
        ['e', 'w'].forEach((dr) => {
          this.anchors.push(new TransformerResizeAnchor({
            parent: this,
            dr,
          }));
        });
        break; }
      case 'shape':
      case 'image': {
        ['e', 'w', 'n', 's', 'ne', 'nw', 'se', 'sw'].forEach((dr) => {
          this.anchors.push(new TransformerResizeAnchor({
            parent: this,
            dr,
          }));
        });
        break; }
      default:
    }
  }

  // do = dargover, capture the event emmited by this dom elements
  do = (event) => {
    event.stopPropagation();
    // redirect to the handler where the dragstart
    this.editor.draggingElement.dragover(event);
  }

  dragstart = (event) => {
    event.stopPropagation();

    // transformer.block.section.editor
    this.editor.draggingMode = 'move';
    this.editor.draggingElement = this;

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setDragImage(_u.emptyDragImage, 0, 0);

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
      block.dom.style.left = `${block.originalLocation.left + offsetX}px`;
      block.dom.style.top = `${block.originalLocation.top + offsetY}px`;
    });
  }
}

export default Transformer;

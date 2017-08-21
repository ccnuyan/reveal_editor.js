import Elements from './Elements';
import _u from './util';
import TransformerAnchor from './TransformerAnchor';
/* eslint-disable no-param-reassign, radix */

class Transformer extends Elements {
  constructor({ parent, el }) {
    super({ parent, el });

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
    this.parent.toEdit();
  }

  initializeAnchors = () => {
    this.anchors = [];

    if (!this.parent.dom.dataset.blockType) {
      return;
    }

    switch (this.parent.dom.dataset.blockType) {
      case 'text': {
        ['e', 'w'].forEach((dr) => {
          this.anchors.push(new TransformerAnchor({
            parent: this,
            dr,
          }));
        });
        break; }
      case 'shape':
      case 'image': {
        ['e', 'w', 'n', 's', 'ne', 'nw', 'se', 'sw'].forEach((dr) => {
          this.anchors.push(new TransformerAnchor({
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
    this.parent.parent.parent.draggingElement.dragover(event);
  }

  dragstart = (event) => {
    event.stopPropagation();

    // transformer.block.section.editor
    this.parent.parent.parent.draggingMode = 'move';
    this.parent.parent.parent.draggingElement = this;

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setDragImage(_u.emptyDragImage, 0, 0);

    const orignalStyle = getComputedStyle(this.parent.dom);

    this.originalLocation = {
      left: parseInt(orignalStyle.left),
      top: parseInt(orignalStyle.top),
    };
    this.dragfrom = {
      x: event.clientX,
      y: event.clientY,
    };
  }

  dragover = (event) => {
    event.stopPropagation();

    event.dataTransfer.dropEffect = 'move';

    const offsetX = event.clientX - this.dragfrom.x;
    const offsetY = event.clientY - this.dragfrom.y;

    this.parent.dom.style.left = `${this.originalLocation.left + offsetX}px`;
    this.parent.dom.style.top = `${this.originalLocation.top + offsetY}px`;
  }
}

export default Transformer;

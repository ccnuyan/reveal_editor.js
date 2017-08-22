import Elements from './Elements';

import _u from './util';
import _config from './config';

/* eslint-disable no-param-reassign, radix */

class TransformerResizeAnchor extends Elements {
  constructor({ parent, dr }) {
    const anchor = _u.create('div', 'anchor', _config.styles.anchor);
    anchor.setAttribute('data-direction', dr);

    super({ parent, el: anchor });

    this.editor = this.parent.editor;
    this.block = this.parent.parent;

    this.dr = dr;
    this.parent.dom.appendChild(anchor);

    this.dom.setAttribute('draggable', true);
    _u.on(this.dom, 'dragstart', this.dragstart);
    _u.on(this.dom, 'dragover', this.do);

    _u.on(this.dom, 'click', this.onClick);

    this.D2R = Math.PI / 180;
  }

  onClick = (event) => {
    event.stopPropagation();
  }

  // do = dargover, capture the event emmited by this dom elements
  do = (event) => {
    event.stopPropagation();
    // redirect to the handler where the dragstart
    this.editor.draggingElement.dragover(event);
  }

  dragstart = (event) => {
    event.stopPropagation();

    // anchor.transformer.block.section.editor
    this.editor.draggingMode = 'resize';
    this.editor.draggingElement = this;

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setDragImage(_u.emptyDragImage, 0, 0);

    const blockStyle = getComputedStyle(this.block.dom);

    this.originalStyle = {
      left: parseInt(blockStyle.left),
      top: parseInt(blockStyle.top),
      width: parseInt(blockStyle.width),
      height: parseInt(blockStyle.height),
    };

    this.dragfrom = {
      x: event.clientX,
      y: event.clientY,
    };

    this.original = {

    };

    this.transform = this.block.getTransform();
  }

  dragover = (event) => {
    event.stopPropagation();

    event.dataTransfer.dropEffect = 'move';

    const offsetX = event.clientX - this.dragfrom.x;
    const offsetY = event.clientY - this.dragfrom.y;

    const bstyle = this.block.dom.style;
    switch (this.dr) {
      case 'w': {
        bstyle.left = `${this.originalStyle.left + offsetX}px`;
        bstyle.width = `${this.originalStyle.width - offsetX}px`;
        break;
      }
      case 'e': {
        bstyle.width = `${this.originalStyle.width + offsetX}px`;
        break;
      }
      case 'n': {
        bstyle.top = `${this.originalStyle.top + offsetY}px`;
        bstyle.height = `${this.originalStyle.height - offsetY}px`;
        break;
      }
      case 's': {
        bstyle.height = `${this.originalStyle.height + offsetY}px`;
        break;
      }
      case 'nw': {
        bstyle.top = `${this.originalStyle.top + offsetY}px`;
        bstyle.height = `${this.originalStyle.height - offsetY}px`;
        bstyle.left = `${this.originalStyle.left + offsetX}px`;
        bstyle.width = `${this.originalStyle.width - offsetX}px`;
        break;
      }
      case 'ne': {
        bstyle.top = `${this.originalStyle.top + offsetY}px`;
        bstyle.height = `${this.originalStyle.height - offsetY}px`;
        bstyle.width = `${this.originalStyle.width + offsetX}px`;
        break;
      }
      case 'sw': {
        bstyle.height = `${this.originalStyle.height + offsetY}px`;
        bstyle.left = `${this.originalStyle.left + offsetX}px`;
        bstyle.width = `${this.originalStyle.width - offsetX}px`;
        break;
      }
      case 'se': {
        bstyle.height = `${this.originalStyle.height + offsetY}px`;
        bstyle.width = `${this.originalStyle.width + offsetX}px`;
        break;
      }
      default:
    }

    bstyle.width = `${Math.max(parseInt(bstyle.width), this.block.minsize.width)}px`;
    bstyle.height = `${Math.max(parseInt(bstyle.height), this.block.minsize.height)}px`;

    if (this.block.rearrange) {
      this.block.rearrange();
    }
  }
}

export default TransformerResizeAnchor;

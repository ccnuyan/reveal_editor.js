import Elements from './Elements';

import _u from './util';
import _config from './config';

/* eslint-disable no-param-reassign, radix */

class TransformerAnchor extends Elements {
  constructor({ parent, dr }) {
    const anchor = _u.create('div', 'anchor', _config.styles.anchor);
    anchor.setAttribute('data-direction', dr);

    super({ parent, el: anchor });

    this.dr = dr;
    this.parent.dom.appendChild(anchor);

    this.dom.setAttribute('draggable', true);
    _u.on(this.dom, 'dragstart', this.dragstart);
    _u.on(this.dom, 'dragover', this.do);

    _u.on(this.dom, 'click', this.onClick);
  }

  onClick = (event) => {
    event.stopPropagation();
  }

  do = (event) => {
    event.stopPropagation();
    this.parent.parent.parent.parent.draggingElement.dragover(event);
  }

  dragstart = (event) => {
    event.stopPropagation();

    // anchor.transformer.block.section.editor
    this.parent.parent.parent.parent.draggingMode = 'resize';
    this.parent.parent.parent.parent.draggingElement = this;

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setDragImage(_u.emptyDragImage, 0, 0);

    const blockStyle = getComputedStyle(this.parent.parent.dom);

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
  }

  dragover = (event) => {
    event.stopPropagation();

    event.dataTransfer.dropEffect = 'move';

    const offsetX = event.clientX - this.dragfrom.x;
    const offsetY = event.clientY - this.dragfrom.y;

    const bstyle = this.parent.parent.dom.style;
    switch (this.dr) {
      case 'e': {
        bstyle.left = `${this.originalStyle.left + offsetX}px`;
        bstyle.width = `${this.originalStyle.width - offsetX}px`;
        break;
      }
      case 'w': {
        bstyle.width = `${this.originalStyle.width + offsetX}px`;
        bstyle.right = `${this.originalStyle.right - offsetX}px`;
        break;
      }
      case 'n': {
        bstyle.top = `${this.originalStyle.top + offsetY}px`;
        bstyle.height = `${this.originalStyle.height - offsetY}px`;
        break;
      }
      case 's': {
        bstyle.bottom = `${this.originalStyle.bottom - offsetY}px`;
        bstyle.height = `${this.originalStyle.height + offsetY}px`;
        break;
      }
      case 'ne': {
        bstyle.top = `${this.originalStyle.top + offsetY}px`;
        bstyle.height = `${this.originalStyle.height - offsetY}px`;
        bstyle.left = `${this.originalStyle.left + offsetX}px`;
        bstyle.width = `${this.originalStyle.width - offsetX}px`;
        break;
      }
      case 'nw': {
        bstyle.top = `${this.originalStyle.top + offsetY}px`;
        bstyle.height = `${this.originalStyle.height - offsetY}px`;
        bstyle.width = `${this.originalStyle.width + offsetX}px`;
        bstyle.right = `${this.originalStyle.right - offsetX}px`;
        break;
      }
      case 'se': {
        bstyle.bottom = `${this.originalStyle.bottom - offsetY}px`;
        bstyle.height = `${this.originalStyle.height + offsetY}px`;
        bstyle.left = `${this.originalStyle.left + offsetX}px`;
        bstyle.width = `${this.originalStyle.width - offsetX}px`;
        break;
      }
      case 'sw': {
        bstyle.bottom = `${this.originalStyle.bottom - offsetY}px`;
        bstyle.height = `${this.originalStyle.height + offsetY}px`;
        bstyle.width = `${this.originalStyle.width + offsetX}px`;
        bstyle.right = `${this.originalStyle.right - offsetX}px`;
        break;
      }
      default:
    }
    bstyle.width = `${Math.max(parseInt(bstyle.width), this.parent.parent.minsize.width)}px`;
    bstyle.height = `${Math.max(parseInt(bstyle.height), this.parent.parent.minsize.height)}px`;

    if (this.parent.parent.rearrange) {
      this.parent.parent.rearrange();
    }
  }
}

export default TransformerAnchor;

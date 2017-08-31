import Elements from './Elements';

import _u from './util';
import _config from './config';

/* eslint-disable no-param-reassign, radix */

class TransformerResizeAnchor extends Elements {
  directionDegreeMap = {
    e: 0,
    ne: 45,
    n: 90,
    nw: 135,
    w: 180,
    sw: 225,
    s: 270,
    se: 315,
  };
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
    _u.on(this.dom, 'mouseenter', this.mouseenter);
    _u.on(this.dom, 'click', this.onClick);
  }

  onClick = (event) => {
    event.stopPropagation();
  }

  mouseenter = () => {
    Object.keys(this.directionDegreeMap).some((key) => {
      if ((Math.abs(this.directionDegreeMap[key] + this.block.state.transform - this.directionDegreeMap[this.dr])) % 360 < 25) {
        this.dom.style.cursor = `${key}-resize`;
        return true;
      }
      return false;
    });
  }

  // do = dargover, capture the event emmited by this dom elements
  do = (event) => {
    // redirect to the handler where the dragstart
    this.editor.draggingElement.dragover(event);
  }

  dragstart = (event) => {
    event.stopPropagation();

    // anchor.transformer.block.section.editor
    this.editor.draggingMode = 'resize';
    this.editor.draggingElement = this;

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setDragImage && event.dataTransfer.setDragImage(_u.emptyDragImage, 0, 0);

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
  }

  dragover = (event) => {
    event.stopPropagation();

    event.dataTransfer.dropEffect = 'move';

    const ox = event.clientX - this.dragfrom.x;
    const oy = event.clientY - this.dragfrom.y;

    // const oox = event.clientX - this.dragfrom.x;
    // const ooy = event.clientY - this.dragfrom.y;

    // const deg = Math.atan(ooy / oox);

    // const cos = Math.cos(deg - this.block.state.transform);
    // const sin = Math.sin(deg - this.block.state.transform);

    // const ox = oox * cos - ooy * sin;
    // const oy = oox * sin + ooy * cos;

    this.block[`resize_${this.dr}`]({ ox, oy, os: this.originalStyle });
  }
}

export default TransformerResizeAnchor;

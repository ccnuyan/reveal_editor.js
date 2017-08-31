import Elements from './Elements';

import _u from './util';
import _config from './config';

/* eslint-disable no-param-reassign, radix */

class TransformerAnchor extends Elements {
  R2D = 180 / Math.PI
  constructor({ parent }) {
    const anchor = _u.create('button', 'rotate-anchor', _config.styles.rotateAnchor);
    super({ parent, el: anchor });

    this.editor = this.parent.editor;
    this.block = this.parent.parent;

    this.parent.dom.appendChild(anchor);

    _u.setHTML(this.dom, '<i class="editing-ui icon-cw dead-center"></i>');

    this.dom.setAttribute('draggable', true);
    _u.on(this.dom, 'dragstart', this.dragstart);
    _u.on(this.dom, 'dragover', this.do);
    _u.on(this.dom, 'dragend', this.dragend);
    _u.on(this.dom, 'click', this.onClick);
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
    this.editor.draggingMode = 'rotate';
    this.editor.draggingElement = this;

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setDragImage && event.dataTransfer.setDragImage(_u.emptyDragImage, 0, 0);

    const blockStyle = getComputedStyle(this.parent.parent.dom);
    const originalStyle = {
      width: parseInt(blockStyle.width),
      height: parseInt(blockStyle.height),
    };

    this.center = {
      x: _u.offset(this.parent.parent.dom).left + (originalStyle.width / 2),
      y: _u.offset(this.parent.parent.dom).top + (originalStyle.height / 2),
    };

    this.dragfrom = {
      x: event.clientX,
      y: event.clientY,
    };

    const x1 = this.dragfrom.x - this.center.x;
    const y1 = this.dragfrom.y - this.center.y;

    this.startAng = -this.R2D * Math.atan2(y1, x1);
  }

  dragover = (event) => {
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'move';

    const x2 = event.x - this.center.x;
    const y2 = event.y - this.center.y;

    this.endAng = this.R2D * Math.atan2(y2, x2);
    const orgdegree = parseInt(this.parent.parent.getTransform());
    this.toRotate = orgdegree + this.endAng + this.startAng;

    this.parent.parent.setTransform(this.toRotate);
  }

  dragend = (event) => {
    event.stopPropagation();
    this.parent.parent.saveTransform(this.toRotate);
    console.log(this.block.state.transform);
  }
}

export default TransformerAnchor;

import Elements from './Elements';
import _u from './util';
/* eslint-disable no-param-reassign, radix */

class SectionArrangement extends Elements {
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

  initializeAnchors = () => {

  }

  createSection = ({ direction }) => {

  }

  batchMoveSection = ({ direction }) => {

  }

  moveSection = ({ direction }) => {

  }

  removeSection = () => {

  }
}

export default SectionArrangement;

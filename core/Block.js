import _ from 'lodash';
import _u from './util';
import config from './config';
import Transformer from './Transformer';
import BlockContent from './BlockContent';
import Elements from './Elements';

/* eslint-disable no-param-reassign, radix */

class Block extends Elements {
  anchorTypes = [];
  D2R = Math.PI / 180;
  state = { mode: 'previewing', transform: 0 };
  minsize = {
    width: 24,
    height: 24,
  };

  constructor({ parent, el }) {
    super({ parent, el });

    this.editor = parent.editor;
    this.section = this.parent;

    this.state.blockType = this.dom.dataset.blockType;

    const contentDom = this.dom.querySelector('div.sl-block>div.sl-block-content');

    this.blockContent = new BlockContent({
      parent: this,
      el: contentDom,
    });
  }

  afterInstanciated() {
    const transformerDom = _u.create('div', [config.classnames.transform, 'editing-ui'], config.styles.transform);
    this.dom.appendChild(transformerDom);

    this.blockTransformer = new Transformer({
      parent: this,
      el: transformerDom,
    });

    this.blockTransformer.hide();
    this.updateTransformMatrix();
  }

  getTs() {
    const blockStyle = getComputedStyle(this.dom);
    return {
      left: parseInt(blockStyle.left),
      top: parseInt(blockStyle.top),
      width: parseInt(blockStyle.width),
      height: parseInt(blockStyle.height),
    };
  }

  relocate_w({ os }) {
    const ts = this.getTs();
    const originx = os.width / 2;
    const originy = 0;

    const targetx = ts.width / 2;
    const targety = 0;

    this.relocate({ originx, originy, targetx, targety, os, ts });
  }

  relocate_e({ os }) {
    const ts = this.getTs();
    const originx = -os.width / 2;
    const originy = 0;

    const targetx = -ts.width / 2;
    const targety = 0;

    this.relocate({ originx, originy, targetx, targety, os, ts });
  }

  relocate_n({ os }) {
    const ts = this.getTs();
    const originx = 0;
    const originy = -os.height / 2;

    const targetx = 0;
    const targety = -ts.height / 2;

    this.relocate({ originx, originy, targetx, targety, os, ts });
  }

  relocate_s({ os }) {
    const ts = this.getTs();
    const originx = 0;
    const originy = os.height / 2;

    const targetx = 0;
    const targety = ts.height / 2;

    this.relocate({ originx, originy, targetx, targety, os, ts });
  }

  relocate_ne({ os }) {
    const ts = this.getTs();
    const originx = -os.width / 2;
    const originy = -os.height / 2;

    const targetx = -ts.width / 2;
    const targety = -ts.height / 2;

    this.relocate({ originx, originy, targetx, targety, os, ts });
  }

  relocate_nw({ os }) {
    const ts = this.getTs();
    const originx = os.width / 2;
    const originy = -os.height / 2;

    const targetx = ts.width / 2;
    const targety = -ts.height / 2;

    this.relocate({ originx, originy, targetx, targety, os, ts });
  }

  relocate_se({ os }) {
    const ts = this.getTs();
    const originx = -os.width / 2;
    const originy = os.height / 2;

    const targetx = -ts.width / 2;
    const targety = ts.height / 2;

    this.relocate({ originx, originy, targetx, targety, os, ts });
  }

  relocate_sw({ os }) {
    const ts = this.getTs();
    const originx = os.width / 2;
    const originy = os.height / 2;

    const targetx = ts.width / 2;
    const targety = ts.height / 2;

    this.relocate({ originx, originy, targetx, targety, os, ts });
  }

  relocate({ originx, originy, targetx, targety, os, ts }) {
    const m = this.state.transformMatrix;
    const intvx = -(ts.width - os.width) / 2;
    const intvy = (ts.height - os.height) / 2;

    const originxt = (m.m11 * originx) + (m.m12 * originy);
    const originyt = (m.m21 * originx) + (m.m22 * originy);

    const targetxt = (m.m11 * targetx) + (m.m12 * targety);
    const targetyt = (m.m21 * targetx) + (m.m22 * targety);

    const dx = (originxt + intvx) - targetxt;
    const dy = (originyt + intvy) - targetyt;

    this.dom.style.left = `${os.left + dx}px`;
    this.dom.style.top = `${os.top - dy}px`;
  }

  updateTransformMatrix() {
    this.state.transform = this.getTransform();
    const rd = this.state.transform * this.D2R;
    this.state.transformMatrix = {
      m11: Math.cos(rd),
      m12: Math.sin(rd),
      m21: -Math.sin(rd),
      m22: Math.cos(rd),
    };
  }

  getTransform = () => {
    if (this.dom.dataset.transform) {
      return parseInt(this.dom.dataset.transform);
    }
    return 0;
  };

  setTransform = (degree) => {
    const rd = Math.round(degree);
    this.dom.style.transform = `rotate(${rd}deg)`;
  }

  saveTransform = (degree) => {
    const rd = Math.round(degree);
    _u.setAttr(this.dom, 'data-transform', rd);
    this.updateTransformMatrix();
  }

  toEdit() {
    this.section.blocks.forEach((block) => {
      if (block.dom !== this.dom) {
        block.toPreview();
      }
    });
  }

  // when selected;
  toManipulate = () => {
    this.state.mode = 'manipulating';
    this.blockTransformer.show();
    this.editor.debouncedEventEmit();
  }

  toPreview = () => {
    if (this.beforeToPreview) {
      this.beforeToPreview();
    }
    this.state.mode = 'previewing';
    this.blockTransformer.hide();
    this.editor.debouncedEventEmit();
  }

  remove = () => {
    _.remove(this.section.blocks, { dom: this.dom });
    _u.remove(this.dom);
  }

  resize_w({ ox, os }) {
    this.dom.style.width = `${os.width - ox}px`;
  }

  resize_e({ ox, os }) {
    this.dom.style.width = `${os.width + ox}px`;
  }

  resize_n({ oy, os }) {
    this.dom.style.height = `${os.height - oy}px`;
  }

  resize_s({ oy, os }) {
    this.dom.style.height = `${os.height + oy}px`;
  }
}

export default Block;

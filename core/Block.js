import _ from 'lodash';
import _u from './util';
import config from './config';
import Transformer from './Transformer';
import BlockContent from './BlockContent';
import Elements from './Elements';

/* eslint-disable no-param-reassign, radix */

class Block extends Elements {
  constructor({ parent, el }) {
    super({ parent, el });
    this.blockType = el.dataset.blockType;

    this.editor = parent.editor;
    this.section = this.parent;

    this.state.mode = 'previewing';

    this.minsize = {
      width: 24,
      height: 24,
    };

    _u.findChildren(this.dom, config.selectors.content).forEach((dom) => {
      if (!this.blockContent) {
        this.blockContent = new BlockContent({
          parent: this,
          el: dom,
        });
      } else {
        _u.remove(dom);
      }
    });

    _u.findChildren(this.dom, config.selectors.transform).forEach((dom) => {
      _u.remove(dom);
    });

    this.dom.append(_u.create('div', [config.classnames.transform, 'editing-ui'], config.styles.transform));

    const transformer = _u.findChildren(this.dom, config.selectors.transform)[0];
    this.blockTransformer = new Transformer({
      parent: this,
      el: transformer,
    });

    this.blockTransformer.hide();

    this.D2R = Math.PI / 180;
    this.updateTransformMatrix();
  }

  updateTransformMatrix() {
    this.transform = this.getTransform();
    const rd = this.transform * this.D2R;
    this.transformMatrix = {
      m11: Math.cos(rd * this.D2R),
      m12: Math.sin(rd * this.D2R),
      m21: -Math.sin(rd * this.D2R),
      m22: Math.cos(rd * this.D2R),
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

  toEdit = () => {
    if (this.beforeToEdit) {
      this.beforeToEdit();
    }
    this.section.blocks.forEach((block) => {
      if (block.dom !== this.dom) {
        block.toPreview();
      }
    });
    this.state.mode = 'editing';
    this.blockTransformer.hide();
    this.editor.debouncedEventEmit();
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
}

export default Block;

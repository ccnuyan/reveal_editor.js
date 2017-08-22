import { expect } from 'chai';
import _ from 'lodash';
import _u from './util';
import _config from './config';
import Transformer from './Transformer';
import BlockContent from './BlockContent';
import Elements from './Elements';

/* eslint-disable no-param-reassign, radix */

class Block extends Elements {
  constructor({ parent, el }) {
    super({ parent, el });
    this.blockType = el.dataset.blockType;

    _u.findChildren(this.dom, _config.selectors.content).forEach((dom) => {
      if (!this.blockContent) {
        this.blockContent = new BlockContent({
          parent: this,
          el: dom,
        });
      } else {
        _u.remove(dom);
      }
    });

    _u.findChildren(this.dom, _config.selectors.transform).forEach((dom) => {
      _u.remove(dom);
    });

    this.dom.append(_u.create('div', [_config.classnames.transform, 'editing-ui'], _config.styles.transform));

    const transformer = _u.findChildren(this.dom, _config.selectors.transform)[0];
    this.blockTransformer = new Transformer({
      parent: this,
      el: transformer,
    });

    this.blockTransformer.hide();
  }

  setTransform = (degree) => {
    this.dom.style.transform = `rotate(${Math.round(degree)}deg)`;
  }

  saveTransform = (degree) => {
    _u.setAttr(this.dom, 'data-transform', Math.round(degree));
  }

  getTransform = () => {
    if (this.dom.dataset.transform) {
      return parseInt(this.dom.dataset.transform);
    }
    return 0;
  };

  toEdit = () => {
    this.parent.blocks.forEach((block) => {
      block.toPreview();
    });
    this.parent.parent.dom.setAttribute('draggable', false);

    this.mode = 'editing';
    expect(this.blockType).to.exist;

    switch (this.blockType) {
      case 'text': {
        this.blockContent.dom.setAttribute('contenteditable', 'true');
        let initiatedFlag = false;
        Object.keys(CKEDITOR.instances).some((name) => {
          const ariaLabel = this.blockContent.dom.getAttribute('aria-label');
          if (ariaLabel && ariaLabel.split(', ')[1] === name) {
            CKEDITOR.instances[name].focus();
            this.CKEDITORInstance = CKEDITOR.instances[name];
            initiatedFlag = true;
            return true;
          }
          return false;
        });
        if (!initiatedFlag) {
          this.CKEDITORInstance = CKEDITOR.inline(this.blockContent.dom, _config.ckeditorConfig);
        }
        _u.clearUserSelection();
        break;
      }
      case 'image': {
        break;
      }
      default:
    }
  }

  // when selected;
  toManipulate = () => {
    this.mode = 'manipulating';
    // no need to call toPreview() for other blocks, when select multiple blocks, for Example.

    this.blockTransformer.show();
  }

  toPreview = () => {
    this.mode = 'previewing';

    if (this.CKEDITORInstance) {
      this.CKEDITORInstance.destroy();
    }
    this.blockContent.dom.setAttribute('contenteditable', false);
    this.blockTransformer.hide();
  }

  remove = () => {
    // to be testify
    _.remove(this.parent.blocks, { dom: this.dom });
    _u.remove(this.dom);
  }
}

export default Block;

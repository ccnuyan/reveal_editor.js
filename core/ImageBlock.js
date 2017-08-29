import _u from './util';
import config from './config';
import Block from './Block';

/* eslint-disable no-param-reassign, radix */

class ImageBlock extends Block {

  anchorTypes = ['e', 'w', 'n', 's', 'ne', 'nw', 'se', 'sw'];

  constructor({ parent, el }) {
    super({ parent, el });
    this.image = this.blockContent.dom.querySelector('img');
    _u.applyStyle(this.image, config.styles.imageContentImage);
  }

  afterInstanciated() {
    super.afterInstanciated();
    _u.on(this.image, 'load', () => {
      this.state.desiredWidth = this.image.width;
      this.state.desiredHeight = this.image.height;
      this.dom.style.height = 'auto';
      this.image.style.display = 'block';
    });
  }

  resize_e({ os, ox, oy }) {
    super.resize_e({ os, ox, oy });
    const blockStyle = getComputedStyle(this.dom);
    this.dom.style.height = `${(parseInt(blockStyle.width) * this.state.desiredHeight) / this.state.desiredWidth}px`;
    this.relocate_e({ os });
  }

  resize_w({ os, ox, oy }) {
    super.resize_w({ os, ox, oy });
    const blockStyle = getComputedStyle(this.dom);
    this.dom.style.height = `${(parseInt(blockStyle.width) * this.state.desiredHeight) / this.state.desiredWidth}px`;
    this.relocate_w({ os });
  }

  resize_n({ os, ox, oy }) {
    super.resize_n({ os, ox, oy });
    const blockStyle = getComputedStyle(this.dom);
    this.dom.style.width = `${(parseInt(blockStyle.height) * this.state.desiredWidth) / this.state.desiredHeight}px`;
    this.relocate_n({ os });
  }

  resize_s({ os, ox, oy }) {
    super.resize_s({ os, ox, oy });
    const blockStyle = getComputedStyle(this.dom);
    this.dom.style.width = `${(parseInt(blockStyle.height) * this.state.desiredWidth) / this.state.desiredHeight}px`;
    this.relocate_s({ os });
  }

  resize_ne({ os, ox, oy }) {
    this.resize_n({ os, ox, oy });
    this.relocate_ne({ os });
  }

  resize_nw({ os, ox, oy }) {
    this.resize_n({ os, ox, oy });
    this.relocate_nw({ os });
  }

  resize_se({ os, ox, oy }) {
    this.resize_s({ os, ox, oy });
    this.relocate_se({ os });
  }

  resize_sw({ os, ox, oy }) {
    this.resize_s({ os, ox, oy });
    this.relocate_sw({ os });
  }

  getState = () => {
    const style = getComputedStyle(this.image);
    return {
      ...this.state,
      src: _u.getAttribute(this.image, 'src'),
      borderWidth: style.borderWidth,
      borderStyle: style.borderStyle,
      borderColor: style.borderColor,
      zIndex: style.zIndex === 'auto' ? 0 : style.zIndex,
    };
  }

  setState = (params) => {
    Object.keys(params).forEach((key) => {
      if (key === 'src') {
        this.image.style[key] = params[key];
      } else {
        this.dom.style[key] = params[key];
      }
    });
  }

  beforeToEdit = () => {
    super.toEdit();
    this.editor.emitter.emit('editorRequestEditImage', {
      currentSection: this.editor.currentSection,
      block: this,
      state: this.getState(),
    });
  }
}

export default ImageBlock;

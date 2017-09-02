import _u from './util';
import config from './config';
import Block from './Block';
import DDMRR from './ddmrr';

/* eslint-disable no-param-reassign, radix */

class ImageBlock extends Block {

  anchorTypes = ['e', 'w', 'n', 's', 'ne', 'nw', 'se', 'sw'];

  constructor({ parent, el }) {
    super({ parent, el });
    this.image = this.blockContent.dom.querySelector('img');
    _u.applyStyle(this.image, config.styles.imageContentImage);

    _u.on(this.image, 'load', () => {
      this.state.desiredWidth = this.image.width;
      this.state.desiredHeight = this.image.height;
      this.dom.style.height = 'auto';
      this.image.style.display = 'block';
    });
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

  toManipulate() {
    super.toManipulate();
    this.ddmrr = new DDMRR(this.dom, this.editor.reveal, {
      resize: {
        key: 'resize',
        enable: true,
        preserveAspectRatio: true,
        anchors: ['n', 'e', 's', 'w', 'ne', 'se', 'nw', 'sw'],
      },
    });
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

  toEdit() {
    super.toEdit();
    this.editor.emitter.emit('editorRequestEditImage', {
      currentSection: this.editor.currentSection,
      block: this,
      state: this.getState(),
    });
  }
}

export default ImageBlock;

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

  getState() {
    const style = getComputedStyle(this.dom);

    return {
      ...this.state,
      src: _u.getAttribute(this.image, 'src'),
      borderWidth: this.getLength(style.borderTopWidth),
      borderStyle: this.getBorderStyle(style.borderTopStyle),
      borderColor: this.getColor(style.borderTopColor),
      zIndex: this.getZIndex(style.zIndex),
    };
  }

  setState(params) {
    Object.keys(params).forEach((key) => {
      if (key === 'src') {
        this.image.style[key] = params[key];
      } else {
        this.dom.style[key] = params[key];
      }
    });

    return this.getState();
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

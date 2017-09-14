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

    const state = {
      ...this.state,
      src: _u.getAttribute(this.image, 'src'),
      borderWidth: this.getLength(style.borderTopWidth),
      borderStyle: this.getBorderStyle(style.borderTopStyle),
      borderColor: this.getColor(style.borderTopColor),
      zIndex: this.getZIndex(style.zIndex),
    };

    return state;
  }

  setState(params) {
    Object.keys(params).forEach((key) => {
      if (key === 'src') {
        this.image.style[key] = params[key];
      } else {
        this.dom.style[key] = params[key];
      }
    });

    this.ddmrr && this.ddmrr.relocateDom();
    return this.getState();
  }

  toManipulate() {
    this.ddmrr = new DDMRR(this.dom, this.editor.reveal, {
      resize: {
        key: 'resize',
        enable: true,
        preserveAspectRatio: true,
        anchors: ['n', 'e', 's', 'w', 'ne', 'se', 'nw', 'sw'],
      },
    });
    super.toManipulate();
  }
}

export default ImageBlock;

import { expect } from 'chai';
import _u from './util';
import config from './config';
import Block from './Block';

/* eslint-disable no-param-reassign, radix */

class ImageBlock extends Block {
  constructor({ parent, el }) {
    super({ parent, el });

    this.minsize = {
      width: 36,
      height: 36,
    };

    this.image = this.blockContent.dom.querySelector('img');

    _u.on(this.image, 'load', () => {
      this.desiredWidth = this.image.width;
      this.desiredHeight = this.image.height;

      this.rearrange();
    });
  }
  toEdit() {
    super.toEdit();
  }

  rearrange = () => {
    const bstyle = this.dom.style;

    if (this.desiredWidth * parseInt(bstyle.height) < this.desiredHeight * parseInt(bstyle.width)) {
      _u.applyStyle(this.image, config.styles.imageContentImageTall);
    } else {
      _u.applyStyle(this.image, config.styles.imageContentImageWide);

      // here is a scale transform, and don't ask me why.
      const bw = parseInt(bstyle.width);
      const bh = parseInt(bstyle.height);
      const dw = this.desiredWidth;
      const dh = this.desiredHeight;

      this.image.style.marginTop = `${(bh / 2) - (((dh * bw) / dw) / 2)}px`;
    }
  }
}

export default ImageBlock;

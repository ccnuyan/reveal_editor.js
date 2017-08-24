import _u from './util';
import config from './config';
import Block from './Block';

/* eslint-disable no-param-reassign, radix */

class ImageBlock extends Block {
  constructor({ parent, el }) {
    super({ parent, el });

    this.state.blockType = 'image';

    this.image = this.blockContent.dom.querySelector('img');

    _u.on(this.image, 'load', () => {
      this.desiredWidth = this.image.width;
      this.desiredHeight = this.image.height;

      this.rearrange();
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

  setState = (params) => {
    Object.keys(params).forEach((key) => {
      if (key.startsWith('border') || key === 'src') {
        this.image.style[key] = params[key];
      } else {
        this.dom.style[key] = params[key];
      }
    });

    this.rearrange();
  }

  beforeToEdit = () => {
    this.editor.emitter.emit('editorRequestEditImage', {
      currentSection: this.editor.currentSection,
      block: this,
      state: this.getState(),
    });
  }

  rearrange = () => {
    const bstyle = getComputedStyle(this.dom);
    const istyle = getComputedStyle(this.image);

    if (this.desiredWidth * parseInt(bstyle.height) < this.desiredHeight * parseInt(bstyle.width)) {
      _u.applyStyle(this.image, config.styles.imageContentImageTall);
      this.image.style.marginTop = '0px';
    } else {
      _u.applyStyle(this.image, config.styles.imageContentImageWide);

      // here is a scale transform, and don't ask me why.
      const bw = parseInt(bstyle.width);
      const bh = parseInt(bstyle.height);
      const ibw = parseInt(istyle.borderWidth);
      const dw = this.desiredWidth;
      const dh = this.desiredHeight;

      this.image.style.marginTop = `${(bh / 2) - (((dh * bw) / dw) / 2) - (ibw / 2)}px`;
    }
  }
}

export default ImageBlock;

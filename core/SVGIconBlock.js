import Block from './Block';
import DDMRR from './ddmrr';

/* eslint-disable no-param-reassign, radix, import/no-unresolved */
class SVGIconBlock extends Block {

  anchorTypes = ['e', 'w', 'n', 's', 'ne', 'nw', 'se', 'sw'];

  constructor({ parent, el }) {
    super({ parent, el });

    this.blockContent.dom.style.width = '100%';
    this.blockContent.dom.style.height = '100%';

    this.draw = this.blockContent.dom.querySelector('svg');
    this.draw.setAttribute('width', '100%');
    this.draw.setAttribute('height', '100%');
  }

  getState = () => {
    const style = getComputedStyle(this.draw);
    return {
      ...this.state,
      fill: this.getColor(style.fill),
    };
  }

  setState = (params) => {
    if (params.fill) {
      this.state.fill = params.fill;
      this.draw.setAttribute('fill', this.state.fill);
      Array.prototype.forEach.call(this.dom.querySelectorAll('svg>path'), (path) => {
        path.removeAttribute('fill');
      });
    }

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

export default SVGIconBlock;

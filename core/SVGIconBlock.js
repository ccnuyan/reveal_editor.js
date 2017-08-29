import Block from './Block';
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


    this.state.fill = this.draw.getAttribute('fill');
  }
  getState = () => {
    return this.state;
  }

  setState = (params) => {
    if (params.fill) {
      this.state.fill = params.fill;
      this.draw.setAttribute('fill', this.state.fill);
    }
  }

  resize_e({ os, ox, oy }) {
    super.resize_e({ os, ox, oy });
    this.relocate_e({ os });
  }

  resize_w({ os, ox, oy }) {
    super.resize_w({ os, ox, oy });
    this.relocate_w({ os });
  }

  resize_n({ os, ox, oy }) {
    super.resize_n({ os, ox, oy });
    this.relocate_n({ os });
  }

  resize_s({ os, ox, oy }) {
    super.resize_s({ os, ox, oy });
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
}

export default SVGIconBlock;

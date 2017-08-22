import Block from './Block';
import _u from './util';

import eye from './svgLib/eye.svg';


/* eslint-disable no-param-reassign, radix */

class SVGIconBlock extends Block {

  static svgMap = {
    eye,
  }

  constructor({ parent, el, icon }) {
    super({ parent, el });
    this.icon = icon;

    this.minsize = {
      width: 20,
      height: 20,
    };

    this.blockContent.dom.style.width = '100%';
    this.blockContent.dom.style.height = '100%';

    this.fill = 'rgba(0,0,0,1)';

    _u.setHTML(this.blockContent.dom, SVGIconBlock.svgMap[icon]);
    this.svgIcon = this.blockContent.dom.querySelector('svg');
    _u.setAttr(this.svgIcon, 'width', '100%');
    _u.setAttr(this.svgIcon, 'height', '100%');
    _u.setAttr(this.svgIcon, 'fill', this.fill);
  }

  setFill = ({ fill }) => {
    this.fill = fill;
    _u.setAttr(this.svgIcon, 'fill', this.fill);
  }
}

export default SVGIconBlock;

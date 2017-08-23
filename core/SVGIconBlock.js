import Block from './Block';
import _u from './util';

/* eslint-disable no-param-reassign, radix, import/no-unresolved */
import eye from './svgLib/eye.svg';


class SVGIconBlock extends Block {

  static svgMap = {
    eye,
  }

  constructor({ parent, el }) {
    super({ parent, el });

    this.state.blockType = 'icon';

    this.minsize = {
      width: 20,
      height: 20,
    };
    this.blockContent.dom.style.width = '100%';
    this.blockContent.dom.style.height = '100%';
    this.state.fill = 'rgba(0,0,0,1)';
  }

  load({ icon }) {
    this.state.icon = icon;

    _u.setHTML(this.blockContent.dom, SVGIconBlock.svgMap[icon]);
    this.svgIcon = this.blockContent.dom.querySelector('svg');
    _u.setAttr(this.svgIcon, 'width', '100%');
    _u.setAttr(this.svgIcon, 'height', '100%');
    _u.setAttr(this.svgIcon, 'fill', this.state.fill);
  }

  setFill = ({ fill }) => {
    this.state.fill = fill;
    _u.setAttr(this.svgIcon, 'fill', this.state.fill);
  }

  getState = () => {
    return this.state;
  }

  setState = (params) => {
    if (params.icon) {
      this.load({ icon: params.icon });
    }
    if (params.fill) {
      this.setFill({ fill: params.fill });
    }
  }
}

export default SVGIconBlock;

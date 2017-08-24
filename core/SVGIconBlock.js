import Block from './Block';
import _u from './util';
import svgMap from './svglib/svgMap';
/* eslint-disable no-param-reassign, radix, import/no-unresolved */


class SVGIconBlock extends Block {
  constructor({ parent, el }) {
    super({ parent, el });

    this.state.blockType = 'icon';

    this.editor = this.parent.editor;

    this.blockContent.dom.style.width = '100%';
    this.blockContent.dom.style.height = '100%';

    const theme = this.editor.services.theme.getTheme();
    this.state.fill = theme.icon.fill;
  }

  load({ icon }) {
    this.state.icon = icon;

    _u.setHTML(this.blockContent.dom, svgMap[icon]);
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

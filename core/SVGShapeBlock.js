import Block from './Block';

/* eslint-disable no-param-reassign, radix */

class SVGShapeBlock extends Block {
  anchorTypes = ['e', 'w', 'n', 's', 'ne', 'nw', 'se', 'sw'];
  constructor({ parent, el }) {
    super({ parent, el });

    this.blockContent.dom.style.width = '100%';
    this.blockContent.dom.style.height = '100%';

    this.state.shape = this.dom.dataset.svgShape;

    this.draw = this.blockContent.dom.querySelector('svg');
    this.svgShape = this.draw.querySelector(this.state.shape);

    this.state.stroke = this.svgShape.getAttribute('stroke');
    this.state.fill = this.svgShape.getAttribute('fill');
    this.state.strokeWidth = parseInt(this.svgShape.getAttribute('stroke-width'));
  }

  setStoke({ stroke }) {
    this.state.stroke = stroke;
    this.svgShape.setAttribute('stroke', stroke);
  }

  setStrokeWidth({ strokeWidth }) {
    this.state.strokeWidth = strokeWidth;
    this.svgShape.setAttribute('stroke-width', strokeWidth);
    this.rearrange();
  }

  setFill({ fill }) {
    this.state.fill = fill;
    this.svgShape.setAttribute('fill', fill);
  }

  resize_e({ os, ox, oy }) {
    super.resize_e({ os, ox, oy });
    this.relocate_e({ os });
    this.rearrange();
  }

  resize_w({ os, ox, oy }) {
    super.resize_w({ os, ox, oy });
    this.relocate_w({ os });
    this.rearrange();
  }

  resize_n({ os, ox, oy }) {
    super.resize_n({ os, ox, oy });
    this.relocate_n({ os });
    this.rearrange();
  }

  resize_s({ os, ox, oy }) {
    super.resize_s({ os, ox, oy });
    this.relocate_s({ os });
    this.rearrange();
  }

  resize_ne({ os, ox, oy }) {
    this.resize_n({ os, ox, oy });
    this.relocate_ne({ os });
    this.rearrange();
  }

  resize_nw({ os, ox, oy }) {
    this.resize_n({ os, ox, oy });
    this.relocate_nw({ os });
    this.rearrange();
  }

  resize_se({ os, ox, oy }) {
    this.resize_s({ os, ox, oy });
    this.relocate_se({ os });
    this.rearrange();
  }

  resize_sw({ os, ox, oy }) {
    this.resize_s({ os, ox, oy });
    this.relocate_sw({ os });
    this.rearrange();
  }

  rearrange() {
    const style = getComputedStyle(this.dom);

    const styleWH = {
      width: parseInt(style.width),
      height: parseInt(style.height),
    };

    const sw = this.state.strokeWidth;

    switch (this.state.shape) {
      case 'rect': {
        this.svgShape.setAttribute('width', styleWH.width - sw);
        this.svgShape.setAttribute('height', styleWH.height - sw);
        this.svgShape.setAttribute('cx', styleWH.width / 2);
        this.svgShape.setAttribute('cy', styleWH.height / 2);
        break;
      }
      case 'circle': {
        this.svgShape.setAttribute('r', (Math.min(styleWH.height, styleWH.width) - sw) / 2);
        this.svgShape.setAttribute('cx', styleWH.width / 2);
        this.svgShape.setAttribute('cy', styleWH.height / 2);
        break;
      }
      case 'ellipse': {
        this.svgShape.setAttribute('rx', (styleWH.width - sw) / 2);
        this.svgShape.setAttribute('ry', (styleWH.height - sw) / 2);
        this.svgShape.setAttribute('cx', styleWH.width / 2);
        this.svgShape.setAttribute('cy', styleWH.height / 2);
        break;
      }
      default:
    }
  }

  getState() {
    return this.state;
  }

  setState(params) {
    if (params.stroke) {
      this.setStoke(params);
    }
    if (params.strokeWidth) {
      this.setStrokeWidth(params);
    }
    if (params.fill) {
      this.setFill(params);
    }
  }
}

export default SVGShapeBlock;

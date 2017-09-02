import Block from './Block';
import DDMRR from './ddmrr';

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

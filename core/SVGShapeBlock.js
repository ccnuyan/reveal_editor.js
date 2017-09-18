import Block from './Block';
import DDMRR from './ddmrr';

/* eslint-disable no-param-reassign, radix */

const ratioShapes = ['square', 'circle'];

const keySvgTagMap = {
  square: 'rect',
  rect: 'rect',
  circle: 'circle',
  ellipse: 'ellipse',
};

class SVGShapeBlock extends Block {
  anchorTypes = ['e', 'w', 'n', 's', 'ne', 'nw', 'se', 'sw'];
  constructor({ parent, el }) {
    super({ parent, el });

    this.blockContent.dom.style.width = '100%';
    this.blockContent.dom.style.height = '100%';

    this.state.shape = this.dom.getAttribute('data-svg-shape');

    this.draw = this.blockContent.dom.querySelector('svg');
    this.svgShape = this.draw.querySelector(keySvgTagMap[this.state.shape]);
  }

  setStoke({ stroke }) {
    this.svgShape.setAttribute('stroke', stroke);
  }

  setStrokeWidth({ strokeWidth }) {
    this.svgShape.setAttribute('stroke-width', strokeWidth);
    this.rearrange();
  }

  setFill({ fill }) {
    this.svgShape.setAttribute('fill', fill);
  }

  toManipulate() {
    this.ddmrr = new DDMRR(this.dom, this.editor.reveal, {
      resize: {
        key: 'resize',
        enable: true,
        preserveAspectRatio: ratioShapes.indexOf(this.state.shape) >= 0,
        anchors: ['n', 'e', 's', 'w', 'ne', 'se', 'nw', 'sw'],
      },
    });

    this.ddmrr.emitter.on('resize_going', () => {
      this.rearrange();
    });
    super.toManipulate();
  }

  rearrange() {
    const state = this.getState();

    const sw = state.strokeWidth;

    switch (state.shape) {
      case 'square': {
        this.svgShape.setAttribute('width', this.dom.offsetWidth - 2);
        this.svgShape.setAttribute('height', this.dom.offsetHeight - 2);
        this.svgShape.setAttribute('x', 1);
        this.svgShape.setAttribute('y', 1);
        break;
      }
      case 'rect': {
        this.svgShape.setAttribute('width', this.dom.offsetWidth - 2);
        this.svgShape.setAttribute('height', this.dom.offsetHeight - 2);
        this.svgShape.setAttribute('x', 1);
        this.svgShape.setAttribute('y', 1);
        break;
      }
      case 'circle': {
        this.svgShape.setAttribute('r', (Math.min(this.dom.offsetHeight, this.dom.offsetWidth) - sw) / 2);
        this.svgShape.setAttribute('cx', this.dom.offsetWidth / 2);
        this.svgShape.setAttribute('cy', this.dom.offsetHeight / 2);
        break;
      }
      case 'ellipse': {
        this.svgShape.setAttribute('rx', (this.dom.offsetWidth - sw) / 2);
        this.svgShape.setAttribute('ry', (this.dom.offsetHeight - sw) / 2);
        this.svgShape.setAttribute('cx', this.dom.offsetWidth / 2);
        this.svgShape.setAttribute('cy', this.dom.offsetHeight / 2);
        break;
      }
      default:
    }
  }

  getState() {
    const style = getComputedStyle(this.svgShape);
    const domStyle = getComputedStyle(this.dom);
    const state = {
      ...this.state,
      fill: this.getColor(style.fill),
      stroke: this.getColor(style.stroke),
      strokeWidth: this.getLength(style.strokeWidth),
      zIndex: this.getZIndex(domStyle.zIndex),
    };

    return state;
  }

  setState(params) {
    Object.keys(params).forEach((key) => {
      if (key === 'stroke') {
        this.setStoke({ stroke: params.stroke });
      } else if (key === 'strokeWidth') {
        this.setStrokeWidth({ strokeWidth: params.strokeWidth });
      } else if (key === 'fill') {
        this.setFill({ fill: params.fill });
      } else {
        this.dom.style[key] = params[key];
      }
    });

    this.ddmrr && this.ddmrr.relocateDom();
    return this.getState();
  }
}

export default SVGShapeBlock;

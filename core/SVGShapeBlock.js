import SVG from 'svg.js';
import Block from './Block';

/* eslint-disable no-param-reassign, radix */

class SVGShapeBlock extends Block {
  constructor({ parent, el, shape }) {
    super({ parent, el });
    this.shape = shape;

    this.minsize = {
      width: 20,
      height: 20,
    };

    this.blockContent.dom.style.width = '100%';
    this.blockContent.dom.style.height = '100%';

    this.svgConfig = {
      strokeWidth: 20,
      stroke: 'rgba(0,0,0,1)',
      fill: 'rgba(0,0,0,0)',
    };


    this.draw = SVG(this.blockContent.dom).size('100%', '100%');
    this.svgShape = this.getShape().attr({
      ...this.svgConfig,
      'stroke-width': `${this.svgConfig.strokeWidth}px`,
    });
  }

  setStoke({ stroke }) {
    this.svgConfig.stroke = stroke;
    this.svgShape.attr({ stroke });
  }

  setStrokeWidth({ strokeWidth }) {
    this.svgConfig.strokeWidth = strokeWidth;
    this.svgShape.attr({ 'stroke-width': strokeWidth });
    this.rearrange();
  }

  setfill({ fill }) {
    this.svgConfig.fill = fill;
    this.svgShape.attr({ fill });
  }

  getShape() {
    switch (this.shape) {
      case 'Rect': {
        return this.draw.rect(200 - this.svgConfig.strokeWidth, 200 - this.svgConfig.strokeWidth).center(100, 100);
      }
      case 'Circle': {
        return this.draw.circle(200 - this.svgConfig.strokeWidth).center(100, 100);
      }
      case 'Ellipse': {
        return this.draw.ellipse(200 - this.svgConfig.strokeWidth, 200 - this.svgConfig.strokeWidth).center(100, 100);
      }
      default:
        return null;
    }
  }

  rearrange() {
    const style = this.dom.style;
    switch (this.shape) {
      case 'Rect': {
        this.svgShape.size(parseInt(style.width) - this.svgConfig.strokeWidth, parseInt(style.height) - this.svgConfig.strokeWidth);
        break;
      }
      case 'Circle': {
        this.svgShape.size(Math.min(parseInt(style.width) - this.svgConfig.strokeWidth, parseInt(style.height) - this.svgConfig.strokeWidth));
        this.svgShape.center(parseInt(style.width) / 2, parseInt(style.height) / 2);
        break;
      }
      case 'Ellipse': {
        this.svgShape.size(parseInt(style.width) - this.svgConfig.strokeWidth, parseInt(style.height) - this.svgConfig.strokeWidth);
        this.svgShape.center(parseInt(style.width) / 2, parseInt(style.height) / 2);
        break;
      }
      default:
    }
  }
}

export default SVGShapeBlock;

import SVG from 'svg.js';
import Block from './Block';

/* eslint-disable no-param-reassign, radix */

class SVGShapeBlock extends Block {
  constructor({ parent, el }) {
    super({ parent, el });

    this.state.blockType = 'shape';

    this.blockContent.dom.style.width = '100%';
    this.blockContent.dom.style.height = '100%';

    this.state.strokeWidth = 3;
    const theme = this.editor.services.theme.getTheme();
    this.state.stroke = theme.stroke;
    this.state.fill = 'rgba(0,0,0,0)';

    this.draw = SVG(this.blockContent.dom).size('100%', '100%');
  }

  load({ shape }) {
    this.state.shape = shape;

    this.svgShape = this.getShape().attr({
      ...this.state,
      'stroke-width': `${this.state.strokeWidth}px`,
    });
  }

  setStoke({ stroke }) {
    this.state.stroke = stroke;
    this.svgShape.attr({ stroke });
  }

  setStrokeWidth({ strokeWidth }) {
    this.state.strokeWidth = strokeWidth;
    this.svgShape.attr({ 'stroke-width': strokeWidth });
    this.rearrange();
  }

  setFill({ fill }) {
    this.state.fill = fill;
    this.svgShape.attr({ fill });
  }

  getShape() {
    const sw = this.state.strokeWidth;

    switch (this.state.shape) {
      case 'Rect': {
        return this.draw.rect(200 - sw, 200 - sw).center(100, 100);
      }
      case 'Circle': {
        return this.draw.circle(200 - sw).center(100, 100);
      }
      case 'Ellipse': {
        return this.draw.ellipse(200 - sw, 200 - sw).center(100, 100);
      }
      default:
        return null;
    }
  }

  rearrange() {
    const style = getComputedStyle(this.dom);
    const sw = this.state.strokeWidth;
    switch (this.state.shape) {
      case 'Rect': {
        this.svgShape.size(parseInt(style.width) - sw, parseInt(style.height) - sw);
        this.svgShape.center(parseInt(style.width) / 2, parseInt(style.height) / 2);
        break;
      }
      case 'Circle': {
        this.svgShape.size(Math.min(parseInt(style.width) - sw, parseInt(style.height) - sw));
        this.svgShape.center(parseInt(style.width) / 2, parseInt(style.height) / 2);
        break;
      }
      case 'Ellipse': {
        this.svgShape.size(parseInt(style.width) - sw, parseInt(style.height) - sw);
        this.svgShape.center(parseInt(style.width) / 2, parseInt(style.height) / 2);
        break;
      }
      default:
    }
  }

  getState = () => {
    return this.state;
  }

  setState = (params) => {
    if (params.shape) {
      this.load({ shape: params.shape });
    }
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

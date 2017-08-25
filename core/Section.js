import _ from 'lodash';
import _u from './util';
import config from './config';
import Elements from './Elements';
import TextBlock from './TextBlock';
import ImageBlock from './ImageBlock';
import SVGShapeBlock from './SVGShapeBlock';
import SVGIconBlock from './SVGIconBlock';
import KatexBlock from './KatexBlock';
import SectionArrangement from './SectionArrangement';
import Axis from './Axis';

/* eslint-disable no-param-reassign, radix */

class Section extends Elements {
  // block type to Element Type
  static map = {
    text: TextBlock,
    image: ImageBlock,
    shape: SVGShapeBlock,
    icon: SVGIconBlock,
  }

  constructor({ parent, el }) {
    super({ parent, el });

    this.editor = parent;
    this.blocks = new Set([]);

    // re-paint the axis
    this.axis = new Axis({ section: this });

    _u.findChildren(this.dom, '.sl-block').forEach((block) => {
      this.blocks.add(new (Section.map[block.dataset.blockType])(
        {
          parent: this,
          el: block,
        },
      ));
    });
  }

  afterInitialize = () => {
    this.arrangment = new SectionArrangement({ parent: this });
  }

  getNewBlock = (type, content) => {
    const blockDiv = _u.create('div', 'sl-block', config.styles[`${type}Block`]);

    blockDiv.setAttribute('data-block-type', type);
    blockDiv.appendChild(content);

    this.dom.appendChild(blockDiv);

    const block = new (Section.map[type])({
      parent: this,
      el: blockDiv,
    });

    return block;
  }

  getState = () => {
    const selectedBlocks = [];

    this.getSelectedBlocks().forEach((block) => {
      selectedBlocks.push(block.getState());
    });
    return {
      ...this.state,
      backgroundColor: this.dom.dataset.backgroundColor ? this.dom.dataset.backgroundColor : 'transparent',
      selectedBlocks,
    };
  }

  setState = ({ backgroundColor }) => {
    if (backgroundColor) {
      this.dom.dataset.backgroundColor = backgroundColor;
    }
    window.Reveal.sync();
  }

  beforeAdd = () => {
    this.parent.services.undoredo.enqueue();
    this.blocks.forEach((block) => {
      block.toPreview();
    });
  }

  afterAdd = (block) => {
    this.blocks.add(block);
    this.parent.currentBlock = block;
    block.toManipulate();
  }

  addText = () => {
    this.beforeAdd();

    const content = _u.create('div', config.classnames.content);
    const paragraph = _u.create('p');
    paragraph.textContent = '输入文本内容';
    content.appendChild(paragraph);
    this.dom.appendChild(content);
    const textBlock = this.getNewBlock('text', content);

    this.afterAdd(textBlock);
  }

  addImage({ imageUrl }) {
    this.beforeAdd();
    const content = _u.create('div', config.classnames.content, config.styles.imageContent);
    const image = _u.create('img', [], {});
    content.appendChild(image);

    if (imageUrl) {
      image.setAttribute('src', imageUrl);
      image.setAttribute('alt', '');
    }
    const imageblock = this.getNewBlock('image', content);

    this.afterAdd(imageblock);
  }

  addSVGShape = ({ shape }) => {
    this.beforeAdd();

    const content = _u.create('div', config.classnames.content);
    this.dom.appendChild(content);
    const blockDiv = _u.create('div', 'sl-block', config.styles.shapeBlock);
    blockDiv.setAttribute('data-block-type', 'shape');
    blockDiv.appendChild(content);

    this.dom.appendChild(blockDiv);

    const svgBlock = new SVGShapeBlock({
      parent: this,
      el: blockDiv,
    });

    svgBlock.load({ shape });

    this.afterAdd(svgBlock);
  }

  addLatex = ({ latex }) => {
    this.beforeAdd();

    const content = _u.create('div', config.classnames.content);
    this.dom.appendChild(content);
    const blockDiv = _u.create('div', 'sl-block', config.styles.latexBlock);
    blockDiv.setAttribute('data-block-type', 'katex');
    blockDiv.appendChild(content);

    this.dom.appendChild(blockDiv);

    const ktBLock = new KatexBlock({
      parent: this,
      el: blockDiv,
    });

    ktBLock.load({ latex });

    this.afterAdd(ktBLock);
  }

  addSVGIcon = ({ icon }) => {
    this.beforeAdd();

    const content = _u.create('div', config.classnames.content);
    this.dom.appendChild(content);
    const blockDiv = _u.create('div', 'sl-block', config.styles.shapeBlock);
    blockDiv.setAttribute('data-block-type', 'shape');
    blockDiv.appendChild(content);

    this.dom.appendChild(blockDiv);

    const svgBlock = new SVGIconBlock({
      parent: this,
      el: blockDiv,
    });

    svgBlock.load({ icon });

    this.afterAdd(svgBlock);
  }

  removeSelectedBlocks() {
    this.parent.services.undoredo.enqueue();
    const toBeRemoved = [];
    this.blocks.forEach((block) => {
      if (block.state.mode === 'manipulating') {
        toBeRemoved.push(block);
      }
    });

    toBeRemoved.forEach((block) => {
      block.remove();
    });
  }

  getSelectedBlocks() {
    return _.filter([...this.blocks], { state: { mode: 'manipulating' } });
  }

  toPreview() {
    this.blocks.forEach((block) => {
      block.toPreview();
    });
    this.axis.hide();
    this.arrangment.addButtons.forEach((dom) => {
      dom.style.display = 'none';
    });
  }

  toEdit = () => {
    this.axis.show();
    this.arrangment.addButtons.forEach((dom) => {
      dom.style.display = 'bock';
    });
  }
}

export default Section;

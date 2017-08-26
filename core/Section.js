import _ from 'lodash';
import _u from './util';
import config from './config';
import Elements from './Elements';
import TextBlock from './TextBlock';
import ImageBlock from './ImageBlock';
import LatexBlock from './LatexBlock';
import SVGShapeBlock from './SVGShapeBlock';
import SVGIconBlock from './SVGIconBlock';
import SectionArrangement from './SectionArrangement';
import Axis from './Axis';

/* eslint-disable no-param-reassign, radix */

class Section extends Elements {
  // block type to Element Type
  static map = {
    text: TextBlock,
    image: ImageBlock,
    latex: LatexBlock,
    shape: SVGShapeBlock,
    icon: SVGIconBlock,
  }

  constructor({ parent, el }) {
    super({ parent, el });
    this.editor = parent;
    this.blocks = new Set([]);

    _u.findChildren(this.dom, '.sl-block').forEach((block) => {
      const BlockType = Section.map[block.dataset.blockType];
      this.blocks.add(new BlockType({
        parent: this,
        el: block,
      }));
    });
  }

  afterInstanciated = () => {
    this.axis = new Axis({ section: this });
    this.arrangment = new SectionArrangement({ parent: this });

    this.blocks.forEach((block) => {
      block.afterInstanciated();
    });
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

  undo_point = () => {
    // this.parent.services.undoredo.enqueue();
  }

  addText = () => {
    this.undo_point();

    const paragraph = _u.create('p');
    paragraph.textContent = '输入文本内容';

    const content = _u.create('div', config.classnames.content);
    content.appendChild(paragraph);

    const blockDiv = _u.create('div', 'sl-block', config.styles.textBlock);
    blockDiv.setAttribute('data-block-type', 'text');
    blockDiv.appendChild(content);

    this.dom.appendChild(blockDiv);

    this.editor.reload({});
  }

  addImage({ imageUrl }) {
    this.undo_point();

    const image = _u.create('img', [], {});
    if (imageUrl) {
      image.setAttribute('src', imageUrl);
      image.setAttribute('alt', '');
    }

    const content = _u.create('div', config.classnames.content, config.styles.imageContent);
    content.appendChild(image);

    const blockDiv = _u.create('div', 'sl-block', config.styles.imageBlock);
    blockDiv.setAttribute('data-block-type', 'image');
    blockDiv.appendChild(content);

    this.dom.appendChild(blockDiv);

    this.editor.reload({});
  }

  addSVGShape = ({ shape }) => {
    this.undo_point();

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

    this.editor.reload({});
  }

  addSVGIcon = ({ icon }) => {
    this.undo_point();

    const content = _u.create('div', config.classnames.content);
    this.dom.appendChild(content);
    const blockDiv = _u.create('div', 'sl-block', config.styles.shapeBlock);
    blockDiv.setAttribute('data-block-type', 'icon');
    blockDiv.appendChild(content);

    this.dom.appendChild(blockDiv);

    const svgBlock = new SVGIconBlock({
      parent: this,
      el: blockDiv,
    });

    svgBlock.load({ icon });

    this.editor.reload({});
  }

  addLatex = ({ latex }) => {
    this.undo_point();

    const content = _u.create('div', config.classnames.content);
    this.dom.appendChild(content);
    const blockDiv = _u.create('div', 'sl-block', config.styles.latexBlock);
    blockDiv.setAttribute('data-block-type', 'latex');
    blockDiv.appendChild(content);

    this.dom.appendChild(blockDiv);

    const ktBLock = new LatexBlock({
      parent: this,
      el: blockDiv,
    });

    ktBLock.load({ latex });

    this.editor.reload({});
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

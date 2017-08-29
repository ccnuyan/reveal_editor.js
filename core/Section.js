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
import blocks from './blocks';
import svgMap from './svgLib/_svgMap';

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
    this.parent.services.undoredo.enqueue();
  }

  addText = () => {
    this.undo_point();
    const blockDiv = document.createElement('div');
    blockDiv.innerHTML = blocks.text;
    this.dom.appendChild(blockDiv.childNodes[0]);
    this.editor.reload({});
  }

  addImage({ imageUrl }) {
    this.undo_point();

    const blockDiv = document.createElement('div');
    blockDiv.innerHTML = blocks.image;
    if (imageUrl) {
      blockDiv.querySelector('img').setAttribute('src', imageUrl);
    }
    this.dom.appendChild(blockDiv.childNodes[0]);
    this.editor.reload({});
  }

  addSVGShape = ({ shape }) => {
    this.undo_point();
    const blockDiv = document.createElement('div');
    blockDiv.innerHTML = blocks.shape[shape];
    this.dom.appendChild(blockDiv.childNodes[0]);
    this.editor.reload({});
  }

  addSVGIcon = ({ icon }) => {
    this.undo_point();
    const blockDiv = document.createElement('div');
    blockDiv.innerHTML = blocks.icon;
    blockDiv.querySelector(`div.${config.classnames.content}`).innerHTML = svgMap[icon];
    blockDiv.querySelector(`div.${config.classnames.content}>svg`).setAttribute('fill', 'rgba(192,192,192,1)');
    this.dom.appendChild(blockDiv.childNodes[0]);
    this.editor.reload({});
  }

  addLatex = ({ latex }) => {
    this.undo_point();

    const blockDiv = document.createElement('div');
    blockDiv.innerHTML = blocks.katex;
    blockDiv.querySelector(`div.${config.classnames.content}`).innerHTML = `
    <div class="sl-katex-display"></div>
    <div style="display:none" class="sl-katex-raw">${latex}</div>`;
    this.dom.appendChild(blockDiv.childNodes[0]);
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

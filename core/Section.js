import fetch from 'isomorphic-fetch';

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

const svgIconPath = './static/icomoon/SVG/';

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
    this.blocks = [];

    Array.prototype.forEach.call(this.dom.querySelectorAll('.sl-block'), (block) => {
      const BlockType = Section.map[block.dataset.blockType];
      this.blocks.push(new BlockType({
        parent: this,
        el: block,
      }));
    });
  }

  afterInstanciated = () => {
    this.axis = new Axis({ section: this });
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
    return {
      ...this.state,
      backgroundColor: this.dom.dataset.backgroundColor ? this.dom.dataset.backgroundColor : 'transparent',
      selectedBlocks: this.getSelectedBlockStates(),
    };
  }

  getSelectedBlockStates = () => {
    const selectedBlocks = [];

    this.getSelectedBlocks().forEach((block) => {
      selectedBlocks.push(block.getState());
    });

    return selectedBlocks;
  }

  setState = ({ backgroundColor }) => {
    if (backgroundColor) {
      this.dom.dataset.backgroundColor = backgroundColor;
    }
    window.Reveal.sync();
  }

  addText = () => {
    if (this.editor.isOverview()) return;
    this.editor.services.undoredo.enqueue();

    const blockDiv = document.createElement('div');
    blockDiv.innerHTML = blocks.text;
    this.dom.appendChild(blockDiv.childNodes[0]);
    this.editor.reload({});
  }

  addImage({ imageUrl }) {
    if (this.editor.isOverview()) return;
    this.editor.services.undoredo.enqueue();

    const blockDiv = document.createElement('div');
    blockDiv.innerHTML = blocks.image;
    if (imageUrl) {
      blockDiv.querySelector('img').setAttribute('src', imageUrl);
    }
    this.dom.appendChild(blockDiv.childNodes[0]);
    this.editor.reload({});
  }

  addSVGShape = ({ shape }) => {
    if (this.editor.isOverview()) return;
    if (!blocks.shape[shape]) return;

    this.editor.services.undoredo.enqueue();

    const blockDiv = document.createElement('div');
    blockDiv.innerHTML = blocks.shape[shape];
    this.dom.appendChild(blockDiv.childNodes[0]);
    this.editor.reload({});
  }

  addSVGIcon = ({ icon }) => {
    if (this.editor.isOverview()) return;

    this.editor.services.undoredo.enqueue();

    const iconFile = svgIconPath + icon;
    fetch(iconFile).then((response) => {
      return response.text();
    }).then((text) => {
      const blockDiv = document.createElement('div');
      blockDiv.innerHTML = blocks.icon;
      blockDiv.querySelector(`div.${config.classnames.content}`).innerHTML = text;
      blockDiv.querySelector(`div.${config.classnames.content}>svg`).setAttribute('fill', 'rgba(192,192,192,1)');
      this.dom.appendChild(blockDiv.childNodes[0]);
      this.editor.reload({});
      return true;
    }).catch(() => {
      // todo handle the exception
    });
  }

  addLatex = ({ latex }) => {
    if (this.editor.isOverview()) return;
    this.editor.services.undoredo.enqueue();

    const blockDiv = document.createElement('div');
    blockDiv.innerHTML = blocks.katex;
    blockDiv.querySelector(`div.${config.classnames.content}`).innerHTML = `
    <div class="sl-katex-display"></div>
    <div style="display:none" class="sl-katex-raw">${latex}</div>`;
    this.dom.appendChild(blockDiv.childNodes[0]);
    this.editor.reload({});
  }

  removeSelectedBlocks() {
    if (this.editor.isOverview()) return;
    this.editor.services.undoredo.enqueue();
    const toBeRemoved = [];
    this.blocks.forEach((block) => {
      if (block.state.mode === 'manipulating') {
        toBeRemoved.push(block);
      }
    });
    toBeRemoved.forEach((block) => {
      block.remove();
    });
    this.editor.reload({});
  }

  getSelectedBlocks() {
    const selectedBlocks = [];
    this.blocks.forEach((blk) => {
      if (blk.state.mode === 'manipulating' || blk.state.mode === 'editing') {
        selectedBlocks.push(blk);
      }
    });
    return selectedBlocks;
  }

  copySelectedBlocks() {
    if (this.editor.isOverview()) return;
    const doms = this.getSelectedBlocks().map(block => block.dom);
    const container = document.createElement('div');
    Array.prototype.forEach.call(doms, (dom) => {
      container.appendChild(dom.cloneNode(true));
    });
    this.editor.state.clipboard = container.innerHTML;
    return this.editor.state.clipboard;
  }

  paste(innerHTML) {
    if (this.editor.isOverview()) return;
    this.editor.services.undoredo.enqueue();

    const container = document.createElement('div');
    container.innerHTML = innerHTML;
    const blks = container.querySelectorAll('div.sl-block');

    Array.prototype.forEach.call(blks, (blk) => {
      this.dom.appendChild(blk);
    });
    this.editor.reload({});
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
    if (this.editor.isOverview()) return;
    this.axis.show();
    this.arrangment.addButtons.forEach((dom) => {
      dom.style.display = 'bock';
    });
  }
}

export default Section;

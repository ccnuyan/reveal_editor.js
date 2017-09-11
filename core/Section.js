import fetch from 'isomorphic-fetch';

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
  blockNameAndTypeMap = {
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

    Array.prototype.forEach.call(this.dom.querySelectorAll('.sc-block'), (block) => {
      const BlockType = this.blockNameAndTypeMap[block.getAttribute('data-block-type')];
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

  getState = () => {
    return {
      ...this.state,
      backgroundColor: this.dom.getAttribute('data-background-color') ? this.dom.getAttribute('data-background-color') : 'transparent',
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
      this.dom.setAttribute('data-background-color', backgroundColor);
    }
    window.Reveal.sync();
  }

  addText = () => {
    if (this.editor.isOverview()) return;
    this.editor.services.undoredo.enqueue();

    const blockContainer = document.createElement('div');
    blockContainer.innerHTML = blocks.text;
    const blockDom = blockContainer.childNodes[0];
    this.dom.appendChild(blockDom);

    this.editor.reload({});
  }

  addImage({ file_id }) {
    if (this.editor.isOverview()) return;
    this.editor.services.undoredo.enqueue();

    const blockContainer = document.createElement('div');
    blockContainer.innerHTML = blocks.image;
    if (file_id) {
      fetch(`/api/files/access?file_id=${file_id}`)
      .then(res => res.json())
      .then((ret) => {
        const blockDom = blockContainer.childNodes[0];
        blockDom.setAttribute('data-file-id', file_id);
        blockContainer.querySelector('img').setAttribute('src', ret.access_url);

        this.dom.appendChild(blockDom);

        this.editor.reload({});
        return true;
      }).catch((err) => {
        // todo: handle the exception
      });
    }
  }

  addSVGShape = ({ shape }) => {
    if (this.editor.isOverview()) return;
    if (!blocks.shape[shape]) return;

    this.editor.services.undoredo.enqueue();

    const blockContainer = document.createElement('div');
    blockContainer.innerHTML = blocks.shape[shape];

    const blockDom = blockContainer.childNodes[0];
    this.dom.appendChild(blockDom);

    this.editor.reload({});
  }

  addSVGIcon = ({ icon }) => {
    if (this.editor.isOverview()) return;

    this.editor.services.undoredo.enqueue();

    const iconFile = svgIconPath + icon;
    fetch(iconFile).then((response) => {
      return response.text();
    }).then((text) => {
      const blockContainer = document.createElement('div');
      blockContainer.innerHTML = blocks.icon;
      blockContainer.querySelector(`div.${config.classnames.content}`).innerHTML = text;
      blockContainer.querySelector(`div.${config.classnames.content}>svg`).setAttribute('fill', 'rgba(192,192,192,1)');

      const blockDom = blockContainer.childNodes[0];
      this.dom.appendChild(blockDom);

      this.editor.reload({});
      return true;
    }).catch(() => {
      // todo handle the exception
    });
  }

  addLatex = ({ latex }) => {
    if (this.editor.isOverview()) return;
    this.editor.services.undoredo.enqueue();

    const blockContainer = document.createElement('div');
    blockContainer.innerHTML = blocks.katex;
    blockContainer.querySelector(`div.${config.classnames.content}`).innerHTML = `
    <div class="sc-katex-display"></div>
    <div style="display:none" class="sc-katex-raw">${latex}</div>`;

    const blockDom = blockContainer.childNodes[0];
    this.dom.appendChild(blockDom);

    this.editor.reload({});
  }

  removeSelectedBlocks() {
    if (this.editor.isOverview()) return;
    this.editor.services.undoredo.enqueue();
    const toBeRemoved = [];
    this.blocks.forEach((block) => {
      if (block.state.status === 'manipulating') {
        toBeRemoved.push(block);
      }
    });
    toBeRemoved.forEach((block) => {
      block.remove();
    });

    this.axis.clearActives();
  }

  getSelectedBlocks() {
    const selectedBlocks = [];
    this.blocks.forEach((blk) => {
      if (blk.state.status === 'manipulating' || blk.state.status === 'editing') {
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
    const blks = container.querySelectorAll('div.sc-block');

    Array.prototype.forEach.call(blks, (blk) => {
      this.dom.appendChild(blk);
    });
    this.editor.reload({});
  }

  toPreview() {
    this.axis.clearActives();
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

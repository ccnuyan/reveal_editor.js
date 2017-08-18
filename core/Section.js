import Block from './Block';
import _u from './util';
import config from './config';
import Elements from './Elements';

class Section extends Elements {
  constructor({ parent, el }) {
    super({ parent, el });
    this.blocks = [];
    _u.findChildren(this.dom, '.sl-block').forEach((block) => {
      this.blocks.push(new Block({
        parent: this,
        el: block,
      }));
    });
  }

  getNewBlock = (type, content) => {
    const blockDiv = _u.create('div', 'sl-block', config.styles[`${type}Block`]);

    blockDiv.setAttribute('data-block-type', type);
    blockDiv.appendChild(content);

    this.dom.appendChild(blockDiv);

    const block = new Block({
      parent: this,
      el: blockDiv,
    });

    this.blocks.push(block);

    return block;
  }

  addText = () => {
    const content = _u.create('div', config.classnames.content);
    const paragraph = _u.create('p');
    paragraph.textContent = '输入文本内容';
    content.appendChild(paragraph);
    this.dom.appendChild(content);
    const textBlock = this.getNewBlock('text', content);
    this.parent.currentBlock = textBlock;
    textBlock.toManipulate();
  }
}

export default Section;

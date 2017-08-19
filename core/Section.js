import _u from './util';
import config from './config';
import Elements from './Elements';
import TextBlock from './TextBlock';
import ImageBlock from './ImageBlock';

class Section extends Elements {
  static map = {
    text: TextBlock,
    image: ImageBlock,
  }
  constructor({ parent, el }) {
    super({ parent, el });
    this.blocks = [];
    _u.findChildren(this.dom, '.sl-block').forEach((block) => {
      this.blocks.push(new (Section.map[block.dataset.blockType])(
        {
          parent: this,
          el: block,
        },
      ));
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

  addImage({ imageUrl }) {
    const content = _u.create('div', config.classnames.content, config.styles.imageContent);
    const image = _u.create('img', [], {});
    content.appendChild(image);

    if (imageUrl) {
      image.setAttribute('src', imageUrl);
      image.setAttribute('alt', '');
    }
    const imageblock = this.getNewBlock('image', content);

    this.blocks.push(imageblock);

    this.parent.currentBlock = imageblock;
    imageblock.toManipulate();
  }
}

export default Section;

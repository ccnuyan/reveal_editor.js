import KatexEditor from './KatexEditor';
import _u from './util';
import Block from './Block';

class KatexBlock extends Block {
  constructor({ parent, el }) {
    super({ parent, el });

    this.state.blockType = 'text';

    this.minsize = {
      width: 160,
      height: 24,
    };
  }

  getState = () => {
    const style = getComputedStyle(this.dom);
    return {
      ...this.state,
      borderWidth: style.borderWidth,
      borderStyle: style.borderStyle,
      borderColor: style.borderColor,
      color: style.color,
      backgroundColor: style.backgroundColor,
      fontSize: this.dom.style.fontSize ? this.dom.style.fontSize : '100%',
      zIndex: style.zIndex === 'auto' ? 0 : style.zIndex,
    };
  }

  setState = (params) => {
    Object.keys(params).forEach((key) => {
      this.dom.style[key] = params[key];
    });
  }

  beforeToEdit() {
    _u.clearUserSelection();
    this.editor.dom.setAttribute('draggable', false);
    const originalTex = this.blockContent.dom.querySelector('span.katex>span.katex-mathml>math>semantics>annotation').innerHTML;

    if (!this.editor.katexEditor) {
      this.editor.katexEditor = new KatexEditor();
    }
    this.editor.katexEditor.load({ latex: originalTex }, (innerhtml) => {
      this.blockContent.dom.innerHTML = innerhtml;
    });
  }

  beforeToPreview = () => {
    this.blockTransformer.hide();
    if (this.blockContent.dom.querySelector('span') === null) {
      katex.render(this.blockContent.dom.innerHTML, this.blockContent.dom);
    }
  }

  load = ({ latex }) => {
    katex.render(latex, this.blockContent.dom);
  }
}

export default KatexBlock;

import LatexEditor from './LatexEditor';
import _u from './util';
import Block from './Block';
import DDMRR from './ddmrr';


class LatexBlock extends Block {
  anchorTypes = [];

  constructor({ parent, el }) {
    super({ parent, el });

    this.katexDsplayDom = this.blockContent.dom.querySelector('div.sl-katex-display');
    this.katexRawDom = this.blockContent.dom.querySelector('div.sl-katex-raw');

    this.load({});
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

  toManipulate() {
    super.toManipulate();
    this.ddmrr = new DDMRR(this.dom, this.editor.reveal, {
      resize: {
        key: 'resize',
        enable: false,
      },
    });
  }

  toEdit() {
    super.toEdit();
    _u.clearUserSelection();
    this.editor.dom.setAttribute('draggable', false);
    const originalTex = this.blockContent.dom.querySelector('span.katex>span.katex-mathml>math>semantics>annotation').innerHTML;

    if (!this.editor.latexEditor) {
      this.editor.latexEditor = new LatexEditor();
    }
    this.editor.latexEditor.load({ latex: originalTex }, ({ input }) => {
      this.load({ latex: input });
    });
  }

  toPreview() {
    super.toPreview();
    if (this.blockContent.dom.querySelector('span') === null) {
      katex.render(this.blockContent.dom.innerHTML, this.blockContent.dom);
    }
  }

  load = ({ latex }) => {
    if (latex) {
      this.katexRawDom.innerHTML = latex;
    }
    katex.render(this.katexRawDom.innerHTML, this.katexDsplayDom);
  }
}

export default LatexBlock;

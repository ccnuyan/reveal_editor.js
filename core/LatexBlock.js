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

  getState() {
    const style = getComputedStyle(this.dom);
    return {
      ...this.state,
      borderWidth: this.getLength(style.borderTopWidth),
      borderStyle: this.getBorderStyle(style.borderTopStyle),
      borderColor: this.getColor(style.borderTopColor),
      color: this.getColor(style.color),
      backgroundColor: this.getColor(style.backgroundColor),
      fontSize: this.getFontSize(this.dom.style.fontSize),
      zIndex: this.getZIndex(style.zIndex),
    };
  }

  setState(params) {
    Object.keys(params).forEach((key) => {
      this.dom.style[key] = params[key];
    });

    return this.getState();
  }

  toManipulate() {
    super.toManipulate();
    this.ddmrr = new DDMRR(this.dom, this.editor.reveal, {
      resize: {
        key: 'resize',
        enable: false,
      },
    });

    this.ddmrr.emitter.on('dblclick', () => {
      this.ddmrr.release();
      this.ddmrr = null;
      this.toEdit();
    });

    super.toManipulate();
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

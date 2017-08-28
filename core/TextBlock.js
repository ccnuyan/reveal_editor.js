import CKEditorConfig from './configs/CKEditorConfig';
import _u from './util';
import Block from './Block';

/* eslint-disable no-param-reassign, radix */

class TextBlock extends Block {
  constructor({ parent, el }) {
    super({ parent, el });

    this.minsize.width = 160;
    this.anchorTypes = ['e', 'w'];
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

  resize_e({ os, ox, oy }) {
    super.resize_e({ os, ox, oy });
    this.relocate_e({ os });
  }

  resize_w({ os, ox, oy }) {
    super.resize_w({ os, ox, oy });
    this.relocate_w({ os });
  }

  beforeToPreview = () => {
    if (this.CKEDITORInstance) {
      this.CKEDITORInstance.destroy();
    }
    this.blockContent.dom.setAttribute('contenteditable', false);
    this.blockTransformer.hide();
  }

  toEdit() {
    super.toEdit();

    this.editor.dom.setAttribute('draggable', false);
    this.state.mode = 'editing';
    this.blockContent.dom.setAttribute('contenteditable', 'true');

    let initiatedFlag = false;
    Object.keys(CKEDITOR.instances).some((name) => {
      const ariaLabel = this.blockContent.dom.getAttribute('aria-label');
      if (ariaLabel && ariaLabel.split(', ')[1] === name) {
        CKEDITOR.instances[name].focus();
        this.CKEDITORInstance = CKEDITOR.instances[name];
        initiatedFlag = true;
        return true;
      }
      return false;
    });
    if (!initiatedFlag) {
      this.CKEDITORInstance = CKEDITOR.inline(this.blockContent.dom, CKEditorConfig);
    }
    this.blockTransformer.hide();
    _u.clearUserSelection();

    this.editor.debouncedEventEmit();
  }
}

export default TextBlock;

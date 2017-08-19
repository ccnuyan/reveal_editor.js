import { expect } from 'chai';
import _u from './util';
import _config from './config';
import Block from './Block';

class TextBlock extends Block {
  constructor({ parent, el }) {
    super({ parent, el });

    this.minsize = {
      width: 160,
      height: 24,
    };
  }
  toEdit() {
    super.toEdit();
    this.blockContent.dom.setAttribute('contenteditable', 'true');
    let initiatedFlag = false;
    Object.keys(CKEDITOR.instances).some((name) => {
      const ariaLabel = this.blockContent.dom.getAttribute('aria-label');
      if (ariaLabel && ariaLabel.split(', ')[1] === name) {
        CKEDITOR.instances[name].focus();
        initiatedFlag = true;
        return true;
      }
      return false;
    });
    if (!initiatedFlag) {
      CKEDITOR.inline(this.blockContent.dom, _config.ckeditorConfig);
    }
    _u.clearUserSelection();
  }
}

export default TextBlock;

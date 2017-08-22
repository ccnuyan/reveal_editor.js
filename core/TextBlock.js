import CKEditorConfig from './configs/CKEditorConfig';
import _u from './util';
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
    this.section.blocks.forEach((block) => {
      block.toPreview();
    });
    // this.editor.dom.setAttribute('draggable', false);

    this.mode = 'editing';
    this.editor.debouncedEventEmit();

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
    _u.clearUserSelection();

    this.editor.debouncedEventEmit();
  }
}

export default TextBlock;

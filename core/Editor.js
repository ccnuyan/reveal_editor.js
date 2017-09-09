import _ from 'lodash';
import './CKEDITORPlugins';
import _u from './util';
import revealConf from './revealConf';
import config from './config';
import Section from './Section';
import services from './services';
import Emitter from './Emitter';

/* eslint-disable no-param-reassign, radix */
// this.reveal should be the reveal element;

class Editor {
  constructor({ reveal, initialHTML }) {
    this.dom = reveal;
    this.reveal = reveal;
    this.services = services(this);
    this.state = {};

    this.emitter = new Emitter();
    this.reveal.innerHTML = initialHTML;

    this.initializeSections();
  }

  afterInstanciated() {
    Reveal.addEventListener('ready', () => {
      this.slidesDom = _u.findChildren(this.reveal, '.slides')[0];
      this.selectRect = _u.create('div', 'editing-ui', config.styles.dragSelectRect);
      this.reveal.appendChild(this.selectRect);
      this.linkDomEvents();

      this.state.status = 'editing';
      this.state.initialized = true;
      this.state.theme = this.services.theme.loadTheme(this.slidesDom.getAttribute('data-theme'));

      this.sections.forEach((section) => {
        const currentSectionDom = window.Reveal.getCurrentSlide();
        if (section.dom === currentSectionDom) {
          this.currentSection = section;
        }
      });

      this.emitter.emit('editorInitialized', {
        editor: this.getState(),
      });

      setTimeout(() => {
        const spinner = document.querySelector('div.spinner-container');
        if (spinner) spinner.parentNode.removeChild(spinner);

        const wrapper = document.querySelector('div.wrapper');
        if (wrapper) wrapper.style.display = 'block';
      }, 2000);
    });

    window.Reveal.initialize(revealConf.editingConf);
    this.sections.forEach(section => section.afterInstanciated());

    window.Reveal.addEventListener('slidechanged', (event) => {
      _.some([...this.sections], (section) => {
        if (event.currentSlide === section.dom) {
          this.currentSection = section;
          return true;
        }
        return false;
      });

      this.emitter.emit('editorCurrentSlideChanged', {
        currentSection: {
          ...this.currentSection.getState(),
          selectedBlocks: this.currentSection.getSelectedBlocks(),
        },
      });
    });
  }

  reload({ html, overview, h, v }) {
    const state = window.Reveal.getState();
    if (h) { state.indexh = h; }
    if (v) { state.indexh = v; }
    if (overview) { state.overview = overview; }

    if (html) {
      this.slidesDom.innerHTML = html;
    } else {
      this.slidesDom.innerHTML = this.services.snapshot.getSnapshot();
    }

    window.Reveal.setState(state);

    window.Reveal.sync();
    window.Reveal.layout();

    this.initializeSections();
    this.sections.forEach(section => section.afterInstanciated());

    this.sections.forEach((section) => {
      const currentSectionDom = window.Reveal.getCurrentSlide();
      if (section.dom === currentSectionDom) {
        this.currentSection = section;
      }
    });
  }

  // this method make sure the currentSection is always exist
  initializeSections = () => {
    this.sections = [];
    this.state.struct = {};
    let h = 0;

    Array.prototype.forEach.call(this.reveal.querySelectorAll('.slides>section'), (section) => {
      this.state.struct[h] = true;
      this.state.struct.count = 0;
      const subSections = section.querySelectorAll('section');
      let v = 0;
      if (subSections.length > 0) {
        this.state.struct[h] = {};
        Array.prototype.forEach.call(subSections, (subsection) => {
          this.bornNewSection(subsection, h, v, true);
          this.state.struct[h][v] = true;
          v += 1;
          this.state.struct[h].count = v;
        });
      } else {
        this.bornNewSection(section, h, v, false);
      }
      h += 1;
      this.state.struct.count = h;
    });
  }

  debouncedEventEmit = _.debounce(() => {
    const selectedBlocks = [];

    this.currentSection.getSelectedBlocks().forEach((block) => {
      selectedBlocks.push(block.getState());
    });
    this.emitter.emit('editorCurrentBlocksChanged', {
      currentSection: this.currentSection,
      selectedBlocks,
    });
  }, 100);

  getState = () => {
    return {
      ...this.state,
      currentSection: this.currentSection.getState(),
    };
  }

  setState = ({ theme }) => {
    this.state.theme = this.services.theme.loadTheme(theme);
  }

  linkDomEvents = () => {
    this.reveal.parentNode.addEventListener('mousedown', this.mousedown);
    this.reveal.parentNode.addEventListener('mousemove', this.mousemove);
    this.reveal.parentNode.addEventListener('mouseup', this.mouseup);
  }

  bornNewSection(sectionDom, h, v, isSub) {
    const section = new Section({
      parent: this,
      el: sectionDom,
    });

    section.state.h = h;
    section.state.v = v;
    section.state.isSub = isSub;

    this.sections.push(section);
  }

  isChildOfBlock(el) {
    if (el.tagName === 'DIV' && el.classList.contains('sc-block')) {
      return true;
    } else if (el === document.body) {
      return false;
    }
    return this.isChildOfBlock(el.parentNode);
  }

  mousedown = (event) => {
    event.stopPropagation();

    if (this.isChildOfBlock(event.target)) {
      return;
    }

    this.currentSection.blocks.forEach((block) => {
      block.toPreview();
    });

    this.currentSection.axis.clearActives();

    if (this.state.status !== 'editing') {
      return;
    }

    // start drag select

    this.draggingToSelect = true;
    this.selectRect.style.width = '0px';
    this.selectRect.style.height = '0px';

    this.startfrom = {
      x: event.clientX,
      y: event.clientY,
    };

    // lower the computing burden

    const parentRect = this.selectRect.parentNode.getBoundingClientRect();
    this.parentRect = parentRect;

    this.toBeComputedBlocks = _.filter(this.currentSection.blocks, (blk) => {
      blk.rect = blk.dom.getBoundingClientRect();
      // return (blk.rect.left < this.startfrom.x && blk.rect.right < this.startfrom.x) ||
      //  (blk.rect.bottom < this.startfrom.y && blk.rect.top > this.startfrom.y);
    });
  }

  mousemove = (event) => {
    event.stopPropagation();

    if (!this.draggingToSelect) {
      return;
    }

    this.selectRect.style.display = 'block';

    const rect = {
      width: Math.abs(this.startfrom.x - event.clientX),
      height: Math.abs(this.startfrom.y - event.clientY),
      clientLeft: Math.min(this.startfrom.x, event.clientX),
      clientTop: Math.min(this.startfrom.y, event.clientY),
      left: Math.min(this.startfrom.x, event.clientX) - this.parentRect.left,
      top: Math.min(this.startfrom.y, event.clientY) - this.parentRect.top,
    };

    this.selectRect.style.left = `${rect.left}px`;
    this.selectRect.style.top = `${rect.top}px`;
    this.selectRect.style.width = `${rect.width}px`;
    this.selectRect.style.height = `${rect.height}px`;

    this.currentSection.blocks.forEach((block) => {
      if (block.rect.left > rect.clientLeft &&
        block.rect.right < (rect.clientLeft + rect.width) &&
        block.rect.top > rect.clientTop &&
        block.rect.bottom < rect.clientTop + rect.height) {
        if (block.state.status !== 'manipulating') {
          block.toManipulate();
        }
      } else if (block.state.status !== 'previewing') {
        block.toPreview();
      }
    });
  }

  mouseup = (event) => {
    event.stopPropagation();
    this.selectRect.style.display = 'none';

    if (!this.draggingToSelect) {
      return;
    }
    this.draggingToSelect = false;

    const blocks = this.currentSection.getSelectedBlocks();
    if (blocks.length > 1) {
      const blocksDom = blocks.map(b => b.dom);
      blocks.forEach((block) => {
        block.ddmrr.multiple = true;
        block.ddmrr.elements = blocksDom;
      });
    }
  };

  toPreview() {
    this.sections.forEach((section) => {
      section.toPreview();
    });
    this.state.status = 'previewing';
  }

  toArrange = () => {
    window.Reveal.toggleOverview();
  }

  isOverview = () => {
    return window.Reveal.isOverview();
  }

  toEdit() {
    this.state.status = 'editing';
    this.sections.forEach((section) => {
      section.toEdit();
    });
  }
}

export default Editor;

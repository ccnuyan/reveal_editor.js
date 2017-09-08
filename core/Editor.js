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

      this.state.mode = 'editing';
      this.state.initialized = true;
      this.state.theme = this.services.theme.loadTheme(this.slidesDom.dataset.theme);

      this.sections.forEach((section) => {
        const currentSectionDom = window.Reveal.getCurrentSlide();
        if (section.dom === currentSectionDom) {
          this.currentSection = section;
        }
      });

      this.emitter.emit('editorInitialized', {
        editor: this.getState(),
      });
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

  reload({ html, toOverview, h, v }) {
    let state = false;
    if (h === undefined || v === undefined) {
      state = window.Reveal.getState();
    }
    if (html) {
      this.slidesDom.innerHTML = html;
    } else {
      this.slidesDom.innerHTML = this.services.snapshot.getSnapshot();
    }
    this.initializeSections();
    this.sections.forEach(section => section.afterInstanciated());

    window.Reveal.sync();

    if (state) {
      window.Reveal.setState(state);
    } else {
      window.Reveal.slide(h, v);
    }

    if (toOverview && !window.Reveal.isOverview()) {
      setTimeout(() => {
        window.Reveal.toggleOverview();
      }, 1);
    }

    // it must reset the currentSection when sync done!
    this.sections.forEach((section) => {
      const currentSectionDom = window.Reveal.getCurrentSlide();
      if (section.dom === currentSectionDom) {
        this.currentSection = section;
      }
    });
  }

  // this method make sure the currentSection is always exist
  initializeSections = () => {
    this.sections = new Set([]);
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

    this.sections.add(section);
  }

  isChildOfBlock(el) {
    if (el.tagName === 'DIV' && el.classList.contains('sl-block')) {
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

    this.slidesDom.style.pointerEvents = 'none';

    if (this.state.mode !== 'editing') {
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
  }

  mousemove = (event) => {
    event.stopPropagation();

    if (!this.draggingToSelect) {
      return;
    }

    this.selectRect.style.display = 'block';

    const offsetX = event.clientX - this.startfrom.x;
    const offsetY = event.clientY - this.startfrom.y;

    const offset = _u.offset(this.reveal);

    this.selectRect.style.left = `${(offsetX >= 0 ? this.startfrom.x : event.clientX) - offset.left}px`;
    this.selectRect.style.top = `${(offsetY >= 0 ? this.startfrom.y : event.clientY) - offset.top}px`;
    this.selectRect.style.width = `${Math.abs(offsetX)}px`;
    this.selectRect.style.height = `${Math.abs(offsetY)}px`;

    const rectloc = _u.offset(this.selectRect);

    this.currentSection.blocks.forEach((block) => {
      const blockloc = _u.offset(block.dom);

      if (
        rectloc.left < blockloc.left &&
        rectloc.top < blockloc.top &&
        rectloc.left + parseInt(this.selectRect.offsetWidth) > blockloc.left + parseInt(block.dom.offsetWidth) &&
        rectloc.top + parseInt(this.selectRect.offsetHeight) > blockloc.top + parseInt(block.dom.offsetHeight)) {
        if (block.state.mode !== 'manipulating') {
          block.toManipulate();
        }
      } else if (block.state.mode !== 'previewing') {
        block.toPreview();
      }
    });
  }

  mouseup = (event) => {
    if (!this.draggingToSelect) {
      return;
    }

    this.slidesDom.style.pointerEvents = 'auto';
    event.stopPropagation();
    this.draggingToSelect = false;
    this.selectRect.style.display = 'none';

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
    // this.reveal.setAttribute('draggable', false);
    this.sections.forEach((section) => {
      section.toPreview();
    });
    this.state.mode = 'previewing';
  }

  toArrange = () => {
    window.Reveal.toggleOverview();
  }

  isOverview = () => {
    return window.Reveal.isOverview();
  }

  toEdit() {
    // this.reveal.setAttribute('draggable', true);
    this.state.mode = 'editing';
    this.sections.forEach((section) => {
      section.toEdit();
    });
  }
}

export default Editor;

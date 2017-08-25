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
    this.reveal = this.dom;
    this.services = services(this);
    this.linkDomEvents();

    this.state = { mode: 'editing' };
    this.emitter = new Emitter();
    document.querySelector('.reveal').innerHTML = initialHTML;
    window.Reveal.initialize(revealConf.editingConf);

    Reveal.addEventListener('ready', () => {
      // paint the axis
      this.slidesDom = _u.findChildren(this.reveal, '.slides')[0];

      this.initializeSections();

      this.emitter.emit('editorInitialized', {
        editor: this,
        currentSection: this.currentSection,
      });
    });
  }

  debouncedEventEmit = _.debounce(() => {
    const selectedBlocks = this.currentSection.getSelectedBlocks();

    selectedBlocks.forEach((block) => {
      block.state = block.getState();
    });

    this.emitter.emit('editorCurrentBlocksChanged', {
      currentSection: this.currentSection,
      selectedBlocks,
    });
  }, 100);

  linkDomEvents = () => {
    // link drag events
    this.reveal.setAttribute('draggable', true);
    _u.on(this.reveal, 'dragstart', this.dragstart);
    _u.on(this.reveal, 'dragover', this.do);
    _u.on(this.reveal, 'dragend', this.dragend);

    // on blank clicked
    _u.on(this.reveal, 'click', (event) => {
      event.stopPropagation();
      if (event.currentTarget === this.reveal) {
        this.currentSection.blocks.forEach((block) => {
          block.toPreview();
        });
      }
      if (this.state.mode === 'editing') {
        this.reveal.setAttribute('draggable', true);
      }
    });
  }

  reload({ html, toOverview, h, v }) {
    // save the old configuration and position
    const oldConf = window.Reveal.getConfig();

    if (h === undefined) h = Reveal.getIndices().h;
    if (v === undefined) v = Reveal.getIndices().v;

    if (html) {
      this.slidesDom.innerHTML = html;
    } else {
      this.slidesDom.innerHTML = this.services.snapshot(this);
    }

    this.reveal.classList = ['reveal'];
    this.reveal.removeAttribute('role');

    Array.prototype.forEach.call(this.reveal.children, (el) => {
      if (el !== this.slidesDom) {
        el.parentNode.removeChild(el);
      }
    });

    // reinitialize reveal
    window.Reveal.initialize(oldConf);
    window.Reveal.navigateTo(h, v);

    if (toOverview && !window.Reveal.isOverview()) {
      window.Reveal.toggleOverview();
    }

    this.slidesDom = _u.findChildren(this.reveal, '.slides')[0];

     // select rect
    this.selectRect = _u.create('div', 'editing-ui', config.styles.dragSelectRect);
    this.reveal.appendChild(this.selectRect);

    // reinitialize the sections
    this.initializeSections();
  }

  bornNewSection(sectionDom, h, v, isSub) {
    const currentSectionDom = window.Reveal.getCurrentSlide();
    const section = new Section({
      parent: this,
      el: sectionDom,
    });

    section.state.h = h;
    section.state.v = v;
    section.state.isSub = isSub;

    this.sections.add(section);
    if (sectionDom === currentSectionDom) {
      this.currentSection = section;
    }
  }

  // this method make sure the currentSection is always exist
  initializeSections = () => {
    this.sections = new Set([]);

    this.state.struct = {};

    let h = 0;
    _u.findChildren(this.reveal, '.slides>section').forEach((section) => {
      this.state.struct[h] = true;
      this.state.struct.count = 0;
      const subSections = section.querySelectorAll('section');
      let v = 0;
      if (subSections.length > 0) {
        this.state.struct[h] = {};
        subSections.forEach((subsection) => {
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

    this.sections.forEach(section => section.afterInitialize());
    window.Reveal.addEventListener('slidechanged', (event) => {
      // set current section
      [...this.sections].some((section) => {
        if (event.currentSlide === section.dom) {
          this.currentSection = section;
          return true;
        }
        return false;
      });

      this.emitter.emit('editorCurrentSlideChanged', {
        currentSection: this.currentSection,
      });
    });
  }

  // do = dargover, capture the event emmited by this dom elements
  do = (event) => {
    event.stopPropagation();
    // redirect to the handler where the dragstart
    this.draggingElement.dragover(event);
  }

  dragstart = (event) => {
    event.stopPropagation();

    this.dragMode = 'select';
    this.draggingElement = this;

    this.selectRect.style.width = '0px';
    this.selectRect.style.height = '0px';
    _u.show(this.selectRect);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setDragImage(_u.emptyDragImage, 0, 0);

    this.dragfrom = {
      x: event.clientX,
      y: event.clientY,
    };
  }

  dragover = () => {
    event.preventDefault();

    event.dataTransfer.dropEffect = 'move';

    const offsetX = event.clientX - this.dragfrom.x;
    const offsetY = event.clientY - this.dragfrom.y;

    const offset = _u.offset(this.reveal);

    this.selectRect.style.left = `${(offsetX >= 0 ? this.dragfrom.x : event.clientX) - offset.left}px`;
    this.selectRect.style.top = `${(offsetY >= 0 ? this.dragfrom.y : event.clientY) - offset.top}px`;
    this.selectRect.style.width = `${Math.abs(offsetX)}px`;
    this.selectRect.style.height = `${Math.abs(offsetY)}px`;

    const rectloc = _u.offset(this.selectRect);
    const rectStyle = getComputedStyle(this.selectRect);

    this.currentSection.blocks.forEach((block) => {
      const blockloc = _u.offset(block.dom);
      const blockStyle = getComputedStyle(block.dom);

      if (
        rectloc.left < blockloc.left &&
        rectloc.top < blockloc.top &&
        rectloc.left + parseInt(rectStyle.width) > blockloc.left + parseInt(blockStyle.width) &&
        rectloc.top + parseInt(rectStyle.height) > blockloc.top + parseInt(blockStyle.height)) {
        block.toManipulate();
      } else {
        block.toPreview();
      }
    });
  }

  dragend = () => {
    event.preventDefault();
    _u.hide(this.selectRect);
  };

  toPreview() {
    this.reveal.setAttribute('draggable', false);
    this.sections.forEach((section) => {
      section.toPreview();
    });
    this.state.mode = 'previewing';
  }

  isOverview = () => {
    return window.Reveal.isOverview();
  }

  toEdit() {
    this.reveal.setAttribute('draggable', true);
    this.state.mode = 'editing';
    this.sections.forEach((section) => {
      section.toEdit();
    });
  }
}

export default Editor;

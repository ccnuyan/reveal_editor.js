import { expect } from 'chai';
import _ from 'lodash';
import './CKEDITORPlugins';
import _u from './util';
import revealConf from './revealConf';
import config from './config';
import Section from './Section';
import Axis from './Axis';
import services from './services';
import Emitter from './Emitter';

/* eslint-disable no-param-reassign, radix */

// this.reveal should be the reveal element;

class Editor {
  constructor({ reveal, initialHTML }) {
    this.dom = reveal;
    this.services = services(this);
    this.linkDomEvents();

    this.mode = 'editing';
    this.emitter = new Emitter();

    _u.setHTML(document.querySelector('.reveal'), initialHTML);
    window.Reveal.initialize(revealConf.editingConf);

    Reveal.addEventListener('ready', (event) => {
      // paint the axis
      this.axis = new Axis({ editor: this });
      this.slidesDom = _u.findChildren(this.dom, '.slides')[0];

      // select rect
      this.selectRect = _u.create('div', 'editing-ui', config.styles.dragSelectRect);
      this.dom.appendChild(this.selectRect);

      this.initializeSections();
      this.linkRevealEvents();

      this.currentSection.state.h = event.indexh;
      this.currentSection.state.v = event.indexv;

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
    this.dom.setAttribute('draggable', true);
    _u.on(this.dom, 'dragstart', this.dragstart);
    _u.on(this.dom, 'dragover', this.do);
    _u.on(this.dom, 'dragend', this.dragend);

    // on blank clicked
    _u.on(this.dom, 'click', (event) => {
      event.stopPropagation();
      if (event.currentTarget === this.dom) {
        this.currentSection.toPreview();
      }
      if (this.mode === 'editing') {
        this.dom.setAttribute('draggable', true);
      }
    });
  }

  linkRevealEvents = () => {
    window.Reveal.addEventListener('overviewshown', () => {
      this.axis.hide();
    });
    window.Reveal.addEventListener('overviewhidden', () => {
      this.axis.show();
    });
  }

  reload({ html }) {
    // save the old configuration and position
    const oldConf = window.Reveal.getConfig();
    const h = Reveal.getIndices().h;
    const v = Reveal.getIndices().v;

    const virReveal = document.createElement('div');
    _u.setHTML(virReveal, html);
    _u.setHTML(this.slidesDom, virReveal.querySelector('.slides').innerHTML);

    // reinitialize reveal
    window.Reveal.initialize(oldConf);
    window.Reveal.navigateTo(h, v);

    // re-paint the axis
    this.axis = new Axis({ editor: this });
    this.slidesDom = _u.findChildren(this.dom, '.slides')[0];

    // reinitialize the sections
    this.initializeSections();
  }

  // this method make sure the currentSection is always exist
  initializeSections = () => {
    this.sections = new Set([]);
    const currentSectionDom = window.Reveal.getCurrentSlide();
    expect(currentSectionDom).to.exist;
    _u.findChildren(this.dom, '.slides>section').forEach((section) => {
      const sec = new Section({
        parent: this,
        el: section,
      });

      this.sections.add(sec);
      if (section === currentSectionDom) {
        this.currentSection = sec;
      }
    });
    window.Reveal.addEventListener('slidechanged', (event) => {
      // set current section
      [...this.sections].some((section) => {
        if (event.currentSlide === section.dom) {
          this.currentSection = section;
          return true;
        }
        return false;
      });

      this.currentSection.state.h = event.indexh;
      this.currentSection.state.v = event.indexv;

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

    const offset = _u.offset(this.dom);

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
    this.dom.setAttribute('draggable', false);
    this.axis.hide();
    this.sections.forEach((section) => {
      section.toPreview();
    });
    this.mode = 'previewing';
  }

  toEdit() {
    this.dom.setAttribute('draggable', true);
    this.axis.show();
    this.mode = 'editing';
  }
}

export default Editor;

/* eslint-disable no-param-reassign, radix */

import _u from './util';
import plusSvg from './svgResource/plus.svg';
import arrowLeft from './svgResource/arrow-left2.svg';
import arrowRight from './svgResource/arrow-right2.svg';
import arrowUp from './svgResource/arrow-up2.svg';
import arrowDown from './svgResource/arrow-down2.svg';
import templates from './templates';

class SectionArrangement {
  constructor({ parent }) {
    this.editor = parent.editor;
    this.section = parent;
    this.initializeSectionAddButtons();
    this.initializeArrangementButtons();
  }

  initializeSectionAddButtons = () => {
    this.rightAdd = document.createElement('div');
    this.rightAdd.innerHTML = plusSvg;
    this.rightAdd.dataset.direction = 'right';
    this.bottomAdd = document.createElement('div');
    this.bottomAdd.innerHTML = plusSvg;
    this.bottomAdd.dataset.direction = 'bottom';

    this.rightAdd.classList.add('editing-ui');
    this.rightAdd.classList.add('section-add');
    this.bottomAdd.classList.add('editing-ui');
    this.bottomAdd.classList.add('section-add');

    this.rightAdd.addEventListener('mouseenter', (event) => {
      const theme = this.editor.services.theme.getTheme();
      event.currentTarget.querySelector('svg').style.fill = theme.sectionAdd;
    });
    this.bottomAdd.addEventListener('mouseenter', (event) => {
      const theme = this.editor.services.theme.getTheme();
      event.currentTarget.querySelector('svg').style.fill = theme.sectionAdd;
    });

    this.rightAdd.addEventListener('mouseleave', (event) => {
      event.currentTarget.querySelector('svg').style.fill = 'grey';
    });
    this.bottomAdd.addEventListener('mouseleave', (event) => {
      event.currentTarget.querySelector('svg').style.fill = 'grey';
    });

    this.section.dom.appendChild(this.rightAdd);
    this.section.dom.appendChild(this.bottomAdd);

    this.rightAdd.addEventListener('click', this.createSection);
    this.bottomAdd.addEventListener('click', this.createSection);
  }

  initializeArrangementButtons = () => {
    this.left = document.createElement('div');
    this.left.innerHTML = arrowLeft;
    this.left.dataset.direction = 'left';
    this.left.classList.add('arranging-ui');
    this.right = document.createElement('div');
    this.right.innerHTML = arrowRight;
    this.right.dataset.direction = 'right';
    this.right.classList.add('arranging-ui');
    this.up = document.createElement('div');
    this.up.innerHTML = arrowUp;
    this.up.dataset.direction = 'up';
    this.up.classList.add('arranging-ui');
    this.down = document.createElement('div');
    this.down.innerHTML = arrowDown;
    this.down.dataset.direction = 'down';
    this.down.classList.add('arranging-ui');

    this.arrangingButtons = [this.up, this.down, this.left, this.right];

    this.arrangingButtons.forEach((dom) => {
      dom.addEventListener('mouseenter', (event) => {
        const theme = this.editor.services.theme.getTheme();
        event.currentTarget.querySelector('svg').style.fill = theme.sectionAdd;
      });
      dom.addEventListener('mouseleave', (event) => {
        event.currentTarget.querySelector('svg').style.fill = 'grey';
      });
    });

    this.arrangingButtons.forEach((dom) => {
      this.section.dom.appendChild(dom);
      dom.addEventListener('click', this.moveSection);
      dom.style.display = 'none';
    });


    window.Reveal.addEventListener('overviewshown', () => {
      this.arrangingButtons.forEach((dom) => {
        dom.style.display = 'block';
      });
    });
    window.Reveal.addEventListener('overviewhidden', () => {
      this.arrangingButtons.forEach((dom) => {
        dom.style.display = 'none';
      });
    });
  }

  createSection = (event) => {
    if (event.currentTarget.dataset.direction === 'right') {
      let domAfter = this.section.dom;
      const h = this.section.state.h;
      if (this.section.state.isSub) {
        domAfter = this.section.dom.parentNode;
      }
      const newSection = document.createElement('section');
      newSection.innerHTML = templates.sectionTemplates.title;
      domAfter.insertAdjacentHTML('afterend', newSection.outerHTML);
      this.editor.reload({});
      window.Reveal.navigateTo(h + 1, 0);
    }

    if (event.currentTarget.dataset.direction === 'bottom') {
      const h = this.section.state.h;
      const v = this.section.state.v;
      if (this.section.state.isSub) {
        const domAfter = this.section.dom;
        const newSection = document.createElement('section');
        newSection.innerHTML = templates.sectionTemplates.title;
        domAfter.insertAdjacentHTML('afterend', newSection.outerHTML);
        this.editor.reload({});
        window.Reveal.navigateTo(h, v + 1);
      } else {
        const mainSection = document.createElement('section');
        const newSection = document.createElement('section');
        newSection.innerHTML = templates.sectionTemplates.title;
        const clonedCurrentSectionHtml = this.section.dom.outerHTML;
        mainSection.innerHTML = clonedCurrentSectionHtml;
        mainSection.appendChild(newSection);
        this.section.dom.outerHTML = mainSection.outerHTML;

        this.editor.reload({});
        window.Reveal.navigateTo(h, v + 1);
      }
    }
  }

  batchMoveSection = ({ direction }) => {

  }

  moveSection = (event) => {
    console.log(event.currentTarget.dataset.direction);
  }

  removeSection = () => {

  }
}

export default SectionArrangement;

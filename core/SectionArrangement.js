/* eslint-disable no-param-reassign, radix */

import plusSvg from './svgResource/plus.svg';
import arrowLeft from './svgResource/arrow-left2.svg';
import arrowRight from './svgResource/arrow-right2.svg';
import arrowUp from './svgResource/arrow-up2.svg';
import arrowDown from './svgResource/arrow-down2.svg';
import embedLeft from './svgResource/arrow-down-left2.svg';
import embedRight from './svgResource/arrow-down-right2.svg';
import bin from './svgResource/bin.svg';
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
      event.currentTarget.querySelector('svg').style.fill = 'lightgrey';
    });
    this.bottomAdd.addEventListener('mouseleave', (event) => {
      event.currentTarget.querySelector('svg').style.fill = 'lightgrey';
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


    this.embedleft = document.createElement('div');
    this.embedleft.innerHTML = embedLeft;
    this.embedleft.dataset.direction = 'embedleft';
    this.embedleft.classList.add('arranging-ui');
    this.embedright = document.createElement('div');
    this.embedright.innerHTML = embedRight;
    this.embedright.dataset.direction = 'embedright';
    this.embedright.classList.add('arranging-ui');


    this.remove = document.createElement('div');
    this.remove.innerHTML = bin;
    this.remove.dataset.direction = 'remove';
    this.remove.classList.add('arranging-ui');

    this.arrangingButtons = this.getEnabledArrangingButtons();

    this.arrangingButtons.forEach((dom) => {
      dom.addEventListener('mouseenter', (event) => {
        const theme = this.editor.services.theme.getTheme();
        event.currentTarget.querySelector('svg').style.fill = theme.sectionAdd;
      });
      dom.addEventListener('mouseleave', (event) => {
        event.currentTarget.querySelector('svg').style.fill = 'lightgrey';
      });
      this.section.dom.appendChild(dom);
      dom.addEventListener('click', this.moveSection);
      dom.style.display = this.editor.isOverview() ? 'block' : 'none';
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

  getEnabledArrangingButtons = () => {
    const arrangingButtons = [];
    const h = this.section.state.h;
    const v = this.section.state.v;
    const isSub = this.section.state.isSub;
    const struct = this.editor.state.struct;

    if (struct[1] || struct[0] !== true) {
      arrangingButtons.push(this.remove);
    }

    if (isSub) {
      arrangingButtons.push(this.left);
      arrangingButtons.push(this.right);
      if (struct[h - 1]) {
        arrangingButtons.push(this.embedleft);
      }
      if (struct[h + 1]) {
        arrangingButtons.push(this.embedright);
      }
    } else {
      if (struct[h - 1]) {
        arrangingButtons.push(this.left);
        arrangingButtons.push(this.embedleft);
      }
      if (struct[h + 1]) {
        arrangingButtons.push(this.right);
        arrangingButtons.push(this.embedright);
      }
    }

    if (isSub && struct[h][v - 1]) {
      arrangingButtons.push(this.up);
    }

    if (isSub && struct[h][v + 1]) {
      arrangingButtons.push(this.down);
    }


    return arrangingButtons;
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

  moveSection = (event) => {
    event.stopPropagation();
    const h = this.section.state.h;
    const v = this.section.state.v;
    const isSub = this.section.state.isSub;
    const struct = this.editor.state.struct;

    switch (event.currentTarget.dataset.direction) {
      case 'left': {
        if (isSub) {
          const parentSection = this.section.dom.parentNode;
          const sectionHtml = this.section.dom.outerHTML;

          this.section.dom.parentNode.removeChild(this.section.dom);
          parentSection.insertAdjacentHTML('beforeBegin', sectionHtml);

          if (parentSection.querySelectorAll('section').length === 1) {
            parentSection.innerHTML = parentSection.querySelector('section').innerHTML;
          }

          this.editor.reload({ toOverview: true, h, v: 0 });
        } else {
          const previousSection = this.section.dom.previousElementSibling;
          const sectionHtml = this.section.dom.outerHTML;
          this.section.dom.parentNode.removeChild(this.section.dom);
          previousSection.insertAdjacentHTML('beforeBegin', sectionHtml);

          this.editor.reload({ toOverview: true, h: h - 1, v: 0 });
        }
        break;
      }
      case 'right': {
        if (isSub) {
          const parentSection = this.section.dom.parentNode;
          const sectionHtml = this.section.dom.outerHTML;
          this.section.dom.parentNode.removeChild(this.section.dom);
          parentSection.insertAdjacentHTML('afterEnd', sectionHtml);

          if (parentSection.querySelectorAll('section').length === 1) {
            parentSection.innerHTML = parentSection.querySelector('section').innerHTML;
          }

          this.editor.reload({ toOverview: true, h: h + 1, v: 0 });
        } else {
          const nextSection = this.section.dom.nextElementSibling;
          const sectionHtml = this.section.dom.outerHTML;
          this.section.dom.parentNode.removeChild(this.section.dom);
          nextSection.insertAdjacentHTML('afterEnd', sectionHtml);

          this.editor.reload({ toOverview: true, h: h + 1, v: 0 });
        }
        break;
      }
      case 'embedleft': {
        let previousSection = this.section.dom.previousElementSibling;
        let clonedSection = this.section.dom.cloneNode(true);
        const parentSection = this.section.dom.parentNode;

        if (isSub) {
          previousSection = parentSection.previousElementSibling;
          clonedSection = this.section.dom.cloneNode(true);
        }

        if (previousSection.querySelectorAll('section').length > 0) {
          previousSection.appendChild(clonedSection);
        } else {
          const clonedPreviousSection = previousSection.cloneNode(true);
          const newSection = document.createElement('section');
          newSection.appendChild(clonedPreviousSection);
          newSection.appendChild(clonedSection);
          previousSection.innerHTML = newSection.innerHTML;
        }

        this.section.dom.parentNode.removeChild(this.section.dom);

        if (isSub) {
          if (parentSection.querySelectorAll('section').length === 1) {
            parentSection.innerHTML = parentSection.querySelector('section').innerHTML;
          }
        }

        this.editor.reload({
          toOverview: true,
          h: h - 1,
          v: struct[h - 1] === true ? 1 : (struct[h - 1].count),
        });
        break;
      }
      case 'embedright': {
        let nextSection = this.section.dom.nextElementSibling;
        let clonedSection = this.section.dom.cloneNode(true);
        const parentSection = this.section.dom.parentNode;

        if (isSub) {
          nextSection = parentSection.nextElementSibling;
          clonedSection = this.section.dom.cloneNode(true);
        }

        if (nextSection.querySelectorAll('section').length > 0) {
          nextSection.appendChild(clonedSection);
        } else {
          const clonedPreviousSection = nextSection.cloneNode(true);
          const newSection = document.createElement('section');
          newSection.appendChild(clonedPreviousSection);
          newSection.appendChild(clonedSection);
          nextSection.innerHTML = newSection.innerHTML;
        }

        this.section.dom.parentNode.removeChild(this.section.dom);

        if (isSub) {
          if (parentSection.querySelectorAll('section').length === 1) {
            parentSection.innerHTML = parentSection.querySelector('section').innerHTML;
          }
        }

        this.editor.reload({
          toOverview: true,
          h: h + 1,
          v: struct[h + 1] === true ? 1 : (struct[h + 1].count),
        });
        break;
      }
      default: {

      }
    }
  }
}

export default SectionArrangement;

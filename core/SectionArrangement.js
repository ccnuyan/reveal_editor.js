/* eslint-disable no-param-reassign, radix */

import templates from './templates';

class SectionArrangement {
  constructor({ parent }) {
    this.editor = parent.editor;
    this.section = parent;
    this.initializeSectionAddButtons();
    this.initializeArrangementButtons();
  }

  initializeSectionAddButtons = () => {
    this.rightAdd = document.createElement('button');
    this.rightAdd.innerHTML = '<i class="icon-plus dead-center" />';
    this.rightAdd.dataset.direction = 'right';
    this.bottomAdd = document.createElement('button');
    this.bottomAdd.innerHTML = '<i class="icon-plus dead-center" />';
    this.bottomAdd.dataset.direction = 'bottom';

    this.rightAdd.setAttribute('class', 'editing-ui section-manipulator section-add');
    this.bottomAdd.setAttribute('class', 'editing-ui section-manipulator section-add');

    this.section.dom.appendChild(this.rightAdd);
    this.section.dom.appendChild(this.bottomAdd);

    this.rightAdd.addEventListener('click', this.createSection);
    this.bottomAdd.addEventListener('click', this.createSection);

    this.addButtons = [this.rightAdd, this.bottomAdd];
  }

  initializeArrangementButtons = () => {
    this.left = document.createElement('button');
    this.left.innerHTML = '<i class="icon-angle-left dead-center" />';
    this.left.dataset.direction = 'left';
    this.left.setAttribute('class', 'section-manipulator arranging-ui');
    this.right = document.createElement('div');
    this.right.innerHTML = '<i class="icon-angle-right dead-center" />';
    this.right.dataset.direction = 'right';
    this.right.setAttribute('class', 'section-manipulator arranging-ui');
    this.up = document.createElement('div');
    this.up.innerHTML = '<i class="icon-angle-up dead-center" />';
    this.up.dataset.direction = 'up';
    this.up.setAttribute('class', 'section-manipulator arranging-ui');
    this.down = document.createElement('div');
    this.down.innerHTML = '<i class="icon-angle-down dead-center" />';
    this.down.dataset.direction = 'down';
    this.down.setAttribute('class', 'section-manipulator arranging-ui');

    this.embedleft = document.createElement('div');
    this.embedleft.innerHTML = '<i class="icon-angle-down dead-center" />';
    this.embedleft.dataset.direction = 'embedleft';
    this.embedleft.setAttribute('class', 'section-manipulator arranging-ui');
    this.embedright = document.createElement('div');
    this.embedright.innerHTML = '<i class="icon-angle-right dead-center" />';
    this.embedright.dataset.direction = 'embedright';
    this.embedright.setAttribute('class', 'section-manipulator arranging-ui');

    this.batchleft = document.createElement('div');
    this.batchleft.innerHTML = '<i class="icon-angle-double-left dead-center" />';
    this.batchleft.dataset.direction = 'batchleft';
    this.batchleft.setAttribute('class', 'section-manipulator arranging-ui');
    this.batchright = document.createElement('div');
    this.batchright.innerHTML = '<i class="icon-angle-double-right dead-center" />';
    this.batchright.dataset.direction = 'batchright';
    this.batchright.setAttribute('class', 'section-manipulator arranging-ui');

    this.remove = document.createElement('div');
    this.remove.innerHTML = '<i class="icon-trash-o dead-center" />';
    this.remove.dataset.direction = 'remove';
    this.remove.setAttribute('class', 'section-manipulator arranging-ui');

    this.arrangingButtons = this.getEnabledArrangingButtons();

    this.arrangingButtons.forEach((dom) => {
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

    if (struct[h - 1]) {
      if (!isSub || v === 0) {
        arrangingButtons.push(this.batchleft);
      }
    }
    if (struct[h + 1]) {
      if (!isSub || v === 0) {
        arrangingButtons.push(this.batchright);
      }
    }

    return arrangingButtons;
  }

  createSection = (event) => {
    event.stopPropagation();

    this.editor.services.undoredo.enqueue();

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

    this.editor.services.undoredo.enqueue();

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
            Object.keys(parentSection.querySelector('section').dataset).forEach((key) => {
              parentSection.dataset[key] = parentSection.querySelector('section').dataset[key];
            });
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
            Object.keys(parentSection.querySelector('section').dataset).forEach((key) => {
              parentSection.dataset[key] = parentSection.querySelector('section').dataset[key];
            });
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
      case 'up': {
        const previousSection = this.section.dom.previousElementSibling;
        const sectionHtml = this.section.dom.outerHTML;
        this.section.dom.parentNode.removeChild(this.section.dom);
        previousSection.insertAdjacentHTML('beforeBegin', sectionHtml);
        this.editor.reload({ toOverview: true, h, v: v - 1 });
        break;
      }
      case 'down': {
        const nextSection = this.section.dom.nextElementSibling;
        const sectionHtml = this.section.dom.outerHTML;
        this.section.dom.parentNode.removeChild(this.section.dom);
        nextSection.insertAdjacentHTML('afterEnd', sectionHtml);
        this.editor.reload({ toOverview: true, h, v: v + 1 });
        break;
      }
      case 'batchleft': {
        let tobemoved = this.section.dom;
        if (isSub) {
          tobemoved = this.section.dom.parentNode;
        }
        const dombefore = tobemoved.previousElementSibling;
        const sectionHtml = tobemoved.outerHTML;
        tobemoved.parentNode.removeChild(tobemoved);
        dombefore.insertAdjacentHTML('beforeBegin', sectionHtml);

        this.editor.reload({ toOverview: true, h: h - 1, v: 0 });
        break;
      }
      case 'batchright': {
        let tobemoved = this.section.dom;
        if (isSub) {
          tobemoved = this.section.dom.parentNode;
        }
        const domafter = tobemoved.nextElementSibling;
        const sectionHtml = tobemoved.outerHTML;
        tobemoved.parentNode.removeChild(tobemoved);
        domafter.insertAdjacentHTML('afterend', sectionHtml);

        this.editor.reload({ toOverview: true, h: h + 1, v: 0 });
        break;
      }

      case 'remove' : {
        const parentNode = this.section.dom.parentNode;
        this.section.dom.parentNode.removeChild(this.section.dom);

        if (isSub) {
          if (parentNode.querySelectorAll('section').length === 1) {
            const insideSection = parentNode.querySelector('section');
            parentNode.innerHTML = insideSection.innerHTML;
          }
          this.editor.reload({ toOverview: true, h, v: Math.max(v - 1, 0) });
        } else {
          this.editor.reload({ toOverview: true, h: h - 1, v: 0 });
        }

        break;
      }
      default: {
        break;
      }
    }
  }
}

export default SectionArrangement;

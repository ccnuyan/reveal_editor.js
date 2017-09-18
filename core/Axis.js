import _ from 'lodash';
import Elements from './Elements';

class Axis extends Elements {
  constructor({ section }) {
    const axis = document.createElement('div');
    axis.setAttribute('class', 'axis', 'editing-ui');

    super({ parent: section, el: axis });

    this.section = section;
    this.editor = section.editor;
    this.section.dom.appendChild(this.dom);

    this.initGrid();

    window.Reveal.isOverview() ? this.hide() : this.show();

    window.Reveal.addEventListener('overviewshown', () => this.hide());
    window.Reveal.addEventListener('overviewhidden', () => {
      if (this.editor.state.status === 'editing') {
        this.show();
      } else {
        this.hide();
      }
    });
  }

  activate = _.debounce((vs, hs) => {
    this.activateImmediately(vs, hs);
  }, 100, { maxWait: 500 })

  /* eslint-disable no-param-reassign */
  activateImmediately = (vs, hs) => {
    const { left, top } = this.section.dom.getBoundingClientRect();

    this.horizontalLines.forEach(h => h.active = false);
    this.verticalLines.forEach(v => v.active = false);

    vs.forEach((v) => {
      _.some(this.horizontalLines, (hl) => {
        if (!hl.active) {
          hl.active = Math.abs((hl.v - v) + top) < 0.99;
          return hl.active;
        }
        return false;
      });
    });

    hs.forEach((h) => {
      _.some(this.verticalLines, (vl) => {
        if (!vl.active) {
          vl.active = Math.abs((vl.h - h) + left) < 0.99;
          return vl.active;
        }
        return false;
      });
    });

    this.horizontalLines.forEach((hl) => {
      hl.rect.style.borderTopColor = hl.active ? 'rgba(255,0,0,0.4)' : 'rgba(128,128,128,0.2)';
      // hl.rect.style.borderTopStyle = hl.active ? 'solid' : 'dashed';
    });
    this.verticalLines.forEach((vl) => {
      vl.rect.style.borderLeftColor = vl.active ? 'rgba(255,0,0,0.4)' : 'rgba(128,128,128,0.2)';
      // vl.rect.style.borderLeftStyle = vl.active ? 'solid' : 'dashed';
    });
  }

  clearActives= () => {
    this.horizontalLines.forEach((h) => {
      h.active = false;
      h.rect.style.borderTopColor = 'rgba(128,128,128,0.2)';
    });
    this.verticalLines.forEach((v) => {
      v.active = false;
      v.rect.style.borderLeftColor = 'rgba(128,128,128,0.2)';
    });
  }

  /* eslint-disable no-param-reassign */

  initGrid = () => {
    this.horizontalLines = [];
    for (let i = 1; i < 10; i += 1) {
      const rect = document.createElement('div');
      rect.style.height = '70px';
      rect.style.position = 'absolute';
      rect.style.top = `${(i * 70) - 1}px`;
      rect.style.width = '100%';
      rect.style.borderTopWidth = '1px';
      rect.style.borderTopColor = 'rgba(128,128,128,0.2)';
      rect.style.borderTopStyle = 'dashed';

      this.dom.appendChild(rect);
      this.horizontalLines.push({ v: i * 70,
        rect,
      });
    }

    this.verticalLines = [];
    for (let i = 1; i < 12; i += 1) {
      const rect = document.createElement('div');
      rect.style.width = '80px';
      rect.style.position = 'absolute';
      rect.style.left = `${(i * 80) - 1}px`;
      rect.style.height = '100%';
      rect.style.borderLeftWidth = '1px';
      rect.style.borderLeftColor = 'rgba(128,128,128,0.2)';
      rect.style.borderLeftStyle = 'dashed';

      this.dom.appendChild(rect);
      this.verticalLines.push({ h: i * 80,
        rect });
    }
  }
}

export default Axis;

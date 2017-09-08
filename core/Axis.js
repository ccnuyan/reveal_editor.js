import _ from 'lodash';
import _u from './util';
import Elements from './Elements';

class Axis extends Elements {
  constructor({ section }) {
    const axis = _u.create('div', ['axis', 'editing-ui'], {
      position: 'absolute',
      left: '50%',
      top: '50%',
      marginLeft: '-480px',
      marginTop: '-350px',
      pointerEvents: 'none',
      display: 'true',
      width: '960px',
      height: '700px',
      userSelect: 'none',
      border: '1px solid rgba(128,128,128,0.3)',
      zIndex: '-1',
    });

    super({ parent: section, el: axis });

    this.section = section;
    this.editor = section.editor;
    this.section.dom.appendChild(this.dom);

    this.initGrid();

    window.Reveal.isOverview() ? this.hide() : this.show();

    window.Reveal.addEventListener('overviewshown', () => this.hide());
    window.Reveal.addEventListener('overviewhidden', () => {
      if (this.editor.state.mode === 'editing') {
        this.show();
      } else {
        this.hide();
      }
    });
  }
  /* eslint-disable no-param-reassign */
  activate = (vs, hs) => {
    const { left, top } = this.section.dom.getBoundingClientRect();

    this.horizontalLines.forEach(h => h.active = false);
    this.verticalLines.forEach(v => v.active = false);

    vs.forEach((v) => {
      _.some(this.horizontalLines, (hl) => {
        if (!hl.active) {
          hl.active = Math.abs((hl.v - v) + top) < 0.6;
          return hl.active;
        }
        return false;
      });
    });

    hs.forEach((h) => {
      _.some(this.verticalLines, (vl) => {
        if (!vl.active) {
          vl.active = Math.abs((vl.h - h) + left) < 0.6;
          return vl.active;
        }
        return false;
      });
    });

    this.horizontalLines.forEach((hl) => {
      hl.rect.style.borderTopColor = hl.active ? 'red' : 'lightgray';
      // hl.rect.style.borderTopStyle = hl.active ? 'solid' : 'dashed';
    });
    this.verticalLines.forEach((vl) => {
      vl.rect.style.borderLeftColor = vl.active ? 'red' : 'lightgray';
      // vl.rect.style.borderLeftStyle = vl.active ? 'solid' : 'dashed';
    });
  }

  clearActives= () => {
    this.horizontalLines.forEach((h) => {
      h.active = false;
      h.rect.style.borderTopColor = 'lightgray';
    });
    this.verticalLines.forEach((v) => {
      v.active = false;
      v.rect.style.borderLeftColor = 'lightgray';
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
      rect.style.borderTopColor = 'lightgray';
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
      rect.style.borderLeftColor = 'lightgray';
      rect.style.borderLeftStyle = 'dashed';

      this.dom.appendChild(rect);
      this.verticalLines.push({ h: i * 80,
        rect });
    }
  }
}

export default Axis;

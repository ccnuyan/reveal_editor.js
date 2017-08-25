import _u from './util';
import Elements from './Elements';

class Axis extends Elements {
  constructor({ section }) {
    const axis = _u.create('canvas', ['axis', 'editing-ui'], {
      position: 'absolute',
      left: '50%',
      top: '50%',
      marginLeft: '-480px',
      marginTop: '-350px',
      pointerEvents: 'none',
      display: 'true',
      fontSize: '1em',
      width: '960px',
      height: '700px',
      userSelect: 'none',
      border: '2px solid rgba(128,128,128,0.3)',
    });

    super({ parent: section, el: axis });

    this.section = section;
    this.editor = section.editor;

    this.dom.setAttribute('width', '960');
    this.dom.setAttribute('height', '700');

    function initGrid(ax) {
      const context = ax.getContext('2d');
      context.beginPath();
      for (let left = 80; left < 960; left += 80) {
        context.moveTo(left, 0);
        context.lineTo(left, 700);
      }
      for (let top = 70; top < 700; top += 70) {
        context.moveTo(0, top);
        context.lineTo(960, top);
      }
      context.strokeStyle = 'rgba(128,128,128,0.3)';
      context.stroke();
    }

    initGrid(this.dom);
    this.section.dom.appendChild(this.dom);

    this.dom.style.display = this.editor.isOverview() ? 'none' : 'block';
    window.Reveal.addEventListener('overviewshown', () => this.hide());
    window.Reveal.addEventListener('overviewhidden', () => {
      if (this.editor.state.mode === 'editing') {
        this.show();
      } else {
        this.hide();
      }
    });

  // this.editor.addEventListener('onEnterEditMode', () => {
  //   if (Reveal.isOverview()) {
  //     Reveal.toggleOverview();
  //   }
  //   this.dom.style.display = 'block';
  // });

  // this.editor.addEventListener('onEnterPreviewMode', () => {
  //   this.dom.style.display = 'none';
  // });

  // Reveal.addEventListener('overviewhidden', () => {
  //   this.dom.style.display = 'block';
  // });

  // Reveal.addEventListener('overviewshown', () => {
  //   this.dom.style.display = 'none';
  // });
  }
}

export default Axis;

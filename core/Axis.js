import _u from './util';

function Axis(reveal) {
  this.reveal = reveal;
  this.slides = reveal.querySelector('.slides');
  if (!this.slides) {
    throw new Error('slides not found!');
  }
  this.element = _u.create('canvas', ['axis', 'editing-ui'], {
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

  this.element.setAttribute('width', '960');
  this.element.setAttribute('height', '700');

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

  initGrid(this.element);
  this.slides.appendChild(this.element);

  // this.editor.addEventListener('onEnterEditMode', () => {
  //   if (Reveal.isOverview()) {
  //     Reveal.toggleOverview();
  //   }
  //   this.element.style.display = 'block';
  // });

  // this.editor.addEventListener('onEnterPreviewMode', () => {
  //   this.element.style.display = 'none';
  // });

  // Reveal.addEventListener('overviewhidden', () => {
  //   this.element.style.display = 'block';
  // });

  // Reveal.addEventListener('overviewshown', () => {
  //   this.element.style.display = 'none';
  // });
}

export default Axis;

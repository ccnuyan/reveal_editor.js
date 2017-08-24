
/* eslint-disable max-len */
class KatexEditor {
  constructor() {
    if (document.body.querySelector('#katex_editor')) {
      throw new Error('that shouldnot happen');
    } else {
      this.createFrame();
      this.createInputOutput();
    }
  }

  createFrame() {
    this.frame = document.createElement('div');
    this.frame.setAttribute('id', 'katex_editor');
    this.frame.style.left = '0';
    this.frame.style.top = '0';
    this.frame.style.position = 'fixed';
    this.frame.style.width = '100%';
    this.frame.style.height = '100%';
    this.frame.style.zIndex = 255;
    this.frame.style.backgroundColor = 'black';
    document.body.appendChild(this.frame);
    this.frame.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    this.close = document.createElement('div');
    this.close.innerHTML = `<svg width="100%" height="100%" id="icon-close" viewBox="0 0 22 28" fill="grey">
    <title>close</title>
        <path d="M20.281 20.656c0 0.391-0.156 0.781-0.438 1.062l-2.125 2.125c-0.281 0.281-0.672 0.438-1.062 0.438s-0.781-0.156-1.062-0.438l-4.594-4.594-4.594 4.594c-0.281 0.281-0.672 0.438-1.062 0.438s-0.781-0.156-1.062-0.438l-2.125-2.125c-0.281-0.281-0.438-0.672-0.438-1.062s0.156-0.781 0.438-1.062l4.594-4.594-4.594-4.594c-0.281-0.281-0.438-0.672-0.438-1.062s0.156-0.781 0.438-1.062l2.125-2.125c0.281-0.281 0.672-0.438 1.062-0.438s0.781 0.156 1.062 0.438l4.594 4.594 4.594-4.594c0.281-0.281 0.672-0.438 1.062-0.438s0.781 0.156 1.062 0.438l2.125 2.125c0.281 0.281 0.438 0.672 0.438 1.062s-0.156 0.781-0.438 1.062l-4.594 4.594 4.594 4.594c0.281 0.281 0.438 0.672 0.438 1.062z"></path>
    </svg>`;
    this.close.style.position = 'absolute';
    this.close.style.right = '20px';
    this.close.style.top = '20px';
    this.close.style.width = '48px';
    this.close.style.height = '48px';

    this.closesvg = this.close.querySelector('svg');

    this.check = document.createElement('div');
    this.check.innerHTML = `<svg width="100%" height="100%" id="icon-close" viewBox="0 0 28 28" fill="grey">
    <title>check</title>
        <path d="M26.109 8.844c0 0.391-0.156 0.781-0.438 1.062l-13.438 13.438c-0.281 0.281-0.672 0.438-1.062 0.438s-0.781-0.156-1.062-0.438l-7.781-7.781c-0.281-0.281-0.438-0.672-0.438-1.062s0.156-0.781 0.438-1.062l2.125-2.125c0.281-0.281 0.672-0.438 1.062-0.438s0.781 0.156 1.062 0.438l4.594 4.609 10.25-10.266c0.281-0.281 0.672-0.438 1.062-0.438s0.781 0.156 1.062 0.438l2.125 2.125c0.281 0.281 0.438 0.672 0.438 1.062z"></path>
    </symbol>`;
    this.check.style.position = 'absolute';
    this.check.style.right = '88px';
    this.check.style.top = '20px';
    this.check.style.width = '48px';
    this.check.style.height = '48px';
    this.check.style.height = '48px';

    this.checksvg = this.check.querySelector('svg');

    this.frame.appendChild(this.close);
    this.frame.appendChild(this.check);

    this.close.addEventListener('click', () => {
      this.hide();
      if (this.cancelCallback) {
        this.cancelCallback(this.output.innerHTML);
      }
    });

    this.check.addEventListener('click', () => {
      this.hide();
      if (this.okCallback) {
        this.okCallback(this.output.innerHTML);
      }
    });


    this.close.addEventListener('mouseenter', () => {
      this.closesvg.setAttribute('fill', 'red');
    });

    this.check.addEventListener('mouseenter', () => {
      this.checksvg.setAttribute('fill', 'lightgreen');
    });


    this.close.addEventListener('mouseleave', () => {
      this.closesvg.setAttribute('fill', 'grey');
    });

    this.check.addEventListener('mouseleave', () => {
      this.checksvg.setAttribute('fill', 'grey');
    });
  }

  createInputOutput() {
    this.main = document.createElement('div');
    this.main.setAttribute('id', 'katex_editor_main');

    this.main.style.left = '50%';
    this.main.style.marginLeft = '-480px';
    this.main.style.top = '0';
    this.main.style.position = 'absolute';
    this.main.style.width = '960px';
    this.main.style.height = '100%';
    this.main.style.backgroundColor = 'black';
    this.frame.appendChild(this.main);

    this.output = document.createElement('div');
    this.output.setAttribute('id', 'katex_editor_output');
    this.input = document.createElement('textarea');
    this.input.setAttribute('id', 'katex_editor_input');

    this.output.style.marginLeft = '40px';
    this.output.style.marginRight = '40px';
    this.output.style.marginTop = '80px';
    this.output.style.marginBottom = '20px';
    this.output.style.width = '880px';
    this.output.style.minHeight = '300px';
    this.output.style.color = 'white';
    this.output.style.fontSize = '36px';

    this.input.style.position = 'absolute';
    this.input.style.paddingTop = '10px';
    this.input.style.padding = '10px';
    this.input.style.left = '40px';
    this.input.style.right = '40px';
    this.input.style.bottom = '40px';
    this.input.style.width = '880px';
    this.input.style.height = '40%';
    this.input.style.backgroundColor = 'grey';
    this.input.style.borderStyle = 'none';
    this.input.style.fontSize = '36px';
    this.input.style.color = 'white';
    this.input.style.lineHeight = '100%';

    this.main.appendChild(this.output);
    this.main.appendChild(this.input);

    this.input.focus();
    this.input.addEventListener('input', this.render);
  }

  render = () => {
    try {
      const rendered = katex.renderToString(this.input.value, {
        displayMode: true,
        throwOnError: false,
        errorColor: '#ff329f',
      });
      this.output.innerHTML = rendered;
    } catch (err) {
      console.log('something wrong');
    }
  }

  load = ({ latex }, okCallback, cancelCallback) => {
    if (okCallback) {
      this.okCallback = okCallback;
    }
    if (cancelCallback) {
      this.okCallback = okCallback;
    }
    this.show();
    this.input.value = latex.trim();
    this.render();
  }

  show= () => {
    this.frame.style.display = 'block';
  }

  hide= () => {
    this.frame.style.display = 'none';
  }
}

export default KatexEditor;

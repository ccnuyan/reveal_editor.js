import './LatexEditor.scss';

/* eslint-disable max-len */
class LatexEditor {
  constructor() {
    if (document.body.querySelector('.latex-editor')) {
      throw new Error('that shouldnot happen');
    } else {
      this.createFrame();
      this.createInputOutput();
    }
  }

  createFrame() {
    this.frame = document.createElement('div');
    this.frame.setAttribute('class', 'latex-editor');
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

    this.close = document.createElement('button');
    this.close.setAttribute('class', ' close');
    this.close.innerHTML = '<i class="icon-close dead-center" />';

    this.closesvg = this.close.querySelector('svg');

    this.check = document.createElement('button');
    this.check.setAttribute('class', ' check');
    this.check.innerHTML = '<i class="icon-check dead-center" />';

    this.checksvg = this.check.querySelector('svg');

    this.frame.appendChild(this.close);
    this.frame.appendChild(this.check);

    this.close.addEventListener('click', (event) => {
      event.stopPropagation();
      this.hide();
      if (this.cancelCallback) {
        this.cancelCallback({
          output: this.output.innerHTML,
          input: this.input.value,
        });
      }
    });

    this.check.addEventListener('click', (event) => {
      event.stopPropagation();
      this.hide();
      if (this.okCallback) {
        this.okCallback({
          output: this.output.innerHTML,
          input: this.input.value,
        });
      }
    });
  }

  createInputOutput() {
    this.main = document.createElement('div');
    this.main.setAttribute('id', 'latex_editor_main');

    this.main.style.left = '50%';
    this.main.style.marginLeft = '-480px';
    this.main.style.top = '0';
    this.main.style.position = 'absolute';
    this.main.style.width = '960px';
    this.main.style.height = '100%';
    this.main.style.backgroundColor = 'black';
    this.frame.appendChild(this.main);

    this.output = document.createElement('div');
    this.output.setAttribute('id', 'latex_editor_output');
    this.input = document.createElement('textarea');
    this.input.setAttribute('id', 'latex_editor_input');

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

export default LatexEditor;

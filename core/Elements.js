class Elements {
  constructor({ parent, el }) {
    this.parent = parent;
    this.dom = el;
    this.state = {};
  }
  show = () => {
    this.dom.style.display = '';
  }

  hide = () => {
    this.dom.style.display = 'none';
  }
}

export default Elements;

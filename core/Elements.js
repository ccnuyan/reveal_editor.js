
import _u from './util';

class Elements {
  constructor({ parent, el }) {
    this.parent = parent;
    this.dom = el;
    this.state = {};
  }
  show = () => {
    _u.show(this.dom);
  }

  hide = () => {
    _u.hide(this.dom);
  }
}

export default Elements;


import { expect } from 'chai';
import _u from './util';

class Elements {
  constructor({ parent, el }) {
    expect(parent).to.exist;
    expect(el).to.exist;
    this.parent = parent;
    this.dom = el;
  }
  show = () => {
    _u.show(this.dom);
  }

  hide = () => {
    _u.hide(this.dom);
  }
}

export default Elements;

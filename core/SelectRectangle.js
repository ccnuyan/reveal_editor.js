import { expect } from 'chai';
import _u from './util';
import _config from './config';
import Elements from './Elements';

class SelectRectangle extends Elements {
  constructor({ parent, el }) {
    super({ parent, el });
  }
}

export default SelectRectangle;

import _ from 'lodash';

const baseConf = {
  embedded: true,
  slideNumber: true,
  controls: true,
  progress: false,
  history: false,
  center: false,
  width: 960,
  height: 700,
  touch: false,
  margin: 0.1,
  transition: 'slide',
  fragments: false,
};

export default {
  editingConf: _.assign({
    minScale: 1,
    maxScale: 1,
  }, baseConf),
  presentationPreviewConf: _.assign({
    minScale: 0.3,
    maxScale: 1.5,
  }, baseConf),
};

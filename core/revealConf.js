import _ from 'lodash';

const baseConf = {
  controls: true,
  progress: true,
  history: true,
  center: false,
  width: 960,
  height: 700,
  margin: 0.1,
  transition: 'slide',
};

export default {
  adConf: _.assign({
    minScale: 0.3,
    maxScale: 1.5,
    autoSlide: 5000,
    history: false,
    loop: true,
  }, baseConf),
  editingConf: _.assign({
    minScale: 1,
    maxScale: 1,
  }, baseConf),
  presentationPreviewConf: _.assign({
    minScale: 0.3,
    maxScale: 1.5,
  }, baseConf),
  playConf: _.assign({
    minScale: 0.3,
    maxScale: 1.5,
    dependencies: [],
  }, baseConf),
};

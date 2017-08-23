const styles = {
  anchor: {
    position: 'absolute',
    width: '9px',
    height: '9px',
    borderRadius: '5px',
    border: '1px solid rgb(27, 173, 225)',
    display: 'block',
    margin: '-5px',
    background: '#fff',
    cursor: 'default',
  },
  rotateAnchor: {
    position: 'absolute',
    width: '20px',
    height: '20px',
    right: '0px',
    marginRight: '-22px',
    top: '0px',
    marginTop: '-22px',
    border: '0px',
    display: 'block',
    background: 'rgba(0,0,0,0)',
    cursor: 'default',
  },
  transform: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: '0px',
    top: '0px',
    zIndex: '255',
    cursor: 'pointer',
    border: '1px solid rgba(27, 173, 225, 0.7)',
    background: 'rgba(0,0,0,0.1)',
  },
  dragSelectRect: {
    position: 'absolute',
    zIndex: '255',
    pointerEvents: 'none',
    border: '2px solid rgba(27, 173, 225, 0.7)',
    background: 'rgba(27, 173, 225, 0.1)',
    display: 'none',
  },
  axis: {
    position: 'absolute',
    pointerEvents: 'none',
    display: 'none',
    fontSize: '1em',
    width: '100%',
    height: '100%',
    userSelect: 'none',
    border: '2px solid rgba(128,128,128,0.3)',
  },
  textBlock: {
    position: 'absolute',
    width: '660px',
    top: '100px',
    left: '150px',
  },
  imageBlock: {
    position: 'absolute',
    width: '480px',
    height: '320px',
    top: '100px',
    left: '200px',
  },
  imageContent: {
    width: '100%',
    height: '100%',
  },
  imageContentImageWide: {
    // border: '0px solid transparent',
    width: 'inherit',
    height: 'auto',
  },
  imageContentImageTall: {
    // border: '0px solid transparent',
    width: 'auto',
    height: 'inherit',
  },
  shapeBlock: {
    width: '200px',
    height: '200px',
  },
  subMenuPanel: {
    position: 'fixed',
    left: '120px',
    border: '0px solid transparent',
    bottom: '0px',
  },
};

const classnames = {
  editingUI: 'editing-ui',
  block: 'sl-block',
  transform: 'sl-block-transform',
  content: 'sl-block-content',
};

const selectors = {
  reveal: '.reveal',
  slides: '.slides',
  block: '.sl-block',
  transform: '.sl-block-transform',
  content: '.sl-block-content',
  textBlocks: '.sl-block[data-block-type=\'text\']',
  imageBlocks: '.sl-block[data-block-type=\'image\']',
};

export default {
  styles,
  classnames,
  selectors,
};

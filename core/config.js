const styles = {
  anchor: {
  },
  rotateAnchor: {
    position: 'absolute',
    width: '24px',
    height: '24px',
    right: '0px',
    marginRight: '-32px',
    top: '0px',
    marginTop: '-32px',
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
    border: '2px solid rgb(27, 173, 225)',
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
    width: '800px',
    top: '140px',
    left: '80px',
  },
  latexBlock: {
    position: 'absolute',
    padding: '20px',
    width: 'auto',
    height: 'auto',
    top: '210px',
    left: '160px',
  },
  imageBlock: {
    position: 'absolute',
    width: '480px',
    height: '320px',
    top: '280px',
    left: '240px',
  },
  imageContent: {
    width: '100%',
    height: '100%',
  },
  imageContentImage: {
    // border: '0px solid transparent',
    width: 'inherit',
    height: 'inherit',
    display: 'none',
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

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
    border: '2px solid rgba(27, 173, 225, 0.7)',
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
    padding: '0px',
    border: '0px solid transparent',
    margin: '0px',
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'inherit',
    height: 'auto',
  },
  imageContentImageTall: {
    padding: '0px',
    border: '0px solid transparent',
    margin: '0px',
    maxWidth: '100%',
    maxHeight: '100%',
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

const ckeditorPlugins = 'basicstyles,blockquote,colorbutton,colordialog,dialogadvtab,enterkey,entities,floatingspace,format,htmlwriter,justify,link,list,magicline,removeformat,toolbar,remove-extra-nbsp'; // eslint-disable-line

// ckeditor;

const ckeditorConfig = {};

ckeditorConfig.toolbar = [
  ['Format', 'FontSize', 'TextColor'],
  ['Bold', 'Italic', 'Underline', 'Strike', '-', 'RemoveFormat'],
  ['NumberedList', 'BulletedList', '-', 'Blockquote'],
  ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
  ['Link', 'Unlink'],
];

ckeditorConfig.allowedContent = {
  'h1 h2 h3 h4 h5 h6 p ul ol li blockquote span pre table col td tr': {
    styles: 'text-align,font-size,color',
    classes: 'fragment,fade-down,fade-up,fade-left,fade-right,fade-out,current-visible',
  },
  'strong em u s del ins': true,
  a: {
    attributes: '!href,target',
    classes: 'fragment',
  },
};

ckeditorConfig.plugins = ckeditorPlugins;

// Custom styles for the parts of CKE that are loaded into iframes (like dropdowns)
// ckeditorConfig.contentsCss = '/ckeditor/slides/editor.css';

// Always paste as plain text
ckeditorConfig.forcePasteAsPlainText = true;

// ckeditorConfig.skin = 'flat';

// Remove word formatting
ckeditorConfig.pasteFromWordRemoveFontStyles = true;
ckeditorConfig.pasteFromWordRemoveStyles = true;

// Don't disable browser/OS spell checking
ckeditorConfig.disableNativeSpellChecker = true;

// Available font sizes (label/value)
ckeditorConfig.fontSize_sizes = '50%/0.5em;70%/0.7em;90%/0.9em;100%/1.0em;120%/1.2em;140%/1.4em;160%/1.6em;180%/1.8em;200%/2.0em;250%/2.5em;300%/3.0em;400%/4.0em;500%/5.0em'; // eslint-disable-line

// Tags that appear in font format options
ckeditorConfig.format_tags = 'p;h1;h2;h3;pre';

// Make dialogs simpler
ckeditorConfig.removeDialogTabs = 'image:advanced;link:advanced';

// Enable plugins
ckeditorConfig.extraPlugins = 'link,font,remove-extra-nbsp,panelbutton,colorbutton';

// Disable plugins
ckeditorConfig.removePlugins = 'elementspath,contextmenu';

// Disable buttons
ckeditorConfig.removeButtons = 'Underline,Subscript,Superscript';

ckeditorConfig.startupFocus = true;

ckeditorConfig.floatSpaceDockedOffsetX = -6;
ckeditorConfig.floatSpaceDockedOffsetY = 10;


export default {
  styles,
  classnames,
  selectors,
  ckeditorConfig,
};

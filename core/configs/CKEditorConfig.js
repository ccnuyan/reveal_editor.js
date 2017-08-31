const ckeditorConfig = {};

const ckeditorPlugins = 'basicstyles,blockquote,colorbutton,colordialog,dialogadvtab,enterkey,entities,floatingspace,format,htmlwriter,justify,link,list,magicline,removeformat,toolbar,remove-extra-nbsp'; // eslint-disable-line

ckeditorConfig.toolbar = [
  // ['Format', 'FontSize', 'TextColor'],
  ['Format'],
  ['Bold', 'Italic', 'Underline', 'Strike', '-', 'RemoveFormat'],
  // ['NumberedList', 'BulletedList', '-', 'Blockquote'],
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

ckeditorConfig.floatSpaceDockedOffsetX = -4;
ckeditorConfig.floatSpaceDockedOffsetY = 10;

export default ckeditorConfig;

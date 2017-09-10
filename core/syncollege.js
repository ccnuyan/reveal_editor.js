import Editor from './Editor';
import templates from './templates';
import './css/editor.scss';

(() => {
  window.getParameterByName = (name) => {
    const url = window.location.href;
    const validname = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${validname}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  };

  const action = window.getParameterByName('action');

  switch (action) {
    case 'edit': {
      window.sc_info = {
        work_id: window.getParameterByName('action'),
      };
      break;
    }
    case 'tryit':
    default: {
      window.RevealEditor = new Editor({
        reveal: document.querySelector('.reveal'),
        initialHTML: templates.slidesTemplates.default,
      });
      window.RevealEditor.afterInstanciated();
    }
  }
})();

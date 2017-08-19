import Editor from './Editor';
import templates from './templates';
import './core.scss';

(() => {
  window.RevealEditor = new Editor({
    reveal: document.querySelector('.reveal'),
    initialHTML: templates.slidesTemplates.default,
  });
})();

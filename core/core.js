import Editor from './Editor';
import templates from './templates';
import './css/editor.scss';
import './reveal/reveal.scss';

(() => {
  window.RevealEditor = new Editor({
    reveal: document.querySelector('.reveal'),
    initialHTML: templates.slidesTemplates.default,
  });
})();

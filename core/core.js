import Editor from './Editor';
import './core.scss';

(() => {
  window.RevealEditor = new Editor(document.getElementById('reveal'));
})();

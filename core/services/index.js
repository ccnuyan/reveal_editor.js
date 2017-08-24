import ThemeService from './themeService';
import UndoRedoService from './undoredo';

export default (editor) => {
  return {
    theme: new ThemeService(editor),
    undoredo: new UndoRedoService(editor),
  };
};

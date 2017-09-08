import ThemeService from './themeService';
import UndoRedoService from './undoredo';
import Snapshot from './snapshot';

export default (editor) => {
  return {
    theme: new ThemeService(editor),
    undoredo: new UndoRedoService(editor),
    snapshot: new Snapshot(editor),
  };
};

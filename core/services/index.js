import ThemeService from './themeService';
import UndoRedoService from './undoredo';
import Snapshot from './Snapshot';


export default (editor) => {
  return {
    theme: new ThemeService(editor),
    undoredo: new UndoRedoService(editor),
    snapshot: Snapshot,
  };
};

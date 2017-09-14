import ThemeService from './ThemeService';
import UndoRedoService from './Undoredo';
import Snapshot from './Snapshot';

export default (editor) => {
  return {
    theme: new ThemeService(editor),
    undoredo: new UndoRedoService(editor),
    snapshot: new Snapshot(editor),
  };
};

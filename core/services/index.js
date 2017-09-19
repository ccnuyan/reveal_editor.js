// import ThemeService from './Theme';
import UndoRedoService from './Undoredo';
import SnapshotService from './Snapshot';

export default (editor) => {
  return {
    // theme: new ThemeService(editor),
    undoredo: new UndoRedoService(editor),
    snapshot: new SnapshotService(editor),
  };
};

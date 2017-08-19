import StoreService from './storeService';
import UndoRedoService from './undoredo';

export default (editor) => {
  return {
    store: new StoreService(editor),
    undoredo: new UndoRedoService(editor),
  };
};

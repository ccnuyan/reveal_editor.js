import editor from './editorActions';
import files from './filesActions';
import qiniuFineUploader from './qiniuFineUploader';

export default {
  editor,
  files: {
    ...files,
    ...qiniuFineUploader,
  },
};

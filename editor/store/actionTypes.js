const types = {
};

export const syncTypes = [
  'SET_EDIT_MODE',
  'SET_PREVIEW_MODE',
  'SET_EDITOR',
  'SET_CURRENT_SECTION',
  'SET_SELECTED_BLOCKS',
  'SET_CURRENT_BLOCK',

  'INSTANT_SAVE_START',
  'INSTANT_SAVE_END',
  'INSTANT_SAVE_ERROR',

  'UPLOAD_QUEUE',
  'UPLOAD_PROGRESS',
  'UPLOAD_DONE',
];

syncTypes.forEach((key) => {
  types[key] = key;
});

export default types;

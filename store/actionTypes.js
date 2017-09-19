const types = {
};

export const syncTypes = [
  'SET_EDIT_MODE',
  'SET_PREVIEW_MODE',
  'SET_EDITOR',
  'SET_CURRENT_SECTION',
  'SET_SELECTED_BLOCKS',
  'SET_CURRENT_BLOCK',
];

export const asyncTypes = [
  'INSTANT_SAVE',
  'FILES_UPLOAD_GET_TOKEN',

  'FILES_GET_UPLOADED',

  'FILES_UPLOAD_GET_TOKEN',
  'FILES_UPLOAD_PROGRESS',
  'FILES_UPDATE',
  'FILES_DELETE',
];

syncTypes.forEach((tp) => {
  types[tp] = tp;
});

asyncTypes.forEach((tp) => {
  types[`${tp}_START`] = `${tp}_START`;
  types[`${tp}_END`] = `${tp}_END`;
  types[`${tp}_ERROR`] = `${tp}_START`;
});

Object.keys(types).forEach((key) => {
  types[key] = key;
});

export default types;


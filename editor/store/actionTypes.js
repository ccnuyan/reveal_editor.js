const types = {
};

export const syncTypes = [
  'SET_EDIT_MODE',
  'SET_PREVIEW_MODE',
  'SET_CURRENT_SECTION',
  'SET_SELECTED_BLOCKS',
  'SET_CURRENT_BLOCK',
];

syncTypes.forEach((key) => {
  types[key] = key;
});

export default types;

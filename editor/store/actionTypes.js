const types = {
};

export const syncTypes = [
  'SET_EDIT_MODE',
  'SET_PREVIEW_MODE',
];

syncTypes.forEach((key) => {
  types[key] = key;
});

export default types;

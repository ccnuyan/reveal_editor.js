import ZIndexOptions from './ZIndexOptions';
import EditOptions from './EditOptions';

const commonOptions = [
  {
    component: ZIndexOptions,
    props: {
      key: '1',
      label: 'Depth',
      isMain: true,
    },
  },
  {
    component: EditOptions,
    props: {
      key: '2',
      label: 'Options',
      isMain: true,
    },
  },
];

export default commonOptions;

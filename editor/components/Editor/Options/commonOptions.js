import ZIndexOptions from './ZIndexOptions';
import RemoveOptions from './RemoveOptions';

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
    component: RemoveOptions,
    props: {
      key: '2',
      label: 'Remove',
      isMain: true,
    },
  },
];

export default commonOptions;

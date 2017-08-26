import BorderOptions from './BorderOptions';
import WidthOptions from './WidthOptions';
import ColorOptions from './ColorOptions';
import FontSizeOptions from './FontSizeOptions';


const b2oMap = {
  text: [
    {
      component: FontSizeOptions,
      props: {
        key: '1',
        label: 'Font Size',
        blockProp: 'fontSize',
        isMain: true,
      },
    },
    {
      component: ColorOptions,
      props: {
        key: '2',
        label: 'Font Color',
        blockProp: 'color',
        isMain: true,
      },
    },
    {
      component: BorderOptions,
      props: {
        key: '3',
      },
    },
    {
      component: ColorOptions,
      props: {
        key: '4',
        label: 'Background Color',
        blockProp: 'backgroundColor',
        isMain: true,
      },
    },
  ],
  image: [
    {
      component: BorderOptions,
      props: {
        key: '1',
      },
    },
  ],
  shape: [
    {
      component: ColorOptions,
      props: {
        key: '1',
        label: 'Stroke',
        blockProp: 'stroke',
        isMain: true,
      },
    },
    {
      component: WidthOptions,
      props: {
        key: '2',
        label: 'Stroke Width',
        blockProp: 'strokeWidth',
        suffix: '',
        isMain: true,
      },
    },
    {
      component: ColorOptions,
      props: {
        key: '3',
        label: 'Fill',
        blockProp: 'fill',
        isMain: true,
      },
    },
  ],
  icon: [
    {
      component: ColorOptions,
      props: {
        key: '2',
        label: 'Font Color',
        blockProp: 'fill',
        isMain: true,
      },
    },
  ],
  latex: [
    {
      component: FontSizeOptions,
      props: {
        key: '1',
        label: 'Font Size',
        blockProp: 'fontSize',
        isMain: true,
      },
    },
    {
      component: ColorOptions,
      props: {
        key: '2',
        label: 'Font Color',
        blockProp: 'color',
        isMain: true,
      },
    },
    {
      component: BorderOptions,
      props: {
        key: '3',
      },
    },
    {
      component: ColorOptions,
      props: {
        key: '4',
        label: 'Background Color',
        blockProp: 'backgroundColor',
        isMain: true,
      },
    },
  ],
};

export default b2oMap;

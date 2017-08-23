import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../../../store/actions';

import BorderOptions from './BorderOptions';
import WidthOptions from './WidthOptions';
import ColorOptions from './ColorOptions';
import FontSizeOptions from './FontSizeOptions';
import ZIndexOptions from './ZIndexOptions';
import RemoveOptions from './RemoveOptions';

// import ShapeOptions from './ShapeOptions';
// import IconOptions from './IconOptions';

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
};

class Elements extends Component {
  static propTypes = {
    selectedBlocks: PropTypes.array.isRequired,
  }

  getCommonOptions = () => {
    const optionsElements = [];
    commonOptions.forEach((option) => {
      const element = React.createElement(option.component, option.props);
      optionsElements.push(element);
    });

    return <div>{optionsElements}</div>;
  }

  getBlockOptions = (sb) => {
    const options = b2oMap[sb[0].blockType];

    const optionsElements = [];
    options.forEach((option) => {
      const element = React.createElement(option.component, option.props);
      optionsElements.push(element);
    });

    return <div>{optionsElements}</div>;
  }

  render = () => {
    const sb = this.props.selectedBlocks;
    return (
      <div id='editor_elements' className="ui center aligned segment">
        {
          sb.length === 1 ? this.getBlockOptions(sb) : ''
        }
        {
          this.getCommonOptions()
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedBlocks: state.editor.toJSON().currentSection.selectedBlocks,
  };
};

const mapActionsToProps = (dispacher) => {
  return {
    add_new_text: actions.set_preview(dispacher),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Elements);

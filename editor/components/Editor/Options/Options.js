import React, { Component } from 'react';
import PropTypes from 'prop-types';

import commonOptions from './commonOptions';
import block2optionsMap from './block2optionsMap';
import OptionContainer from './OptionContainer';

import create from '../../creator';

class Elements extends Component {

  getCommonOptions = () => {
    const optionsElements = [];
    commonOptions.forEach((optconf) => {
      const element = React.createElement(optconf.component, optconf.props);
      const option = React.createElement(OptionContainer, {
        children: element,
        ...optconf.props,
      });
      optionsElements.push(option);
    });

    return optionsElements;
  }

  getBlockOptions = (sb) => {
    const options = block2optionsMap[sb[0].blockType];

    const optionsElements = [];
    options.forEach((optconf) => {
      const element = React.createElement(optconf.component, optconf.props);
      const option = React.createElement(OptionContainer, {
        children: element,
        ...optconf.props,
      });
      optionsElements.push(option);
    });

    return <div>{optionsElements}</div>;
  }

  render = () => {
    const sb = this.props.selectedBlocks;
    return (
      <div className="editor_options">
        {sb.length === 1 ? this.getBlockOptions(sb) : ''}
        {this.getCommonOptions()}
      </div>
    );
  }
}

Elements.propTypes = {
  selectedBlocks: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    selectedBlocks: state.editor.toJSON().currentSection.selectedBlocks,
  };
};

export default create(Elements, mapStateToProps);

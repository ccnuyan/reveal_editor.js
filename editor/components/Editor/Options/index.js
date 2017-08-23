import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../../../store/actions';
import commonOptions from './commonOptions';
import block2optionsMap from './block2optionsMap';

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
    const options = block2optionsMap[sb[0].blockType];

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

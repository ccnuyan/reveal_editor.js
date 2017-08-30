import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../../../store/actions';
import commonOptions from './commonOptions';
import block2optionsMap from './block2optionsMap';
import OptionContainer from './OptionContainer';

class Elements extends Component {
  static propTypes = {
    selectedBlocks: PropTypes.array.isRequired,
  }

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

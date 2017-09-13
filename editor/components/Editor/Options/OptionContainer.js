import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OptionsContainer extends Component {
  render = () => {
    return (
      <div className="block-option">
        {this.props.isMain ?
          <div className="main-option-title">{this.props.label}</div> :
          <div className="sub-option-title">{this.props.label}</div>}
        {this.props.children}
      </div>
    );
  }
}

OptionsContainer.propTypes = {
  children: PropTypes.object.isRequired,
  isMain: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

export default OptionsContainer;

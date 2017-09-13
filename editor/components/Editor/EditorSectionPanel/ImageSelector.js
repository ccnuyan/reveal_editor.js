import React, { Component } from 'react';
import PropTypes from 'prop-types';

import svgFilesMap from '../../../../icomoon_icons/svgFilesMap';
import create from '../../creator';

class ImageSelector extends Component {

  static propTypes = {
    editor: PropTypes.object.isRequired,
    hideIcons: PropTypes.func.isRequired,
  }

  render =() => {
    return (
      <div className="icon-selector" onTouchTap={ this.props.hideIcons }>
        {this.getIcons()}
      </div>
    );
  }
  getIcons() {
    if (!this.icons) {
      this.icons =
      Object.keys(svgFilesMap)
      .map((key) => {
        return (
          <button key={ key } className="svg-icon-button"
            data-icon-file={ svgFilesMap[key] }
            onTouchTap={ this.onSelectIcon }
          >
            <i className={ `icon-${key}` }></i>
          </button>
        );
      });
    }
    return this.icons;
  }

  onSelectIcon = (event) => {
    event.stopPropagation();
    window.RevealEditor.currentSection
      .addSVGIcon({ icon: event.currentTarget.getAttribute('data-icon-file') });
    this.props.hideIcons();
  }
}

const mapStateToProps = (state) => {
  return {
    editor: state.editor.toJSON(),
  };
};

export default create(ImageSelector, mapStateToProps);

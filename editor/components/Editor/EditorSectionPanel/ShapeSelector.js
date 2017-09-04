import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const shapes = {
  square: `
  <svg stroke="grey" width="160" height="160" viewBox="0 0 160 160" version="1.1" fill="transparent"
  xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="40" width="80" height="80" stroke-width="4"/>
  </svg>`,
  rect: `
  <svg stroke="grey" width="160" height="160" viewBox="0 0 160 160" version="1.1" fill="transparent"
  xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="50" width="100" height="60" stroke-width="4"/>
  </svg>`,
  circle: `
  <svg stroke="grey" width="160" height="160" viewBox="0 0 160 160" version="1.1" fill="transparent"
  xmlns="http://www.w3.org/2000/svg">
    <circle cx="80" cy="80" r="45" stroke-width="4"/>
  </svg>`,
  ellipse: `
  <svg stroke="grey" width="160" height="160" viewBox="0 0 160 160" version="1.1" fill="transparent"
  xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="80" cy="80" rx="60" ry="30" stroke-width="4"/>
  </svg>`,
};

class ShapeSelector extends Component {

  static propTypes = {
    editor: PropTypes.object.isRequired,
    hideShapes: PropTypes.func.isRequired,
  }

  render =() => {
    return (
      <div className="shape-selector" onTouchTap={ this.props.hideShapes }>
        {this.getShapes()}
      </div>
    );
  }

  getShapes() {
    if (!this.shapes) {
      this.shapes =
      Object.keys(shapes)
      .map((key) => {
        return (
          <button key={ key } className="svg-shape-button"
            data-shape-key={ key }
            onTouchTap={ this.onSelectShape }
            dangerouslySetInnerHTML={ { __html: shapes[key] } }
          >
          </button>
        );
      });
    }
    return this.shapes;
  }

  onSelectShape = (event) => {
    event.stopPropagation();
    window.RevealEditor.currentSection
      .addSVGShape({ shape: event.currentTarget.dataset.shapeKey });
    this.props.hideShapes();
  }
}

const mapStateToProps = (state) => {
  return {
    editor: state.editor.toJSON(),
  };
};

export default connect(mapStateToProps)(ShapeSelector);

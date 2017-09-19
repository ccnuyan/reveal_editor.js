import React, { Component } from 'react';
import PropTypes from 'prop-types';

import File from './File';
import create from '../../creator';
import './FileSelector.scss';

class FileSelector extends Component {
  componentDidMount = () => {
    this.props.files_get_uploaded();
    this.props.files_initialize({
      button: this.uploadButton,
    });
  }

  tryToHide = (event) => {
    if (event.target === this.fileSelector) {
      this.props.hideFiles();
    }
  }

  render =() => {
    const { uploadedFiles } = this.props;
    return (
      <div ref={ e => this.fileSelector = e } className="file-selector" onTouchTap={ this.tryToHide }>
        <div ref={ e => this.uploadButton = e } className="upload-button">
          <h2>Upload</h2>
        </div>
        <div className="file-list">
          {
          Object.keys(uploadedFiles).map((k) => {
            const file = uploadedFiles[k];
            return <File hideFiles={ this.props.hideFiles } file={ file } key={ k }/>;
          })}
        </div>
      </div>
    );
  }
}

FileSelector.propTypes = {
  uploadedFiles: PropTypes.object.isRequired,
  editor: PropTypes.object.isRequired,
  hideFiles: PropTypes.func.isRequired,
  files_get_uploaded: PropTypes.func.isRequired,
  files_initialize: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    editor: state.editor.toJSON(),
    uploadedFiles: state.files.toJSON().uploaded.files,
  };
};

export default create(FileSelector, mapStateToProps);

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

  render = () => {
    const { uploadedFiles } = this.props;
    const { anonymous } = window.sc_mode;
    return (
      <div ref={ e => this.fileSelector = e } className="file-selector" onTouchTap={ this.tryToHide }>
        {!anonymous ? <div ref={ e => this.uploadButton = e } className="upload-button">
          <h2>Upload</h2>
        </div> :
        <div>
          <h2>
            <a style={ { color: 'grey' } } href="/#/user/register">
              注册
            </a>
            <span> 或 </span>
            <a style={ { color: 'grey' } } href="/#/user/login">
              登陆
            </a>
            <span> 以使用该功能 </span>
          </h2>
        </div>}
        {!anonymous ? <div className="file-list">
          {
            Object.keys(uploadedFiles).map((k) => {
              const file = uploadedFiles[k];
              return <File hideFiles={ this.props.hideFiles } file={ file } key={ k } />;
            })}
        </div> : ''}
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

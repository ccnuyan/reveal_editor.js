import React, { Component } from 'react';
import PropTypes from 'prop-types';
import create from '../../creator';
import config from '../../../../config';

class File extends Component {
  render() {
    const { file } = this.props;
    return (
      <div onTouchTap={ this.onSelectFile } className="file-container">
        <div className="file-header">
          {file.title || file.filename || file.name}
        </div>
        <img src={ `http://${config.qiniu_bucket}/${file.etag}` } alt=""/>
        <div className="file-footer">
          {file.uploaded_at ? file.uploaded_at.substring(0, 10) : ''}
        </div>
      </div>
    );
  }

  onSelectFile = (event) => {
    const { file } = this.props;
    event.stopPropagation();
    window.RevealEditor.currentSection
      .addImage({ etag: file.etag });
    this.props.hideFiles();
  }
}

File.propTypes = {
  file: PropTypes.object.isRequired,
  hideFiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    editor: state.editor.toJSON(),
  };
};

export default create(File, mapStateToProps);

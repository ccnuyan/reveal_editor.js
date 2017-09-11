import config from '../../../config';
import actions from './uploadActions';

import { getHeaders } from '../../../sc_util';

const getToken = () => {
  return window.localStorage.getItem('id_token');
};

const requestToken = (filename) => {
  const request = new XMLHttpRequest();

  request.open('POST', `${config.serviceBase}/api/files/`, false); // `false` makes the request synchronous
  request.setRequestHeader('accept', 'application/json');
  request.setRequestHeader('authorization', `bearer ${getToken()}`);
  request.setRequestHeader('content-Type', 'application/json');

  request.send(JSON.stringify({ filename }));

  return request;
};

// this method is only useful for dev
const requestUpdateFileStatus = (qiniu_ret) => {
  const request = new XMLHttpRequest();

  request.open('PUT', `${config.serviceBase}/api/files/upload_callback`, false); // `false` makes the request synchronous
  request.setRequestHeader('accept', 'application/json');
  request.setRequestHeader('authorization', `bearer ${getToken()}`);
  request.setRequestHeader('content-Type', 'application/json');

  request.send(JSON.stringify(qiniu_ret));

  return request;
};

// this method is only useful for dev
const requireFile = (id) => {
  const request = new XMLHttpRequest();

  request.open('GET', `${config.serviceBase}/api/files?file_id=${id}`, false); // `false` makes the request synchronous
  request.setRequestHeader('accept', 'application/json');
  request.send();

  return request;
};

const options = {
  runtimes: 'html5,flash,html4', // 上传模式,依次退化
  get_new_uptoken: true, // 设置上传文件的时候是否每次都重新获取新的 uptoken
  domain: config.qiniu_bucket, // bucket 域名，下载资源时用到，**必需**
  max_file_size: '300kb', // 最大文件体积限制
  max_retries: 1, // 上传失败最大重试次数
  chunk_size: '4mb', // 分块上传时，每块的体积
  auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
  filters: {
    mime_types: [{
      title: 'Image files',
      extensions: 'jpg,gif,png',
    }],
    prevent_duplicates: false,
  },
};
const initialize = dispatcher => (element, fileUploadCallback) => { // eslint-disable-line no-unused-vars
  options.browse_button = element;

  options.uptoken_func = (file) => {
    const request = requestToken(file.name);
    if (request.status === 201) {
      const obj = JSON.parse(request.responseText);
      file.key = obj.key; // eslint-disable-line no-param-reassign
      return obj.token;
    }
  };

  options.init = {
    FilesAdded(up, files) {
      plupload.each(files, (file) => {
        actions.upload_queue(dispatcher)(file);
      });
    },
    BeforeUpload(up, file) { // eslint-disable-line no-unused-vars
        // 2;
        // 每个文件上传前,处理相关的事情
    },
    UploadProgress(up, file) {
        // 3;
        // 每个文件上传时,处理相关的事情
      actions.upload_progress(dispatcher)(file);
    },
    FileUploaded(up, file, info) {
      const qiniu_ret = JSON.parse(info.response);
      if (config.mode === 'development') {
        const request = requestUpdateFileStatus(qiniu_ret);
        if (request.status === 200) {
          const fileInfo = JSON.parse(requireFile(qiniu_ret.key).responseText);
          actions.upload_done(dispatcher)(fileInfo);
          if (fileUploadCallback) {
            fileUploadCallback(fileInfo);
          }
        }
      } else {
        const fileInfo = JSON.parse(requireFile(qiniu_ret.key).responseText);
        actions.upload_done(dispatcher)(fileInfo);
        if (fileUploadCallback) {
          fileUploadCallback(fileInfo);
        }
      }
    },
    Error(up, err, errTip) { // eslint-disable-line no-unused-vars
      console.log(err.code);
      switch (err.code) {
        case -601: {
          console.log('只允许上传jpg、png、gif图片及zip压缩包');
          console.log('文件大小限制为4mb');
          break;
        }
        default:
      }
    },
    UploadComplete() {
      console.log('所有文件上传完毕');
    },
    Key(up, file) {
      const key = file.key;
      return key;
    },
  };

  Qiniu.uploader(options);
};

export default { initialize };

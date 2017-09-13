// https://docs.fineuploader.com/branch/master/features/modules.html

// use Fine Uploader UI for traditional endpoints
import qq from 'fine-uploader/lib/core';

import { getHeaders } from '../../sc_utils';
import actionTypes from '../actionTypes';
import config from '../../config';
import fill from './messagesMW';

// You may replace "rows" w/ "legacy" or "gallery" depending on your needs
// This assumes you have a loader to handle importing css files, such as Webpack css-loader

const initialize = dispatch => (uploaderConf) => {
  const uploader = new qq.FineUploaderBasic({
    // debug: true,
    maxConnections: 2,
    multiple: true,
    request: {
      endpoint: 'http://upload.qiniu.com/',
      inputName: 'file',
      forceMultipart: true,
      params: {},
      paramsInBody: true,
    },
    retry: {
      enableAuto: false, // defaults to false
    },
    deleteFile: {
      enabled: false,
    },
    callbacks: {
      onSubmit: async (id, name) => {
        dispatch(fill({ type: actionTypes.FILES_UPLOAD_GET_TOKEN_START,
          payload: { client_id: id, name } }));

        const payload = {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify({
            filename: name,
          }),
        };

        return fetch(`${config.serviceBase}/api/files/`, payload)
          .then(res => res.json())
          .then((ret) => {
            uploader.setParams({ token: ret.token, 'x:id': ret.id }, id);
            dispatch(fill({ type: actionTypes.FILES_UPLOAD_GET_TOKEN_END,
              payload: { client_id: id, ...ret } }));
            return true;
          }).catch(() => {
            dispatch(fill({ type: actionTypes.FILES_UPLOAD_GET_TOKEN_ERROR }));
            return false;
          });
      },
      onUpload: (id) => {
        dispatch(fill({ type: actionTypes.FILES_UPLOAD_PROGRESS_START,
          payload: { client_id: id, uploaded: 0, total: 1 } }));
      },
      onProgress: (id, name, uploaded, total) => {
        dispatch(fill({ type: actionTypes.FILES_UPLOAD_PROGRESS_START, payload: { client_id: id, uploaded, total } }));
      },
      onComplete: (id, name, responseJSON) => {
        if (config.mode === 'development') {
          const payload = {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(responseJSON),
          };

          return fetch(`${config.serviceBase}/api/files/upload_callback`, payload)
          .then(res => res.json())
          .then((ret) => {
            dispatch(fill({ type: actionTypes.FILES_UPLOAD_PROGRESS_END,
              payload: {
                client_id: id,
                ...ret,
              },
            }));
            return true;
          }).catch(() => {
            dispatch(fill({ type: actionTypes.FILES_UPLOAD_PROGRESS_ERROR,
              payload: { client_id: id },
            }));
            return false;
          });
        }
        const payload = {
          method: 'GET',
          headers: getHeaders(),
        };

        return fetch(`${config.serviceBase}/api/files?file_id=${responseJSON.id}`, payload)
          .then(res => res.json())
          .then((ret) => {
            dispatch(fill({ type: actionTypes.FILES_UPLOAD_PROGRESS_END,
              payload: {
                client_id: id,
                ...ret,
              },
            }));
            return true;
          }).catch(() => {
            dispatch(fill({ type: actionTypes.FILES_UPLOAD_PROGRESS_ERROR,
              payload: { client_id: id },
            }));
            return false;
          });
      },
      onError(id) {
        dispatch({ type: actionTypes.FILES_UPLOAD_PROGRESS_ERROR,
          payload: { client_id: id },
        });
      },
    },
    ...uploaderConf,
  });

  return uploader;
};

export default { initialize };

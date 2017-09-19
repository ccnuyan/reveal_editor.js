import actionTypes from '../actionTypes';
import { getHeaders } from '../../sc_utils';
import config from '../../config';
import fill from './messagesMW';

const base = config.serviceBase;

/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-return */

const get_uploaded = dispatch => () => {
  const payload = {
    method: 'GET',
    headers: getHeaders(),
  };

  dispatch(fill({ type: actionTypes.FILES_GET_UPLOADED_START }));

  fetch(`${base}/api/files/uploaded`, payload)
    .then(res => res.json())
    .then((ret) => {
      dispatch(fill({ type: actionTypes.FILES_GET_UPLOADED_END, payload: ret }));
      return;
    }).catch(() => {
      dispatch(fill({ type: actionTypes.FILES_GET_UPLOADED_ERROR }));
      return;
    });
};

const update = dispatch => (workinfo) => {
  const payload = {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({
      work_id: workinfo.id,
      title: workinfo.title,
    }),
  };

  dispatch(fill({ type: actionTypes.FILES_UPDATE_START }));

  fetch(`${base}/api/files`, payload)
    .then(res => res.json())
    .then((ret) => {
      dispatch({ type: actionTypes.FILES_UPDATE_END, payload: ret });
      return;
    }).catch(() => {
      dispatch(fill({ type: actionTypes.FILES_UPDATE_ERROR }));
      return;
    });
};

const remove = dispatch => (workinfo) => {
  const payload = {
    method: 'DELETE',
    headers: getHeaders(),
    body: JSON.stringify({ work_id: workinfo.id }),
  };

  dispatch(fill({ type: actionTypes.FILES_DELETE_START }));

  fetch(`${base}/api/files`, payload)
    .then(res => res.json())
    .then((ret) => {
      dispatch(fill({ type: actionTypes.FILES_DELETE_END, payload: ret }));
      return;
    }).catch(() => {
      dispatch(fill({ type: actionTypes.FILES_DELETE_ERROR }));
      return;
    });
};
export default {
  get_uploaded,
  update,
  remove,
};

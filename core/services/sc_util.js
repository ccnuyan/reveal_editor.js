const key = 'id_token';

const getLocalToken = () => {
  return window.localStorage.getItem(key);
};

export const getHeaders = () => {
  const headers = new Headers();
  headers.append('content-type', 'application/json');
  headers.append('accept', 'application/json');
  const token = getLocalToken();
  if (token) {
    headers.append('authorization', `bearer ${token}`);
  }
  return headers;
};

export const getParameterByName = (name) => {
  const url = window.location.href;
  const validname = name.replace(/[\[\]]/g, '\\$&'); // eslint-disable-line
  const regex = new RegExp(`[?&]${validname}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

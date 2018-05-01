import config from '../config';
export const API = Symbol('API');

export const api = store => next => action => {
  if (action[API]) {
    const { url, method, body, mode, header } = action[API];
    fetch(config.baseServerUrl + url, {
      method: method || 'GET',
      body: JSON.stringify(body),
      header,
      mode,
    })
    .then(response => {
      const contentType = response.headers.get('Content-Type')
      if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json()
      } else {
        return null;
      }
    })
    .then(data => {
      store.dispatch({
      type: action.type + '_SUCCESS',
      data,
      user: action.user
    })})
    .catch(error => {
      console.log('I FAIL');
      store.dispatch({
        type: action.type + '_FAILURE',
        error
      })
    })
    next({
      ...action,
      type: action.type + '_REQUEST'
    });
  } else {
    next(action);
  }
}

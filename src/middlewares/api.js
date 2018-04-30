import config from '../config';
export const API = Symbol('API');

export const api = store => next => action => {
  if (action[API]) {
    const { url, method, body, mode, headers } = action[API];

    fetch(config.baseServerUrl + url, {
      method: method || 'GET',
      body: JSON.stringify(body),
      headers,
      mode,
    })
    .then(response => response.json())
    .then(data => store.dispatch({
      type: action.type + '_SUCCESS',
      data
    }))
    .catch(error => {
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
    console.log(action);
    next(action);
  }
}

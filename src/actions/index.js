import config from '../config';
import { API } from '../middlewares/api'

export const login = (user) => ({
  type: 'LOGIN',
  user
})

export const set = (playlist) => ({
  type: 'SET_PLAYLIST',
  playlist,
})

export const logout = () => ({
  type: 'LOGOUT',
})

export const unset = (playlist) => ({
  type: 'UNSET_PLAYLIST',
  playlist
})

// Fetch actions

export const createPlaylist = (username, name, values, tempo) => ({
  type: 'CREATE_PLAYLIST',
  [API]: {
    url: '/api/playlist',
    method: 'POST',
    body: {username, name, values, tempo},
    mode: 'cors',
    header: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Origin': config.baseClientUrl
    }
  }
})

export const getRecent = () => ({
  type:'GET_RECENT',
  [API]: {
    url: '/api/playlists/recent',
    headers: {
      'Origin': config.baseClientUrl
    }
  }
})

export const getPlaylist = (url, user) => ({
  type: 'GET_PLAYLIST',
  user,
  [API]: {
    url: '/api' + url,
    headers: {
      'Origin': config.baseClientUrl
    }
  }
})

export const collaborate = (url, user) => ({
  type: 'COLLABORATE',
  [API]: {
    url: '/api/playlist/' + url,
    method: 'PUT',
    body: user,
    mode: 'cors',
    header: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Origin': config.baseClientUrl,
    },
  }
})

export const deletePlaylist = (url, user) => ({
  type: 'DELETE_PLAYLIST',
  user,
  [API]: {
    url: '/api/playlist/' + url,
    method: 'DELETE',
    body: user,
    mode: 'cors',
    header: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Origin': config.baseClientUrl,
    },
  }
})

export const getProfile = (user) => {
  const headers = new Headers({
    User: user.username,
    Origin: config.baseClientUrl,
  });
  return {
    type: 'GET_PROFILE',
    [API]: {
      url: '/api/me',
      headers,
    }
  }
}

export const postLogin = (code) => ({
  type: 'POST_LOGIN',
  [API]: {
    url: '/api/register',
    method: 'POST',
    body: code,
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Origin': config.baseClientUrl,
    }
  }
})

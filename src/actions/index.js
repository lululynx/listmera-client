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
    header: {
      'Origin': config.baseClientUrl
    }
  }
})

export const getPlaylist = (url, user) => ({
  type: 'GET_PLAYLIST',
  user,
  [API]: {
    url: '/api' + url,
    header: {
      'Origin': config.baseClientUrl
    }
  }
})

export const collaborate = (url, user) => {
  console.log('Useruser', user);
  return ({
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
}

export const deletePlaylist = (url, user) => {
  console.log('USER TO BE DELETEDDDDDD', user)
  return ({
    type: 'DELETE_PLAYLIST',
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
}

export const getProfile = (user) => ({
  type: 'GET_PROFILE',
  [API]: {
    url: '/api/me',
    header: {
      'Origin': config.baseClientUrl,
      'User': user.username
    }
  }
})

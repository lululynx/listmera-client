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

export const getPlaylist = (url) => ({
  type: 'GET_PLAYLIST',
  [API]: {
    url: '/api' + url,
    header: {
      'Origin': config.baseClientUrl
    }
  }
})

const user = {
  username: '',
  name: '',
  picture: '',
  playlists: [],
  fetching: false,
  error: null,
  isAdmin: false,
  loaded: false,
}

const reducer = (state = user, action) => {
  switch (action.type) {

  case 'LOGIN':
    return {
      ...state,
      ...action.user
    }
  case 'SET_PLAYLIST':
    return {
      ...state,
      playlists: [
        ...state.playlists,
        action.playlist.id
      ]
    }
  case 'LOGOUT':
    return {
      username: '',
      name: '',
      picture: '',
      playlists: [],
    }
  case 'UNSET_PLAYLIST':
    const play = state.playlists.filter(el => el !== action.playlist);
    return {
      ...state,
      playlists: play,
    }

  case 'CREATE_PLAYLIST_REQUEST':
  return {
    ...state,
    fetching: true,
  }

  case 'CREATE_PLAYLIST_FAILURE':
  return {
    ...state,
    fetching: false,
    error: action.payload
  }

  case 'CREATE_PLAYLIST_SUCCESS':
  return {
    ...state,
    fetching: false,
    playlists: [
      ...state.playlists,
      action.data.id,
    ]
  }

  case 'GET_RECENT_REQUEST':
  return {
    ...state,
    fetching: true
  }

  case 'GET_RECENT_FAILURE':
  return {
    ...state,
    fetching: false,
    error: action.payload
  }

  case 'GET_RECENT_SUCCESS':
  return {
    ...state,
    fetching: false,
    playlists: action.data.playlists
  }

  case 'GET_PLAYLIST_REQUEST':
  return {
    ...state,
    fetching: true
  }

  case 'GET_PLAYLIST_FAILURE':
  return {
    ...state,
    fetching: false,
    error: action.payload
  }

  case 'GET_PLAYLIST_SUCCESS':
  return {
    ...state,
    fetching: false,
    isAdmin: action.data.admin === action.user,
    loaded: true
  }

  case 'COLLABORATE_REQUEST':
  return {
    ...state,
    fetching: true
  }

  case 'COLLABORATE_FAILURE':
  return {
    ...state,
    fetching: false,
    error: action.payload
  }

  case 'COLLABORATE_SUCCESS':
  return {
    ...state,
    fetching: false,
    loaded: true
  }

  case 'DELETE_PLAYLIST_REQUEST':
  return {
    ...state,
    fetching: true
  }

  case 'DELETE_PLAYLIST_FAILURE':
  return {
    ...state,
    fetching: false,
    error: action.payload
  }

  case 'DELETE_PLAYLIST_SUCCESS':
  return {
    ...state,
    user: {
      ...state.user,
      playlists: state.playlists.filter(item => item !== action.payload)
    },
    fetching: false,
  }

  case 'GET_PROFILE_REQUEST':
  return {
    ...state,
    fetching: true,
  }

  case 'GET_PROFILE_FAILURE':
  return {
    ...state,
    fetching: false,
    loaded: false
  }

  case 'GET_PROFILE_SUCCESS':
  return {
    ...state,
    fetching: false,
    loaded: true
  }





  default: return state;
  }
}

export default reducer;

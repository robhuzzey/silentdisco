import clientid from '../../clientid.json'

const authenticate = (state = {
  isAuthenticated: false,
  checkingAuth: false,
  access_token: null,
  expires_in: null
}, action) => {
  switch (action.type) {
    case 'REQUEST_AUTHENTICATION':
      const redirectUri = encodeURIComponent(window.location.origin);
      const clientId = clientid.id;
      const scopes = encodeURIComponent([
        'user-library-read',
        'user-library-modify',
        'user-read-private',
        'playlist-modify-public',
        'user-modify-playback-state',
        'user-read-playback-state'
      ].join(' '));
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&scope=${scopes}&show_dialog=true&response_type=token&redirect_uri=${redirectUri}`;
      return Object.assign({}, state, {
        checkingAuth: true
      })
    case 'SET_ACCESS_TOKEN':
      const now = new Date()
      const expires_in = now.setSeconds(now.getSeconds() + action.expires_in)
      return Object.assign({}, state, {
        access_token: action.access_token,
        isAuthenticated: !!action.access_token,
        expires_in
      })
    default:
      return state
  }
}

export default authenticate

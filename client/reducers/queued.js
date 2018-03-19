const queued = (state = {
  tracks: [],
  currentlyPlaying: null
}, action) => {
  switch (action.type) {
    case 'RECEIVE_QUEUED_TRACKS':
    case 'RESPONSE_ADD_TRACK':
      return Object.assign({}, state, {
        tracks: action.tracks
      })
    case 'CURRENTLY_PLAYING':
      return Object.assign({}, state, {
        currentlyPlaying: action.id
      })
    default:
      return state
  }
}

export default queued

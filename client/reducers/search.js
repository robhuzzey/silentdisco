const search = (state = {
  tracks: []
}, action) => {
  switch (action.type) {
    case 'GET_PLAYLIST':
      return Object.assign({}, state, {
        tracks: action.data.body.tracks.items.map(item => item.track)
      })
    default:
      return state
  }
}

export default search

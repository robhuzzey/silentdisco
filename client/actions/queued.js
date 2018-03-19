export const get = () => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: 'REQUEST_QUEUED_TRACKS'
    })

    fetch('/tracks').then(results => {
      return results.json().then(tracks => {
        // this.getTrackInfo(tracks.map(track => track.spotifyId))
        // this.setState({
        //   queued: tracks
        // })
        dispatch({
          type: 'RECEIVE_QUEUED_TRACKS',
          tracks
        })
      })
    })
  }
}

export const played = id => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: 'REQUEST_PLAYED_TRACK'
    })
    fetch('/played', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
  }
}

export const add = data => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: 'REQUEST_ADD_TRACK'
    })

    fetch('/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(results => {
      return results.json().then(tracks => {
        dispatch({
          type: 'RESPONSE_ADD_TRACK',
          tracks
        })
      })
    })
  }
}

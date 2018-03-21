export const play = data => {
  return (dispatch, getState, {spotifyApi, socket}) => {
    const { currentlyPlaying } = getState().queued
    if(currentlyPlaying === data.spotifyId) return
    spotifyApi.play({
      uris: [`spotify:track:${data.spotifyId}`]
    })
    dispatch({
      type: 'CURRENTLY_PLAYING',
      id: data.spotifyId
    })
  }
}

export const seek = position => {
  return (dispatch, getState, {spotifyApi, socket}) => {
    spotifyApi.seek({
      position_ms: position
    })
  }
}

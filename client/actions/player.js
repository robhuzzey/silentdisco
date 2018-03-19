export const play = data => {
  return (dispatch, getState, {spotifyApi, socket}) => {
    spotifyApi.play({
      uris: [`spotify:track:${data.id}`]
    })
    dispatch({
      type: 'CURRENTLY_PLAYING',
      id: data.id
    })
  }
}

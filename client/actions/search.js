export const getPlaylist = () => {
  console.log('getPlaylist')
  return async (dispatch, getState, {spotifyApi, socket}) => {

    const data = await spotifyApi.getPlaylist('spotify', '37i9dQZF1DX0RJRF55W5lt')

    dispatch({
      type: 'GET_PLAYLIST',
      data
    })
  }
}

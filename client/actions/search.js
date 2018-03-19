export const getPlaylist = () => {
  console.log('getPlaylist')
  return async (dispatch, getState, {spotifyApi, socket}) => {

    const data = await spotifyApi.getPlaylist('spotifycharts', '37i9dQZEVXbLnolsZ8PSNw')

    dispatch({
      type: 'GET_PLAYLIST',
      data
    })
  }
}

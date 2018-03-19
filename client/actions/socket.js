export const play = uri => {
  return (dispatch, getState, {spotifyApi, socket}) => {
    const { id } = getState().user
    socket.emit('play', { 
      name: id,
      uri
    })
  }
}

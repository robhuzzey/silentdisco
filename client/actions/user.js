export const getMe = () => {
  return (dispatch, getState, {spotifyApi, socket}) => {
    dispatch({
      type: 'REQUEST_LOGGED_IN_USER_DETAILS'
    })

    return spotifyApi.getMe().then(data => { 
      dispatch({
        type: 'RECEIVE_LOGGED_IN_USER_DETAILS',
        data
      })

      socket.emit('userJoined', { name: data.body.display_name })
      
    }, err =>  {
      if(err.statusCode === 401) {
        dispatch({
          type: 'REQUEST_AUTHENTICATION'
        })
      }
      console.log('Something went wrong!', err)
    })
  }
}

export const getDevices = () => {
  return async (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: 'REQUEST_DEVICES'
    })
    const data = await spotifyApi.getMyDevices()
    dispatch({
      type: 'RECEIVE_DEVICES',
      data
    })
  }
}

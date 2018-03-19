import queryString from 'query-string'

export const checkAccessToken = () => {
  return (dispatch, getState, {spotifyApi}) => {
    const { access_token = null, expires_in = null } = queryString.parse(window.location.hash)
    dispatch({
      type: 'CHECK_ACCESS_TOKEN',
      access_token,
      expires_in
    })
    const now = new Date();
    if(expires_in && expires_in < now) {
      dispatch({
        type: 'SET_ACCESS_TOKEN',
        access_token,
        expires_in
      })
      spotifyApi.setAccessToken(access_token)

    } else {
      dispatch({
        type: 'REQUEST_AUTHENTICATION'
      })
    }
  }
}

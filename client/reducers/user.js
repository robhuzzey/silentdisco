const user = (state = {
  id: null,
  devices: [],
  deviceCount: 0
}, action) => {
  switch (action.type) {
    case 'RECEIVE_LOGGED_IN_USER_DETAILS':
      return Object.assign({}, state, {
        id: action.data.body.id
      })
    case 'RECEIVE_DEVICES':
      return Object.assign({}, state, {
        deviceCount: action.data.body.devices.length,
        devices: action.data.body.devices.map(device => {
          return {
            active: device.is_active,
            name: device.name,
            type: device.type
          }
        })
      })
    default:
      return state
  }
}

export default user

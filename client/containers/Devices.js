import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    devices: state.user.devices
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

class Devices extends Component {
  render() {
    return (
      <div>
        <p>Devices:</p>
        <p>Please ensure at least one of the devices are ACTIVE in order for this to work (simply by pressing play should do it)</p>
        <ul>
          {this.props.devices.map((device, deviceKey) => {
            return <li key={deviceKey}>{device.name} ({device.type}) ({device.active ? 'ACTIVE' : 'INACTIVE'})</li>
          })}
        </ul>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Devices)

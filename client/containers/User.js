import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMe, getDevices } from '../actions/user'

const mapStateToProps = (state, ownProps) => {
  return {
    id: state.user.id,
    deviceCount: state.user.deviceCount
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getLoggedInUserDetails: () => {
      dispatch(getMe())
    },
    getDevices: () => {
      dispatch(getDevices())
    }
  }
}

class User extends Component {
  componentDidMount() {
    this.props.getLoggedInUserDetails()
    this.props.getDevices()
  }

  render() {
    return (
      <div>
        <h1>Welcome {this.props.id}</h1>
        {this.props.deviceCount === 0 ? (
          <p>Please open a spotify enabled device / application for playback</p>
        ) : this.props.children}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)

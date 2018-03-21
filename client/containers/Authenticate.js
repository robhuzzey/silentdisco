import React, { Component } from 'react'
import { connect } from 'react-redux'

import { checkAccessToken } from '../actions/authenticate'
import { play, seek } from '../actions/player'
import { played } from '../actions/queued'

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.authenticate.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    checkAccessToken: () => {
      dispatch(checkAccessToken())
    },
    play: data => {
      dispatch(play(data))
    },
    played: data => {
      dispatch(played(data))
    },
    seek: position => {
      dispatch(seek(position))
    },
  }
}

class Authenticate extends Component {

  constructor(props) {
    super(props)
    this.setupSocketListeners = this.setupSocketListeners.bind(this)
  }

  componentDidMount() {
    this.setupSocketListeners()
    this.props.checkAccessToken()
  }

  setupSocketListeners() {
    // Setup socket listeners.
    this.props.socket.on('trackAdded', data => {
      console.log('TRACK ADDED', data)
    })
    this.props.socket.on('userJoined', data => {
      console.log('USER JOINED', data)
    })

    this.props.socket.on('testing', data => {
      console.log("SOCKET TESTING", data)
    })

    this.props.socket.on('hello', data => {
      console.log("SOCKET HELLO", data)
    })

    this.props.socket.on('trackPosition', data => {
      console.log("SOCKET trackPosition", data)
      this.props.play(data)
      // this.props.played(data.id)

      // console.log("POS", data.position)
      // this.props.seek(data.position)
    })

    // this.props.socket.on('remainingTime', time => {
    //   console.log("SOCKET REMAINING TIME", time)
    // })
  }

  render() {
    if(!this.props.isAuthenticated) {
      return (
        <p>Redirecting you to authenticate</p>
      )
    }
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authenticate)

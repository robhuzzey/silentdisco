import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get } from '../actions/queued'

const mapStateToProps = (state, ownProps) => {
  return {
    tracks: state.queued.tracks,
    currentlyPlaying: state.queued.currentlyPlaying
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getQueuedTracks: () => {
      dispatch(get())
    }
  }
}

class Queued extends Component {
  componentDidMount() {
    this.props.getQueuedTracks()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.currentlyPlaying !== this.props.currentlyPlaying) {
      this.props.getQueuedTracks()
    }
  }

  render() {
    return (
      <ul>
        {this.props.tracks.map((track, trackKey) => {
          const currentlyPlaying = track.spotifyId === this.props.currentlyPlaying
          return <li key={trackKey}>{currentlyPlaying && <strong>X</strong>}<img width="20px" src={track.image} />{track.name}</li>
        })}
      </ul>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Queued)

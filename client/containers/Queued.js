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
      <div>
        {this.props.tracks.map((track, trackKey) => {
          const currentlyPlaying = track.spotifyId === this.props.currentlyPlaying
          return (
            <div className={`media ${currentlyPlaying ? 'currentlyPlaying' : ''}`} key={trackKey}>
              <img width="30px" className="mr-3" src={track.image} alt="Generic placeholder image" />
              <div className="media-body">
                <h5 className="mt-0">{track.name}</h5>
                addedby {track.user.displayName}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Queued)

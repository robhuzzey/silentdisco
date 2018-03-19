import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getPlaylist } from '../actions/search'
import { add } from '../actions/queued'

const mapStateToProps = (state, ownProps) => {
  return {
    tracks: state.search.tracks,
    userId: state.user.id
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPlaylist: () => {
      dispatch(getPlaylist())
    },
    addTrack: data => {
      dispatch(add(data))
    }
  }
}

class Search extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.getPlaylist}>PLAYLIST</button>
        <ul>
          {this.props.tracks.map((track, trackKey) => {
            const image = track.album.images[0].url
            return (
              <li key={trackKey}>
                <div><img width="20px" src={image} />{track.name} <button onClick={() => this.props.addTrack({
                  id: track.id,
                  name: track.name,
                  uri: track.uri,
                  previewUrl: track.preview_url,
                  image,
                  userId: this.props.userId,
                  duration: track.duration_ms
                })}>add</button></div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)

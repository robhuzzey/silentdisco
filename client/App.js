import React, { Component } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

import './App.css'

import User from './containers/User'
import Devices from './containers/Devices'
import Queued from './containers/Queued'
import Search from './containers/Search'

class App extends Component {
  render() {
    return (
      <User>
        <Devices />
        <div>
          <p>This is an Alpha test. There is only ONE playlist you can add songs from for now but playback should be the same order for all.</p>
          <p>All songs start when the last one has finished. If you join mid-way through a song, you will get playback from the start but as the next song is ready, your playback will cease & then you will be in sync with other users. This will be rectified in next release</p>
        </div>
        <Queued />
        <Search />
      </User>
    )
  }
}

export default App;

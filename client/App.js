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
        <Queued />
        <Search />
      </User>
    )
  }
}

export default App;

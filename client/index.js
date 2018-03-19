import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

// import SpotifyWebApi from 'spotify-web-api-node'

import SpotifyWebApi from 'spotify-web-api-node'
import AuthenticationRequest from 'spotify-web-api-node/src/authentication-request'
import WebApiRequest from 'spotify-web-api-node/src/webapi-request'
import HttpManager from 'spotify-web-api-node/src/http-manager'

SpotifyWebApi.prototype["seek"] = function(options, callback) {
  return WebApiRequest.builder(this.getAccessToken())
  .withPath('/v1/me/player/seek')
  .withHeaders({ 'Content-Type' : 'application/json' })
  .withQueryParameters(options)
  .build()
  .execute(HttpManager.put, callback);
}


import openSocket from 'socket.io-client'

import Authenticate from './containers/Authenticate'

import './index.css';
import App from './App';

const socket = openSocket(window.location.origin)
const spotifyApi = new SpotifyWebApi()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(
    applyMiddleware(
      thunk.withExtraArgument({spotifyApi, socket})
    )
  )
)

ReactDOM.render(
  <Provider store={store}>
    <Authenticate socket={socket}>
      <App />
    </Authenticate>
  </Provider>, document.getElementById('root')
)

if (module.hot) {
  module.hot.accept();
}

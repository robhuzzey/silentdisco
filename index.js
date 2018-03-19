

// TODO:
// Maybe make ONE client automatically the "DJ" - tag them on join & re-assign if they leave
// this will mean that client decides when song ends & starts & is responsible for sending
// time-signals out etc?




const port = 3000;
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

console.log('IO listening on port ', port);


// Step 1: Create & configure a webpack compiler
const webpack = require('webpack')
const webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './client/webpack.config')
const compiler = webpack(webpackConfig)

// Step 2: Attach the dev middleware to the compiler & the server
app.use(require("webpack-dev-middleware")(compiler, {
  logLevel: 'warn', publicPath: webpackConfig.output.publicPath
}));

// Step 3: Attach the hot middleware to the compiler & the server
app.use(require("webpack-hot-middleware")(compiler, {
  log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));


const bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors())

const jsonBodyParser = bodyParser.json({ extended: false })

const Sequelize = require('sequelize');
const sequelize = new Sequelize('silentdisco', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
})

// ===  MODELS

const User = sequelize.define('user', {
  id: {
    primaryKey: true,
    type: Sequelize.STRING
  },
  displayName: Sequelize.STRING
})

const Track = sequelize.define('track', {
  spotifyId: Sequelize.STRING,
  name: Sequelize.STRING,
  uri: Sequelize.STRING,
  previewUrl: Sequelize.STRING,
  image: Sequelize.STRING,
  played: Sequelize.BOOLEAN,
  duration: Sequelize.INTEGER
})

Track.belongsTo(User, { foreignKey: 'addedBy' });

const Like = sequelize.define('like')
Like.belongsTo(User)
Like.belongsTo(Track)

// let timeoutInstance = null
let intervalInstance = null
let trackPosition = 0
let trackDuration = 0

const playTrack = async (clientId = null) => {
  console.log('PLAY TRACK!')
  const tracks = await Track.find({
    where: {
      played: false
    },
    limit: 1
  })

  if(clientId) {
    io.to(clientId).emit('play', {
      id: tracks.toJSON().spotifyId,
      position: trackPosition
    })
  } else {
    io.emit('play', {
      id: tracks.toJSON().spotifyId
    })
  }
}

const queueTrack = async () => {
  const currentlyPlaying = await Track.find({
    where: {
      played: false
    },
    limit: 1
  })

  const { duration, spotifyId } = currentlyPlaying.toJSON()

  const track = await Track.update({
    played: true
  }, {
    where: {
      spotifyId
    }
  })

  const nextTrack = await Track.find({
    where: {
      played: false
    },
    limit: 1
  })

  io.emit('play', {
    id: nextTrack.toJSON().spotifyId
  })

  // timeoutInstance = setTimeout(queueTrack, duration)
  trackDuration = duration
  trackPosition = 0
  const intervalTime = 1000
  intervalInstance = setInterval(() => {
    trackPosition = trackPosition + intervalTime

    console.log("Track position", trackPosition, trackDuration)
    if(trackPosition >= trackDuration) {
      queueTrack()
    }
    // remainingTrackTime = remainingTrackTime - intervalTime
    // io.emit('remainingTime', remainingTrackTime)
  }, intervalTime)
}

queueTrack()




//=== IO Listeners

io.on('connection', (client) => {

  console.log("CONNECTED CLIENTS", io.engine.clientsCount)

  playTrack(client.id)

  client.on('userJoined', data => {
    io.emit('userJoined', data)
  });

  client.on('play', data => {
    io.emit('play', data)
  });

  client.on('disconnect', data => {
    if(io.engine.clientsCount === 0) {
      // clearTimeout(timeoutInstance)
    }
  });
});


//=== ROUTES


const getUnplayedTracks = async () => {
  // TODO: Order based on the number of likes.
  const tracks = await Track.findAll({
    where: {
      played: false
    },
    include: [User]
  })
  return tracks.map(track => track.toJSON())
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/currentTrack', async (req, res) => {
  res.json({
    trackPosition
  })
})

app.post('/user', jsonBodyParser, async (req, res) => {
  const [ user, createdUser ] = await User.findOrCreate({
    where: {
      id: req.body.id,
      displayName: req.body.displayName
    }
  })
  res.json(user.toJSON())
})

app.post('/track', jsonBodyParser, async (req, res) => {
  const track = await Track.create({
    spotifyId: req.body.id,
    name: req.body.name,
    uri: req.body.uri,
    previewUrl: req.body.previewUrl,
    image: req.body.image,
    played: false,
    addedBy: req.body.userId,
    duration: req.body.duration
  })

  io.emit('trackAdded', { for: 'everyone' })

  const unplayedTracks = await getUnplayedTracks()
  res.json(unplayedTracks)
})

app.post('/played', jsonBodyParser, async (req, res) => {

  // const currentlyPlaying = await Track.find({
  //   where: {
  //     played: false
  //   },
  //   limit: 1
  // })

  // const track = await Track.update({
  //   played: true
  // }, {
  //   where: {
  //     spotifyId: req.body.id
  //   }
  // })

  // const { duration } = currentlyPlaying.toJSON()
  // setTimeout(() => {
  //   console.log("TIMEOUT")
  //   playTrack()
  // }, duration)

  res.json(track.toJSON())
})

app.post('/like', jsonBodyParser, async (req, res) => {
  const like = await Like.create({
    userId: req.body.userId,
    trackId: req.body.trackId
  })
  res.json(like.toJSON())
})

app.get('/tracks', jsonBodyParser, async (req, res) => {
  const unplayedTracks = await getUnplayedTracks()
  res.json(unplayedTracks)
})

sequelize.sync({force : false}).then(() => {
  server.listen(port, () => console.log(`Example app listening on port ${port}!`));
})


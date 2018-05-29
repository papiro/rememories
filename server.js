'use strict'

Object.assign(global, { cfg: require('./rememories.cfg.json') })

const
  port = 6002
,
  debug = require('util').debuglog('rememories')
,
  path = require('path'),
  express = require('express'),
  app = express()
,
  passport = require('passport'),
  auth = require('./server/config/auth')
,
  init = {
    app: require('./server/config/app'),
    auth: auth.init,
    db: require('./server/sql/DB').init
  }
,
  middleware = {
    session: require('./server/config/session'),
    mobileDetect: require('./server/config/mobile-detect'),
    logger: require('./server/config/logger'),
    resLocals: require('./server/config/resLocals'),
  },
  routes = {
    get: {
      home: require('./server/config/routes').home,
      index: require('./server/config/routes').index,
      album: require('./server/config/routes').album.get
    },
    post: {
      album: require('./server/config/routes').album.post,
      files: require('./server/config/routes').files.post
    },
    delete: {
      album: require('./server/config/routes').album.delete,
      files: require('./server/config/routes').files.delete
    },
    put: {
      album: require('./server/config/routes').album.put
    }
  }
;

init.app(app)

app.use(middleware.session)
app.use(middleware.logger)
app.use(passport.initialize())
app.use(passport.session())

app.use(middleware.mobileDetect) // dependency on session

init.auth(app)
init.db()

const { facebook, google } = auth.urls
const skip_urls = [
  '/', 
  facebook.signin, 
  facebook.landing, 
  google.signin,
  google.landing
]
app.use((req, res, done) => {
  if (req.isAuthenticated() || ~skip_urls.indexOf(req.url)) {
    done()
  } else {
    const err = new Error('Not authenticated')
    err.code = 'NOT_AUTHENTICATED'
    done(err)
  }
})

app.use(middleware.resLocals)
app.get('/', routes.get.index)
app.get('/home', routes.get.home)
app.get('/album/:id', routes.get.album)
app.post('/album', routes.post.album)
app.put('/album', routes.put.album)
app.delete('/album/:id', routes.delete.album)
app.post('/files', routes.post.files)
app.delete('/files/:id', routes.delete.files)

app.use( (err, req, res, done) => {
  debug(err)
  const { code } = err
  switch (code) {
    case 'FILE_ALREADY_EXISTS':
      res.status(409).json({ code })
    case 'NO_USER':
    case 'NOT_AUTHENTICATED':
        res.sendStatus(401)
      break
    case 'NON_MATCHING_RESOURCE':
    case 'USER_ALBUM_MIXUP':
    case 'UNAUTHORIZED_ALBUM_DELETE':
    case 'UNAUTHORIZED_ALBUM_VIEW':
    case 'UNAUTHORIZED_FILE_DELETE':
      res.sendStatus(403)
      break
    default:
      res.sendStatus(500)
  }
  done()
})

app.listen(port)

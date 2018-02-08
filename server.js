'use strict'

const
  port = 80
,
  debug = require('util').debuglog('rememories')
,
  path = require('path'),
  express = require('express'),
  app = express()
,
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
    logger: require('./server/config/logger')
  },
  routes = {
    get: {
      home: require('./server/config/routes').home,
      index: require('./server/config/routes').index
    },
    post: {
      dashboard: require('./server/config/routes').dashboard.post
    },
    put: {
      dashboard: require('./server/config/routes').dashboard.put
    }
  }
;

init.app(app)

if (!app.get('isProd'))
  app.use(express.static('public'))

app.use(middleware.session)

app.get('/', routes.get.index)
init.auth(app)

init.db()

app.use(middleware.mobileDetect) // dependency on session

app.use(middleware.logger)

app.get('/home/:id', routes.get.home)
app.post('/dashboard', routes.post.dashboard)
app.put('/dashboard', routes.put.dashboard)

app.use( (err, req, res, done) => {
  switch (err.code) {
    case 'NO_USER':
      debug('NO_USER')
      if (!~['/', auth.urls.signin, auth.urls.landing].indexOf(req.url))
        res.redirect('/')
      break
    default:
      debug(err)
      res.sendStatus(500)
  }
  done()
})

app.listen(port)

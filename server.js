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
    logger: require('./server/config/logger'),
    bodyparser: require('body-parser').json()
  },
  routes = {
    get: {
      home: require('./server/config/routes').home,
      index: require('./server/config/routes').index
    },
    post: {
      dashboard: require('./server/config/routes').dashboard.post
    },
    delete: {
      dashboard: require('./server/config/routes').dashboard.delete
    },
    put: {
      dashboard: require('./server/config/routes').dashboard.put
    }
  }
;

function couldBeAuthenticating (requrl) {
  return ~['/', auth.urls.signin, auth.urls.landing].indexOf(requrl)
}

init.app(app)

if (!app.get('isProd'))
  app.use(express.static('public'))

app.use(middleware.bodyparser)
app.use(middleware.session)

app.get('/', routes.get.index)

init.auth(app)
init.db()

app.use( (req, res, done) => {
  if (!req.isAuthenticated() && !couldBeAuthenticating(req.url)) {
    const err = new Error('Not authenticated')
    err.code = 'NOT_AUTHENTICATED'
    done(err)
  } else done()
})

app.use(middleware.mobileDetect) // dependency on session

app.use(middleware.logger)

app.get('/home/:id', routes.get.home)
app.post('/dashboard', routes.post.dashboard)
app.put('/dashboard', routes.put.dashboard)
app.delete('/dashboard/:id', routes.delete.dashboard)

app.use( (err, req, res, done) => {
  debug(err)
  switch (err.code) {
    case 'NO_USER':
    case 'NOT_AUTHENTICATED':
      if (!couldBeAuthenticating(req.url))
        res.redirect('/')
      else
        res.sendStatus(401)
      break
    case 'NON_MATCHING_RESOURCE':
    case 'USER_DASHBOARD_MIXUP':
    case 'UNAUTHORIZED_DASHBOARD_DELETE':
      res.sendStatus(403)
      break
    default:
      res.sendStatus(500)
  }
  done()
})

app.listen(port)

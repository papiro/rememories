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
//    bodyparser: require('body-parser').json(),
    resLocals: require('./server/config/resLocals'),
//    busboy: require('connect-busboy')
    busboy: require('express-busboy')
  },
  routes = {
    get: {
      home: require('./server/config/routes').home,
      index: require('./server/config/routes').index,
      dashboard: require('./server/config/routes').dashboard.get
    },
    post: {
      dashboard: require('./server/config/routes').dashboard.post,
      files: require('./server/config/routes').files.post
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

app.use(middleware.session)
//app.use(middleware.bodyparser)
middleware.busboy.extend(app, {
  upload: true,
  path: path.join(__dirname, 'uploads'),
  allowedPath: /^\/files/
})
app.use(passport.initialize())
app.use(passport.session())

app.use(middleware.mobileDetect) // dependency on session
app.use(middleware.resLocals)

//app.use(middleware.busboy({ immediate: true }))

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

app.use(middleware.logger)

app.get('/home/:id', routes.get.home)
app.get('/dashboard/:id', routes.get.dashboard)
app.post('/dashboard', routes.post.dashboard)
app.put('/dashboard', routes.put.dashboard)
app.delete('/dashboard/:id', routes.delete.dashboard)
app.post('/files', routes.post.files)

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
    case 'UNAUTHORIZED_DASHBOARD_VIEW':
      res.sendStatus(403)
      break
    default:
      res.sendStatus(500)
  }
  done()
})

app.listen(port)

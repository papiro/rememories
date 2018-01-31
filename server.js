'use strict'

const
  port = 5555
,
  debug = require('util').debuglog('rememories'),
  prod = process.env.NODE_ENV === 'production',
  MobileDetect = require('mobile-detect')
,
  express = require('express'),
  app = express()
,
  registerRoutes = require('./config/routes'),
  initpassport = require('./config/passport')
,
  session = require('express-session'),
  RedisStore = require('connect-redis')(session)
;

app.set('prod', prod)
app.set('view engine', 'pug')

app.use(session({
  store: new RedisStore(),
  secret: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  resave: false
})

initpassport(app)
registerRoutes(app)

app.use( (req, res, done) => {
  const mobdet = new MobileDetect(req.headers['user-agent'])
  req.isMobile = mobdet.mobile()
  debug(req.url)
  done()
})

app.listen(port)

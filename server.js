'use strict'

const
  debug = require('util').debuglog,
  prod = process.env.NODE_ENV === 'production',
  MobileDetect = require('mobile-detect')
,
  express = require('express'),
  app = express()
,
  registerRoutes = require('./config/routes'),
  initpassport = require('./config/passport')
,
  passport = require('passport'),
  googleStrategy = require(
;

app.set('prod', prod)
app.set('view engine', 'pug')

app.use( (req, res, done) => {
  const mobdet = new MobileDetect(req.headers['user-agent'])
  req.isMobile = mobdet.mobile()
  debug(req.url)
  done()
})

initpassport(app)
registerRoutes(app)

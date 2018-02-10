'use strict'

const
  session = require('express-session'),
  RedisStore = require('connect-redis')(session)
,
  isProd = require('./isProd')
;

module.exports = session({
  store: new RedisStore({
    logErrors: true 
  }),
  secret: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 600000
  }
})

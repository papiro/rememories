'use strict'

const
  session = require('express-session'),
  RedisStore = require('connect-redis')(session)
;

module.exports = session({
  store: new RedisStore(),
  secret: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10000
  }
})

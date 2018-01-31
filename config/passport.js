'use strict'

const
  debug = require('util').debuglog('rememories')
,
  passport = require('passport'),
  strategies = {
    google: require('passport-google-oauth').OAuth2Strategy
  }
,
  redisc = require('redis').createClient()
;

module.exports = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(new strategies.google({
    clientID: '796666915392-7fnpjjcjs9v6ek83343gs84gg80m9hdi.apps.googleusercontent.com',
    clientSecret: 'OtScuriff7NobYr8c-ci2gvB',
    callbackURL: 'http://rememories.com/auth'
  }, (accessToken, refreshToken, profile, done) => {
    debug(accessToken)
    debug(profile)
  }))
  passport.serializeUser( (user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser( (id, done) => {
    
  })
}

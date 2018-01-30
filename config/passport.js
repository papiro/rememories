'use strict'

const
  passport = require('passport'),
  strategies {
    google: require('passport-google-oauth').OAuth2Strategy
  }
,
  redisc = require('redis').createClient()
;

module.exports = (app) => {
  app.use(new strategies.google({
    clientID: '796666915392-7fnpjjcjs9v6ek83343gs84gg80m9hdi.apps.googleusercontent.com',
    clientSecret: 'OtScuriff7NobYr8c-ci2gvB',
    callbackURL: 'http://rememories.com/auth'
  }, (accessToken, refreshToken, profile, done) {
    console.log(accessToken)
    console.log(profile)
  })
}

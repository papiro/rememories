'use strict'

const
  debug = require('util').debuglog('rememories'),
  User = require('./models').User
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
    callbackURL: 'http://rememories.com/auth/google'
  }, (accessToken, refreshToken, profile, done) => {
    const { id, displayName, emails } = profile;
    (new User({ id, name: displayName, email: emails[0].value }))
      .then( user => {
        debug('calling passport auth callback with user')
        debug(user)
        done(null, user)
      })
      .catch( err => {
        done(err)
      })
  }))
  passport.serializeUser( (user, done) => {
    debug('Serializing user:::', user)
    done(null, user.id)
  })
  passport.deserializeUser( (id, done) => {
    User.getById(id)
      .then( user => {
        delete user.password
        debug('Deserializing user:::', user)
        done(null, user)
      })
      .catch( err => {
        done(err)
      })
  })
  app.get('/sign-in/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }))
  app.get('/auth/google', passport.authenticate('google', { failureRedirect: '/' }), (req, res, done) => {
    debug('Successful signin - redirecting to /home')
    res.redirect(`/home/${req.user.id}`)
    done()
  })
}

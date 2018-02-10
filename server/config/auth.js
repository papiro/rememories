'use strict'

const
  debug = require('util').debuglog('rememories'),
  User = require('../models').User
,
  passport = require('passport'),
  strategies = {
    google: require('passport-google-oauth').OAuth2Strategy
  }
  //redisc = require('redis').createClient()
;

const
  urls = {
    signin: '/sign-in/google',
    landing: '/auth/google'
  }
;

exports.urls = urls

exports.init = (app) => {
  app.get(urls.signin, passport.authenticate('google', {
    scope: ['profile', 'email']
  }))
  app.get(urls.landing, passport.authenticate('google', { failureRedirect: '/' }), (req, res, done) => {
    debug('Successful signin - redirecting to /home')
    res.redirect(`/home/${req.user.id}`)
    done()
  })

  passport.use(new strategies.google({
    clientID: '796666915392-7fnpjjcjs9v6ek83343gs84gg80m9hdi.apps.googleusercontent.com',
    clientSecret: 'OtScuriff7NobYr8c-ci2gvB',
    callbackURL: 'http://rememories.com/auth/google'
  }, (accessToken, refreshToken, profile, done) => {
    const { id, displayName, emails } = profile;

    const user = { id, name: displayName, email: emails[0].value }
    const newUser = (new User(user))
    newUser
      .then( () => {
        debug('User added or user exists')
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
    debug('deSerializing user')
    User.getById(id)
      .then( user => {
        user.user_id = user.id
        delete user.id
        delete user.password
        done(null, user)
      })
      .catch( err => {
        // user needs to be created
        if (err.code === 'NO_USER')
          done(null, null)
        else
          done(err)
      })
  })
}

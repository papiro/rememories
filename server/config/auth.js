'use strict'

const { cfg } = global;
const
  debug = require('util').debuglog(cfg.app.name),
  User = require('../models').User
,
  passport = require('passport'),
  strategies = [
    {
      name: 'google',
      strategy: require('passport-google-oauth').OAuth2Strategy,
      urls: {
        signin: '/sign-in/google',
        landing: '/auth/google'
      },
      scope: ['profile', 'email'],
      clientID: cfg.google.client_id,
      cb: (accessToken, refreshToken, profile, done) => {
        const { id, displayName, emails } = profile;
        const user = { id, name: displayName, email: emails[0].value }
        debug(user)
        const newUser = (new User(user))
        newUser
          .then( () => {
            debug('User added or user exists')
            done(null, user)
          })
          .catch( err => {
            done(err)
          })
      }
    },
    {
      name: 'facebook',
      strategy: require('passport-facebook').Strategy,
      urls: {
        signin: '/sign-in/facebook',
        landing: '/auth/facebook'
      },
      scope: ['public_profile', 'email'],
      clientID: cfg.facebook.client_id,
      cb: (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        const { id, displayName, emails } = profile;
        const user = { id, name: displayName }
        debug(user)
        const newUser = (new User(user))
        newUser
          .then( () => {
            debug('User added or user exists')
            done(null, user)
          })
          .catch( err => {
            done(err)
          })
      }
    }
  ]
  //redisc = require('redis').createClient()
;

exports.urls = strategies.reduce( (urls, strat) => {
  urls[strat.name] = strat.urls; 
  return urls;
}, {})

exports.init = (app) => {
  strategies.forEach( s => {
    app.get(s.urls.signin, passport.authenticate(s.name, {
      scope: s.scope
    }))
    app.get(s.urls.landing, passport.authenticate(s.name, { failureRedirect: '/' }), (req, res, done) => {
      debug('Successful signin - redirecting to /home')
      res.redirect('/home')
      done()
    })
    passport.use(new s.strategy({
      clientID: s.clientID,
      clientSecret: cfg[s.name].client_secret,
      callbackURL: cfg.app.url + s.urls.landing,
      enableProof: true
    }, s.cb))
  })

  passport.serializeUser( (user, done) => {
    debug('Serializing user:::', user)
    done(null, user.id)
  })
  passport.deserializeUser( (id, done) => {
    debug('deSerializing user')
    User.getById(id)
      .then( user => {
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

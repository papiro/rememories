'use strict'

const
  debug = require('util').debuglog('rememories')
,
  Dashboard = require('../models').Dashboard
,
  isProd = require('./isProd')
;

exports.dashboard = {
  post (req, res, done) {
    Dashboard.add({ type: 'rememories', user_id: req.user.id })
      .then( (...args) => {
        console.log(...args)
        res.sendStatus(200)
        done()
      })
      .catch(done)
  },
  delete (req, res, done) {
    // send user_id for verification
    Dashboard.delete({ dashboard_id: req.params.id, user_id: req.user.id })
      .then( () => {
        debug('Deleted dashboard')
        res.sendStatus(200)
        done()
      })
      .catch(done)
  },
  put (req, res, done) {

  }
}

exports.home = (req, res, done) => {
  if (!req.user) {
    const err = new Error('User doesn\'t have session.')
    err.code = 'NO_USER'
    return done(err)
  }
  if (req.user.id !== req.params.id) {
    const err = new Error(`User id ${req.user.id} doesn't match home id ${req.params.id}`)  
    err.code = 'NON_MATCHING_RESOURCE'
    return done(err)
  }
  Dashboard.getById(req.user.id).then( dashboards => {
    debug(`dashboards gotten using id ${req.user.id}:::`)
    debug(dashboards)
    res.locals = {
      isProd,
      isMobile: req.isMobile,
      data: Object.assign(req.user, { dashboards })
    }
    res.render('index')
    done()
  }).catch( err => {
    done(err)
  })
}

exports.index = (req, res, done) => {
  res.render('index', { isProd, isMobile: req.isMobile })
  done()
}

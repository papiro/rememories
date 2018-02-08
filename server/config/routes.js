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
        done()
      })
      .catch(done)
  },
  put (req, res, done) {

  }
}

exports.home = (req, res, done) => {
  if (!req.user) {
    res.redirect('/')
    return done()
  }
  if (req.user.id !== req.params.id) {
    debug(`user id ${req.user.id} doesn't match home id ${req.params.id}`)  
    res.sendStatus(403)
    done()
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

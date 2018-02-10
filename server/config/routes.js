'use strict'

const
  debug = require('util').debuglog('rememories')
,
  models = require('../models'),
  { Dashboard, Files } = models
,
  isProd = require('./isProd')
;

exports.dashboard = {
  async get (req, res, done) {
    const dashboard_id = req.params.id
    const user_id = req.user.id

    if (!req.user) {
      const err = new Error('User doesn\'t have session.')
      err.code = 'NO_USER'
      return done(err)
    }
    let perm
    if (perm = Dashboard.getPermForUser({ dashboard_id, user_id }) < 1) {
      let err
      if (perm === -1) {
        err = new ReferenceError('User not registered as user of dashboard.')  
        err.code = 'NON_MATCHING_RESOURCE'
      } else {
        err = new ReferenceError('User doesn\'t have read access to dashboard.')  
        err.code = 'UNAUTHORIZED_DASHBOARD_VIEW'
      }
      return done(err)
    }
    debug('User authorized to view dashboard')
    const files = await Files.getByDashboardId(dashboard_id)
    debug(files)
    Object.assign(res.locals.data, { files })
    res.render('index')
    done()
  },
  post (req, res, done) {
    Dashboard.add({ type: 'rememories', user_id: req.user.id })
      .then( () => {
        Dashboard.getById(req.user.id).then( dashboards => {
          res.json({ dashboards })
          done()
        }).catch( err => {
          done(err)
        })
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
    const err = new ReferenceError(`User id ${req.user.id} doesn't match home id ${req.params.id}`)  
    err.code = 'NON_MATCHING_RESOURCE'
    return done(err)
  }
  Dashboard.getById(req.user.id).then( dashboards => {
    debug(`dashboards gotten using id ${req.user.id}:::`)
    debug(dashboards)
    Object.assign(res.locals.data, { dashboards })
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

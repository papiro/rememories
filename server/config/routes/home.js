'use strict'

const
  debug = require('util').debuglog('rememories')
,
  models = require('../../models'),
  { Dashboard } = models
;

module.exports = (req, res, done) => {
  const { user } = req
  if (!user) {
    const err = new Error('User doesn\'t have session.')
    err.code = 'NO_USER'
    return done(err)
  }
//  if (req.user.id !== req.params.id) {
//    const err = new ReferenceError(`User id ${req.user.id} doesn't match home id ${req.params.id}`)  
//    err.code = 'NON_MATCHING_RESOURCE'
//    return done(err)
//  }
  Dashboard.getById(user.id).then( dashboards => {
    debug(`dashboards gotten using id ${user.id}:::`)
    debug(dashboards)
    Object.assign(res.locals.data, { dashboards, name: user.name })
    res.render('index')
    done()
  }).catch( err => {
    done(err)
  })
}

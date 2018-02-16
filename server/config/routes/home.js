'use strict'

const
  debug = require('util').debuglog('rememories')
,
  { Dashboard } = require('../../models')
;

module.exports = (req, res, done) => {
  const { user } = req
  if (!user) {
    const err = new Error('User doesn\'t have session.')
    err.code = 'NO_USER'
    return done(err)
  }
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

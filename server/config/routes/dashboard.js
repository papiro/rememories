'use strict'

const
  debug = require('util').debuglog('rememories')
,
  models = require('../../models'),
  { Dashboard, Files } = models
;

module.exports = {
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
    // Save the current dashboard id in the session so later when the user uploads files, we can use it.
    req.session.current_dashboard_id = dashboard_id
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

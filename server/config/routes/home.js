'use strict'

const
  debug = require('util').debuglog(global.cfg.app.name)
,
  { Album } = require('../../models')
;

module.exports = (req, res, done) => {
  const { user } = req
  if (!user) {
    const err = new Error('User doesn\'t have session.')
    err.code = 'NO_USER'
    return done(err)
  }
  Album.getById(user.id).then( albums => {
    debug(`albums gotten using id ${user.id}:::`)
    debug(albums)
    Object.assign(res.locals.data, { albums, name: user.name })
    res.render('index')
    done()
  }).catch( err => {
    done(err)
  })
}

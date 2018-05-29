'use strict'

const
  debug = require('util').debuglog(global.cfg.app.name)
,
  models = require('../../models'),
  { Album, Files } = models
;

module.exports = {
  async get (req, res, done) {
    const album_id = req.params.id
    const user_id = req.user.id

    if (!req.user) {
      const err = new Error('User doesn\'t have session.')
      err.code = 'NO_USER'
      return done(err)
    }
    let perm
    if (perm = Album.getPermForUser({ album_id, user_id }) < 1) {
      let err
      if (perm === -1) {
        err = new ReferenceError('User not registered as user of album.')  
        err.code = 'NON_MATCHING_RESOURCE'
      } else {
        err = new ReferenceError('User doesn\'t have read access to album.')  
        err.code = 'UNAUTHORIZED_ALBUM_VIEW'
      }
      return done(err)
    }
    debug('User authorized to view album')
    // Save the current album id in the session so later when the user uploads files, we can use it.
    req.session.current_album_id = album_id
    const files = await Files.getByAlbumId(album_id)
    debug('files', files)
    Object.assign(res.locals.data, { files })
    res.render('index')
    done()
  },
  post (req, res, done) {
    Album.add({ user_id: req.user.id })
      .then( () => {
        Album.getById(req.user.id).then( albums => {
          res.json({ albums })
          done()
        }).catch( err => {
          done(err)
        })
      })
      .catch(done)
  },
  delete (req, res, done) {
    // send user_id for verification
    Album.delete({ album_id: req.params.id, user_id: req.user.id })
      .then( () => {
        debug('Deleted album')
        res.sendStatus(200)
        done()
      })
      .catch(done)
  },
  put (req, res, done) {

  }
}

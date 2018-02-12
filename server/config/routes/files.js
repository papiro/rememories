'use strict'

const
  debug = require('util').debuglog('rememories'),
  path = require('path'),
  fs = require('fs-extra')
,
  models = require('../../models'),
  { Dashboard, Files } = models
;

module.exports = {
  async post (req, res, done) {
    const dashboard_dir = path.join('/var','lib', 'mysql', 'uploads', req.session.current_dashboard_id)

    try {
      await fs.mkdirp(dashboard_dir)
    } catch (e) {
      return done(err) 
    }

    const { files } = req
    for (let i = 0; i < files.length; i++) {
      const { uuid, file, filename, encoding, mimetype } = files
      const newFilename = path.join(dashboard_dir, uuid)
      Promise.all(
        fs.move(file, newFilename),
        Files.save({ file: newFilename, filename, encoding, mimetype })   
      ).then( results => {
        console.log('results!', results)
      }).catch( err => {
        console.error(err) 
      })
    }
  }
}

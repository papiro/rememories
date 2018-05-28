'use strict'

const
  debug = require('util').debuglog(global.cfg.app.name)
;

exports.index = (req, res, done) => {
  res.render('index')
  done()
}
exports.album = require('./routes/album')
exports.home = require('./routes/home')
exports.files = require('./routes/files')

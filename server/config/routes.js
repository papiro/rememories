'use strict'

const
  debug = require('util').debuglog('rememories')
;

exports.index = (req, res, done) => {
  res.render('index')
  done()
}
exports.dashboard = require('./routes/dashboard')
exports.home = require('./routes/home')
exports.files = require('./routes/files')

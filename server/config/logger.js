'use strict'

const
  isProd = require('./isProd')
,
  morgan = require('morgan'),
  rfs = require('rotating-file-stream'),
  path = require('path')
;

let logger
if (isProd) {
  const rfstream = rfs('access.log', {
    interval: '1d',
    compress: 'gzip',
    maxFiles: 21,
    path: path.join(__dirname, 'logs'),
    rotationTime: true
  })
  logger = morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms', { stream: rfstream })
} else {
  logger = morgan('dev')
}

module.exports = logger

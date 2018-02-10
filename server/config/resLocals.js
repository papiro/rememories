'use strict'

module.exports = (req, res, done) => {
  res.locals = {
    isMobile: req.isMobile,
    isProd: require('./isProd'),
    data: req.user
  }
  done()
}

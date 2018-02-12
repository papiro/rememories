'use strict'

module.exports = (req, res, done) => {
  const data = {}
  res.locals = {
    data,
    isMobile: req.isMobile,
    isProd: require('./isProd')
  }
  done()
}

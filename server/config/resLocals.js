'use strict'

module.exports = (req, res, done) => {
  const data = {
    name: req.user.name,
    email: req.user.email,
    user_id: req.user.id
  }
  res.locals = {
    data,
    isMobile: req.isMobile,
    isProd: require('./isProd')
  }
  done()
}

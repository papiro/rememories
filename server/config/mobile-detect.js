'use strict'

const
  MobileDetect = require('mobile-detect')
;

function detectMobile (req) {
  return (new MobileDetect(req.headers['user-agent'])).mobile() // Is the user on a mobile device?
}

module.exports = (req, res, done) => {
  let mobdet
  if (req.session)
    if (req.session.isMobile)
      mobdet = req.session.isMobile
    else
      req.session.isMobile = mobdet = detectMobile(req)
  else
    mobdet = detectMobile(req)

  req.isMobile = mobdet
  done()
}

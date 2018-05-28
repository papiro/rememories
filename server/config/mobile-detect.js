'use strict'

const
  MobileDetect = require('mobile-detect')
,
  debug = require('util').debuglog(global.cfg.app.name)
;

function detectMobile (req) {
  return Boolean((new MobileDetect(req.headers['user-agent'])).mobile()) // Is the user on a mobile device?
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
  debug('isMobile', mobdet) 
  done()
}

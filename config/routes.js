'use strict'

const
  debug = require('util').debuglog('rememories')
,
  routes = require('./data/routes')
;

function getTokens (route, app) {
  return {
    prod: app.get('prod')
  }
}

module.exports = (app) => {
  app.get(routes.index.url, (req, res) => {
    res.render(routes.index.tpl, Object.assign({ isMobile: req.isMobile }, getTokens(routes.index.url, app)))
  })
  app.get(routes.dashboard.url, (req, res) => {
    res.render(routes.dashboard.tpl, getTokens(routes.dashboard.url, app))
  })
}

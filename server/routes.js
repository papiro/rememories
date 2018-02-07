'use strict'

const
  debug = require('util').debuglog('rememories')
,
  UserDashboard = require('./models').UserDashboard
;

module.exports = (app) => {
  const
    isProd = app.get('prod')
  ;

  app.get('/home', (req, res, done) => {
    debug('in /home')
    debug(req.user)
    //const { id, type, name, email } = req.user
    const dashboards = Dashboard.getById(req.user.id)
    dashboards.then(debug).catch(console.error)
//    const tokens = {
//      isProd,
//      isMobile,
//      data: req.user
//    }
//    res.render('index', tokens)
  })
  app.get('/', (req, res) => {
    res.render('index', { isProd, isMobile: req.isMobile })
  })
}

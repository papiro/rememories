'use strict'

const
  debug = require('util').debuglog('rememories')
,
  Dashboard = require('./models').Dashboard
;

module.exports = (app) => {
  const
    isProd = app.get('prod')
  ;

  app.get('/home/:id', (req, res, done) => {
    debug('in /home')
    debug(req.user)
    //const { id, type, name, email } = req.user
    const dashboards = Dashboard.getById(req.user.id)
    dashboards.then( (...args) => {
      debug(`dashboards gotten using id ${req.user.id}:::`)
      debug(...args)
      const tokens = {
        isProd,
        isMobile: req.isMobile,
        data: req.user
      }
      res.render('index', tokens)
      done()
    }).catch( err => {
      debug(err)
      res.sendStatus(500)
      done()
    })
  })
  app.get('/', (req, res) => {
    res.render('index', { isProd, isMobile: req.isMobile })
  })
}

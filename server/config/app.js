'use strict'


const
  path = require('path')
,
  isProd = require('./isProd')
;

module.exports = (app) => {
  app.set('isProd', isProd)
  app.set('query parser', 'simple')
  app.set('view engine', 'pug')
  app.set('views', path.resolve('views'))
  if (isProd) {  
    app.set('x-powered-by', false)
    app.set('trust proxy', 'loopback')
  }
}

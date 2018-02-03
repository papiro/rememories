'use strict'

const
  debug = require('util').debuglog('rememories'),
  errors = require('./errors')
,
  mysql = require('mysql2'),
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'pierre',
    database: 'rememories'
  })
;

class User {
  constructor ({ id, type = 'base' }) {
    if (!id) return errors(new ReferenceError('new User being called with no id'))

  }
}

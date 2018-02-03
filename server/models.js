'use strict'

const
  debug = require('util').debuglog('rememories')
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
    if (!id) throw new ReferenceError('
  }
}

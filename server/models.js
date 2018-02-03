'use strict'

const
  debug = require('util').debuglog('rememories'),
  errors = require('./errors')
,
  DB = require('./DB')
;

class User {
  constructor ({ id, type = 'base', email = null, password = null}) {
    if (!id) return errors(new ReferenceError('new User being called with no id'))
    return DB.addUser({ id, type, email, password })
      .then( (rows, fields) => {
        debug('rows:::', rows)
        debug('fields:::', fields)
      })
      .catch( err => {
        errors(err)
      })
  }
}

exports.User = User

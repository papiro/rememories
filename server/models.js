'use strict'

const
  debug = require('util').debuglog('rememories'),
  errors = require('./errors')
,
  DB = require('./DB')
;

function pojo (inst) {
  return JSON.parse(JSON.stringify(inst))
}

class User {
  constructor ({ id, type = 'base', name = null, email = null, password = null}) {
    if (!id) return errors(new ReferenceError('new User being called with no id'))
    return DB.addUser({ id, type, name, email, password })
  }
  static getById (id) {
    return DB.getUser({ id })
      .then( results => {
        return pojo(results[0])
      })
  }
}

exports.User = User

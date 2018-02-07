'use strict'

const
  debug = require('util').debuglog('rememories'),
  errors = require('./errors')
,
  DB = require('./sql/DB')
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

class Dashboard {
  constructor ({ type = 'gallery', user_id }) {
    if (!user_id) return errors(new ReferenceError('Creation of new Dashboard needs user_id to associate with'))
    return DB.addDashboard({ type }) 
      .then( res => {
        debug('added dashboard')
        debug(res)
        return new UserDashboard({ user_id, dashboard_id: res.insertedId, perm: 0 })
      })
  }
  static getById (user_id) {
    return DB.getDashboards(user_id)
  }
}

// Private; junction table
class UserDashboard {
  constructor ({ user_id, dashboard_id, perm }) {
    if (!user_id || !dashboard_id) return errors(new ReferenceError('Need "user_id" and "dashboard_id" to add new userdashboard'))
    return DB.associateDashboard({ user_id, dashboard_id, perm })
  }
}

exports.User = User
exports.Dashboard = Dashboard
//exports.UserDashboard = UserDashboard

'use strict'

const
  debug = require('util').debuglog('rememories'),
  errors = require('./errors')
,
  DB = require('./sql/DB')
;

function pojo (inst) {
  try {
    return JSON.parse(JSON.stringify(inst))
  } catch(e) {
    throw inst
  }
}

class User {
  constructor ({ id, type = 'base', name = null, email = null, password = null}) {
    if (!id) return errors(new ReferenceError('new User being called with no id'))
    return DB.addUser({ id, type, name, email, password })
  }
  static getById (id) {
    return DB.getUser({ id })
      .then( results => {
        if (!results.length) {
          const err = new ReferenceError('No user with id found in cookie. Most likely the table got deleted in the meantime.')
          err.code = 'NO_USER'
          throw err
        }
        return pojo(results[0])
      })
  }
}

class Dashboard {
  static async add ({ type = 'gallery', user_id }) {
    if (!user_id) return errors(new ReferenceError('Creation of new Dashboard needs user_id to associate with'))

    await DB.startTransaction()
      const result1 = await DB.addDashboard({ type }) 
      debug('added dashboard')
      let result2
      try {
        result2 = await (new UserDashboard({ user_id, dashboard_id: result1.insertId, perm: 3 }))
      } catch (e) {
        DB.rollback()
        throw e
      }
      debug('added userdashboard')
    await DB.commit()

    return [result1, result2]
  }
  static getById (user_id) {
    return DB.getDashboards(user_id)
  }
  static delete ({ dashboard_id, user_id }) {
    return DB.getUserDashboard({ dashboard_id, user_id })
      .then( res => {
        if (!res.length) {
          const err = new ReferenceError('Dashboard being deleted by user is not related to user')
          err.code = 'USER_DASHBOARD_MIXUP'
          throw err
        }
        debug('Validated that dashboard is related to user')
        if (res[0].perm < 3) {
          const err = new TypeError('User is not owner so cannot delete dashboard')
          err.code = 'UNAUTHORIZED_DASHBOARD_DELETE'
          throw err
        }
        debug('User is owner so authorized for delete')

        return DB.deleteDashboard(dashboard_id)
      })
  }
  static getPermForUser(args = {}) {
    return DB.getUserDashboard(args)
      .then( result => {
        return result[0].perm
      })
  }
}

class Files {
  static getByDashboardId (dashboard_id) {
    return DB.getFilesForDashboard(dashboard_id)
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
exports.Files = Files

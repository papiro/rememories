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
,
  table = {
    users: require('./tables/users'),
    dashboards: require('./tables/dashboards'),
    userdashboards: require('./tables/userdashboards'),
    files: require('./tables/files')
  }
,
  select = {
    user: require('./selects/user'),
    dashboards: require('./selects/dashboards'),
    userdashboards: require('./selects/userdashboards')
  }
,
  insert = {
    user: require('./inserts/user'),
    dashboard: require('./inserts/dashboard'),
    userdashboard: require('./inserts/userdashboard')
  }
,
  remove = {
    dashboard: require('./deletes/dashboard')
  }
;

function query (query) {
  return new Promise( (resolve, reject) => {
    connection.query(query, (err, ...res) => {
      if (err) return reject(err)
      resolve(...res)
    })
  })
}

class DB {
  static init () {
    // Create tables
    connection.query(table.users)
    connection.query(table.dashboards)
    connection.query(table.files)
    // Create junction table
    connection.query(table.userdashboards)
  }
  static startTransaction () {
    return query('START TRANSACTION;')
  }
  static commit () {
    return query('COMMIT;')
  }
  static rollback () {
    return query('ROLLBACK;')
  }
  static addUser (args = {}) {
    return query(insert.user(args))
  }
  static getUser ({ id, type, name, email, password }) {
    return query(select.user({ id }))
  }
  static addDashboard (args = {}) {
    return query(insert.dashboard(args))
  }
  static getDashboards (user_id) {
    return query(select.dashboards(user_id))
  }
  static associateDashboard (args = {}) {
    return query(insert.userdashboard(args))
  }
  static isUserDashboard (args = {}) {
    return query(select.userdashboards(args))
  }
  static deleteDashboard (id) {
    return query(remove.dashboard(id))
  }
}

module.exports = DB

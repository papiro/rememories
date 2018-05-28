'use strict'

const { cfg } = global;
const { mysql: mysql_cfg, app } = cfg;
const
  debug = require('util').debuglog(app.name),
  pojo = require('../config/pojo')
,
  mysql = require('mysql2'),
  connection = mysql.createConnection({
    host: mysql_cfg.host,
    user: mysql_cfg.user,
    password: mysql_cfg.password,
    database: app.name
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
    userdashboards: require('./selects/userdashboards'),
    files: require('./selects/files'),
    file: require('./selects/file')
  }
,
  insert = {
    user: require('./inserts/user'),
    dashboard: require('./inserts/dashboard'),
    userdashboard: require('./inserts/userdashboard'),
    files: require('./inserts/file')
  }
,
  remove = {
    dashboard: require('./deletes/dashboard'),
    file: require('./deletes/file')
  }
;

function query (query) {
  return new Promise( (resolve, reject) => {
    console.log(query)
    connection.query(query, (err, results) => {
      if (err) return reject(err)
      resolve([].concat(results).map( result => pojo(result) ))
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
  static getUserDashboard (args = {}) {
    return query(select.userdashboards(args))
  }
  static deleteDashboard (id) {
    return query(remove.dashboard(id))
  }
  static getFilesForDashboard (dashboard_id) {
    return query(select.files(dashboard_id))
  }
  static getFileById (file_id) {
    return query(select.file(file_id))
  }
  static saveFileForDashboard (args = {}) {
    return query(insert.files(args))
  }
  static deleteFile (file_id) {
    return query(remove.file(file_id))
  }
}

module.exports = DB

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
    dashboards: require('./selects/dashboards')
  }
,
  insert = {
    user: require('./inserts/user'),
    dashboard: require('./inserts/dashboard'),
    userdashboard: require('./inserts/userdashboard')
  }
;

class DB {
  static init () {
    // Create table 'users'
    connection.query(table.users)

    // Create table 'dashboards'
    connection.query(table.dashboards)

    // Create junction table 'userdashboards'
    connection.query(table.userdashboards)

    // Create 'files'
    connection.query(table.files)
  }

  static addUser (args = {}) {
    const { id, type, name, email } = args
    const query = insert.user(args)
    debug(query)
    return new Promise( (resolve, reject) => {
      connection.query(query, (err, ...results) => {
        if (err) return reject(err)
        resolve({ id, type, name, email }, ...results)
      })
    })
  }
  static getUser ({ id, type, name, email, password }) {
    if (id) {
      const query = select.user({ id })
      return new Promise( (resolve, reject) => {
        connection.query(query, (err, ...res) => {
          if (err) return reject(err)
          resolve(...res)
        })
      })
    }
  }
  static addDashboard ({ type }) {
    const query = insert.dashboard({ type })
    return new Promise( (resolve, reject) => {
      connection.query(query, (err, ...res) => {
        if (err) return reject(err)
        resolve(...res)
      })
    })
  }
  static getDashboards (user_id) {
    const query = select.dashboards(user_id)
    return new Promise( (resolve, reject) => {
      connection.query(query, (err, ...res) => {
        if (err) return reject(err)
        resolve(...res)
      })
    })
  }
  static associateDashboard ({ userid, dashboardid, perm }) {
    const query = insert.userdashboard({ type })
    return new Promise( (resolve, reject) => {
      connection.query(query, (err, ...res) => {
        if (err) return reject(err)
        resolve(...res)
      })
    })
  }
}

module.exports = DB

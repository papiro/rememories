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

function wrapQuotes (str) {
  return '"'+str+'"' 
}

class DB {
  static init () {
    // Create 'Users'
    connection.query(
      `CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(40) NOT NULL,
        type VARCHAR(20) NOT NULL,
        name VARCHAR(30),
        email VARCHAR(40),
        password CHAR(129),
        created TIMESTAMP NOT NULL,
        PRIMARY KEY(id)
      )`
    )
    // Create junction table 'UserDashboards'
    connection.query(
      `CREATE TABLE IF NOT EXISTS userdashboards (
        user_id MEDIUMINT UNSIGNED NOT NULL,
        dashboard_id MEDIUMINT UNSIGNED NOT NULL,
        perm TINYINT UNSIGNED,
        PRIMARY KEY(user_id, dashboard_id)
      )`
    )
    // Create Dashboards
    connection.query(
      `CREATE TABLE IF NOT EXISTS dashboards (
        id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
        type VARCHAR(20) NOT NULL,
        created TIMESTAMP NOT NULL,
        PRIMARY KEY(id)
      )`
    )
    // Create Files
    connection.query(
      `CREATE TABLE IF NOT EXISTS files (
        id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
        filepath CHAR(75) NOT NULL,
        size FLOAT NOT NULL,
        type VARCHAR(20) NOT NULL,
        length TIME,
        created TIMESTAMP NOT NULL,
        PRIMARY KEY(id)
      )`
    )
  }
  static addUser ({ id, type, name, email, password }) {
    const query = 
      `INSERT INTO users (
        id,
        type,
        name,
        email,
        password,
        created
      ) VALUES(
        "${id}", 
        "${type}",
        ${name ? wrapQuotes(name) : "NULL"},
        ${email ? wrapQuotes(email) : "NULL"},
        ${password ? wrapQuotes(password) : "NULL"},
        "${Date.now()}"
      ) ON DUPLICATE KEY UPDATE email="${email}", password="${password}";`
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
      const query = `SELECT * FROM users WHERE id=${id};`
      return new Promise( (resolve, reject) => {
        connection.query(query, (err, ...res) => {
          if (err) return reject(err)
          resolve(...res)
        })
      })
    }
  }
}

module.exports = DB

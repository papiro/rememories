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

// Create 'Users'
connection.query(
  `CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(40) NOT NULL,
    type VARCHAR(20) NOT NULL,
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

class DB {
  static addUser ({ id, type, email, password }) {
    return connection.query(
      `INSERT INTO users VALUES(
        ${id}, 
        ${type},
        ${email},
        ${password},
        ${Date.now()}
      ) ON DUPLICATE KEY UPDATE email=${email}, password=${password}`
    )
  }
}

module.exports = DB

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
  `CREATE TABLE IF NOT EXISTS Users (
    id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    type VARCHAR(20),
    password CHAR(129),
    PRIMARY KEY(id)
  )`
)
// Create junction table 'UserDashboards'
connection.query(
  `CREATE TABLE IF NOT EXISTS UserDashboards (
    user_id MEDIUMINT UNSIGNED NOT NULL,
    dashboard_id MEDIUMINT UNSIGNED NOT NULL,
    perm TINYINT UNSIGNED,
    PRIMARY KEY(user_id, dashboard_id)
  )`
)
// Create Dashboards
connection.query(
  `CREATE TABLE IF NOT EXISTS Dashboards (
    id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    type VARCHAR(20) NOT NULL,
    created TIMESTAMP NOT NULL,
    PRIMARY KEY(id)
  )`
)
// Create Files
connection.query(
  `CREATE TABLE IF NOT EXISTS Files (
    id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    filepath CHAR(75) NOT NULL,
    created TIMESTAMP NOT NULL,
    size FLOAT NOT NULL,
    type VARCHAR(20) NOT NULL,
    length TIME,
    PRIMARY KEY(id)
  )`
)

module.exports = (app) => {
    
}

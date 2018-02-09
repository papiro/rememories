'use strict'

module.exports = `CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(40) NOT NULL,
  type VARCHAR(20) NOT NULL,
  name VARCHAR(30),
  email VARCHAR(40),
  password CHAR(129),
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY(id)
)`

'use strict'

module.exports = 
`CREATE TABLE IF NOT EXISTS dashboards (
  id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(40),
  type VARCHAR(20) NOT NULL,
  created TIMESTAMP NOT NULL,
  PRIMARY KEY(id)
)`

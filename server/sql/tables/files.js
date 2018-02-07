'use strict'

module.exports =
`CREATE TABLE IF NOT EXISTS files (
  id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  filepath CHAR(75) NOT NULL,
  size FLOAT NOT NULL,
  type VARCHAR(20) NOT NULL,
  length TIME,
  created TIMESTAMP NOT NULL,
  PRIMARY KEY(id)
)`

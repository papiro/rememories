'use strict'

module.exports =
`CREATE TABLE IF NOT EXISTS files (
  id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  dashboard_id MEDIUMINT UNSIGNED NOT NULL,
  filepath CHAR(75) NOT NULL,
  filename VARCHAR(40),
  encoding VARCHAR(10),
  size FLOAT NOT NULL,
  mimetype VARCHAR(20) NOT NULL,
  length TIME,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (dashboard_id) REFERENCES dashboards(id) ON DELETE CASCADE,
  PRIMARY KEY(id)
)`

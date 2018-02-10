'use strict'

/*
 * perm 0 - no access
 *      1 - read access
 *      2 - read/write access
 *      3 - owner
*/

module.exports = 
`CREATE TABLE IF NOT EXISTS userdashboards (
  user_id VARCHAR(40) NOT NULL,
  dashboard_id MEDIUMINT UNSIGNED NOT NULL,
  perm TINYINT UNSIGNED NOT NULL,
  deleted TIMESTAMP,
  invited_by VARCHAR(40),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (dashboard_id) REFERENCES dashboards(id) ON DELETE CASCADE,
  PRIMARY KEY(user_id, dashboard_id)
)`

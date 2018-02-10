'use strict'

/*
 *     -1 - no access
 * perm 0 - owner
 *      1 - read access
 *      2 - read/edit access
 *      3 - read/edit/delete access
*/

module.exports = 
`CREATE TABLE IF NOT EXISTS userdashboards (
  user_id VARCHAR(40) NOT NULL,
  dashboard_id MEDIUMINT UNSIGNED NOT NULL,
  perm TINYINT UNSIGNED,
  deleted TIMESTAMP,
  invited_by VARCHAR(40),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (dashboard_id) REFERENCES dashboards(id) ON DELETE CASCADE,
  PRIMARY KEY(user_id, dashboard_id)
)`

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
  PRIMARY KEY(user_id, dashboard_id)
)`

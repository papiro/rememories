'use strict'

module.exports = (user_id) => {
  return `SELECT 
    id, 
    type, 
    created 
  FROM dashboards
  JOIN userdashboards
  ON userdashboards.user_id = ${user_id}
    AND userdashboards.dashboard_id = dashboards.id;`
}

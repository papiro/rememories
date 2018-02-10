'use strict'

module.exports = (user_id) => {
  return `SELECT 
    d.id, 
    d.name,
    d.type, 
    d.created,
    ud.invited_by,
    ud.perm,
    ud.deleted,
    (
      SELECT
      COUNT(f.id) FROM files f
      WHERE f.dashboard_id=d.id
    ) AS files
  FROM dashboards d
  JOIN userdashboards ud
  ON ud.user_id = ${user_id}
    AND ud.dashboard_id = d.id
  WHERE ud.perm != -1
  GROUP BY d.id;`
}

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
      WHERE f.album_id=d.id
    ) AS files
  FROM albums a
  JOIN useralbums ua
  ON ua.user_id = ${user_id}
    AND ua.album_id = a.id
  WHERE ua.perm != -1
  GROUP BY d.id;`
}

'use strict'

module.exports = (user_id) => {
  return `SELECT 
    a.id, 
    a.name,
    a.created,
    ua.invited_by,
    ua.perm,
    ua.deleted,
    (
      SELECT
      COUNT(f.id) FROM files f
      WHERE f.album_id=a.id
    ) AS files
  FROM albums a
  JOIN useralbums ua
  ON ua.user_id = ${user_id}
    AND ua.album_id = a.id
  WHERE ua.perm != -1
  GROUP BY a.id;`
}

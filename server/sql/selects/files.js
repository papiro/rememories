'use strict'

module.exports = (album_id) => {
  return `SELECT * FROM files
    WHERE album_id="${album_id}";
  `
}

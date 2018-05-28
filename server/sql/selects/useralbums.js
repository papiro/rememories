'use strict'

module.exports = ({ album_id, user_id }) => {
  return `SELECT * 
    FROM useralbums 
    WHERE album_id="${album_id}" 
      AND user_id="${user_id}";
  `
}

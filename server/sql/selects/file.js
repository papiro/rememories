'use strict'

module.exports = (file_id) => {
  return `
    SELECT * FROM files WHERE id=${file_id};
  `
}

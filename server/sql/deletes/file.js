'use strict'

module.exports = (file_id) => {
  return `
    DELETE FROM files 
    WHERE id=${file_id}
  `
}
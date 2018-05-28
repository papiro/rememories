'use strict'

module.exports = (id) => {
  return `DELETE FROM albums
    WHERE id="${id}";
  `
}

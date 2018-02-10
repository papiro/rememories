'use strict'

module.exports = (id) => {
  return `DELETE FROM dashboards
    WHERE id="${id}";
  `
}

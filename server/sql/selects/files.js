'use strict'

module.exports = ({ dashboard_id }) => {
  return `SELECT * FROM files
    WHERE dashboard_id="${dashboard_id}";
  `
}

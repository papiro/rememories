'use strict'

module.exports = ({ dashboard_id, user_id }) => {
  return `SELECT * 
    FROM userdashboards 
    WHERE dashboard_id="${dashboard_id}" 
      AND user_id="${user_id}";
  `
}

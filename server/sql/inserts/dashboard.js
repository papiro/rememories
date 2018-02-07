'use strict'

const
  wrapQuotes = require('../utils/wrapQuotes')
;

module.exports = ({ type }) => {
  return `INSERT INTO dashboards (
    type,
    created
  ) VALUES (
    wrapQuotes(type),
    wrapQuotes(Date.now())
  );` 
}

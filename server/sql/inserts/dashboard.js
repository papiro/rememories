'use strict'

const
  wrapQuotes = require('../utils/wrapQuotes')
;

module.exports = ({ type, name }) => {
  return `INSERT INTO dashboards (
    name,
    type
  ) VALUES (
    ${name ? wrapQuotes(name) : "NULL"},
    ${wrapQuotes(type)}
  );` 
}

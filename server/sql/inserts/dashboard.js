'use strict'

const
  wrapQuotes = require('../utils/wrapQuotes')
;

module.exports = ({ type, name }) => {
  return `INSERT INTO dashboards (
    name,
    type,
    created
  ) VALUES (
    ${name ? wrapQuotes(name) : "NULL"},
    ${wrapQuotes(type)},
    ${wrapQuotes(Date.now())}
  );` 
}

'use strict'

const
  wrapQuotes = require('../utils/wrapQuotes')
;

module.exports = ({ name }) => {
  return `INSERT INTO albums (
    name,
    //type
  ) VALUES (
    ${name ? wrapQuotes(name) : "NULL"},
    ${wrapQuotes(type)}
  );` 
}

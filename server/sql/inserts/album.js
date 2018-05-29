'use strict'

const
  wrapQuotes = require('../utils/wrapQuotes')
;

module.exports = ({ name }) => {
  return `INSERT INTO albums (
    name
  ) VALUES (
    ${name ? wrapQuotes(name) : "NULL"}
  );` 
}

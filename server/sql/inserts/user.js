'use strict'

const
  wrapQuotes = require('../utils/wrapQuotes')
;

module.exports = ({ id, type, name, email, password }) => {
  return `INSERT INTO users (
    id,
    type,
    name,
    email,
    password,
    created
  ) VALUES(
    ${wrapQuotes(id)}, 
    ${wrapQuotes(type)},
    ${name ? wrapQuotes(name) : "NULL"},
    ${email ? wrapQuotes(email) : "NULL"},
    ${password ? wrapQuotes(password) : "NULL"},
    ${wrapQuotes(Date.now())}
  ) ON DUPLICATE KEY UPDATE email="${email}", name="${name}";`
}

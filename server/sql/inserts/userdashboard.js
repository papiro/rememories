'use strict'

const
  wrapQuotes = require('../utils/wrapQuotes')
,
  errors = require('../../errors')
;

module.exports = ({ user_id, dashboard_id, perm = -1/*no access*/ }) => {
  if (perm === -1) debug('Warning:::no perm provided so using -1 (no access) on new user-dashboard association')
  return `INSERT INTO userdashboards (
    user_id,
    dashboard_id,
    perm,
    deleted
  ) VALUES (
    ${wrapQuotes(user_id)},
    ${wrapQuotes(dashboard_id)},
    ${ perm !== undefined ? wrapQuotes(perm) : "NULL"},
    NULL
  );`
}

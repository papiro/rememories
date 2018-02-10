'use strict'

const
  wrapQuotes = require('../utils/wrapQuotes')
,
  errors = require('../../errors')
,
  debug = require('util').debuglog('rememories')
;

module.exports = ({ user_id, dashboard_id, perm }) => {
  if (perm === undefined) debug('Warning:::no perm provided so using default (no) access on new user-dashboard association')
  return `INSERT INTO userdashboards (
    user_id,
    dashboard_id,
    perm
  ) VALUES (
    ${wrapQuotes(user_id)},
    ${wrapQuotes(dashboard_id)},
    ${ perm ? wrapQuotes(perm) : 0 }
  );`
}

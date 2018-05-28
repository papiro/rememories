'use strict'

const
  wrapQuotes = require('../utils/wrapQuotes')
,
  errors = require('../../errors')
,
  debug = require('util').debuglog(global.cfg.app.name)
;

module.exports = ({ user_id, album_id, perm }) => {
  if (perm === undefined) debug('Warning:::no perm provided so using default (no) access on new user-album association')
  return `INSERT INTO useralbums (
    user_id,
    album_id,
    perm
  ) VALUES (
    ${wrapQuotes(user_id)},
    ${wrapQuotes(album_id)},
    ${ perm ? wrapQuotes(perm) : 0 }
  );`
}

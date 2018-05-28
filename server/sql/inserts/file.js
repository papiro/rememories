'use strict'

const
  debug = require('util').debuglog(global.cfg.app.name),
  wrapQuotes = require('../utils/wrapQuotes')
;

module.exports = ({ size, filepath, filename, encoding, mimetype, album_id }) => {
  return `INSERT INTO files (
    album_id,
    filepath,
    filename,
    encoding,
    size,
    mimetype
  ) VALUES (
      ${wrapQuotes(album_id)},
      ${wrapQuotes(filepath)},
      ${wrapQuotes(filename)},
      ${wrapQuotes(encoding)},
      ${wrapQuotes(size)},
      ${wrapQuotes(mimetype)}
    );`
}

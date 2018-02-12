'use strict'

const
  debug = require('util').debuglog('rememories'),
  wrapQuotes = require('../utils/wrapQuotes')
;

module.exports = ({ size, filepath, filename, encoding, mimetype, dashboard_id }) => {
  return `INSERT INTO files (
    dashboard_id,
    filepath,
    filename,
    encoding,
    size,
    mimetype
  ) VALUES (
      ${wrapQuotes(dashboard_id)},
      ${wrapQuotes(filepath)},
      ${wrapQuotes(filename)},
      ${wrapQuotes(encoding)},
      ${wrapQuotes(size)},
      ${wrapQuotes(mimetype)}
    );`
}

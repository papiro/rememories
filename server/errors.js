'use strict'

const inspect = require('util').inspect
const methods = {
  simple (err) {
    inspect(err)
    console.error('Exiting process')
    process.exit(1)
  }
}

const _default = (err, res, next) => {
  methods.simple(err, res, next)  
}

Object.assign(_default, methods)

module.exports = _default

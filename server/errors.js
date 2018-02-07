'use strict'

const methods = {
  simple (err) {
    console.trace(err)
    process.exit(1)
  }
}

const _default = (err, res, next) => {
  methods.simple(err, res, next)  
}

Object.assign(_default, methods)

module.exports = _default

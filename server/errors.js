'use strict'

const methods = {
  simple (err) {
    console.error(err)
    process.exit(1)
  }
}

const default = (err, res, next) => {
  methods.simple(err, res, next)  
}


Object.assign(default, methods)

module.exports = default

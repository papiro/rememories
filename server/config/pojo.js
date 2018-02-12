'use strict'

module.exports = function pojo (inst) {
  try {
    return JSON.parse(JSON.stringify(inst))
  } catch(e) {
    throw inst
  }
}


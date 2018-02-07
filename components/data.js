'use strict'

let data = {}
try {
  data = JSON.parse(document.getElementById('data').dataset.vdata)
} catch (e) {
  throw e
}

export default data


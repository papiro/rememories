'use strict'

import React from 'react'
import Greeting from './Greeting.jsx'
import AlbumTable from './AlbumTable.jsx'

export default () => {
  setTimeout( () => {
    alert('You will be logged out in approximately 1 minute')
  }, 540000)
  return (
    <main>
      <Greeting />
      <AlbumTable />
    </main>
  )
}


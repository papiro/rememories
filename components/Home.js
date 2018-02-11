'use strict'

import React from 'react'
import Greeting from './Greeting'
import DashboardTable from './DashboardTable'

export default () => {
  setTimeout( () => {
    alert('You will be logged out in approximately 1 minute')
  }, 540000)
  return (
    <main>
      <Greeting />
      <DashboardTable />
    </main>
  )
}


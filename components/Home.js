'use strict'

import React from 'react'
import Greeting from './Greeting'
import DashboardTable from './DashboardTable'

export default class Home extends React.Component {
	constructor (props) {
		super(props)
	}
	render () {
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
}


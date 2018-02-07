'use strict'

import React from 'react'
import data from './data'

/*
{
	dashboards: <Array>{
		name: <String>,
		noofitems: <Integer>,
		created: <DateTime>,
		deleted: <Integer>|<NULL>,
	}
}
*/

class DashboardTable extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return <table></table>
  }
}

class Greeting extends React.Component {
	constructor	(props) {
		super(props)
		this.state = { name: data.name }
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}
	render () {
		if (this.state.name) 
			return <h2>Hi {this.state.name}!</h2>
		else {
			return (
				<form onSubmit={this.onSubmit}>
					<h2>Hi 
						<input type="text"placeholder="Enter your name"value={this.state.name} onChange={this.onChange}/>
						<button type="submit">check</button> !
          </h2>
        </form>
      )
		}
	}
	onChange ({ target }) {
		this.setState({ name: target.value })
	}
	onSubmit ({ target }) {
    fetch(`/api/userInfo/${data.id}`, {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then( res => {
      console.log(res)
    }).catch( err => {
      console.error(err)
    })
	}
}

export default class Home extends React.Component {
	constructor (props) {
		super(props)
	}
	render () {
		console.log('Rendering Home with', this.props.match.params.id)
		return (
			<main>
				<Greeting />
        <DashboardTable />
			</main>
		)
	}
}


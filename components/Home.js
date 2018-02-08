'use strict'

import React from 'react'
import data from './data'

console.log(data)

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
    this.state = { dashboards: data.dashboards }
    this.addDashboard = this.addDashboard.bind(this)
  }
  render () {
    const { dashboards } = this.state
    return (
    	<main>	
	      <table>
          <thead><tr>
            <th>Dashboard</th><th>Items</th><th>Created</th> 
          </tr></thead>
          <tbody>
	        {dashboards.length ? 
	          dashboards.map( dashboard => 
	            <DashboardRow key={dashboard.id} dashboard={dashboard} />
	          )
	          :
	          <tr><td colSpan="3">No dashboards created yet</td></tr>
	        } 
          </tbody>
	      </table>
	      <button onClick={this.addDashboard} className="add-dashboard"></button>
      </main>
    )
  }
  addDashboard (evt) {
    fetch('/dashboard', {
      method: 'POST',
      credentials: 'same-origin'
    }).then( res => {
      if (res.redirected) window.location = res.url
    }).catch(console.error)
  }
}

class DashboardRow extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const { dashboard } = this.props
    return (
      <tr>
        <td>{dashboard.name || dashboard.id}</td>
        <td># of items</td>
        <td>{dashboard.created}</td>
      </tr>
    )
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
		console.log('Rendering Home of user', this.props.match.params.id)
		return (
			<main>
				<Greeting />
        <DashboardTable />
			</main>
		)
	}
}


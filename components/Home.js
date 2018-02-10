'use strict'

import React from 'react'
import data from './data'
import Modal from './Modal'

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
    	<section className="dashboard-section">
	      <table className="dashboard-table">
          <thead><tr>
            <th>Dashboard</th><th>Files</th><th>Created</th><th>Actions</th>
          </tr></thead>
          <tbody>
	        {dashboards.length ? 
	          dashboards.map( dashboard => 
	            <DashboardRow key={dashboard.id} dashboard={dashboard} />
	          )
	          :
	          <tr><td colSpan="4">No dashboards created yet</td></tr>
	        } 
          </tbody>
	      </table>
	      <button onClick={this.addDashboard} className="add-dashboard"></button>
      </section>
    )
  }
  addDashboard (evt) {
    fetch('/dashboard', {
      method: 'POST',
      credentials: 'same-origin'
    }).then( res => {
      if (res.redirected) return window.location = res.url
      //window.location.reload()
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
        <td>{dashboard.files}</td>
        <td>{this.dateFormat(dashboard.created)}</td>
        <td><DeleteDashboardButton dashboard={dashboard}/></td>
      </tr>
    )
  }
  dateFormat (str) {
    return (new Date(str)).toLocaleString()
  }
}

class DeleteDashboardButton extends React.Component {
  constructor (props) {
    super(props)
    this.deleteDashboard = this.deleteDashboard.bind(this)
    this.closeConfirm = this.closeConfirm.bind(this)
    this.verifyDelete = this.verifyDelete.bind(this)
    this.state = {
      showConfirm: false
    }
  }
  render () {
    this.setState
    return (
      <button onClick={this.verifyDelete} className="delete-dashboard">
      { this.state.showConfirm  &&
        <Modal onClose={this.closeConfirm}>
          <h1>Are you sure?</h1> 
          <p><strong>All files in this dashboard will be deleted from the server.</strong></p>
          <button onClick={this.deleteDashboard}>Yes</button><button onClick={this.closeConfirm}>No</button>
        </Modal>
      }
      </button>
    )
  }
  closeConfirm () {
    this.setState({ showConfirm: false })
  }
  verifyDelete () {
    if (this.props.dashboard.files.length) {
      this.setState({
        showConfirm: Boolean(props.dashboard.files.length)
      })
    } else this.deleteDashboard()
  }
  deleteDashboard (evt) {
    fetch(`/dashboard/${this.props.dashboard.id}`, {
      method: 'DELETE',
      credentials: 'same-origin'
    }).then( res => {
      switch (res.status) {
        case 200:
          //window.location.reload()
        default:
          console.log(res) 
      }
    }).catch( err => {
      console.error(err)
    })
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
			return <h2 className="greeting">Hi {this.state.name}!</h2>
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


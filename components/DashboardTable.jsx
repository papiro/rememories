'use strict'

import React from 'react'
import DashboardRow from './DashboardRow.jsx'
import data from './data'

export default class DashboardTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = { dashboards: data.dashboards }
  }
  render () {
    const { dashboards } = this.state
    return (
    	<section className="dashboard-section">
	      <table className="dashboard-table">
          <thead><tr><th>Dashboard</th><th>Files</th><th>Created</th><th>Actions</th></tr></thead>
          <tbody>
	        {dashboards.length ? 
	          dashboards.map( dashboard => 
	            <DashboardRow key={dashboard.id} dashboard={dashboard} onDelete={this.deleteRowFromState.bind(this)} />
	          )
	          : <tr><td colSpan="4">No dashboards. Create one!</td></tr>
	        } 
          </tbody>
	      </table>
	      <button onClick={this.addDashboard.bind(this)} className="add-dashboard"></button>
      </section>
    )
  }
  deleteRowFromState (dashboard_id) {
    this.setState({ dashboards: this.state.dashboards.filter( dashboard => dashboard.id !== dashboard_id )})
  }
  addDashboard (evt) {
    fetch('/dashboard', {
      method: 'POST',
      credentials: 'same-origin'
    }).then( res => {
      if (res.redirected) return window.location = res.url
      res.json().then( data => { this.setState({ dashboards: data.dashboards }) })
    }).catch(console.error)
  }
}
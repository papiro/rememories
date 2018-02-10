'use strict'

import React from 'react'
import DeleteDashboardButton from './DeleteDashboardButton'

export default class DashboardRow extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const { dashboard } = this.props
    return (
      <tr>
        <td><a href={"/dashboard/" + dashboard.id}>{dashboard.name || dashboard.id}</a></td>
        <td>{dashboard.files}</td>
        <td>{this.dateFormat(dashboard.created)}</td>
        <td><DeleteDashboardButton onDelete={this.props.onDelete} dashboard={dashboard}/></td>
      </tr>
    )
  }
  dateFormat (str) {
    return (new Date(str)).toLocaleString()
  }
}

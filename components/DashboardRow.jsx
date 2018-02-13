'use strict'

import React from 'react'
import DeleteDashboardButton from './DeleteDashboardButton.jsx'

function dateFormat (str) {
  return (new Date(str)).toLocaleString()
}

export default function DashboardRow ({ dashboard, onDelete }) {
  return (
    <tr>
      <td><a href={"/dashboard/" + dashboard.id}>{dashboard.name || dashboard.id}</a></td>
      <td>{dashboard.files}</td>
      <td>{dateFormat(dashboard.created)}</td>
      <td className="row-actions"><DeleteDashboardButton onDelete={onDelete} dashboard={dashboard}/></td>
    </tr>
  )
}

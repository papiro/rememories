'use strict'

import DeleteDashboardButton from './DeleteDashboardButton'

function dateFormat (str) {
  return (new Date(str)).toLocaleString()
}

export default function ({ dashboard, onDelete }) {
  return (
    <tr>
      <td><a href={"/dashboard/" + dashboard.id}>{dashboard.name || dashboard.id}</a></td>
      <td>{dashboard.files}</td>
      <td>{dateFormat(dashboard.created)}</td>
      <td><DeleteDashboardButton onDelete={props.onDelete} dashboard={dashboard}/></td>
    </tr>
  )
}

import React from 'react'
import Modal from './Modal.jsx'
import DeleteResourceButton from './DeleteResourceButton.jsx'

export default class DeleteDashboardButton extends React.PureComponent {
  render () {
    return (
      <DeleteResourceButton 
        // If the dashboard contains files, prompt with "Are you sure?" dialog
        confirm={this.props.dashboard_files > 0} 
        onDelete={this.onDelete.bind(this)} 
        message="All files in this dashboard will be deleted from the server."
       />
    )
  }
  onDelete (evt) {
    const id = this.props.dashboard.id
    fetch(`/dashboard/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin'
    }).then( res => {
      switch (res.status) {
        case 200:
          this.context.deleteRow(id)
        default:
          console.log(res) 
      }
    }).catch(console.error)
  }
}

DeleteDashboardButton.childContextTypes = {
  deleteRow: PropTypes.func
}
'use strict'

import React from 'react'
import Modal from './Modal'

export default class DeleteDashboardButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = { showConfirm: false }
  }
  render () {
    return (
      <button onClick={this.verifyDelete.bind(this)} className="delete-dashboard">
      { this.state.showConfirm  &&
        <Modal onClose={this.closeConfirm.bind(this)}>
          <h1>Are you sure?</h1> 
          <p><strong>All files in this dashboard will be deleted from the server.</strong></p>
          <button onClick={this.deleteDashboard.bind(this)}>Yes</button><button onClick={this.closeConfirm.bind(this)}>No</button>
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
    const id = this.props.dashboard.id
    fetch(`/dashboard/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin'
    }).then( res => {
      switch (res.status) {
        case 200:
          this.props.onDelete(id)
        default:
          console.log(res) 
      }
    }).catch(console.error)
  }
}

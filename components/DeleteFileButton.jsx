import React from 'react'
import Modal from './Modal.jsx'
import DeleteResourceButton from './DeleteResourceButton.jsx'

export default class DeleteFileButton extends React.PureComponent {
  render () {
    return <DeleteResourceButton 
            confirm 
            onDelete={this.onDelete.bind(this)}
            message="This file will be deleted from the server."
           />
  }
  onDelete (evt) {
    const id = this.props.file_id
    fetch(`/files/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin'
    }).then( res => {
      switch (res.status) {
        case 200:
          // handle any "onDelete" handlers passed in from parent
          this.context.deleteRow(id)
        default:
          console.log(res) 
      }
    }).catch(console.error)
  }
}

DeleteFileButton.childContextTypes = {
  deleteRow: PropTypes.func
}
import React from 'react'
import Modal from './Modal'
import DeleteResourceButton from './DeleteResourceButton'

export default class DeleteFileButton extends React.PureComponent {
  render () {
    return <DeleteResourceButton 
            confirm 
            onDelete={this.onDelete.bind(this)}
            message="This file will be deleted from the server."
           />
  }
  onDelete (evt) {
    const id = this.props.file.id
    fetch(`/dashboard/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin'
    }).then( res => {
      switch (res.status) {
        case 200:
          // handle any "onDelete" handlers passed in from parent
          this.props.onDelete(id)
        default:
          console.log(res) 
      }
    }).catch(console.error)
  }
}
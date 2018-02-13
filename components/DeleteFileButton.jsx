import React from 'react'
import PropTypes from 'prop-types'
import DeleteResourceButton from './DeleteResourceButton.jsx'

export default class DeleteFileButton extends React.PureComponent {
  render () {
    return <DeleteResourceButton 
            //confirm
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
          this.context.deleteRows(id)
        default:
          console.log(res) 
      }
    }).catch(console.error)
  }
}

DeleteFileButton.contextTypes = {
  deleteRows: PropTypes.func
}

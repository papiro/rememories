import React from 'react'
import PropTypes from 'prop-types'
import Modal from './Modal.jsx'
import DeleteResourceButton from './DeleteResourceButton.jsx'

export default class DeleteAlbumButton extends React.PureComponent {
  render () {
    return (
      <DeleteResourceButton 
        // If the album contains files, prompt with "Are you sure?" dialog
        confirm={this.props.album_files > 0} 
        onDelete={this.onDelete.bind(this)} 
        message="All files in this album will be deleted from the server."
       />
    )
  }
  onDelete (evt) {
    const id = this.props.album_id
    fetch(`/album/${id}`, {
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

DeleteAlbumButton.contextTypes = {
  deleteRow: PropTypes.func
}

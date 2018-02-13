import React from 'react'
import DeleteFileButton from './DeleteFileButton.jsx'
import FavoriteFileButton from './FavoriteFileButton.jsx'

export default class FileRow extends React.PureComponent {
  render () {
    const { file } = this.props
    return (
      <tr>
        <td>{file.filename}</td>
        <td>{file.date}</td>
        <td>{file.size}</td>
        <td>{file.length}</td>
        <td className="row-actions">
          <FavoriteFileButton file_id={file.id} filename={file.filename}/>
          <DeleteFileButton file_id={file.id} />
        </td>
      </tr>
    )
  }
}

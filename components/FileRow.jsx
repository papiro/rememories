import React from 'react'

export default class FileRow extends React.PureComponent {
  constructor (props) {
    super(props)
  }
  render () {
    const { file } = this.props
    return (
      <tr>
        <td>{file.filename}</td>
        <td>{file.date}</td>
        <td>{file.size}</td>
        <td>{file.length}</td>
        <td className="row-actions"><FavoriteFileButton /><DeleteFileButton /></td>
      </tr>
    )
  }
}
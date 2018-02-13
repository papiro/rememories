import React from 'react'
import FilesTableHeader from './FilesTableHeader.jsx'
import FileRow from './FileRow.jsx'

export default class FilesTable extends React.PureComponent {
  render () {
    const { files } = this.props
    return (
      <table className="files-table">
        <FilesTableHeader />
        <tbody>
          { files.length ?
            files.map( file => (
              <FileRow key={file.filename} file={file} />              
            ))
          :
            <tr><td className="no-files" colSpan="5">No files added yet.</td></tr>
          }
        </tbody>
      </table>
    )
  }
}

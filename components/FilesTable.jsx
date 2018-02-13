import React from 'react'
import FilesTableHeader from './FilesTableHeader.jsx'
import FileRow from './FileRow.jsx'

export default class FilesTable extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { files: props.files }
  }
  render () {
    const { files } = this.state
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
  getChildContext () {
    return {
      deleteRow: this.deleteRow
    }
  }
  deleteRow (file_id) {
    this.setState( (state, props) => {
      return { files: state.files.filter( file => file.id !== file_id ) }
    })
  }
}

import React from 'react'
import PropTypes from 'prop-types'
import Modal from './Modal.jsx'
import DeleteResourceButton from './DeleteResourceButton.jsx'
import DeleteFileButton from './DeleteFileButton.jsx'
import ActionsPanel from './ActionsPanel.jsx'
import FilesTable from './FilesTable.jsx'
import data from './data'

console.log(data)

// not used but want to keep and don't know where to put it
if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function (fn) {
    for (let i = 0; i < this.length; i++) {
      if (fn(this[i])) return i
    return -1
  }
}

export default class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = { files: data.files }
  }
  getChildContext () {
    return {
      setFileState: this.setFileState.bind(this)
    }
  }
  setFileState (fileid, update) {
    const { files } = this.state
    // create a copy of files
    let newArr = files.map( file => {
      // perform the update
      return (file.id === fileid) ? Object.assign({}, file, update) : file
    })
    this.setState( (state, props) => {
      return {
        files: newArr
      }
    })
  }
  render () {
    const { files } = this.state
    return (
      <main>
        <ActionsPanel addFiles={this.addFiles.bind(this)}/>
        <FilesTable files={files} />
      </main>
    )
  }
  addFiles (arr) {
    this.setState({ files: this.state.files.concat(arr) })
  }
}

Dashboard.childContextTypes = {
  setFileState: PropTypes.func
}

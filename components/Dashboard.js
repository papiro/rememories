import React from 'react'
import PropTypes from 'prop-types'
import Modal from './Modal'
import DeleteResourceButton from './DeleteResourceButton'
import DeleteFileButton from './DeleteFileButton'
import ActionsPanel from './ActionsPanel'
import FilesTable from './FilesTable'
import data from './data'

console.log(data)

if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function (fn) {
    for (let i = 0; i < this.length; i++) {
      if (fn(this[i]))
        return i
    }
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

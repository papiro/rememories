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
    for (let i = 0; i < this.length; i++)
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
    function addRows (arr) {
      const _arr = [].concat(arr)
      this.setState( (state, props) => {
        console.log('old state:::', state)
        const newState = state.files.concat(_arr)
        console.log('new state:::', newState)
        return { files: newState }
      })
    }
    function deleteRows (arr) {
      const _arr = [].concat(arr)
      this.setState( (state, props) => {
        console.log('deleting rows')
        console.log('old state:::', state)
        console.log(_arr)
        const newState = { files: state.files.filter( file => !~_arr.findIndex( id => id === file.id) ) }
        console.log('new state:::', newState)
        return newState
      })
    }
    return {
      addRows: addRows.bind(this),
      deleteRows: deleteRows.bind(this)
      // setFileState: this.setFileState.bind(this)
    }
  }
  // setFileState (fileid, update) {
  //   const { files } = this.state
  //   // create a copy of files
  //   let newArr = files.map( file => {
  //     // perform the update
  //     return (file.id === fileid) ? Object.assign({}, file, update) : file
  //   })
  //   this.setState( (state, props) => {
  //     return {
  //       files: newArr
  //     }
  //   })
  // }
  render () {
    const { files } = this.state
    return (
      <main>
        <ActionsPanel />
        <FilesTable files={files} />
      </main>
    )
  }
}

Dashboard.childContextTypes = {
  addRows: PropTypes.func,
  deleteRows: PropTypes.func
}

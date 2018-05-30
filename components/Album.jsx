import React from 'react'
import PropTypes from 'prop-types'
import Modal from './Modal.jsx'
import DeleteResourceButton from './DeleteResourceButton.jsx'
import DeleteFileButton from './DeleteFileButton.jsx'
import ActionsPanel from './ActionsPanel.jsx'
import FilesTable from './FilesTable.jsx'
import data from './data'

export default class Album extends React.Component {
  constructor (props) {
    super(props)
    this.state = { files: data.files }
  }
  getChildContext () {
    function addRows (arr) {
      const _arr = [].concat(arr)
      this.setState( (state, props) => {
        const newState = state.files.concat(_arr)
        return { files: newState }
      })
    }
    function deleteRows (arr) {
      const _arr = [].concat(arr)
      this.setState( (state, props) => {
        const newState = { files: state.files.filter( file => !~_arr.findIndex( id => id === file.id) ) }
        return newState
      })
    }
    return {
      addRows: addRows.bind(this),
      deleteRows: deleteRows.bind(this)
    }
  }
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

Album.childContextTypes = {
  addRows: PropTypes.func,
  deleteRows: PropTypes.func
}
